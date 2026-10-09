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
      // Animate sections on scroll
      const sections = document.querySelectorAll('.reveal-section');
      
      sections.forEach((section, i) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: isMobile ? 20 : 40,
            rotateX: isMobile ? 0 : 4,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: isMobile ? 0.6 : 0.8,
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

      // Stagger children animation
      const staggerContainers = document.querySelectorAll('.stagger-children');
      staggerContainers.forEach((container) => {
        const children = container.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: isMobile ? 0.05 : 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={mainRef} className="min-h-screen bg-[var(--color-bg-base)]">
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
  );
}
