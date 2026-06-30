# Grant Readiness Value Flow System

A React/Vite/Tailwind client-side workspace for grant opportunity intelligence, organizational alignment, readiness scoring, QA/QC gate checks, gap analysis, and Kanban value flow.

## What it does

- Generates draft criteria and readiness scores from a submitted grant URL.
- Saves analyzed grants into an organization grant tracker view in browser storage.
- Provides a clickable tracker link for each saved grant so teams can reopen and update progress.
- Uses a simplified executive layout: decision summary, key criteria results, score breakdown, compact value-flow gates, then deeper review tools.
- Keeps detailed criteria, organization intelligence, document uploads, QA/QC, and Kanban in expandable review sections.
- Shows the GRVFS value stream from organization development through reporting.
- Tracks product outcomes, business outcomes, organizational intelligence, and grant alignment scoring.
- Summarizes extracted grant requirement fields including funding amount, deadline, eligibility, documents, review criteria, and budget restrictions.
- Maps grant alignment across mission, geography, population, industry, past performance, staff expertise, and partners.
- Attaches a readiness-score dropdown that explains each Value Flow step, its scoring criteria, needed actions, evidence expectations, and current blockers.
- Adds Organization Website Intake for lead applicants and sub-organization partners.
- Moves organization alignment near the grant URL intake so partner fit is reviewed early.
- Scores organization websites using mission, programs, industry, target population, geography, past performance, leadership/contact information, impact metrics, and partner role clarity.
- Labels website evidence as confirmed, likely, missing, or needing human verification.
- Adds an accuracy safeguard for organization research so claims must be reviewer-verified before proposal use.
- Lets reviewers mark each organization evidence item as verified, needing backup documents, or unsafe for proposal language.
- Labels organization and partner scores as preliminary until evidence is verified.
- Provides per-requirement document upload and browser-based document review scoring.
- Updates requirement readiness and dashboard scores after uploaded document review.
- Assigns criteria to owners and reviewers.
- Tracks evidence/artifact status for each requirement.
- Tracks required submission package items.
- Tracks technical, budget, compliance, and executive approvals.
- Adds grant-writing criteria for need statement, project narrative, SMART objectives, evaluation plan, budget narrative, funder alignment, and response quality.
- Produces a final submit/hold decision before portal submission.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Current scope

- No backend in version 1.
- URL-specific draft extraction is generated in `src/main.jsx`.
- Grant tracker records are saved in browser local storage until the shared backend database is added.
- The `analyzeGrant` function is the future integration point for a backend grant parser/API.
- The grant tracker storage is the future integration point for a shared organization database with accounts, permissions, and persistent team records.
- Requirement status, applicant readiness inputs, owner assignments, review approvals, and packet status drive the dashboard and final submit decision.

## Netlify settings

```text
Build command: npm run build
Publish directory: dist
```
