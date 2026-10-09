import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const simplexNoise = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const vertexShader = `
${simplexNoise}

uniform float uTime;
uniform float uNoiseStrength;
uniform float uNoiseDensity;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vDisplacement;

void main() {
  vNormal = normalize(normalMatrix * normal);
  
  float noise1 = snoise(position * uNoiseDensity + uTime * 0.25);
  float noise2 = snoise(position * uNoiseDensity * 2.0 + uTime * 0.15) * 0.5;
  float displacement = (noise1 + noise2) * uNoiseStrength;
  
  vec3 newPosition = position + normal * displacement;
  vDisplacement = displacement;
  vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uOpacity;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vDisplacement;

void main() {
  float mixFactor = vDisplacement * 2.0 + 0.5;
  mixFactor = clamp(mixFactor, 0.0, 1.0);
  
  vec3 color = mix(uColor1, uColor2, mixFactor);
  color = mix(color, uColor3, sin(vWorldPosition.y * 2.0 + uTime) * 0.5 + 0.5);
  
  // Edge glow
  float edgeGlow = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
  color += edgeGlow * uColor1 * 0.5;
  
  float alpha = uOpacity * (0.3 + edgeGlow * 0.7);
  
  gl_FragColor = vec4(color, alpha);
}
`;

export default function Sphere3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const sphereGroupRef = useRef<THREE.Group | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const glowMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const init = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 4;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    canvasRef.current = renderer.domElement;

    // Sphere Group
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);
    sphereGroupRef.current = sphereGroup;

    // Main sphere geometry
    const isMobile = window.innerWidth < 768;
    const detail = isMobile ? 32 : 64;
    const geometry = new THREE.IcosahedronGeometry(1.5, detail);

    // Main wireframe material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uNoiseStrength: { value: 0.25 },
        uNoiseDensity: { value: 1.5 },
        uColor1: { value: new THREE.Color('#B8FF00') },
        uColor2: { value: new THREE.Color('#00E5FF') },
        uColor3: { value: new THREE.Color('#7B2FBE') },
        uOpacity: { value: 0.8 },
      },
      transparent: true,
      wireframe: true,
      depthWrite: false,
    });
    materialRef.current = material;

    const sphere = new THREE.Mesh(geometry, material);
    sphereGroup.add(sphere);

    // Inner solid sphere for depth
    const innerGeometry = new THREE.IcosahedronGeometry(1.3, detail);
    const innerMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uNoiseStrength: { value: 0.2 },
        uNoiseDensity: { value: 1.8 },
        uColor1: { value: new THREE.Color('#B8FF00') },
        uColor2: { value: new THREE.Color('#00E5FF') },
        uColor3: { value: new THREE.Color('#7B2FBE') },
        uOpacity: { value: 0.15 },
      },
      transparent: true,
      wireframe: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    glowMaterialRef.current = innerMaterial;

    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    sphereGroup.add(innerSphere);

    // Outer glow sphere
    const glowGeometry = new THREE.IcosahedronGeometry(1.8, 16);
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uNoiseStrength: { value: 0.15 },
        uNoiseDensity: { value: 1.0 },
        uColor1: { value: new THREE.Color('#B8FF00') },
        uColor2: { value: new THREE.Color('#00E5FF') },
        uColor3: { value: new THREE.Color('#7B2FBE') },
        uOpacity: { value: 0.08 },
      },
      transparent: true,
      wireframe: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    sphereGroup.add(glowSphere);

    // Particles around sphere
    const particleCount = isMobile ? 100 : 300;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + Math.random() * 1.5;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xB8FF00,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    sphereGroup.add(particles);

    // Animation
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Update shader time
      material.uniforms.uTime.value = elapsed;
      innerMaterial.uniforms.uTime.value = elapsed;
      glowMaterial.uniforms.uTime.value = elapsed;

      // Rotate spheres
      sphere.rotation.y = elapsed * 0.15;
      sphere.rotation.x = elapsed * 0.08;
      innerSphere.rotation.y = -elapsed * 0.1;
      innerSphere.rotation.x = elapsed * 0.05;
      glowSphere.rotation.y = elapsed * 0.05;
      particles.rotation.y = elapsed * 0.03;

      // Smooth drag follow
      currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * 0.05;
      currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * 0.05;
      
      sphereGroup.position.x = currentPosRef.current.x;
      sphereGroup.position.y = currentPosRef.current.y;

      // Mouse parallax (subtle)
      if (!isDraggingRef.current) {
        sphereGroup.rotation.y += (mousePosRef.current.x * 0.3 - sphereGroup.rotation.y) * 0.02;
        sphereGroup.rotation.x += (mousePosRef.current.y * 0.2 - sphereGroup.rotation.x) * 0.02;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Scroll-linked position
    const scrollData = { x: 0, y: 0, scale: 1 };
    
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Create smooth path through sections
        const section = Math.floor(progress * 6);
        const sectionProgress = (progress * 6) % 1;
        
        let targetX = 0;
        let targetY = 0;
        let targetScale = 1;
        
        switch (section) {
          case 0: // Hero
            targetX = 0;
            targetY = 0;
            targetScale = 1;
            break;
          case 1: // Benefits
            targetX = -1.5;
            targetY = 0;
            targetScale = 0.8;
            break;
          case 2: // Services
            targetX = 1.5;
            targetY = 0;
            targetScale = 0.7;
            break;
          case 3: // Testimonials
            targetX = 0;
            targetY = 0.5;
            targetScale = 0.6;
            break;
          case 4: // FAQ
            targetX = -1;
            targetY = 0;
            targetScale = 0.5;
            break;
          case 5: // CTA
            targetX = 0;
            targetY = 0;
            targetScale = 0.9;
            break;
        }
        
        if (!isDraggingRef.current) {
          scrollData.x = targetX;
          scrollData.y = targetY;
          scrollData.scale = targetScale;
          
          targetPosRef.current.x = targetX;
          targetPosRef.current.y = targetY;
          
          sphereGroup.scale.setScalar(targetScale);
        }
      },
    });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Mouse move for parallax
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePosRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (isDraggingRef.current) {
        const dx = (e.clientX - dragStartRef.current.x) * 0.005;
        const dy = -(e.clientY - dragStartRef.current.y) * 0.005;
        
        targetPosRef.current.x = scrollData.x + dx;
        targetPosRef.current.y = scrollData.y + dy;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Drag start
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    };

    // Drag end
    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        // Return to scroll position
        targetPosRef.current.x = scrollData.x;
        targetPosRef.current.y = scrollData.y;
      }
    };

    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
      canvasRef.current.addEventListener('mousedown', handleMouseDown);
    }
    window.addEventListener('mouseup', handleMouseUp);

    // Touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      isDraggingRef.current = true;
      dragStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      const dx = (touch.clientX - dragStartRef.current.x) * 0.005;
      const dy = -(touch.clientY - dragStartRef.current.y) * 0.005;
      
      targetPosRef.current.x = scrollData.x + dx;
      targetPosRef.current.y = scrollData.y + dy;
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      targetPosRef.current.x = scrollData.x;
      targetPosRef.current.y = scrollData.y;
    };

    if (canvasRef.current) {
      canvasRef.current.addEventListener('touchstart', handleTouchStart, { passive: true });
      canvasRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvasRef.current.addEventListener('touchend', handleTouchEnd);
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        canvasRef.current.removeEventListener('touchstart', handleTouchStart);
        canvasRef.current.removeEventListener('touchmove', handleTouchMove);
        canvasRef.current.removeEventListener('touchend', handleTouchEnd);
      }
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  useEffect(() => {
    const cleanup = init();
    return () => {
      if (cleanup) cleanup();
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* Canvas will be injected by Three.js */}
      <style>{`
        .fixed canvas {
          pointer-events: auto !important;
        }
      `}</style>
    </div>
  );
}
