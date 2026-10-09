export default function Benefits() {
  const benefits = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Profissionais Premium',
      description: 'Barbeiros certificados com anos de experiência e atualização constante nas últimas tendências.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      title: 'Pontualidade Garantida',
      description: 'Seu horário é sagrado. Sem esperas desnecessárias, atendimento no horário marcado.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      title: 'Produtos de Alta Qualidade',
      description: 'Utilizamos apenas produtos premium e importados para garantir o melhor resultado.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Ambiente Exclusivo',
      description: 'Espaço pensado para seu conforto: cerveja gelada, Wi-Fi, e uma vibe única.',
    },
  ];

  return (
    <section id="beneficios" className="reveal-section relative py-16 md:py-24 lg:py-32 bg-[var(--color-bg-surface)]">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent" />
      
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block font-[var(--font-mono)] text-xs text-[var(--color-primary)] uppercase tracking-wider mb-3 px-3 py-1 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5">
            Por que nos escolher
          </span>
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--color-text-primary)] mb-4">
            A experiência que você{' '}
            <span className="text-gradient">merece</span>
          </h2>
          <p className="max-w-lg mx-auto text-[var(--color-text-secondary)] text-base md:text-lg">
            Mais que um corte — uma experiência completa de cuidado masculino.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="stagger-children grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4 transition-all duration-300 group-hover:bg-[var(--color-primary)]/20 group-hover:shadow-[0_0_20px_rgba(184,255,0,0.15)]">
                {benefit.icon}
              </div>
              
              {/* Content */}
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {benefit.description}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-[var(--color-primary)] rounded-full scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
