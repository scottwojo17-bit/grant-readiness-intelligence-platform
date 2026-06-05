import React from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  KanbanSquare,
  Link as LinkIcon,
  ListChecks,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import "./styles.css";

const sampleGrantUrl =
  "https://www.nsf.gov/funding/opportunities/techaccess-ai-ready-america/nsf26-508/solicitation";

const stageGates = {
  Identified: 80,
  Analyzed: 85,
  Design: 90,
  Draft: 80,
  Review: 90,
  Submit: 100,
  Done: 100,
};

const stageOrder = ["Identified", "Analyzed", "Design", "Draft", "Review", "Submit", "Done"];

const grantCriteria = [
  {
    id: "lead-eligibility",
    requirement: "Confirm lead applicant eligibility",
    stage: "Identified",
    priority: "Critical",
    extractedDetail: "Lead applicant must be eligible under NSF solicitation rules.",
  },
  {
    id: "deadline-submission",
    requirement: "Identify deadline and submission requirements",
    stage: "Identified",
    priority: "Critical",
    extractedDetail: "Deadline, submission portal, and required submission package must be confirmed.",
  },
  {
    id: "statewide-strategy",
    requirement: "Define statewide AI readiness strategy",
    stage: "Analyzed",
    priority: "Critical",
    extractedDetail: "Proposal should describe a coherent statewide AI readiness strategy.",
  },
  {
    id: "partnerships",
    requirement: "Confirm required partnerships",
    stage: "Analyzed",
    priority: "Critical",
    extractedDetail: "Partnership structure and partner roles need to align with program intent.",
  },
  {
    id: "logic-model",
    requirement: "Build logic model",
    stage: "Design",
    priority: "High",
    extractedDetail: "Inputs, activities, outputs, outcomes, and assumptions should be mapped.",
  },
  {
    id: "smart-objectives",
    requirement: "Define SMART objectives",
    stage: "Design",
    priority: "High",
    extractedDetail: "Objectives should be specific, measurable, achievable, relevant, and time-bound.",
  },
  {
    id: "evaluation-plan",
    requirement: "Create evaluation plan",
    stage: "Design",
    priority: "High",
    extractedDetail: "Evaluation approach, metrics, data sources, and reporting cadence should be documented.",
  },
  {
    id: "budget",
    requirement: "Create budget and budget narrative",
    stage: "Draft",
    priority: "High",
    extractedDetail: "Budget and narrative must connect costs to proposed activities.",
  },
  {
    id: "attachments",
    requirement: "Confirm required attachments",
    stage: "Draft",
    priority: "High",
    extractedDetail: "All solicitation attachments should be listed and assigned to owners.",
  },
  {
    id: "letters",
    requirement: "Confirm letters of collaboration/support",
    stage: "Review",
    priority: "High",
    extractedDetail: "Letters should be current, compliant, and matched to partner commitments.",
  },
  {
    id: "compliance",
    requirement: "Confirm compliance requirements",
    stage: "Review",
    priority: "Critical",
    extractedDetail: "Compliance items should be verified before final submission review.",
  },
  {
    id: "page-formatting",
    requirement: "Confirm page limits and formatting rules",
    stage: "Submit",
    priority: "Critical",
    extractedDetail: "Final package must meet page limits, formatting rules, and upload requirements.",
  },
];

const initialStatuses = {
  "lead-eligibility": "complete",
  "deadline-submission": "complete",
  "statewide-strategy": "weak",
  partnerships: "missing",
  "logic-model": "weak",
  "smart-objectives": "weak",
  "evaluation-plan": "missing",
  budget: "weak",
  attachments: "complete",
  letters: "missing",
  compliance: "weak",
  "page-formatting": "complete",
};

const applicantDefaults = {
  organizationalEligibility: 90,
  partnershipReadiness: 55,
  projectDesign: 72,
  evaluationCapacity: 45,
  budgetReadiness: 68,
  complianceReadiness: 76,
};

function scoreRequirement(status) {
  if (status === "complete") return 100;
  if (status === "weak") return 65;
  return 0;
}

function classifyScore(score) {
  if (score < 70) return { label: "Not Ready", tone: "red" };
  if (score < 80) return { label: "Needs Correction", tone: "yellow" };
  if (score <= 85) return { label: "First Draft Quality", tone: "blue" };
  if (score <= 94) return { label: "Competitive", tone: "teal" };
  return { label: "Submission Ready", tone: "green" };
}

