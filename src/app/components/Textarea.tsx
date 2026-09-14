import { useState } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  maxWords?: number;
}

export function Textarea({ label, maxWords, className = '', onChange, value = '', ...props }: TextareaProps) {
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.trim().split(/\s+/).filter(w => w.length > 0).length;
    setWordCount(words);
    onChange?.(e);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-[#1A1A1A]">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-2 border border-[#E0E0E0] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#E8930A] ${className}`}
        onChange={handleChange}
        value={value}
        {...props}
      />
      {maxWords && (
        <p className={`text-sm text-right ${wordCount >= maxWords * 0.96 ? 'text-[#DC2626]' : 'text-[#6B6B6B]'}`}>
          {wordCount} / {maxWords} words
        </p>
      )}
    </div>
  );
}
