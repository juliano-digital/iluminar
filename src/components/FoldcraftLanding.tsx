import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function FoldcraftLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#projects' },
    { label: 'Studio', href: '#studio' },
    { label: 'Reach Us', href: '#contact' },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-geist">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '70% center' }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
          type="video/mp4"
        />
      </video>

      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        {/* Left side */}
        <div className="flex items-center gap-8">
          <a href="#" className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Foldcraft
          </a>
          
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Desktop button */}
          <a
            href="#contact"
            className="hidden md:block rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform"
          >
            Let's Talk
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center active:scale-90"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-90 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-75'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute inset-x-0 top-0 z-20 bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? 'h-screen opacity-100' : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8">
          <div className="space-y-6 animate-[fadeSlideUp_0.8s_ease_0.1s_both]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-3xl font-medium text-white/90 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 inline-block rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105 transition-transform"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-between h-[calc(100vh-80px)] px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        {/* Top Section */}
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm text-white/90 mb-4 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
            Brand & Visual Storytelling
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-white animate-[fadeSlideUp_0.8s_ease_0.4s_both]">
            Shaping visual
            <br />
            narratives,
            <br />
            one pixel at a time.
          </h1>
        </div>

        {/* Bottom Section */}
        <div>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mb-5 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
            Turning vision into reality through craft, motion, and an endless pursuit of beauty.
          </p>
          <a
            href="#projects"
            className="animate-[fadeSlideUp_0.8s_ease_0.9s_both] rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            Explore Work
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
