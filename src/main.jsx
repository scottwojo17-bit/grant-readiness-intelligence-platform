import React from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Database,
  ExternalLink,
  FileCheck2,
  FileSearch,
  FolderOpen,
  Gavel,
  KanbanSquare,
  Link as LinkIcon,
  ListChecks,
  Save,
  Send,
  Target,
  Trash2,
  UserPlus,
  Users,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import "./styles.css";

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

const valueStream = [
  "Organization Development",
  "Capability Development",
  "Knowledge Repository",
  "Grant Identification",
  "Grant Qualification",
  "Grant Development",
  "Submission",
  "Reporting",
];

const valueFlowStepCriteria = [
  {
    step: "Organization Development",
    scoreDrivers: ["Mission, vision, tax status, UEI/SAM/CAGE, geography, budget, years operating"],
    needed: ["Complete parent organization profile", "Confirm registrations and compliance identifiers", "Document strategic priorities"],
    evidence: ["Organization profile", "SAM/UEI record", "Capability statement"],
  },
  {
    step: "Capability Development",
    scoreDrivers: ["Programs, capabilities, staff expertise, certifications, past grants, impact metrics"],
    needed: ["Map programs to grant purpose", "Confirm staff capacity", "Document certifications and past performance"],
    evidence: ["Program inventory", "Staff expertise matrix", "Past grant summary"],
  },
  {
    step: "Knowledge Repository",
    scoreDrivers: ["Organizational data library, proposal archive, impact metrics, success stories"],
    needed: ["Collect reusable organizational language", "Attach impact metrics", "Prepare success stories"],
    evidence: ["Data library", "Proposal archive", "Impact metrics repository"],
  },
  {
    step: "Grant Identification",
    scoreDrivers: ["Funding amount, deadline, eligibility, geography, population, industry fit"],
    needed: ["Capture opportunity record", "Confirm deadline and eligibility", "Estimate funding fit"],
    evidence: ["Grant URL", "Extractor summary", "Eligibility check"],
  },
  {
    step: "Grant Qualification",
    scoreDrivers: ["Mission, geography, population, industry, past performance, staff expertise, partners"],
    needed: ["Run alignment scoring", "Identify go/no-go risks", "Confirm partner network"],
    evidence: ["Alignment score", "Gap analysis", "Partner map"],
  },
  {
    step: "Grant Development",
    scoreDrivers: ["Need statement, SMART objectives, logic model, evaluation plan, budget narrative, narrative alignment"],
    needed: ["Assign owners", "Draft required narrative sections", "Resolve missing or weak requirements"],
    evidence: ["Need statement", "Project narrative", "Budget narrative", "Evaluation plan"],
  },
  {
    step: "Submission",
    scoreDrivers: ["Final packet, required documents, approvals, compliance, formatting, submit authority"],
    needed: ["Approve submission package", "Clear QA/QC reviews", "Confirm portal and formatting requirements"],
    evidence: ["Final narrative", "Budget workbook", "Compliance forms", "Executive approval"],
  },
  {
    step: "Reporting",
    scoreDrivers: ["Reporting tools, outcomes, metrics, data collection, sustainability plan"],
    needed: ["Define post-award reporting cadence", "Confirm metrics and data collection", "Prepare sustainability evidence"],
    evidence: ["Reporting plan", "Outcome metrics", "Sustainability plan"],
  },
];

const productOutcomes = [
  {
    title: "Funding Intelligence Platform",
    items: ["Centralized grant opportunity database", "Grant qualification and scoring system", "Funding pipeline management process"],
  },
  {
    title: "Grant Development Toolkit",
    items: ["White paper templates", "Capability statements", "Proposal writing guides", "Budget templates", "Budget narrative templates"],
  },
  {
    title: "Grant Operations Framework",
    items: ["Standard operating procedures", "Review workflows", "Approval workflows", "Compliance management", "Reporting tools"],
  },
  {
    title: "Knowledge Management Repository",
    items: ["Organizational data library", "Proposal archive", "Impact metrics repository", "Success story repository"],
  },
];

const businessOutcomes = [
  { title: "Revenue & Funding", items: ["Increase opportunities identified", "Increase submissions", "Improve award success rate", "Diversify funding sources"] },
  { title: "Operational Excellence", items: ["Reduce cycle time", "Improve proposal quality", "Reduce duplication", "Improve collaboration"] },
  { title: "Strategic Growth", items: ["Enable new programs", "Increase capacity", "Increase stakeholder confidence", "Improve sustainability"] },
];

const alignmentWeights = [
  ["Mission", 15],
  ["Geography", 10],
  ["Population", 15],
  ["Industry", 20],
  ["Past Performance", 20],
  ["Staff Expertise", 10],
  ["Partners", 10],
];

const extractorFields = [
  "Funding Amount",
  "Deadline",
  "Eligibility",
  "Required Documents",
  "Submission Requirements",
  "Review Criteria",
  "Budget Restrictions",
  "Sustainability Requirements",
  "Partner Requirements",
];

const applicantIntakeGroups = [
  { title: "Organization", items: ["Organization profile", "Capacity statement", "Certifications", "Registrations"] },
  { title: "Project", items: ["Problem statement", "Target population", "Goals", "Objectives", "Activities"] },
  { title: "Budget", items: ["Direct costs", "Indirect costs", "Match contributions"] },
  { title: "Evaluation", items: ["Outcomes", "Metrics", "Data collection"] },
];

const organizationAlignmentRubric = [
  ["Website confirms mission", 10, "mission"],
  ["Website confirms services/programs", 15, "programs"],
  ["Industry matches grant", 15, "industry"],
  ["Target population matches grant", 15, "population"],
  ["Geography matches grant", 10, "geography"],
  ["Past performance shown", 15, "pastPerformance"],
  ["Leadership/contact info present", 5, "leadership"],
  ["Impact metrics shown", 10, "impact"],
  ["Partner role is clear", 5, "partnerRole"],
];

const confidenceLevels = ["Confirmed by website", "Likely but not confirmed", "Missing from website", "Needs human verification"];

const verificationOptions = ["Needs review", "Verified for proposal use", "Needs backup document", "Do not use in proposal"];

