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

This is the official prep course for the **GitHub Copilot Certification Exam (GH-300)**. Updated for **December 2025** with Agent Mode, multi-model selection, and 50+ new features from November 2025.

> **The Big Shift**: Copilot evolved from "AI autocomplete" to an **agentic development platform**. This course teaches you to master the new paradigm.

---

## What's New in December 2025

| Feature | What It Does | Plan Availability |
|---------|--------------|-------------------|
| **Multi-Model Selection** | Choose GPT-5.1, Claude Opus 4.5, Gemini 3 Pro, or Raptor Mini | All |
| **Agent Mode** | Multi-file editing in your IDE | All |
| **Coding Agent** | Assign issues to Copilot, auto-generates PRs | Business/Enterprise |
| **Mission Control** | Dashboard for managing agent sessions | All |
| **Plan Mode** | Preview changes before execution | All |
| **BYOK** | Bring Your Own Key (Azure, AWS, GCP) | Business/Enterprise |
| **Linter Integration** | Code review with ESLint/Pylint/Rubocop | All |
| **Copilot Spaces** | Organize context for conversations | All |

---

## Course Structure

| Segment | Duration | Focus |
|---------|----------|-------|
| **1. Foundations** | 3 hours | Multi-model setup, Agent Mode intro, Responsible AI |
| **2. Core Features** | 3 hours | Prompt engineering, Chat mastery, Agent workflows |
| **3. Enterprise** | 3 hours | Testing, Security, BYOK, Governance |
| **4. Privacy & Config** | 3 hours | Exclusions, Troubleshooting, Integration |
| **5. Exam Prep** | 3 hours | Domain review, Practice exam, Competitive landscape |

See [COURSE-PLAN-DEC-2025.md](COURSE-PLAN-DEC-2025.md) for detailed curriculum.

---

## Exam Domains (GH-300)

| Domain | Weight | Key Topics |
|--------|--------|------------|
| 1. Responsible AI | 7% | Ethics, validation, bias mitigation |
| 2. Plans & Features | **31%** | Multi-model, Agent Mode, Mission Control, BYOK |
| 3. Data Handling | 15% | Pipeline, MCP, context gathering |
| 4. Prompt Engineering | 9% | Model-specific prompting, best practices |
| 5. Developer Use Cases | 14% | Agent workflows, productivity, SDLC |
| 6. Testing | 9% | Agent-driven test generation, edge cases |
| 7. Privacy & Exclusions | 15% | Agent permissions, content exclusions |

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

   Open [QUICK-REFERENCE.md](QUICK-REFERENCE.md) for a printable cheat sheet.

---

## Repository Structure

```text
copilot-cert-prep/
├── demos/                    # Hands-on labs by lesson (02-14)
│   ├── 02/                   # Copilot Individual features
│   ├── 03/                   # Copilot Business features
│   ├── 04/                   # Copilot Enterprise features
│   ├── 05/                   # Copilot Chat mastery
│   └── ...
├── copilot/                  # Best practices and reference docs
│   ├── BEST_PRACTICES.md     # Updated for Agent Mode
│   └── CHAT_EXAMPLES.md      # Chat command examples
├── exam-metadata/            # Certification study materials
│   └── github-copilot-cert-exam-objectives.md
├── new-resources/            # Latest feature updates
│   ├── github_feature_update_dec2025.md   # December 2025 features
│   └── github_feature_update_july2025.md  # July 2025 features
├── .github/
│   ├── copilot-instructions.md  # Repo-level Copilot behavior
│   └── prompts/                 # Reusable prompt templates
├── COURSE-PLAN-DEC-2025.md   # Detailed curriculum
├── QUICK-REFERENCE.md        # Student cheat sheet
└── CLAUDE.md                 # AI assistant config
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

| Feature | Where It Runs | What It Does | Plans |
|---------|---------------|--------------|-------|
| **Agent Mode** | Your IDE (local) | Multi-file edits, terminal access | All |
| **Coding Agent** | GitHub Actions (cloud) | Assign issues, auto-generates PRs | Business/Enterprise |
| **Cloud Agent** | GitHub Cloud (VS only) | Delegate from Visual Studio | Business/Enterprise |

---

## Model Selection Guide

| Model | Best For | Speed |
|-------|----------|-------|
| **Raptor Mini** | Inline completions | Ultra-fast |
| **GPT-5.1** | Complex reasoning | Medium |
| **GPT-5.1-Codex** | Code generation | Medium |
| **Claude Opus 4.5** | Nuanced refactoring | Medium |
| **Gemini 3 Pro** | Multimodal (images + code) | Medium |

---

## Running the Demos

### Node.js/Express Demo (demos/12)

```bash
cd demos/12/node-express-azure
npm install
npm start
npm test
```

### Python FastAPI Demo (demos/11)

```bash
cd demos/11
pip install -r requirements.txt
python app.py
```

### GitHub Stats Dashboard (demos/14)

```bash
cd demos/14
npm install
npm run dev
```

---

## Instructor

**Tim Warner**

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

*Last updated: December 2025*
