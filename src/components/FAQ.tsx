import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Preciso agendar ou posso ir sem hora marcada?',
      answer: 'Recomendamos fortemente o agendamento para garantir seu horário. Aceitamos walk-ins quando há disponibilidade, mas clientes agendados têm prioridade.',
    },
    {
      question: 'Quais formas de pagamento vocês aceitam?',
      answer: 'Aceitamos dinheiro, PIX, cartões de crédito e débito. Também oferecemos pacotes mensais com desconto para clientes frequentes.',
    },
    {
      question: 'Quanto tempo dura um atendimento completo?',
      answer: 'Um corte simples leva cerca de 45 minutos. O combo corte + barba leva aproximadamente 1h15. O Day Use VIP dura cerca de 2h30.',
    },
    {
      question: 'Vocês atendem crianças?',
      answer: 'Sim! Temos corte infantil especial com profissionais experientes em atender os pequenos. Crianças até 10 anos têm preço diferenciado.',
    },
    {
      question: 'Posso cancelar ou remarcar meu agendamento?',
      answer: 'Claro! Pedimos apenas que o cancelamento ou remarcação seja feito com pelo menos 2 horas de antecedência pelo WhatsApp.',
    },
    {
      question: 'Onde vocês estão localizados?',
      answer: 'Estamos na Rua Augusta, 1234 — Centro. Fácil acesso por metrô e com estacionamento conveniado ao lado. Consulte o mapa na página de contato.',
    },
  ];

  return (
    <section id="faq" className="reveal-section relative py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block font-[var(--font-mono)] text-xs text-[var(--color-accent-cool)] uppercase tracking-wider mb-3 px-3 py-1 rounded-full border border-[var(--color-accent-cool)]/20 bg-[var(--color-accent-cool)]/5">
              Dúvidas Frequentes
            </span>
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--color-text-primary)] mb-4">
              Perguntas{' '}
              <span className="text-gradient">frequentes</span>
            </h2>
            <p className="max-w-lg mx-auto text-[var(--color-text-secondary)] text-base md:text-lg">
              Tire suas dúvidas antes de agendar. Não encontrou sua resposta? Fale conosco!
            </p>
          </div>

          {/* FAQ items */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? 'border-[var(--color-primary)]/30 bg-[var(--color-bg-elevated)] shadow-[0_0_20px_rgba(184,255,0,0.05)]'
                    : 'border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border)]/80'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                >
                  <span className="text-sm md:text-base font-medium text-[var(--color-text-primary)] pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? 'bg-[var(--color-primary)] text-[var(--color-bg-base)] rotate-180'
                        : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)]'
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-[var(--ease-out-expo)] ${
                    openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
