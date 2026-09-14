import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { useState } from 'react';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole: 'PI' | 'Reviewer' | 'Admin' | 'Sponsor';
  activeItem?: string;
  onLogout: () => void;
}

export function AuthenticatedLayout({ children, userName, userRole, activeItem, onLogout }: AuthenticatedLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <TopNav 
        userName={userName} 
        userRole={userRole} 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          userRole={userRole} 
          userName={userName} 
          activeItem={activeItem} 
          onLogout={onLogout}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <main className="flex-1 overflow-auto bg-[#F5F5F5] p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}