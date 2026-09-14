import { StatCard } from '../components/StatCard';
import { Select } from '../components/Select';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Link } from 'react-router';

export function ReviewStatusDashboard() {
  const kanbanColumns = [
    {
      id: 'submitted',
      title: 'Submitted',
      protocols: [
        { id: 'PROT-2024-013', title: 'Novel Antibiotic Trial', phase: 'Phase I', days: '2 of 14', reviewer: 'Jane Doe', overdue: false, aiReady: true }
      ]
    },
    {
      id: 'scientific',
      title: 'Scientific Review',
      protocols: [
        { id: 'PROT-2024-012', title: 'Gene Therapy for Hemophilia', phase: 'Phase II', days: '9 of 14', reviewer: 'Sarah Johnson', overdue: false, aiReady: true },
        { id: 'PROT-2024-011', title: 'Immunotherapy Combination', phase: 'Phase III', days: '12 of 14', reviewer: 'Mike Davis', overdue: false, aiReady: true }
      ]
    },
    {
      id: 'regulatory',
      title: 'Regulatory Review',
      protocols: [
        { id: 'PROT-2024-010', title: 'Biosimilar for Arthritis', phase: 'Phase III', days: '16 of 10', reviewer: 'Emily Chen', overdue: true, aiReady: true }
      ]
    },
    {
      id: 'medical',
      title: 'Medical Review',
      protocols: [
        { id: 'PROT-2024-009', title: 'CAR-T Cell Therapy', phase: 'Phase I', days: '4 of 10', reviewer: 'David Lee', overdue: false, aiReady: true }
      ]
    },
    {
      id: 'sponsor',
      title: 'Sponsor Review',
      protocols: [
        { id: 'PROT-2024-008', title: 'mRNA Vaccine Development', phase: 'Phase II', days: '3 of 7', reviewer: '', overdue: false, aiReady: false }
      ]
    },
    {
      id: 'approved',
      title: 'Approved',
      protocols: [
        { id: 'PROT-2024-007', title: 'Targeted Therapy Study', phase: 'Phase I', days: 'Approved', reviewer: '', overdue: false, aiReady: false },
        { id: 'PROT-2024-006', title: 'Combination Chemo Trial', phase: 'Phase III', days: 'Approved', reviewer: '', overdue: false, aiReady: false }
      ]
    },
    {
      id: 'amendments',
      title: 'Amendments',
      protocols: [
        { id: 'PROT-2024-005', title: 'Stem Cell Protocol', phase: 'Phase II', days: 'Amendment requested', reviewer: '', overdue: false, aiReady: false }
      ]
    }
  ];

  return (
    <div>
      <h1 className="text-xl md:text-2xl text-[#6B0D0D] mb-6">Review Status Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard label="Total Active Reviews" value="18" />
        <StatCard label="Average Review Time" value="23" helper="days" />
        <StatCard label="Overdue Protocols" value="3" valueColor="text-[#DC2626]" />
        <StatCard label="Approved This Month" value="14" valueColor="text-[#16A34A]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Select
          defaultValue="all"
          options={[
            { value: 'all', label: 'All Reviewers' },
            { value: 'jane', label: 'Jane Doe' },
            { value: 'sarah', label: 'Sarah Johnson' }
          ]}
        />
        <Select
          defaultValue="all"
          options={[
            { value: 'all', label: 'All Stages' },
            { value: 'scientific', label: 'Scientific Review' },
            { value: 'regulatory', label: 'Regulatory Review' }
          ]}
        />
        <Select
          defaultValue="all"
          options={[
            { value: 'all', label: 'All Time' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' }
          ]}
        />
        <Select
          defaultValue="all"
          options={[
            { value: 'all', label: 'All Priorities' },
            { value: 'normal', label: 'Normal' },
            { value: 'expedited', label: 'Expedited' }
          ]}
        />
      </div>
      <div className="mb-4">
        <a href="#" className="text-[#E8930A] text-sm hover:underline">Reset filters</a>
      </div>
      <div className="bg-white border border-[#E0E0E0] rounded p-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {kanbanColumns.map(column => (
            <div key={column.id} className="min-w-[220px] flex-shrink-0">
              <div className="bg-[#6B0D0D] text-white px-4 py-2 rounded-t">
                {column.title}
              </div>
              <div className="space-y-3 mt-3">
                {column.protocols.map(protocol => (
                  <Link
                    key={protocol.id}
                    to={`/reports/compliance/${protocol.id}`}
                    className={`block bg-white border rounded-lg p-3 hover:bg-[#F9F0F0] cursor-pointer ${
                      protocol.overdue ? 'border-l-[3px] border-l-[#DC2626]' : 'border-[#E0E0E0]'
                    }`}
                  >
                    <div className="text-xs text-[#6B6B6B] mb-1">{protocol.id}</div>
                    <div className="text-sm mb-2">{protocol.title}</div>
                    <Badge variant="phase" className="mb-2">{protocol.phase}</Badge>
                    <div className="text-xs text-[#6B6B6B] mb-2">
                      {protocol.days.includes('of') ? (
                        <>
                          <span className="block">Days in stage: {protocol.days.split(' of ')[0]}</span>
                          <span className="block">Time allowed: {protocol.days.split(' of ')[1]} days</span>
                        </>
                      ) : (
                        protocol.days
                      )}
                    </div>
                    {protocol.reviewer && (
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar name={protocol.reviewer} size="sm" />
                      </div>
                    )}
                    {protocol.overdue && <Badge variant="fail">Overdue</Badge>}
                    {protocol.aiReady && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-[#E8930A]">
                        <span className="inline-block w-2 h-2 bg-[#E8930A] rounded-full"></span>
                        AI Ready
                      </div>
                    )}
                    <div className="mt-2 pt-2 border-t border-[#E0E0E0]">
                      <span className="text-xs text-[#E8930A] hover:underline">View Compliance Report →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}