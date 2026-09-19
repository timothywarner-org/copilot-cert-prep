# GitHub Copilot Certification Prep Repository

Teaching repository for Tim Warner's O'Reilly Live Learning "GitHub Copilot Certification (GH-300) Prep" - June 23, 2026, 9:00 AM-2:00 PM CT. January 2026 GH-300 blueprint is the authoritative exam reference.

## Sub-projects (three independent Node.js apps)

| Path | Purpose |
|---|---|
| `/` | Jest tests for course materials |
| `src/` | Interactive console demo app for live class |
| `copilot-metrics-tour/` | Console tour of GitHub Copilot Metrics API |

Each has its own `package.json`. Install and run separately. `references/` holds agent source-of-truth inputs; `COURSE-PLAN-JUNE-2026.md` and `README.md` must stay in sync on segment names and clock times.

## Commands

```bash
# Root
npm test                         # all tests
npx jest tests/sample.test.js   # single file
npx jest -t "pattern"           # by name
npm run test:watch

# src/ (install first: cd src && npm install)
npm start        # node app.js - needs readline terminal; use .vscode/launch.json
node test-app.js # ad-hoc harness

# copilot-metrics-tour/ (zero deps)
node index.js --demo            # offline synthetic data
node index.js timothywarner-org # live (GITHUB_TOKEN / GH_TOKEN / GITHUB_PERSONAL_ACCESS_TOKEN)
npm run tour:roi
```

No coverage threshold at root - `jest.config.js` was intentionally removed. `.vscode/launch.json` is intentionally committed for learners.

## Cert Buddy Agent System

Layered Copilot Chat workspace agent grounding exam-prep content in Microsoft Learn:

- **Agent** - `.github/agents/gh300-cert-buddy-agent.agent.md` - invoke as `@gh300-cert-buddy-agent`
- **Skills** (auto-discovered from `.github/skills/<skill>/SKILL.md`):
  - `gh300-item-creator` - exam-realistic multiple-choice questions
  - `gh300-lab-creator` - 10-20 min hands-on exercises with validation and rollback
  - `gh300-study-planner` - confidence-rated personalized study plans
- **Prompt templates** (`/gh300-practice-questions`, `/gh300-rai-questions`, `/gh300-practice-lab`, `/gh300-study-planner`)
- **MCP** - `.vscode/mcp.json` server `gh300buddy-mslearn` (HTTP, `https://learn.microsoft.com/api/mcp`). Agent must call `microsoft_docs_search` first and cite Microsoft Learn URLs in every output.

## Key Conventions

**Cert-buddy content** - Follow `references/style-guide.md` (sentence-style caps, bold UI labels, Oxford commas, no contractions, no "all/none of the above", 2-sentence rationales). Pull companies from `references/fictional-companies.md` - not Contoso. No braindump paraphrasing.

**Domain weights** - Use ranges from `references/gh300-objectives.md`, not fixed percentages:

| Domain | Weight |
|---|---|
| Use GitHub Copilot features | 25-30% |
| Use GitHub Copilot responsibly | 15-20% |
| Understand Copilot data and architecture | 10-15% |
| Apply prompt engineering and context | 10-15% |
| Improve developer productivity | 10-15% |
| Configure privacy, exclusions, safeguards | 10-15% |

**Critical exam distinction** - Agent Mode (IDE-based, local, multi-file) vs. Coding Agent (GitHub Actions, assigns issues, creates PRs) vs. Cloud Agent (Visual Studio preview).

**Chat slash commands for demos** - `/plan` (preview changes), `/agent` (multi-file tasks), `/review` (code review with linter).

**Enterprise governance topics** - BYOK, budget tracking and per-team limits, Private MCP Registry, organization-wide custom instructions.

**Enterprise scenario contexts** - Use inventory management APIs, employee directory tools, automated reporting pipelines, CI/CD automation, and Azure/AWS deployment patterns when generating examples.

**Markdown style** - No em dashes. Blank line between every heading, list, and code block and surrounding content.

**Course segment order** - Foundations -> Core Features -> Enterprise -> Privacy & Config -> Exam Prep. Intentionally not in blueprint domain order; do not reorder.

**Deleted directories** - Do not recreate `demos/`, `copilot/`, `examples/`, `course-materials/`, `new-resources/`, `exam-metadata/`.

## Teaching Output Format

End learner-facing responses with:
1. Practice task
2. Deep-dive topic
3. Real-world application
