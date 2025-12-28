# GitHub Copilot Feature Update Summary – November/December 2025

> **For Instructors**: This document captures the most significant GitHub Copilot updates from Nov-Dec 2025. November alone shipped 50+ updates. Use this as your authoritative reference for teaching current-state Copilot.

---

## The Big Picture: What Changed?

**November 2025 was a landmark month.** GitHub transformed Copilot from "AI autocomplete" into a full **agentic development platform**. The key themes:

1. **Multi-Model Choice** – You're no longer locked to one LLM
2. **Agent Mode Everywhere** – IDEs, CLI, Cloud, Mobile
3. **Enterprise Governance** – Budget controls, registries, permissions
4. **Deep IDE Integration** – Mission Control, Plan Mode, Isolated Subagents

---

## 1. New Models (The Model Buffet)

| Model | Strengths | Status | Plans |
|-------|-----------|--------|-------|
| **GPT-5.1** | Enhanced reasoning, complex multi-step tasks | Public Preview | All |
| **GPT-5.1-Codex** | Specialized for code generation | Public Preview | All |
| **GPT-5.1-Codex-Mini** | Fast, lightweight code completions | Public Preview | All |
| **GPT-5.1-Codex-Max** | Maximum capability for complex refactoring | Public Preview | Business/Enterprise |
| **Claude Opus 4.5** | Nuanced code understanding, creative problem-solving | Public Preview | All |
| **Gemini 3 Pro** | Data transformation, multimodal (images + code) | Public Preview | All |
| **Raptor Mini** | Ultra-low latency for quick scripts | GA | All |

**Teaching Point**: Model selection is now a skill. Teach students when to use which model.

**Deprecation Notice**: Claude Sonnet 3.5 retiring January 31, 2026.

---

## 2. Agent Mode & Coding Agent (The Big Distinction)

This is the most misunderstood topic. Clarify it early:

| Feature | Where It Runs | What It Does | Plans |
|---------|---------------|--------------|-------|
| **Agent Mode** | Your IDE (local) | Multi-file edits, terminal access, iterative refinement | All |
| **Coding Agent** | GitHub Actions (cloud) | Assign issues to Copilot, auto-generates PRs | Business/Enterprise |
| **GitHub Cloud Agent** | GitHub Cloud (Visual Studio) | Delegate tasks from VS, runs in cloud environment | Public Preview |

### Agent Mode Key Features (Nov-Dec 2025)

- **Plan Mode** – Now available in VS Code, JetBrains, Eclipse, Xcode (preview)
  - Shows executable design plan before generating code
  - Students can review and modify the plan
- **Isolated Subagents** – Delegate focused tasks without polluting context
- **Agent-Specific Instructions** – Fine-tune how each agent behaves via instruction files
- **Session Pause/Resume** – Temporarily halt agent sessions, restore context later
- **Mobile Agent Sessions** – Start and review agent work from GitHub Mobile (Android)

### Mission Control UX

New dashboard for managing agent sessions:
- Task navigation
- Status visibility
- Progress tracking across all sessions
- Available in VS Code and Visual Studio

---

## 3. Copilot Spaces (New!)

A new way to organize context for Copilot conversations.

| Feature | Description | Status |
|---------|-------------|--------|
| **Public Spaces** | Make individual-owned spaces publicly accessible via link | GA |
| **Individual Sharing** | Share spaces with specific users | GA |
| **Add Files from Code Viewer** | Add files to a space directly from github.com | GA |

**Teaching Point**: Spaces help students understand how context affects Copilot outputs.

---

## 4. Copilot CLI (Agentic Terminal)

The CLI is now a full agentic coding assistant:

| Capability | Description |
|------------|-------------|
| Local code editing | Edit files, debug, run tests without leaving terminal |
| Project mapping | Understands project structure, installs dependencies |
| GitHub MCP Integration | Connects to GitHub's MCP server out of the box |
| Custom MCP Servers | Extensible with additional MCP servers |
| Image Input | Visual debugging via screenshots and diagrams |
| Semantic Search | Natural language queries against your codebase |

---

## 5. Code Review Enhancements

| Feature | Description | Status |
|---------|-------------|--------|
| **Linter Integration** | Copilot reads ESLint, Pylint, Rubocop output and explains why issues matter | Public Preview |
| **Confidence Scores** | Review suggestions now include confidence metrics | GA |
| **Rationale Display** | See the reasoning behind each suggestion | GA |
| **Incremental PR Reviews** | Review only new commits, not the entire PR | GA |
| **Agent-Specific Review Instructions** | Tailored guidance for review agents | GA |

---

## 6. IDE Updates by Platform

### Visual Studio 2026 (GA November 2025)

- Cloud agent (public preview) – delegate tasks from VS
- In-context Copilot actions in right-click menu
- Intent detection for search ("Did you mean...")
- Output Window context awareness

### VS Code

- Next Edit Suggestions with syntax highlighting (color-coded by language)
- Workspace-level settings (per-project model selection)
- Threaded chat conversations (branch without losing context)
- Documentation comment auto-generation

