# GitHub Copilot quick reference

**Reviewed September 20, 2026.** Use the [GH-300 objectives](../references/gh300-objectives.md) for exam scope and current product documentation for behavior.

## Choose the surface

| Need | Starting point | Evidence to inspect |
|---|---|---|
| Continue a small code expression | Inline suggestions | Accepted code, assumptions, edge cases |
| Understand unfamiliar code | Chat with relevant files/context | Explanation against the actual implementation |
| Plan a change before editing | Plan workflow | Scope, dependencies, acceptance criteria |
| Implement a bounded change across files | Agent workflow | Tool calls, diff, test results |
| Work interactively from a terminal | Copilot CLI | Proposed commands, permissions, working directory |
| Delegate repository work for review | Copilot cloud agent | Branch/PR changes and checks |
| Share curated project context | Copilot Spaces | Included sources, permissions, freshness |
| Build an application from natural language | GitHub Spark (**sunsetting**, see below) | Generated behavior, deployment/access assumptions |
| Retrieve external documentation or tools | MCP server | Server trust, permitted tools, returned evidence |

A **session** has its own conversation and execution context. A **handoff** creates a continuation in the selected environment; inspect that session rather than expecting all activity to appear in the originating chat. A **subagent** handles delegated work with separate context and reports back. Separate sessions in the same checkout can still edit the same files; use isolation when parallel changes could conflict.

