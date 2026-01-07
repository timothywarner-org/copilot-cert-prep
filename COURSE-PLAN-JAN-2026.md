# GitHub Copilot Certification Course Plan - January 2026

> **Fully Refactored for January 2026**: Agent Mode, multi-model selection, and Mission Control are now woven throughout all segments, not just at the end.

## Course Philosophy

This course follows Feynman's principle: *If you can't explain it simply, you don't understand it well enough.* Every complex feature is broken down into digestible mental models with hands-on reinforcement.

---

## The Big Picture: What Changed in 2025?

Before diving in, students need to understand the paradigm shift:

| Era | Copilot Was | Copilot Is Now |
|-----|-------------|----------------|
| 2023-2024 | AI autocomplete | **Agentic development platform** |
| Model | Single LLM | **Multi-model selection** |
| Scope | Single file | **Multi-file agent operations** |
| Control | Suggestions only | **Plan Mode + Mission Control** |
| Enterprise | Basic policies | **BYOK + Budget tracking + MCP Registry** |

---

## Segment 1: Foundations & The New Copilot (3 hours)

### Learning Objectives

- Understand the evolution from autocomplete to agentic AI
- Set up Copilot with optimal model selection
- Master responsible AI principles

### 1.1 Welcome & The 2025 Paradigm Shift (30 min)

- Course overview and certification structure
- **The mental model**: Copilot as an agentic platform, not just autocomplete
- Three ways to use Copilot:
  1. **Inline suggestions** (traditional)
  2. **Chat conversations** (interactive)
  3. **Agent Mode** (autonomous multi-file)

### 1.2 Plans & Multi-Model Architecture (45 min)

**This is new and exam-critical:**

| Plan | Models Available | Agent Features |
|------|------------------|----------------|
| Individual | Raptor Mini, GPT-5.1, Claude Opus 4.5, Gemini 3 Pro | Agent Mode (IDE) |
| Business | All above + GPT-5.1-Codex-Max | + Coding Agent, BYOK |
| Enterprise | All above + Custom models | + Private MCP Registry |

**Demo**: Switch between models, observe output differences

- When to use Raptor Mini (speed) vs Claude Opus 4.5 (nuance)
- IP indemnity and legal protections
- **Hands-on**: Configure model preferences in VS Code

### 1.3 IDE Setup with Agent Mode (45 min)

- Installing Copilot extensions
- **New UI elements**:
  - Mission Control dashboard (`Ctrl+Shift+M`)
  - Plan Mode toggle
  - Model selector
  - Next Edit Suggestions
- Ghost text vs inline chat vs agent mode
- **Hands-on**: Enable Plan Mode, try Agent on a simple multi-file task

### 1.4 Responsible AI & Validation (45 min)

- Domain 1 coverage (7%)
- Why validation matters more with Agent Mode
- Bias in training data across different models
- Security considerations for autonomous operations
- **Hands-on**: Review and validate agent-generated code

### 1.5 CLI: Now Agentic (15 min)

- CLI is no longer just for commands—it's a full agent
- Image input for visual debugging
- Semantic codebase search
- MCP integration out of the box

### Lab Exercise (Segment 1)

1. Configure model selection (Raptor Mini inline, GPT-5.1-Codex for chat)
2. Open Mission Control and explore the UI
3. Run a simple agent task with Plan Mode enabled
4. Validate the output and identify potential issues
5. Try CLI with an image attachment

---

## Segment 2: Core Features & Agent Workflows (3 hours)

### Learning Objectives

- Master prompt engineering for both chat and agent mode
- Understand how context flows to different models
- Build effective agent workflows

### 2.1 How Copilot Works: Multi-Model Edition (45 min)

- Data pipeline with model routing
- How context is gathered differently per model
- MCP (Model Context Protocol) architecture
- **Key insight**: Same prompt, different model = different result
- **Demo**: Compare outputs from 3 models on same task

### 2.2 Prompt Engineering 2.0 (60 min)

**Traditional prompting still matters, but now add:**

- Model-specific prompting strategies
- Agent-aware prompt design
- Using `.instructions.md` for consistent behavior
- Prompt files for reusable templates
- **Hands-on**: Create prompts that work well across models

### 2.3 Chat Mastery with New Commands (45 min)

**Updated slash commands:**

| Command | Purpose | New in 2025? |
|---------|---------|--------------|
| `/explain` | Understand code | No |
| `/fix` | Debug errors | No |
| `/tests` | Generate tests | No |
| `/plan` | Preview changes before execution | **Yes** |
| `/agent` | Multi-file task | **Yes** |
| `/review` | Code review with linter integration | **Yes** |

