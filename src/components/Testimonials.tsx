export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rafael Mendes',
      role: 'Empresário',
      text: 'Melhor barbearia que já fui. O atendimento é impecável e o resultado sempre supera minhas expectativas. Virei cliente fiel!',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      name: 'Lucas Oliveira',
      role: 'Designer',
      text: 'Ambiente incrível, profissionais de primeira. O corte ficou exatamente como eu queria. Recomendo demais!',
      rating: 5,
      avatar: '🧑‍🎨',
    },
    {
      name: 'Thiago Santos',
      role: 'Advogado',
      text: 'Pontualidade e qualidade que eu não encontro em nenhum outro lugar. A experiência VIP vale cada centavo.',
      rating: 5,
      avatar: '👨‍⚖️',
    },
    {
      name: 'André Costa',
      role: 'Personal Trainer',
      text: 'Já indiquei para todos os meus alunos. O cuidado com cada detalhe faz toda a diferença no resultado final.',
      rating: 5,
      avatar: '💪',
    },
    {
      name: 'Felipe Rodrigues',
      role: 'Engenheiro',
      text: 'Finalmente encontrei uma barbearia que entende o que eu quero. Sem enrolação, resultado perfeito toda vez.',
      rating: 5,
      avatar: '🧑‍💻',
    },
    {
      name: 'Marcos Lima',
      role: 'Médico',
      text: 'O combo corte + barba é sensacional. A toalha quente e o acabamento com navalha são outro nível.',
      rating: 5,
      avatar: '👨‍⚕️',
    },
  ];

  return (
    <section id="depoimentos" className="reveal-section relative py-16 md:py-24 lg:py-32 bg-[var(--color-bg-surface)]">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)]/30 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block font-[var(--font-mono)] text-xs text-[var(--color-accent-warm)] uppercase tracking-wider mb-3 px-3 py-1 rounded-full border border-[var(--color-accent-warm)]/20 bg-[var(--color-accent-warm)]/5">
            Depoimentos
          </span>
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--color-text-primary)] mb-4">
            O que nossos{' '}
            <span className="text-gradient">clientes dizem</span>
          </h2>
          <p className="max-w-lg mx-auto text-[var(--color-text-secondary)] text-base md:text-lg">
            Mais de 5.000 clientes satisfeitos. Veja o que eles falam sobre nós.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="stagger-children grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-secondary)]/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-accent-warm)" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-surface)] flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google rating */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--color-accent-warm)" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">4.9</strong> no Google — mais de 380 avaliações
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