function getToneClasses(tone) {
  const tones = {
    red: "bg-red-50 text-red-700 ring-red-200",
    yellow: "bg-amber-50 text-amber-700 ring-amber-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    teal: "bg-teal-50 text-teal-700 ring-teal-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    gray: "bg-slate-100 text-slate-700 ring-slate-200",
  };
  return tones[tone] ?? tones.gray;
}

function getBarColor(score) {
  if (score < 70) return "bg-platformRed";
  if (score < 80) return "bg-platformGold";
  if (score <= 85) return "bg-platformBlue";
  if (score <= 94) return "bg-platformTeal";
  return "bg-platformGreen";
}

function average(values) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function buildAnalytics(statuses, readiness) {
  const requirementScores = grantCriteria.map((item) => ({
    ...item,
    status: statuses[item.id],
    score: scoreRequirement(statuses[item.id]),
  }));

  const stageReadinessMap = {
    Identified: readiness.organizationalEligibility,
    Analyzed: average([readiness.partnershipReadiness, readiness.projectDesign]),
    Design: average([readiness.projectDesign, readiness.evaluationCapacity]),
    Draft: average([readiness.budgetReadiness, readiness.projectDesign]),
    Review: average([readiness.complianceReadiness, readiness.evaluationCapacity]),
    Submit: readiness.complianceReadiness,
    Done: 0,
  };

  const stageScores = stageOrder.map((stage) => {
    const stageRequirements = requirementScores.filter((item) => item.stage === stage);
    const criteriaScore = average(stageRequirements.map((item) => item.score));
    const readinessScore = stage === "Done" ? 0 : stageReadinessMap[stage];
    const score = stage === "Done" ? 0 : Math.round(criteriaScore * 0.7 + readinessScore * 0.3);
    const gate = stageGates[stage];
    return {
      stage,
      score,
      gate,
      pass: stage === "Done" ? false : score >= gate,
      status: classifyScore(score),
      requirementCount: stageRequirements.length,
    };
  });

  const activeStages = stageScores.filter((item) => item.stage !== "Done");
  const overallScore = average(activeStages.map((item) => item.score));
  const gaps = requirementScores.filter((item) => item.status !== "complete");
  const criticalGaps = gaps.filter((item) => item.priority === "Critical" || item.status === "missing");
  const recommendedFixes = gaps.map((item) => {
    const verb = item.status === "missing" ? "Create and assign owner for" : "Strengthen evidence for";
    return `${verb} ${item.requirement.toLowerCase()}.`;
  });
  const blockedStages = activeStages.filter((item) => !item.pass);

  return {
    requirementScores,
    stageScores,
    overallScore,
    overallStatus: classifyScore(overallScore),
    criticalGaps,
    recommendedFixes,
    decision: blockedStages.length === 0 ? "Move Forward" : "Hold",
    blockedStages,
  };
}

