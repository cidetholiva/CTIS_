import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Download, ArrowLeft } from 'lucide-react';

export function AmendmentHistory() {
  const navigate = useNavigate();
  const [selectedAmendment, setSelectedAmendment] = useState(0);
  const [activeTab, setActiveTab] = useState<'diff' | 'comments' | 'audit'>('diff');
  const [showComments, setShowComments] = useState(true);

  const amendments = [
    { id: 1, date: '2024-04-15', description: 'Updated eligibility criteria age range', status: 'approved' },
    { id: 2, date: '2024-04-20', description: 'Revised safety monitoring protocol', status: 'approved' },
    { id: 3, date: '2024-04-28', description: 'Modified dosing schedule', status: 'pending' }
  ];

  const auditLog = [
    { timestamp: '2024-04-30 14:23:15', userId: 'john.smith@ctis.gov', role: 'Scientific Reviewer', action: 'Comment Added', entity: 'PROT-2024-012', details: 'Critical severity comment on Section 4.1' },
    { timestamp: '2024-04-30 13:45:22', userId: 'pi@university.edu', role: 'Principal Investigator', action: 'Amendment Submitted', entity: 'AMEND-003', details: 'Modified dosing schedule v2.3 → v2.4' },
    { timestamp: '2024-04-29 16:12:08', userId: 'admin@ctis.gov', role: 'Workflow Admin', action: 'Workflow Updated', entity: 'WF-2024-045', details: 'Reassigned regulatory reviewer' },
    { timestamp: '2024-04-29 09:33:41', userId: 'sarah.johnson@ctis.gov', role: 'Scientific Reviewer', action: 'Review Completed', entity: 'PROT-2024-012', details: 'Scientific review phase completed with 3 comments' }
  ];

  return (
    <div className="h-[calc(100vh-120px)]">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#E8930A] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-2xl text-[#6B0D0D]">Protocol Amendment History</h1>
      </div>
      <div className="flex gap-4 h-[calc(100%-60px)]">
        <div className="w-60 bg-white border border-[#E0E0E0] rounded p-4 overflow-auto">
          <h3 className="text-sm text-[#6B0D0D] mb-3">Amendment Timeline</h3>
          <div className="space-y-2">
            {amendments.map((amendment, i) => (
              <div
                key={amendment.id}
                className={`p-3 border rounded cursor-pointer ${
                  selectedAmendment === i ? 'border-[#E8930A] bg-orange-50' : 'border-[#E0E0E0] hover:bg-gray-50'
                }`}
                onClick={() => setSelectedAmendment(i)}
              >
                <div className="text-xs text-[#6B6B6B] mb-1">{amendment.date}</div>
                <div className="text-sm mb-2">{amendment.description}</div>
                <Badge variant={amendment.status === 'approved' ? 'pass' : amendment.status === 'pending' ? 'warning' : 'fail'}>
                  {amendment.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white border border-[#E0E0E0] rounded flex flex-col">
          <div className="flex border-b border-[#E0E0E0]">
            {(['diff', 'comments', 'audit'] as const).map(tab => (
              <button
                key={tab}
                className={`px-6 py-3 capitalize ${
                  activeTab === tab ? 'border-b-2 border-[#E8930A] text-[#E8930A]' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'diff' ? 'Version Diff' : tab === 'comments' ? 'Comment Tracking' : 'Full Audit Trail'}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-auto p-4">
            {activeTab === 'diff' && (
              <div>
                <div className="flex gap-4 mb-4">
                  <select className="px-3 py-2 border border-[#E0E0E0] rounded text-sm" defaultValue="Version 2.3">
                    <option>Version 2.3</option>
                    <option>Version 2.2</option>
                    <option>Version 2.1</option>
                  </select>
                  <span className="self-center text-[#6B6B6B]">→</span>
                  <select className="px-3 py-2 border border-[#E0E0E0] rounded text-sm" defaultValue="Version 2.4">
                    <option>Version 2.4</option>
                    <option>Version 2.3</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <div className="font-mono text-sm p-3 bg-red-50 border-l-4 border-red-500">
                    <span className="text-red-700">- Patients aged 18-65 years</span>
                  </div>
                  <div className="font-mono text-sm p-3 bg-green-50 border-l-4 border-green-500">
                    <span className="text-green-700">+ Patients aged 18-75 years</span>
                  </div>
                  <div className="font-mono text-sm p-3 bg-red-50 border-l-4 border-red-500">
                    <span className="text-red-700">- Dosing every 4 weeks</span>
                  </div>
                  <div className="font-mono text-sm p-3 bg-green-50 border-l-4 border-green-500">
                    <span className="text-green-700">+ Dosing every 3 weeks for first 12 weeks, then every 4 weeks</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div className="space-y-4">
                <div className="p-4 border border-[#E0E0E0] rounded">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="major">Major</Badge>
                    <span className="text-xs text-[#6B6B6B]">Dr. Sarah Johnson • 2024-04-28</span>
                  </div>
                  <div className="text-sm mb-2">
                    Age range exclusion needs scientific justification based on pharmacokinetic data
                  </div>
                  <div className="text-xs text-[#E8930A]">→ Triggered Amendment #1</div>
                </div>
                <div className="p-4 border border-[#E0E0E0] rounded">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="critical">Critical</Badge>
                    <span className="text-xs text-[#6B6B6B]">Dr. Mike Davis • 2024-04-26</span>
                  </div>
                  <div className="text-sm mb-2">
                    Dosing schedule must align with FDA guidance for this drug class
                  </div>
                  <div className="text-xs text-[#E8930A]">→ Triggered Amendment #3</div>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div>
                <p className="text-xs text-[#6B6B6B] mb-4">
                  The AuditLog records every system action using the polymorphic entityType + entityID pattern
                </p>
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left">Timestamp</th>
                      <th className="px-3 py-2 text-left">User ID</th>
                      <th className="px-3 py-2 text-left">Role</th>
                      <th className="px-3 py-2 text-left">Action Type</th>
                      <th className="px-3 py-2 text-left">Entity</th>
                      <th className="px-3 py-2 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLog.map((entry, i) => (
                      <tr key={i} className="border-t border-[#E0E0E0] hover:bg-[#F9F0F0]">
                        <td className="px-3 py-3">{entry.timestamp}</td>
                        <td className="px-3 py-3 text-[#6B6B6B]">{entry.userId}</td>
                        <td className="px-3 py-3">{entry.role}</td>
                        <td className="px-3 py-3">{entry.action}</td>
                        <td className="px-3 py-3">{entry.entity}</td>
                        <td className="px-3 py-3 text-[#6B6B6B]">{entry.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="border-t border-[#E0E0E0] p-4">
            <Button variant="outlined" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {showComments && (
          <div className="w-72 bg-white border border-[#E0E0E0] rounded p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-[#6B0D0D]">Comment Tracking</h3>
              <button onClick={() => setShowComments(false)} className="text-[#6B6B6B] hover:text-[#1A1A1A]">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-2 bg-gray-50 rounded">
                <Badge variant="major" className="mb-1">Major</Badge>
                <p className="text-[#6B6B6B]">Age range needs justification</p>
                <p className="text-[#E8930A] mt-1">→ Triggered AMEND-001</p>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <Badge variant="critical" className="mb-1">Critical</Badge>
                <p className="text-[#6B6B6B]">Dosing schedule alignment required</p>
                <p className="text-[#E8930A] mt-1">→ Triggered AMEND-003</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
