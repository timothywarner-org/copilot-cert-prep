# Hooks and enterprise governance

<!-- allow-missing-path: .github/hooks/tool-use-logger.json | optional file the learner creates during Demo A -->
<!-- allow-missing-path: tool-use-logger.json | cleanup of that optional learner-created file -->
<!-- allow-missing-path: copilot/managed-settings.json | configuration created in the separate enterprise repository -->
<!-- allow-missing-path: managed-settings.json | example file under the separate enterprise repository -->
<!-- allow-missing-path: team-mappings.json | example file under the separate enterprise repository -->
<!-- allow-missing-path: teams/class-demo.json | example file under the separate enterprise repository -->


**Current-product enrichment, reviewed September 20, 2026.** GH-300 names organization policies, safeguards, and agent workflows. It does not name every hook event or managed-settings property as an exam objective.

## The distinction to teach

| Mechanism | Who controls it | What the demonstration proves |
|---|---|---|
| Repository instructions | Anyone who can change the relevant file | The agent receives guidance |
| Repository hook | Repository author, subject to client support/trust | A script runs at a documented event |
| Tool approval | User/client policy | A particular operation requires or receives permission |
| Enterprise managed settings | Authorized enterprise administrators | A supported client receives the configured governance |
| Tests and review | Development team | A change meets the checks actually performed |

A malicious repository can contain malicious hook scripts. Inspect `.github/hooks/`, scripts they call, MCP server commands, and instruction files **before granting workspace trust**. A writable hook is not a tamper-resistant enterprise control.

## Demo A: log one tool event

**Prerequisites:** Node.js 22+, PowerShell 7, and a VS Code build that supports hooks. Hooks are **Preview**. The repository already contains two small teaching hooks; inspect them before use.

The logger is [Log-CopilotToolUse.ps1](../scripts/hooks/Log-CopilotToolUse.ps1). Test its actual script independently of Copilot first:

```powershell
# Direct input proves the logger works; it does not prove VS Code delivered an event.
'{"hook_event_name":"PreToolUse","tool_name":"run_in_terminal","tool_use_id":"class-demo-1","session_id":"class-demo"}' |
    pwsh -NoProfile -File scripts/hooks/Log-CopilotToolUse.ps1
Get-Content logs/copilot-tool-use.ndjson -Tail 1
```

Expected stdout is `{}`. The log records time, event, tool name, tool-use ID, and session ID. It deliberately omits arguments, command text, credentials, and tool output.

To wire it into VS Code, create **`.github/hooks/tool-use-logger.json`** in your classroom copy:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "pwsh -NoProfile -File scripts/hooks/Log-CopilotToolUse.ps1",
        "timeout": 10
      }
    ]
  }
}
```

This requires `pwsh` on the path on the machine executing the hook. Open the repository root as the workspace. Use **Chat: Configure Hooks** to inspect configuration, then start a fresh agent session and request a harmless operation such as listing the repository's Markdown files. Check that a new event appears in the log.

**Success:** the new record corresponds to the actual tool call, and normal approval behavior remains. If no record appears, inspect client version, hook configuration, working directory, and hook diagnostics. Do not claim successful integration from the direct-input test alone.

## Demo B: veto versus automatic approval

The existing [PreToolUse script](../scripts/hooks/prevent-destructive-commands.js) recognizes a few destructive command strings. Exercise the parser without executing the command:

```powershell
# This is JSON piped to a parser, not a shell command being run.
'{"tool_name":"run_in_terminal","tool_input":{"command":"git reset --hard"}}' |
    node scripts/hooks/prevent-destructive-commands.js
'{"tool_name":"run_in_terminal","tool_input":{"command":"git status"}}' |
    node scripts/hooks/prevent-destructive-commands.js
```

The first returns a `deny` decision; the second returns `{}`. Returning `allow` for every unrecognized command would bypass normal user approval for those calls. The pattern matcher is intentionally limited: command aliases, shell syntax, and alternate tools can evade it. Teach it as an event/decision example.

The PostToolUse content check runs after relevant edits. It can flag broken links; it cannot roll back an edit.

**Cleanup:** remove only the optional `tool-use-logger.json` you created. Delete the demo log if desired. Keep the repository's supplied hooks available for inspection.

Sources: [VS Code hooks](https://code.visualstudio.com/docs/agent-customization/hooks), [event and output reference](https://code.visualstudio.com/docs/agents/reference/hooks-reference), [Workspace Trust](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust).

## Demo C: centrally managed configuration

**Instructor demonstration only.** This section supplies reviewable configuration; it does not deploy settings. Use an authorized test enterprise and a licensed test user. Keep a screenshot or observed result available if administration access is unavailable during class.

Server-managed governance uses a designated organization's **`.github-private`** repository. It is separate from this public learner repository. Follow GitHub's setup guide to designate the source, use appropriate internal visibility, and restrict write access.

Start with this file on that repository's default branch:

**`copilot/managed-settings.json`**

```json
{ "model": "auto" }
```

The intended observation is the default for a **new conversation**. This example does not establish a locked model picker or a universal tool-denial policy.

An optional team exception illustrates controlled specialization:

| Path under `.github-private/copilot/` | Content |
|---|---|
| `managed-settings.json` | `{ "model": { "overridable": "auto" } }` |
| `team-mappings.json` | `{ "class-demo.json": ["class-demo-team"] }` |
| `teams/class-demo.json` | `{ "model": "unmanaged" }` |

Use an actual **enterprise team** slug. Confirm the signed-in account receives Copilot from the intended enterprise, refresh the client, and compare a fresh conversation for the standard user and exception user. GitHub documents periodic refresh and refresh on restart/sign-in.

**Success evidence:** saved configuration, correct license/billing context, supported client/property, and the observed behavior. Local JSON validity alone is insufficient.

**Rollback:** restore the previous governance files through a reviewed commit and refresh the clients. Remove only the demo team mapping/settings introduced for the exercise.

For advanced discussion, inspect the [managed-settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings). MCP allowlists have matching rules and exceptions, including default first-party servers. Do not claim that an empty list necessarily disables every built-in tool. Client/property coverage and policy precedence matter.

Sources: [server-managed setup](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started), [deployment methods and precedence](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings).

## Debrief

Explain which control you would choose for each need: consistent project style, a local tool-use log, user approval before execution, or centrally managed configuration. Then explain why none of those choices eliminates the need to validate generated code.
