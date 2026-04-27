# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the teaching repository for Tim Warner's O'Reilly Live Learning class **"GitHub Copilot Certification (GH-300) Prep"** delivered April 2026 against the **January 2026 GH-300 blueprint**. The repo has been significantly slimmed: prior `demos/`, `copilot/`, `examples/`, `course-materials/`, `new-resources/`, and `exam-metadata/` directories were removed. The remaining content centers on (1) a single Node.js terminal demo app, (2) the course plan, and (3) a Copilot-powered "GH-300 Cert Buddy" agent built from skills, prompts, and instruction files.

## Common Commands

### Root (Jest)

```bash
npm test                # all tests
npm run test:watch      # watch mode
npm run test:coverage   # coverage report (no enforced threshold at root)
```

There is currently one test at `tests/sample.test.js`. Run a single test with:

```bash
npx jest tests/sample.test.js
npx jest -t "<test name pattern>"
```

### Terminal Demo App (`src/`)

`src/` is a self-contained Node.js console app ("GitHub Copilot Tips of the Day") used as live-demo material for debugging, testing, and Copilot prompting. It has its own `package.json` and dependencies (boxen, chalk, inquirer, ora).

```bash
cd src
npm install
npm start               # runs node app.js
npm test                # jest (uses src-local jest)
node test-app.js        # ad-hoc test harness
```

There is no lint script and no build step — this is a plain Node app.

## Architecture

### Layout that matters

- `src/` — interactive console app. `app.js` reads from `tips.json` (the tip database). Treat `tips.json` as data, not config; the app validates and gracefully degrades when it is missing or malformed. This is the only "code" in the repo and is the canonical example surface for live demos.
- `tests/sample.test.js` — root-level Jest sample. Root `package.json` defines only `jest` as a dev dep; the project does **not** enforce the 80% coverage thresholds the old `jest.config.js` used to set (that config file is gone).
- `docs/` — student-facing reference: `GH-300-Study-Guide-April-2026.md`, `QUICK-REFERENCE.md`, `exam-notes-and-links.md`, `github-copilot-cert-exam-objectives.md`, plus the official Microsoft study guide PDF. These are deliverables, not code.
- `references/` — load-bearing inputs for the Cert Buddy agent. Do not treat these as throwaway notes:
  - `gh300-objectives.md` — the January 2026 skills-measured list with weighted ranges (see below).
  - `style-guide.md` — Microsoft Writing Style Guide rules the agent must follow when authoring exam items.
  - `fictional-companies.md` — randomization pool for scenario stems (avoid Contoso defaulting).
- `scripts/` — one-off PowerShell helpers (e.g., `create-tworg-api-key.ps1`).
- `COURSE-PLAN-APRIL-2026.md` — the canonical course outline. The pedagogical sequence is **Start → Use → Think → Govern → Ship** (5 × 50-min segments, 250 min total). This sequence is *intentionally not* in blueprint order — do not reorder it to match domain numbering.

### The Cert Buddy Agent System

This is the architecturally significant piece. Three layers compose a Copilot Chat workspace agent that generates exam-prep material grounded in Microsoft Learn:

1. **Agent definition** — `.github/agents/gh300-cert-buddy-agent.agent.md` declares the agent (`@gh300-cert-buddy-agent` in Copilot Chat), its tools, and routing rules between skills.
2. **Skills** — `.github/skills/<skill>/SKILL.md`, auto-discovered by Copilot:
   - `gh300-item-creator` — exam-realistic multiple-choice items.
   - `gh300-lab-creator` — 10–20 minute hands-on exercises with validation + rollback steps.
   - `gh300-study-planner` — confidence-rated personalized study plans.
3. **Prompt templates** — `.github/prompts/*.prompt.md` expose skills as slash commands: `/gh300-practice-questions`, `/gh300-practice-lab`, `/gh300-study-planner`.

Grounding flows through the **Microsoft Learn MCP server** declared in `.vscode/mcp.json` under the server name `gh300buddy-mslearn` (HTTP transport, `https://learn.microsoft.com/api/mcp`). The agent is required to call `microsoft_docs_search` first, `microsoft_docs_fetch` for full-page detail, and `microsoft_code_sample_search` to verify command/settings syntax. Every generated item must cite Microsoft Learn URLs.

When asked to generate, edit, or critique cert-prep content, follow the rules in `references/style-guide.md` (Microsoft sentence-style capitalization, bold UI labels, Oxford commas, no contractions, no "all/none of the above", 2-sentence rationales) and pull scenario companies from `references/fictional-companies.md` rather than defaulting to Contoso.

### Repository-level Copilot configuration

- `.github/copilot-instructions.md` — repo-wide Copilot Chat instructions. Frames the project as enterprise-focused and references the agent/skills system above.
- `.github/instructions/gh300-teaching-content.instructions.md` — applies to all paths (`applyTo: "**"`); demands learner-clarity, enterprise scenarios, modern Copilot features (Agent Mode, Plan Mode, multi-model), and a "Next Steps" tail (Practice / Deep-dive / Real-world) on teaching outputs.
- `.copilotignore` — files Copilot should not ingest as context.

## Course Domain Weights (GH-300, January 2026)

Weights are **ranges**, not point values — this changed from prior blueprints. Source of truth: `references/gh300-objectives.md`.

| Domain                                     | Weight  |
| ------------------------------------------ | ------- |
| Use GitHub Copilot responsibly             | 15–20%  |
| Use GitHub Copilot features                | 25–30%  |
| Understand Copilot data and architecture   | 10–15%  |
| Apply prompt engineering and context       | 10–15%  |
| Improve developer productivity             | 10–15%  |
| Configure privacy, exclusions, safeguards  | 10–15%  |

Older fixed-percentage tables (7% / 31% / 15% / 9% / 14% / 9% / 15%) are obsolete — do not reintroduce them.

## Markdown conventions

Per the prior Cursor-rules carryover: blank line between every heading and its content, between every list and surrounding content, and between every code block and surrounding content. Authored markdown should pass these rules without hand-fixing.

## What not to do

- Do not recreate the deleted `demos/`, `copilot/`, `examples/`, `course-materials/`, `new-resources/`, or `exam-metadata/` directories — they were removed deliberately for the April 2026 delivery. Content that survived moved to `docs/` or `references/`.
- Do not paraphrase real GH-300 exam questions or reference braindumps when working through the Cert Buddy skills — the agent definition prohibits it.
- Do not assume the root project enforces 80% coverage — `jest.config.js` is gone. If coverage gates are needed for a new demo, add them locally to that demo, not at the root.
