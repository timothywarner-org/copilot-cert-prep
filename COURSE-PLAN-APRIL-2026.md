# GitHub Copilot Certification Course Plan - April 2026

> **Aligned to the official January 2026 GH-300 blueprint** ([MS Learn](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300)). The exam was significantly restructured: **7 domains collapsed into 6 functional groups**, Responsible AI grew from 7% to **15–20%**, and a new "Use GitHub Copilot features" group (25–30%) explicitly covers **CLI, Agent Mode, Edit Mode, MCP, Sub-Agents, Spaces, Spark, and org-wide policy management**. Testing is now folded into the productivity group.

## Course Philosophy

This course follows Feynman's principle: *If you can't explain it simply, you don't understand it well enough.* Every complex feature is broken down into digestible mental models with hands-on reinforcement.

---

## January 2026 Blueprint at a Glance

| # | Functional Group | Weight | Where It Lives in This Course |
|---|---|---|---|
| 1 | Use GitHub Copilot **responsibly** | **15–20%** | Segment 1 + threaded into every segment |
| 2 | Use GitHub Copilot **features** (IDE, CLI, Agent/Edit/MCP, org policy) | **25–30%** | Segments 2 & 3 |
| 3 | Understand GitHub Copilot **data and architecture** | 10–15% | Segment 2 |
| 4 | Apply **prompt engineering** and context crafting | 10–15% | Segment 2 |
| 5 | Improve **developer productivity** (incl. testing & security) | 10–15% | Segment 3 |
| 6 | Configure **privacy, content exclusions, and safeguards** | 10–15% | Segment 4 |

**Pass score:** 700/1000 · **Validity:** 2 years · **Sandbox:** https://aka.ms/GHExamDemo-enu

See [`exam-metadata/GH-300-Study-Guide-April-2026.md`](exam-metadata/GH-300-Study-Guide-April-2026.md) for the full objective list.

---

## The Big Picture: What Changed in 2025–2026?

Before diving in, students need to understand the paradigm shift:

| Era | Copilot Was | Copilot Is Now |
|-----|-------------|----------------|
| 2023-2024 | AI autocomplete | **Agentic development platform** |
| Model | Single LLM | **Multi-model selection** |
| Scope | Single file | **Multi-file agent operations** |
| Control | Suggestions only | **Plan Mode + Mission Control** |
| Enterprise | Basic policies | **BYOK + Budget tracking + MCP Registry** |
| Surfaces | IDE only | **IDE + CLI + Coding Agent + Spaces + Spark** |

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

### 1.4 Responsible AI & Validation (60 min) — **expanded**

> **Group 1 coverage (15–20%, up from 7%).** This is now one of the heaviest-weighted areas — give it real time.

- **Risks and limitations** of generative AI tools (depth of source data, bias, hallucination)
- **Ethical and responsible AI usage** principles
- **Potential harms** and **mitigation strategies** (bias, insecure code, fairness, privacy, transparency)
- **Why validation matters more with Agent Mode** — autonomous edits amplify any miss
- **How to operate Copilot responsibly** in a team context (review gates, instructions files, audit logs)
- **Hands-on**: Review and validate agent-generated code; identify a hallucination and a license-risk suggestion

### 1.5 CLI: Now a First-Class Surface (30 min) — **expanded**

> **Group 2 sub-area (CLI is explicitly called out in the blueprint).**

- What Copilot CLI is and **how it benefits developers**
- **Installing** Copilot CLI (steps you should be able to recite)
- **Key features and commands**
- Using CLI **interactively** vs **in sessions**
- **Generating scripts** and **managing files** with CLI
- Image input for visual debugging
- MCP integration out of the box
- **Hands-on**: Install CLI, run an interactive session, generate a shell script

### Lab Exercise (Segment 1)

1. Configure model selection (Raptor Mini inline, GPT-5.1-Codex for chat)
2. Open Mission Control and explore the UI
3. Run a simple agent task with Plan Mode enabled
4. Validate the output and identify potential issues
5. Try CLI with an image attachment

---

## Segment 2: Data, Prompts & Agent Workflows (3 hours)

> **Maps to:** Group 3 — Data and Architecture (10–15%), Group 4 — Prompt Engineering (10–15%), and the Agent/Edit/MCP portion of Group 2 (25–30%).

### Learning Objectives

- Visualize the **code suggestion lifecycle** end to end
- Master prompt engineering for both chat and agent mode
- Understand how context flows to different models
- Build effective agent workflows with Plan Mode and Sub-Agents

### 2.1 How Copilot Works: Data & Architecture (45 min) — **Group 3**

- **Data usage, flow, and sharing**
- **Input processing and prompt building**
- **Proxy filtering and post-processing**
- **Code suggestion lifecycle** — be able to draw it on a whiteboard
- **Limitations of LLMs and Copilot**
- Multi-model routing and how context shifts per model
- **Demo**: Compare outputs from 3 models on same task