const baseGrantCriteria = [
  {
    id: "lead-eligibility",
    requirement: "Confirm lead applicant eligibility",
    stage: "Identified",
    priority: "Critical",
    extractedDetail: "Lead applicant must be eligible under the opportunity rules.",
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
    id: "need-statement",
    requirement: "Draft need statement",
    stage: "Draft",
    priority: "High",
    extractedDetail: "Need statement should define the problem, affected population, evidence base, and urgency.",
  },
  {
    id: "project-narrative",
    requirement: "Draft project narrative",
    stage: "Draft",
    priority: "Critical",
    extractedDetail: "Project narrative should respond directly to funder criteria and explain the proposed approach.",
  },
  {
    id: "funder-alignment",
    requirement: "Align narrative to funder priorities",
    stage: "Review",
    priority: "Critical",
    extractedDetail: "Narrative should clearly connect applicant goals, program activities, and funder priorities.",
  },
  {
    id: "response-quality",
    requirement: "Review response quality against scoring criteria",
    stage: "Review",
    priority: "High",
    extractedDetail: "Responses should be complete, specific, evidence-backed, and aligned with the scoring rubric.",
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

function titleCase(value) {
  return value
    .split(/[-_/]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function createGrantProfile(url) {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    const lastPathPart = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
    const hostname = parsed.hostname.replace(/^www\./, "");
    return {
      grantName: lastPathPart ? titleCase(lastPathPart) : `Funding Opportunity from ${hostname}`,
      funder: titleCase(hostname.split(".")[0] || "Unknown funder"),
      source: "Generated from submitted URL",
      submittedUrl: url,
      parserStatus: "Client-side URL profile",
    };
  } catch {
    return {
      grantName: "Submitted Funding Opportunity",
      funder: "Unknown funder",
      source: "Generated from submitted text",
      submittedUrl: url,
      parserStatus: "Client-side URL profile",
    };
  }
}

function hashString(value) {
  return [...value].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7);
}

function seededValue(seed, min, max, offset = 0) {
  const range = max - min + 1;
  return min + ((seed + offset * 7919) % range);
}

function getUrlTokens(url) {
  return url
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !["www", "com", "org", "gov", "net", "html", "funding", "grant"].includes(token));
}

function inferGrantDomain(tokens) {
  const joined = tokens.join(" ");
  if (/health|medical|clinic|mental|behavioral|hospital/.test(joined)) return "health access";
  if (/education|school|student|teacher|stem|college|workforce/.test(joined)) return "education and workforce";
  if (/climate|energy|environment|water|conservation|resilience/.test(joined)) return "environmental resilience";
  if (/housing|community|homeless|neighborhood|urban|rural/.test(joined)) return "community development";
  if (/technology|digital|broadband|cyber|data|ai|innovation/.test(joined)) return "technology capacity";
  return "program implementation";
}

function createGrantCriteria(url, profile) {
  const tokens = getUrlTokens(url);
  const domain = inferGrantDomain(tokens);
  const focus = tokens.slice(-3).map(titleCase).join(" ") || profile.grantName;
  const funder = profile.funder;

  return baseGrantCriteria.map((item) => {
    const domainDetails = {
      "lead-eligibility": `Confirm the applicant is eligible for ${funder} and the ${domain} opportunity rules.`,
      "deadline-submission": `Identify the ${profile.grantName} due date, portal, registration steps, and submission package.`,
      "statewide-strategy": `Define a ${domain} strategy tied to ${focus} outcomes and service geography.`,
      partnerships: `Confirm partners needed to deliver ${focus}, including roles, match commitments, and data responsibilities.`,
      "logic-model": `Build a logic model that connects ${domain} needs, activities, outputs, and outcomes.`,
      "smart-objectives": `Define SMART objectives for ${focus} with measurable targets and timing.`,
      "evaluation-plan": `Create an evaluation plan with ${domain} metrics, data sources, baselines, and reporting cadence.`,
      "need-statement": `Draft a need statement for ${focus} using relevant population, service gap, and urgency evidence.`,
      "project-narrative": `Draft the ${profile.grantName} project narrative so it responds to the funder criteria and explains the proposed ${domain} approach.`,
      "funder-alignment": `Review the narrative for alignment with ${funder} priorities, scoring language, and expected outcomes.`,
      "response-quality": `QA each written response for completeness, evidence, specificity, and direct alignment to the ${profile.grantName} scoring criteria.`,
      budget: `Create a budget and narrative that ties costs to ${focus} activities and funder allowability rules.`,
      attachments: `Confirm all attachments required by ${funder}, including certifications, forms, and organizational documents.`,
      letters: `Confirm collaboration or support letters that prove partner commitments for ${focus}.`,
      compliance: `Confirm compliance requirements for ${domain}, including assurances, reporting, privacy, and procurement rules.`,
      "page-formatting": `Confirm page limits, file naming, formatting, and final upload rules for ${profile.grantName}.`,
    };

    const requirementMap = {
      "lead-eligibility": `Confirm ${funder} applicant eligibility`,
      "deadline-submission": `Identify ${profile.grantName} deadline and submission rules`,
      "statewide-strategy": `Define ${domain} strategy`,
      partnerships: `Confirm ${focus} partnerships`,
      "logic-model": `Build ${domain} logic model`,
      "smart-objectives": `Define SMART objectives for ${focus}`,
      "evaluation-plan": `Create ${domain} evaluation plan`,
      "need-statement": `Draft ${focus} need statement`,
      "project-narrative": `Draft ${profile.grantName} project narrative`,
      "funder-alignment": `Align narrative to ${funder} priorities`,
      "response-quality": `Review responses against ${profile.grantName} scoring criteria`,
      budget: `Create ${focus} budget and budget narrative`,
      attachments: `Confirm ${funder} required attachments`,
      letters: `Confirm letters for ${focus} partners`,
      compliance: `Confirm ${domain} compliance requirements`,
      "page-formatting": `Confirm ${profile.grantName} page limits and formatting rules`,
    };

    return {
      ...item,
      requirement: requirementMap[item.id] || item.requirement,
      extractedDetail: domainDetails[item.id] || item.extractedDetail,
    };
  });
}

function createInitialStatuses(criteria, url) {
  const seed = hashString(url);
  const statusOptions = ["complete", "weak", "missing", "weak", "complete"];
  return criteria.reduce((result, item, index) => {
    const value = statusOptions[seededValue(seed, 0, statusOptions.length - 1, index)];
    result[item.id] = item.priority === "Critical" && value === "complete" && index > 1 ? "weak" : value;
    return result;
  }, {});
}

function createReadinessProfile(url) {
  const seed = hashString(url);
  return {
    organizationalEligibility: seededValue(seed, 58, 96, 1),
    partnershipReadiness: seededValue(seed, 35, 92, 2),
    projectDesign: seededValue(seed, 40, 94, 3),
    evaluationCapacity: seededValue(seed, 30, 90, 4),
    budgetReadiness: seededValue(seed, 42, 96, 5),
    complianceReadiness: seededValue(seed, 45, 98, 6),
  };
}

function createCriteriaAssignments(criteria, statuses, url) {
  const seed = hashString(url);
  const artifactOptions = ["Not started", "In progress", "Evidence uploaded", "Ready for review"];
  const reviewOptions = ["Not reviewed", "Needs changes", "Approved"];
  return criteria.reduce((result, item, index) => {
    const status = statuses[item.id] || "missing";
    const artifactStatus =
      status === "complete" ? "Ready for review" : artifactOptions[seededValue(seed, 0, artifactOptions.length - 1, index)];
    const reviewStatus =
      status === "complete" ? reviewOptions[seededValue(seed, 1, 2, index)] : reviewOptions[seededValue(seed, 0, 1, index)];
    result[item.id] = {
      ownerId: ownerByStage[item.stage] || "grant-lead",
      reviewerId: reviewerByStage[item.stage] || "compliance",
      dueInDays: seededValue(seed, 3, 21, index),
      artifactStatus,
      reviewStatus,
      evidence: artifactStatus === "Not started" ? "" : `${item.stage} evidence packet`,
      comment: status === "missing" ? "Needs owner follow-up before gate review." : "Ready for contributor update.",
    };
    return result;
  }, {});
}

function createSubmissionPackage(url) {
  const seed = hashString(url);
  return submissionPackageTemplate.reduce((result, item, index) => {
    const states = ["Missing", "In progress", "Ready for review", "Approved"];
    const status = states[seededValue(seed, 0, states.length - 1, index)];
    result[item.id] = {
      ...item,
      status,
      blocker: status === "Approved" ? "" : `${item.label} needs owner completion or final approval.`,
    };
    return result;
  }, {});
}

function createReviewApprovals(url) {
  const seed = hashString(url);
  return reviewGates.reduce((result, item, index) => {
    const states = ["Pending", "Needs changes", "Approved"];
    result[item.id] = {
      ...item,
      status: states[seededValue(seed, 0, states.length - 1, index)],
    };
    return result;
  }, {});
}

function getMemberName(memberId) {
  return teamMembers.find((member) => member.id === memberId)?.name || "Unassigned";
}

function createOrganizationIntelligence(url) {
  const seed = hashString(url);
  const domains = ["Community impact", "Education access", "Workforce development", "Health equity", "Technology capacity"];
  return {
    parent: {
      mission: "Expand community capacity through evidence-based programs and sustainable partnerships.",
      vision: "A resilient organization with diversified funding and measurable public impact.",
      history: `${seededValue(seed, 5, 24, 1)} years serving priority communities.`,
      taxStatus: "501(c)(3)",
      uei: `UEI-${seededValue(seed, 100000, 999999, 2)}`,
      samRegistration: seededValue(seed, 0, 1, 3) ? "Active" : "Needs renewal",
      cageCode: `CAGE-${seededValue(seed, 1000, 9999, 4)}`,
      geographicCoverage: ["Countywide", "Regional", "Statewide"][seededValue(seed, 0, 2, 5)],
      strategicPriorities: domains.slice(0, seededValue(seed, 2, 4, 6)).join(", "),
      annualBudget: `$${seededValue(seed, 1, 9, 7)}.${seededValue(seed, 1, 9, 8)}M`,
      yearsOperating: seededValue(seed, 5, 24, 9),
    },
    subOrganizations: [
      {
        name: "Programs Division",
        industry: domains[seededValue(seed, 0, domains.length - 1, 10)],
        programs: "Direct services, partner coordination, technical assistance",
        capabilities: "Program design, outreach, case management, reporting",
        serviceArea: "Priority service region",
        targetPopulation: "Underserved residents and partner agencies",
        staffExpertise: "Program management, compliance, evaluation",
        certifications: "State registrations, fiscal controls, data privacy training",
        pastGrants: `${seededValue(seed, 2, 12, 11)} relevant awards managed`,
        impactMetrics: "Participants served, outcomes achieved, partner reach",
      },
    ],
  };
}

function createAlignmentScores(url) {
  const seed = hashString(url);
  const scores = alignmentWeights.map(([category, weight], index) => {
    const score = seededValue(seed, 55, 98, index);
    return {
      category,
      weight,
      score,
      weighted: Math.round((score * weight) / 100),
    };
  });
  return {
    scores,
    total: scores.reduce((sum, item) => sum + item.weighted, 0),
  };
}

function createExtractorSummary(url, profile) {
  const seed = hashString(url);
  return extractorFields.map((field, index) => ({
    field,
    value:
      field === "Funding Amount"
        ? `$${seededValue(seed, 100000, 950000, index).toLocaleString()} estimated`
        : field === "Deadline"
          ? `${seededValue(seed, 30, 120, index)} days from intake`
      : `${field} identified for ${profile.grantName}`,
  }));
}

function extractHostnameName(url, fallback) {
  try {
    const hostname = new URL(normalizeWebsiteUrl(url)).hostname.replace(/^www\./, "");
    return titleCase(hostname.split(".")[0] || fallback);
  } catch {
    return fallback;
  }
}

function normalizeWebsiteUrl(url) {
  const trimmedUrl = String(url || "").trim();
  if (!trimmedUrl) return "";
  return /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;
}

function inferOrganizationIndustry(url, orgName, grantProfile, seed) {
  const joined = `${url} ${orgName} ${grantProfile.grantName}`.toLowerCase();
  if (/veteran|reentry|apprentice|employment|job|workforce|trade|career|forge|labor/.test(joined)) return "Workforce";
  if (/school|student|college|university|education|training|stem|teacher/.test(joined)) return "Education";
  if (/health|clinic|medical|behavioral|mental|wellness|care/.test(joined)) return "Health";
  if (/housing|shelter|homeless|home|residential/.test(joined)) return "Housing";
  if (/technology|digital|broadband|cyber|data|ai|innovation/.test(joined)) return "Technology";
  if (/community|neighborhood|rural|urban|resident|family/.test(joined)) return "Community Development";

  const industryOptions = ["Workforce", "Education", "Health", "Housing", "Technology", "Community Development"];
  return industryOptions[seededValue(seed, 0, industryOptions.length - 1, 1)];
}

function createOrganizationWebsiteRecord({ url, role, grantProfile, index = 0 }) {
  const normalizedUrl = normalizeWebsiteUrl(url);
  const seed = hashString(`${normalizedUrl}-${role}-${grantProfile.grantName}-${index}`);
  const orgName = extractHostnameName(normalizedUrl, role === "Lead Applicant" ? "Lead Organization" : `Sub Organization ${index + 1}`);
  const serviceOptions = ["training", "technical assistance", "direct services", "case management", "community outreach", "data and evaluation"];
  const populationOptions = ["students", "families", "workers", "rural residents", "small businesses", "underserved communities"];
  const geographyOptions = ["local", "regional", "statewide", "multi-county", "urban", "rural"];
  const industry = inferOrganizationIndustry(normalizedUrl, orgName, grantProfile, seed);
  const programs = `${titleCase(serviceOptions[seededValue(seed, 0, serviceOptions.length - 1, 2)])} programs`;
  const capabilities = `${programs}, partnership delivery, reporting support`;
  const serviceArea = titleCase(geographyOptions[seededValue(seed, 0, geographyOptions.length - 1, 3)]);
  const targetPopulation = titleCase(populationOptions[seededValue(seed, 0, populationOptions.length - 1, 4)]);

  const evidence = {
    mission: createEvidence(seed, 1, `${orgName} mission appears aligned with ${grantProfile.grantName}.`),
    programs: createEvidence(seed, 2, `${orgName} lists ${programs.toLowerCase()} and relevant services.`),
    industry: createEvidence(seed, 3, `${industry} focus appears connected to the grant topic.`),
    population: createEvidence(seed, 4, `${targetPopulation} are referenced as a likely served population.`),
    geography: createEvidence(seed, 5, `${serviceArea} service area appears compatible with grant geography.`),
    pastPerformance: createEvidence(seed, 6, "Website suggests prior program delivery or grant-related experience."),
    leadership: createEvidence(seed, 7, "Leadership or contact information appears available for follow-up."),
    impact: createEvidence(seed, 8, "Impact data, annual reports, or outcome statements may support the application."),
    partnerRole: createEvidence(seed, 9, `${role} role can be justified based on visible services and capabilities.`),
  };

  const scoring = scoreOrganizationEvidence(evidence);
  return {
    id: `${role.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${seed}`,
    orgName,
    websiteUrl: normalizedUrl,
    role,
    industry,
    programs,
    capabilities,
    serviceArea,
    targetPopulation,
    pastWork: evidence.pastPerformance.note,
    whyTheyQualify: `${orgName} may qualify as ${role.toLowerCase()} because its website profile indicates ${industry.toLowerCase()} capacity, ${programs.toLowerCase()}, and ${serviceArea.toLowerCase()} reach.`,
    evidence,
    ...scoring,
  };
}

function createEvidence(seed, offset, note) {
  const confidence = confidenceLevels[seededValue(seed, 0, confidenceLevels.length - 1, offset)];
  return {
    confidence,
    verificationStatus: confidence === "Confirmed by website" ? "Needs review" : "Needs backup document",
    source: "Website intake scan",
    note: confidence === "Missing from website" ? "Evidence not visible from the website profile. Request backup documentation." : note,
  };
}

function scoreOrganizationEvidence(evidence) {
  const score = organizationAlignmentRubric.reduce((sum, [, points, key]) => {
    const confidence = evidence[key]?.confidence;
    const verificationStatus = evidence[key]?.verificationStatus;
    const baseEarned = confidence === "Confirmed by website" ? points : confidence === "Likely but not confirmed" ? Math.round(points * 0.5) : confidence === "Needs human verification" ? Math.round(points * 0.25) : 0;
    const earned = verificationStatus === "Verified for proposal use" ? points : verificationStatus === "Do not use in proposal" ? 0 : baseEarned;
    return sum + earned;
  }, 0);
  const missingItems = organizationAlignmentRubric
    .filter(([, , key]) => evidence[key]?.verificationStatus !== "Verified for proposal use")
    .map(([label]) => label);
  const riskScore = Math.max(0, 100 - score);
  const verifiedCount = Object.values(evidence).filter((item) => item.verificationStatus === "Verified for proposal use").length;
  const blockedCount = Object.values(evidence).filter((item) => item.verificationStatus === "Do not use in proposal").length;
  const evidenceUseStatus =
    blockedCount > 0
      ? "Do not use until corrected"
      : verifiedCount === organizationAlignmentRubric.length
        ? "Evidence verified"
        : "Needs reviewer verification";
  const status = score >= 90 && evidenceUseStatus === "Evidence verified" ? "Strong verified partner" : score >= 80 ? "Good fit, verify evidence" : score >= 70 ? "Needs backup documents" : score >= 50 ? "Weak fit" : "Do not use without justification";
  return { alignmentScore: score, riskScore, missingItems, status, verifiedCount, evidenceUseStatus };
}

function createDefaultWebsiteIntake(grantProfile) {
  return [
    createOrganizationWebsiteRecord({ url: "https://lead-organization.org", role: "Lead Applicant", grantProfile, index: 0 }),
    createOrganizationWebsiteRecord({ url: "https://partner-one.org", role: "Sub-Organization Partner", grantProfile, index: 1 }),
  ];
}

function summarizeOrganizationPool(organizations, grantProfile) {
  if (!organizations.length) {
    return `Add the lead applicant and sub-organization websites to review how each organization applies to ${grantProfile.grantName}.`;
  }
  const averageScore = Math.round(organizations.reduce((sum, org) => sum + org.alignmentScore, 0) / organizations.length);
  const strongest = [...organizations].sort((a, b) => b.alignmentScore - a.alignmentScore)[0];
  const riskCount = organizations.filter((org) => org.alignmentScore < 70).length;
  return `${organizations.length} organization profile(s) are mapped to ${grantProfile.grantName}. Average partner alignment is ${averageScore}%. ${strongest.orgName} is currently the strongest fit at ${strongest.alignmentScore}% as ${strongest.role}. ${riskCount ? `${riskCount} organization(s) need backup documents or role justification before submission.` : "No organization is currently below the 70% partner threshold."}`;
}

function analyzeUploadedDocument(file, text, requirement) {
  const content = `${file.name} ${text || ""}`.toLowerCase();
  const words = requirement.requirement
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 4);
  const uniqueWords = [...new Set(words)];
  const hits = uniqueWords.filter((word) => content.includes(word)).length;
  const keywordScore = uniqueWords.length ? Math.round((hits / uniqueWords.length) * 70) : 25;
  const formatScore = /\.(pdf|doc|docx|xlsx|xls|csv|txt)$/i.test(file.name) ? 15 : 5;
  const sizeScore = file.size > 1500 ? 15 : file.size > 0 ? 8 : 0;
  const score = Math.min(100, keywordScore + formatScore + sizeScore);
  const status = score >= 82 ? "complete" : score >= 50 ? "weak" : "missing";
  const reviewStatus = score >= 82 ? "Approved" : score >= 50 ? "Needs changes" : "Not reviewed";
  const artifactStatus = score >= 82 ? "Ready for review" : score >= 50 ? "Evidence uploaded" : "In progress";
  const summary =
    score >= 82
      ? "Document appears to strongly support this requirement."
      : score >= 50
        ? "Document partially supports this requirement; reviewer should confirm missing details."
        : "Document does not clearly support this requirement yet.";

  return {
    documentName: file.name,
    documentScore: score,
    documentSummary: summary,
    scannedAt: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }),
    status,
    reviewStatus,
    artifactStatus,
  };
}

