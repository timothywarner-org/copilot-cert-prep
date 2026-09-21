# GH-300 study guide

**Baseline: skills measured August 7, 2026. Reviewed September 20, 2026.**

Use [the official study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300) for scope and [the full local objectives](../references/gh300-objectives.md) for a checklist. The [exam notes](exam-notes-and-links.md) cover scheduling.

## Study for decisions

| Domain | Weight | Explain or demonstrate before calling yourself ready |
|---|---:|---|
| Responsible use | 15-20% | Find a fabricated API, explain human accountability, identify privacy/bias/security risks, and validate a proposed mitigation |
| Copilot features | 25-30% | Choose inline, Chat, CLI, plan/agent/Edits, review, Spaces, or Spark; explain MCP, sessions, subagents, prompt reuse, and organization controls |
| Data and architecture | 10-15% | Trace relevant context through prompt construction, model processing, filtering/post-processing, and the suggestion the developer reviews |
| Prompt engineering and context | 10-15% | Improve a vague prompt with files, constraints, examples, and acceptance criteria; distinguish zero-shot from few-shot |
| Productivity | 10-15% | Refactor with tests, generate useful documentation/sample data, find edge cases, and evaluate security/performance claims |
| Privacy and safeguards | 10-15% | Distinguish content exclusions, public-code matching, editor settings, policies, ownership, and surface-specific limitations |

## 1. Responsible use

Treat generated code as a proposal. Validate APIs against documentation, dependencies against actual project versions, and behavior against tests. Review privacy, bias, accessibility, and security consequences in the business context.

Know how fairness, reliability/safety, privacy/security, inclusiveness, transparency, and accountability apply to a concrete workplace decision. Avoid choosing a reassuring principle label without connecting it to the risk.

**Evidence:** finish [activity 1](CLASS-ACTIVITIES.md#activity-1-validate-before-trusting-15-minutes) and explain why a syntactically plausible answer can still fail.

Sources: [responsible AI with Copilot](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/), [responsible use](https://docs.github.com/en/copilot/responsible-use).

## 2. Features and administration

Practice enabling Copilot, inspecting relevant editor settings, using inline suggestions, and discussing code in Chat. Compare interactive CLI work with agent work that can edit files and invoke tools. Plan before making a broad change, then review the implementation and tests.

Be able to recognize these choices:

| Capability | Example decision |
|---|---|
| Copilot Edits / agent workflows | Request scoped edits; choose more autonomous tool use only when needed |
| Code review and review instructions | Apply shared review guidance and independently evaluate findings |
| PR summaries | Draft a change summary from evidence in the diff |
| Spaces | Organize shared context for a project |
| Spark | Explore natural-language application creation |
| MCP | Connect a defined external tool or source with explicit trust |
| Sessions / subagents | Separate ongoing tasks and delegated context |
| Organization policies | Control availability and supported behavior across members/surfaces |
| Audit log | Investigate recorded administrative activity; verify actual event coverage |
| Seat/subscription REST API | Automate license administration with authorized access |

**Evidence:** [activity 2](CLASS-ACTIVITIES.md#activity-2-one-task-two-surfaces-15-minutes), a Cert Buddy round trip, and the [quick reference](QUICK-REFERENCE.md).

Sources: [Copilot documentation](https://docs.github.com/en/copilot), [Copilot REST administration](https://docs.github.com/en/rest/copilot/copilot-user-management), [organization policy](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies).

## 3. Data and architecture

Use a concrete trace: a request plus available context is assembled for the model, processed into a response, subjected to applicable handling/filtering, and presented for review. Context may include selected files, conversation, retrieved material, and tool results. Availability depends on the product, permissions, and request.

Do not infer that the model has read every file, retained the entire conversation forever, or proved the answer. Distinguish model knowledge from retrieved evidence. Context limits and incomplete inputs can cause omissions.

**Evidence:** draw the lifecycle for a request to explain `src/app.js`; name a potential failure at each stage.

Source: [Copilot concepts](https://docs.github.com/en/copilot/concepts), [context in VS Code](https://code.visualstudio.com/docs/chat/copilot-chat-context).

## 4. Prompt engineering and context

Specify the goal, attach relevant context, constrain scope, and define observable success. Zero-shot requests provide no worked example; few-shot requests demonstrate the desired pattern. Examples should teach the behavior without exposing secrets or embedding contradictory instructions.

Conversation history helps, but a fresh session may be useful when unrelated context accumulates. Inspect which files and tools were actually used. Treat retrieved instructions as potentially untrusted content.

**Evidence:** finish [activity 3](CLASS-ACTIVITIES.md#activity-3-context-changes-the-answer-10-minutes) and explain the effect of each added constraint.

Source: [prompt engineering for Copilot](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering).

## 5. Productivity, testing, and security

Use Copilot to accelerate a reviewed workflow: explain unfamiliar code, propose a refactor, write tests, improve documentation, generate fictional sample data, and identify performance/security concerns. Ask for edge cases and precise assertions. A generated test can repeat the same mistake as generated code.

Measure outcomes alongside activity. More generated lines or accepted completions do not establish time saved, customer value, or secure code. The [metrics tour](../copilot-metrics-tour/README.md) makes this distinction visible with synthetic data.

**Evidence:** [activity 4](CLASS-ACTIVITIES.md#activity-4-tests-and-safeguards-10-minutes), passing meaningful tests, and a review of remaining risks.

Source: [Copilot usage metrics](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics).

## 6. Privacy and safeguards

Choose the control that addresses the stated risk. A matching-public-code filter is different from content exclusion, secret handling, tool approval, and vulnerability testing. Check the exact account plan and product surface before making a policy claim.

Current documentation excludes IDE Edit and Agent modes from content-exclusion support. Current CLI documentation describes exclusion support for Business/Enterprise. Do not transfer one surface's limitation to every product.

**Evidence:** justify mock Q6 and explain why a repository hook is not a centrally enforced security boundary.

Sources: [content exclusion](https://docs.github.com/en/copilot/concepts/context/content-exclusion), [CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli), [policy support](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies).

## Tonight's study plan: 60 minutes

1. **10 minutes:** rate all six domains strong, moderate, weak, or unknown. Name evidence behind each rating.
2. **20 minutes:** work one practical exercise in the weakest high-weight area.
3. **15 minutes:** answer original questions one at a time; explain why every distractor fails.
4. **10 minutes:** revisit official sources for missed decisions.
5. **5 minutes:** schedule the next practice session and define its success check.

Hooks, the Agents window, and enterprise managed settings are current-product enrichment. They help explain governance and workflows; do not treat every preview or JSON property as a separately named exam objective.
