# BarberKings - Landing Page Moderna + Painel Admin

Landing page minimalista com vídeo de fundo e painel administrativo completo, desenvolvido com React + Vite + Tailwind CSS + Supabase.

## 🎨 Design da Landing Page

### Vídeo de Fundo
- **URL**: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4`
- Atributos: autoPlay, muted, loop, playsInline
- Posicionamento: object-position 70% center

### Tipografia
- **Fonte**: Geist (Google Fonts)
- Pesos: 300-700
- Aplicada como `font-geist` no container raiz

### Layout
- **Navbar (z-30)**: Logo "Foldcraft" + links de navegação + botão "Let's Talk"
- **Menu Mobile**: Overlay fullscreen com animação suave (cubic-bezier)
- **Hero Section (z-10)**: 
  - Badge: "Brand & Visual Storytelling"
  - Heading: "Shaping visual narratives, one pixel at a time."
  - Parágrafo descritivo
  - CTA: "Explore Work" com ícone ArrowRight

### Animações
- **fadeSlideUp**: Entrada suave com translate Y (24px → 0) e fade
- Delays escalonados: 0.2s, 0.4s, 0.7s, 0.9s
- Transições de hover com scale(1.05)
- Menu mobile com rotação de ícones (Menu ↔ X)

## 🚀 Funcionalidades

### Landing Page
- ✅ Vídeo de fundo em loop
- ✅ Design responsivo (mobile-first)
- ✅ Menu mobile animado
- ✅ Animações de entrada escalonadas
- ✅ Tipografia Geist moderna
- ✅ Botões com hover effects

### Painel Admin
- ✅ Dashboard com estatísticas em tempo real
- ✅ CRUD completo de agendamentos
- ✅ Validação de formulário
- ✅ Máscara de telefone automática
- ✅ Busca e filtros
- ✅ Tabela responsiva (desktop) e cards (mobile)
- ✅ Modal de edição
- ✅ Toast notifications
- ✅ Sidebar colapsável

## 📦 Instalação

```bash
npm install
```

## 🔧 Configuração do Supabase

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Copie as credenciais do projeto (URL e Anon Key)

### 2. Criar Tabela de Agendamentos

No SQL Editor do Supabase, execute o script em `supabase-schema.sql` ou:

```sql
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  service_type TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX idx_appointments_name ON appointments(name);
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

**Nota**: Sem as credenciais do Supabase, o painel funcionará automaticamente com localStorage como fallback.

## 🏃 Executar

```bash
npm run dev
```

Acesse:
- **Landing Page**: http://localhost:3000
- **Painel Admin**: http://localhost:3000/#admin

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── admin/              # Componentes do painel admin
│   │   ├── AdminPanel.tsx
│   │   ├── AppointmentForm.tsx
│   │   ├── AppointmentsList.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Header.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Select.tsx
│   │   └── Sidebar.tsx
│   ├── FoldcraftLanding.tsx  # Nova landing page com vídeo
│   ├── Benefits.tsx          # Landing page antiga (backup)
│   ├── FAQ.tsx
│   ├── FinalCTA.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Sphere3D.tsx
│   └── Testimonials.tsx
├── hooks/
│   └── useAppointments.ts
├── lib/
│   └── supabase.ts
├── App.tsx
├── index.css
└── main.tsx
```

## 🎯 Tecnologias

### Landing Page
- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Ícones (ArrowRight, Menu, X)
- **Google Fonts** - Geist font

### Painel Admin
- **Supabase** - Backend e banco de dados
- **React Hot Toast** - Notificações
- **GSAP** - Animações (nas páginas antigas)
- **Three.js** - Esfera 3D (nas páginas antigas)

## 🎨 Personalização

### Vídeo de Fundo
Edite o componente `FoldcraftLanding.tsx`:

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
  style={{ objectPosition: '70% center' }}
>
  <source
    src="SEU_VIDEO_AQUI.mp4"
    type="video/mp4"
  />
</video>
```

### Conteúdo do Hero
No mesmo componente, edite:

```tsx
<p>Brand & Visual Storytelling</p>
<h1>
  Shaping visual
  <br />
  narratives,
  <br />
  one pixel at a time.
</h1>
<p>Turning vision into reality...</p>
```

### Cores e Estilos
O design usa Tailwind CSS. Edite diretamente nos componentes:
- Background: `bg-black`
- Texto: `text-white`, `text-white/80`, `text-white/60`
- Botões: `bg-white text-black`

## 📱 Responsividade

O projeto é 100% responsivo:
- **Mobile (< 768px)**: Menu hamburger, tipografia ajustada
- **Tablet (768px - 1024px)**: Layout intermediário
- **Desktop (> 1024px)**: Navbar completa, tipografia maior

## 🔒 Segurança

- Nunca commite o arquivo `.env` com credenciais reais
- Use variáveis de ambiente para todas as secrets
- Configure as políticas de segurança do Supabase (RLS) em produção

## 📝 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

## 🤝 Suporte

Para dúvidas ou suporte, consulte:
- Documentação do Supabase: [supabase.com/docs](https://supabase.com/docs)
- Documentação do Tailwind CSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- Documentação do React: [react.dev](https://react.dev)
