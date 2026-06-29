import React from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Link as LinkIcon,
  RefreshCcw,
  ShieldCheck,
  Target,
} from "lucide-react";
import "./styles.css";

const criteriaTemplate = [
  {
    id: "eligibility",
    requirement: "Confirm applicant eligibility",
    category: "Fit",
    priority: "Critical",
    detail: "The applicant should match the opportunity's eligible organization type, geography, and program purpose.",
  },
  {
    id: "deadline",
    requirement: "Confirm deadline and submission path",
    category: "Compliance",
    priority: "Critical",
    detail: "The team should verify the due date, submission portal, attachments, and registration requirements.",
  },
  {
    id: "program-fit",
    requirement: "Connect the project to funder priorities",
    category: "Fit",
    priority: "High",
    detail: "The project summary should clearly connect the need, audience, activities, and requested funding.",
  },
  {
    id: "evidence",
    requirement: "Support the need with evidence",
    category: "Evidence",
    priority: "High",
    detail: "The proposal should include basic data, community need, outcome targets, or other credible support.",
  },
  {
    id: "budget",
    requirement: "Align budget with project activities",
    category: "Budget",
    priority: "High",
    detail: "The budget should explain what will be purchased or funded and how those costs support the project.",
  },
  {
    id: "review",
    requirement: "Assign a final human reviewer",
    category: "Quality",
    priority: "Critical",
    detail: "Demo output should be reviewed for accuracy, compliance, tone, and funder-specific requirements.",
  },
];

const statusScores = {
  complete: 100,
  weak: 65,
  missing: 25,
};

const initialReadiness = {
  organization: 3,
  project: 3,
  evidence: 2,
  budget: 2,
};

