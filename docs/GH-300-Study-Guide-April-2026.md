# GH-300 Study Guide: GitHub Copilot Certification

> **Blueprint version:** Skills measured as of **January 2026**
> **Source:** [Microsoft Learn — Study guide for Exam GH-300](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300)
> **Change log note:** This exam changed significantly in January 2026 — new objectives were added, some were removed, existing objectives moved between functional groups, and all were reworded.

---

## At a Glance

| Item | Detail |
|---|---|
| Exam code | GH-300 |
| Credential | [GitHub Copilot](https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/) |
| Level | Intermediate |
| Maintained by | GitHub (delivered via Microsoft) |
| Passing score | **700 / 1000** |
| Validity | **2 years** from achievement date |
| Renewal | Free online assessment on Microsoft Learn |
| Exam sandbox | https://aka.ms/GHExamDemo-enu |
| Languages | English, Japanese, Korean, Portuguese (Brazil), Spanish |
| Question types | Most questions cover **GA features**; commonly used **Preview features** may also appear |

### Audience profile

Candidates should have expertise in using GitHub Copilot to improve software development productivity, quality, and security. This includes responsible AI use, prompt engineering, Copilot features across plans, and privacy safeguards. Familiarity with GitHub fundamentals and at least one programming language is expected.

---

## Skills Measured — January 2026 Blueprint

The official MS Learn page renders **six** functional groups (one of which is shown twice in the page header — a known display quirk). The substantive blueprint is:

| # | Functional Group | Weight |
|---|---|---|
| 1 | Use GitHub Copilot responsibly | **15–20%** |
| 2 | Use GitHub Copilot features | **25–30%** |
| 3 | Understand GitHub Copilot data and architecture | **10–15%** |
| 4 | Apply prompt engineering and context crafting | **10–15%** |
| 5 | Improve developer productivity with GitHub Copilot | **10–15%** |
| 6 | Configure privacy, content exclusions, and safeguards | **10–15%** |

> **What changed from the prior blueprint?** Responsible AI grew from 7% to 15–20%. Plans-and-features content was merged into a broader "Use GitHub Copilot features" group (25–30%) that now explicitly covers **Copilot CLI, Agent Mode, Edit Mode, MCP, Sub-Agents, Spaces, Spark, and org-wide policy management**. Testing is no longer its own domain — it sits inside "Improve developer productivity."

---

## Domain 1 — Use GitHub Copilot responsibly (15–20%)

### Understand responsible AI principles

- Describe **risks and limitations** of generative AI tools
- Describe **ethical and responsible AI usage**
- Identify **potential harms** and **mitigation strategies** of AI usage

### Validate and operate AI tools

- Explain the **need to validate AI output**
- Identify how to **operate GitHub Copilot responsibly**

### Study anchors

- [Responsible AI with GitHub Copilot (MS Learn module)](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/)
- GitHub Trust Center: https://github.com/trust-center

---

## Domain 2 — Use GitHub Copilot features (25–30%)

This is the heaviest-weighted group. Expect scenario-based questions across **four sub-areas**.

### 2A. Use GitHub Copilot in the IDE

- **Enable Copilot** in the IDE
- **Trigger Copilot** through:
  - Inline suggestions
  - Chat
  - **CLI**
  - **Plan Mode**
- **Exclude specific files or repositories** (app knowledge of content exclusions)

### 2B. Use GitHub Copilot CLI

- Define **what Copilot CLI is** and how it benefits developers
- Identify the **steps for installing** Copilot CLI
- Describe **key CLI features and commands**
- Use Copilot CLI **interactively** and **in sessions**
- **Generate scripts** and **manage files** via Copilot CLI

### 2C. Use GitHub Copilot features and capabilities

- Use **Agent Mode**, **Edit Mode**, and **MCP** for enhanced workflows
- Manage **Agent Sessions** and **delegate tasks to Sub-Agents** for optimized context usage
- Use Copilot for **code review** and coding assistance
- Utilize **Spaces**, **Spark**, **PR summaries**, and **customizable review standards via instructions files**
- Understand **limits, options, feedback, and commands of Copilot Chat**, including **prompt file reuse** for consistent responses

### 2D. Manage organization-wide settings and policies

- Configure **organization-wide policy management**
- Enable **Copilot Code Review policies**
- Manage **feature availability across IDEs and github.com**
- Utilize **audit log events**
- **Manage subscriptions using the REST API**

### Study anchors

