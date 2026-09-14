interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export function Input({ label, error, helper, className = '', ...props }: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-[#1A1A1A]">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 border rounded bg-white ${
          error ? 'border-[#DC2626]' : 'border-[#E0E0E0]'
        } focus:outline-none focus:ring-2 focus:ring-[#E8930A] ${className}`}
        {...props}
      />
      {helper && !error && (
        <p className="text-[#6B6B6B] text-sm mt-1">{helper}</p>
      )}
      {error && (
        <p className="text-[#DC2626] text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