### JetBrains, Eclipse, Xcode

- Custom Agents now available (previously VS Code only)
- Plan Mode (public preview)
- Next Edit Suggestions (public preview)
- Isolated Subagents (public preview)

---

## 7. MCP (Model Context Protocol) Updates

| Feature | Description | Status |
|---------|-------------|--------|
| **OAuth Support** | Secure integrations with Slack, Jira, custom APIs | GA |
| **Custom UI Components** | Render interactive charts and forms in chat | Public Preview |
| **Private MCP Registry** | Enterprise-only server hosting for internal tools | GA (Enterprise) |
| **MCP Registry Allowlist** | Enforce registry-only runtime in VS Code | Public Preview |

---

## 8. Enterprise & Governance (New Controls)

### Budget & Cost Management

| Feature | Description |
|---------|-------------|
| **Budget Tracking** | Allocate SKU-level or bundled premium request budgets |
| **Per-Team Usage Limits** | Granular budget allocation by team or repository |
| **Code Generation Metrics Dashboard** | Track AI-generated lines, model usage, language distribution |

### Policy & Permissions

| Feature | Description |
|---------|-------------|
| **Delegate AI Controls** | Use fine-grained roles to decentralize Copilot policy ops |
| **Policy Agent Mode Toggle** | Enable/disable agent mode per organization |
| **Fine-Grain Permissions** | Additional roles can access usage metrics and dashboards |
| **Organization Custom Instructions** | Apply consistent guidance across all teams |

### BYOK (Bring Your Own Key)

| Provider | Support |
|----------|---------|
| Azure OpenAI | Public Preview |
| AWS Bedrock | Public Preview |
| GCP Vertex AI | Public Preview |
| Anthropic | Public Preview |
| OpenAI Direct | Public Preview |
| xAI | Public Preview |

---

## 9. Collaboration Features

| Feature | Description |
|---------|-------------|
| **Issue Creation Suggestions** | AI-powered titles, descriptions, labels, assignee recommendations |
| **PR Template Suggestions** | Auto-fill PR descriptions using repo templates |
| **Threaded Chat Conversations** | Branch conversations without losing main thread context |

---

## 10. What's Deprecated/Retiring

| Item | Retirement Date | Action Required |
|------|-----------------|-----------------|
| CSV Reports | December 31, 2025 | Migrate to Usage API |
| Claude Sonnet 3.5 | January 31, 2026 | Switch to Claude Opus 4.5 |

---

## Teaching Scenarios: How to Demo These Features

### Scenario 1: Multi-Model Comparison (15 min)
1. Open the same complex refactoring problem in VS Code
2. Switch between GPT-5.1, Claude Opus 4.5, and Gemini 3 Pro
3. Compare the outputs – discuss reasoning styles

### Scenario 2: Agent Mode vs Coding Agent (20 min)
1. Demo Agent Mode locally – multi-file edit with plan mode
2. Assign an issue to Copilot (coding agent)
3. Watch it create a PR autonomously
4. Compare: when to use each approach

### Scenario 3: Enterprise Governance (15 min)
1. Show the Budget Tracking dashboard
2. Demo per-team usage limits
3. Configure MCP Registry allowlist
4. Set organization-wide custom instructions

### Scenario 4: Code Review with Linters (10 min)
1. Create a PR with intentional ESLint violations
2. Enable Copilot Code Review
3. Show how it explains *why* each issue matters
4. Demonstrate confidence scores

---

## Exam Implications

These features impact Domain 2 (Plans & Features – 31%) significantly:

- **New**: Model selection capabilities
- **New**: Agent Mode vs Coding Agent distinction
- **New**: Mission Control and Plan Mode
- **Updated**: CLI is now agentic
- **New**: Copilot Spaces
- **Updated**: Enterprise governance controls expanded
- **New**: BYOK (Bring Your Own Key)
- **New**: Linter integration with Code Review

Recommend students understand the *why* behind each feature, not just the *what*.

---

## Quick Reference: Feature Availability Matrix

| Feature | Individual | Business | Enterprise |
|---------|------------|----------|------------|
| GPT-5.1 | Yes | Yes | Yes |
| Claude Opus 4.5 | Yes | Yes | Yes |
| Agent Mode | Yes | Yes | Yes |
| Coding Agent | No | Yes | Yes |
| Cloud Agent (VS) | No | Yes | Yes |
| Mission Control | Yes | Yes | Yes |
| Plan Mode | Yes | Yes | Yes |
| BYOK | No | Yes | Yes |
| Knowledge Bases | No | No | Yes |
| Custom Models | No | No | Yes |
| Budget Tracking | No | Yes | Yes |
| Private MCP Registry | No | No | Yes |
| Copilot Spaces | Yes | Yes | Yes |

---

## Resources

- [GitHub Copilot What's New](https://github.com/features/copilot/whats-new)
- [November 2025 Copilot Roundup](https://github.com/orgs/community/discussions/180828)
- [December Enterprise Roundup](https://resources.github.com/enterprise-content-roundup/december/)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)

---

*Last updated: December 2025*
