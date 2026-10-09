import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Sphere3D from './components/Sphere3D';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      // Premium scroll reveal animations
      const sections = document.querySelectorAll('.reveal-section');
      
      sections.forEach((section) => {
        // Section fade in with slide up
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: isMobile ? 20 : 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.8 : 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stagger children animation with premium timing
      const staggerContainers = document.querySelectorAll('.stagger-children');
      staggerContainers.forEach((container) => {
        const children = Array.from(container.children);
        
        gsap.fromTo(
          children,
          { 
            opacity: 0, 
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: isMobile ? 0.08 : 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Headings animation
      const headings = document.querySelectorAll('h1, h2, h3');
      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          {
            opacity: 0,
            y: 40,
            clipPath: 'inset(100% 0 0 0)',
          },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Parallax effect for background elements
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((el) => {
        gsap.to(el, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Custom cursor follower (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: var(--color-primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.15s ease;
      box-shadow: 0 0 20px rgba(184, 255, 0, 0.5);
    `;
    document.body.appendChild(cursor);

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseEnterInteractive = () => {
      gsap.to(cursor, {
        scale: 6,
        duration: 0.3,
        ease: 'expo.out',
      });
    };

    const handleMouseLeaveInteractive = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'expo.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, .cursor-hover');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    };
  }, [isMobile]);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[var(--color-bg-base)]">
      {/* 3D Sphere Background */}
      <Sphere3D />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Benefits />
          <Services />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
