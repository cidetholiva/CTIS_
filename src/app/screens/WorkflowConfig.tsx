import { useState } from 'react';
import { Card } from '../components/Card';
import { Select } from '../components/Select';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Check, Search, X } from 'lucide-react';
import { toast } from 'sonner';

// Available people database
const availablePeople = [
  { id: '1', name: 'Dr. Sarah Johnson', role: 'Scientific Reviewer', expertise: 'Oncology, Immunotherapy' },
  { id: '2', name: 'Dr. Mike Davis', role: 'Regulatory Reviewer', expertise: 'FDA Compliance, Clinical Trials' },
  { id: '3', name: 'Dr. Emily Chen', role: 'Medical Officer', expertise: 'Cardiology, Patient Safety' },
  { id: '4', name: 'Dr. Robert Martinez', role: 'Scientific Reviewer', expertise: 'Neurology, Drug Development' },
  { id: '5', name: 'Dr. Lisa Anderson', role: 'Regulatory Reviewer', expertise: 'EMA Guidelines, Documentation' },
  { id: '6', name: 'Dr. James Wilson', role: 'Medical Officer', expertise: 'Infectious Disease, Antibiotics' },
  { id: '7', name: 'Dr. Maria Garcia', role: 'Scientific Reviewer', expertise: 'Molecular Biology, Genetics' },
  { id: '8', name: 'Dr. David Lee', role: 'Regulatory Reviewer', expertise: 'ICH Guidelines, Audit' },
  { id: '9', name: 'Dr. Jennifer Brown', role: 'Medical Officer', expertise: 'Endocrinology, Metabolism' },
  { id: '10', name: 'Dr. Thomas White', role: 'Scientific Reviewer', expertise: 'Pharmacology, Toxicology' },
];