function titleCase(value) {
  return String(value || "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split(/[/?#]/)[0]
    .split(/[.-]/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function createProfile(url) {
  const name = titleCase(url) || "Submitted Grant Opportunity";
  let hostname = "Demo funder";
  try {
    hostname = new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace(/^www\./, "");
  } catch {
    hostname = "Submitted source";
  }
  return {
    grantName: `${name} Funding Opportunity`,
    funder: hostname,
    submittedUrl: url,
  };
}

function createInitialStatuses(url) {
  const seed = String(url).length;
  return criteriaTemplate.reduce((acc, item, index) => {
    acc[item.id] = (seed + index) % 4 === 0 ? "missing" : (seed + index) % 3 === 0 ? "weak" : "complete";
    return acc;
  }, {});
}

function average(values) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function classify(score) {
  if (score < 55) return { label: "Early Review", tone: "red", decision: "Pause and clarify" };
  if (score < 75) return { label: "Needs Detail", tone: "yellow", decision: "Improve before drafting" };
  if (score < 88) return { label: "Promising", tone: "blue", decision: "Proceed with review" };
  return { label: "Strong Demo Fit", tone: "green", decision: "Ready for next review" };
}

function buildAnalysis(statuses, readiness) {
  const requirementRows = criteriaTemplate.map((item) => ({
    ...item,
    status: statuses[item.id] || "weak",
    score: statusScores[statuses[item.id] || "weak"],
  }));
  const requirementScore = average(requirementRows.map((item) => item.score));
  const readinessScore = average(Object.values(readiness).map((value) => value * 20));
  const overallScore = Math.round(requirementScore * 0.65 + readinessScore * 0.35);
  const status = classify(overallScore);
  const gaps = requirementRows.filter((item) => item.status !== "complete");
  const strengths = requirementRows.filter((item) => item.status === "complete").slice(0, 3);
  return {
    requirementRows,
    requirementScore,
    readinessScore,
    overallScore,
    status,
    gaps,
    strengths,
    nextAction: gaps[0]?.requirement || "Prepare a reviewer-approved draft package.",
  };
}

function toneClasses(tone) {
  const map = {
    red: "border-red-200 bg-red-50 text-red-800",
    yellow: "border-amber-200 bg-amber-50 text-amber-800",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    green: "border-green-200 bg-green-50 text-green-800",
    gray: "border-slateLine bg-slate-100 text-slate-700",
  };
  return map[tone] || map.gray;
}

function barColor(score) {
  if (score < 55) return "bg-platformRed";
  if (score < 75) return "bg-platformGold";
  if (score < 88) return "bg-platformBlue";
  return "bg-platformGreen";
}

function App() {
  const [grantUrl, setGrantUrl] = React.useState("");
  const [profile, setProfile] = React.useState(null);
  const [statuses, setStatuses] = React.useState({});
  const [readiness, setReadiness] = React.useState(initialReadiness);
  const [error, setError] = React.useState("");

  const hasAnalyzed = Boolean(profile);
  const analysis = React.useMemo(() => buildAnalysis(statuses, readiness), [statuses, readiness]);

  function analyzeGrant() {
    const url = grantUrl.trim();
    if (!url) {
      setError("Paste a grant opportunity URL or reference before running analysis.");
      setProfile(null);
      return;
    }
    setError("");
    setProfile(createProfile(url));
    setStatuses(createInitialStatuses(url));
    setReadiness(initialReadiness);
  }

  function resetDemo() {
    setGrantUrl("");
    setProfile(null);
    setStatuses({});
    setReadiness(initialReadiness);
    setError("");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-ink">
      <header className="border-b border-slateLine bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-platformTeal">Grant readiness demo</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-ink">Grant Readiness Intelligence Platform</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Basic evaluation version for grant fit, readiness gaps, and next-step review. Production scoring, advanced
              analysis features, saved records, automation, and expanded workflows are not included.
            </p>
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
        <section className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          Evaluation-only demo. This page provides a basic grant analysis experience while withholding the larger product logic,
          expanded framework, saved records, advanced analysis features, and operating roadmap.
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="panel">
            <SectionTitle icon={LinkIcon} eyebrow="1. Grant Intake" title="Analyze a funding opportunity" />
            <div className="mt-5 grid gap-3">
              <label className="text-sm font-medium text-slate-700" htmlFor="grant-url">
                Grant URL or reference
              </label>
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  id="grant-url"
                  className="min-h-11 flex-1 rounded-md border border-slateLine bg-white px-3 text-sm outline-none transition focus:border-platformBlue focus:ring-2 focus:ring-blue-100"
                  value={grantUrl}
                  onChange={(event) => setGrantUrl(event.target.value)}
                  placeholder="Paste grant opportunity URL"
                />
                <button className="btn-primary min-h-11 justify-center" onClick={analyzeGrant} type="button">
                  <FileSearch size={18} />
                  Analyze Grant
                </button>
              </div>
              {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
            </div>
          </div>

          {hasAnalyzed ? <ScoreCard analysis={analysis} /> : <AwaitingAnalysisCard onStart={analyzeGrant} />}
        </section>

        {hasAnalyzed ? (
          <>
            <ExecutiveSummary analysis={analysis} profile={profile} />
            <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <CriteriaTable analysis={analysis} statuses={statuses} setStatuses={setStatuses} />
              <div className="grid gap-6">
                <ScoreBreakdown analysis={analysis} />
                <StageSnapshot analysis={analysis} />
              </div>
            </section>
            <section className="panel">
              <SectionTitle icon={ClipboardCheck} eyebrow="2. Applicant Readiness" title="Basic readiness inputs" />
              <ApplicantReadiness readiness={readiness} setReadiness={setReadiness} />
            </section>
          </>
        ) : (
          <section className="panel flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <SectionTitle icon={ShieldCheck} eyebrow="Demo Ready" title="Paste a grant URL and run analysis" />
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                The demo returns a simple score, gap list, strengths, and recommended next actions for review.
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

function SectionTitle({ icon: Icon, eyebrow, title }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-platformBlue">
        <Icon size={16} />
        {eyebrow}
      </div>
      <h2 className="mt-1 text-xl font-semibold tracking-normal text-ink">{title}</h2>
    </div>
  );
}

function ScoreCard({ analysis }) {
  return (
    <section className="panel">
      <SectionTitle icon={Target} eyebrow="Readiness Score" title="Basic grant analysis result" />
      <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center">
        <div className="grid h-36 w-36 shrink-0 place-items-center rounded-full border-[10px] border-platformTeal bg-white text-center">
          <div>
            <div className="text-4xl font-bold text-ink">{analysis.overallScore}</div>
            <div className="text-xs font-semibold uppercase text-slate-500">out of 100</div>
          </div>
        </div>
        <div>
          <Badge tone={analysis.status.tone}>{analysis.status.label}</Badge>
          <p className="mt-3 text-2xl font-semibold text-ink">{analysis.status.decision}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This simplified score is for evaluation only. A final pursuit decision should include human review of eligibility,
            compliance, budget, and funder instructions.
          </p>
        </div>
      </div>
    </section>
  );
}

function ExecutiveSummary({ analysis, profile }) {
  return (
    <section className="panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <SectionTitle icon={BarChart3} eyebrow="Executive Summary" title={profile.grantName} />
        <Badge tone={analysis.status.tone}>{analysis.status.decision}</Badge>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <MetricTile label="Funder/source" value={profile.funder} />
        <MetricTile label="Readiness" value={`${analysis.overallScore}/100`} />
        <MetricTile label="Next action" value={analysis.nextAction} />
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <MiniList title="Strengths" items={analysis.strengths.map((item) => item.requirement)} />
        <MiniList title="Gaps to review" items={analysis.gaps.map((item) => item.requirement).slice(0, 4)} />
      </div>
    </section>
  );
}

function CriteriaTable({ analysis, statuses, setStatuses }) {
  return (
    <section className="panel">
      <SectionTitle icon={ClipboardCheck} eyebrow="Grant Criteria" title="Basic readiness checklist" />
      <div className="mt-5 overflow-hidden rounded-lg border border-slateLine">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Requirement</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Readiness</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slateLine bg-white">
            {analysis.requirementRows.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">
                  <div className="font-medium text-ink">{item.requirement}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.detail}</div>
                </td>
                <td className="px-4 py-3 text-slate-700">{item.category}</td>
                <td className="px-4 py-3">
                  <Badge tone={item.priority === "Critical" ? "red" : "gray"}>{item.priority}</Badge>
                </td>
                <td className="px-4 py-3">
                  <select
                    className="rounded-md border border-slateLine bg-white px-3 py-2 text-sm"
                    value={statuses[item.id] || "weak"}
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
    </section>
  );
}

function ScoreBreakdown({ analysis }) {
  const rows = [
    ["Grant criteria", analysis.requirementScore],
    ["Applicant readiness", analysis.readinessScore],
    ["Overall demo score", analysis.overallScore],
  ];
  return (
    <section className="panel">
      <SectionTitle icon={BarChart3} eyebrow="Score Breakdown" title="Simple score inputs" />
      <div className="mt-5 grid gap-4">
        {rows.map(([label, score]) => (
          <div key={label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-slate-700">{label}</span>
              <span className="font-semibold text-ink">{score}%</span>
            </div>
            <Progress score={score} />
          </div>
        ))}
      </div>
    </section>
  );
}

function StageSnapshot({ analysis }) {
  const stages = [
    ["Fit", analysis.requirementRows.filter((item) => item.category === "Fit")],
    ["Compliance", analysis.requirementRows.filter((item) => item.category === "Compliance")],
    ["Evidence", analysis.requirementRows.filter((item) => item.category === "Evidence")],
    ["Budget", analysis.requirementRows.filter((item) => item.category === "Budget")],
    ["Quality", analysis.requirementRows.filter((item) => item.category === "Quality")],
  ];
  return (
    <section className="panel">
      <SectionTitle icon={CheckCircle2} eyebrow="Stage Snapshot" title="Where review is needed" />
      <div className="mt-5 grid gap-3">
        {stages.map(([stage, items]) => {
          const score = average(items.map((item) => item.score));
          return (
            <div key={stage} className="rounded-lg border border-slateLine bg-slate-50 p-3">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-semibold text-ink">{stage}</span>
                <span className="text-slate-600">{score}%</span>
              </div>
              <Progress score={score} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ApplicantReadiness({ readiness, setReadiness }) {
  const fields = [
    ["organization", "Organization profile"],
    ["project", "Project summary"],
    ["evidence", "Evidence and outcomes"],
    ["budget", "Budget support"],
  ];
  return (
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {fields.map(([key, label]) => (
        <label key={key} className="rounded-lg border border-slateLine bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-slate-700">{label}</span>
            <span className="text-sm font-bold text-ink">{readiness[key]}/5</span>
          </div>
          <input
            className="mt-4 w-full accent-platformBlue"
            type="range"
            min="1"
            max="5"
            value={readiness[key]}
            onChange={(event) => setReadiness((current) => ({ ...current, [key]: Number(event.target.value) }))}
          />
        </label>
      ))}
    </div>
  );
}

function AwaitingAnalysisCard({ onStart }) {
  return (
    <section className="panel flex min-h-[260px] flex-col justify-between">
      <SectionTitle icon={AlertTriangle} eyebrow="Awaiting Analysis" title="No grant has been analyzed yet" />
      <p className="mt-4 text-sm leading-6 text-slate-600">
        Paste a grant URL or opportunity reference to create a basic fit and readiness review.
      </p>
      <button className="btn-primary mt-6 w-fit" onClick={onStart} type="button">
        Run Demo
        <ArrowRight size={18} />
      </button>
    </section>
  );
}

function Progress({ score }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
      <div className={`h-full ${barColor(score)}`} style={{ width: `${Math.max(5, Math.min(100, score))}%` }} />
    </div>
  );
}

function Badge({ tone, children }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClasses(tone)}`}>{children}</span>;
}

function MetricTile({ label, value }) {
  return (
    <div className="rounded-lg border border-slateLine bg-slate-50 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-lg font-semibold text-ink">{value}</div>
    </div>
  );
}

function MiniList({ title, items }) {
  return (
    <div className="rounded-lg border border-slateLine bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm text-slate-600">
        {items.length ? items.map((item) => <li key={item}>- {item}</li>) : <li>- No major gaps in this section.</li>}
      </ul>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
