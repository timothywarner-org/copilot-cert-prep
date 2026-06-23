# GitHub Copilot Metrics Report Sample

This sample was generated from:

```powershell
.\Get-CopilotMetricsReport.ps1 -Organization 'timothywarner-org' -Days 28
```

```text
GitHub Copilot Metrics Report for org 'timothywarner-org'
Source endpoint mode: report-28-day
Window: 2026-04-01 to 2026-04-27 (27 day(s) returned)
---

Source                            : report-28-day
DaysRequested                     : 28
DaysReturned                      : 27
DateRangeStart                    : 2026-04-01
DateRangeEnd                      : 2026-04-27
AverageDailyActiveUsers           : 0.22
PeakDailyActiveUsers              : 1
PeakDailyActiveUsersDate          : 2026-04-02
MonthlyActiveUsersMax             : 1
MonthlyActiveChatUsersMax         : 1
MonthlyActiveAgentUsersMax        : 1
CodeGenerationActivityCount       : 32
CodeAcceptanceActivityCount       : 4
CodeActivityAcceptanceRatePercent : 12.5
SuggestedLinesToAdd               : 70
AcceptedLinesAdded                : 250
LocAddedToSuggestedRatioPercent   : 357.14
CliSessionCount                   : 6
CliRequestCount                   : 6
CliPromptCount                    : 6
CliPromptTokens                   : 115409
CliOutputTokens                   : 1425
EstimatedTimeSavedMinutes         : 58
EstimatedTimeSavedHours           : 0.97
EstimatedTimeSavedMethod          : Heuristic: acceptance_activities * 2 min + accepted_lines * 0.2 min
```
