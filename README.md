# GitHub Copilot Certification Exam Preparation (GH-300)

[![Website](https://img.shields.io/badge/Website-TechTrainerTim-blue)](https://techtrainertim.com)
[![GitHub](https://img.shields.io/badge/GitHub-timothywarner-blue?logo=github)](https://github.com/timothywarner)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-timothywarner-blue?logo=linkedin)](https://linkedin.com/in/timothywarner)
[![GitHub Org](https://img.shields.io/badge/Org-timothywarner--org-blue?logo=github)](https://github.com/timothywarner-org)
[![Short Link](https://img.shields.io/badge/Go%20Link-go.techtrainertim.com%2Fcopilotcert-blue)](https://go.techtrainertim.com/copilotcert)

![GitHub Copilot Certification](/images/copilot-cover-image.png)

**Short link**: [go.techtrainertim.com/copilotcert](https://go.techtrainertim.com/copilotcert)

---

## Welcome

This is the official prep course for the **GitHub Copilot Certification Exam (GH-300)**. Updated for **January 2026** with Agent Mode, multi-model selection, and 50+ new features from November 2025.

> **The Big Shift**: Copilot evolved from "AI autocomplete" to an **agentic development platform**. This course teaches you to master the new paradigm.

---

## What's New in January 2026

| Feature                   | What It Does                                                  | Plan Availability   |
| ------------------------- | ------------------------------------------------------------- | ------------------- |
| **Multi-Model Selection** | Choose GPT-5.1, Claude Opus 4.5, Gemini 3 Pro, or Raptor Mini | All                 |
| **Agent Mode**            | Multi-file editing in your IDE                                | All                 |
| **Coding Agent**          | Assign issues to Copilot, auto-generates PRs                  | Business/Enterprise |
| **Mission Control**       | Dashboard for managing agent sessions                         | All                 |
| **Plan Mode**             | Preview changes before execution                              | All                 |
| **BYOK**                  | Bring Your Own Key (Azure, AWS, GCP)                          | Business/Enterprise |
| **Linter Integration**    | Code review with ESLint/Pylint/Rubocop                        | All                 |
| **Copilot Spaces**        | Organize context for conversations                            | All                 |

---

## Course Structure

| Segment                 | Duration   | Focus                                               |
| ----------------------- | ---------- | --------------------------------------------------- |
| **1. Foundations**      | 50 minutes | Multi-model setup, Agent Mode intro, Responsible AI |
| **2. Core Features**    | 50 minutes | Prompt engineering, Chat mastery, Agent workflows   |
| **3. Enterprise**       | 60 minutes | Testing, Security, BYOK, Governance                 |
| **4. Privacy & Config** | 50 minutes | Exclusions, Troubleshooting, Integration            |
| **5. Exam Prep**        | 50 minutes | Domain review, Practice exam, Competitive landscape |

See [COURSE-PLAN-JUNE-2026.md](COURSE-PLAN-JUNE-2026.md) for detailed curriculum.

---

## Exam Domains (GH-300)

| Domain                                       | Weight | Key Topics                                              |
| -------------------------------------------- | ------ | ------------------------------------------------------- |
| 1. Use GitHub Copilot responsibly            | 15–20% | Ethics, validation, bias mitigation, transparency       |
| 2. Use GitHub Copilot features               | 25–30% | Multi-model, Agent Mode, Mission Control, BYOK          |
| 3. Understand Copilot data and architecture  | 10–15% | Pipeline, MCP, context gathering, data handling         |
| 4. Apply prompt engineering and context      | 10–15% | Model-specific prompting, context files, best practices |
| 5. Improve developer productivity            | 10–15% | Agent workflows, productivity, SDLC integration         |
| 6. Configure privacy, exclusions, safeguards | 10–15% | Agent permissions, content exclusions, org policies     |

---

## Quick Start

1. **Clone this repo**

   ```bash
   git clone https://github.com/timothywarner-org/copilot-cert-prep.git
   cd copilot-cert-prep
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run tests**

   ```bash
   npm test
   ```

4. **Review the quick reference**

   Open [QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md) for a printable cheat sheet.

---

## Using the GH-300 Cert Buddy

This repository includes a **purpose-built AI study partner** that generates exam-realistic practice questions, hands-on exercises, and personalized study plans — all grounded in official Microsoft Learn content.

> **Why does this exist?** The best way to prepare for a certification exam is active recall and spaced practice. The Cert Buddy automates this: you ask, it generates fresh, exam-style material on demand.

### The Workspace Agent

The agent definition lives at [`.github/agents/gh300-cert-buddy-agent.agent.md`](.github/agents/gh300-cert-buddy-agent.agent.md). It orchestrates three specialized skills:

| Skill                   | What It Does                                              | Prompt Template             |
| ----------------------- | --------------------------------------------------------- | --------------------------- |
| **gh300-item-creator**  | Generates exam-realistic multiple-choice questions        | `/gh300-practice-questions` |
| **gh300-lab-creator**   | Creates 10–20 minute hands-on exercises with validation   | `/gh300-practice-lab`       |
| **gh300-study-planner** | Builds a personalized study plan based on your confidence | `/gh300-study-planner`      |

Skill definitions: [`.github/skills/`](.github/skills/)

### How to Use It

**In VS Code Copilot Chat**, invoke the agent directly:

```text
@gh300-cert-buddy-agent Quiz me on Agent Mode
@gh300-cert-buddy-agent Create a lab on content exclusions
@gh300-cert-buddy-agent Plan my study schedule — I'm weak on privacy
```

**Or use the prompt templates** (slash commands):

```text
/gh300-practice-questions
/gh300-practice-lab
/gh300-study-planner
```

Prompt templates: [`.github/prompts/`](.github/prompts/)

### MCP Server Configuration

The agent uses a Microsoft Learn MCP server for grounding answers in official documentation. Configuration is in [`.vscode/mcp.json`](.vscode/mcp.json).

---

## Repository Structure

```text
copilot-cert-prep/
├── .github/
│   ├── agents/
│   │   └── gh300-cert-buddy-agent.agent.md  # GH-300 AI study partner
│   ├── hooks/
│   │   └── gh300-guardrails.json            # Workspace hook definitions
│   ├── instructions/
│   │   └── gh300-teaching-content.instructions.md
│   ├── prompts/
│   │   ├── gh300-practice-questions.prompt.md
│   │   ├── gh300-practice-lab.prompt.md
│   │   └── gh300-study-planner.prompt.md
│   ├── skills/
│   │   ├── gh300-item-creator/   # Practice question generator
│   │   │   ├── SKILL.md
│   │   │   ├── resources/        # Bundled reference assets
│   │   │   └── scripts/          # validate-output.js
│   │   ├── gh300-lab-creator/    # Hands-on exercise builder
│   │   │   ├── SKILL.md
│   │   │   ├── resources/
│   │   │   └── scripts/
│   │   └── gh300-study-planner/  # Personalized study plans
│   │       ├── SKILL.md
│   │       ├── resources/
│   │       └── scripts/
│   └── copilot-instructions.md
├── .vscode/
│   └── mcp.json                  # Microsoft Learn MCP server config
├── az104-cert-buddy/             # Reference implementation
├── docs/
│   ├── GH-300-Study-Guide-June-2026.md
│   ├── QUICK-REFERENCE.md        # Student cheat sheet
│   ├── exam-notes-and-links.md
│   └── github-copilot-cert-exam-objectives.md
├── references/
│   ├── gh300-objectives.md       # Jan 2026 exam blueprint
│   ├── fictional-companies.md    # Scenario company pool
│   └── style-guide.md            # Microsoft Writing Style Guide rules
├── scripts/
│   └── hooks/
│       ├── prevent-destructive-commands.js
│       └── validate-gh300-content.js
├── src/
│   └── app.js                    # Interactive console demo app
├── tests/
│   └── sample.test.js
├── CLAUDE.md
├── COURSE-PLAN-JUNE-2026.md
├── package.json
└── README.md
```

---

## Key Resources

### Official Documentation

- [GitHub Copilot What's New](https://github.com/features/copilot/whats-new)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Agent Mode Guide](https://docs.github.com/en/copilot/using-github-copilot/using-agent-mode)
- [MCP Integration](https://docs.github.com/en/copilot/mcp)

### Certification Resources

- [GH-300 Certification Overview](https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/)
- [GH-300 Study Guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300)
- [Copilot Fundamentals Learning Path](https://learn.microsoft.com/en-us/training/paths/copilot-fundamentals/)

### Community

- [November 2025 Copilot Roundup](https://github.com/orgs/community/discussions/180828)
- [December Enterprise Roundup](https://resources.github.com/enterprise-content-roundup/december/)

---

## The Agent Mode Distinction (Exam Critical)

This is the most commonly misunderstood topic:

| Feature          | Where It Runs          | What It Does                      | Plans               |
| ---------------- | ---------------------- | --------------------------------- | ------------------- |
| **Agent Mode**   | Your IDE (local)       | Multi-file edits, terminal access | All                 |
| **Coding Agent** | GitHub Actions (cloud) | Assign issues, auto-generates PRs | Business/Enterprise |
| **Cloud Agent**  | GitHub Cloud (VS only) | Delegate from Visual Studio       | Business/Enterprise |

---

## Model Selection Guide

| Model               | Best For                   | Speed      |
| ------------------- | -------------------------- | ---------- |
| **Raptor Mini**     | Inline completions         | Ultra-fast |
| **GPT-5.1**         | Complex reasoning          | Medium     |
| **GPT-5.1-Codex**   | Code generation            | Medium     |
| **Claude Opus 4.5** | Nuanced refactoring        | Medium     |
| **Gemini 3 Pro**    | Multimodal (images + code) | Medium     |

---

## Running the Live Demo App

### GitHub Copilot Tips Console App (src/)

This interactive Node.js app is the primary live-demo surface for the course.

```bash
cd src
npm install
npm start
```

```bash
# Run unit tests
npm test

# Ad-hoc test harness
node test-app.js
```

---

## Instructor

Tim Warner

- Website: [techtrainertim.com](https://techtrainertim.com)
- GitHub: [@timothywarner](https://github.com/timothywarner)
- LinkedIn: [linkedin.com/in/timothywarner](https://linkedin.com/in/timothywarner)
- Email: [tim@techtrainertim.com](mailto:tim@techtrainertim.com)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Automated Dependency Updates

- **Node.js**: Weekly updates for root `package.json`
- **Python**: Weekly updates for `/demos/11/requirements.txt`
- Auto-labeled PRs: `dependencies`, `auto-merge`
- See `.github/dependabot.yml` for configuration

---
