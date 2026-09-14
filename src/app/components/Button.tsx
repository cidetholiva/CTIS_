interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', fullWidth = false, children, className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-[#E8930A] text-white hover:bg-[#D88309]',
    secondary: 'bg-[#6B0D0D] text-white hover:bg-[#5A0A0A]',
    outlined: 'bg-transparent border-2 border-[#6B0D0D] text-[#6B0D0D] hover:bg-[#F9F0F0]'
  };

  return (
    <button
      className={`px-4 py-2.5 md:px-6 md:py-2.5 rounded text-sm md:text-base ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className} transition-colors touch-manipulation`}
      {...props}
    >
      {children}
    </button>
  );
}