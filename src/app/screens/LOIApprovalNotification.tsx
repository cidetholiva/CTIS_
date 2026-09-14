import { Link } from 'react-router';
import { CheckCircle2, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export function LOIApprovalNotification() {
  const extractedFields = [
    { name: 'Protocol Title', extracted: true },
    { name: 'Phase Number', extracted: true },
    { name: 'Patient Population Size', extracted: true },
    { name: 'Dosage Scope', extracted: true },
    { name: 'Treatment Arms', extracted: true },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border border-[#E0E0E0] rounded p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-[#16A34A] mx-auto mb-4" />
        
        <h1 className="text-2xl text-[#6B0D0D] mb-2">Your Letter of Intent has been approved</h1>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <Badge variant="phase">LOI-2024-0047</Badge>
          <span className="text-[#6B6B6B]">•</span>
          <span className="text-[#1A1A1A]">Novel Immunotherapy for Melanoma</span>
        </div>

        <div className="bg-[#FFF9F0] border-l-4 border-l-[#E8930A] rounded p-4 mb-6 text-left">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-[#E8930A] text-white text-[10px] px-2 py-1 rounded">AI</div>
            <div className="font-semibold text-[#6B0D0D]">AI data extraction complete</div>
          </div>
          
          <div className="space-y-2">
            {extractedFields.map((field, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#16A34A]" />
                <span className="text-sm text-[#1A1A1A]">{field.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#F5F5F5] border border-[#E0E0E0] rounded p-4 mb-6">
          <p className="text-sm text-[#6B6B6B]">
            All fields have been pre-filled from your LOI document. Please review for accuracy before initiating review.
          </p>
        </div>

        <Link to="/submit-protocol">
          <Button variant="primary" fullWidth>
            Review & Initiate Protocol →
          </Button>
        </Link>
      </div>
    </div>
  );
}
