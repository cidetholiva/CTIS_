import { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { UploadZone } from '../components/UploadZone';
import { Button } from '../components/Button';
import { User, Loader2 } from 'lucide-react';

export function LOISubmission() {
  const [showToast, setShowToast] = useState(false);
  const [showAIStatus, setShowAIStatus] = useState(false);
  const [trialTitle, setTrialTitle] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [phase, setPhase] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setShowAIStatus(true);
    setTimeout(() => setShowToast(false), 5000);

    // Mark LOI as submitted
    localStorage.setItem('loiSubmitted', 'true');

    // Clear form
    setTrialTitle('');
    setSponsor('');
    setPhase('');
    setDescription('');
    setStartDate('');
    setUploadedFileName('');
  };

  return (
    <div>
      {showToast && (
        <div className="fixed top-4 right-4 left-4 md:left-auto md:right-6 md:top-6 bg-[#E8930A] text-white p-4 rounded z-50 md:max-w-md">
          <div className="mb-1 font-semibold text-sm md:text-base">LOI submitted</div>
          <div className="text-xs md:text-sm">Acknowledgement sent to pi@example.com</div>
          <div className="text-xs md:text-sm">LOI ID: LOI-2024-0047</div>
          <div className="text-xs md:text-sm mt-2">AI is now parsing your document...</div>
        </div>
      )}
      
      {showAIStatus && (
        <div className="bg-white border border-[#E0E0E0] rounded p-4 mb-6">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-[#E8930A] animate-spin flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-semibold text-sm md:text-base text-[#6B0D0D]">AI Extraction in Progress</div>
              <div className="text-xs md:text-sm text-[#6B6B6B]">Extracting protocol data from your uploaded document. You will be notified when the protocol form is ready to review.</div>
            </div>
          </div>
        </div>
      )}
      
      <h1 className="text-xl md:text-2xl text-[#6B0D0D] mb-6">Submit Letter of Intent</h1>
      <Card header="Submit Letter of Intent">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A]">PI Name</label>
            <div className="relative">
              <input
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded bg-gray-50 text-[#1A1A1A] pl-10"
                value="Dr. Jane Doe"
                disabled
              />
              <User className="absolute left-3 top-3 w-4 h-4 text-[#6B6B6B]" />
            </div>
          </div>
          <Input
            label="Trial Title"
            placeholder="Enter trial title"
            value={trialTitle}
            onChange={(e) => setTrialTitle(e.target.value)}
          />
          <Input
            label="Sponsor Organization"
            placeholder="Enter sponsor organization"
            value={sponsor}
            onChange={(e) => setSponsor(e.target.value)}
          />
          <Select
            label="Proposed Phase"
            options={[
              { value: '', label: 'Select phase' },
              { value: 'Phase I', label: 'Phase I' },
              { value: 'Phase II', label: 'Phase II' },
              { value: 'Phase III', label: 'Phase III' }
            ]}
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
          />
          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A]">Brief Description</label>
            <Textarea
              rows={8}
              maxWords={500}
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A]">Upload LOI Document</label>
            <UploadZone
              fileName={uploadedFileName}
              onFileSelect={(file) => setUploadedFileName(file.name)}
              helperText="Accepted formats: PDF, Word (.doc, .docx), TXT, RTF. No page limit. This document is parsed by the AI to extract structured protocol data."
            />
          </div>
          <Input
            label="Expected Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Button fullWidth variant="primary" type="submit">
            Submit LOI
          </Button>
        </form>
      </Card>
    </div>
  );
}