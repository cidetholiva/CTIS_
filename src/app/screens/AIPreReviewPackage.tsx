import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { FileText, Printer, ArrowLeft } from 'lucide-react';

export function AIPreReviewPackage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const logoUrl = 'https://cdn.myportfolio.com/9ad4e767-db52-4662-a159-aed2a549175d/82b49439-5829-4ab9-ab5b-290bcfd4fff5_rw_3840.png?h=3ec36cb1fab6bfbbc87a2a606b808d03';

  const scrollToMarker = (marker: number) => {
    const element = document.getElementById(`marker-${marker}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Flash the marker
      element.classList.add('ring-2', 'ring-[#E8930A]');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-[#E8930A]');
      }, 2000);
    }
  };

  // Different protocol data based on ID
  const protocolData: Record<string, any> = {
    'PROT-2024-005': {
      title: 'CAR-T Cell Therapy for Lymphoma',
      section: 'Section 3: Treatment Protocol',
      page: 23,
      totalPages: 156,
      summary: 'Phase I trial evaluating CAR-T cell therapy in patients with relapsed/refractory B-cell lymphoma. Single-arm, open-label design. 24 patients, 2-year follow-up. Primary endpoint: safety and dose-limiting toxicity.',
      compliance: [
        { text: 'Informed consent language', status: 'pass' },
        { text: 'CAR-T manufacturing controls', status: 'pass' },
        { text: 'Cytokine release syndrome monitoring', status: 'pass' },
        { text: 'Patient selection criteria', status: 'pass' },
        { text: 'Long-term follow-up plan', status: 'pass' }
      ],
      content: {
        sectionTitle: '3.1 CAR-T Cell Manufacturing and Infusion',
        text: `Patients will undergo leukapheresis for T-cell collection. Autologous T-cells will be genetically modified to express anti-CD19 CAR construct using a lentiviral vector encoding the CD19-specific single-chain variable fragment (scFv) linked to CD3ζ and 4-1BB costimulatory domains. Following lymphodepleting chemotherapy with cyclophosphamide (500 mg/m² on day -5) and fludarabine (30 mg/m² on days -5 to -3), patients will receive a single infusion of CAR-T cells at dose levels of 1×10⁶, 3×10⁶, or 1×10⁷ cells/kg. The CAR-T cell product will be administered intravenously over approximately 30 minutes with continuous monitoring of vital signs. Patients will remain hospitalized for a minimum of 10 days post-infusion for intensive monitoring of cytokine release syndrome (CRS) and neurotoxicity. Tocilizumab and corticosteroids will be available for immediate use in the event of grade ≥3 CRS or neurotoxicity. Long-term follow-up will continue for 15 years per FDA guidance for cell and gene therapy products, with assessments including persistence of CAR-T cells, anti-tumor response, and safety monitoring for delayed adverse events or secondary malignancies.`
      }
    },
    'PROT-2024-006': {
      title: 'mRNA Vaccine for Influenza',
      section: 'Section 5: Dosing and Administration',
      page: 34,
      totalPages: 198,
      summary: 'Phase II trial evaluating novel mRNA-based influenza vaccine. Randomized, double-blind, active-controlled. 180 participants across 15 sites. Primary endpoint: immunogenicity at 28 days post-vaccination.',
      compliance: [
        { text: 'Vaccine storage requirements', status: 'pass' },
        { text: 'Immunogenicity assessment plan', status: 'warning' },
        { text: 'Adverse event monitoring', status: 'fail' },
        { text: 'Age stratification protocol', status: 'pass' },
        { text: 'Booster dose justification', status: 'warning' }
      ],
      hasFlags: true,
      flags: [
        { severity: 'critical', description: 'Adverse event reporting timeline not specified for anaphylaxis', section: '5.2', marker: 1 },
        { severity: 'major', description: 'Immunogenicity thresholds for vaccine efficacy unclear', section: '7.1', marker: 2 }
      ],
      content: {
        sectionTitle: '5.1 Vaccination Schedule',
        hasHighlights: true,
        sections: [
          {
            type: 'normal',
            title: '5.1 Vaccination Schedule',
            text: 'Participants will receive two doses of mRNA vaccine (50μg or 100μg) administered intramuscularly 21 days apart. Active control arm receives standard inactivated influenza vaccine. Each dose contains modified mRNA encoding hemagglutinin antigens from four influenza strains (H1N1, H3N2, and two B lineages) formulated in lipid nanoparticles.'
          },
          {
            type: 'warning',
            title: '5.2 Safety Monitoring',
            text: 'All participants will be monitored for immediate adverse events for 30 minutes post-vaccination. Vital signs will be recorded at baseline, 15 minutes, and 30 minutes post-injection.',
            warning: 'MAJOR: Specific anaphylaxis response protocol and reporting timeline not defined',
            marker: 1
          },
          {
            type: 'normal',
            title: '5.3 Follow-up Assessments',
            text: 'Participants will return for follow-up visits at days 7, 14, 28, 90, and 180 post-first vaccination. Safety assessments will include physical examination, vital signs, and laboratory parameters.'
          },
          {
            type: 'fail',
            title: '7.1 Immunogenicity Endpoints',
            text: 'Immunogenicity will be assessed via hemagglutination inhibition (HAI) assay at baseline, day 28, and day 180. Secondary endpoints include microneutralization assays and cellular immune responses measured by ELISpot.',
            warning: 'CRITICAL: Specific HAI titer thresholds for determining vaccine efficacy not defined',
            marker: 2
          },
          {
            type: 'normal',
            title: '7.2 Safety Endpoints',
            text: 'Participants will maintain symptom diaries for 7 days following each vaccination to record local and systemic reactions. Solicited adverse events include injection site pain, erythema, swelling, fever, headache, fatigue, myalgia, and arthralgia.'
          }
        ]
      }
    },
    'PROT-2024-007': {
      title: 'Targeted Therapy for Lung Cancer',
      section: 'Section 4: Eligibility Criteria',
      page: 47,
      totalPages: 234,
      summary: 'Phase II oncology trial evaluating drug X in patients with advanced NSCLC. Double-blind, placebo-controlled. 3 treatment arms, 96 patients follow-up. Primary endpoint: overall response rate.',
      compliance: [
        { text: 'Informed consent language', status: 'pass' },
        { text: 'Dosing safety documentation', status: 'pass' },
        { text: 'Statistical plan completeness', status: 'pass' },
        { text: 'Eligibility criteria completeness', status: 'pass' },
        { text: 'Stopping rules (FDA 21 CFR)', status: 'pass' }
      ],
      content: {
        sectionTitle: '4.1 Inclusion Criteria',
        text: `Patients must meet all of the following criteria to be eligible for enrollment: Age ≥ 18 years at time of consent, histologically confirmed NSCLC with documented EGFR mutation, unresectable Stage III or Stage IV disease per AJCC 8th edition, measurable disease per RECIST v1.1 criteria, ECOG performance status 0-1, life expectancy ≥ 12 weeks.`
      }
    }
  };

  const currentProtocol = protocolData[id || 'PROT-2024-007'] || protocolData['PROT-2024-007'];
  const [currentPage] = useState(currentProtocol.page);
  const totalPages = currentProtocol.totalPages;

  const complianceItems = currentProtocol.compliance;

  return (
    <div className="min-h-screen flex flex-col bg-[#6B0D0D] pb-24">
      {/* Top Nav */}
      <div className="bg-[#6B0D0D] px-4 py-2 flex items-center justify-between text-white text-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/my-reviews')}
            className="flex items-center gap-2 hover:text-[#E8930A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <img src={logoUrl} alt="CTIS Logo" className="h-8" />
          <span>My Reviews / {id} / AI Pre-Review Package</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Regulatory Reviewer</span>
          <div className="w-8 h-8 bg-[#E8930A] rounded-full flex items-center justify-center text-xs">
            JD
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-3 p-3">
        {/* Left Sidebar - Collapsed */}
        <div className="w-12 bg-[#8B1515] flex flex-col items-center py-4 gap-4">
          <button className="w-8 h-8 bg-[#E8930A] rounded flex items-center justify-center text-white">
            <FileText className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 hover:bg-[#6B0D0D] rounded flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>

        {/* Document Viewer */}
        <div className="flex-1 bg-white rounded flex flex-col">
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl mb-4">{currentProtocol.title} — {currentProtocol.section}</h2>

              <div className="space-y-4 text-sm leading-relaxed">
                {currentProtocol.content.hasHighlights ? (
                  // Protocol with highlights (PROT-2024-006)
                  currentProtocol.content.sections.map((section: any, i: number) => (
                    <div key={i} id={section.marker ? `marker-${section.marker}` : undefined}>
                      {section.type === 'warning' ? (
                        <div className="bg-[#D97706] bg-opacity-20 border-l-4 border-[#D97706] p-4 relative rounded transition-all">
                          <div className="absolute -right-3 top-2 w-6 h-6 bg-[#D97706] text-white rounded-full flex items-center justify-center text-xs">
                            {section.marker}
                          </div>
                          <p><strong>{section.title}</strong></p>
                          <p className="mt-2">{section.text}</p>
                          <p className="mt-2 text-[#D97706] font-medium">[{section.warning}]</p>
                        </div>
                      ) : section.type === 'fail' ? (
                        <div className="bg-[#DC2626] bg-opacity-20 border-l-4 border-[#DC2626] p-4 relative rounded transition-all">
                          <div className="absolute -right-3 top-2 w-6 h-6 bg-[#DC2626] text-white rounded-full flex items-center justify-center text-xs">
                            {section.marker}
                          </div>
                          <p><strong>{section.title}</strong></p>
                          <p className="mt-2">{section.text}</p>
                          <p className="mt-2 text-[#DC2626] font-medium">[{section.warning}]</p>
                        </div>
                      ) : (
                        <div>
                          <p><strong>{section.title}</strong></p>
                          <p className="mt-2">{section.text}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  // Simple protocol (PROT-2024-005, PROT-2024-007)
                  <>
                    <p>
                      <strong>{currentProtocol.content.sectionTitle}</strong>
                    </p>
                    <p>
                      {currentProtocol.content.text}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Page Footer */}
          <div className="border-t border-gray-200 px-8 py-3 flex items-center justify-between bg-gray-50">
            <span className="text-xs text-gray-500">{currentProtocol.section}</span>
            <span className="text-xs text-gray-500">Page {currentPage} of {totalPages}</span>
            <span className="text-xs text-gray-500">{id}</span>
          </div>
        </div>

        {/* Right Panel - AI Pre-Review Package */}
        <div className="w-96 bg-[#6B0D0D] rounded flex flex-col text-white">
          {/* Header */}
          <div className="p-4 border-b border-[#8B1515]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg">AI Pre-Review Package</h3>
              <span className="px-2 py-0.5 bg-[#E8930A] text-white text-[10px] rounded">AI</span>
            </div>
            <p className="text-xs text-gray-300">AI output is advisory. Reviewer judgment is final.</p>
          </div>

          {/* Action Buttons */}
          <div className="px-4 py-3 border-b border-[#8B1515] flex gap-2">
            <button className="px-3 py-1.5 bg-white text-[#6B0D0D] rounded text-sm flex items-center gap-2 hover:bg-gray-100">
              <FileText className="w-4 h-4" />
              Export PDF
            </button>
            <button className="px-3 py-1.5 bg-white text-[#6B0D0D] rounded text-sm flex items-center gap-2 hover:bg-gray-100">
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {/* Protocol Summary */}
            <div className="border-b border-[#8B1515]">
              <button className="w-full px-4 py-3 text-left hover:bg-[#8B1515] flex items-center justify-between">
                <span className="text-sm">Protocol Summary</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed">
                {currentProtocol.summary}
              </div>
            </div>

            {/* Compliance Checklist */}
            <div className="border-b border-[#8B1515]">
              <button className="w-full px-4 py-3 text-left bg-[#8B1515] flex items-center justify-between">
                <span className="text-sm">Compliance checklist</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-4 py-3 space-y-2">
                {complianceItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Badge variant={item.status as any} className="text-[10px]">{item.status}</Badge>
                    <span className="text-xs text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk & Inconsistency Flags */}
            {currentProtocol.hasFlags && (
              <div className="border-b border-[#8B1515]">
                <button className="w-full px-4 py-3 text-left bg-[#8B1515] flex items-center justify-between">
                  <span className="text-sm">Risk & Inconsistency Flags</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-4 py-3 space-y-3">
                  {currentProtocol.flags.map((flag: any, i: number) => (
                    <div key={i} className="p-3 bg-[#8B1515] rounded">
                      <div className="flex items-start gap-3 mb-2">
                        <Badge variant={flag.severity as any} className="text-[10px]">{flag.severity}</Badge>
                        <span className="text-xs text-gray-400">Section {flag.section}</span>
                      </div>
                      <p className="text-xs text-gray-300 mb-2">{flag.description}</p>
                      <button
                        onClick={() => scrollToMarker(flag.marker)}
                        className="text-xs text-[#E8930A] hover:underline"
                      >
                        → Jump to annotation marker {flag.marker}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!currentProtocol.hasFlags && (
              <div className="border-b border-[#8B1515]">
                <button className="w-full px-4 py-3 text-left hover:bg-[#8B1515] flex items-center justify-between">
                  <span className="text-sm">Risk & Inconsistency Flags</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Action */}
          <div className="p-4 border-t border-[#8B1515]">
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate(`/review/${id}/comments`)}
            >
              Enter Comments
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
