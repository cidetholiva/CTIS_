interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
  valueColor?: string;
  helper?: string;
}

export function StatCard({ label, value, className = '', valueColor = 'text-[#1A1A1A]', helper }: StatCardProps) {
  return (
    <div className={`bg-white border border-[#E0E0E0] rounded p-3 md:p-4 ${className}`}>
      <div className="text-[#6B0D0D] text-xs md:text-sm mb-1 md:mb-2">{label}</div>
      <div className={`text-2xl md:text-4xl ${valueColor}`}>
        {value}
        {helper && <span className="text-sm md:text-base text-[#6B6B6B] ml-1">{helper}</span>}
      </div>
    </div>
  );
}