const emptyReadiness = {
  organizationalEligibility: 0,
  partnershipReadiness: 0,
  projectDesign: 0,
  evaluationCapacity: 0,
  budgetReadiness: 0,
  complianceReadiness: 0,
};

const teamMembers = [
  { id: "grant-lead", name: "Grant Lead", role: "Grant lead", focus: "Timeline, narrative, final packet" },
  { id: "program-director", name: "Program Director", role: "Program owner", focus: "Need, strategy, partners" },
  { id: "finance", name: "Finance Manager", role: "Budget owner", focus: "Budget, match, allowability" },
  { id: "evaluator", name: "Evaluation Lead", role: "Evaluation reviewer", focus: "Logic model, metrics, outcomes" },
  { id: "compliance", name: "Compliance Officer", role: "Compliance reviewer", focus: "Eligibility, assurances, formatting" },
  { id: "executive", name: "Executive Sponsor", role: "Final approver", focus: "Go/no-go, authorizations" },
];

const ownerByStage = {
  Identified: "grant-lead",
  Analyzed: "program-director",
  Design: "evaluator",
  Draft: "finance",
  Review: "compliance",
  Submit: "grant-lead",
};

const reviewerByStage = {
  Identified: "compliance",
  Analyzed: "grant-lead",
  Design: "program-director",
  Draft: "grant-lead",
  Review: "executive",
  Submit: "executive",
};

const submissionPackageTemplate = [
  { id: "need-statement-draft", label: "Need statement draft", ownerId: "program-director", required: true },
  { id: "project-narrative-draft", label: "Project narrative draft", ownerId: "grant-lead", required: true },
  { id: "narrative", label: "Final narrative", ownerId: "grant-lead", required: true },
  { id: "budget-workbook", label: "Budget workbook", ownerId: "finance", required: true },
  { id: "budget-narrative", label: "Budget narrative", ownerId: "finance", required: true },
  { id: "logic-model-packet", label: "Logic model and work plan", ownerId: "evaluator", required: true },
  { id: "funder-alignment-review", label: "Funder alignment review", ownerId: "grant-lead", required: true },
  { id: "rubric-response-review", label: "Rubric response quality review", ownerId: "compliance", required: true },
  { id: "partner-letters", label: "Partner letters and commitments", ownerId: "program-director", required: true },
  { id: "compliance-forms", label: "Compliance forms and assurances", ownerId: "compliance", required: true },
  { id: "executive-approval", label: "Executive submit approval", ownerId: "executive", required: true },
];

const reviewGates = [
  { id: "narrative", label: "Narrative quality review", ownerId: "grant-lead" },
  { id: "technical", label: "Technical review", ownerId: "program-director" },
  { id: "budget", label: "Budget review", ownerId: "finance" },
  { id: "compliance", label: "Compliance review", ownerId: "compliance" },
  { id: "executive", label: "Executive approval", ownerId: "executive" },
];

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