Sources: [sessions](https://code.visualstudio.com/docs/agents/concepts/sessions), [Agents window, Preview](https://code.visualstudio.com/docs/agents/run/agents-window), [Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli).

### Spark: on the exam, off the product roadmap

**Exam scope and product availability are different questions.** The August 7, 2026 objectives still name Spark, so recognize what it is: natural-language creation of a full application, with deployment handled for you. But GitHub Spark on github.com **stopped accepting new users and new apps on August 4, 2026**, the app export deadline was August 31, 2026, and every Spark documentation path now redirects to the deprecation changelog. Existing deployed apps keep running.

Teach Spark as a one-line definition, not a demo. If a learner asks to try it, the documented alternatives are VS Code, Copilot CLI, and the GitHub Copilot app.

Source: [deprecation changelog](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/).

## Customization files in this repository

| File or directory | Purpose | Boundary |
|---|---|---|
| `.github/copilot-instructions.md` | Shared project guidance | Instructions are context, not enforced access control |
| `.github/instructions/*.instructions.md` | Scoped guidance | Check the file's `applyTo` |
| `.github/prompts/*.prompt.md` | Reusable task prompts | Select the prompt in Chat; naming comes from its frontmatter |
| `.github/agents/*.agent.md` | Agent role, instructions, tool selection | Tools still need appropriate permissions |
| `.github/skills/*/SKILL.md` | Reusable procedures with supporting files | Follow the selected skill's workflow |
| `.vscode/mcp.json` | MCP server configuration | Connecting a server introduces a tool/data boundary |
| `.github/hooks/*.json` | Event-driven executable hooks, Preview | Inspect scripts before trusting the workspace |

[VS Code customization documentation](https://code.visualstudio.com/docs/agent-customization/overview) and [hooks reference](https://code.visualstudio.com/docs/agents/reference/hooks-reference) describe current support.

## CLI essentials

```powershell
# npm installation uses Node.js 22 or later.
npm install -g @github/copilot
copilot
```

Authenticate with `copilot login`, or `/login` inside the session. Use `/help` to discover the commands your installed version supports.

**Plan mode has two documented entry points:** press **Shift+Tab** to toggle between normal and plan mode, or run `/plan` from normal mode. Both are current.

| Command | Purpose |
|---|---|
| `/plan`, `/review`, `/security-review` | Plan before editing; review changes; review for vulnerabilities |
| `@ <file>`, `/add-dir`, `/list-dirs` | Add a file to context; grant and inspect directory access |
| `/session`, `/session checkpoints`, `/resume` | Inspect the current session; list checkpoints; return to earlier work |
| `/context`, `/compact`, `/clear`, `/new` | Inspect context usage; compact history; start a fresh task |
| `/model`, `/usage`, `/feedback` | Choose a model; view usage; report a problem |
| `/delegate` | Offload the task to the Copilot cloud agent |

These are not a promise that identical slash commands exist on every Copilot surface, so confirm them against your installed version before demonstrating.

The CLI can generate scripts, edit project files, run approved shell commands, and work with pull requests. It installs via npm, WinGet, Homebrew, or the install script, and needs **Node.js 22+** (plus PowerShell v6+ on Windows). Content exclusion is documented for **Copilot Business and Copilot Enterprise**. The current product is the standalone `copilot` binary, not the retired `gh copilot` extension.

Sources: [install](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli), [command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference), [about Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli).

## Safeguards are different controls

| Control | What it addresses | What it does not prove |
|---|---|---|
| Content exclusions | Prevent configured content from participating on supported surfaces | Universal isolation across all agents/modes |
| Suggestions matching public code setting | Controls matching suggestions on supported surfaces | Complete license clearance or vulnerability detection |
| Workspace Trust and tool approvals | Whether workspace code/tools may execute | That trusted repository content is harmless |
| Enterprise managed settings | Centrally managed supported client settings | Enforcement by an unsupported client or feature |
| Tests and human review | Behavior, regressions, maintainability | Complete security assurance from passing tests alone |

**Content exclusions are surface-specific.** Current GitHub documentation says IDE Edit and Agent modes do not support them. Copilot CLI documentation now describes Business/Enterprise exclusion support. Check the exact surface before answering a scenario. A `.copilotignore` file is not a documented substitute for configured policy.

Sources: [exclusions](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion), [CLI behavior](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli), [policy coverage](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies).

### What a public code match looks like

![Archived VS Code screenshot. A Copilot Chat panel reports "Similar code found with 1 license type" beneath a suggestion, with a "View matches" link. Selecting it opened a generated "Code Citations" document, shown in the editor, listing three entries each headed "License: unknown" followed by a URL to the matching public repository file and the overlapping code block.](../images/code-matching-example.png)

When the **Suggestions matching public code** setting is **Allow**, a match is surfaced rather than discarded: Copilot reports that similar code was found, names the license type when it can determine one, and can generate a citations document linking each matching public file. When the setting is **Block**, the suggestion is withheld instead. Note that a license reported as **unknown** is exactly the case that needs a human decision, because no permission has been established.

This is an **archived capture kept for the concept, not for the interface**. Labels, panel placement, and the model shown in the picker have all changed since. Confirm the current interface in your own editor before describing it to a learner.

## Ownership and limitations of output

GitHub does not claim ownership of your input or your output, and you retain any ownership you already have in your input. You also retain responsibility for reviewing, testing, and validating anything you accept. Whether a specific suggestion can be owned at all depends on the intellectual property law where you are, the length of the suggestion, and how functional rather than expressive it is.

**IP indemnity has a condition.** It applies to **Copilot Business and Copilot Enterprise**. Microsoft Learn states that for GitHub to assume legal responsibility, the **Suggestions matching public code** setting must be set to **Block**. That is the exam-relevant link between a filter setting and a legal position: the setting changes which suggestions appear, and blocking it is what activates the indemnity. Neither one transfers your review responsibility.

**Currency note.** The GitHub Copilot Product Specific Terms page was archived on **March 5, 2026**. The governing document is now the **GitHub Generative AI Services Terms**, which uses the wording *Inputs* and *Outputs* rather than *Suggestions* and *Your Code*.

Sources: [Generative AI Services Terms](https://github.com/customer-terms/github-generative-ai-services-terms), [contractual protections and matching public code](https://learn.microsoft.com/en-us/training/modules/github-copilot-management-and-customizations/3-github-copilot-contractual-protections-disabling-matching-public-code), [GitHub Trust Center](https://github.com/trust-center), [responsible use](https://docs.github.com/en/copilot/responsible-use).

## Model and billing decisions

Choose a model available to the signed-in account, test it on the same bounded task, and compare correctness, latency, and usage. Do not memorize a model roster or assume a named model is included for every learner.

GitHub's current billing documentation describes **AI credits** and token-based usage. Some existing annual subscriptions retain legacy request billing during transition. Check the account's billing model before applying a multiplier or estimating cost.

Sources: [individual billing](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing), [billing transition](https://docs.github.com/en/copilot/reference/copilot-billing/request-based-billing-legacy/what-changed-with-billing).

## A dependable prompt

> In `src/app.js`, improve keyword search for WoodGrove Bank's internal learning catalog. Preserve the JSON schema and current menu. Explain the existing behavior first. Propose the smallest change. Verify case-insensitive matching and no-match behavior, and show the diff.

This supplies a goal, relevant context, constraints, and observable evidence. Review the response before accepting a change.
