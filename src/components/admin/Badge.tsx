interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-[#2A2A2A] text-[#A0A0A0]',
    success: 'bg-[#B8FF00]/10 text-[#B8FF00] border border-[#B8FF00]/20',
    warning: 'bg-[#FFD600]/10 text-[#FFD600] border border-[#FFD600]/20',
    info: 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
