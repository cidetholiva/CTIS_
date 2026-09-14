import { useState, useEffect } from 'react';
import { Bell, Menu } from 'lucide-react';
import { Avatar } from './Avatar';
import { Badge } from './Badge';

const ctisLogo = 'https://cdn.myportfolio.com/9ad4e767-db52-4662-a159-aed2a549175d/82b49439-5829-4ab9-ab5b-290bcfd4fff5_rw_3840.png?h=3ec36cb1fab6bfbbc87a2a606b808d03';

interface TopNavProps {
  userName: string;
  userRole: string;
  onMenuClick: () => void;
}

export function TopNav({ userName, userRole, onMenuClick }: TopNavProps) {
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    if (userRole === 'Reviewer') {
      const protocolInitiated = localStorage.getItem('protocolInitiated') === 'true';
      const notificationDismissed = localStorage.getItem('notificationDismissed') === 'true';
      setHasNotification(protocolInitiated && !notificationDismissed);
    }
  }, [userRole]);

  const handleBellClick = () => {
    if (hasNotification) {
      localStorage.setItem('notificationDismissed', 'true');
      setHasNotification(false);
    }
  };

  return (
    <div className="bg-white border-b-2 border-[#6B0D0D] px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button 
          className="lg:hidden text-[#6B0D0D] hover:bg-gray-100 p-2 rounded"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
        <img src={ctisLogo} alt="CTIS Logo" className="h-8 md:h-10" />
        <span className="text-sm md:text-lg text-[#6B0D0D] hidden sm:inline">Clinical Trial Protocol Review System</span>
        <span className="text-sm md:text-lg text-[#6B0D0D] sm:hidden">CTIS</span>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <span className="text-sm text-[#1A1A1A] hidden md:inline">{userName}</span>
        <Badge variant="role">{userRole}</Badge>
        <div className="relative cursor-pointer" onClick={handleBellClick}>
          <Bell className="w-5 h-5 text-[#6B6B6B]" />
          {hasNotification && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#E8930A] rounded-full border-2 border-white"></span>
          )}
        </div>
        <div className="hidden md:block">
          <Avatar name={userName} size="sm" />
        </div>
      </div>
    </div>
  );
}