### 2.2 Prompt Engineering & Context Crafting (60 min) — **Group 4**

- **Prompt structure and context** — what Copilot actually sees
- **How context is determined** (open files, selection, workspace, MCP)
- **Zero-shot vs few-shot** prompting — when to reach for each
- **Best practices for prompt crafting**
- **Prompt engineering principles** for performance
- **Prompt process flow** and **chat history usage**
- Using `.instructions.md` for consistent behavior
- **Prompt files** for reusable templates (explicitly called out in the blueprint)
- **Hands-on**: Build a prompt file and an instructions file; A/B test across models

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

### 2.4 Agent Mode, Edit Mode, Sub-Agents & MCP (45 min) — **Group 2 core**

**Three exam-critical distinctions:**

| Surface | Where it runs | Trigger | Output | Review gate |
|---|---|---|---|---|
| **Agent Mode** | IDE (local) | Chat command | Direct file edits | **Plan Mode** |
| **Edit Mode** | IDE (local) | Scoped multi-file targets | Direct file edits | Inline diff |
| **Coding Agent** | GitHub Actions (cloud) | Assign issue to Copilot | Pull request | PR review |

- **Agent Sessions** and how to manage them
- **Sub-Agents** — delegating tasks to optimize context usage (explicit in the blueprint)
- **MCP** (Model Context Protocol) — connecting external tools/data
- **Mission Control** for tracking sessions
- Session pause/resume
- Agent-specific instructions files
- **Spaces** (curated team context) vs **Spark** (AI-driven app/prototype builder)
- **PR summaries** and **customizable review standards via instructions files**
- **Demo**: Multi-file refactoring with Plan Mode approval, then delegate a sub-task to a Sub-Agent

### Lab Exercise (Segment 2)

1. Create a `.github/copilot-agent-instructions.md` file
2. Use `/plan` to preview a refactoring operation
3. Execute with Agent Mode and review changes
4. Compare outputs from different models
5. Practice threaded conversations

---

## Segment 3: Productivity, Testing, Security & Org Policy (3 hours)

> **Maps to:** Group 5 — Improve developer productivity (10–15%, **now includes testing & security**) and the **org-policy sub-area of Group 2** (audit logs, REST API for subscriptions, Code Review policies).

### Learning Objectives

- Use Copilot for **code generation, refactoring, documentation, sample data, legacy modernization**
- Generate **unit and integration tests**, identify **edge cases**, write **assertions**
- Suggest **security improvements** and **performance optimizations**
- Configure **organization-wide policies** and **audit log** workflows

### 3.1 Productivity & Code Quality (45 min) — **Group 5A**

- Code **generation, refactoring, and documentation**
- **Accelerating learning** and **reducing context switching**
- **Generating sample data** and **modernizing legacy code**
- **Demo**: Refactor a legacy module and generate docs in one session

### 3.2 Testing & Security with Copilot (45 min) — **Group 5B**

- **Unit and integration test** generation
- **Edge case identification** and **assertion writing**
- **Security improvements** (vulnerable patterns, input validation)
- **Performance optimizations** suggested by Copilot
- TDD workflow with Plan Mode
- **Demo**: Generate a test suite, then run `/review` for security findings

### 3.3 Code Review with Instructions Files (30 min)

**New code review capabilities (and how to standardize them):**

- Linter integration (ESLint, Pylint, Rubocop)
- Confidence scores for each suggestion
- Rationale explaining *why* issues matter
- Incremental PR reviews (only new commits)
- **Customizable review standards via instructions files** (explicit in the blueprint)
- **Hands-on**: Author an instructions file that codifies your team's review rubric, then run `/review`

### 3.4 Enterprise Features (30 min)

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

### 3.5 Org-Wide Policy, Audit & REST API (30 min) — **Group 2D**

> Explicitly listed in the Jan 2026 blueprint — give it real time even though it's "admin-flavored."

- **Organization-wide policy management** (enable/disable features per org/IDE/github.com)
- **Copilot Code Review policies**
- Managing **feature availability across IDEs and github.com**
- **Audit log events** — what's logged, how to query
- **Manage subscriptions using the REST API** (seat assignment, billing exports)
- Budget tracking per team/repository
- BYOK (Bring Your Own Key) for Azure/AWS/GCP
- MCP Registry allowlist
- **Demo**: Walk through the audit log + a `gh api` REST call against the Copilot subscription endpoints

### Lab Exercise (Segment 3)

1. Generate a test suite using Agent Mode
2. Run code review with a custom instructions file
3. Configure BYOK (simulated)
4. Inspect Copilot audit log events
5. List org seats with the REST API (`gh api /orgs/{org}/copilot/billing/seats`)

---

## Segment 4: Privacy, Exclusions, Safeguards & Troubleshooting (3 hours)

