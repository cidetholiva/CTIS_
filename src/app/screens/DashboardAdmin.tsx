import { Link } from 'react-router';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';

export function DashboardAdmin() {
  const kanbanColumns = [
    { id: 'submitted', title: 'Submitted', protocols: [
      { id: 'PROT-2024-010', title: 'Novel Antibiotic for MRSA', phase: 'Phase I', days: '2 of 14', reviewer: 'Jane Doe', overdue: false }
    ]},
    { id: 'scientific', title: 'Scientific Review', protocols: [
      { id: 'PROT-2024-009', title: 'Stem Cell Therapy for Parkinson\'s', phase: 'Phase II', days: '7 of 14', reviewer: 'Sarah Johnson', overdue: false }
    ]},
    { id: 'regulatory', title: 'Regulatory Review', protocols: [
      { id: 'PROT-2024-008', title: 'Biosimilar for Rheumatoid Arthritis', phase: 'Phase III', days: '16 of 10', reviewer: 'Mike Davis', overdue: true }
    ]},
    { id: 'medical', title: 'Medical Review', protocols: [] },
    { id: 'sponsor', title: 'Sponsor Review', protocols: [] },
    { id: 'approved', title: 'Approved', protocols: [
      { id: 'PROT-2024-007', title: 'Gene Editing for Hemophilia', phase: 'Phase I', days: 'Approved', reviewer: '', overdue: false }
    ]},
    { id: 'amendments', title: 'Amendments', protocols: [] }
  ];

  return (
    <div>
      <h1 className="text-xl md:text-2xl text-[#6B0D0D] mb-6">Workflow Administrator Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard label="Total Active Reviews" value="18" />
        <StatCard label="Avg Review Time" value="23" helper="days" />
        <StatCard label="Overdue Count" value="3" valueColor="text-[#DC2626]" />
        <StatCard label="Approved This Month" value="14" valueColor="text-[#16A34A]" />
      </div>
      <div className="mb-6">
        <Link to="/workflow-config">
          <Button variant="primary" fullWidth className="sm:w-auto">Configure New Workflow</Button>
        </Link>
      </div>
      <div className="bg-white border border-[#E0E0E0] rounded p-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {kanbanColumns.map(col => (
            <div key={col.id} className="min-w-[200px] flex-shrink-0">
              <div className="bg-[#6B0D0D] text-white px-3 py-2 rounded-t text-sm">
                {col.title}
              </div>
              <div className="space-y-3 mt-3">
                {col.protocols.map(p => (
                  <div key={p.id} className={`bg-white border rounded p-3 ${p.overdue ? 'border-l-[3px] border-l-[#DC2626]' : 'border-[#E0E0E0]'}`}>
                    <div className="text-xs text-[#6B6B6B] mb-1">{p.id}</div>
                    <div className="text-sm mb-2">{p.title}</div>
                    <Badge variant="phase" className="mb-2">{p.phase}</Badge>
                    <div className="text-xs text-[#6B6B6B] mb-2">{p.days}</div>
                    {p.reviewer && <Avatar name={p.reviewer} size="sm" />}
                    {p.overdue && <Badge variant="fail" className="mt-2">Overdue</Badge>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}