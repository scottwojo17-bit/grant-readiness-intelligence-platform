# Grant Readiness Value Flow System

A React/Vite/Tailwind MVP prototype for grant opportunity intelligence, organizational alignment, readiness scoring, QA/QC gate checks, gap analysis, and Kanban value flow.

## What it does

- Generates draft criteria and readiness scores from a submitted grant URL.
- Shows the GRVFS value stream from organization development through reporting.
- Tracks product outcomes, business outcomes, organizational intelligence, and grant alignment scoring.
- Summarizes extracted grant requirement fields including funding amount, deadline, eligibility, documents, review criteria, and budget restrictions.
- Maps grant alignment across mission, geography, population, industry, past performance, staff expertise, and partners.
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

## Prototype scope

- No backend in version 1.
- URL-specific draft extraction is generated in `src/main.jsx`.
- The `analyzeGrant` function is the future integration point for a backend grant parser/API.
- Requirement status, applicant readiness inputs, owner assignments, review approvals, and packet status drive the dashboard and final submit decision.

## Netlify settings

```text
Build command: npm run build
Publish directory: dist
```
