import { Home, FileText, Settings, BarChart, FileCheck, LogOut } from 'lucide-react';
import { Link } from 'react-router';
import { Avatar } from './Avatar';
import { Badge } from './Badge';

interface SidebarProps {
  userRole: 'PI' | 'Reviewer' | 'Admin' | 'Sponsor';
  userName: string;
  activeItem?: string;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ userRole, userName, activeItem, onLogout, isOpen, onClose }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['PI', 'Reviewer', 'Admin', 'Sponsor'], path: '/' },
    { id: 'submit-protocol', label: 'Submit LOI', icon: FileText, roles: ['PI'], path: '/submit-protocol' },
    { id: 'workflow-config', label: 'Workflow Config', icon: Settings, roles: ['Admin'], isAdmin: true, path: '/workflow-config' },
    { id: 'reports', label: 'Reports', icon: BarChart, roles: ['Reviewer', 'Admin'], path: '/reports' },
    { id: 'audit-log', label: 'Audit Log', icon: FileCheck, roles: ['Admin'], isAdmin: true, path: '/reports/amendments/1' },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(userRole));

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 z-40
      w-[220px] bg-[#6B0D0D] text-white flex flex-col h-full
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <nav className="flex-1 py-6">
        {filteredItems.map(item => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={handleLinkClick}
              className={`px-4 py-3 flex items-center gap-3 cursor-pointer ${
                isActive ? 'bg-[#5A0A0A] border-l-[3px] border-l-[#E8930A]' : 'hover:bg-[#5A0A0A]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.isAdmin && <Badge variant="admin">Admin</Badge>}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[#5A0A0A] p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar name={userName} size="sm" />
          <div className="flex-1">
            <div className="text-sm">{userName}</div>
            <div className="text-xs text-gray-300">{userRole}</div>
          </div>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-sm hover:text-[#E8930A]">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}