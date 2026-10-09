export default function Footer() {
  return (
    <footer className="relative py-12 md:py-16 bg-[var(--color-bg-base)] border-t border-[var(--color-border)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="1"/>
                  <path d="M12 6L6 9V15L12 18L18 15V9L12 6Z" fill="#B8FF00" stroke="#B8FF00" strokeWidth="0.5"/>
                </svg>
              </div>
              <span className="font-[var(--font-display)] text-lg font-bold text-[var(--color-text-primary)]">
                Barber<span className="text-[var(--color-primary)]">Kings</span>
              </span>
            </a>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
              A barbearia premium que eleva seu estilo ao próximo nível. Cortes precisos, barba alinhada e experiência única.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              <li><a href="#servicos" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300">Serviços</a></li>
              <li><a href="#beneficios" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300">Benefícios</a></li>
              <li><a href="#depoimentos" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300">Depoimentos</a></li>
              <li><a href="#faq" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300">FAQ</a></li>
              <li><a href="#agendar" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300">Agendar</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
              Horário
            </h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Seg - Sex</span>
                <span className="text-[var(--color-text-primary)] font-[var(--font-mono)]">9h - 20h</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Sábado</span>
                <span className="text-[var(--color-text-primary)] font-[var(--font-mono)]">9h - 18h</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Domingo</span>
                <span className="text-[var(--color-text-muted)] font-[var(--font-mono)]">Fechado</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-[var(--color-text-secondary)]">Rua Augusta, 1234<br/>Centro — São Paulo, SP</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" className="flex-shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="text-[var(--color-text-secondary)]">(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" className="flex-shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="text-[var(--color-text-secondary)]">contato@barberkings.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © 2024 BarberKings. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
