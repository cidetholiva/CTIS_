interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-[#1A1A1A]">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2 border border-[#E0E0E0] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#E8930A] ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
