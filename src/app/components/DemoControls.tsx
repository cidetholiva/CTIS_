import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DemoControlsProps {
  currentRole: string;
  onRoleChange: (role: 'PI' | 'Reviewer' | 'Admin' | 'Sponsor') => void;
}

export function DemoControls({ currentRole, onRoleChange }: DemoControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { value: 'PI', label: 'Principal Investigator' },
    { value: 'Reviewer', label: 'Reviewer' },
    { value: 'Admin', label: 'Workflow Admin' },
    { value: 'Sponsor', label: 'Sponsor' }
  ];

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#6B0D0D] text-white px-3 py-2 md:px-4 md:py-2 rounded shadow-lg flex items-center gap-2 hover:bg-[#5A0A0A]"
        >
          <span className="text-xs md:text-sm">
            <span className="hidden sm:inline">Demo Role: </span>
            {currentRole}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute bottom-full mb-2 right-0 bg-white border border-[#E0E0E0] rounded shadow-lg min-w-[180px] md:min-w-[200px]">
            {roles.map(role => (
              <button
                key={role.value}
                onClick={() => {
                  onRoleChange(role.value as any);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-xs md:text-sm hover:bg-[#F9F0F0] ${
                  currentRole === role.value ? 'bg-orange-50 text-[#E8930A]' : ''
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}