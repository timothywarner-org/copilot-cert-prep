<#
.SYNOPSIS
    Retrieves GitHub Copilot usage metrics for an organization and outputs a formatted report.
.DESCRIPTION
    Calls the GitHub Copilot Metrics API to collect seat usage, active user counts,
    acceptance rates, and language-level breakdowns. Outputs a human-readable Markdown
    report and optionally exports raw data to JSON.
.PARAMETER OrgName
    The GitHub organization login name (for example, "timothywarner-org").
.PARAMETER OutputPath
    Optional. Path for the Markdown report file. Defaults to "copilot-metrics-report.md"
    in the current directory.
.PARAMETER JsonOutputPath
    Optional. Path for the raw JSON export. If omitted, JSON is not exported.
.PARAMETER DaysBack
    Number of days of historical data to request. Valid range: 1-28. Default: 28.
.EXAMPLE
    .\Get-CopilotMetricsReport.ps1 -OrgName "timothywarner-org"
.EXAMPLE
    .\Get-CopilotMetricsReport.ps1 -OrgName "fabrikam" -DaysBack 7 -JsonOutputPath ".\raw.json"
.NOTES
    Requires: PowerShell 7+
    Requires: A GitHub token with the `manage_billing:copilot` or `read:org` scope
              stored in the GITHUB_TOKEN environment variable.
    API reference: https://docs.github.com/rest/copilot/copilot-metrics
#>
#Requires -Version 7.0

[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$OrgName,

    [Parameter()]
    [string]$OutputPath = "copilot-metrics-report.md",

    [Parameter()]
    [string]$JsonOutputPath,

    [Parameter()]
    [ValidateRange(1, 28)]
    [int]$DaysBack = 28
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

#region Helpers

function Get-GitHubHeaders {
    [CmdletBinding()]
    param()

    if (-not $env:GITHUB_TOKEN) {
        throw "GITHUB_TOKEN environment variable is not set. Export a token with 'manage_billing:copilot' scope."
    }

    return @{
        'Authorization' = "Bearer $env:GITHUB_TOKEN"
        'Accept'        = 'application/vnd.github+json'
        'X-GitHub-Api-Version' = '2022-11-28'
    }
}

function Invoke-GitHubApi {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Uri,

        [Parameter(Mandatory)]
        [hashtable]$Headers
    )

    try {
        Write-Verbose "GET $Uri"
        $response = Invoke-RestMethod -Uri $Uri -Headers $Headers -Method Get -ErrorAction Stop
        return $response
    }
    catch {
        Write-Error "GitHub API request failed for '$Uri': $_"
        throw
    }
}

function Format-Percentage {
    [CmdletBinding()]
    param([double]$Value)
    return "{0:P1}" -f ($Value / 100)
}

#endregion

#region Main

Write-Verbose "Fetching Copilot metrics for org: $OrgName (last $DaysBack days)"

$headers = Get-GitHubHeaders

# Seat billing summary
$seatUri = "https://api.github.com/orgs/$OrgName/copilot/billing"
$seatData = Invoke-GitHubApi -Uri $seatUri -Headers $headers

# Usage metrics (daily breakdown)
$since = (Get-Date).AddDays(-$DaysBack).ToString("yyyy-MM-dd")
$metricsUri = "https://api.github.com/orgs/$OrgName/copilot/metrics?since=$since"
$metricsData = Invoke-GitHubApi -Uri $metricsUri -Headers $headers

# Export raw JSON if requested
if ($JsonOutputPath) {
    $combined = @{
        retrieved_at = (Get-Date -Format o)
        org          = $OrgName
        billing      = $seatData
        metrics      = $metricsData
    }
    $combined | ConvertTo-Json -Depth 10 | Set-Content -Path $JsonOutputPath -Encoding UTF8
    Write-Verbose "Raw JSON written to $JsonOutputPath"
}

# Aggregate metrics
$totalDays        = $metricsData.Count
$totalSuggestions = ($metricsData | Measure-Object -Property total_suggestions_count -Sum).Sum
$totalAcceptances = ($metricsData | Measure-Object -Property total_acceptances_count -Sum).Sum
$avgActiveUsers   = if ($totalDays -gt 0) {
    [math]::Round(($metricsData | Measure-Object -Property total_active_users -Average).Average, 1)
} else { 0 }

$overallAcceptanceRate = if ($totalSuggestions -gt 0) {
    [math]::Round(($totalAcceptances / $totalSuggestions) * 100, 1)
} else { 0 }

