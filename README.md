# Pass Your GitHub Copilot Certification Exam

**Instructor: Tim Warner** | **GH-300** | **Four-hour O'Reilly Live Learning course**

Welcome! This is the public learner repository for the September 24, 2026 class and for independent study afterward. Our route is simple: validate AI output, choose the right Copilot surface, improve the context, and apply the right safeguards.

**Exam baseline:** [skills measured August 7, 2026](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300). Product behavior and links reviewed September 20, 2026. The August update is a minor refinement of the six-domain blueprint, not a new exam.

## Start here

1. Read the [course plan](COURSE-PLAN.md) and [quick reference](docs/QUICK-REFERENCE.md).
2. Work through the [class activities](docs/CLASS-ACTIVITIES.md). Each has an observable outcome and a no-account route.
3. Use [Cert Buddy](#study-with-cert-buddy) for original practice, then finish the [mini mock](docs/MINI-MOCK.md).
4. Follow the [study guide](docs/GH-300-STUDY-GUIDE.md) and [official exam links](docs/exam-notes-and-links.md) for your remaining study.

| Resource | Purpose |
|---|---|
| [Current course plan](COURSE-PLAN.md) | Four teaching blocks, demo entry points, timings, and rehearsal gates |
| [Class activities](docs/CLASS-ACTIVITIES.md) | Responsible AI, Chat/CLI, context, testing, and policy practice |
| [GH-300 objectives](references/gh300-objectives.md) | Six domains and the current skills measured |
| [Study guide](docs/GH-300-STUDY-GUIDE.md) | What to understand and what evidence to produce |
| [Hooks and governance lab](docs/HOOKS-AND-GOVERNANCE.md) | A tool-use logger, approval boundaries, and enterprise policy walkthrough |
| [Metrics tour](copilot-metrics-tour/README.md) | Current report format; synthetic demo needs no credentials |
| [Tips app](src/GH-Copilot-Tips-App-README.md) | Small Node.js application to inspect, test, and improve |
| [September teaching deck](warner-github-cert-prep-september-2026.pptx) | Updated class slides and presenter notes |
| [Refresh notes](docs/SEPTEMBER-2026-REFRESH.md) | Changes, sources, and what still needs live rehearsal |

## Class setup

**Recommended:** current VS Code with GitHub Copilot access, Git, and Node.js 22 or later. Windows examples use PowerShell 7. Copilot availability depends on your account and organization policy. An enterprise license is not required for the core activities.

Before trusting a downloaded workspace, inspect its instructions, MCP configuration, and executable hooks. This repository includes teaching hooks in `.github/hooks/`; their scripts are readable in `scripts/hooks/`.

```powershell
# Use your own copy so classroom edits remain separate from the published materials.
git clone https://github.com/timothywarner-org/copilot-cert-prep.git
Set-Location copilot-cert-prep
code .
```

The tips app and synthetic metrics demo use Node.js built-ins and need no package installation:

```powershell
node src/app.js
node copilot-metrics-tour/index.js --demo
```

For the repository's automated checks:

```powershell
npm ci
npm test -- --runInBand
npm run check:content
```

Optional Copilot CLI setup, from the [official installation guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli):

```powershell
# Node.js 22+ is required by this installation method.
npm install -g @github/copilot
copilot
# Inside Copilot CLI, enter /login if authentication is required.
```

If you cannot install software or use Copilot, read the supplied scenarios, write your decisions, and compare with the debriefs. You can meet the learning outcomes without changing a tenant.

## Study with Cert Buddy

Open Copilot Chat and select **gh300-cert-buddy-agent** from the agent picker. Its definition is in [the agent file](.github/agents/gh300-cert-buddy-agent.agent.md); its three skills cover questions, labs, and study plans.

The Microsoft Learn MCP server is preconfigured in `.vscode/mcp.json` as **gh300buddy-mslearn**. It uses the public Learn endpoint without an API key. Start/authorize it through VS Code's MCP controls after inspecting the configuration. The separate GitHub MCP entry is optional and requires your own authentication; Cert Buddy does not need it for Learn retrieval.

Try:

> Give me one original GH-300 question about content exclusions. Cite current primary documentation after I answer.

> Build a 10-minute Copilot CLI exercise with an explicit success check and cleanup.

> Help me plan tonight's study. I am weak on data flow and confident with inline suggestions.

Cert Buddy must show the question first, wait for your answer, and then explain **all four choices** with sources. Its validator checks structure and flags length giveaways; it cannot prove factual accuracy. If retrieval is unavailable, the agent must disclose that limitation.

## What to prioritize

| GH-300 domain | Weight |
|---|---:|
| Use GitHub Copilot responsibly | 15-20% |
| Use GitHub Copilot features | 25-30% |
| Understand GitHub Copilot data and architecture | 10-15% |
| Apply prompt engineering and context crafting | 10-15% |
| Improve developer productivity with GitHub Copilot | 10-15% |
| Configure privacy, content exclusions, and safeguards | 10-15% |

**Study decisions, not a model roster.** Model availability, billing, previews, and UI details change faster than the exam objectives. Hooks and server-managed settings are useful governance enrichment; the blueprint does not name them as separate objectives.

The June deck, June-named compatibility pages, and older PDF remain for historical continuity. Use the linked current Markdown sources and September deck for this class. This repository contains original teaching material, not real exam questions or a guarantee of passing.
