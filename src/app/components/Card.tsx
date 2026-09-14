interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: string;
}

export function Card({ children, className = '', header }: CardProps) {
  return (
    <div className={`bg-white border border-[#E0E0E0] rounded ${className}`}>
      {header && (
        <div className="bg-[#6B0D0D] text-white px-4 py-3 rounded-t">
          {header}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
