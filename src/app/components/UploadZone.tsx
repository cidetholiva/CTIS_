import { Upload } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface UploadZoneProps {
  accept?: string;
  onFileSelect?: (file: File) => void;
  fileName?: string;
  helperText?: string;
}

export function UploadZone({ accept = '.pdf', onFileSelect, fileName, helperText }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const uploadedFile = fileName || null;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!fileName && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [fileName]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect?.(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect?.(file);
    }
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded p-8 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-[#E8930A] bg-orange-50' : 'border-[#6B0D0D]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-[#6B6B6B]" />
        <p className="text-[#1A1A1A]">Drag and drop file here or click to browse</p>
        {uploadedFile && (
          <p className="mt-2 text-[#E8930A]">✓ {uploadedFile}</p>
        )}
      </div>
      <p className="text-[#6B6B6B] text-sm mt-2">{helperText || 'Accepted formats: PDF, Word (.doc, .docx), TXT, RTF.'}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}