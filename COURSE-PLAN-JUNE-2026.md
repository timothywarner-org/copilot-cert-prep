# GitHub Copilot Certification Course Plan - June 2026

> Aligned to the official January 2026 GH-300 blueprint, with current-state Copilot/GHEC features added for due diligence where the blueprint has fallen behind.

## Format

- Five instructional segments
- 50 minutes each (S3 may flex to 60 if delivery window permits)
- Total instructional time: 250 minutes
- Delivery note: in a 5-hour block, use short breaks and transition buffers outside these 250 minutes

## Pedagogical Sequence (Not Blueprint Order)

**Start → Use → Think → Govern → Ship.** Habits before tools, tools before internals, internals before policy, policy before integrative practice. Coverage targets 100% of January 2026 GH-300 objectives plus essential post-blueprint features.

Legend for feature lists: **[GH-300]** = on the blueprint. **[Beyond]** = current Copilot/GitHub Enterprise Cloud feature not yet on GH-300 but operationally required.

---

## Segment 1 (50 min): Start — Responsible Operation

### Outcomes

- Explain responsible AI risks, limitations, harms, and mitigations
- Apply a validation-first workflow for Copilot output
- Recognize the four primary trigger surfaces (preview only)

### Agenda

1. Why GH-300 changed in January 2026 and what shifted in weights (5 min)
2. Responsible AI principles and concrete safeguards (15 min)
3. Validation workflow with two worked examples: a hallucinated API and an insecure suggestion (20 min)
4. Trigger-surface preview: inline, chat, CLI, Plan Mode (5 min, deferred deep dive to S2)
5. Lab: identify a risk in a generated snippet, produce a safer revision with rationale (5 min)

### Features to explain and demo

- **[GH-300]** Responsible AI principles for Copilot
- **[GH-300]** Risks, limitations, harms, mitigations
- **[GH-300]** Validation gates: review, test, security scan before merge
- **[GH-300]** Operate-responsibly checklist
- **[GH-300]** Trigger-surface inventory: inline, chat, CLI, Plan Mode (preview)
- **[Beyond]** Copilot Trust Center commitments and what GitHub does *not* do with your code
- **[Beyond]** Public-code matching as a responsibility lever (preview, deep dive in S4)
- **[Beyond]** Hallucination patterns specific to code: phantom APIs, wrong package names, deprecated syntax

---

## Segment 2 (50 min): Use — Hands on the Wheel

### Outcomes

- Enable Copilot across IDE surfaces and configure it correctly
- Drive inline, Chat, and CLI workflows with confidence
- Recognize when each surface is the right tool

### Agenda

1. IDE enablement, settings, and per-language toggles (10 min)
2. Inline suggestions: accepting, partial-accepting, multi-suggestion cycling (5 min)
3. Copilot Chat: limits, options, slash commands, context variables, prompt files for reuse (15 min)
4. Copilot CLI: install, interactive mode, sessions, script generation, file management (15 min)
5. Lab: complete one Chat task and one CLI task on the same problem, compare outputs (5 min)

### Features to explain and demo

- **[GH-300]** Enable Copilot in the IDE (VS Code primary, JetBrains/Visual Studio noted)
- **[GH-300]** Inline suggestions trigger and behavior
- **[GH-300]** Copilot Chat limits, options, feedback, commands
- **[GH-300]** Prompt file reuse for consistent responses
- **[GH-300]** Copilot CLI: definition, benefits, install, key commands
- **[GH-300]** CLI interactive use and session-based use
- **[GH-300]** CLI script generation and file management
- **[Beyond]** `@workspace`, `@vscode`, `@terminal`, `@github` chat participants
- **[Beyond]** Slash commands: `/explain`, `/fix`, `/tests`, `/doc`, `/new`, `/review`
- **[Beyond]** Context variables: `#file`, `#selection`, `#codebase`, `#fetch`, `#problems`, `#changes`
- **[Beyond]** Multi-model picker in Chat (GPT, Claude, Gemini families) — selection criteria, not model trivia
- **[Beyond]** Copilot in the terminal vs Copilot CLI (different products, common confusion)
- **[Beyond]** Custom instructions at user, repo, and org scope (`.github/copilot-instructions.md`, `.instructions.md` files)

---

## Segment 3 (60 min, flex from 50): Think — How Copilot Reasons

### Outcomes

- Distinguish Agent Mode, Edit Mode, Coding Agent, and Cloud Agent without prompting
- Trace data through Copilot's suggestion lifecycle
- Construct prompts that exploit context determination rules

### Agenda

1. Agent Mode and Edit Mode: when each fits, Plan Mode preview gate (10 min)
2. MCP, Agent Sessions, Sub-Agents, Spaces, Spark, PR summaries, instructions files (15 min)
3. Data usage, flow, sharing; input processing, proxy filtering, post-processing (10 min)
4. Suggestion lifecycle visualization and LLM/Copilot limitations (5 min)
5. Prompt structure, context determination, zero-shot vs few-shot, chat history boundaries (10 min)
6. Lab: rewrite a weak prompt into a high-context prompt, compare across two models (10 min)