function buildAnalytics(statuses, readiness, criteria) {
  const requirementScores = criteria.map((item) => ({
    ...item,
    status: statuses[item.id] || "missing",
    score: scoreRequirement(statuses[item.id] || "missing"),
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

function buildCollaborationMetrics(criteria, assignments, submissionPackage, reviewApprovals) {
  const assignmentList = criteria.map((item) => ({ ...item, ...(assignments[item.id] || {}) }));
  const packageItems = Object.values(submissionPackage);
  const approvalItems = Object.values(reviewApprovals);
  const approvedRequirements = assignmentList.filter((item) => item.reviewStatus === "Approved").length;
  const uploadedArtifacts = assignmentList.filter((item) => ["Evidence uploaded", "Ready for review"].includes(item.artifactStatus)).length;
  const approvedPackage = packageItems.filter((item) => item.status === "Approved").length;
  const approvedReviews = approvalItems.filter((item) => item.status === "Approved").length;
  const requirementApprovalScore = criteria.length ? Math.round((approvedRequirements / criteria.length) * 100) : 0;
  const artifactScore = criteria.length ? Math.round((uploadedArtifacts / criteria.length) * 100) : 0;
  const packageScore = packageItems.length ? Math.round((approvedPackage / packageItems.length) * 100) : 0;
  const reviewScore = approvalItems.length ? Math.round((approvedReviews / approvalItems.length) * 100) : 0;
  const submissionReadiness = Math.round(requirementApprovalScore * 0.25 + artifactScore * 0.2 + packageScore * 0.35 + reviewScore * 0.2);
  const unresolvedBlockers = [
    ...assignmentList
      .filter((item) => item.reviewStatus !== "Approved" || item.artifactStatus === "Not started")
      .map((item) => `${item.requirement}: ${item.reviewStatus}, ${item.artifactStatus}`),
    ...packageItems.filter((item) => item.status !== "Approved").map((item) => item.blocker),
    ...approvalItems.filter((item) => item.status !== "Approved").map((item) => `${item.label} is ${item.status.toLowerCase()}.`),
  ];

  return {
    assignmentList,
    packageItems,
    approvalItems,
    requirementApprovalScore,
    artifactScore,
    packageScore,
    reviewScore,
    submissionReadiness,
    unresolvedBlockers,
    directSubmitDecision: submissionReadiness === 100 ? "Ready to submit" : "Do not submit yet",
  };
}

const trackerStorageKey = "grvfsGrantTrackerRecords";

function hashText(value) {
  return String(value || "grant")
    .split("")
    .reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
    .toString(36);
}

function slugify(value) {
  return String(value || "grant")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 42);
}

function createGrantTrackerId(grantProfile, grantUrl) {
  const name = grantProfile?.grantName || grantUrl || "grant";
  return `${slugify(name)}-${hashText(grantUrl || name)}`;
}

function loadTrackerRecords() {
  if (typeof window === "undefined") return [];
  try {
    const savedRecords = window.localStorage.getItem(trackerStorageKey);
    return savedRecords ? JSON.parse(savedRecords) : [];
  } catch {
    return [];
  }
}

function saveTrackerRecords(records) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(trackerStorageKey, JSON.stringify(records));
}

function App() {
  const [grantUrl, setGrantUrl] = React.useState("");
  const [hasAnalyzed, setHasAnalyzed] = React.useState(false);
  const [analysisRun, setAnalysisRun] = React.useState(null);
  const [grantProfile, setGrantProfile] = React.useState(null);
  const [urlError, setUrlError] = React.useState("");
  const [criteria, setCriteria] = React.useState([]);
  const [statuses, setStatuses] = React.useState({});
  const [readiness, setReadiness] = React.useState(emptyReadiness);
  const [assignments, setAssignments] = React.useState({});
  const [submissionPackage, setSubmissionPackage] = React.useState({});
  const [reviewApprovals, setReviewApprovals] = React.useState({});
  const [organizationIntel, setOrganizationIntel] = React.useState(null);
  const [alignment, setAlignment] = React.useState({ scores: [], total: 0 });
  const [extractorSummary, setExtractorSummary] = React.useState([]);
  const [organizationWebsites, setOrganizationWebsites] = React.useState([]);
  const [grantTracker, setGrantTracker] = React.useState(() => loadTrackerRecords());
  const [activeTrackerId, setActiveTrackerId] = React.useState("");

  const analytics = React.useMemo(() => buildAnalytics(statuses, readiness, criteria), [statuses, readiness, criteria]);
  const collaboration = React.useMemo(
    () => buildCollaborationMetrics(criteria, assignments, submissionPackage, reviewApprovals),
    [criteria, assignments, submissionPackage, reviewApprovals],
  );

  React.useEffect(() => {
    saveTrackerRecords(grantTracker);
  }, [grantTracker]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const trackerId = window.location.hash.replace("#grant-", "");
    if (!trackerId) return;
    const trackerRecord = grantTracker.find((record) => record.id === trackerId);
    if (trackerRecord) {
      loadGrantFromTracker(trackerRecord, false);
    }
  }, []);

  function createAnalysisRun(url) {
    return {
      url,
      analyzedAt: new Date().toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    };
  }

  function analyzeGrant() {
    const submittedUrl = grantUrl.trim();
    if (!submittedUrl) {
      setUrlError("Paste a grant URL before running analysis.");
      setHasAnalyzed(false);
      return;
    }

    // Future backend/API connection: send grantUrl to a grant parser endpoint and replace grantCriteria with live extraction data.
    const profile = createGrantProfile(submittedUrl);
    const generatedCriteria = createGrantCriteria(submittedUrl, profile);
    const generatedStatuses = createInitialStatuses(generatedCriteria, submittedUrl);
    setUrlError("");
    setGrantProfile(profile);
    setAnalysisRun(createAnalysisRun(submittedUrl));
    setCriteria(generatedCriteria);
    setStatuses(generatedStatuses);
    setReadiness(createReadinessProfile(submittedUrl));
    setAssignments(createCriteriaAssignments(generatedCriteria, generatedStatuses, submittedUrl));
    setSubmissionPackage(createSubmissionPackage(submittedUrl));
    setReviewApprovals(createReviewApprovals(submittedUrl));
    setOrganizationIntel(createOrganizationIntelligence(submittedUrl));
    setAlignment(createAlignmentScores(submittedUrl));
    setExtractorSummary(createExtractorSummary(submittedUrl, profile));
    setOrganizationWebsites(createDefaultWebsiteIntake(profile));
    setHasAnalyzed(true);
  }

  function resetDemo() {
    setGrantUrl("");
    setCriteria([]);
    setStatuses({});
    setReadiness(emptyReadiness);
    setAssignments({});
    setSubmissionPackage({});
    setReviewApprovals({});
    setOrganizationIntel(null);
    setAlignment({ scores: [], total: 0 });
    setExtractorSummary([]);
    setOrganizationWebsites([]);
    setGrantProfile(null);
    setAnalysisRun(null);
    setUrlError("");
    setActiveTrackerId("");
    setHasAnalyzed(false);
    if (typeof window !== "undefined" && window.location.hash.startsWith("#grant-")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  const currentStage =
    analytics.stageScores.find((item) => item.stage !== "Done" && !item.pass)?.stage ?? "Submit";

  function saveCurrentGrantToTracker() {
    if (!hasAnalyzed || !grantProfile) return;

    const id = createGrantTrackerId(grantProfile, grantUrl);
    const savedAt = new Date().toISOString();
    const activeOrgCount = organizationWebsites.length;
    const blockers = [...analytics.criticalGaps.map((item) => item.requirement), ...collaboration.unresolvedBlockers].slice(0, 5);
    const record = {
      id,
      grantName: grantProfile.grantName,
      funder: grantProfile.funder,
      grantUrl,
      submittedUrl: grantProfile.submittedUrl,
      currentStage,
      score: analytics.overallScore,
      statusLabel: analytics.overallStatus.label,
      statusTone: analytics.overallStatus.tone,
      decision: analytics.decision,
      organizationCount: activeOrgCount,
      blockers,
      updatedAt: savedAt,
      trackerLink: `#grant-${id}`,
      snapshot: {
        grantUrl,
        hasAnalyzed: true,
        analysisRun,
        grantProfile,
        criteria,
        statuses,
        readiness,
        assignments,
        submissionPackage,
        reviewApprovals,
        organizationIntel,
        alignment,
        extractorSummary,
        organizationWebsites,
      },
    };

    setGrantTracker((records) => {
      const remainingRecords = records.filter((item) => item.id !== id);
      return [record, ...remainingRecords];
    });
    setActiveTrackerId(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#grant-${id}`);
    }
  }

  function loadGrantFromTracker(record, updateHash = true) {
    if (!record?.snapshot) return;
    const snapshot = record.snapshot;
    setGrantUrl(snapshot.grantUrl || record.grantUrl || "");
    setCriteria(snapshot.criteria || []);
    setStatuses(snapshot.statuses || {});
    setReadiness(snapshot.readiness || emptyReadiness);
    setAssignments(snapshot.assignments || {});
    setSubmissionPackage(snapshot.submissionPackage || {});
    setReviewApprovals(snapshot.reviewApprovals || {});
    setOrganizationIntel(snapshot.organizationIntel || null);
    setAlignment(snapshot.alignment || { scores: [], total: 0 });
    setExtractorSummary(snapshot.extractorSummary || []);
    setOrganizationWebsites(snapshot.organizationWebsites || []);
    setGrantProfile(snapshot.grantProfile || null);
    setAnalysisRun(snapshot.analysisRun || null);
    setUrlError("");
    setHasAnalyzed(true);
    setActiveTrackerId(record.id);
    if (updateHash && typeof window !== "undefined") {
      window.history.replaceState(null, "", `#grant-${record.id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function removeGrantFromTracker(id) {
    setGrantTracker((records) => records.filter((record) => record.id !== id));
    if (activeTrackerId === id) {
      setActiveTrackerId("");
    }
  }

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
        <section className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800">
          Prototype generates URL-specific draft criteria, readiness grades, and gap scores in the browser. Full live page
          parsing will be added when the backend/API version is connected.
        </section>

        <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
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
                  placeholder="Paste grant opportunity URL"
                />
                <button className="btn-primary min-h-11 justify-center" onClick={analyzeGrant} type="button">
                  <FileSearch size={18} />
                  Analyze Grant
                </button>
              </div>
              {urlError ? <p className="text-sm font-medium text-red-700">{urlError}</p> : null}
            </div>
            {hasAnalyzed ? (
              <OrganizationWebsiteIntake
                embedded
                grantProfile={grantProfile}
                organizations={organizationWebsites}
                setOrganizations={setOrganizationWebsites}
              />
            ) : null}
          </div>

          {hasAnalyzed ? (
            <ScoreCard
              label="Overall Readiness Score"
              score={analytics.overallScore}
              status={analytics.overallStatus}
              footer={analytics.decision === "Move Forward" ? "All active gates pass" : `${analytics.blockedStages.length} gate(s) need attention`}
              analytics={analytics}
              alignment={alignment}
              collaboration={collaboration}
            />
          ) : (
            <AwaitingAnalysisCard />
          )}
        </section>

        <GrantTrackerDatabase
          records={grantTracker}
          activeTrackerId={activeTrackerId}
          hasAnalyzed={hasAnalyzed}
          onSaveCurrent={saveCurrentGrantToTracker}
          onLoad={loadGrantFromTracker}
          onRemove={removeGrantFromTracker}
        />

        {hasAnalyzed ? (
          <>
            <ExecutiveSummary
              analytics={analytics}
              alignment={alignment}
              collaboration={collaboration}
              currentStage={currentStage}
              grantProfile={grantProfile}
            />
            <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <KeyCriteriaResults analytics={analytics} setStatuses={setStatuses} />
              <div className="grid gap-6">
                <ScoreBreakdown analytics={analytics} alignment={alignment} collaboration={collaboration} />
                <CompactValueFlow analytics={analytics} currentStage={currentStage} />
              </div>
            </section>

            <DetailsPanel title="Applicant readiness and full extracted criteria" eyebrow="Detailed Review" icon={ClipboardCheck}>
              <GrantMeta analysisRun={analysisRun} grantProfile={grantProfile} />
              <section className="mt-5 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <FullCriteriaTable analytics={analytics} setStatuses={setStatuses} grantProfile={grantProfile} />
                <ApplicantForm readiness={readiness} setReadiness={setReadiness} />
              </section>
            </DetailsPanel>

            <DetailsPanel title="Organization intelligence and grant alignment" eyebrow="Evidence Review" icon={Users}>
              <div className="mt-5">
                <GRVFSOverview />
              </div>
              <div className="mt-6">
                <IntelligenceEngine organizationIntel={organizationIntel} alignment={alignment} extractorSummary={extractorSummary} />
              </div>
            </DetailsPanel>

            <DetailsPanel title="Documents, owners, QA/QC, and submission package" eyebrow="Work Management" icon={FileCheck2}>
              <OrganizationWorkspace
                assignments={assignments}
                collaboration={collaboration}
                setAssignments={setAssignments}
                setStatuses={setStatuses}
                setSubmissionPackage={setSubmissionPackage}
                setReviewApprovals={setReviewApprovals}
                submissionPackage={submissionPackage}
                reviewApprovals={reviewApprovals}
              />
              <div className="mt-6">
                <Dashboard analytics={analytics} />
              </div>
              <div className="mt-6">
                <SubmissionCommandCenter analytics={analytics} collaboration={collaboration} grantProfile={grantProfile} />
              </div>
              <div className="mt-6">
                <Kanban analytics={analytics} currentStage={currentStage} grantProfile={grantProfile} collaboration={collaboration} />
              </div>
            </DetailsPanel>
          </>
        ) : (
          <section className="panel flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <SectionTitle icon={ShieldCheck} eyebrow="Demo Ready" title="Paste a grant URL and run analysis" />
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                The MVP will generate a readiness profile from the submitted link, compare it against applicant/project readiness inputs, then calculate gaps,
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

function ExecutiveSummary({ analytics, alignment, collaboration, currentStage, grantProfile }) {
  const topBlockers = [...analytics.criticalGaps.map((item) => item.requirement), ...collaboration.unresolvedBlockers].slice(0, 3);
  const nextAction = analytics.recommendedFixes[0] || "Maintain the current evidence package and prepare final submission review.";

  return (
    <section className="panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <SectionTitle icon={BarChart3} eyebrow="Executive Summary" title="Readiness decision and next action" />
        <div className="flex flex-wrap gap-2">
          <Badge tone={analytics.decision === "Move Forward" ? "green" : "red"}>{analytics.decision}</Badge>
          <Badge tone={analytics.overallStatus.tone}>{analytics.overallStatus.label}</Badge>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-slateLine bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-600">Current grant</div>
          <div className="mt-2 text-xl font-semibold text-ink">{grantProfile.grantName}</div>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <CardRow label="Funder" value={grantProfile.funder} />
            <CardRow label="Current Stage" value={currentStage} />
            <CardRow label="Organization Fit" value={`${alignment.total}%`} />
            <CardRow label="Submission Package" value={`${collaboration.submissionReadiness}%`} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <MetricTile label="Overall Readiness" value={`${analytics.overallScore}%`} status={analytics.overallStatus.label} tone={analytics.overallStatus.tone} />
          <MetricTile label="Blocked Gates" value={analytics.blockedStages.length} status={analytics.blockedStages.join(", ") || "None"} tone={analytics.blockedStages.length ? "red" : "green"} />
          <MetricTile label="Next Stage" value={currentStage} status={nextAction} tone="blue" />
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <InfoList title="Top blockers" empty="No priority blockers found." items={topBlockers} />
        <div className="rounded-lg border border-slateLine bg-white p-4">
          <div className="text-sm font-semibold text-ink">Recommended next action</div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{nextAction}</p>
        </div>
      </div>
    </section>
  );
}

function KeyCriteriaResults({ analytics, setStatuses }) {
  const [showAll, setShowAll] = React.useState(false);
  const priorityKeywords = ["eligibility", "deadline", "partner", "budget", "evaluation", "attachment", "compliance", "submission", "format"];
  const priorityCriteria = analytics.requirementScores.filter((item) =>
    priorityKeywords.some((keyword) => `${item.requirement} ${item.extractedDetail}`.toLowerCase().includes(keyword)),
  );
  const rows = showAll ? analytics.requirementScores : priorityCriteria.slice(0, 8);

  return (
    <section className="panel">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <SectionTitle icon={ClipboardCheck} eyebrow="Key Criteria Results" title="What matters most for readiness" />
        <button className="btn-secondary" onClick={() => setShowAll((current) => !current)} type="button">
          <ListChecks size={17} />
          {showAll ? "Show Key Criteria" : "Show All Criteria"}
        </button>
      </div>
      <div className="mt-5 overflow-hidden rounded-lg border border-slateLine">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Requirement</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Evidence Needed</th>
              <th className="px-4 py-3">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slateLine bg-white">
            {rows.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">
                  <div className="font-semibold text-ink">{item.requirement}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.stage} | {item.priority}</div>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={item.status === "complete" ? "green" : item.status === "weak" ? "yellow" : "red"}>
                    {item.status === "complete" ? "Complete" : item.status === "weak" ? "Weak" : "Missing"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-slate-600">{item.extractedDetail}</td>
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
    </section>
  );
}

function ScoreBreakdown({ analytics, alignment, collaboration }) {
  const stageScore = (stage) => analytics.stageScores.find((item) => item.stage === stage)?.score || 0;
  const scoreCards = [
    { label: "Eligibility Fit", score: stageScore("Identified"), note: "Lead applicant, deadline, and basic opportunity fit." },
    { label: "Organization Fit", score: alignment.total, note: "Mission, geography, population, capabilities, and partner match." },
    { label: "Partner Fit", score: Math.round((alignment.total + stageScore("Design")) / 2), note: "Required partner strength and role clarity." },
    { label: "Document Readiness", score: collaboration.artifactScore, note: "Evidence files, assignments, and uploaded artifacts." },
    { label: "Budget Readiness", score: stageScore("Draft"), note: "Budget, budget narrative, and allowable cost logic." },
    { label: "Submission Readiness", score: collaboration.submissionReadiness, note: "Package completion, reviews, and final approvals." },
  ];

  return (
    <section className="panel">
      <SectionTitle icon={Target} eyebrow="Score Breakdown" title="Readiness by decision area" />
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {scoreCards.map((item) => {
          const status = classifyScore(item.score);
          return (
            <div key={item.label} className="rounded-lg border border-slateLine bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold text-ink">{item.label}</div>
                <Badge tone={status.tone}>{item.score}%</Badge>
              </div>
              <Progress score={item.score} />
              <p className="mt-2 text-xs leading-5 text-slate-600">{item.note}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CompactValueFlow({ analytics, currentStage }) {
  return (
    <section className="panel">
      <SectionTitle icon={KanbanSquare} eyebrow="Value Flow" title="Stage gate snapshot" />
      <div className="mt-5 grid gap-2">
        {stageOrder.map((stage) => {
          const score = analytics.stageScores.find((item) => item.stage === stage);
          const isCurrent = currentStage === stage;
          const isDone = stage === "Done" || score?.pass;
          return (
            <details key={stage} className="rounded-lg border border-slateLine bg-white" open={isCurrent}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3">
                <div className="flex items-center gap-3">
                  <span className={`size-2 rounded-full ${isDone ? "bg-platformGreen" : "bg-red-500"}`} />
                  <span className="text-sm font-semibold text-ink">{stage}</span>
                  {isCurrent ? <Badge tone="blue">Current</Badge> : null}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tabular-nums">{score?.score ?? 0}%</span>
                  <Badge tone={score?.pass ? "green" : "red"}>{score?.pass ? "Pass" : "Needs Work"}</Badge>
                </div>
              </summary>
              <div className="border-t border-slateLine px-3 py-3 text-sm text-slate-600">
                Gate requirement: {stage === "Draft" ? "80-85 minimum" : `${stageGates[stage]}+`}.{" "}
                {score?.pass ? "This gate currently meets the minimum." : "Open the criteria and document sections below to resolve this gate."}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

function FullCriteriaTable({ analytics, setStatuses, grantProfile }) {
  return (
    <div className="panel">
      <SectionTitle icon={ClipboardCheck} eyebrow="Full Criteria" title={grantProfile.grantName} />
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
  );
}

function DetailsPanel({ title, eyebrow, icon: Icon, children }) {
  return (
    <details className="rounded-lg border border-slateLine bg-white p-5 shadow-panel">
      <summary className="cursor-pointer list-none">
        <SectionTitle icon={Icon} eyebrow={eyebrow} title={title} />
      </summary>
      <div className="mt-5">{children}</div>
    </details>
  );
}

function GrantTrackerDatabase({ records, activeTrackerId, hasAnalyzed, onSaveCurrent, onLoad, onRemove }) {
  const sortedRecords = [...records].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  const activeRecord = sortedRecords.find((record) => record.id === activeTrackerId);
  const averageScore = sortedRecords.length
    ? Math.round(sortedRecords.reduce((total, record) => total + Number(record.score || 0), 0) / sortedRecords.length)
    : 0;

  return (
    <section className="panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <SectionTitle icon={Database} eyebrow="Organization Grant Tracker" title="Grant tracker database" />
        <div className="flex flex-wrap gap-3">
          <button className="btn-primary" disabled={!hasAnalyzed} onClick={onSaveCurrent} type="button">
            <Save size={17} />
            Save / Update Tracker
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <MetricTile label="Tracked Grants" value={sortedRecords.length} status="Saved records" tone="blue" />
        <MetricTile label="Average Score" value={`${averageScore}%`} status="Across tracker" tone="blue" />
        <MetricTile label="Move Forward" value={sortedRecords.filter((record) => record.decision === "Move Forward").length} status="Passing records" tone="green" />
        <MetricTile label="Needs Attention" value={sortedRecords.filter((record) => record.decision !== "Move Forward").length} status="Blocked records" tone="red" />
      </div>

      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800">
        This prototype tracker saves grant records in this browser so the organization can reopen and update each grant workspace.
        A shared login database will replace browser storage in the backend version.
      </div>

      {activeRecord ? (
        <div className="mt-4 rounded-lg border border-platformBlue bg-blue-50 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-platformBlue">Open tracker record</div>
              <div className="mt-1 text-lg font-semibold text-ink">{activeRecord.grantName}</div>
              <div className="mt-1 text-sm text-slate-600">
                Current stage: {activeRecord.currentStage} | Last saved: {new Date(activeRecord.updatedAt).toLocaleString()}
              </div>
            </div>
            <Badge tone={activeRecord.statusTone}>{activeRecord.statusLabel}</Badge>
          </div>
        </div>
      ) : null}

      <div className="mt-5 overflow-hidden rounded-lg border border-slateLine">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Grant</th>
              <th className="px-4 py-3">Funder</th>
              <th className="px-4 py-3">Stage</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Organizations</th>
              <th className="px-4 py-3">Decision</th>
              <th className="px-4 py-3">Last Updated</th>
              <th className="px-4 py-3">Links</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slateLine bg-white">
            {sortedRecords.length ? (
              sortedRecords.map((record) => (
                <tr key={record.id} className={record.id === activeTrackerId ? "bg-blue-50" : ""}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-ink">{record.grantName}</div>
                    <div className="mt-1 text-xs text-slate-500">{record.blockers?.length ? record.blockers.join("; ") : "No blockers saved."}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{record.funder}</td>
                  <td className="px-4 py-3">{record.currentStage}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold tabular-nums">{record.score}%</span>
                      <Badge tone={record.statusTone}>{record.statusLabel}</Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3">{record.organizationCount}</td>
                  <td className="px-4 py-3">
                    <Badge tone={record.decision === "Move Forward" ? "green" : "red"}>{record.decision}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{new Date(record.updatedAt).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <a className="btn-secondary min-h-10" href={record.trackerLink} onClick={() => onLoad(record)}>
                        <FolderOpen size={16} />
                        Open / Update
                      </a>
                      <a className="btn-secondary min-h-10" href={record.submittedUrl || record.grantUrl} rel="noreferrer" target="_blank">
                        <ExternalLink size={16} />
                        Source
                      </a>
                      <button className="btn-secondary min-h-10" onClick={() => onRemove(record.id)} type="button">
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-sm text-slate-600" colSpan="8">
                  No grants are saved yet. Analyze a grant, review the organization alignment, then choose Save / Update Tracker.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function GrantMeta({ analysisRun, grantProfile }) {
  return (
    <>
      <div className="mt-5 grid gap-3 rounded-lg border border-slateLine bg-slate-50 p-4 text-sm md:grid-cols-3">
        <Meta label="Grant Name" value={grantProfile.grantName} />
        <Meta label="Funder" value={grantProfile.funder} />
        <Meta label="Source" value={grantProfile.source} />
        <Meta label="Submitted URL" value={grantProfile.submittedUrl} />
        <Meta label="Analysis Run" value={analysisRun?.analyzedAt || "Not run"} />
        <Meta label="Parser Status" value={grantProfile.parserStatus} />
      </div>
      <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
        This client-only prototype does not scrape the live webpage yet. It creates draft grant-specific criteria and initial
        grades from the submitted URL until the backend parser is connected.
      </div>
    </>
  );
}

function GRVFSOverview() {
  return (
    <section className="grid gap-6">
      <div className="panel">
        <SectionTitle icon={Target} eyebrow="GRVFS Vision" title="Grant Readiness Value Flow System" />
        <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">
          A grant readiness operating system for identifying opportunities, extracting requirements, mapping organizational capability,
          finding gaps, enforcing QA/QC gates, and improving proposal quality before drafting.
        </p>
        <div className="mt-5 grid gap-2 md:grid-cols-4">
          {valueStream.map((stage, index) => (
            <div key={stage} className="rounded-lg border border-slateLine bg-white p-3 text-sm">
              <div className="text-xs font-semibold text-slate-500">Step {index + 1}</div>
              <div className="mt-1 font-semibold text-ink">{stage}</div>
            </div>
          ))}
        </div>
      </div>
      <section className="grid gap-6 xl:grid-cols-2">
        <OutcomePanel title="Product Outcomes" groups={productOutcomes} />
        <OutcomePanel title="Business Outcomes" groups={businessOutcomes} />
      </section>
    </section>
  );
}

function IntelligenceEngine({ organizationIntel, alignment, extractorSummary }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <div className="panel">
        <SectionTitle icon={ShieldCheck} eyebrow="Organizational Intelligence Engine" title="Parent and sub-organization profile" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {Object.entries(organizationIntel.parent).map(([label, value]) => (
            <Meta key={label} label={titleCase(label)} value={value} />
          ))}
        </div>
        <div className="mt-5 rounded-lg border border-slateLine bg-slate-50 p-4">
          <h3 className="font-semibold text-ink">{organizationIntel.subOrganizations[0].name}</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {Object.entries(organizationIntel.subOrganizations[0])
              .filter(([label]) => label !== "name")
              .map(([label, value]) => (
                <Meta key={label} label={titleCase(label)} value={value} />
              ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="panel">
          <SectionTitle icon={BarChart3} eyebrow="Grant Alignment Engine" title={`Alignment score: ${alignment.total}%`} />
          <div className="mt-5 grid gap-3">
            {alignment.scores.map((item) => (
              <div key={item.category} className="rounded-lg border border-slateLine bg-white p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink">{item.category}</span>
                  <span className="text-slate-600">Weight {item.weight}% | Score {item.score}%</span>
                </div>
                <Progress score={item.score} />
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <SectionTitle icon={FileSearch} eyebrow="Grant Requirement Extractor" title="Extracted requirement summary" />
          <div className="mt-5 grid gap-2">
            {extractorSummary.map((item) => (
              <div key={item.field} className="flex flex-wrap justify-between gap-3 rounded-lg border border-slateLine bg-white p-3 text-sm">
                <span className="font-semibold text-ink">{item.field}</span>
                <span className="text-slate-600">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OrganizationWebsiteIntake({ grantProfile, organizations, setOrganizations, embedded = false }) {
  const [websiteUrl, setWebsiteUrl] = React.useState("");
  const [role, setRole] = React.useState("Sub-Organization Partner");
  const [selectedOrgId, setSelectedOrgId] = React.useState(organizations[0]?.id || "");
  const selectedOrg = organizations.find((org) => org.id === selectedOrgId) || organizations[0];

  React.useEffect(() => {
    if (!organizations.some((org) => org.id === selectedOrgId)) {
      setSelectedOrgId(organizations[0]?.id || "");
    }
  }, [organizations, selectedOrgId]);

  function addOrganization() {
    const cleanUrl = websiteUrl.trim();
    if (!cleanUrl) return;
    const nextRecord = createOrganizationWebsiteRecord({ url: cleanUrl, role, grantProfile, index: organizations.length });
    setOrganizations((current) => [...current, nextRecord]);
    setSelectedOrgId(nextRecord.id);
    setWebsiteUrl("");
  }

  function rescoreOrganization(orgId) {
    setOrganizations((current) =>
      current.map((org, index) =>
        org.id === orgId ? createOrganizationWebsiteRecord({ url: org.websiteUrl, role: org.role, grantProfile, index }) : org,
      ),
    );
  }

  function updateEvidenceVerification(orgId, key, verificationStatus) {
    setOrganizations((current) =>
      current.map((org) => {
        if (org.id !== orgId) return org;
        const evidence = {
          ...org.evidence,
          [key]: {
            ...org.evidence[key],
            verificationStatus,
          },
        };
        return {
          ...org,
          evidence,
          ...scoreOrganizationEvidence(evidence),
        };
      }),
    );
  }

  const content = (
    <>
      {embedded ? (
        <div className="mt-6 border-t border-slateLine pt-5">
          <SectionTitle icon={Users} eyebrow="Organization Website Intake" title="Grant organization alignment" />
        </div>
      ) : (
        <SectionTitle icon={LinkIcon} eyebrow="Organization Website Intake" title="Grant organization alignment" />
      )}
        <div className="mt-4 rounded-lg border border-slateLine bg-slate-50 p-4">
          <h3 className="font-semibold text-ink">Organization fit summary</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {summarizeOrganizationPool(organizations, grantProfile)}
          </p>
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-800">
            Accuracy safeguard: website research is not proposal-ready until each claim is marked Verified for proposal use by a reviewer.
          </div>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-lg border border-slateLine bg-slate-50 p-4">
            <h3 className="font-semibold text-ink">Main grant input</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <Meta label="Grant Name" value={grantProfile.grantName} />
              <Meta label="Funding Agency" value={grantProfile.funder} />
              <Meta label="Grant URL / PDF" value={grantProfile.submittedUrl} />
              <Meta label="Required Partners" value="Lead applicant plus qualified sub-organization partners" />
              <Meta label="Review Criteria" value="Alignment, capacity, evidence, compliance, and submission readiness" />
              <Meta label="Target Population" value="Derived from grant URL and applicant intake" />
            </div>
          </div>
          <div className="rounded-lg border border-slateLine bg-white p-4">
            <h3 className="font-semibold text-ink">Add organization website</h3>
            <div className="mt-3 grid gap-3">
              <input
                className="min-h-11 rounded-md border border-slateLine px-3 text-sm outline-none focus:border-platformBlue focus:ring-2 focus:ring-blue-100"
                placeholder="https://organization.org"
                value={websiteUrl}
                onChange={(event) => setWebsiteUrl(event.target.value)}
              />
              <select className="rounded-md border border-slateLine bg-white px-3 py-2 text-sm" value={role} onChange={(event) => setRole(event.target.value)}>
                <option>Lead Applicant</option>
                <option>Sub-Organization Partner</option>
                <option>Fiscal Sponsor</option>
                <option>Implementation Partner</option>
                <option>Evaluation Partner</option>
              </select>
              <button className="btn-primary justify-center" onClick={addOrganization} type="button">
                Add Website Intake
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-slateLine">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Org</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Website</th>
                <th className="px-4 py-3">Industry</th>
                <th className="px-4 py-3">Alignment</th>
                <th className="px-4 py-3">Verified</th>
                <th className="px-4 py-3">Missing Items</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slateLine bg-white">
              {organizations.map((org) => (
                <tr key={org.id} className={selectedOrg?.id === org.id ? "bg-blue-50" : ""}>
                  <td className="px-4 py-3">
                    <button className="font-semibold text-platformBlue" onClick={() => setSelectedOrgId(org.id)} type="button">
                      {org.orgName}
                    </button>
                  </td>
                  <td className="px-4 py-3">{org.role}</td>
                  <td className="px-4 py-3 text-slate-600">{org.websiteUrl}</td>
                  <td className="px-4 py-3">{org.industry}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold tabular-nums">{org.alignmentScore}%</div>
                    <div className="text-xs text-slate-500">Risk {org.riskScore}%</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold tabular-nums">{org.verifiedCount || 0}/{organizationAlignmentRubric.length}</div>
                    <div className="text-xs text-slate-500">{org.evidenceUseStatus}</div>
                  </td>
                  <td className="px-4 py-3">{org.missingItems.slice(0, 2).join("; ") || "None"}</td>
                  <td className="px-4 py-3">
                    <Badge tone={org.alignmentScore >= 90 ? "green" : org.alignmentScore >= 80 ? "teal" : org.alignmentScore >= 70 ? "yellow" : "red"}>{org.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrg ? (
          <div className="mt-5 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-lg border border-slateLine bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-ink">{selectedOrg.orgName} summary</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{selectedOrg.whyTheyQualify}</p>
                </div>
                <button className="btn-secondary" onClick={() => rescoreOrganization(selectedOrg.id)} type="button">
                  Re-score
                </button>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <Meta label="Programs" value={selectedOrg.programs} />
                <Meta label="Capabilities" value={selectedOrg.capabilities} />
                <Meta label="Service Area" value={selectedOrg.serviceArea} />
                <Meta label="Target Population" value={selectedOrg.targetPopulation} />
                <Meta label="Past Work" value={selectedOrg.pastWork} />
                <Meta label="Recommended Role" value={selectedOrg.role} />
              </div>
              <div className="mt-4 rounded-lg border border-slateLine bg-slate-50 p-4">
                <div className="text-sm font-semibold text-ink">Grant alignment statement</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedOrg.orgName} is a {selectedOrg.alignmentScore}% preliminary fit for {grantProfile.grantName}. Use this organization in grant writing only after the evidence below is marked Verified for proposal use or supported by uploaded backup documents.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-slateLine bg-white p-4">
              <h3 className="text-lg font-semibold text-ink">Accuracy and evidence verification</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review each claim before it is used in the proposal. Verified items can support grant language; unverified items should trigger backup document requests.
              </p>
              <div className="mt-4 grid gap-3">
                {organizationAlignmentRubric.map(([label, points, key]) => (
                  <div key={key} className="rounded-lg border border-slateLine bg-slate-50 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold text-ink">{label}</div>
                        <div className="mt-1 text-xs text-slate-500">{points} points</div>
                      </div>
                      <Badge tone={selectedOrg.evidence[key].confidence === "Confirmed by website" ? "green" : selectedOrg.evidence[key].confidence === "Missing from website" ? "red" : "yellow"}>
                        {selectedOrg.evidence[key].confidence}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{selectedOrg.evidence[key].note}</p>
                    <div className="mt-3 grid gap-2 md:grid-cols-[1fr_0.8fr] md:items-center">
                      <Meta label="Source" value={selectedOrg.evidence[key].source || selectedOrg.websiteUrl} />
                      <select
                        className="rounded-md border border-slateLine bg-white px-3 py-2 text-sm"
                        value={selectedOrg.evidence[key].verificationStatus || "Needs review"}
                        onChange={(event) => updateEvidenceVerification(selectedOrg.id, key, event.target.value)}
                      >
                        {verificationOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="grid gap-6">
      <div className="panel">{content}</div>
    </section>
  );
}

function OutcomePanel({ title, groups }) {
  return (
    <div className="panel">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-5 grid gap-4">
        {groups.map((group) => (
          <div key={group.title} className="rounded-lg border border-slateLine bg-white p-4">
            <h3 className="font-semibold text-ink">{group.title}</h3>
            <ul className="mt-3 grid gap-2 text-sm text-slate-700">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
      <div className="mt-5 grid gap-3 rounded-lg border border-slateLine bg-slate-50 p-4">
        {applicantIntakeGroups.map((group) => (
          <div key={group.title}>
            <div className="text-sm font-semibold text-ink">{group.title}</div>
            <div className="mt-1 text-xs leading-5 text-slate-600">{group.items.join(" | ")}</div>
          </div>
        ))}
      </div>
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

function OrganizationWorkspace({
  assignments,
  collaboration,
  setAssignments,
  setStatuses,
  submissionPackage,
  setSubmissionPackage,
  reviewApprovals,
  setReviewApprovals,
}) {
  function updateAssignment(requirementId, field, value) {
    setAssignments((current) => ({
      ...current,
      [requirementId]: {
        ...current[requirementId],
        [field]: field === "dueInDays" ? Number(value) : value,
      },
    }));
  }

  function updatePackage(itemId, status) {
    setSubmissionPackage((current) => ({
      ...current,
      [itemId]: {
        ...current[itemId],
        status,
        blocker: status === "Approved" ? "" : `${current[itemId].label} needs owner completion or final approval.`,
      },
    }));
  }

  function updateReview(reviewId, status) {
    setReviewApprovals((current) => ({
      ...current,
      [reviewId]: {
        ...current[reviewId],
        status,
      },
    }));
  }

  function handleDocumentUpload(requirement, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = analyzeUploadedDocument(file, String(reader.result || ""), requirement);
      setAssignments((current) => ({
        ...current,
        [requirement.id]: {
          ...current[requirement.id],
          artifactStatus: result.artifactStatus,
          reviewStatus: result.reviewStatus,
          documentName: result.documentName,
          documentScore: result.documentScore,
          documentSummary: result.documentSummary,
          scannedAt: result.scannedAt,
          evidence: result.documentName,
          comment: result.documentSummary,
        },
      }));
      setStatuses((current) => ({ ...current, [requirement.id]: result.status }));
    };
    reader.readAsText(file);
  }

  return (
    <section className="grid gap-6">
      <div className="panel">
        <SectionTitle icon={Users} eyebrow="7. Organization Workspace" title="Contributor pool and role coverage" />
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="rounded-lg border border-slateLine bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-ink">{member.name}</div>
                  <div className="mt-1 text-sm text-slate-600">{member.role}</div>
                </div>
                <Badge tone="blue">{member.focus.split(",")[0]}</Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{member.focus}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <SectionTitle icon={UserPlus} eyebrow="8. Criteria Assignment Pool" title="Owners, evidence, and reviewer status" />
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800">
          Upload requested documents for each requirement. The prototype scans readable document text and file names in the browser,
          updates the requirement status, and recalculates readiness. Backend OCR/PDF/DOCX parsing will make this deeper later.
        </div>
        <div className="mt-5 overflow-hidden rounded-lg border border-slateLine">
          <table className="w-full min-w-[1160px] text-left text-sm">
            <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Requirement</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Reviewer</th>
                <th className="px-4 py-3">Due</th>
                <th className="px-4 py-3">Artifact</th>
                <th className="px-4 py-3">Upload</th>
                <th className="px-4 py-3">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slateLine bg-white">
              {collaboration.assignmentList.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink">{item.requirement}</div>
                    <div className="mt-1 text-xs text-slate-500">{item.stage} gate</div>
                  </td>
                  <td className="px-4 py-3">
                    <MemberSelect value={item.ownerId} onChange={(value) => updateAssignment(item.id, "ownerId", value)} />
                  </td>
                  <td className="px-4 py-3">
                    <MemberSelect value={item.reviewerId} onChange={(value) => updateAssignment(item.id, "reviewerId", value)} />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      className="w-20 rounded-md border border-slateLine px-2 py-2 text-sm"
                      min="0"
                      type="number"
                      value={item.dueInDays || 0}
                      onChange={(event) => updateAssignment(item.id, "dueInDays", event.target.value)}
                    />
                    <span className="ml-2 text-xs text-slate-500">days</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect
                      value={item.artifactStatus}
                      options={["Not started", "In progress", "Evidence uploaded", "Ready for review"]}
                      onChange={(value) => updateAssignment(item.id, "artifactStatus", value)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-slateLine bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100">
                      Upload document
                      <input className="sr-only" type="file" onChange={(event) => handleDocumentUpload(item, event.target.files?.[0])} />
                    </label>
                    {item.documentName ? (
                      <div className="mt-2 text-xs leading-5 text-slate-600">
                        <div className="font-semibold text-ink">{item.documentName}</div>
                        <div>Scan score: {item.documentScore}%</div>
                        <div>{item.documentSummary}</div>
                      </div>
                    ) : (
                      <div className="mt-2 text-xs text-slate-500">No document uploaded</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect
                      value={item.reviewStatus}
                      options={["Not reviewed", "Needs changes", "Approved"]}
                      onChange={(value) => updateAssignment(item.id, "reviewStatus", value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SubmissionPackage packageItems={collaboration.packageItems} onUpdate={updatePackage} />
        <ReviewApprovals approvalItems={collaboration.approvalItems} onUpdate={updateReview} />
      </section>
    </section>
  );
}

function SubmissionPackage({ packageItems, onUpdate }) {
  return (
    <div className="panel">
      <SectionTitle icon={FileCheck2} eyebrow="9. Submission Package" title="Upload-ready packet checklist" />
      <div className="mt-5 grid gap-3">
        {packageItems.map((item) => (
          <div key={item.id} className="rounded-lg border border-slateLine bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-ink">{item.label}</div>
                <div className="mt-1 text-sm text-slate-600">Owner: {getMemberName(item.ownerId)}</div>
              </div>
              <StatusSelect value={item.status} options={["Missing", "In progress", "Ready for review", "Approved"]} onChange={(value) => onUpdate(item.id, value)} />
            </div>
            {item.blocker ? <p className="mt-3 text-sm text-red-700">{item.blocker}</p> : <p className="mt-3 text-sm text-emerald-700">Approved for packet.</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewApprovals({ approvalItems, onUpdate }) {
  return (
    <div className="panel">
      <SectionTitle icon={Gavel} eyebrow="10. QA/QC Reviews" title="Required approval gates" />
      <div className="mt-5 grid gap-3">
        {approvalItems.map((item) => (
          <div key={item.id} className="rounded-lg border border-slateLine bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-ink">{item.label}</div>
                <div className="mt-1 text-sm text-slate-600">Reviewer: {getMemberName(item.ownerId)}</div>
              </div>
              <StatusSelect value={item.status} options={["Pending", "Needs changes", "Approved"]} onChange={(value) => onUpdate(item.id, value)} />
            </div>
          </div>
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

function SubmissionCommandCenter({ analytics, collaboration, grantProfile }) {
  const finalReady = analytics.decision === "Move Forward" && collaboration.submissionReadiness === 100;
  return (
    <section className="panel">
      <SectionTitle icon={Send} eyebrow="11. Submit Readiness" title="Final go/no-go command center" />
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricTile label="Grant QA/QC" value={`${analytics.overallScore}%`} status={analytics.overallStatus.label} tone={analytics.overallStatus.tone} />
        <MetricTile label="Requirement approvals" value={`${collaboration.requirementApprovalScore}%`} status="Reviewer approved" tone={collaboration.requirementApprovalScore === 100 ? "green" : "yellow"} />
        <MetricTile label="Evidence artifacts" value={`${collaboration.artifactScore}%`} status="Uploaded or review-ready" tone={collaboration.artifactScore === 100 ? "green" : "yellow"} />
        <MetricTile label="Submission packet" value={`${collaboration.packageScore}%`} status="Approved packet items" tone={collaboration.packageScore === 100 ? "green" : "red"} />
        <MetricTile label="Review gates" value={`${collaboration.reviewScore}%`} status="Final approvals" tone={collaboration.reviewScore === 100 ? "green" : "red"} />
      </div>
      <div className="mt-5 rounded-lg border border-slateLine bg-slate-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Direct Submit Decision</div>
            <div className="mt-1 text-2xl font-semibold">{finalReady ? "Ready to submit" : "Do not submit yet"}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {finalReady
                ? `${grantProfile.grantName} has cleared grant scoring, packet, artifact, and approval gates.`
                : `${grantProfile.grantName} still has unresolved blockers before final submission.`}
            </p>
          </div>
          <Badge tone={finalReady ? "green" : "red"}>{finalReady ? "Submission Ready" : "Hold"}</Badge>
        </div>
      </div>
      <InfoList
        title="Remaining Submit Blockers"
        empty="No blockers remain."
        items={collaboration.unresolvedBlockers.slice(0, 8)}
      />
    </section>
  );
}

function Kanban({ analytics, currentStage, grantProfile, collaboration }) {
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
                  <div className="text-sm font-semibold">{grantProfile.grantName}</div>
                  <dl className="mt-3 grid gap-2 text-xs text-slate-600">
                    <CardRow label="Current Stage" value={stage} />
                    <CardRow label="Stage Score" value={`${stageScore.score}%`} />
                    <CardRow label="Risk Level" value={risk} />
                    <CardRow label="Next Action" value={analytics.recommendedFixes[0] ?? "Prepare submission package."} />
                    <CardRow label="Blockers" value={[...blockers, ...collaboration.unresolvedBlockers].slice(0, 2).join("; ") || "None"} />
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

function ScoreCard({ label, score, status, footer, analytics, alignment, collaboration }) {
  return (
    <div className="panel">
      <div className="text-sm font-medium text-slate-600">{label}</div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="text-5xl font-semibold tabular-nums">{score}%</div>
        <Badge tone={status.tone}>{status.label}</Badge>
      </div>
      <Progress score={score} />
      <p className="mt-3 text-sm text-slate-600">{footer}</p>
      <ReadinessCriteriaDropdown analytics={analytics} alignment={alignment} collaboration={collaboration} />
    </div>
  );
}

function ReadinessCriteriaDropdown({ analytics, alignment, collaboration }) {
  const [openStep, setOpenStep] = React.useState("Grant Qualification");
  const stepScores = buildValueFlowStepScores(analytics, alignment, collaboration);

  return (
    <div className="mt-5 rounded-lg border border-slateLine bg-slate-50 p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-ink">Readiness score criteria</div>
          <div className="text-xs leading-5 text-slate-600">Open each step to see what drove the score and what is needed next.</div>
        </div>
        <Badge tone={analytics.decision === "Move Forward" ? "green" : "red"}>{analytics.decision}</Badge>
      </div>
      <div className="mt-3 grid gap-2">
        {valueFlowStepCriteria.map((step) => {
          const stepScore = stepScores[step.step] || { score: 0, status: classifyScore(0), blockers: [] };
          const isOpen = openStep === step.step;
          return (
            <div key={step.step} className="rounded-lg border border-slateLine bg-white">
              <button
                className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
                onClick={() => setOpenStep(isOpen ? "" : step.step)}
                type="button"
              >
                <div>
                  <div className="text-sm font-semibold text-ink">{step.step}</div>
                  <div className="mt-1 text-xs text-slate-500">{step.scoreDrivers.join(" | ")}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-semibold tabular-nums">{stepScore.score}%</span>
                  <Badge tone={stepScore.status.tone}>{stepScore.status.label}</Badge>
                </div>
              </button>
              {isOpen ? (
                <div className="border-t border-slateLine px-3 py-3">
                  <MiniList title="What is needed" items={step.needed} />
                  <MiniList title="Evidence expected" items={step.evidence} />
                  <MiniList title="Current blockers" items={stepScore.blockers.length ? stepScore.blockers.slice(0, 4) : ["No current blockers for this step."]} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function buildValueFlowStepScores(analytics, alignment, collaboration) {
  const stageScore = (stage) => analytics.stageScores.find((item) => item.stage === stage)?.score || 0;
  const missingByStage = (stage) =>
    analytics.requirementScores
      .filter((item) => item.stage === stage && item.status !== "complete")
      .map((item) => item.requirement);

  return {
    "Organization Development": {
      score: Math.round((stageScore("Identified") + alignment.total) / 2),
      status: classifyScore(Math.round((stageScore("Identified") + alignment.total) / 2)),
      blockers: missingByStage("Identified"),
    },
    "Capability Development": {
      score: Math.round((stageScore("Analyzed") + collaboration.artifactScore) / 2),
      status: classifyScore(Math.round((stageScore("Analyzed") + collaboration.artifactScore) / 2)),
      blockers: missingByStage("Analyzed"),
    },
    "Knowledge Repository": {
      score: collaboration.artifactScore,
      status: classifyScore(collaboration.artifactScore),
      blockers: collaboration.assignmentList.filter((item) => item.artifactStatus === "Not started").map((item) => item.requirement),
    },
    "Grant Identification": {
      score: stageScore("Identified"),
      status: classifyScore(stageScore("Identified")),
      blockers: missingByStage("Identified"),
    },
    "Grant Qualification": {
      score: alignment.total,
      status: classifyScore(alignment.total),
      blockers: alignment.scores.filter((item) => item.score < 80).map((item) => `${item.category} alignment below 80%`),
    },
    "Grant Development": {
      score: Math.round((stageScore("Design") + stageScore("Draft")) / 2),
      status: classifyScore(Math.round((stageScore("Design") + stageScore("Draft")) / 2)),
      blockers: [...missingByStage("Design"), ...missingByStage("Draft")],
    },
    Submission: {
      score: collaboration.submissionReadiness,
      status: classifyScore(collaboration.submissionReadiness),
      blockers: collaboration.unresolvedBlockers,
    },
    Reporting: {
      score: Math.round((stageScore("Review") + collaboration.reviewScore) / 2),
      status: classifyScore(Math.round((stageScore("Review") + collaboration.reviewScore) / 2)),
      blockers: collaboration.approvalItems.filter((item) => item.status !== "Approved").map((item) => `${item.label} is ${item.status.toLowerCase()}`),
    },
  };
}

function AwaitingAnalysisCard() {
  return (
    <div className="panel">
      <div className="text-sm font-medium text-slate-600">Overall Readiness Score</div>
      <div className="mt-3 text-4xl font-semibold text-slate-400">--</div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200" />
      <p className="mt-3 text-sm text-slate-600">Paste a grant URL and run analysis to generate a readiness score.</p>
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

function MemberSelect({ value, onChange }) {
  return (
    <select className="rounded-md border border-slateLine bg-white px-3 py-2 text-sm" value={value} onChange={(event) => onChange(event.target.value)}>
      {teamMembers.map((member) => (
        <option key={member.id} value={member.id}>
          {member.name}
        </option>
      ))}
    </select>
  );
}

function StatusSelect({ value, options, onChange }) {
  return (
    <select className="rounded-md border border-slateLine bg-white px-3 py-2 text-sm" value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function MetricTile({ label, value, status, tone }) {
  return (
    <div className="rounded-lg border border-slateLine bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold tabular-nums">{value}</div>
      <div className="mt-3">
        <Badge tone={tone}>{status}</Badge>
      </div>
    </div>
  );
}

function MiniList({ title, items }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</div>
      <ul className="mt-1 grid gap-1 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
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

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

export default App;
