export default function Services() {
  const services = [
    {
      name: 'Corte Masculino',
      description: 'Corte personalizado com acabamento perfeito, incluindo lavagem e finalização.',
      price: 'R$ 55',
      duration: '45 min',
      popular: false,
    },
    {
      name: 'Corte + Barba',
      description: 'Combo completo com corte premium e barba alinhada com toalha quente.',
      price: 'R$ 85',
      duration: '1h 15min',
      popular: true,
    },
    {
      name: 'Barba Completa',
      description: 'Modelagem de barba com navalha, toalha quente e hidratação premium.',
      price: 'R$ 45',
      duration: '30 min',
      popular: false,
    },
    {
      name: 'Platinado',
      description: 'Descoloração profissional com produtos de alta qualidade e cuidado capilar.',
      price: 'R$ 120',
      duration: '2h',
      popular: false,
    },
    {
      name: 'Day Use VIP',
      description: 'Experiência completa: corte, barba, hidratação facial, cerveja e massagem.',
      price: 'R$ 180',
      duration: '2h 30min',
      popular: false,
    },
    {
      name: 'Corte Infantil',
      description: 'Corte especial para os pequenos, com paciência e diversão garantida.',
      price: 'R$ 40',
      duration: '30 min',
      popular: false,
    },
  ];

  return (
    <section id="servicos" className="reveal-section relative py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block font-[var(--font-mono)] text-xs text-[var(--color-accent-cool)] uppercase tracking-wider mb-3 px-3 py-1 rounded-full border border-[var(--color-accent-cool)]/20 bg-[var(--color-accent-cool)]/5">
            Nossos Serviços
          </span>
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--color-text-primary)] mb-4">
            Escolha seu{' '}
            <span className="text-gradient">serviço</span>
          </h2>
          <p className="max-w-lg mx-auto text-[var(--color-text-secondary)] text-base md:text-lg">
            Do clássico ao ousado — temos o serviço perfeito para cada estilo.
          </p>
        </div>

        {/* Services grid */}
        <div className="stagger-children grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`cursor-hover group relative p-6 rounded-2xl border transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:scale-[1.02] ${
                service.popular
                  ? 'bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg-surface)] border-[var(--color-primary)]/40 shadow-[0_0_24px_rgba(184,255,0,0.1)] hover:shadow-[0_0_40px_rgba(184,255,0,0.2)]'
                  : 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] hover:border-[var(--color-primary)]/30'
              } hover:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(184,255,0,0.06)]`}
            >
              {/* Popular badge */}
              {service.popular && (
                <div className="absolute -top-3 right-4 px-3 py-1 bg-[var(--color-primary)] text-[var(--color-bg-base)] text-xs font-bold rounded-full font-[var(--font-mono)]">
                  MAIS PEDIDO
                </div>
              )}

              {/* Service name */}
              <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                {service.name}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Price and duration */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                <span className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-primary)]">
                  {service.price}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] font-[var(--font-mono)] flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  {service.duration}
                </span>
              </div>

              {/* Book button */}
              <a
                href="#agendar"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-primary)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-[var(--color-bg-base)] hover:border-[var(--color-primary)] hover:shadow-[0_0_20px_rgba(184,255,0,0.2)]"
              >
                Agendar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
