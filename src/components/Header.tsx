import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg-base)]/95 backdrop-blur-xl border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="md:w-6 md:h-6">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="1"/>
              <path d="M12 6L6 9V15L12 18L18 15V9L12 6Z" fill="#B8FF00" stroke="#B8FF00" strokeWidth="0.5"/>
            </svg>
          </div>
          <span className="font-[var(--font-display)] text-lg md:text-xl font-bold text-[var(--color-text-primary)]">
            Barber<span className="text-[var(--color-primary)]">Kings</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#servicos" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 text-sm font-medium">
            Serviços
          </a>
          <a href="#beneficios" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 text-sm font-medium">
            Benefícios
          </a>
          <a href="#depoimentos" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 text-sm font-medium">
            Depoimentos
          </a>
          <a href="#faq" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 text-sm font-medium">
            FAQ
          </a>
        </nav>

        {/* CTA Button */}
        <a
          href="#agendar"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-[var(--color-bg-base)] font-semibold text-sm rounded-full hover:scale-105 transition-all duration-300 hover:shadow-[0_0_24px_rgba(184,255,0,0.4)]"
        >
          Agendar Agora
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-[var(--color-text-primary)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[var(--color-bg-base)]/98 backdrop-blur-xl border-b border-[var(--color-border)] transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          <a href="#servicos" onClick={() => setMenuOpen(false)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2 text-base font-medium">
            Serviços
          </a>
          <a href="#beneficios" onClick={() => setMenuOpen(false)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2 text-base font-medium">
            Benefícios
          </a>
          <a href="#depoimentos" onClick={() => setMenuOpen(false)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2 text-base font-medium">
            Depoimentos
          </a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2 text-base font-medium">
            FAQ
          </a>
          <a
            href="#agendar"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-primary)] text-[var(--color-bg-base)] font-semibold text-sm rounded-full"
          >
            Agendar Agora
          </a>
        </nav>
      </div>
    </header>
  );
}
