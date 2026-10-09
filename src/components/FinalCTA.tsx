import { useState } from 'react';

export default function FinalCTA() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', phone: '', service: '' });
  };

  return (
    <section id="agendar" className="reveal-section relative py-16 md:py-24 lg:py-32 bg-[var(--color-bg-surface)] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-secondary)]/5 rounded-full blur-3xl" />
      </div>

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block font-[var(--font-mono)] text-xs text-[var(--color-primary)] uppercase tracking-wider mb-3 px-3 py-1 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5">
              Agende Agora
            </span>
            <h2 className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--color-text-primary)] mb-4">
              Pronto para o seu{' '}
              <span className="text-gradient">melhor visual?</span>
            </h2>
            <p className="max-w-lg mx-auto text-[var(--color-text-secondary)] text-base md:text-lg">
              Preencha o formulário abaixo e garanta seu horário. 
              Retornaremos em até 15 minutos para confirmar.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-[var(--font-mono)] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                  Seu Nome
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Como podemos te chamar?"
                  className="w-full px-4 py-3.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] text-sm focus:outline-none focus:border-[var(--color-primary)]/50 focus:shadow-[0_0_16px_rgba(184,255,0,0.1)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-[var(--font-mono)] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] text-sm focus:outline-none focus:border-[var(--color-primary)]/50 focus:shadow-[0_0_16px_rgba(184,255,0,0.1)] transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-[var(--font-mono)] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Serviço Desejado
              </label>
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-primary)]/50 focus:shadow-[0_0_16px_rgba(184,255,0,0.1)] transition-all duration-300 appearance-none"
              >
                <option value="" className="text-[var(--color-text-muted)]">Selecione um serviço</option>
                <option value="corte">Corte Masculino — R$ 55</option>
                <option value="corte-barba">Corte + Barba — R$ 85</option>
                <option value="barba">Barba Completa — R$ 45</option>
                <option value="platinado">Platinado — R$ 120</option>
                <option value="dayuse">Day Use VIP — R$ 180</option>
                <option value="infantil">Corte Infantil — R$ 40</option>
              </select>
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-full font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                submitted
                  ? 'bg-green-500 text-white'
                  : 'bg-[var(--color-primary)] text-[var(--color-bg-base)] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(184,255,0,0.4)]'
              }`}
            >
              {submitted ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                  Agendamento Enviado!
                </>
              ) : (
                <>
                  Garantir Meu Horário
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-xs text-[var(--color-text-muted)]">
              Ao enviar, você concorda com nossa política de privacidade. 
              Respondemos em até 15 minutos via WhatsApp.
            </p>
          </form>

          {/* Alternative contact */}
          <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">Prefere falar direto?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-500/10 transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.414.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Direto
              </a>
              <a
                href="tel:+5511999999999"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm font-medium hover:border-[var(--color-primary)]/30 hover:text-[var(--color-primary)] transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
