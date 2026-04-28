# GitHub Copilot Metrics Report — Sample Output

This document shows sample output from `Get-CopilotMetricsReport.ps1` run against a fictional
organization. Use it as a reference when interpreting your own report or when demonstrating
the script during live class sessions.

---

## How to run the script

```powershell
# 1. Set your GitHub token (needs manage_billing:copilot or read:org scope)
$env:GITHUB_TOKEN = "ghp_yourTokenHere"

# 2. Run the report for your org
.\Get-CopilotMetricsReport.ps1 -OrgName "your-org" -DaysBack 28

# 3. Optionally export raw JSON alongside the Markdown report
.\Get-CopilotMetricsReport.ps1 -OrgName "your-org" -JsonOutputPath ".\raw-metrics.json"
```

The script writes a Markdown file (`copilot-metrics-report.md` by default) and prints a
summary table to the console.

---

## Sample report (fictional data — Fabrikam Industrial)

> **Note:** All numbers below are invented for teaching purposes.

---

# GitHub Copilot Metrics Report

**Organization:** fabrikam-industrial
**Report generated:** 2026-04-28 14:35 UTC
**Period:** last 28 days (28 data points)

---

## Seat summary

| Metric | Value |
|--------|-------|
| Total seats (billed) | 250 |
| Active seats (last cycle) | 198 |
| Inactive seats | 52 |
| Plan type | GitHub Copilot Business |

## Usage summary (28-day window)

| Metric | Value |
|--------|-------|
| Average daily active users | 143.6 |
| Total suggestions | 187,420 |
| Total acceptances | 98,304 |
| Overall acceptance rate | 52.5% |

## Top languages by suggestion volume

| Language | Suggestions | Acceptances | Acceptance rate |
|----------|-------------|-------------|-----------------|
| TypeScript | 54,210 | 31,842 | 58.7% |
| Python | 42,880 | 23,584 | 55.0% |
| C# | 28,415 | 14,776 | 52.0% |
| JavaScript | 21,003 | 9,871 | 47.0% |
| PowerShell | 14,672 | 7,804 | 53.2% |
| Bicep | 9,340 | 5,230 | 56.0% |
| Go | 7,200 | 3,456 | 48.0% |
| Java | 4,800 | 2,160 | 45.0% |
| YAML | 3,900 | 1,521 | 39.0% |
| Markdown | 1,000 | 60 | 6.0% |

---

## Notes

- Metrics are collected via the [GitHub Copilot Metrics API](https://docs.github.com/rest/copilot/copilot-metrics).
- Active users = users who received at least one suggestion in the period.
- Acceptance rate = accepted suggestions / total suggestions shown.
- Data availability: GitHub retains up to 28 days of metrics data.

---

## Interpreting the report

### Seat utilization

Fabrikam Industrial has 250 billed seats but only 198 active this cycle — a **79% utilization
rate**. The 52 inactive seats represent ~$1,976/month in unused spend (at ~$38/seat/month for
Copilot Business). Actions to consider:

1. Reclaim inactive seats for developers who have not logged in for 30+ days.
2. Use the GitHub admin UI (**Settings > Copilot > Seat management**) to review last-activity dates.
3. Set up a monthly review cadence using this script piped into a GitHub Actions workflow.

### Acceptance rate

A 52.5% overall acceptance rate is **above industry average** (typical range: 30–50%). This
indicates that developers are receiving high-quality, contextually relevant suggestions.

Language-specific observations:

- **TypeScript (58.7%)** and **Bicep (56.0%)** are the highest performers — likely because
  these code bases have rich context (type annotations, schema files) that Copilot uses for
  grounding.
- **Markdown (6.0%)** is expected to be low; prose suggestions are harder to accept verbatim
  than code completions.
- **YAML (39.0%)** may improve with better `.github/copilot-instructions.md` context about
  pipeline patterns.

### FinOps connection

Pair this report with the **azure-cost-management** skill to cross-reference Copilot seat
spend against Azure infrastructure cost trends. A high acceptance rate in Bicep and PowerShell
typically correlates with faster IaC delivery and fewer manual Azure portal changes.

---

## Related resources

- [GitHub Copilot Metrics API reference](https://docs.github.com/rest/copilot/copilot-metrics)
- [Manage GitHub Copilot seats](https://docs.github.com/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-access-for-copilot-in-your-organization)
- [GitHub Copilot Business pricing](https://docs.github.com/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot)
- [Azure Well-Architected Framework — Operational Excellence](https://learn.microsoft.com/azure/well-architected/operational-excellence/)
