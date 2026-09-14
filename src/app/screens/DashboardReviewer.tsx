import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/Badge';
import { Bell } from 'lucide-react';

export function DashboardReviewer() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const protocolInitiated = localStorage.getItem('protocolInitiated') === 'true';
    const notificationDismissed = localStorage.getItem('notificationDismissed') === 'true';
    setShowNotification(protocolInitiated && !notificationDismissed);
  }, []);

  const handleDismissNotification = () => {
    localStorage.setItem('notificationDismissed', 'true');
    setShowNotification(false);
  };

  const queue = [
    { id: 'PROT-2024-005', title: 'CAR-T Cell Therapy for Lymphoma', stage: 'Scientific Review', days: 3, overdue: false, aiReady: true },
    { id: 'PROT-2024-006', title: 'mRNA Vaccine for Influenza', stage: 'Scientific Review', days: 15, overdue: true, aiReady: true },
    { id: 'PROT-2024-007', title: 'Targeted Therapy for Lung Cancer', stage: 'Scientific Review', days: 5, overdue: false, aiReady: false },
  ];

  return (
    <div>
      <h1 className="text-xl md:text-2xl text-[#6B0D0D] mb-6">Reviewer Dashboard</h1>

      {/* New Protocol Notification */}
      {showNotification && (
        <div className="bg-white border-2 border-[#E8930A] rounded p-4 mb-6 hover:bg-[#FFF9F0] transition-colors">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 md:w-8 md:h-8 text-[#E8930A] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm md:text-base text-[#6B0D0D] mb-1">New protocol ready for review</div>
              <div className="text-xs md:text-sm text-[#6B6B6B] mb-2">PRO-2024-0047 · Novel Immunotherapy for Melanoma</div>
              <div className="flex items-center gap-2">
                <div className="bg-[#E8930A] text-white text-[10px] px-2 py-1 rounded">AI</div>
                <span className="text-xs md:text-sm text-[#6B6B6B]">AI pre-review package available</span>
              </div>
            </div>
            <button
              onClick={handleDismissNotification}
              className="text-[#6B6B6B] hover:text-[#1A1A1A] text-xl flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard label="Assigned to Me" value="8" />
        <StatCard label="Due This Week" value="4" valueColor="text-[#E8930A]" />
        <StatCard label="Overdue" value="1" valueColor="text-[#DC2626]" />
        <StatCard label="Completed This Month" value="12" valueColor="text-[#16A34A]" />
      </div>
      <div className="bg-white border border-[#E0E0E0] rounded overflow-hidden">
        <div className="bg-[#6B0D0D] text-white px-4 py-3 rounded-t">
          Protocols Awaiting My Review
        </div>
        {/* Mobile: Card layout */}
        <div className="md:hidden">
          {queue.map(p => (
            <div key={p.id} className={`border-t border-[#E0E0E0] p-4 ${p.overdue ? 'border-l-4 border-l-[#DC2626]' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-[#6B0D0D]">{p.id}</div>
                  <div className="text-sm text-[#1A1A1A] mt-1">{p.title}</div>
                </div>
              </div>
              <div className="text-sm text-[#6B6B6B] mt-2 space-y-1">
                <div>Stage: {p.stage}</div>
                <div className="flex items-center gap-2">
                  {p.overdue && <Badge variant="fail">Overdue</Badge>}
                  <span>{p.days} days</span>
                </div>
                {p.aiReady && (
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-[#E8930A] rounded-full"></span>
                    <span>AI Ready</span>
                  </div>
                )}
              </div>
              <Link to={`/review/${p.id}/ai-package`} className="text-[#E8930A] hover:underline text-sm mt-3 inline-block">Review Protocol →</Link>
            </div>
          ))}
        </div>
        {/* Desktop: Table layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm">Protocol ID</th>
                <th className="px-4 py-3 text-left text-sm">Title</th>
                <th className="px-4 py-3 text-left text-sm">Stage</th>
                <th className="px-4 py-3 text-left text-sm">Days in Stage</th>
                <th className="px-4 py-3 text-left text-sm">AI Package</th>
                <th className="px-4 py-3 text-left text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {queue.map(p => (
                <tr key={p.id} className={`border-t border-[#E0E0E0] hover:bg-[#F9F0F0] ${p.overdue ? 'border-l-4 border-l-[#DC2626]' : ''}`}>
                  <td className="px-4 py-3 text-sm">{p.id}</td>
                  <td className="px-4 py-3 text-sm">{p.title}</td>
                  <td className="px-4 py-3 text-sm">{p.stage}</td>
                  <td className="px-4 py-3 text-sm">
                    {p.overdue && <Badge variant="fail" className="mr-2">Overdue</Badge>}
                    {p.days} days
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {p.aiReady && <span className="inline-block w-2 h-2 bg-[#E8930A] rounded-full mr-2"></span>}
                    {p.aiReady ? 'AI Ready' : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Link to={`/review/${p.id}/ai-package`} className="text-[#E8930A] hover:underline">Review Protocol</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}