# Grant Readiness Intelligence Platform

A React/Vite/Tailwind MVP prototype for grant readiness scoring, QA/QC gate checks, gap analysis, and Kanban value flow.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Prototype scope

- No backend in version 1.
- The NSF TechAccess AI-Ready America extraction is mocked in `src/main.jsx`.
- The `analyzeGrant` function is the future integration point for a backend grant parser/API.
- Requirement status and applicant readiness inputs drive the score dashboard and fix list.
