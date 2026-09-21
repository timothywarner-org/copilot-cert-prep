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
| Build an application from natural language | GitHub Spark | Generated behavior, deployment/access assumptions |
| Retrieve external documentation or tools | MCP server | Server trust, permitted tools, returned evidence |

A **session** has its own conversation and execution context. A **handoff** creates a continuation in the selected environment; inspect that session rather than expecting all activity to appear in the originating chat. A **subagent** handles delegated work with separate context and reports back. Separate sessions in the same checkout can still edit the same files; use isolation when parallel changes could conflict.

Sources: [sessions](https://code.visualstudio.com/docs/agents/concepts/sessions), [Agents window, Preview](https://code.visualstudio.com/docs/agents/run/agents-window), [Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli).

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

Inside the CLI, use `/login` when authentication is needed, `/help` to discover commands supported by your installed version, `/plan` for planning, and `/review` for code review. Describe the task and review requested permissions. These CLI commands are not a promise that identical slash commands exist on every Copilot surface.

Sources: [install](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli), [command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference).

## Safeguards are different controls

| Control | What it addresses | What it does not prove |
|---|---|---|
| Content exclusions | Prevent configured content from participating on supported surfaces | Universal isolation across all agents/modes |
| Suggestions matching public code setting | Controls matching suggestions on supported surfaces | Complete license clearance or vulnerability detection |
| Workspace Trust and tool approvals | Whether workspace code/tools may execute | That trusted repository content is harmless |
| Enterprise managed settings | Centrally managed supported client settings | Enforcement by an unsupported client or feature |
| Tests and human review | Behavior, regressions, maintainability | Complete security assurance from passing tests alone |

**Content exclusions are surface-specific.** Current GitHub documentation says IDE Edit and Agent modes do not support them. Copilot CLI documentation now describes Business/Enterprise exclusion support. Check the exact surface before answering a scenario. A `.copilotignore` file is not a documented substitute for configured policy.

Sources: [exclusions](https://docs.github.com/en/copilot/concepts/context/content-exclusion), [CLI behavior](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli), [policy coverage](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies).

## Model and billing decisions

Choose a model available to the signed-in account, test it on the same bounded task, and compare correctness, latency, and usage. Do not memorize a model roster or assume a named model is included for every learner.

GitHub's current billing documentation describes **AI credits** and token-based usage. Some existing annual subscriptions retain legacy request billing during transition. Check the account's billing model before applying a multiplier or estimating cost.

Sources: [individual billing](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing), [billing transition](https://docs.github.com/en/copilot/reference/copilot-billing/request-based-billing-legacy/what-changed-with-billing).

## A dependable prompt

> In `src/app.js`, improve keyword search for WoodGrove Bank's internal learning catalog. Preserve the JSON schema and current menu. Explain the existing behavior first. Propose the smallest change. Verify case-insensitive matching and no-match behavior, and show the diff.

This supplies a goal, relevant context, constraints, and observable evidence. Review the response before accepting a change.