# Language breakdown (aggregate across all days)
$langMap = @{}
foreach ($day in $metricsData) {
    if ($day.breakdown) {
        foreach ($entry in $day.breakdown) {
            $lang = $entry.language
            if (-not $langMap.ContainsKey($lang)) {
                $langMap[$lang] = @{ suggestions = 0; acceptances = 0 }
            }
            $langMap[$lang].suggestions += $entry.suggestions_count
            $langMap[$lang].acceptances += $entry.acceptances_count
        }
    }
}

$topLanguages = $langMap.GetEnumerator() |
    Sort-Object { $_.Value.suggestions } -Descending |
    Select-Object -First 10

# Build Markdown report
$reportDate = Get-Date -Format "yyyy-MM-dd HH:mm UTC"
$sb = [System.Text.StringBuilder]::new()

$null = $sb.AppendLine("# GitHub Copilot Metrics Report")
$null = $sb.AppendLine()
$null = $sb.AppendLine("**Organization:** $OrgName")
$null = $sb.AppendLine("**Report generated:** $reportDate")
$null = $sb.AppendLine("**Period:** last $DaysBack days ($totalDays data points)")
$null = $sb.AppendLine()
$null = $sb.AppendLine("---")
$null = $sb.AppendLine()
$null = $sb.AppendLine("## Seat summary")
$null = $sb.AppendLine()
$null = $sb.AppendLine("| Metric | Value |")
$null = $sb.AppendLine("|--------|-------|")
$null = $sb.AppendLine("| Total seats (billed) | $($seatData.total_seats) |")
$null = $sb.AppendLine("| Active seats (last cycle) | $($seatData.seat_breakdown.active_this_cycle) |")
$null = $sb.AppendLine("| Inactive seats | $($seatData.seat_breakdown.inactive_this_cycle) |")
$null = $sb.AppendLine("| Plan type | $($seatData.plan_type) |")
$null = $sb.AppendLine()
$null = $sb.AppendLine("## Usage summary ($DaysBack-day window)")
$null = $sb.AppendLine()
$null = $sb.AppendLine("| Metric | Value |")
$null = $sb.AppendLine("|--------|-------|")
$null = $sb.AppendLine("| Average daily active users | $avgActiveUsers |")
$null = $sb.AppendLine("| Total suggestions | $totalSuggestions |")
$null = $sb.AppendLine("| Total acceptances | $totalAcceptances |")
$null = $sb.AppendLine("| Overall acceptance rate | $overallAcceptanceRate% |")
$null = $sb.AppendLine()
$null = $sb.AppendLine("## Top languages by suggestion volume")
$null = $sb.AppendLine()
$null = $sb.AppendLine("| Language | Suggestions | Acceptances | Acceptance rate |")
$null = $sb.AppendLine("|----------|-------------|-------------|-----------------|")

foreach ($lang in $topLanguages) {
    $rate = if ($lang.Value.suggestions -gt 0) {
        [math]::Round(($lang.Value.acceptances / $lang.Value.suggestions) * 100, 1)
    } else { 0 }
    $null = $sb.AppendLine("| $($lang.Key) | $($lang.Value.suggestions) | $($lang.Value.acceptances) | $rate% |")
}

$null = $sb.AppendLine()
$null = $sb.AppendLine("---")
$null = $sb.AppendLine()
$null = $sb.AppendLine("## Notes")
$null = $sb.AppendLine()
$null = $sb.AppendLine("- Metrics are collected via the [GitHub Copilot Metrics API](https://docs.github.com/rest/copilot/copilot-metrics).")
$null = $sb.AppendLine("- Active users = users who received at least one suggestion in the period.")
$null = $sb.AppendLine("- Acceptance rate = accepted suggestions / total suggestions shown.")
$null = $sb.AppendLine("- Data availability: GitHub retains up to 28 days of metrics data.")

$report = $sb.ToString()

# Write report to file
Set-Content -Path $OutputPath -Value $report -Encoding UTF8
Write-Output "Report written to: $OutputPath"

# Also print summary to console
Write-Output ""
Write-Output "=== Copilot Metrics Summary for $OrgName ==="
Write-Output "  Total seats:        $($seatData.total_seats)"
Write-Output "  Active seats:       $($seatData.seat_breakdown.active_this_cycle)"
Write-Output "  Avg daily users:    $avgActiveUsers"
Write-Output "  Acceptance rate:    $overallAcceptanceRate%"
Write-Output "  Total suggestions:  $totalSuggestions"
Write-Output "  Total acceptances:  $totalAcceptances"
Write-Output ""

#endregion
