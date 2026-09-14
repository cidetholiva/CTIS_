type BadgeVariant = 'critical' | 'major' | 'minor' | 'pass' | 'fail' | 'warning' | 'role' | 'phase' | 'admin' | 'expedited';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className = '' }: BadgeProps) {
  const styles: Record<BadgeVariant, string> = {
    critical: 'bg-[#DC2626] text-white',
    major: 'bg-[#D97706] text-white',
    minor: 'bg-[#16A34A] text-white',
    pass: 'bg-[#16A34A] text-white',
    fail: 'bg-[#DC2626] text-white',
    warning: 'bg-[#D97706] text-white',
    role: 'bg-[#6B0D0D] text-white',
    phase: 'bg-[#E8930A] text-white',
    admin: 'bg-[#6B0D0D] text-white text-[10px]',
    expedited: 'bg-[#DC2626] text-white'
  };

  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
