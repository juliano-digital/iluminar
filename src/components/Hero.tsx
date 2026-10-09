import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
      )
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
        '-=0.3'
      )
      .fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero-cta',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'spring' },
        '-=0.3'
      )
      .fromTo(
        '.hero-stats',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' },
        '-=0.2'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
    >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="https://image.qwenlm.ai/generated-images/2fc00809-8bc5-4d1c-9d1d-a560eefcd10e/_result.png" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-base)]/60 via-[var(--color-bg-base)]/80 to-[var(--color-bg-base)]" />
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--color-secondary)]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent-cool)]/3 rounded-full blur-3xl" />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent" />
      <div className="absolute bottom-32 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)]/20 to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24 text-center">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 backdrop-blur-sm mb-6 md:mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          <span className="text-xs md:text-sm font-[var(--font-mono)] text-[var(--color-text-secondary)]">
            VAGAS ABERTAS ESTA SEMANA
          </span>
        </div>

        {/* Title */}
        <h1 className="hero-title font-[var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] font-bold leading-[1.05] tracking-[-0.03em] mb-4 md:mb-6">
          Seu estilo.{' '}
          <span className="text-gradient">Nossa arte.</span>
          <br />
          <span className="text-[var(--color-text-secondary)]">Resultado impecável.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle max-w-xl mx-auto text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 md:mb-10">
          Cortes precisos, barba alinhada e a experiência premium que você merece. 
          Agende agora e eleve seu visual ao próximo nível.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16">
          <a
            href="#agendar"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-[var(--color-bg-base)] font-bold text-base rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(184,255,0,0.4)]"
          >
            Agendar Meu Horário
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            href="#servicos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-base rounded-full transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-surface)]"
          >
            Ver Serviços
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="font-[var(--font-display)] text-2xl md:text-4xl font-bold text-[var(--color-primary)]">
              5k+
            </div>
            <div className="text-xs md:text-sm text-[var(--color-text-muted)] mt-1">
              Clientes satisfeitos
            </div>
          </div>
          <div className="text-center">
            <div className="font-[var(--font-display)] text-2xl md:text-4xl font-bold text-[var(--color-primary)]">
              8+
            </div>
            <div className="text-xs md:text-sm text-[var(--color-text-muted)] mt-1">
              Anos de experiência
            </div>
          </div>
          <div className="text-center">
            <div className="font-[var(--font-display)] text-2xl md:text-4xl font-bold text-[var(--color-primary)]">
              4.9
            </div>
            <div className="text-xs md:text-sm text-[var(--color-text-muted)] mt-1">
              Avaliação Google
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-[var(--color-text-muted)] font-[var(--font-mono)]">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--color-primary)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