### Features to explain and demo

- **[GH-300]** Agent Mode (IDE-local, multi-file, Plan Mode review)
- **[GH-300]** Edit Mode (scoped multi-file edits with explicit targets)
- **[GH-300]** MCP (Model Context Protocol) for external tools/data
- **[GH-300]** Agent Sessions
- **[GH-300]** Sub-Agents for context optimization
- **[GH-300]** Spaces (curated team context bundles)
- **[GH-300]** Spark (AI app/prototype builder)
- **[GH-300]** PR summaries
- **[GH-300]** Instructions files for review/coding standards
- **[GH-300]** Data flow, input processing, prompt building
- **[GH-300]** Proxy filtering and post-processing
- **[GH-300]** Suggestion lifecycle
- **[GH-300]** LLM and Copilot limitations
- **[GH-300]** Prompt structure, context, zero/few-shot, best practices
- **[GH-300]** Prompt process flow and chat history usage
- **[Beyond]** Mission Control dashboard for agent task management
- **[Beyond]** Coding Agent (cloud, GitHub Actions, issue-assigned) — introduced here, drilled in S5
- **[Beyond]** Cloud Agent in Visual Studio (preview, Business/Enterprise)
- **[Beyond]** MCP Registry and connecting MCP servers (`.vscode/mcp.json`)
- **[Beyond]** Private MCP Registry for org-curated tools
- **[Beyond]** Bring Your Own Key (BYOK) for Azure OpenAI, AWS Bedrock, Google Vertex
- **[Beyond]** Linter integration in Copilot Code Review (ESLint, Pylint, Rubocop)
- **[Beyond]** Context window differences across models and what gets evicted first

---

## Segment 4 (50 min): Govern — Privacy, Policy, and Audit

### Outcomes

- Configure privacy settings and content exclusions correctly at file, repo, and org scope
- Apply org-wide policy management for feature availability and code review
- Interpret audit log events and manage subscriptions programmatically

### Agenda

1. Privacy settings, content exclusions, ownership and limitations of outputs (15 min)
2. Duplication detection and security warnings, troubleshoot exclusion issues (10 min)
3. Org-wide policy management and feature availability across IDE and github.com (10 min)
4. Copilot Code Review policies and review standards via instructions files (5 min)
5. Audit log events and subscription management via REST API (5 min)
6. Lab: configure a policy + exclusion scenario, validate via audit event check (5 min)

### Features to explain and demo

- **[GH-300]** Content exclusions at repo and org scope
- **[GH-300]** Editor settings for privacy
- **[GH-300]** Ownership and limitations of Copilot outputs
- **[GH-300]** Duplication detection (public-code matching)
- **[GH-300]** Security warnings on suggestions
- **[GH-300]** Troubleshooting exclusion and suggestion issues
- **[GH-300]** Organization-wide policy management
- **[GH-300]** Copilot Code Review policies
- **[GH-300]** Feature availability across IDEs and github.com
- **[GH-300]** Audit log events for Copilot
- **[GH-300]** Subscription management via REST API
- **[Beyond]** `.copilotignore` file behavior and precedence vs org exclusions
- **[Beyond]** Per-team Copilot budgets and seat allocation
- **[Beyond]** Copilot metrics API and adoption dashboards
- **[Beyond]** SAML/SSO and enterprise managed users (EMU) implications for Copilot access
- **[Beyond]** Data residency considerations for Enterprise customers
- **[Beyond]** Coding Agent permissions: branch protections, allowed tools, network egress controls
- **[Beyond]** Pre-commit hooks and Copilot — what runs where, what gets logged

---

## Segment 5 (50 min): Ship — Productivity, Distinctions, Exam Transfer

### Outcomes

- Use Copilot end-to-end for generation, refactor, docs, tests, security, and performance
- Pass the most-tested distinction drills cold
- Transfer skills into exam-style scenario reasoning

### Agenda

1. Generation, refactor, docs, sample data, legacy modernization (10 min)
2. Unit + integration tests, edge cases, assertions — dedicated lab subsection (15 min)
3. Security improvements and performance optimizations (5 min)
4. Distinction drills: Agent Mode vs Coding Agent, Edit vs Agent, exclusions vs duplication detection, prompt files vs instructions files, Spaces vs Spark (10 min)
5. Mini mock and debrief, then "what to study tonight" (10 min)

### Features to explain and demo

