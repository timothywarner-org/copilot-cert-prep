# Domain 2 practice: Use GitHub Copilot features

**Weight on the exam: 25-30%.** Seventeen original items, the largest bank here because this is the largest domain. These are teaching questions, not real exam content.

Coverage follows the four sub-groups: the IDE, GitHub Copilot CLI, features and capabilities, and organization-wide settings and policies. The command line and the administration items are the ones most study material under-serves.

---

## Q1. No suggestions after installing the extension

**Objective:** Enable Copilot in the IDE · **Bloom:** Apply · **Difficulty:** easy

A developer joining Tailwind Traders installs the GitHub Copilot extension in Visual Studio Code but sees no inline suggestions in any file. The Copilot status indicator reports that the developer is not signed in. What must happen before suggestions appear?

- **A**: The repository must add a Copilot configuration file at the root of the project
- **B**: An administrator must apply the Copilot code review policy to the repository
- **C**: The developer must sign in to a GitHub account that has an active Copilot plan
- **D**: The workspace must be reopened as a trusted folder with agent mode turned on

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: Repositories can carry instructions, prompt, and configuration files that shape Copilot behavior, but none of them enable the product. A project file cannot grant a developer access.
- **B**: Copilot code review is an organization or enterprise policy that governs automated pull request review. It has no bearing on whether inline suggestions appear in an editor.
- **C**: Copilot requires an authenticated GitHub account with an active plan or an assigned seat. The status indicator is reporting exactly that precondition, and signing in resolves it.
- **D**: Workspace Trust governs whether workspace code and tools may execute, and agent mode is one interaction surface among several. Neither is required for inline suggestions.