- Threaded conversations (branching without losing context)
- Image attachments for visual debugging
- Linter integration with confidence scores
- **Demo**: Use `/plan` before `/agent` for controlled refactoring

### 2.4 Agent Mode Deep Dive (30 min)

**The key distinction (exam-critical):**

| Feature | Agent Mode | Coding Agent |
|---------|------------|--------------|
| Location | Your IDE (local) | GitHub Actions (cloud) |
| Trigger | Chat commands | Assign issue to Copilot |
| Output | Direct file edits | Creates a PR |
| Review | Plan Mode in IDE | Review PR on GitHub |

- Mission Control for tracking sessions
- Session pause/resume
- Agent-specific instructions file
- **Demo**: Multi-file refactoring with step-by-step plan approval

### Lab Exercise (Segment 2)

1. Create a `.github/copilot-agent-instructions.md` file
2. Use `/plan` to preview a refactoring operation
3. Execute with Agent Mode and review changes
4. Compare outputs from different models
5. Practice threaded conversations

---

## Segment 3: Testing, Security & Enterprise (3 hours)

### Learning Objectives

- Generate comprehensive tests with agent assistance
- Implement security-first development patterns
- Configure enterprise governance features

### 3.1 Testing with Agent Mode (60 min)

- Unit test generation (traditional)
- **New**: Agent-driven test suite creation
  - Multi-file test generation
  - Edge case identification across modules
  - Integration test scaffolding
- TDD workflow with Plan Mode
- **Demo**: Generate a complete test suite with agent

### 3.2 Security & Code Review (45 min)

**New code review capabilities:**

- Linter integration (ESLint, Pylint, Rubocop)
- Confidence scores for each suggestion
- Rationale explaining *why* issues matter
- Incremental PR reviews (only new commits)
- **Hands-on**: Run `/review` with linter integration enabled

### 3.3 Enterprise Features (45 min)

**Updated for January 2026:**

| Feature | Business | Enterprise |
|---------|----------|------------|
| Coding Agent | Yes | Yes |
| Cloud Agent (VS) | Preview | Preview |
| Knowledge Bases | No | Yes |
| Custom Models | No | Yes |
| BYOK | Yes | Yes |
| Private MCP Registry | No | Yes |
| Budget Tracking | Yes | Yes |

- Organization-wide custom instructions
- Delegated AI controls management
- PR summaries with agent awareness
- **Demo**: Configure Knowledge Base with MCP context

### 3.4 Governance & Administration (30 min)

**New governance controls:**

- Budget tracking per team/repository
- Per-team usage limits
- BYOK (Bring Your Own Key) for Azure/AWS/GCP
- MCP Registry allowlist
- Policy agent mode toggle per org
- **Demo**: Set up budget limits and review usage dashboard

### Lab Exercise (Segment 3)

1. Generate a test suite using Agent Mode
2. Run code review with linter integration
3. Configure BYOK (simulated)
4. Set up budget tracking rules
5. Create organization-wide instructions

---

## Segment 4: Privacy, Configuration & Troubleshooting (3 hours)

### Learning Objectives

- Master privacy controls for agentic workflows
- Configure advanced settings for optimal performance
- Troubleshoot common issues

### 4.1 Privacy in an Agentic World (60 min)

- Data handling with multi-model routing
- Content exclusions (now more critical with agents)
- Repository-level vs organization-level controls
- Agent permissions and scope limiting
- **Key insight**: Agents can access more files—exclusions matter more
- **Hands-on**: Configure exclusions for sensitive directories

### 4.2 Advanced Configuration (45 min)

**New settings for 2025:**

```json
{
  "github.copilot.chat.model": "gpt-5.1-codex",
  "github.copilot.inlineSuggest.model": "raptor-mini",
  "github.copilot.agent.planMode": true,
  "github.copilot.agent.autoApprove": false,
  "github.copilot.nextEditSuggestions": true,
  "github.copilot.codeReview.linterIntegration": true
}
```

- Workspace-level model selection
- Plan Mode defaults
- Next Edit Suggestions tuning
- MCP server configuration

### 4.3 Troubleshooting Workshop (45 min)

**Common issues with new features:**

| Issue | Cause | Solution |
|-------|-------|----------|
| Agent not finding files | Exclusion too broad | Review `.copilotignore` |
| Wrong model responses | Model mismatch | Check model config |
| Mission Control empty | Agent not enabled | Enable in settings |
| Slow suggestions | Wrong model for task | Use Raptor Mini for inline |

