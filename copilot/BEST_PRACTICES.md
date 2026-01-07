# GitHub Copilot Best Practices Guide

> **Updated January 2026** – Includes Agent Mode, multi-model selection, and Mission Control patterns.

---

## 🧠 Model Selection Strategy

As of November 2025, you can choose from multiple LLMs. Here's when to use each:

| Model | Best For | Latency |
|-------|----------|---------|
| **Raptor Mini** | Quick completions, simple scripts | Ultra-fast |
| **GPT-5.1** | Complex reasoning, multi-step logic | Medium |
| **GPT-5.1-Codex** | Specialized code generation | Medium |
| **Claude Opus 4.5** | Nuanced refactoring, creative solutions | Medium |
| **Gemini 3 Pro** | Data transformation, multimodal (images) | Medium |

### Switching Models in VS Code

```json
{
    "github.copilot.chat.model": "gpt-5.1-codex",
    "github.copilot.inlineSuggest.model": "raptor-mini"
}
```

**Tip**: Use `Raptor Mini` for inline suggestions (speed matters) and `GPT-5.1` or `Claude Opus 4.5` for Chat conversations (quality matters).

---

## 🤖 Agent Mode Best Practices

Agent Mode is now available across all major IDEs. It enables multi-file edits, terminal access, and iterative refinement.

### When to Use Agent Mode

✅ **Good for:**
- Multi-file refactoring
- Feature implementation across modules
- Test generation for existing code
- Migration tasks (e.g., upgrading dependencies)

❌ **Avoid for:**
- Quick one-line fixes (use inline suggestions)
- Exploratory questions (use Chat)
- Security-critical code (always review)

### Plan Mode Pattern

Before Agent Mode generates code, enable Plan Mode to review the approach:

1. In Chat, type: `@workspace implement user authentication`
2. Agent shows the plan: files to create, changes to make
3. Review and modify the plan
4. Approve to execute

```
# Plan Mode generates something like:
Step 1: Create src/auth/AuthService.ts
Step 2: Update src/middleware/authMiddleware.ts
Step 3: Add routes in src/routes/auth.ts
Step 4: Create tests in tests/auth.test.ts
```

### Agent-Specific Instructions

Create `.github/copilot-agent-instructions.md`:

```markdown
# Agent Instructions

## Coding Style
- Use TypeScript strict mode
- Prefer functional patterns over classes
- Always include error handling

## Testing
- Use Jest for unit tests
- Minimum 80% coverage
- Include edge cases

## Security
- Never log sensitive data
- Validate all inputs
- Use parameterized queries
```

---

## 🎯 Context Enhancement

### Using MCP (Model Context Protocol)

MCP enhances Copilot's context awareness. Configure in VS Code:

```json
{
    "github.copilot.mcp.servers": [
        {
            "name": "github",
            "uri": "mcp://github.com"
        },
        {
            "name": "jira",
            "uri": "mcp://your-jira-instance.com"
        }
    ]
}
```

### Repository-Level Instructions

Create `.github/copilot-instructions.md` for consistent behavior:

```markdown
# Copilot Instructions for This Repository

## Project Context
- This is an e-commerce platform
- Stack: Next.js 14 + PostgreSQL + Redis
- Uses Stripe for payments

## Code Standards
- Follow Airbnb style guide
- Use conventional commits
- All APIs must have OpenAPI docs

## Security Requirements
- OWASP Top 10 compliance required
- PCI-DSS for payment handling
```

### Prompt Files (River Feature)

Save reusable prompts in `.github/prompts/`:

```markdown
<!-- .github/prompts/api-endpoint.prompt.md -->
---
name: Create API Endpoint
description: Generate a new REST API endpoint with validation
---

Create a new API endpoint with:
- Input validation using Zod
- Error handling with proper HTTP status codes
- OpenAPI documentation
- Unit tests
- Integration tests

Endpoint: {{endpoint}}
Method: {{method}}
```

---

## 🔄 Workflow Integration

### Mission Control Dashboard

Mission Control provides visibility into agent sessions. Use it to:

- Track active agent tasks
- Review progress across sessions
- Manage multiple concurrent agents

Access via: `Ctrl+Shift+P` → "Copilot: Open Mission Control"

### VS Code Settings (Optimized)

```json
{
    "github.copilot.enable": {
        "*": true,
        "yaml": true,
        "markdown": true,
        "plaintext": false
    },
    "github.copilot.inlineSuggest.enable": true,
    "github.copilot.chat.model": "gpt-5.1",
    "github.copilot.inlineSuggest.model": "raptor-mini",
    "github.copilot.agent.planMode": true,
    "github.copilot.nextEditSuggestions": true,
    "github.copilot.linterIntegration": true
}
```

### Keyboard Shortcuts (Updated)