**Sources:** [Quickstart for using Copilot in your IDE](https://docs.github.com/en/copilot/get-started/quickstart-for-using-github-copilot-in-your-ide) · [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/setup/copilot)

</details>

---

## Q2. Understanding an unfamiliar module

**Objective:** Trigger Copilot through inline suggestions, chat, CLI, and agent mode · **Bloom:** Apply · **Difficulty:** easy

A Fabrikam developer needs to understand how an unfamiliar authentication module behaves across two files before changing anything. Which Copilot surface is the best fit for that request?

- **A**: Chat, where the developer supplies both files as context and asks for an explanation
- **B**: Inline suggestions, by typing a descriptive comment at the top of each of the files
- **C**: Agent mode, by asking it to refactor the module and then reading the resulting diff
- **D**: The command line, by piping both files into a single shell prompt for a summary

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: Chat is built for explanation and comparison with supplied context. The developer can provide the relevant files and receive a description of current behavior without changing any code, which is exactly the stated need.
- **B**: Inline suggestions continue code as it is typed. They produce new code rather than an explanation of existing code, and a comment is a weak instrument for asking a question.
- **C**: Agent mode can coordinate edits across files, but the developer explicitly wants to understand the module before changing anything. Refactoring first inverts the order of the task.
- **D**: The command line is a capable surface, but this request is an editor-side reading task with two files already open. Nothing about it requires leaving the editor.

**Sources:** [Asking Copilot questions in your IDE](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide) · [Copilot across environments](https://learn.microsoft.com/en-us/training/modules/github-copilot-across-environments/)

</details>

---

## Q3. How far does an exclusion reach

**Objective:** Configure content exclusions for specific files or repositories · **Bloom:** Analyze · **Difficulty:** hard

Alpine Ski House configures content exclusion for a repository path that holds payment integration code. A developer confirms that inline suggestions no longer draw on those files and asks whether every Copilot interaction is now covered. What should the administrator explain?

- **A**: Exclusions apply uniformly across every Copilot surface as soon as the policy saves
- **B**: Exclusions take effect only after each developer signs out and restarts the editor
- **C**: Exclusions cover the repository owner's own sessions but not those of collaborators
- **D**: Exclusion support differs by surface, so the covered surfaces have to be confirmed

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: This is the assumption the item is built to correct. GitHub documents content exclusion as a per-surface capability, and treating it as universal isolation overstates what the control provides.
- **B**: A propagation delay exists, and a reload can speed it up, but timing is not the developer's question. The question is about scope, not latency.
- **C**: Exclusions are configured at repository, organization, or enterprise scope and apply to the people covered by that scope. Ownership of the repository is not the boundary.
- **D**: Support is documented per surface and per client, and GitHub states that some interaction modes do not honor exclusions. The correct answer to a scope question is to check the current support matrix for the exact surface in use.

**Sources:** [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/content-exclusion) · [Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot)

</details>

---

## Q4. What the command line actually is

**Objective:** Define GitHub Copilot CLI and how it benefits developers · **Bloom:** Understand · **Difficulty:** easy

A Coho Winery platform engineer spends most of the working day in a terminal and wants AI assistance that reads project files, proposes shell commands, and edits files without moving to an editor. Which description matches GitHub Copilot CLI?

- **A**: A Visual Studio Code extension that mirrors editor chat into an integrated terminal
- **B**: A terminal agent that works with project files, commands, and GitHub resources
- **C**: A GitHub Actions workflow that posts suggested commands as pull request comments
- **D**: A browser feature that turns natural language into shell one-liners for copying

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: Copilot CLI is a standalone program, not an extension surface inside the editor. An integrated terminal panel is a different thing from a terminal agent.
- **B**: GitHub documents Copilot CLI as an agent that brings Copilot to the terminal, where it can read and modify project files, run approved commands, and work with repositories, issues, and pull requests. That matches every element of the requirement.
- **C**: Copilot CLI can run programmatically inside automation, but describing it as a workflow that only comments on pull requests understates it and misplaces where it runs.
- **D**: Producing a copyable one-liner describes the retired extension behavior rather than the current product, which edits files and executes approved commands itself.

**Sources:** [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) · [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview)

</details>

---

## Q5. Standardizing the install

**Objective:** Identify the steps for installing GitHub Copilot CLI · **Bloom:** Understand · **Difficulty:** medium

Wide World Importers wants a single documented installation route for GitHub Copilot CLI across its developer workstations, and plans to use npm so that the route is identical on every platform. Which requirement must that standard account for?

- **A**: A GitHub Actions runner has to be registered before the command line can authenticate
- **B**: The retired gh copilot extension must be installed first and then upgraded in place
- **C**: Docker has to be available so that the command line can start its sandbox container
- **D**: Node.js version 22 or later is required for the npm installation route to be usable

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: Authentication uses a GitHub account through a login flow. Actions runners are unrelated to installing or signing in to a developer tool.
- **B**: The current product is a standalone program installed directly. The earlier gh extension is retired and is not an upgrade path to it.
- **C**: Copilot CLI documents sandboxing options, but a container runtime is not a prerequisite for installing it through npm.
- **D**: GitHub documents Node.js 22 or later as the prerequisite for the npm installation route, alongside alternative routes such as WinGet, Homebrew, and an install script. A standard built on npm has to pin that runtime.

**Sources:** [Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli) · [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli)

</details>

---

## Q6. Planning before editing

**Objective:** Describe key GitHub Copilot CLI features and commands · **Bloom:** Apply · **Difficulty:** medium

A Blue Yonder Airlines engineer wants GitHub Copilot CLI to produce a structured implementation plan before it edits any file in the scheduling service. Which approach matches current documentation?

- **A**: Toggle plan mode with Shift+Tab, or run the /plan command from normal mode
- **B**: Export a COPILOT_PLAN environment variable before starting the CLI session
- **C**: Launch the command line with a --plan-only flag that suppresses all writes
- **D**: Open a session and type "plan first" so that the agent infers the intent

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: GitHub documents two entry points to plan mode: pressing Shift+Tab to toggle between normal mode and plan mode, and running /plan from normal mode. Both are current, and knowing that both exist is the point of the item.
- **B**: Environment variables configure some behavior, including model selection, but plan mode is not entered through one.
- **C**: No documented flag of that name exists. Read-only behavior comes from plan mode and from tool permission scoping rather than from a plan-only switch.
- **D**: Phrasing a request as a plan may influence the response, but it does not place the session in plan mode. Relying on inference is exactly what the documented toggle and command replace.

**Sources:** [Best practices for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices) · [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)

</details>

---

## Q7. Picking up yesterday's work

**Objective:** Use GitHub Copilot CLI interactively and in sessions · **Bloom:** Apply · **Difficulty:** medium

A Proseware developer stops partway through a migration task in GitHub Copilot CLI, closes the terminal, and returns the next morning wanting the earlier conversation and its accumulated context. Which documented action restores that work?

- **A**: Run the original prompt again so that the agent rebuilds equivalent context
- **B**: Start the command line in the same directory, which reattaches the last session
- **C**: Use /resume, which opens a picker for restoring a previously recorded session
- **D**: Import the session transcript from the repository .github directory by hand

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: Re-running a prompt starts a new conversation. It may reach a similar place, but it discards the reasoning, decisions, and file context built up in the earlier session.
- **B**: Starting in the same directory sets the working directory and trust scope. It does not automatically reattach a previous conversation.
- **C**: GitHub documents /resume, and the equivalent continue option at launch, as the way to pick a previous session and restore it. That is the purpose-built mechanism for this situation.
- **D**: Sessions are not stored as repository files, and the .github directory holds customization files such as instructions and prompts. There is no transcript there to import.

**Sources:** [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview) · [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)

</details>

---

## Q8. Running it without a human present

**Objective:** Generate scripts and manage files with GitHub Copilot CLI · **Bloom:** Apply · **Difficulty:** hard

Fourth Coffee wants a nightly job that asks GitHub Copilot CLI to summarize the day's commits and write the summary to a file in the repository, with nobody at the keyboard to approve each step. Which capability supports that requirement?

- **A**: Interactive mode alone, because the command line always waits for an approval
- **B**: Programmatic execution with a supplied prompt and scoped tool permissions
- **C**: A GitHub App webhook that starts the command line inside the repository
- **D**: Chat cheat sheet slash commands, which can be attached to a schedule

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: Interactive mode is the default and does prompt for approvals, which is why it is unsuitable here. The documentation describes a separate programmatic interface precisely for unattended use.
- **B**: GitHub documents running Copilot CLI programmatically with a prompt supplied directly, together with flags that allow or deny specific tools. That combination is what makes an unattended, bounded job possible, and scoping the permissions is the part a candidate must not skip.
- **C**: Webhooks deliver events to a listener. They do not themselves run a local agent, and nothing about a webhook addresses approval prompts.
- **D**: The chat cheat sheet documents interactive slash commands for chat surfaces. Those are not scheduled automation primitives.

**Sources:** [Running GitHub Copilot CLI programmatically](https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/run-cli-programmatically) · [CLI programmatic reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-programmatic-reference)

</details>

---

## Q9. Reaching an external system

**Objective:** Use Agent Mode, Copilot Edits, and MCP for enhanced development and workflows · **Bloom:** Apply · **Difficulty:** medium

A Contoso team wants Copilot to answer questions using their internal API reference, which is maintained outside the repository and served by an authenticated internal service. Which capability is designed for that requirement?

- **A**: A repository instructions file that describes the API reference in prose
- **B**: A prompt file that pastes the reference content into every new request
- **C**: Agent mode, which indexes external services automatically once enabled
- **D**: An MCP server, which exposes an external tool or data source to Copilot

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: Instructions files carry durable project guidance and conventions. Describing a reference is not the same as retrieving its current contents.
- **B**: A prompt file captures a reusable request. Embedding a copy of the reference would go stale immediately and would not scale to a full API surface.
- **C**: Agent mode coordinates edits and tool use inside a workspace. It does not discover or index authenticated external services on its own.
- **D**: Model Context Protocol is the documented way to connect an external tool or data source so that Copilot can retrieve from it, with the trust and permission boundary made explicit. That is exactly this requirement.

**Sources:** [About Model Context Protocol](https://docs.github.com/en/copilot/concepts/context/mcp) · [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)

</details>

---

## Q10. Keeping the main thread clean

**Objective:** Manage Agent Sessions and delegate tasks to Sub-Agents for optimized context usage · **Bloom:** Analyze · **Difficulty:** hard

A Northwind Traders developer is midway through a large refactor and needs a bounded research task carried out without filling the main conversation with everything that task has to read. Which mechanism fits the requirement?

- **A**: A subagent, which handles the delegated task separately and returns a result
- **B**: A new session, which begins a fresh conversation and sets aside the refactor
- **C**: A second editor window, which duplicates the workspace and its chat history
- **D**: A pull request comment, which asks the cloud agent to reply inside the thread

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: A subagent takes a delegated task with its own separate context and reports back a result. That is the documented mechanism for optimizing context usage, and it leaves the main conversation focused on the refactor.
- **B**: Starting a new session does produce a clean context, but it abandons the refactor conversation rather than delegating a piece of work out of it. The developer wants both to continue.
- **C**: Opening another window duplicates the view, not the context boundary. Two sessions in one checkout can also edit the same files, which introduces a conflict risk rather than solving a context problem.
- **D**: The cloud agent prepares repository work for review and is a reasonable delegation route for a change. It is not the mechanism for keeping research out of an in-editor conversation.

**Sources:** [About agent management](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/agent-management) · [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)

</details>

---

## Q11. Standards that apply on every review

**Objective:** Utilize customizable review standards via instructions files · **Bloom:** Apply · **Difficulty:** medium

WoodGrove Bank wants Copilot code review to apply the same naming and error-handling standards on every pull request, without a human reviewer restating those standards each time. Which artifact carries them?

- **A**: A prompt file that a reviewer selects by hand at the start of every review
- **B**: A branch ruleset that rejects a pull request when a standard is not followed
- **C**: A custom instructions file that supplies repository-wide review guidance
- **D**: A Copilot Space that holds the team's published engineering handbook

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: Prompt files are invoked deliberately for a task. The requirement is guidance that applies automatically, which is the opposite of a manual selection.
- **B**: Rulesets enforce process conditions such as required checks and approvals. They gate a merge; they do not tell a reviewer what to look for.
- **C**: GitHub documents custom instructions as the way to give Copilot code review repository-wide standards, with path-specific files available when a rule should apply only to part of the tree. That is durable guidance applied without a manual step.
- **D**: A Space curates sources for grounded questions. It is a useful home for a handbook, but it does not attach standards to the review of each pull request.

**Sources:** [Custom instructions for Copilot code review](https://docs.github.com/en/copilot/tutorials/customize-code-review) · [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)

</details>

---

## Q12. Curating shared context

**Objective:** Utilize Spaces, Spark, pull request summaries, and customizable review standards · **Bloom:** Understand · **Difficulty:** medium

An Adventure Works enablement lead wants to assemble a curated set of repositories, documents, and notes about the billing domain so that any team member can ask questions grounded in that specific material. Which capability is intended for this?

- **A**: GitHub Spark, which builds a deployable application from a natural-language brief
- **B**: Copilot Spaces, which organize chosen sources so that answers are grounded in them
- **C**: A pull request summary, which describes a change using evidence drawn from the diff
- **D**: Agent sessions, which maintain separate conversation histories for separate tasks

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: Spark creates applications from natural language. It is worth recognizing by name for the exam, but it builds software rather than curating reference material.
- **B**: Copilot Spaces are documented as a way to gather repositories, files, and free-text knowledge into a shared context that questions are answered against. Grounding answers in a chosen set of sources is the defining purpose.
- **C**: A pull request summary describes one change set. It is scoped to a single pull request rather than to a domain of reference material.
- **D**: Sessions separate conversations. They keep work apart rather than assembling a body of shared source material for a team.

**Sources:** [About GitHub Copilot Spaces](https://docs.github.com/en/copilot/concepts/context/spaces) · [Creating a pull request summary](https://docs.github.com/en/copilot/how-tos/copilot-on-github/copilot-for-github-tasks/create-a-pr-summary)

</details>

---

## Q13. The same request, worded five ways

**Objective:** Understand the limits, options, feedback, and commands of GitHub Copilot Chat, including prompt file reuse · **Bloom:** Apply · **Difficulty:** medium

Tailwind Traders developers type the same multi-step release-check request into Chat every week, and the wording drifts between people, so the responses vary. The team wants one invocable task that produces a consistent response. Which artifact fits?

- **A**: A prompt file in the repository, which developers invoke as a named task
- **B**: An instructions file, which applies to requests automatically as guidance
- **C**: A chat variable, which references a file at the moment a question is asked
- **D**: A custom agent definition, which selects the model used for each request

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: A prompt file stores a reusable task that a developer deliberately invokes, which is what makes the request identical every time it runs. GitHub positions prompt files for exactly this consistency problem.
- **B**: Instructions files supply persistent conventions that shape many different requests. They are context rather than an invocable task, so they cannot make one specific multi-step request repeatable.
- **C**: Chat variables attach a file or selection to a single question. They control what a request sees rather than what the request says.
- **D**: A custom agent defines a role, instructions, and available tools. It shapes how an agent works rather than packaging one named task.

**Sources:** [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet) · [Copilot Chat cheat sheet](https://docs.github.com/en/copilot/reference/chat-cheat-sheet)

</details>

---

## Q14. Where organization policy lives

**Objective:** Configure organization-wide policy management · **Bloom:** Apply · **Difficulty:** medium

A Fabrikam organization owner wants to control which Copilot features are available to organization members and whether suggestions matching public code are permitted. Where is that configured?

- **A**: In a managed settings JSON file on the default branch of a designated repository
- **B**: In each member's personal account settings, which the organization then inherits
- **C**: In a repository ruleset attached to the organization's branch protection rules
- **D**: In the organization's Copilot settings, under the Policies and Models sections

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: Enterprise managed settings are a real mechanism and do use a file on a default branch, but they are an enterprise-level control with a different owner. Confusing the two levels is the trap this item tests.
- **B**: Personal settings let an individually paying user control some options. When a seat comes from an organization, the relevant toggle reflects the organization's policy rather than the other way round.
- **C**: Rulesets govern branches and merges. They have nothing to do with Copilot feature availability.
- **D**: GitHub documents organization Copilot settings with a Policies area for privacy and feature availability and a Models area for model availability, each with an enforcement selection. That is the correct level for this requirement.

**Sources:** [Managing Copilot policies in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) · [Copilot policies for enterprises and organizations](https://docs.github.com/en/copilot/concepts/enterprise/policies)

</details>

---

## Q15. Review every release pull request

**Objective:** Enable Copilot code review policies · **Bloom:** Apply · **Difficulty:** hard

Alpine Ski House wants Copilot to review every pull request that targets the release branch automatically, without a reviewer requesting the review each time. Which combination achieves that?

- **A**: A prompt file that the first human reviewer invokes on each pull request
- **B**: The Copilot code review policy, plus a ruleset that requests the review
- **C**: A scheduled workflow that posts a review as a pull request comment
- **D**: A content exclusion policy limiting which files the reviewer may read

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: A prompt file still requires a person to invoke it, which is the manual step the team wants removed.
- **B**: The policy makes Copilot code review available, and a branch ruleset is what requests the review automatically for pull requests targeting a chosen branch. Both halves are needed, which is why the combination is the answer.
- **C**: A workflow could post text, but it would not be a Copilot code review, and building one duplicates a supported feature badly.
- **D**: Content exclusion restricts what Copilot may use as context. It is a privacy control and does nothing to trigger a review.

**Sources:** [Enabling Copilot code review in your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/enable-copilot-code-review) · [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)

</details>

---

## Q16. Who changed the exclusion settings

**Objective:** Utilize audit log events · **Bloom:** Apply · **Difficulty:** medium

A Coho Winery administrator has to determine who changed the organization's Copilot content exclusion settings and when that change took effect. Which source provides that record?

- **A**: The Copilot usage metrics report, filtered to the day the change occurred
- **B**: The commit history of the .github directory on the repository default branch
- **C**: The audit log, which records Copilot administrative events and the actor
- **D**: The billing statement, which lists configuration changes beside seat charges

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: Usage metrics report aggregate activity such as suggestions and acceptance. They are deliberately not an administrative change record, and they do not identify an actor.
- **B**: Content exclusion configured at organization scope is a settings change, not a file commit. A repository-scoped exclusion file would show in history, but the question describes the organization setting.
- **C**: GitHub documents audit log events for Copilot, including an event recorded when content exclusion settings change, with the actor and timestamp. Searching the audit log is the documented investigation route.
- **D**: Billing records seat assignment and charges. It carries no record of policy configuration.

**Sources:** [Reviewing audit logs for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) · [Reviewing changes to content exclusions](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/review-changes)

</details>

---

## Q17. Seats driven by the identity system

**Objective:** Manage subscriptions using the REST API · **Bloom:** Apply · **Difficulty:** medium

Proseware wants to assign and remove Copilot seats automatically as employees join and leave, driven by the identity system it already operates. Which approach matches documented support?

- **A**: A webhook that assigns a seat automatically when a user accepts an invitation
- **B**: A workflow that edits the organization's billing settings file in a repository
- **C**: A nightly export from the audit log that reconciles seat counts after the fact
- **D**: The Copilot user management REST API, called with an appropriately scoped token

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: Webhooks notify a listener that something happened. A notification still needs something to act on it, and membership is not the same as a Copilot seat.
- **B**: Billing settings are not stored as a repository file that a workflow can edit. This describes a mechanism that does not exist.
- **C**: The audit log records what already happened. Reconciling after the fact reports drift rather than preventing it, and it cannot assign a seat.
- **D**: GitHub publishes REST endpoints for Copilot user management, including adding and removing seats for selected users or teams, with documented token scopes. Driving those endpoints from the identity system is the supported automation route.

**Sources:** [REST endpoints for Copilot user management](https://docs.github.com/en/rest/copilot/copilot-user-management) · [Managing Copilot policies in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies)

</details>