- Support resources and community
- **Hands-on**: Debug common scenarios

### 4.4 Integration Patterns (30 min)

- SDLC integration with Coding Agent
- CI/CD workflows with agent-generated PRs
- Team collaboration with Copilot Spaces
- Productivity metrics via API
- **Demo**: Assign an issue to Copilot, watch it create a PR

### Lab Exercise (Segment 4)

1. Configure privacy exclusions for agents
2. Set up workspace-level model preferences
3. Troubleshoot a "missing suggestions" scenario
4. Integrate Coding Agent with a sample issue
5. Review productivity metrics

---

## Segment 5: Exam Prep & What's Next (3 hours)

### Learning Objectives

- Review all domains with focus on new features
- Practice exam-style questions
- Understand the competitive landscape

### 5.1 Domain Review with 2025 Focus (60 min)

| Domain | Weight | 2025 Focus Areas |
|--------|--------|------------------|
| 1. Responsible AI | 7% | Validation of agent output |
| 2. Plans & Features | 31% | **Multi-model, Agent Mode, Mission Control** |
| 3. Data Handling | 15% | MCP, multi-model routing |
| 4. Prompt Engineering | 9% | Model-specific prompting |
| 5. Developer Use Cases | 14% | Agent workflows, Coding Agent |
| 6. Testing | 9% | Agent-driven test generation |
| 7. Privacy & Exclusions | 15% | Agent permissions, BYOK |

- Common exam pitfalls
- **Key distinction to memorize**: Agent Mode vs Coding Agent vs Cloud Agent

### 5.2 Practice Exam (45 min)

- 30 sample questions covering new features
- Time management strategies
- Question analysis techniques
- **Hands-on**: Mock exam with immediate review

### 5.3 Competitive Landscape (30 min)

| Tool | Strengths | Copilot Advantage |
|------|-----------|-------------------|
| Cursor | Fast, lightweight | GitHub integration, enterprise governance |
| Windsurf | IDE-native | Multi-model, Coding Agent |
| Amazon CodeWhisperer | AWS integration | Model choice, Mission Control |
| OpenAI Codex | Raw power | Plan Mode, agent ecosystem |

- What makes Copilot different: ecosystem + governance
- Future certification paths

### 5.4 Resources & Next Steps (45 min)

**Official resources:**

- [GitHub Copilot What's New](https://github.com/features/copilot/whats-new)
- [Agent Mode Documentation](https://docs.github.com/en/copilot/using-github-copilot/using-agent-mode)
- [MCP Integration Guide](https://docs.github.com/en/copilot/mcp)
- [Enterprise Governance](https://resources.github.com/copilot-for-business/)

**Post-course action items:**

1. Schedule exam within 2 weeks
2. Practice Agent Mode on a real project
3. Configure multi-model selection for your workflow
4. Join the GitHub Copilot community
5. Share learnings with your team

### Lab Exercise (Segment 5)

1. Complete 30-question mock exam
2. Create personal study plan
3. Build a multi-file project using Agent Mode
4. Document your optimal model configuration
5. Prepare for certification

---

## Time Allocation Summary

| Segment | Duration | Primary Domains | Key New Features |
|---------|----------|-----------------|------------------|
| 1: Foundations | 3 hours | 1 (7%), 2 (partial) | Multi-model, Agent intro |
| 2: Core Features | 3 hours | 3 (15%), 4 (9%), 5 (14%) | Agent Mode, Plan Mode |
| 3: Enterprise | 3 hours | 2 (partial), 6 (9%) | BYOK, Governance, Coding Agent |
| 4: Privacy | 3 hours | 7 (15%), 2 (partial) | Agent permissions, MCP |
| 5: Exam Prep | 3 hours | All domains | Review + practice |

---

## Pre-Course Requirements

1. Active GitHub account
2. VS Code with Copilot extension installed
3. Basic programming knowledge (any language)
4. GitHub Copilot subscription (trial or paid)
5. Willingness to experiment with Agent Mode

---

## Key Takeaways for Instructors

1. **Lead with the paradigm shift**: Don't bury Agent Mode at the end
2. **Model selection is now a skill**: Teach when to use which model
3. **Plan Mode builds trust**: Always demo it before Agent Mode
4. **The distinction matters**: Agent Mode ≠ Coding Agent ≠ Cloud Agent
5. **Governance is enterprise-critical**: BYOK, budgets, registries

---

*Last updated: January 2026*
