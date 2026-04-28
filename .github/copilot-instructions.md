# GitHub Copilot Certification Prep Repository

> **Updated January 2026**: Includes guidance for Agent Mode, multi-model selection, and 50+ new features from November 2025.

## 🎯 Project Overview

This is a **teaching repository** for O'Reilly Live Learning GitHub Copilot certification (GH-300) preparation. The codebase demonstrates enterprise-ready patterns across Node.js, Python, and testing frameworks while showcasing Copilot's capabilities.

## 🏗️ Architecture & Structure

### Repository Architecture

- **Root project** (`/`): Main course materials with Jest testing framework
- **Live demo app** (`/src/`): Interactive Node.js console app used for in-class demos
- **Cert Buddy agent** (`/.github/agents/`, `/.github/skills/`, `/.github/prompts/`): GH-300 exam prep agent system
- **Reference material** (`/references/`, `/docs/`): Exam objectives, style guide, study materials

### Key Technology Stacks

```bash
# Root: Jest testing (no enforced coverage threshold at root)
npm test              # Run all tests
npm run test:watch    # Watch mode for active development

# Live demo app (src/)
cd src && npm install
npm start             # Interactive console app
node test-app.js      # Ad-hoc test harness
```

## 🔧 Development Patterns

### Testing Standards

- **Jest** at root level; no enforced coverage threshold (jest.config.js was removed in the April 2026 repo slim-down)
- **Test patterns**: `**/test/**/*.js` and `**/?(*.)+(spec|test).js`
- Generate tests focusing on enterprise scenarios: error handling, edge cases, performance

### Copilot Integration Patterns

```typescript
// Use teaching-focused comments for better suggestions
// @copilot context: This is for GitHub Copilot certification training
// Stack: Node.js + Express + Jest, Python + FastAPI
// Focus: Enterprise patterns, security, testing
```

### Dependency Management

- **Dependabot** configured for weekly updates (Node.js direct deps, Python all deps)
- **Jest pinned** to v29+ for stability
- Multi-project structure requires careful dependency isolation

## 📚 Course-Specific Context

### 5-Segment Course Flow

1. **Foundations** (Responsible AI, IDE setup, plans comparison)
2. **Core Features** (Prompt engineering, Chat, CLI integration)
3. **Enterprise** (Testing, Knowledge Bases, security, custom models)
4. **Privacy & Config** (Exclusions, troubleshooting, org policies)
5. **Exam Prep** (Practice questions, emerging features)

### Certification Exam Domains (GH-300, January 2026)

| Domain                                    | Weight |
| ----------------------------------------- | ------ |
| Use GitHub Copilot responsibly            | 15–20% |
| Use GitHub Copilot features               | 25–30% |
| Understand Copilot data and architecture  | 10–15% |
| Apply prompt engineering and context      | 10–15% |
| Improve developer productivity            | 10–15% |
| Configure privacy, exclusions, safeguards | 10–15% |

## 🚀 Enterprise Focus Areas

### Real-World Business Scenarios

When generating examples, use enterprise contexts:

- **Inventory management APIs** with error handling
- **Employee directory tools** with security considerations
- **Automated reporting pipelines** with data validation
- **CI/CD automation** with GitHub Actions integration
- **Azure/AWS deployment** patterns

### Code Quality Standards

- **Conventional Commits** for all examples
- **Branch naming**: `feature/`, `bugfix/`, `hotfix/`
- **Business-context comments** explaining _why_, not just _what_
- **Security-first** prompting and validation

## 🔐 Configuration Files

### Key Files to Reference

- `.github/agents/gh300-cert-buddy-agent.agent.md` - GH-300 exam prep agent
- `.github/skills/` - Three skill definitions (item-creator, lab-creator, study-planner)
- `.github/prompts/` - Slash-command prompt templates
- `.github/hooks/gh300-guardrails.json` - Workspace hook definitions
- `.vscode/mcp.json` - Microsoft Learn MCP server configuration
- `references/gh300-objectives.md` - Jan 2026 exam blueprint
- `COURSE-PLAN-APRIL-2026.md` - Complete curriculum structure

### Custom Instructions Pattern

```markdown
# When working in this repo:

# 1. Use enterprise security patterns

# 2. Generate teaching-appropriate examples

# 3. Focus on GH-300 certification exam domains (Jan 2026 blueprint)

# 4. Always include "Next Steps" for learners

# 5. Ground all exam content in Microsoft Learn documentation
```

## 🆕 January 2026 Feature Highlights

### Multi-Model Selection

Students should understand when to use each model:

- **Raptor Mini**: Fast inline completions
- **GPT-5.1-Codex**: Code-focused tasks
- **Claude Opus 4.5**: Nuanced refactoring
- **Gemini 3 Pro**: Multimodal (images + code)

### Agent Mode vs Coding Agent

This distinction is critical for the exam:

- **Agent Mode**: IDE-based, multi-file edits, runs locally
- **Coding Agent**: GitHub Actions, assign issues, creates PRs automatically
- **Cloud Agent**: Visual Studio preview, delegates to GitHub cloud

### New Slash Commands

When demonstrating Chat, include:

- `/plan` - Preview changes before execution
- `/agent` - Multi-file task execution
- `/review` - Code review with linter integration

### Enterprise Governance

For Business/Enterprise demos:

- BYOK (Bring Your Own Key)
- Budget tracking and per-team limits
- Private MCP Registry
- Organization-wide custom instructions

## 💡 Copilot Best Practices for This Repo

- **Teaching context**: Always explain code for learners preparing for certification
- **Enterprise patterns**: Emphasize security, testing, and scalability
- **Multi-stack support**: Handle Node.js, Python, Bash, and GitHub CLI seamlessly
- **Exam preparation**: Reference specific GH-300 domains and weightings
- **Practical application**: Focus on hands-on, job-ready skills over theory
- **Model awareness**: Demonstrate when to switch models for different tasks
- **Agent Mode familiarity**: Show Plan Mode for reviewing changes before execution

## 📋 Next Steps Template

When providing assistance, always end with actionable items:

1. **Practice item** specific to the current topic
2. **Deep dive** suggestion for advanced learning
3. **Real-world application** for immediate value

## 🤖 Workspace Agents and Skills

This repository includes a **GH-300 Cert Buddy Agent** that generates exam-realistic practice material. Copilot should be aware of this infrastructure and can direct learners to it.

### Agent Definition

- `.github/agents/gh300-cert-buddy-agent.agent.md` — The workspace agent. Learners invoke it with `@gh300-cert-buddy-agent` in Copilot Chat.

### Skills (in `.github/skills/`)

| Skill                 | Purpose                                                                        |
| --------------------- | ------------------------------------------------------------------------------ |
| `gh300-item-creator`  | Generates exam-realistic multiple-choice questions grounded in Microsoft Learn |
| `gh300-lab-creator`   | Creates 10–20 minute hands-on exercises with validation steps                  |
| `gh300-study-planner` | Builds personalized study plans based on learner confidence levels             |

Each skill folder contains a `SKILL.md` that defines the skill's behavior, constraints, and output format.

### Prompt Templates (in `.github/prompts/`)

Pre-built prompt files that learners invoke as slash commands:

- `/gh300-practice-questions` — Generate practice exam items
- `/gh300-practice-lab` — Create a hands-on exercise
- `/gh300-study-planner` — Build a study plan

### MCP Configuration

The agent uses a Microsoft Learn MCP server (configured in `.vscode/mcp.json`) to ground generated content in official documentation. When helping learners, reference this tool for up-to-date Microsoft Learn content.