| Action | VS Code | Visual Studio | JetBrains |
|--------|---------|---------------|-----------|
| Accept suggestion | `Tab` | `Tab` | `Tab` |
| Dismiss suggestion | `Esc` | `Esc` | `Esc` |
| Show next suggestion | `Alt+]` | `Alt+Right` | `Alt+Right` |
| Show previous | `Alt+[` | `Alt+Left` | `Alt+Left` |
| Trigger inline | `Alt+\` | `Alt+\` | `Alt+\` |
| Open Chat | `Ctrl+Shift+I` | `Ctrl+\` | `Ctrl+Shift+C` |
| Open Mission Control | `Ctrl+Shift+M` | `Ctrl+Shift+M` | N/A |
| Toggle Plan Mode | `Ctrl+Shift+P` | `Ctrl+Shift+P` | N/A |

---

## 🚀 Advanced Features

### Code Review with Linters

Copilot now integrates with your linters. Enable in settings:

```json
{
    "github.copilot.codeReview.linterIntegration": true,
    "github.copilot.codeReview.showConfidenceScores": true,
    "github.copilot.codeReview.showRationale": true
}
```

Copilot will:
1. Read ESLint/Pylint/Rubocop output
2. Explain *why* each issue matters (not just what's wrong)
3. Show confidence scores for suggestions
4. Provide incremental reviews (only new commits)

### Next Edit Suggestions

Enable predictive editing that anticipates your next change:

```json
{
    "github.copilot.nextEditSuggestions": true,
    "github.copilot.nextEditSuggestions.syntaxHighlighting": true
}
```

### Threaded Conversations

Branch Chat conversations without losing context:

```
Main thread: "Refactor this authentication module"
  └── Branch: "What about OAuth support?"
  └── Branch: "How would this work with SSO?"
```

### Image Input Support

In Chat, you can now attach:
- Screenshots (for UI debugging)
- Architecture diagrams
- Error screenshots
- UI mockups

Example: `@workspace Here's a screenshot of the error [attach image]. How do I fix this?`

---

## 🔒 Security Best Practices

### Security-First Prompting

```python
# @copilot-security
# Scan for:
# - SQL injection vulnerabilities
# - XSS in user inputs
# - CSRF token validation
# - Input sanitization
# - Secure password handling
```

### Code Review Patterns

```python
# @copilot-review
# Review criteria:
# - OWASP Top 10 compliance
# - Input validation on all endpoints
# - Parameterized database queries
# - No hardcoded secrets
# - Proper error handling (no stack traces to users)
```

### Using BYOK (Enterprise)

If your organization uses BYOK (Bring Your Own Key):

```json
{
    "github.copilot.byok.provider": "azure-openai",
    "github.copilot.byok.endpoint": "https://your-instance.openai.azure.com",
    "github.copilot.byok.model": "gpt-5.1"
}
```

---

## 📊 Productivity Patterns

### Test Generation

```python
# @copilot-test
# Framework: pytest
# Test cases needed:
# - Happy path
# - Invalid input handling
# - Edge cases (empty, null, max values)
# - Async operation handling
# - Mock external dependencies
```

### Documentation Generation

```typescript
// @copilot-docs
// Generate:
// - JSDoc comments
// - README section
// - API documentation (OpenAPI format)
// - Usage examples
```

### Performance Optimization

```typescript
// @copilot-optimize
// Optimize for:
// - Memory usage (avoid leaks)
// - CPU performance
// - Network calls (batch requests)
// - Database queries (N+1 prevention)
```

---

## 🎨 UI/UX Enhancement

### Accessibility

```typescript
// @copilot-a11y
// Ensure WCAG 2.1 AA compliance:
// - Semantic HTML
// - ARIA labels
// - Keyboard navigation
// - Color contrast (4.5:1 minimum)
// - Screen reader support
```

### Responsive Design

```typescript
// @copilot-responsive
// Generate responsive breakpoints:
// - Mobile first (< 640px)
// - Tablet (640px - 1024px)
// - Desktop (> 1024px)
// - Use CSS Grid/Flexbox
```

---

## 📦 Configuration Templates

### Project Setup (VS Code Workspace)

```json
{
    "copilot.project": {
        "framework": "next.js",
        "language": "typescript",
        "testing": "jest",
        "linting": "eslint",
        "styling": "tailwind",
        "models": {
            "inline": "raptor-mini",
            "chat": "gpt-5.1-codex",
            "agent": "claude-opus-4.5"
        }
    }
}
```

### Team Standards

```json
{
    "copilot.team": {
        "codeStyle": "airbnb",
        "commitFormat": "conventional",
        "reviewProcess": "automated",
        "cicdIntegration": true,
        "securityScanning": true,
        "testCoverage": 80
    }
}
```

---

## 🎓 Learning Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Copilot What's New](https://github.com/features/copilot/whats-new)
- [VS Code Integration Guide](https://code.visualstudio.com/docs/editor/github-copilot)
- [Agent Mode Documentation](https://docs.github.com/en/copilot/using-github-copilot/using-agent-mode)
- [MCP Protocol Specification](https://docs.github.com/en/copilot/mcp)

---

## ✅ Quick Checklist

Before submitting code generated by Copilot:

- [ ] Reviewed all generated code manually
- [ ] Ran tests (unit and integration)
- [ ] Checked for security vulnerabilities
- [ ] Verified no sensitive data in code
- [ ] Confirmed code follows team standards
- [ ] Validated edge cases are handled
- [ ] Ensured documentation is accurate

---

*Last updated: January 2026*