> **Maps to:** Group 6 — Configure privacy, content exclusions, and safeguards (10–15%).

### Learning Objectives

- Configure **content exclusions** and editor settings
- Describe **ownership and limitations** of Copilot outputs
- Enable **duplication detection** and **security warnings**
- **Resolve issues** with suggestions and exclusions

### 4.1 Privacy, Exclusions & Output Ownership (60 min) — **Group 6A**

- **Content exclusions** and editor settings (file, repo, org scope)
- **Ownership and limitations** of outputs (IP indemnity, who owns the suggestion)
- Data handling with multi-model routing
- Repository-level vs organization-level controls
- Agent permissions and scope limiting
- **Key insight**: Agents can access more files — exclusions matter more
- **Hands-on**: Configure exclusions for sensitive directories; verify they're enforced

### 4.1b Safeguards: Duplication Detection & Security Warnings (30 min) — **Group 6B**

- Enable **duplication detection** (block suggestions matching public code)
- **Security warnings** for known vulnerable patterns
- **Resolve issues** with suggestions and exclusions
- **Hands-on**: Trigger a duplication-detection block and walk through the resolution path

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

### 5.1 Functional-Group Review — January 2026 Blueprint (60 min)

| # | Functional Group | Weight | 2026 Focus Areas |
|---|---|---|---|
| 1 | Use GitHub Copilot **responsibly** | **15–20%** | Validation, harms & mitigation, ethical AI |
| 2 | Use GitHub Copilot **features** | **25–30%** | IDE triggers, **CLI**, Agent/Edit Mode, **Sub-Agents**, MCP, Spaces, Spark, **org policy + audit + REST API** |
| 3 | Understand **data and architecture** | 10–15% | Data flow, prompt building, proxy filtering, **suggestion lifecycle**, LLM limits |
| 4 | **Prompt engineering** & context | 10–15% | Zero/few-shot, prompt files, chat history, context determination |
| 5 | Improve **developer productivity** | 10–15% | Refactor/docs, sample data, legacy modernization, **unit & integration tests, edge cases, security & perf** |
| 6 | **Privacy, exclusions, safeguards** | 10–15% | Content exclusions, output ownership, **duplication detection**, security warnings, troubleshooting |

**Common exam pitfalls:**

- Confusing **Agent Mode** (IDE) with **Coding Agent** (Actions/cloud)
- Forgetting **Edit Mode** as a distinct surface
- Missing the **Sub-Agents** concept (delegation for context optimization)
- Not knowing subscriptions are managed via **REST API**
- Treating **prompt files** and **instructions files** as the same thing

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

| Segment | Duration | Primary Functional Groups (Jan 2026) | Key Features |
|---------|----------|---|------------------|
| 1: Foundations | 3 hours | **Group 1 (15–20%)**, Group 2 intro (CLI, IDE triggers) | Responsible AI deep-dive, multi-model, CLI install |
| 2: Data, Prompts & Agents | 3 hours | **Group 3 (10–15%)**, **Group 4 (10–15%)**, Group 2 (Agent/Edit/MCP/Sub-Agents) | Suggestion lifecycle, prompt files, Agent Mode, Plan Mode |
| 3: Productivity & Org Policy | 3 hours | **Group 5 (10–15%)**, Group 2 (org policy, audit, REST API) | Tests, security, instructions files, audit log, REST API |
| 4: Privacy & Safeguards | 3 hours | **Group 6 (10–15%)** | Exclusions, output ownership, duplication detection, security warnings |
| 5: Exam Prep | 3 hours | All groups | Review + 30-question mock exam |

---

## Pre-Course Requirements

1. Active GitHub account
2. VS Code with Copilot extension installed
3. Basic programming knowledge (any language)
4. GitHub Copilot subscription (trial or paid)
5. Willingness to experiment with Agent Mode

---

## Key Takeaways for Instructors

1. **Responsible AI is now ~2.5× heavier** (15–20% vs 7%) — give it a full hour, not a token segment
2. **Lead with the paradigm shift**: Don't bury Agent Mode at the end
3. **Model selection is now a skill**: Teach when to use which model
4. **Plan Mode builds trust**: Always demo it before Agent Mode
5. **The distinctions matter**: Agent Mode ≠ Edit Mode ≠ Coding Agent; prompt files ≠ instructions files
6. **CLI is first-class** in the new blueprint — install steps and session usage are testable
7. **Org policy + audit log + REST API** are explicitly called out — don't skip the admin surface
8. **Testing is no longer its own domain** — it lives inside "Improve developer productivity"

---

*Aligned to the official January 2026 GH-300 blueprint. See [`exam-metadata/GH-300-Study-Guide-April-2026.md`](exam-metadata/GH-300-Study-Guide-April-2026.md) for the full objective list.*

*Last updated: April 2026*
