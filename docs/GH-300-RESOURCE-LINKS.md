# GH-300 resource links, mapped to the exam objectives

**Baseline:** [skills measured August 7, 2026](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300).
**Every link on this page was fetched over HTTP on September 23, 2026.** Re-check with `npm run check:links` before each delivery.

Every resource here is **first-party**: Microsoft Learn, GitHub Docs, GitHub's terms and trust pages, or Visual Studio Code documentation. No third-party courses, no blogs, no exam dumps. Each row names the objective bullet it serves, so a weak domain maps straight to a reading list.

**Type** is one of **Concept** (what it is and why), **Training** (hands-on module or path, usually with a knowledge check), or **Reference** (settings, syntax, commands, terms).

## Start here

| Resource | Type | Use it for |
|---|---|---|
| [GH-300 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300) | Reference | The authoritative objective list and change log. Everything else is downstream of this page. |
| [GitHub Copilot Fundamentals, Part 1](https://learn.microsoft.com/en-us/training/paths/copilot/) | Training | Guided path covering responsible AI, prompt engineering, and core features. |
| [GitHub Copilot Fundamentals, Part 2](https://learn.microsoft.com/en-us/training/paths/gh-copilot-2/) | Training | Guided path covering administration, customization, and advanced workflows. |
| [GitHub Trust Center](https://github.com/trust-center) | Reference | The study guide's named source for how Copilot handles data. |
| [This repository's study guide](GH-300-STUDY-GUIDE.md) | Concept | The decision-level summary, with the local [objective checklist](../references/gh300-objectives.md). |

---

## 1. Use GitHub Copilot responsibly (15-20%)

| Objective bullet | Resource | Type |
|---|---|---|
| All three responsible AI principle bullets | [Responsible AI with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/) | Training |
| Describe ethical and responsible AI usage | [Microsoft and GitHub's six principles of responsible AI](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai) | Concept |
| Identify potential harms and mitigation strategies | [Mitigate AI risks](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/2-manage-ai-risks) | Concept |
| Describe risks and limitations of generative AI tools | [Responsible use of GitHub Copilot features](https://docs.github.com/en/copilot/responsible-use) | Concept |
| Risks and limitations; harms and mitigations | [Application card: inline suggestions](https://docs.github.com/en/copilot/responsible-use/inline-suggestions) | Concept |
| Risks and limitations; the need to validate output | [Application card: Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat) | Concept |
| Identify potential harms and mitigation strategies | [Application card: Copilot agents](https://docs.github.com/en/copilot/responsible-use/agents) | Concept |
| Explain the need to validate AI output | [Review AI-generated code](https://docs.github.com/en/copilot/tutorials/review-ai-generated-code) | Training |
| Identify how to operate GitHub Copilot responsibly | [Best practices for using GitHub Copilot](https://docs.github.com/en/copilot/get-started/best-practices) | Concept |

**Teaching note.** The six principles are **fairness**, **reliability and safety**, **privacy and security**, **inclusiveness**, **transparency**, and **accountability**. Exam items give a scenario and expect the principle. Drill the pairing, not the list: state the harm, then the mitigation that addresses it.

---

## 2. Use GitHub Copilot features (25-30%)

The heaviest domain. Split by sub-group.

### Copilot in the IDE

| Objective bullet | Resource | Type |
|---|---|---|
| Enable Copilot in the IDE | [Quickstart for using Copilot in your IDE](https://docs.github.com/en/copilot/get-started/quickstart-for-using-github-copilot-in-your-ide) | Concept |
| Enable Copilot in the IDE | [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/setup/copilot) | Concept |
| Trigger inline, chat, CLI, and agent mode | [Asking Copilot questions in your IDE](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide) | Concept |
| Trigger inline, chat, CLI, and agent mode | [Copilot across environments](https://learn.microsoft.com/en-us/training/modules/github-copilot-across-environments/) | Training |
| Configure content exclusions | [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/content-exclusion) | Concept |
| Configure content exclusions | [Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) | Reference |

### Copilot CLI

| Objective bullet | Resource | Type |
|---|---|---|
| Define the CLI and how it benefits developers | [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) | Concept |
| Identify the steps for installing the CLI | [Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli) | Reference |
| Key CLI features and commands; interactive use and sessions | [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview) | Concept |
| Key CLI features and commands | [Best practices for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices) | Concept |
| Key CLI features and commands | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | Reference |
| **Generate scripts and manage files with the CLI** | [Running Copilot CLI programmatically](https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/run-cli-programmatically) | Reference |
| Generate scripts and manage files with the CLI | [CLI programmatic reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-programmatic-reference) | Reference |

**Two things to say out loud.** The current product is the standalone `copilot` binary, not the retired `gh copilot` extension; any material showing `gh copilot explain` is stale. And plan mode has **two** documented entry points, the **Shift+Tab** toggle and the `/plan` command.

### Features and capabilities

| Objective bullet | Resource | Type |
|---|---|---|
| Agent mode, Copilot Edits, MCP | [About Model Context Protocol](https://docs.github.com/en/copilot/concepts/context/mcp) | Concept |
| Agent sessions and sub-agents | [About agent management](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/agent-management) | Concept |
| Copilot for code review and coding assistance | [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review) | Concept |
| Customizable review standards via instructions files | [Custom instructions for Copilot code review](https://docs.github.com/en/copilot/tutorials/customize-code-review) | Concept |
| Spaces | [About GitHub Copilot Spaces](https://docs.github.com/en/copilot/concepts/context/spaces) | Concept |
| Pull request summaries | [Creating a pull request summary](https://docs.github.com/en/copilot/how-tos/copilot-on-github/copilot-for-github-tasks/create-a-pr-summary) | Reference |
| Limits, options, feedback, and commands of Chat | [Copilot Chat cheat sheet](https://docs.github.com/en/copilot/reference/chat-cheat-sheet) | Reference |
| Prompt file reuse | [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet) | Reference |
| Feature availability across IDEs and github.com | [Copilot feature matrix](https://docs.github.com/en/copilot/reference/copilot-feature-matrix) | Reference |

**Two naming gaps that cost marks.** The objectives still say **Copilot Edits**, but current GitHub docs fold it into agent mode and code review. The objectives still say **Spark**, but Spark is sunsetting (see Domain 6's currency notes and the quick reference). Learners who study only the docs will not see either term.

### Organization settings and policies

| Objective bullet | Resource | Type |
|---|---|---|
| Organization-wide policy management | [Managing Copilot policies in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) | Reference |
| Organization-wide policy management | [Copilot policies for enterprises and organizations](https://docs.github.com/en/copilot/concepts/enterprise/policies) | Concept |
| Enable Copilot code review policies | [Enabling Copilot code review in your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/enable-copilot-code-review) | Reference |
| Utilize audit log events | [Reviewing audit logs for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) | Reference |
| Utilize audit log events | [Audit log events for agents](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events) | Reference |
| Manage subscriptions using the REST API | [REST endpoints for Copilot user management](https://docs.github.com/en/rest/copilot/copilot-user-management) | Reference |
| Whole sub-group | [Management and customization considerations](https://learn.microsoft.com/en-us/training/modules/github-copilot-management-and-customizations/) | Training |

---

## 3. Understand GitHub Copilot data and architecture (10-15%)

| Objective bullet | Resource | Type |
|---|---|---|
| Visualize code suggestion lifecycle | [Introduction to prompt engineering with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/) | Training |
| **Explain proxy filtering and post-processing** | [GitHub Copilot user prompt process flow](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/3-github-copilot-user-prompt-process-flow) | Training |
| Explain data usage, flow, and sharing | [GitHub Copilot data](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/4-github-copilot-data) | Training |
| Explain data usage, flow, and sharing | [Hosting of models for GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/model-hosting) | Reference |
| Describe input processing and prompt building | [Application card: inline suggestions](https://docs.github.com/en/copilot/responsible-use/inline-suggestions) | Concept |
| Explain proxy filtering and post-processing | [GitHub Copilot code referencing](https://docs.github.com/en/copilot/concepts/completions/code-referencing) | Concept |
| Describe limitations of LLMs and Copilot | [Understand limitations and measure impact](https://learn.microsoft.com/en-us/training/modules/developer-use-cases-for-ai-with-github-copilot/5-understand-limitations-measure-impact) | Training |

**Teaching note on the proxy.** GitHub Docs does not describe the Copilot proxy tier by name; it uses "proxy" for a customer's own network proxy. The Microsoft Learn process-flow unit is the one first-party page that names it, and it gives seven steps: secure transmission and context gathering, **proxy filter** on a server in a GitHub-owned Microsoft Azure tenant, toxicity filtering, model generation, **post-processing and response validation**, delivery with a feedback loop, then repeat. The matching-public-code check runs in post-processing and applies to suggestions of roughly 150 characters or more.

**Currency caution.** Unit 4 of that module quotes context-window figures that predate current models. Teach the flow from unit 3 and treat those numbers as historical illustration, not current behavior.

---

## 4. Apply prompt engineering and context crafting (10-15%)

| Objective bullet | Resource | Type |
|---|---|---|
| Explain prompt engineering principles | [Introduction to prompt engineering with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/) | Training |
| **Use zero-shot and few-shot prompting** | [Prompt engineering foundations and best practices](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/2-prompt-engineering-foundations-best-practices) | Training |
| Describe prompt structure and context | [Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering) | Concept |
| Describe prompt structure and context | [Best practices for agents in VS Code](https://code.visualstudio.com/docs/agents/best-practices) | Concept |
| Understand how context is determined | [Concepts for providing context to Copilot](https://docs.github.com/en/copilot/concepts/context) | Concept |
| Understand how context is determined | [Add context to chat](https://code.visualstudio.com/docs/chat/copilot-chat-context) | Reference |
| Apply best practices for prompt crafting | [Best practices for using GitHub Copilot](https://docs.github.com/en/copilot/get-started/best-practices) | Concept |
| Apply best practices for prompt crafting | [GitHub Copilot Cookbook](https://docs.github.com/en/copilot/tutorials/copilot-cookbook) | Training |
| Apply best practices; worked example | [Improve code readability](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/refactor-code/improve-code-readability) | Training |
| Describe prompt process flow and chat history usage | [Optimize Copilot Chat context](https://docs.github.com/en/copilot/tutorials/optimize-chat-usage) | Reference |

**Vocabulary gap worth teaching.** GitHub Docs says "give examples." It does not use the words **zero-shot** or **few-shot**. Microsoft Learn supplies the exam vocabulary. Teach both mappings, or learners will read the right guidance and still miss the item.

---

## 5. Improve developer productivity with GitHub Copilot (10-15%)

| Objective bullet | Resource | Type |
|---|---|---|
| Code generation, refactoring, and documentation | [Develop code features using Copilot tools](https://learn.microsoft.com/en-us/training/modules/develop-code-features-using-github-copilot-tools/) | Training |
| Code generation, refactoring, and documentation | [Generate documentation using Copilot tools](https://learn.microsoft.com/en-us/training/modules/generate-documentation-using-github-copilot-tools/) | Training |
| Code generation, refactoring, and documentation | [Implement code improvements using Copilot tools](https://learn.microsoft.com/en-us/training/modules/implement-code-improvements-using-github-copilot-tools/) | Training |
| **Accelerate learning and reduce context switching** | [Developer use cases for AI with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/developer-use-cases-for-ai-with-github-copilot/) | Training |
| Accelerate learning and reduce context switching | [Using Copilot to explore a codebase](https://docs.github.com/en/copilot/tutorials/explore-a-codebase) | Concept |
| **Modernize legacy code** | [Using Copilot to reduce technical debt](https://docs.github.com/en/copilot/tutorials/reduce-technical-debt) | Concept |
| Modernize legacy code | [Translating code to a different language](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/refactor-code/translate-code) | Reference |
| **Generate sample data** | [Creating mock objects to abstract layers](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/testing-code/create-mock-objects) | Reference |
| Generate unit and integration tests | [Develop unit tests using Copilot tools](https://learn.microsoft.com/en-us/training/modules/develop-unit-tests-using-github-copilot-tools/) | Training |
| Generate unit and integration tests | [Writing tests with GitHub Copilot](https://docs.github.com/en/copilot/tutorials/write-tests) | Concept |
| Identify edge cases and write assertions | [Generating unit tests](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/testing-code/generate-unit-tests) | Reference |
| Suggest security improvements | [Finding existing vulnerabilities in code](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/analyze-security/find-vulnerabilities) | Reference |
| Suggest performance optimizations | [Refactoring for performance optimization](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/refactor-code/refactor-for-optimization) | Reference |

**Scope reminder.** This domain is wider than test generation. Explaining unfamiliar code, writing documentation, generating fictional sample data, and modernizing legacy code are each named bullets. Items are drawn from all of them, not just testing.

---

## 6. Configure privacy, content exclusions, and safeguards (10-15%)

| Objective bullet | Resource | Type |
|---|---|---|
| All four bullets | [Management and customization considerations](https://learn.microsoft.com/en-us/training/modules/github-copilot-management-and-customizations/) | Training |
| Configure content exclusions and editor settings | [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/content-exclusion) | Concept |
| Configure content exclusions and editor settings | [Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) | Reference |
| Configure content exclusions and editor settings | [Reviewing changes to content exclusions](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/review-changes) | Reference |
| Configure content exclusions and editor settings | [Configuring Copilot in your environment](https://docs.github.com/en/copilot/how-tos/configure-personal-settings/configure-in-ide) | Reference |
| **Describe ownership and limitations of outputs** | [GitHub Generative AI Services Terms](https://github.com/customer-terms/github-generative-ai-services-terms) | Reference |
| Describe ownership and limitations of outputs | [Contractual protections and matching public code](https://learn.microsoft.com/en-us/training/modules/github-copilot-management-and-customizations/3-github-copilot-contractual-protections-disabling-matching-public-code) | Training |
| Describe ownership and limitations of outputs | [Customer Copyright Commitment required mitigations](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/customer-copyright-commitment) | Reference |
| Enable suggestions matching public code filtering | [Managing Copilot policies for your account](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies) | Reference |
| Enable suggestions matching public code filtering | [Managing policies for Copilot in your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies) | Reference |
| Resolve issues with suggestions and content exclusions | [Troubleshooting common issues](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues) | Reference |

**The highest-yield connection in this domain.** IP indemnity covers **Copilot Business** and **Copilot Enterprise**. Microsoft Learn states that for GitHub to assume legal responsibility, the **Suggestions matching public code** setting must be set to **Block**. A filter setting and a legal position are different controls, and blocking the filter is what activates the indemnity.

**Currency flag.** The **GitHub Copilot Product Specific Terms** page was archived on **March 5, 2026**. The governing document is the **Generative AI Services Terms** linked above, which uses *Inputs* and *Outputs* rather than *Suggestions* and *Your Code*. Any item stem written against the old wording needs rewriting.

---

## Verification

Every URL on this page was requested over HTTP on **September 23, 2026** and returned a success status at its final address. Links are recorded in their canonical form, after redirects, so a learner lands on the page directly.

```powershell
# Re-check every external link in the course materials.
npm run check:links
```

The checker reports OK, REDIRECT, CHALLENGED, UNREACHABLE, and DEAD, and fails only on DEAD. A REDIRECT result means a link still works but has moved, which is the signal to update this page.
