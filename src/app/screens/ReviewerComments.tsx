import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Sparkles, ArrowLeft } from 'lucide-react';

export function ReviewerComments() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(1); // 1=Scientific, 2=Regulatory, 3=Medical
  const [severity, setSeverity] = useState<'critical' | 'major' | 'minor'>('minor');
  const [showTemplates, setShowTemplates] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedSection, setSelectedSection] = useState('eligibility');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const logoUrl = 'https://cdn.myportfolio.com/9ad4e767-db52-4662-a159-aed2a549175d/82b49439-5829-4ab9-ab5b-290bcfd4fff5_rw_3840.png?h=3ec36cb1fab6bfbbc87a2a606b808d03';

  const [savedComments, setSavedComments] = useState([
    { id: 1, section: 'Eligibility Criteria', severity: 'critical', text: 'Age range exclusion not justified...', reviewer: 'Jane Doe', date: '2024-04-29' },
    { id: 2, section: 'Statistical Analysis', severity: 'major', text: 'Sample size calculation missing...', reviewer: 'Jane Doe', date: '2024-04-29' }
  ]);

  const aiTemplates = [
    'Informed consent process does not adequately address potential risks',
    'Statistical methodology requires clarification on handling missing data',
    'Eligibility criteria may exclude relevant patient populations'
  ];

  const stageNames = ['Scientific Review', 'Regulatory Review', 'Medical Review'];

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveComment = () => {
    if (!commentText.trim()) {
      showToast('Please enter a comment', 'error');
      return;
    }

    const newComment = {
      id: savedComments.length + 1,
      section: selectedSection === 'eligibility' ? 'Eligibility Criteria' :
               selectedSection === 'statistical' ? 'Statistical Analysis' : 'Safety Monitoring',
      severity: severity,
      text: commentText,
      reviewer: 'Jane Doe',
      date: new Date().toISOString().split('T')[0]
    };

    setSavedComments([...savedComments, newComment]);
    setCommentText('');
    showToast('Comment saved successfully');
  };

  const handleSubmitAll = () => {
    if (savedComments.length === 0) {
      showToast('No comments to submit', 'error');
      return;
    }
    showToast(`Stage ${currentStage} review submitted. The next reviewer has been notified.`, 'success');
    setTimeout(() => {
      navigate('/my-reviews');
    }, 2000);
  };

  const handleDeleteComment = (id: number) => {
    setSavedComments(savedComments.filter(c => c.id !== id));
    showToast('Comment deleted');
  };

  const handleInsertTemplate = (template: string) => {
    setCommentText(template);
    showToast('Template inserted');
  };

  return (
    <div className="h-screen flex flex-col bg-[#F5F5F5]">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 ${toast.type === 'success' ? 'bg-[#E8930A]' : 'bg-[#DC2626]'} text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in`}>
          {toast.message}
        </div>
      )}

      {/* Top Nav - same as other screens but without sidebar */}
      <div className="bg-white border-b-2 border-[#6B0D0D] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="CTIS Logo" className="h-10" />
          <span className="text-lg text-[#6B0D0D]">Clinical Trial Protocol Review System</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#E8930A] text-white px-4 py-2 rounded text-sm">
            Stage {currentStage} of 3: {stageNames[currentStage - 1]}
          </div>
          <button onClick={() => navigate(-1)} className="text-[#E8930A] hover:underline flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to AI Package
          </button>
        </div>
      </div>

    <div className="flex-1 flex gap-4 p-6 overflow-hidden">
      <div className="flex-[3] bg-white border border-[#E0E0E0] rounded p-4 overflow-auto">
        <h3 className="text-sm text-[#6B0D0D] mb-4">Protocol Document - PROT-2024-012</h3>
        <div className="space-y-3">
          <div className="bg-[#E8930A] bg-opacity-20 border-l-4 border-[#E8930A] p-4 relative">
            <div className="absolute -right-3 top-2 w-6 h-6 bg-[#E8930A] text-white rounded-full flex items-center justify-center text-xs">1</div>
            <p className="text-sm"><strong>Section 5.1:</strong> "Dose escalation will proceed using a 3+3 design. Initial dose level will be 10mg/kg..."</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 relative">
            <div className="absolute -right-3 top-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">2</div>
            <p className="text-sm"><strong>Section 5.2:</strong> "If two or more patients experience dose-limiting toxicity..."
              <span className="text-red-600 font-medium"> [CRITICAL: Specific stopping criteria thresholds not defined]</span>
            </p>
          </div>

          <div className="bg-[#E8930A] bg-opacity-20 border-l-4 border-[#E8930A] p-4 relative">
            <div className="absolute -right-3 top-2 w-6 h-6 bg-[#E8930A] text-white rounded-full flex items-center justify-center text-xs">3</div>
            <p className="text-sm"><strong>Section 7.2:</strong> "Sample size was calculated based on 80% power to detect..."</p>
          </div>

          <div className="bg-[#E8930A] bg-opacity-20 border-l-4 border-[#E8930A] p-4 relative">
            <div className="absolute -right-3 top-2 w-6 h-6 bg-[#E8930A] text-white rounded-full flex items-center justify-center text-xs">4</div>
            <p className="text-sm"><strong>Section 6.5:</strong> "An independent data monitoring committee will be established..."</p>
          </div>
        </div>
      </div>
      <div className="flex-[2] flex flex-col gap-4">
        <div className="bg-white border border-[#E0E0E0] rounded p-4 flex-1 overflow-auto">
          <h3 className="text-lg text-[#6B0D0D] mb-4">Enter Comment</h3>
          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A] flex items-center gap-2">
              Protocol Section (AI-suggested)
              <Sparkles className="w-4 h-4 text-[#E8930A]" />
            </label>
            <Select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              options={[
                { value: 'eligibility', label: 'Eligibility Criteria' },
                { value: 'statistical', label: 'Statistical Analysis' },
                { value: 'safety', label: 'Safety Monitoring' }
              ]}
            />
          </div>
          <Textarea
            label="Comment Text"
            rows={6}
            placeholder="Enter your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A]">Severity</label>
            <div className="flex gap-2">
              {(['critical', 'major', 'minor'] as const).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeverity(s)}
                  className={`flex-1 py-2 rounded capitalize ${
                    severity === s
                      ? s === 'critical' ? 'bg-[#DC2626] text-white' :
                        s === 'major' ? 'bg-[#D97706] text-white' :
                        'bg-[#16A34A] text-white'
                      : 'bg-gray-100 text-[#1A1A1A]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-[#1A1A1A]">Attach Supporting Reference (optional)</label>
            <input type="file" className="text-sm" />
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowTemplates(!showTemplates)}
              className="text-sm text-[#E8930A] hover:underline flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {showTemplates ? 'Hide' : 'Show'} AI suggestions based on flagged issues
            </button>
            {showTemplates && (
              <div className="mt-2 space-y-2">
                {aiTemplates.map((template, i) => (
                  <div
                    key={i}
                    className="p-2 bg-orange-50 border border-[#E8930A] rounded text-sm cursor-pointer hover:bg-orange-100"
                    onClick={() => handleInsertTemplate(template)}
                  >
                    {template}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outlined" onClick={handleSaveComment}>Save Comment</Button>
            <Button variant="primary" className="flex-1" onClick={handleSubmitAll}>Submit All Comments</Button>
          </div>
        </div>
        <div className="bg-white border border-[#E0E0E0] rounded p-4 max-h-80 overflow-auto">
          <h3 className="text-lg text-[#6B0D0D] mb-4">Saved Comments</h3>
          <div className="space-y-3">
            {savedComments.map(c => (
              <div key={c.id} className="p-3 border border-[#E0E0E0] rounded">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={c.severity as any}>{c.severity}</Badge>
                  <div className="flex gap-2 text-xs text-[#E8930A] cursor-pointer">
                    <span onClick={() => {
                      setCommentText(c.text);
                      setSelectedSection(c.section.toLowerCase().includes('eligibility') ? 'eligibility' :
                                       c.section.toLowerCase().includes('statistical') ? 'statistical' : 'safety');
                      setSeverity(c.severity as any);
                      showToast('Comment loaded for editing');
                    }}>Edit</span>
                    <span onClick={() => handleDeleteComment(c.id)}>Delete</span>
                  </div>
                </div>
                <div className="text-sm text-[#6B6B6B] mb-1">{c.section}</div>
                <div className="text-sm mb-2">{c.text}</div>
                <div className="text-xs text-[#6B6B6B]">{c.reviewer} • {c.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}