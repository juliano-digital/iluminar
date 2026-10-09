# BarberKings - Landing Page + Painel Admin

Landing page completa para barbearia com painel administrativo integrado, desenvolvido com React + Vite + Tailwind CSS + Supabase.

## 🎨 Design System

O projeto segue rigorosamente o Design System especificado:
- **Cores**: Dark mode com acentos neon (Lime #B8FF00, Purple #7B2FBE, Cyan #00E5FF)
- **Tipografia**: Space Grotesk (títulos) + Inter (corpo)
- **Espaçamento**: Base 8px com múltiplos consistentes
- **Animações**: Transições suaves com cubic-bezier(0.16, 1, 0.3, 1)
- **Esfera 3D**: Three.js com shaders de deformação orgânica

## 🚀 Funcionalidades

### Landing Page
- Hero com CTA acima da dobra
- Seção de benefícios com cards animados
- Lista de serviços com preços
- Depoimentos de clientes
- FAQ interativo
- Formulário de captura de leads
- Esfera 3D interativa com arraste e parallax
- Cursor customizado (desktop)
- Animações de scroll premium com GSAP

### Painel Admin
- Dashboard com estatísticas em tempo real
- CRUD completo de agendamentos
- Validação de formulário
- Máscara de telefone automática
- Busca e filtros
- Tabela responsiva (desktop) e cards (mobile)
- Modal de edição
- Toast notifications
- Sidebar colapsável

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

No SQL Editor do Supabase, execute:

```sql
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  service_type TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar índice para busca por data
CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);

-- Criar índice para busca por nome
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
│   ├── admin/           # Componentes do painel admin
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
│   ├── Benefits.tsx
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

- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **GSAP** - Animações premium
- **Three.js** - Esfera 3D com shaders
- **Supabase** - Backend e banco de dados
- **React Hot Toast** - Notificações

## 🎨 Personalização

### Cores
Edite as variáveis CSS em `src/index.css`:

```css
:root {
  --color-primary: #B8FF00;
  --color-secondary: #7B2FBE;
  --color-bg-base: #0A0A0A;
  /* ... */
}
```

### Serviços
Edite o array `serviceOptions` em `src/components/admin/AppointmentForm.tsx`:

```typescript
const serviceOptions = [
  { value: 'Corte Masculino', label: 'Corte Masculino — R$ 55' },
  // Adicione seus serviços aqui
];
```

## 📱 Responsividade

O projeto é 100% responsivo e otimizado para:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

Animações pesadas são automaticamente simplificadas em dispositivos móveis para garantir performance.

## 🔒 Segurança

- Nunca commite o arquivo `.env` com credenciais reais
- Use variáveis de ambiente para todas as secrets
- Configure as políticas de segurança do Supabase (RLS) em produção

## 📝 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

## 🤝 Suporte

Para dúvidas ou suporte, consulte a documentação do Supabase em [supabase.com/docs](https://supabase.com/docs).