- [GitHub Copilot plans and features](https://docs.github.com/copilot/about-github-copilot/plans-for-github-copilot)
- [Advanced GitHub Copilot features (MS Learn module)](https://learn.microsoft.com/training/modules/advanced-github-copilot/)
- [Management and customization considerations (MS Learn module)](https://learn.microsoft.com/training/modules/github-copilot-management-and-customizations/)

---

## Domain 3 — Understand GitHub Copilot data and architecture (10–15%)

### Describe data handling and flow

- Explain **data usage, flow, and sharing**
- Describe **input processing and prompt building**
- Explain **proxy filtering and post-processing**

### Understand lifecycle and limitations

- **Visualize the code suggestion lifecycle**
- Describe **limitations of LLMs and Copilot**

### Study anchors

- [How GitHub Copilot works and handles data — Trust Center](https://github.com/trust-center)

---

## Domain 4 — Apply prompt engineering and context crafting (10–15%)

### Craft effective prompts

- Describe **prompt structure and context**
- Understand **how context is determined**
- Use **zero-shot and few-shot** prompting
- Apply **best practices for prompt crafting**

### Engineer prompts for performance

- Explain **prompt engineering principles**
- Describe **prompt process flow** and **chat history usage**

### Study anchors

- [Prompt engineering for Copilot Chat](https://docs.github.com/copilot/using-github-copilot/copilot-chat/prompt-engineering-for-copilot-chat)

---

## Domain 5 — Improve developer productivity with GitHub Copilot (10–15%)

### Enhance productivity and code quality

- Use Copilot for **code generation, refactoring, and documentation**
- **Accelerate learning** and **reduce context switching**
- **Generate sample data** and **modernize legacy code**

### Support testing and security

- Generate **unit and integration tests**
- Identify **edge cases** and write **assertions**
- Suggest **security improvements** and **performance optimizations**

### Study anchors

- [Developer use cases for AI with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/developer-use-cases-for-ai-with-github-copilot/)
- [Develop unit tests using GitHub Copilot tools](https://learn.microsoft.com/en-us/training/modules/develop-unit-tests-using-github-copilot-tools/)

---

## Domain 6 — Configure privacy, content exclusions, and safeguards (10–15%)

### Manage privacy settings and exclusions

- Configure **content exclusions** and **editor settings**
- Describe **ownership** and **limitations of outputs**

### Apply safeguards and troubleshoot

- Enable **duplication detection** and **security warnings**
- **Resolve issues** with suggestions and exclusions

### Study anchors

- [Configuring and auditing content exclusion](https://docs.github.com/copilot/managing-copilot/configuring-and-auditing-content-exclusion)

---

## Memorize-These Distinctions

| Concept pair | What to remember |
|---|---|
| **Agent Mode** vs **Coding Agent** | Agent Mode runs **in your IDE** (local, chat-triggered, direct file edits, Plan Mode review). Coding Agent runs **in GitHub Actions** (cloud, issue-assigned, opens a PR for review). |
| **Edit Mode** vs **Agent Mode** | Edit Mode = scoped multi-file edits with explicit file targets. Agent Mode = autonomous task execution with sub-agents and MCP tools. |
| **Sub-Agents** | Delegated tasks within an Agent Session that **optimize context usage** by isolating concerns. |
| **MCP** | Model Context Protocol — how Copilot connects to external tools, data, and services. |
| **Spaces** vs **Spark** | Spaces = curated context bundles for teams. Spark = AI-driven app/prototype builder. |
| **Inline suggestions** vs **Chat** vs **CLI** vs **Plan Mode** | The four primary trigger surfaces — know each one's input style and output behavior. |
| **Content exclusions** vs **Duplication detection** | Exclusions block files/repos from being sent. Duplication detection blocks suggestions that match public code. |
| **Prompt files** vs **Instructions files** | Prompt files = reusable prompts. Instructions files = persistent review/coding standards. |

---

## Tim's Test-Taking Tips

1. **Read for the trigger surface.** Many questions hinge on whether the scenario is IDE-local (Agent Mode) vs cloud (Coding Agent) vs CLI.
2. **Plan Mode is a feature, not a product.** It's the preview/approve gate inside Agent Mode.
3. **REST API for subscription management** is explicitly called out — know that org admins manage seats programmatically.
4. **Audit log events** appear in the org-policy sub-area — review what Copilot events are logged.
5. **Validate AI output** is a recurring theme — when in doubt, the responsible answer is "review before merge."
6. **Most questions target GA features**, but commonly used Preview features (Spark, Cloud Agent in VS) can show up.
7. **700 to pass.** No partial credit per item; budget your time and flag-and-return.

---

## Official Study Resources

| Resource | Link |
|---|---|
| Official study guide | https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300 |
| Certification page | https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/ |
| Instructor-led course (GH-300T00-A) | https://learn.microsoft.com/training/courses/gh-300t00 |
| GitHub Copilot Fundamentals — Part 1 | https://learn.microsoft.com/en-us/training/paths/copilot/ |
| GitHub Copilot Fundamentals — Part 2 | https://learn.microsoft.com/en-us/training/paths/gh-copilot-2/ |
| Copilot product docs | https://docs.github.com/copilot |
| Trust Center | https://github.com/trust-center |
| Exam sandbox | https://aka.ms/GHExamDemo-enu |
| Score reports | https://learn.microsoft.com/en-us/credentials/certifications/exam-scoring-reports |
| Renewal | https://learn.microsoft.com/en-us/credentials/certifications/renew-your-microsoft-certification |

---

*Compiled from the official Microsoft Learn GH-300 study guide (January 2026 blueprint). For Tim Warner's O'Reilly Live Learning class.*
