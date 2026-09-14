interface AIContentIndicatorProps {
  children: React.ReactNode;
  className?: string;
}

export function AIContentIndicator({ children, className = '' }: AIContentIndicatorProps) {
  return (
    <div className={`border-l-[3px] border-l-[#E8930A] relative ${className}`}>
      <div className="absolute top-4 right-4">
        <span className="inline-block px-1.5 py-0.5 bg-[#E8930A] text-white text-[10px] rounded">AI</span>
      </div>
      {children}
      <p className="text-[12px] text-[#6B6B6B] mt-2 px-4 pb-2">
        AI output is advisory. Reviewer judgment is final.
      </p>
    </div>
  );
}
