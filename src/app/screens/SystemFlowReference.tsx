import { Badge } from '../components/Badge';
import { ArrowDown } from 'lucide-react';

export function SystemFlowReference() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Badge variant="role">PI</Badge>
        <span className="text-[#6B6B6B]">Dashboard {'>'} System Flow Reference</span>
      </div>
      <h1 className="text-2xl text-[#6B0D0D] mb-6">CTIS Workflow Reference</h1>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Input Screens */}
        <div>
          <div className="bg-[#FFF9F0] border-2 border-[#E8930A] rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">INPUT SCREENS — IN FLOW ORDER</h2>
          </div>

          {/* Step 1 */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 mb-4">
            <div className="text-[#E8930A] text-sm font-semibold mb-2">Step 1 — IN-4</div>
            <h3 className="text-lg font-semibold mb-2">Letter of Intent submission</h3>
            <div className="text-sm text-[#6B6B6B] mb-2">Principal Investigator</div>
            <p className="text-sm">
              PI declares their intention to run a trial. Must be approved before a protocol can be submitted.
            </p>
          </div>

          <div className="flex justify-center mb-4">
            <ArrowDown className="w-6 h-6 text-[#6B6B6B]" />
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 mb-4">
            <div className="text-[#E8930A] text-sm font-semibold mb-2">Step 2 — IN-1</div>
            <h3 className="text-lg font-semibold mb-2">Protocol submission form</h3>
            <div className="text-sm text-[#6B6B6B] mb-2">Principal Investigator</div>
            <p className="text-sm">
              PI fills out trial details and uploads the protocol document. System generates a Protocol ID and kicks off AI analysis.
            </p>
          </div>

          <div className="flex justify-center mb-4">
            <ArrowDown className="w-6 h-6 text-[#6B6B6B]" />
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 mb-4">
            <div className="text-[#E8930A] text-sm font-semibold mb-2">Step 3 — IN-3</div>
            <h3 className="text-lg font-semibold mb-2">Workflow configuration</h3>
            <div className="text-sm text-[#6B6B6B] mb-2">Workflow Administrator</div>
            <p className="text-sm">
              Admin assigns reviewers to each stage, sets deadlines, sets priority. Triggers the whole review pipeline.
            </p>
          </div>

          <div className="flex justify-center mb-4">
            <ArrowDown className="w-6 h-6 text-[#6B6B6B]" />
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 mb-4">
            <div className="text-[#E8930A] text-sm font-semibold mb-2">Step 4 — IN-2</div>
            <h3 className="text-lg font-semibold mb-2">Reviewer comment entry</h3>
            <div className="text-sm text-[#6B6B6B] mb-2">SRC / Regulatory / Medical reviewer</div>
            <p className="text-sm">
              Reviewer writes comments on specific protocol sections and rates severity. Always comes after viewing OUT-1.
            </p>
          </div>

          <div className="bg-[#FFF9F0] border-l-4 border-l-[#E8930A] rounded p-3 mt-6">
            <p className="text-sm">
              <strong>Note:</strong> IN numbers (1-4) are doc reference IDs, not the order of use. Flow order is: 4 → 1 → 3 → 2.
            </p>
          </div>
        </div>

        {/* Right Column - Output Screens */}
        <div>
          <div className="bg-[#F9E5E5] border-2 border-[#6B0D0D] rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">OUTPUT SCREENS — WHEN THEY APPEAR</h2>
          </div>

          {/* After Step 3 */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 mb-4">
            <div className="text-[#6B0D0D] text-sm font-semibold mb-2">After Step 3 — OUT-2</div>
            <h3 className="text-lg font-semibold mb-2">Review status dashboard</h3>
            <div className="text-sm text-[#6B6B6B] mb-2">All stakeholders</div>
            <p className="text-sm">
              Kanban board showing every protocol's position in the pipeline. Visible to everyone at any time.
            </p>
          </div>

          <div className="flex justify-center mb-4">
            <ArrowDown className="w-6 h-6 text-[#6B6B6B]" />
          </div>

          {/* Before Step 4 */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 mb-4">
            <div className="text-[#6B0D0D] text-sm font-semibold mb-2">Before Step 4 — OUT-1</div>
            <h3 className="text-lg font-semibold mb-2">AI pre-review package viewer</h3>
            <div className="text-sm text-[#6B6B6B] mb-2">All reviewers</div>
            <p className="text-sm">
              The AI's work product — protocol summary, compliance checklist, FAERS flags, risk flags. Reviewer reads this before entering comments.
            </p>
          </div>

          <div className="flex justify-center mb-4">
            <ArrowDown className="w-6 h-6 text-[#6B6B6B]" />
          </div>

          {/* During Step 4 */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 mb-4">
            <div className="text-[#6B0D0D] text-sm font-semibold mb-2">During Step 4 — OUT-3</div>
            <h3 className="text-lg font-semibold mb-2">Compliance analysis report</h3>
            <div className="text-sm text-[#6B6B6B] mb-2">Regulatory Reviewer only</div>
            <p className="text-sm">
              Detailed breakdown of how the protocol scores against regulatory requirements. Compliance % score, checklist, flagged issues, historical comparison.
            </p>
          </div>

          <div className="flex justify-center mb-4">
            <ArrowDown className="w-6 h-6 text-[#6B6B6B]" />
          </div>

          {/* After Amendments */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 mb-4">
            <div className="text-[#6B0D0D] text-sm font-semibold mb-2">After amendments — OUT-4</div>
            <h3 className="text-lg font-semibold mb-2">Amendment history report</h3>
            <div className="text-sm text-[#6B6B6B] mb-2">All reviewers / PI</div>
            <p className="text-sm">
              Version diff viewer showing what changed between protocol versions. Amendment timeline and audit trail.
            </p>
          </div>

          <div className="bg-[#FFF9F0] border-l-4 border-l-[#E8930A] rounded p-3 mt-6">
            <p className="text-sm">
              <strong>Note:</strong> OUT-2 is always visible. OUT-1 gates IN-2. OUT-3 and OUT-4 appear later in the cycle.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-[#6B0D0D]">Key Workflow Principles</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Role Separation</h4>
            <ul className="text-sm space-y-1 text-[#6B6B6B]">
              <li>• PI submits protocols and LOIs</li>
              <li>• Admin configures workflows</li>
              <li>• Reviewers evaluate and comment</li>
              <li>• Sponsors monitor progress</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">AI Integration</h4>
            <ul className="text-sm space-y-1 text-[#6B6B6B]">
              <li>• AI pre-analyzes all protocols</li>
              <li>• Compliance scoring automated</li>
              <li>• FAERS safety signal detection</li>
              <li>• Risk flags highlighted early</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Sequential Stages</h4>
            <ul className="text-sm space-y-1 text-[#6B6B6B]">
              <li>• Scientific Review (14 days)</li>
              <li>• Regulatory Review (10 days)</li>
              <li>• Medical Officer Review (10 days)</li>
              <li>• Sponsor final approval</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Transparency</h4>
            <ul className="text-sm space-y-1 text-[#6B6B6B]">
              <li>• Real-time status tracking</li>
              <li>• Email notifications at key points</li>
              <li>• Audit trail for all changes</li>
              <li>• Version control for amendments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
