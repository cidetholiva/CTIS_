import { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { UploadZone } from '../components/UploadZone';
import { Button } from '../components/Button';
import { Lock, Check, Sparkles } from 'lucide-react';

export function ProtocolSubmission() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [protocolTitle, setProtocolTitle] = useState('Novel Immunotherapy for Melanoma');
  const [phase, setPhase] = useState('Phase II');
  const [populationSize, setPopulationSize] = useState('150');
  const [dosageScope, setDosageScope] = useState('10mg - 50mg daily');
  const [treatmentArms, setTreatmentArms] = useState('3');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    localStorage.setItem('protocolInitiated', 'true');
    localStorage.setItem('loiSubmitted', 'false');
  };

  if (submitted) {
    return (
      <div>
        <h1 className="text-xl md:text-2xl text-[#6B0D0D] mb-6">Protocol Review Initiation</h1>
        <div className="bg-[#6B0D0D] text-white rounded p-6 md:p-8 text-center">
          <Check className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl mb-4">Review workflow initiated</h2>
          <div className="mb-2">
            <div className="text-base md:text-lg mb-1">Protocol ID: <span className="font-bold">PRO-2024-0047</span></div>
            <div className="text-xs md:text-sm mb-1">Version 1 · Status: Under Review</div>
          </div>
          <div className="text-xs md:text-sm mt-4">
            The Workflow Administrator has been notified to assign reviewers.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl md:text-2xl text-[#6B0D0D] mb-6">Review Protocol — AI Pre-filled</h1>
      
      <div className="bg-[#FFF9F0] border-l-4 border-l-[#E8930A] rounded p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#E8930A] text-white text-[10px] px-2 py-1 rounded">AI</div>
          <div className="font-semibold text-sm md:text-base text-[#6B0D0D]">AI Pre-filled Form</div>
        </div>
        <p className="text-xs md:text-sm text-[#6B6B6B]">
          This form has been pre-filled by AI from your LOI document. Please review each field for accuracy before initiating review.
        </p>
      </div>

      <Card header="Review Protocol — AI Pre-filled">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A]">
              Trial Number <span className="text-[#6B6B6B] text-sm">(Auto-assigned)</span>
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded bg-gray-50 text-[#6B6B6B]"
                value="TRIAL-2024-AUTO"
                disabled
              />
              <Lock className="absolute right-3 top-3 w-4 h-4 text-[#6B6B6B]" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A] flex items-center gap-2">
              Protocol Title
              <Sparkles className="w-3 h-3 text-[#E8930A]" />
              <span className="text-[10px] bg-[#E8930A] text-white px-2 py-0.5 rounded">AI</span>
            </label>
            <input
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded bg-[#FFFEF8] text-[#1A1A1A]"
              value={protocolTitle}
              onChange={(e) => setProtocolTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A] flex items-center gap-2">
              Phase Number
              <Sparkles className="w-3 h-3 text-[#E8930A]" />
              <span className="text-[10px] bg-[#E8930A] text-white px-2 py-0.5 rounded">AI</span>
            </label>
            <Select
              options={[
                { value: 'Phase I', label: 'Phase I' },
                { value: 'Phase II', label: 'Phase II' },
                { value: 'Phase III', label: 'Phase III' }
              ]}
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              className="bg-[#FFFEF8]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A] flex items-center gap-2">
              Patient Population Size
              <Sparkles className="w-3 h-3 text-[#E8930A]" />
              <span className="text-[10px] bg-[#E8930A] text-white px-2 py-0.5 rounded">AI</span>
            </label>
            <input
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded bg-[#FFFEF8] text-[#1A1A1A]"
              value={populationSize}
              onChange={(e) => setPopulationSize(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A] flex items-center gap-2">
              Dosage Scope
              <Sparkles className="w-3 h-3 text-[#E8930A]" />
              <span className="text-[10px] bg-[#E8930A] text-white px-2 py-0.5 rounded">AI</span>
            </label>
            <input
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded bg-[#FFFEF8] text-[#1A1A1A]"
              value={dosageScope}
              onChange={(e) => setDosageScope(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A] flex items-center gap-2">
              Treatment Arms
              <Sparkles className="w-3 h-3 text-[#E8930A]" />
              <span className="text-[10px] bg-[#E8930A] text-white px-2 py-0.5 rounded">AI</span>
            </label>
            <input
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded bg-[#FFFEF8] text-[#1A1A1A]"
              value={treatmentArms}
              onChange={(e) => setTreatmentArms(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A]">Upload Protocol Document</label>
            <UploadZone
              fileName={uploadedFileName}
              onFileSelect={(file) => setUploadedFileName(file.name)}
              helperText="Upload final protocol document if different from LOI document. Accepted formats: PDF, Word (.doc, .docx), TXT, RTF. No page limit."
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A]">Associated Letter of Intent</label>
            <div className="relative">
              <input
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded bg-gray-50 text-[#6B6B6B]"
                value="LOI-2024-0047 (Approved)"
                disabled
              />
              <Lock className="absolute right-3 top-3 w-4 h-4 text-[#6B6B6B]" />
            </div>
          </div>

          <div className="flex gap-3">
            <Button fullWidth variant="primary" type="submit">
              Initiate Review
            </Button>
          </div>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-[#E8930A] text-xs md:text-sm hover:underline">
              Request Corrections
            </a>
            <p className="text-[10px] md:text-xs text-[#6B6B6B] mt-1">If you spot errors in AI extraction, flag for review</p>
          </div>
        </form>
      </Card>
    </div>
  );
}