export function WorkflowConfig() {
  const [priority, setPriority] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState<'scientific' | 'regulatory' | 'medical' | null>(null);
  
  const [scientificReviewer, setScientificReviewer] = useState(availablePeople[0]);
  const [regulatoryReviewer, setRegulatoryReviewer] = useState(availablePeople[1]);
  const [medicalOfficer, setMedicalOfficer] = useState(availablePeople[2]);

  const selectedReviewers = [
    { name: scientificReviewer.name, role: scientificReviewer.role },
    { name: regulatoryReviewer.name, role: regulatoryReviewer.role },
    { name: medicalOfficer.name, role: medicalOfficer.role }
  ];

  const handleSearch = (type: 'scientific' | 'regulatory' | 'medical') => {
    setActiveSearch(type);
    setSearchQuery('');
  };

  const handleSelectPerson = (person: typeof availablePeople[0]) => {
    if (activeSearch === 'scientific') {
      setScientificReviewer(person);
      toast.success(`Assigned ${person.name} as Scientific Reviewer`);
    } else if (activeSearch === 'regulatory') {
      setRegulatoryReviewer(person);
      toast.success(`Assigned ${person.name} as Regulatory Reviewer`);
    } else if (activeSearch === 'medical') {
      setMedicalOfficer(person);
      toast.success(`Assigned ${person.name} as Medical Officer`);
    }
    setActiveSearch(null);
    setSearchQuery('');
  };

  const filteredPeople = availablePeople.filter(person => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = person.name.toLowerCase().includes(query) || 
                         person.expertise.toLowerCase().includes(query);
    
    // Filter by role type if searching for specific role
    if (activeSearch === 'scientific') {
      return matchesSearch && person.role === 'Scientific Reviewer';
    } else if (activeSearch === 'regulatory') {
      return matchesSearch && person.role === 'Regulatory Reviewer';
    } else if (activeSearch === 'medical') {
      return matchesSearch && person.role === 'Medical Officer';
    }
    
    return matchesSearch;
  });

  if (submitted) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Badge variant="admin">Admin</Badge>
          <span className="text-xs md:text-sm text-[#6B6B6B]">Dashboard {'>'} New Workflow</span>
        </div>
        <div className="bg-[#6B0D0D] text-white rounded p-6 md:p-8">
          <div className="text-center mb-6 text-sm md:text-base">
            Workflow initiated. Notification emails sent to 3 reviewers.
          </div>
          <div className="space-y-3">
            {selectedReviewers.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm md:text-base">{r.name}</span>
                <Badge variant="role">{r.role}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Badge variant="admin">Admin</Badge>
        <span className="text-xs md:text-sm text-[#6B6B6B]">Dashboard {'>'} New Workflow</span>
      </div>
      <Card header="Configure New Workflow">
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <Select
            label="Select Protocol"
            defaultValue=""
            options={[
              { value: '', label: 'Select protocol' },
              { value: 'PROT-2024-010', label: 'PROT-2024-010 - Novel Antibiotic for MRSA (Phase I)' },
              { value: 'PROT-2024-011', label: 'PROT-2024-011 - mRNA Cancer Vaccine (Phase II)' }
            ]}
          />
          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A]">Scientific Reviewer Assignment</label>
            <div className="flex items-center gap-3 p-3 border border-[#E0E0E0] rounded">
              <Avatar name={scientificReviewer.name} size="sm" />
              <div className="flex-1">
                <div className="text-sm">{scientificReviewer.name}</div>
                <Badge variant="role">{scientificReviewer.role}</Badge>
                <div className="text-xs text-[#6B6B6B] mt-1">{scientificReviewer.expertise}</div>
              </div>
            </div>
            <div className="mt-2">
              <Button
                type="button"
                onClick={() => handleSearch('scientific')}
                className="text-sm"
              >
                <Search className="w-4 h-4 mr-1" />
                Change Reviewer
              </Button>
            </div>
            {activeSearch === 'scientific' && (
              <div className="mt-3 border border-[#E8930A] rounded p-3 bg-[#FFF9F0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Search Scientific Reviewers</span>
                  <button
                    type="button"
                    onClick={() => setActiveSearch(null)}
                    className="text-[#6B6B6B] hover:text-[#1A1A1A]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or expertise..."
                />
                <div className="mt-2 max-h-64 overflow-y-auto space-y-2">
                  {filteredPeople.map(person => (
                    <div
                      key={person.id}
                      className="flex items-center gap-3 p-3 border border-[#E0E0E0] rounded cursor-pointer hover:bg-white hover:border-[#E8930A] transition-colors"
                      onClick={() => handleSelectPerson(person)}
                    >
                      <Avatar name={person.name} size="sm" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{person.name}</div>
                        <div className="text-xs text-[#6B6B6B]">{person.expertise}</div>
                      </div>
                    </div>
                  ))}
                  {filteredPeople.length === 0 && (
                    <div className="text-center text-sm text-[#6B6B6B] py-4">
                      No reviewers found matching your search.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A]">Regulatory Reviewer Assignment</label>
            <div className="flex items-center gap-3 p-3 border border-[#E0E0E0] rounded">
              <Avatar name={regulatoryReviewer.name} size="sm" />
              <div className="flex-1">
                <div className="text-sm">{regulatoryReviewer.name}</div>
                <Badge variant="role">{regulatoryReviewer.role}</Badge>
                <div className="text-xs text-[#6B6B6B] mt-1">{regulatoryReviewer.expertise}</div>
              </div>
            </div>
            <div className="mt-2">
              <Button
                type="button"
                onClick={() => handleSearch('regulatory')}
                className="text-sm"
              >
                <Search className="w-4 h-4 mr-1" />
                Change Reviewer
              </Button>
            </div>
            {activeSearch === 'regulatory' && (
              <div className="mt-3 border border-[#E8930A] rounded p-3 bg-[#FFF9F0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Search Regulatory Reviewers</span>
                  <button
                    type="button"
                    onClick={() => setActiveSearch(null)}
                    className="text-[#6B6B6B] hover:text-[#1A1A1A]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or expertise..."
                />
                <div className="mt-2 max-h-64 overflow-y-auto space-y-2">
                  {filteredPeople.map(person => (
                    <div
                      key={person.id}
                      className="flex items-center gap-3 p-3 border border-[#E0E0E0] rounded cursor-pointer hover:bg-white hover:border-[#E8930A] transition-colors"
                      onClick={() => handleSelectPerson(person)}
                    >
                      <Avatar name={person.name} size="sm" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{person.name}</div>
                        <div className="text-xs text-[#6B6B6B]">{person.expertise}</div>
                      </div>
                    </div>
                  ))}
                  {filteredPeople.length === 0 && (
                    <div className="text-center text-sm text-[#6B6B6B] py-4">
                      No reviewers found matching your search.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A]">Medical Officer Assignment</label>
            <div className="flex items-center gap-3 p-3 border border-[#E0E0E0] rounded">
              <Avatar name={medicalOfficer.name} size="sm" />
              <div className="flex-1">
                <div className="text-sm">{medicalOfficer.name}</div>
                <Badge variant="role">{medicalOfficer.role}</Badge>
                <div className="text-xs text-[#6B6B6B] mt-1">{medicalOfficer.expertise}</div>
              </div>
            </div>
            <div className="mt-2">
              <Button
                type="button"
                onClick={() => handleSearch('medical')}
                className="text-sm"
              >
                <Search className="w-4 h-4 mr-1" />
                Change Reviewer
              </Button>
            </div>
            {activeSearch === 'medical' && (
              <div className="mt-3 border border-[#E8930A] rounded p-3 bg-[#FFF9F0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Search Medical Officers</span>
                  <button
                    type="button"
                    onClick={() => setActiveSearch(null)}
                    className="text-[#6B6B6B] hover:text-[#1A1A1A]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or expertise..."
                />
                <div className="mt-2 max-h-64 overflow-y-auto space-y-2">
                  {filteredPeople.map(person => (
                    <div
                      key={person.id}
                      className="flex items-center gap-3 p-3 border border-[#E0E0E0] rounded cursor-pointer hover:bg-white hover:border-[#E8930A] transition-colors"
                      onClick={() => handleSelectPerson(person)}
                    >
                      <Avatar name={person.name} size="sm" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{person.name}</div>
                        <div className="text-xs text-[#6B6B6B]">{person.expertise}</div>
                      </div>
                    </div>
                  ))}
                  {filteredPeople.length === 0 && (
                    <div className="text-center text-sm text-[#6B6B6B] py-4">
                      No reviewers found matching your search.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <Input
            label="Review Deadline — Scientific Stage"
            type="date"
            helper="Recommended: 14 days"
          />
          <Input
            label="Review Deadline — Regulatory Stage"
            type="date"
            helper="Recommended: 10 days"
          />
          <Input
            label="Review Deadline — Medical Stage"
            type="date"
            helper="Recommended: 10 days"
          />
          <div className="mb-6">
            <label className="flex items-center justify-between mb-2">
              <span className="text-[#1A1A1A] flex items-center gap-2">
                Priority Level
                {priority && <Badge variant="expedited">Expedited</Badge>}
              </span>
              <button
                type="button"
                onClick={() => setPriority(!priority)}
                className={`w-12 h-6 rounded-full transition-colors ${priority ? 'bg-[#E8930A]' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${priority ? 'translate-x-7' : 'translate-x-0.5'}`}></div>
              </button>
            </label>
            <div className="text-sm text-[#6B6B6B]">
              {priority ? 'Expedited' : 'Normal'}
            </div>
          </div>
          <Button fullWidth variant="secondary" type="submit">
            Initiate Workflow
          </Button>
        </form>
      </Card>
    </div>
  );
}