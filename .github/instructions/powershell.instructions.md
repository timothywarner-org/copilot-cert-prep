---
description: "Apply when writing, reviewing, or explaining PowerShell scripts in this repository — including Azure automation, GitHub API scripts, and Copilot metrics reporting."
name: "PowerShell Authoring Standards"
applyTo: "**/*.ps1"
---

# PowerShell Authoring Standards

## Purpose

This repository includes PowerShell scripts for Azure automation, GitHub Copilot metrics reporting, and organizational governance. These instructions apply to all `.ps1` files in the repository.

## Always Do

- Add a **comment-based help block** at the top of every script and function:

  ```powershell
  <#
  .SYNOPSIS
      One-sentence summary.
  .DESCRIPTION
      Multi-sentence description.
  .PARAMETER ParameterName
      What it controls and valid values.
  .EXAMPLE
      .\Script-Name.ps1 -Parameter Value
  .NOTES
      Author: <name>
      Requires: PowerShell 7+, Az module 11+
  #>
  ```

- Use `[CmdletBinding()]` and a `param()` block for every script that accepts input.
- Follow PowerShell approved verb-noun naming: `Get-`, `Set-`, `New-`, `Remove-`, `Invoke-`.
- Use `Write-Verbose` for diagnostic messages (never `Write-Host` for data).
- Use `Write-Output` (or implicit return) to emit data from functions.
- Wrap all external calls and file operations in `try { } catch { Write-Error $_ }` blocks.
- Validate parameters with `[ValidateNotNullOrEmpty()]`, `[ValidateSet()]`, or custom validators.
- Use `#Requires -Modules ModuleName` at the top of scripts that depend on specific modules.
- Use `#Requires -Version 7.0` when PowerShell 7+ features are used.

## Formatting

- Indent with 4 spaces (no tabs).
- One blank line between function definitions.
- Keep lines under 120 characters; use backtick line continuation sparingly.
- Use `$PascalCase` for variables that hold objects; use `$camelCase` for loop counters and primitives.

## Azure PowerShell (`Az` module)

- Connect with `Connect-AzAccount` at the top of interactive scripts; use managed identity (`-Identity`) in CI/CD.
- Always set the subscription context explicitly:

  ```powershell
  Set-AzContext -SubscriptionId $SubscriptionId
  ```

- Use `-ErrorAction Stop` on `Az` cmdlets inside `try` blocks to ensure exceptions are catchable.
- Prefer `Get-AzResource` with `-Tag` filtering for cost-allocation queries.

## GitHub API PowerShell

- Use `$env:GITHUB_TOKEN` (never hardcode tokens).
- Set the `Authorization` header as `"Bearer $env:GITHUB_TOKEN"`.
- Use `Invoke-RestMethod` with `-Uri`, `-Headers`, and `-Method` explicitly named parameters.
- Handle pagination: check for a `Link` header with `rel="next"` and loop until exhausted.

## Security

- Never hardcode secrets, tokens, subscription IDs, or tenant IDs in scripts.
- Use `$env:VARIABLE_NAME` or secure parameter inputs (`[SecureString]`) for sensitive values.
- Do not use `Invoke-Expression` or `iex` with dynamic strings.

## Avoid

- `Write-Host` for anything other than interactive user prompts.
- `Invoke-Expression` with user-controlled input.
- Aliases in scripts (use full cmdlet names: `Get-ChildItem`, not `ls` or `dir`).
- Suppressing errors with `-ErrorAction SilentlyContinue` unless the failure is expected and handled.
