import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { CheckCircle2 } from 'lucide-react';

export function DashboardPI() {
  const [loiSubmitted, setLoiSubmitted] = useState(false);

  useEffect(() => {
    const submitted = localStorage.getItem('loiSubmitted') === 'true';
    setLoiSubmitted(submitted);
  }, []);

  const protocols = [
    { id: 'PROT-2024-001', title: 'Novel Immunotherapy for Melanoma', phase: 'Phase II', status: 'Scientific Review', days: 7 },
    { id: 'PROT-2024-002', title: 'Combination Therapy for Type 2 Diabetes', phase: 'Phase III', status: 'Regulatory Review', days: 12 },
    { id: 'PROT-2024-003', title: 'Gene Therapy for Sickle Cell Disease', phase: 'Phase I', status: 'Approved', days: 45 },
  ];

  return (
    <div>
      <h1 className="text-xl md:text-2xl text-[#6B0D0D] mb-6">Principal Investigator Dashboard</h1>

      {/* LOI Approval Notification - only show if LOI has been submitted */}
      {loiSubmitted && (
        <Link to="/loi-approval-notification">
          <div className="bg-white border-2 border-[#16A34A] rounded p-4 mb-6 hover:bg-[#F0FDF4] transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-[#16A34A] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm md:text-base text-[#6B0D0D] mb-1">Your Letter of Intent has been approved</div>
                <div className="text-xs md:text-sm text-[#6B6B6B] mb-2">LOI-2024-0047 · Novel Immunotherapy for Melanoma</div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#E8930A] text-white text-[10px] px-2 py-1 rounded">AI</div>
                  <span className="text-xs md:text-sm text-[#6B6B6B]">AI data extraction complete</span>
                </div>
              </div>
              <div className="text-[#E8930A] text-xs md:text-sm font-semibold flex-shrink-0 hidden sm:block">Review & Initiate →</div>
            </div>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard label="My Active Trials" value="12" />
        <StatCard label="Protocols Submitted" value="24" />
        <StatCard label="Awaiting PI Action" value="3" valueColor="text-[#E8930A]" />
        <StatCard label="Approved This Month" value="5" valueColor="text-[#16A34A]" />
      </div>
      <div className="mb-6 flex flex-col sm:flex-row gap-3 md:gap-4">
        <Link to="/submit-loi" className="flex-1 sm:flex-none">
          <Button variant="primary" fullWidth>Submit New LOI</Button>
        </Link>
        <Link to="/submit-protocol" className="flex-1 sm:flex-none">
          <Button variant="primary" fullWidth>Review Protocol</Button>
        </Link>
      </div>
      <div className="bg-white border border-[#E0E0E0] rounded overflow-hidden">
        <div className="bg-[#6B0D0D] text-white px-4 py-3 rounded-t">
          My Protocols
        </div>
        {/* Mobile: Card layout */}
        <div className="md:hidden">
          {protocols.map(p => (
            <div key={p.id} className="border-t border-[#E0E0E0] p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-sm text-[#6B0D0D]">{p.id}</div>
                  <div className="text-sm text-[#1A1A1A] mt-1">{p.title}</div>
                </div>
                <Badge variant="phase">{p.phase}</Badge>
              </div>
              <div className="text-sm text-[#6B6B6B] mt-2">
                <div>Status: {p.status}</div>
                <div>Days in Review: {p.days}</div>
              </div>
              <Link to="/reports/compliance/1" className="text-[#E8930A] hover:underline text-sm mt-2 inline-block">View Details →</Link>
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
                <th className="px-4 py-3 text-left text-sm">Phase</th>
                <th className="px-4 py-3 text-left text-sm">Status</th>
                <th className="px-4 py-3 text-left text-sm">Days in Review</th>
                <th className="px-4 py-3 text-left text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {protocols.map(p => (
                <tr key={p.id} className="border-t border-[#E0E0E0] hover:bg-[#F9F0F0]">
                  <td className="px-4 py-3 text-sm">{p.id}</td>
                  <td className="px-4 py-3 text-sm">{p.title}</td>
                  <td className="px-4 py-3 text-sm">
                    <Badge variant="phase">{p.phase}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">{p.status}</td>
                  <td className="px-4 py-3 text-sm">{p.days}</td>
                  <td className="px-4 py-3 text-sm">
                    <Link to="/reports/compliance/1" className="text-[#E8930A] hover:underline">View</Link>
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