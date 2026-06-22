# GitHub Copilot Quick Reference (January 2026)

> **For Students**: Print this. Keep it next to your keyboard. Use it during labs.

---

## 🎯 The Big Distinction: Agent Mode vs Coding Agent

| Feature | Agent Mode | Coding Agent |
|---------|------------|--------------|
| **Where** | Your IDE (local) | GitHub Actions (cloud) |
| **Trigger** | Chat commands | Assign issue to Copilot |
| **Output** | Direct file edits | Creates a PR |
| **Plans** | Individual, Business, Enterprise | Business, Enterprise only |

---

## 🧠 Model Selection Cheat Sheet

| Model | Use For | When to Pick It |
|-------|---------|-----------------|
| **Raptor Mini** | Inline completions | Default for typing fast |
| **GPT-5.1** | Complex logic | Multi-step reasoning |
| **GPT-5.1-Codex** | Code generation | Writing new functions |
| **Claude Opus 4.5** | Refactoring | Nuanced code changes |
| **Gemini 3 Pro** | Data + images | Multimodal problems |

---

## ⌨️ Essential Keyboard Shortcuts (VS Code)

| Action | Shortcut |
|--------|----------|
| Accept suggestion | `Tab` |
| Dismiss suggestion | `Esc` |
| Next suggestion | `Alt+]` |
| Previous suggestion | `Alt+[` |
| Trigger inline | `Alt+\` |
| Open Chat | `Ctrl+Shift+I` |
| Open Mission Control | `Ctrl+Shift+M` |

---

## 💬 Slash Commands Quick Reference

| Command | Purpose | Example |
|---------|---------|---------|
| `/explain` | Understand code | `/explain What does this regex do?` |
| `/fix` | Debug errors | `/fix TypeError: Cannot read property` |
| `/tests` | Generate tests | `/tests Write Jest tests for this function` |
| `/docs` | Create documentation | `/docs Generate JSDoc for this class` |
| `/optimize` | Improve performance | `/optimize This function is slow` |
| `/plan` | Preview changes | `/plan How would you add auth?` |
| `/agent` | Multi-file task | `/agent Create a REST API for users` |
| `/review` | Code review | `/review Check for security issues` |

---

## 📋 Plan Comparison Chart

| Feature | Individual | Business | Enterprise |
|---------|------------|----------|------------|
| Inline suggestions | ✅ | ✅ | ✅ |
| Chat | ✅ | ✅ | ✅ |
| Agent Mode | ✅ | ✅ | ✅ |
| Coding Agent | ❌ | ✅ | ✅ |
| Cloud Agent | ❌ | ✅ | ✅ |
| Knowledge Bases | ❌ | ❌ | ✅ |
| Custom Models | ❌ | ❌ | ✅ |
| BYOK | ❌ | ✅ | ✅ |
| Private MCP Registry | ❌ | ❌ | ✅ |
| Budget Tracking | ❌ | ✅ | ✅ |

---

## 🔧 Quick Settings (VS Code)

```json
{
    "github.copilot.enable": { "*": true },
    "github.copilot.inlineSuggest.enable": true,
    "github.copilot.chat.model": "gpt-5.1-codex",
    "github.copilot.inlineSuggest.model": "raptor-mini",
    "github.copilot.agent.planMode": true,
    "github.copilot.nextEditSuggestions": true
}
```

---

## 📁 Repository Configuration Files

| File | Purpose |
|------|---------|
| `.github/copilot-instructions.md` | Repo-level Copilot behavior |
| `.github/copilot-agent-instructions.md` | Agent-specific guidance |
| `.github/prompts/*.prompt.md` | Reusable prompt templates |
| `.copilotignore` | Files to exclude from Copilot |

---

## 📊 Exam Domain Weights

| Domain | Weight | Focus |
|--------|--------|-------|
| 1. Use GitHub Copilot responsibly | 15–20% | Ethics, limitations, validation |
| 2. Use GitHub Copilot features | **25–30%** | IDE, CLI, Agent Mode, MCP, org policy |
| 3. Understand Copilot data and architecture | 10–15% | Pipeline, context, proxy, LLM limits |
| 4. Apply prompt engineering and context crafting | 10–15% | Crafting effective prompts |
| 5. Improve developer productivity | 10–15% | Productivity, testing, security, SDLC |
| 6. Configure privacy, exclusions, and safeguards | 10–15% | Content exclusions, duplication detection, policies |

> Weights are **ranges** (January 2026 blueprint). Testing now lives inside Domain 5; there is no standalone Testing domain.

---

## 🚀 New in November 2025 (Know These!)

1. **Multi-model selection** – Choose your LLM
2. **Mission Control** – Agent task dashboard
3. **Plan Mode** – Preview before execution
4. **Linter Integration** – ESLint/Pylint in code review
5. **Image Input** – Attach screenshots to Chat
6. **BYOK** – Bring Your Own Key (Azure, AWS, GCP)
7. **Copilot Spaces** – Organize context for conversations
8. **Threaded Conversations** – Branch chats
9. **Next Edit Suggestions** – Predictive editing
10. **Mobile Agent Sessions** – GitHub Mobile app

---

## ❌ What's Being Retired

| Item | Date |
|------|------|
| CSV Reports | December 31, 2025 |
| Claude Sonnet 3.5 | January 31, 2026 |

---

## 🔗 Quick Links

- [What's New](https://github.com/features/copilot/whats-new)
- [Documentation](https://docs.github.com/en/copilot)
- [Agent Mode Guide](https://docs.github.com/en/copilot/using-github-copilot/using-agent-mode)
- [MCP Specification](https://docs.github.com/en/copilot/mcp)

---

*Last updated: January 2026 | Course: GitHub Copilot Certification Prep*
