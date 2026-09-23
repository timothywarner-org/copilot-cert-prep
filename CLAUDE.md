# Repository guidance

This public teaching repository supports Tim Warner's **Pass Your GitHub Copilot Certification Exam** O'Reilly Live Learning class. Current delivery: **Thursday, September 24, 2026, 9 a.m.-1 p.m. Central / 7-11 a.m. Pacific**. Content baseline reviewed **September 20, 2026**. Follow [the canonical course plan](COURSE-PLAN.md) and [shared repository instructions](.github/copilot-instructions.md).

## Authority

- Exam scope: [August 7, 2026 objectives](references/gh300-objectives.md), checked against the [official GH-300 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300).
- Product behavior: current GitHub Docs; client behavior: current VS Code documentation.
- Learner route: [README](README.md), [activities](docs/CLASS-ACTIVITIES.md), [study guide](docs/GH-300-STUDY-GUIDE.md).
- Delivery: [published O'Reilly course](https://www.oreilly.com/live-events/pass-your-github-copilot-certification-exam/0642572414696/0642572414689/), [course plan](COURSE-PLAN.md), and [September deck](warner-github-cert-prep-september-2026.pptx).
- Question style: [style guide](references/style-guide.md) and [fictional companies](references/fictional-companies.md).

Microsoft writing guidance governs item style; **O'Reilly is the training identity**. Keep learner-facing branding, title slides, masters, footers, and speaker notes consistent with that identity. Superseded decks and exam PDFs belong in Git history, not the current learning route. [COURSE-PLAN.md](COURSE-PLAN.md) is the **only** course plan; do not add a dated or alternate one. The remaining June-named Markdown file is a compatibility redirect, not an alternate source of truth.

## Four-segment delivery

| Segment | Central time | Instructional purpose |
|---|---|---|
| **1. Foundations and responsible operation** | 9-10 a.m. | Validate generated output and establish human accountability |
| **2. Core features: IDE, Chat, CLI** | 10-11 a.m. | Choose a surface, inspect evidence, and reuse a prompt |
| **3. Data, agents, MCP, and context** | 11 a.m.-noon | Explain data flow and improve the context for a bounded task |
| **4. Privacy, governance, productivity, and exam practice** | Noon-1 p.m. | Apply safeguards, test changes, interpret metrics, and plan study |

Include five-minute breaks in Segments 1-3. Segment 4 includes the mini mock and the final five-minute wrap-up. Keep the six-domain exam coverage and learning evidence intact when tightening a demo. Hooks and enterprise managed settings are enrichment, not newly invented exam objectives.

## Currency and cross-references

- Verify volatile product claims against primary sources before changing teaching content. Record the review date and link the supporting page. Do not infer the current UI from an old screenshot or conversation.
- Keep exam scope separate from product availability. Do not hard-code model rosters, prices, preview status, or policy support without current evidence.
- Distinguish content-exclusion support by surface, instructions from enforced controls, and repository hooks from enterprise governance.
- Update links and heading anchors when moving a file or renaming a section. Check README, the course plan, the deck's speaker notes, agent/skill instructions, and compatibility redirects together.
- Use the approved **O'Reilly PowerPoint template** and its native masters/layouts for the current deck. Preserve editable text, useful source content, and speaker notes. Render and visually inspect the exported deck; a valid PPTX package alone does not prove slide quality.

## Architecture

The interactive Node.js tips application is in `src/`. The zero-dependency report demonstration is in `copilot-metrics-tour/`. Executable teaching hooks are in `scripts/hooks/` and declared in `.github/hooks/`. Root Jest tests cover validation, hook decisions, metrics behavior, and the tips application's pure helpers. Use **Node.js 22+** and **PowerShell 7** for documented classroom commands.

All sample code is zero-dependency and uses `node:`-prefixed built-ins, `"use strict"`, a JSDoc header naming its usage, and comments that justify a decision rather than restate the code. `fizzBuzz.js` and `src/app.js` are the reference examples. Keep the tips application in one file: class activity 2 asks learners to attach `src/app.js` and `src/tips.json` to Chat, and splitting it breaks that comparison.

Cert Buddy consists of the agent definition, three skills, prompt files, and the configured Microsoft Learn MCP server. Select it from the agent picker. Preserve question-first delivery and the distinction between automated structure checks and factual review.

## Verification

```powershell
# Install only the root test dependencies.
npm ci
npm test -- --runInBand
npm run check:content
node src/test-app.js
node copilot-metrics-tour/index.js --demo
```

No root build or enforced coverage threshold is required. The application can run directly with `node src/app.js`. Keep `.vscode/launch.json` committed for learners. Give each core activity a no-account route, an observable success check, and cleanup instructions.

Use small changes, error handling, why comments, public-safe fictional data, and explicit validation boundaries. Do not expose private presenter links, correspondence, real usage reports, or credentials. Record completed checks accurately in [refresh notes](docs/SEPTEMBER-2026-REFRESH.md). Do not infer live Copilot integration, enterprise enforcement, Presenter View behavior, or timed delivery from local tests. Follow the [instructor rehearsal gates](COURSE-PLAN.md#instructor-rehearsal-gates) before class.
