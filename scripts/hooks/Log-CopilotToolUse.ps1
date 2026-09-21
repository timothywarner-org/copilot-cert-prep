<#
.SYNOPSIS
    Records selected PreToolUse event metadata for a classroom hook demonstration.
.DESCRIPTION
    Reads one JSON event through stdin EOF and appends to the repository's ignored
    logs directory. Omits command arguments, tool results, and transcript content
    because they can contain secrets. Emits {} to preserve the client's approvals.
.EXAMPLE
    '{"hook_event_name":"PreToolUse","tool_name":"run_in_terminal","tool_use_id":"demo-1"}' | pwsh -NoProfile -File scripts/hooks/Log-CopilotToolUse.ps1
#>
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
try {
    $eventData = [Console]::In.ReadToEnd() | ConvertFrom-Json -ErrorAction Stop
    if ($null -eq $eventData -or [string]::IsNullOrWhiteSpace($eventData.tool_name)) {
        throw 'Expected a hook event with tool_name.'
    }
    # Resolve from the script location so a changed tool working directory cannot redirect the log.
    $repoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
    $logDirectory = Join-Path $repoRoot 'logs'
    $null = New-Item -ItemType Directory -Path $logDirectory -Force
    $record = [ordered]@{
        timestamp = [DateTimeOffset]::UtcNow.ToString('o')
        event = 'PreToolUse'
        tool_name = [string]$eventData.tool_name
        tool_use_id = [string]$eventData.tool_use_id
        session_id = [string]$eventData.session_id
    }
    # One compact JSON line makes the metadata easy to inspect without recording sensitive inputs.
    $record | ConvertTo-Json -Compress | Add-Content -LiteralPath (Join-Path $logDirectory 'copilot-tool-use.ndjson') -Encoding utf8
    [Console]::Out.WriteLine('{}')
} catch {
    [Console]::Error.WriteLine('Tool-use logging failed. Check the event format and log-directory permissions.')
    exit 1
}
