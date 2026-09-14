import { useState } from 'react';
import { AIContentIndicator } from '../components/AIContentIndicator';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Textarea } from '../components/Textarea';

export function SponsorPortal() {
  const [decision, setDecision] = useState<'approve' | 'amend' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#6B0D0D] text-white rounded p-8 text-center">
          <h2 className="text-2xl mb-4">Sponsor approval submitted</h2>
          <p>NIH notification will be sent automatically upon final system processing.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl text-[#6B0D0D] mb-6">Protocol Review and Approval</h1>
      <div className="mb-6 bg-white border border-[#E0E0E0] rounded p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-[#6B6B6B]">PROT-2024-012</div>
            <h2 className="text-xl mb-2">Gene Therapy for Hemophilia</h2>
            <Badge variant="phase">Phase II</Badge>
          </div>
          <div className="text-right text-sm text-[#6B6B6B]">
            <div>Submitted: 2024-04-01</div>
            <div>Review Completed: 2024-04-29</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 bg-white border border-[#E0E0E0] rounded p-4 h-96 overflow-auto">
          <h3 className="text-lg text-[#6B0D0D] mb-4">Reviewed Protocol Document</h3>
          <div className="space-y-4 text-sm text-[#1A1A1A]">
            <div>
              <h4 className="text-[#6B0D0D] mb-2">1. Protocol Summary</h4>
              <p className="text-[#6B6B6B] leading-relaxed">
                This Phase II clinical trial investigates a novel gene therapy approach (XYZ-GT-001) for treatment
                of Hemophilia A in adults. The study employs a single-arm, open-label design with 50 participants
                across 8 specialized hemophilia treatment centers.
              </p>
            </div>
            <div>
              <h4 className="text-[#6B0D0D] mb-2">2. Objectives</h4>
              <p className="text-[#6B6B6B] leading-relaxed">
                Primary: Assess sustained Factor VIII expression at 52 weeks post-infusion.
                Secondary: Evaluate bleeding rate reduction and safety profile over 2 years.
              </p>
            </div>
            <div>
              <h4 className="text-[#6B0D0D] mb-2">3. Eligibility Criteria</h4>
              <p className="text-[#6B6B6B] leading-relaxed">
                Adults aged 18-65 with severe Hemophilia A (Factor VIII {'<'}1%), no history of Factor VIII inhibitors,
                adequate liver function, and BMI {'<'}35 kg/m².
              </p>
            </div>
            <div>
              <h4 className="text-[#6B0D0D] mb-2">4. Treatment Plan</h4>
              <p className="text-[#6B6B6B] leading-relaxed">
                Single intravenous infusion of XYZ-GT-001 at dose 2×10¹³ vector genomes/kg, with immunosuppression
                protocol to manage immune response to viral vector.
              </p>
            </div>
          </div>
        </div>

        <div>
          <AIContentIndicator className="bg-white rounded mb-4">
            <div className="p-4">
              <h3 className="text-lg text-[#6B0D0D] mb-3">Protocol Validation</h3>
              <div className="mb-4">
                <div className="text-4xl text-[#16A34A] mb-2">85%</div>
                <div className="text-sm text-[#6B6B6B]">Compliance Score</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="pass">Pass</Badge>
                  <span>Informed Consent</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="pass">Pass</Badge>
                  <span>Safety Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning">Warning</Badge>
                  <span>Statistical Plan</span>
                </div>
              </div>
            </div>
          </AIContentIndicator>

          <div className="bg-white border border-[#E0E0E0] rounded p-4">
            <h3 className="text-lg text-[#6B0D0D] mb-4">Decision</h3>
            {!decision ? (
              <div className="space-y-3">
                <Button
                  fullWidth
                  variant="primary"
                  onClick={() => setDecision('approve')}
                >
                  Approve Protocol
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setDecision('amend')}
                >
                  Request Amendment
                </Button>
              </div>
            ) : decision === 'amend' ? (
              <div>
                <Textarea
                  label="Amendment Description"
                  rows={6}
                  placeholder="Describe required changes..."
                />
                <div className="mb-4">
                  <label className="block mb-2 text-sm text-[#1A1A1A]">
                    Upload Redline Document
                  </label>
                  <input type="file" className="text-sm" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outlined" onClick={() => setDecision(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSubmit} className="flex-1">
                    Submit Request
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-[#6B6B6B] mb-4">
                  Confirm protocol approval? This action cannot be undone.
                </p>
                <div className="flex gap-2">
                  <Button variant="outlined" onClick={() => setDecision(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSubmit} className="flex-1">
                    Confirm Approval
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