- **[GH-300]** Code generation across languages
- **[GH-300]** Refactoring suggestions
- **[GH-300]** Documentation generation
- **[GH-300]** Sample data generation
- **[GH-300]** Legacy code modernization
- **[GH-300]** Reduce context switching workflow
- **[GH-300]** Unit and integration test generation
- **[GH-300]** Edge case identification
- **[GH-300]** Assertion writing
- **[GH-300]** Security improvement suggestions
- **[GH-300]** Performance optimization suggestions
- **[GH-300]** Accelerated learning workflow
- **[Beyond]** Copilot Code Review on PRs end-to-end (request review, address comments, re-request)
- **[Beyond]** Coding Agent task assignment from issues, monitoring via Mission Control
- **[Beyond]** Copilot Workspace for issue-to-PR planning (where available)
- **[Beyond]** Test-first prompting patterns: writing the test, then asking Copilot for the implementation
- **[Beyond]** Eval-and-iterate loops: generate, run tests, feed failures back to Chat
- **[Beyond]** Copilot's role in incident response: reproducing bugs, generating regression tests
- **[Beyond]** When to *not* use Copilot: cryptography, license-sensitive code, regulated outputs

---

## GH-300 Objective Coverage Matrix (100%)

| GH-300 Study Guide Objective                                  | Covered In           |
| ------------------------------------------------------------- | -------------------- |
| D1: Risks and limitations of generative AI                    | S1                   |
| D1: Ethical and responsible AI usage                          | S1                   |
| D1: Potential harms and mitigation strategies                 | S1                   |
| D1: Need to validate AI output                                | S1, S5               |
| D1: Operate GitHub Copilot responsibly                        | S1, S4               |
| D2A: Enable Copilot in IDE                                    | S2                   |
| D2A: Trigger via inline suggestions                           | S1, S2               |
| D2A: Trigger via chat                                         | S1, S2               |
| D2A: Trigger via CLI                                          | S1, S2               |
| D2A: Trigger via Plan Mode                                    | S1, S3               |
| D2A: Exclude specific files/repositories                      | S4                   |
| D2B: Define Copilot CLI and benefits                          | S2                   |
| D2B: CLI install steps                                        | S2                   |
| D2B: CLI features and commands                                | S2                   |
| D2B: CLI interactive and sessions                             | S2                   |
| D2B: Script generation and file management                    | S2                   |
| D2C: Agent Mode, Edit Mode, MCP usage                         | S3                   |
| D2C: Agent Sessions and Sub-Agents                            | S3                   |
| D2C: Code review and coding assistance                        | S3, S5               |
| D2C: Spaces, Spark, PR summaries, instructions files          | S3, S4               |
| D2C: Chat limits/options/commands and prompt file reuse       | S2                   |
| D2D: Organization-wide policy management                      | S4                   |
| D2D: Enable Copilot Code Review policies                      | S4                   |
| D2D: Manage feature availability across IDE/github.com        | S4                   |
| D2D: Utilize audit log events                                 | S4                   |
| D2D: Manage subscriptions via REST API                        | S4                   |
| D3: Data usage, flow, and sharing                             | S3                   |
| D3: Input processing and prompt building                      | S3                   |
| D3: Proxy filtering and post-processing                       | S3                   |
| D3: Visualize suggestion lifecycle                            | S3                   |
| D3: Describe LLM/Copilot limitations                          | S3                   |
| D4: Prompt structure and context                              | S3                   |
| D4: How context is determined                                 | S3                   |
| D4: Zero-shot and few-shot prompting                          | S3                   |
| D4: Prompt crafting best practices                            | S3                   |
| D4: Prompt engineering principles                             | S3                   |
| D4: Prompt process flow and chat history usage                | S3                   |
| D5: Code generation, refactoring, documentation               | S5                   |
| D5: Accelerate learning and reduce context switching          | S5                   |
| D5: Generate sample data and modernize legacy code            | S5                   |
| D5: Generate unit and integration tests                       | S5                   |
| D5: Identify edge cases and write assertions                  | S5                   |
| D5: Security improvements and performance optimizations       | S5                   |
| D6: Configure content exclusions and editor settings          | S4                   |
| D6: Ownership and limitations of outputs                      | S4                   |
| D6: Enable duplication detection and security warnings        | S4                   |
| D6: Resolve suggestion and exclusion issues                   | S4                   |

Coverage status: 100% of January 2026 GH-300 objectives are mapped, plus 30+ post-blueprint features added for operational completeness.

---

## Quick Instructor Notes

1. S1 is heavier on validation than before — Responsible AI grew from 7% to 15-20% and a single lab is no longer enough.
2. S2 stays operational and narrow: IDE + Chat + CLI only. Agent Mode is deliberately deferred.
3. S3 absorbs the vocabulary load (Agent/Edit/MCP/Sub-Agents/Spaces/Spark) alongside data flow and prompts. Flex to 60 min if the room can absorb it.
4. S4 leads with learner-relevant privacy before admin-relevant policy. The order matters for retention.
5. S5 distinction drills run *before* the mini-mock so the most-tested confusions are in working memory at the gate.

---

Last updated: June 2026