function App() {
  const [grantUrl, setGrantUrl] = React.useState(sampleGrantUrl);
  const [hasAnalyzed, setHasAnalyzed] = React.useState(false);
  const [statuses, setStatuses] = React.useState(initialStatuses);
  const [readiness, setReadiness] = React.useState(applicantDefaults);

  const analytics = React.useMemo(() => buildAnalytics(statuses, readiness), [statuses, readiness]);

  function analyzeGrant() {
    // Future backend/API connection: send grantUrl to a grant parser endpoint and replace grantCriteria with live extraction data.
    setHasAnalyzed(true);
  }

  function resetDemo() {
    setGrantUrl(sampleGrantUrl);
    setStatuses(initialStatuses);
    setReadiness(applicantDefaults);
    setHasAnalyzed(false);
  }

  const currentStage =
    analytics.stageScores.find((item) => item.stage !== "Done" && !item.pass)?.stage ?? "Submit";

  return (
    <main className="min-h-screen bg-slate-50 text-ink">
      <header className="border-b border-slateLine bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-platformTeal">Grant operations intelligence</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-ink">Grant Readiness Intelligence Platform</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="btn-secondary" onClick={resetDemo} type="button">
              <RefreshCcw size={17} />
              Reset Demo
            </button>
            <button className="btn-primary" onClick={analyzeGrant} type="button">
              <FileSearch size={18} />
              Analyze Grant
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6">
        <section className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          Prototype uses sample extraction data. Live URL parsing will be added in the backend version.
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="panel">
            <SectionTitle icon={LinkIcon} eyebrow="1. Grant URL Intake" title="Analyze a funding opportunity" />
            <div className="mt-5 grid gap-3">
              <label className="text-sm font-medium text-slate-700" htmlFor="grant-url">
                Grant URL
              </label>
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  id="grant-url"
                  className="min-h-11 flex-1 rounded-md border border-slateLine bg-white px-3 text-sm outline-none transition focus:border-platformBlue focus:ring-2 focus:ring-blue-100"
                  value={grantUrl}
                  onChange={(event) => setGrantUrl(event.target.value)}
                />
                <button className="btn-primary min-h-11 justify-center" onClick={analyzeGrant} type="button">
                  <FileSearch size={18} />
                  Analyze Grant
                </button>
              </div>
            </div>
          </div>

          <ScoreCard
            label="Overall Readiness Score"
            score={analytics.overallScore}
            status={analytics.overallStatus}
            footer={analytics.decision === "Move Forward" ? "All active gates pass" : `${analytics.blockedStages.length} gate(s) need attention`}
          />
        </section>

        {hasAnalyzed ? (
          <>
            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="panel">
                <SectionTitle icon={ClipboardCheck} eyebrow="2. Extracted Grant Criteria" title="NSF TechAccess AI-Ready America" />
                <GrantMeta />
                <div className="mt-5 overflow-hidden rounded-lg border border-slateLine">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-600">
                      <tr>
                        <th className="px-4 py-3">Requirement</th>
                        <th className="px-4 py-3">Stage</th>
                        <th className="px-4 py-3">Priority</th>
                        <th className="px-4 py-3">Readiness</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slateLine bg-white">
                      {analytics.requirementScores.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">
                            <div className="font-medium text-ink">{item.requirement}</div>
                            <div className="mt-1 text-xs text-slate-500">{item.extractedDetail}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-700">{item.stage}</td>
                          <td className="px-4 py-3">
                            <Badge tone={item.priority === "Critical" ? "red" : "gray"}>{item.priority}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              className="rounded-md border border-slateLine bg-white px-3 py-2 text-sm"
                              value={item.status}
                              onChange={(event) => setStatuses((current) => ({ ...current, [item.id]: event.target.value }))}
                            >
                              <option value="complete">Complete</option>
                              <option value="weak">Weak</option>
                              <option value="missing">Missing</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <ApplicantForm readiness={readiness} setReadiness={setReadiness} />
            </section>

            <Dashboard analytics={analytics} />
            <Kanban analytics={analytics} currentStage={currentStage} />
          </>
        ) : (
          <section className="panel flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <SectionTitle icon={ShieldCheck} eyebrow="Demo Ready" title="Paste the NSF grant URL and run analysis" />
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                The MVP will load sample extracted criteria, compare them against applicant/project readiness inputs, then calculate gaps,
                gate status, stage scores, and a prioritized fix list.
              </p>
            </div>
            <button className="btn-primary shrink-0" onClick={analyzeGrant} type="button">
              Start Demo
              <ArrowRight size={18} />
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

function GrantMeta() {
  return (
    <div className="mt-5 grid gap-3 rounded-lg border border-slateLine bg-slate-50 p-4 text-sm md:grid-cols-3">
      <Meta label="Grant Name" value="NSF TechAccess AI-Ready America" />
      <Meta label="Funder" value="National Science Foundation" />
      <Meta label="Source" value="Sample extraction" />
    </div>
  );
}

function ApplicantForm({ readiness, setReadiness }) {
  const fields = [
    ["organizationalEligibility", "Lead applicant eligibility"],
    ["partnershipReadiness", "Partnership readiness"],
    ["projectDesign", "Project design maturity"],
    ["evaluationCapacity", "Evaluation capacity"],
    ["budgetReadiness", "Budget readiness"],
    ["complianceReadiness", "Compliance readiness"],
  ];

  return (
    <div className="panel">
      <SectionTitle icon={ListChecks} eyebrow="3. Applicant Readiness Form" title="Applicant and project inputs" />
      <div className="mt-5 grid gap-5">
        {fields.map(([key, label]) => (
          <label key={key} className="grid gap-2">
            <span className="flex items-center justify-between text-sm font-medium text-slate-700">
              {label}
              <span className="tabular-nums text-ink">{readiness[key]}%</span>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={readiness[key]}
              onChange={(event) => setReadiness((current) => ({ ...current, [key]: Number(event.target.value) }))}
              className="accent-platformBlue"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function Dashboard({ analytics }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="panel">
        <SectionTitle icon={BarChart3} eyebrow="5. QA/QC Score Dashboard" title="Stage gates" />
        <div className="mt-5 grid gap-3">
          {analytics.stageScores
            .filter((item) => item.stage !== "Done")
            .map((item) => (
              <div key={item.stage} className="rounded-lg border border-slateLine bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-ink">{item.stage}</div>
                    <div className="text-xs text-slate-500">Gate requirement: {item.gate}%+</div>
                  </div>
                  <Badge tone={item.pass ? "green" : "red"}>{item.pass ? "Pass" : "Fail"}</Badge>
                </div>
                <Progress score={item.score} />
                <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                  <span>{item.status.label}</span>
                  <span className="font-semibold tabular-nums">{item.score}%</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="panel">
        <SectionTitle icon={AlertTriangle} eyebrow="4. Gap Analysis" title="Critical gaps and recommended fixes" />
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <InfoList
            title="Critical Gaps"
            empty="No critical gaps found."
            items={analytics.criticalGaps.map((item) => `${item.requirement} (${item.stage})`)}
          />
          <InfoList title="Recommended Fixes" empty="No fixes needed." items={analytics.recommendedFixes} />
        </div>
        <div className="mt-5 rounded-lg border border-slateLine bg-slate-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Move Forward / Hold Decision</div>
              <div className="mt-1 text-2xl font-semibold">{analytics.decision}</div>
            </div>
            <Badge tone={analytics.decision === "Move Forward" ? "green" : "red"}>
              {analytics.decision === "Move Forward" ? "Ready for next stage" : "Correction required"}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

function Kanban({ analytics, currentStage }) {
  const blockers = analytics.criticalGaps.map((item) => item.requirement);

  return (
    <section className="panel">
      <SectionTitle icon={KanbanSquare} eyebrow="6. Kanban Value Flow" title="Grant movement by value stage" />
      <div className="mt-5 grid gap-3 overflow-x-auto pb-2 lg:grid-cols-7">
        {stageOrder.map((stage) => {
          const stageScore = analytics.stageScores.find((item) => item.stage === stage);
          const isCurrent = stage === currentStage;
          const isDone = stageOrder.indexOf(stage) < stageOrder.indexOf(currentStage);
          const risk = !stageScore || stage === "Done" ? "Waiting" : stageScore.pass ? "Low" : stageScore.score < 70 ? "High" : "Medium";
          return (
            <div key={stage} className="min-w-52 rounded-lg border border-slateLine bg-slate-100 p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">{stage}</h3>
                {isDone ? <CheckCircle2 className="text-platformGreen" size={16} /> : null}
              </div>
              {isCurrent ? (
                <div className="rounded-lg border border-platformBlue bg-white p-3 shadow-sm">
                  <div className="text-sm font-semibold">NSF TechAccess AI-Ready America</div>
                  <dl className="mt-3 grid gap-2 text-xs text-slate-600">
                    <CardRow label="Current Stage" value={stage} />
                    <CardRow label="Stage Score" value={`${stageScore.score}%`} />
                    <CardRow label="Risk Level" value={risk} />
                    <CardRow label="Next Action" value={analytics.recommendedFixes[0] ?? "Prepare submission package."} />
                    <CardRow label="Blockers" value={blockers.slice(0, 2).join("; ") || "None"} />
                  </dl>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-slateLine bg-white/60 p-3 text-xs text-slate-500">
                  {isDone ? "Completed gate" : "No active card"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SectionTitle({ icon: Icon, eyebrow, title }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 items-center justify-center rounded-md bg-slate-100 text-platformBlue">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{eyebrow}</p>
        <h2 className="text-xl font-semibold tracking-normal text-ink">{title}</h2>
      </div>
    </div>
  );
}

function ScoreCard({ label, score, status, footer }) {
  return (
    <div className="panel">
      <div className="text-sm font-medium text-slate-600">{label}</div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="text-5xl font-semibold tabular-nums">{score}%</div>
        <Badge tone={status.tone}>{status.label}</Badge>
      </div>
      <Progress score={score} />
      <p className="mt-3 text-sm text-slate-600">{footer}</p>
    </div>
  );
}

function Progress({ score }) {
  return (
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
      <div className={`h-full rounded-full ${getBarColor(score)}`} style={{ width: `${Math.max(3, score)}%` }} />
    </div>
  );
}

function Badge({ tone, children }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${getToneClasses(tone)}`}>{children}</span>;
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 font-medium text-ink">{value}</div>
    </div>
  );
}

function InfoList({ title, items, empty }) {
  return (
    <div className="rounded-lg border border-slateLine bg-white p-4">
      <h3 className="font-semibold text-ink">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm text-slate-700">
        {items.length ? items.slice(0, 6).map((item) => <li key={item}>{item}</li>) : <li className="text-slate-500">{empty}</li>}
      </ul>
    </div>
  );
}

function CardRow({ label, value }) {
  return (
    <div>
      <dt className="font-semibold text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}

export default App;
