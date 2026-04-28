[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$Organization,

    [Parameter()]
    [ValidateRange(1, 365)]
    [int]$Days = 28,

    [Parameter()]
    [ValidateNotNullOrEmpty()]
    [string]$Token,

    [Parameter()]
    [ValidateNotNullOrEmpty()]
    [string]$ApiBaseUrl = 'https://api.github.com',

    [Parameter()]
    [ValidateRange(0.1, 60)]
    [double]$MinutesPerAcceptance = 2.0,

    [Parameter()]
    [ValidateRange(0.01, 60)]
    [double]$MinutesPerAcceptedLine = 0.2,

    [Parameter()]
    [switch]$IncludeRaw
)

function Get-Token {
    [CmdletBinding()]
    param(
        [Parameter()]
        [string]$SuppliedToken
    )

    if (-not [string]::IsNullOrWhiteSpace($SuppliedToken)) {
        return $SuppliedToken
    }

    if (-not [string]::IsNullOrWhiteSpace($env:GITHUB_TOKEN)) {
        return $env:GITHUB_TOKEN
    }

    if (-not [string]::IsNullOrWhiteSpace($env:GH_TOKEN)) {
        return $env:GH_TOKEN
    }

    if (Get-Command -Name gh -ErrorAction SilentlyContinue) {
        try {
            $ghToken = gh auth token 2>$null
            if ($LASTEXITCODE -eq 0 -and -not [string]::IsNullOrWhiteSpace($ghToken)) {
                return $ghToken.Trim()
            }
        }
        catch {
            Write-Verbose 'Unable to read token from gh auth context.'
        }
    }

    $message = @(
        'No GitHub token was provided.',
        'Pass -Token or set GITHUB_TOKEN / GH_TOKEN in your environment.',
        'Required scope: read:org (plus Copilot metrics access in your org).'
    ) -join ' '

    throw $message
}

function Get-NextLink {
    [CmdletBinding()]
    param(
        [Parameter()]
        [string]$LinkHeader
    )

    if ([string]::IsNullOrWhiteSpace($LinkHeader)) {
        return $null
    }

    $nextMatch = [regex]::Match($LinkHeader, '<([^>]+)>;\s*rel="next"')
    if ($nextMatch.Success) {
        return $nextMatch.Groups[1].Value
    }

    return $null
}

function Get-Number {
    [CmdletBinding()]
    param(
        [Parameter()]
        $Value
    )

    if ($null -eq $Value) {
        return 0
    }

    return [double]$Value
}

function Get-CopilotMetrics {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Org,

        [Parameter(Mandatory)]
        [string]$AuthToken,

        [Parameter(Mandatory)]
        [string]$BaseUrl,

        [Parameter(Mandatory)]
        [int]$DayCount
    )

    $headers = @{
        Authorization          = "Bearer $AuthToken"
        Accept                 = 'application/vnd.github+json'
        'User-Agent'           = 'copilot-metrics-report-script'
        'X-GitHub-Api-Version' = '2022-11-28'
    }

    $startDate = (Get-Date).Date.AddDays(-($DayCount - 1))
    $endpoint = "$BaseUrl/orgs/$Org/copilot/metrics?per_page=28"
    $allRows = New-Object System.Collections.Generic.List[object]

    try {
        while (-not [string]::IsNullOrWhiteSpace($endpoint)) {
            Write-Verbose "Requesting $endpoint"

            $responseHeaders = $null
            $page = Invoke-RestMethod -Uri $endpoint -Method Get -Headers $headers -ResponseHeadersVariable responseHeaders -ErrorAction Stop

            foreach ($row in @($page)) {
                if ($null -eq $row.date) {
                    continue
                }

                $rowDate = [datetime]::Parse($row.date).Date
                if ($rowDate -lt $startDate) {
                    continue
                }

                $allRows.Add($row)
            }

            $endpoint = Get-NextLink -LinkHeader $responseHeaders.Link

            if ($allRows.Count -gt 0) {
                $oldestCollectedDate = ([datetime]::Parse(($allRows | Sort-Object date | Select-Object -First 1).date)).Date
                if ($oldestCollectedDate -le $startDate) {
                    break
                }
            }
        }

        return [PSCustomObject]@{
            Source = 'legacy'
            Rows   = ($allRows | Sort-Object date)
        }
    }
    catch {
        $statusCode = $null
        if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
            $statusCode = [int]$_.Exception.Response.StatusCode
        }

        if ($statusCode -ne 404) {
            throw
        }

        Write-Verbose 'Legacy /copilot/metrics endpoint not available. Falling back to 28-day report endpoint.'

        $reportMetaUrl = "$BaseUrl/orgs/$Org/copilot/metrics/reports/organization-28-day/latest"
        Write-Verbose "Requesting $reportMetaUrl"
        $reportMeta = Invoke-RestMethod -Uri $reportMetaUrl -Method Get -Headers $headers -ErrorAction Stop

        $reportRows = New-Object System.Collections.Generic.List[object]

        foreach ($downloadLink in @($reportMeta.download_links)) {
            if ([string]::IsNullOrWhiteSpace($downloadLink)) {
                continue
            }

            Write-Verbose 'Downloading report payload.'
            $reportPayload = Invoke-RestMethod -Uri $downloadLink -Method Get -Headers @{ 'User-Agent' = 'copilot-metrics-report-script' } -ErrorAction Stop

            foreach ($dayTotal in @($reportPayload.day_totals)) {
                if ($null -eq $dayTotal.day) {
                    continue
                }

                $rowDate = [datetime]::Parse($dayTotal.day).Date
                if ($rowDate -lt $startDate) {
                    continue
                }

                $reportRows.Add($dayTotal)
            }
        }

        return [PSCustomObject]@{
            Source = 'report-28-day'
            Rows   = ($reportRows | Sort-Object day)
        }
    }
}

function Get-CopilotMetricsSummary {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [object[]]$Rows,

        [Parameter(Mandatory)]
        [ValidateSet('legacy', 'report-28-day')]
        [string]$Source,

        [Parameter(Mandatory)]
        [int]$DayCount,

        [Parameter(Mandatory)]
        [double]$MinutesPerAcceptance,

        [Parameter(Mandatory)]
        [double]$MinutesPerAcceptedLine
    )

    if ($Source -eq 'legacy') {
        $totalActiveUsers = 0.0
        $totalEngagedUsers = 0.0
        $totalSuggestions = 0.0
        $totalAcceptances = 0.0
        $totalLinesSuggested = 0.0
        $totalLinesAccepted = 0.0
        $totalChats = 0.0
        $totalChatInsertions = 0.0
        $totalChatCopies = 0.0

        $peakDay = $null
        $peakEngaged = -1.0

        foreach ($row in $Rows) {
            $activeUsers = Get-Number -Value $row.total_active_users
            $engagedUsers = Get-Number -Value $row.total_engaged_users

            $totalActiveUsers += $activeUsers
            $totalEngagedUsers += $engagedUsers

            if ($engagedUsers -gt $peakEngaged) {
                $peakEngaged = $engagedUsers
                $peakDay = $row.date
            }

            foreach ($editor in @($row.copilot_ide_code_completions.editors)) {
                foreach ($model in @($editor.models)) {
                    $totalSuggestions += Get-Number -Value $model.total_code_suggestions
                    $totalAcceptances += Get-Number -Value $model.total_code_acceptances
                    $totalLinesSuggested += Get-Number -Value $model.total_code_lines_suggested
                    $totalLinesAccepted += Get-Number -Value $model.total_code_lines_accepted
                }
            }

            foreach ($chatEditor in @($row.copilot_ide_chat.editors)) {
                $totalChats += Get-Number -Value $chatEditor.total_chats
                $totalChatInsertions += Get-Number -Value $chatEditor.total_chat_insertion_events
                $totalChatCopies += Get-Number -Value $chatEditor.total_chat_copy_events
            }
        }

        $daysReturned = [Math]::Max($Rows.Count, 1)

        $acceptanceRate = if ($totalSuggestions -gt 0) {
            [Math]::Round(($totalAcceptances / $totalSuggestions) * 100, 2)
        }
        else {
            0
        }

        $lineAcceptanceRate = if ($totalLinesSuggested -gt 0) {
            [Math]::Round(($totalLinesAccepted / $totalLinesSuggested) * 100, 2)
        }
        else {
            0
        }

        $engagementRate = if ($totalActiveUsers -gt 0) {
            [Math]::Round(($totalEngagedUsers / $totalActiveUsers) * 100, 2)
        }
        else {
            0
        }

        $chatInsertionRate = if ($totalChats -gt 0) {
            [Math]::Round(($totalChatInsertions / $totalChats) * 100, 2)
        }
        else {
            0
        }

        return [PSCustomObject]@{
            Source                            = $Source
            DaysRequested                     = $DayCount
            DaysReturned                      = $Rows.Count
            DateRangeStart                    = $Rows[0].date
            DateRangeEnd                      = $Rows[-1].date
            AverageDailyActiveUsers           = [Math]::Round($totalActiveUsers / $daysReturned, 2)
            AverageDailyEngagedUsers          = [Math]::Round($totalEngagedUsers / $daysReturned, 2)
            EngagementRatePercent             = $engagementRate
            PeakEngagedUsers                  = [int]$peakEngaged
            PeakEngagedDate                   = $peakDay
            TotalCodeSuggestions              = [int]$totalSuggestions
            TotalCodeAcceptances              = [int]$totalAcceptances
            SuggestionAcceptanceRatePercent   = $acceptanceRate
            TotalSuggestedLines               = [int]$totalLinesSuggested
            TotalAcceptedLines                = [int]$totalLinesAccepted
            LineAcceptanceRatePercent         = $lineAcceptanceRate
            TotalIDEChats                     = [int]$totalChats
            TotalChatInsertions               = [int]$totalChatInsertions
            TotalChatCopies                   = [int]$totalChatCopies
            ChatInsertionPer100Chats          = $chatInsertionRate
            EstimatedTimeSavedMinutes         = [Math]::Round(($totalAcceptances * $MinutesPerAcceptance), 2)
            EstimatedTimeSavedHours           = [Math]::Round((($totalAcceptances * $MinutesPerAcceptance) / 60), 2)
            EstimatedTimeSavedMethod          = "Heuristic: acceptances * $MinutesPerAcceptance min"
        }
    }

    $totalDailyActiveUsers = 0.0
    $totalGenerationActivities = 0.0
    $totalAcceptanceActivities = 0.0
    $totalLocSuggestedToAdd = 0.0
    $totalLocAdded = 0.0
    $peakDailyUsers = -1.0
    $peakDay = $null
    $maxMonthlyActiveUsers = 0.0
    $maxMonthlyChatUsers = 0.0
    $maxMonthlyAgentUsers = 0.0
    $totalCliSessions = 0.0
    $totalCliRequests = 0.0
    $totalCliPrompts = 0.0
    $totalCliPromptTokens = 0.0
    $totalCliOutputTokens = 0.0

    foreach ($row in $Rows) {
        $dailyUsers = Get-Number -Value $row.daily_active_users
        $totalDailyActiveUsers += $dailyUsers

        if ($dailyUsers -gt $peakDailyUsers) {
            $peakDailyUsers = $dailyUsers
            $peakDay = $row.day
        }

        $monthlyUsers = Get-Number -Value $row.monthly_active_users
        if ($monthlyUsers -gt $maxMonthlyActiveUsers) {
            $maxMonthlyActiveUsers = $monthlyUsers
        }

        $monthlyChatUsers = Get-Number -Value $row.monthly_active_chat_users
        if ($monthlyChatUsers -gt $maxMonthlyChatUsers) {
            $maxMonthlyChatUsers = $monthlyChatUsers
        }

        $monthlyAgentUsers = Get-Number -Value $row.monthly_active_agent_users
        if ($monthlyAgentUsers -gt $maxMonthlyAgentUsers) {
            $maxMonthlyAgentUsers = $monthlyAgentUsers
        }

        $totalGenerationActivities += Get-Number -Value $row.code_generation_activity_count
        $totalAcceptanceActivities += Get-Number -Value $row.code_acceptance_activity_count
        $totalLocSuggestedToAdd += Get-Number -Value $row.loc_suggested_to_add_sum
        $totalLocAdded += Get-Number -Value $row.loc_added_sum

        $totalCliSessions += Get-Number -Value $row.totals_by_cli.session_count
        $totalCliRequests += Get-Number -Value $row.totals_by_cli.request_count
        $totalCliPrompts += Get-Number -Value $row.totals_by_cli.prompt_count
        $totalCliPromptTokens += Get-Number -Value $row.totals_by_cli.token_usage.prompt_tokens_sum
        $totalCliOutputTokens += Get-Number -Value $row.totals_by_cli.token_usage.output_tokens_sum
    }

    $daysReturned = [Math]::Max($Rows.Count, 1)
    $activityAcceptanceRate = if ($totalGenerationActivities -gt 0) {
        [Math]::Round(($totalAcceptanceActivities / $totalGenerationActivities) * 100, 2)
    }
    else {
        0
    }

    $locAddedToSuggestedRatio = if ($totalLocSuggestedToAdd -gt 0) {
        [Math]::Round(($totalLocAdded / $totalLocSuggestedToAdd) * 100, 2)
    }
    else {
        0
    }

    return [PSCustomObject]@{
        Source                                = $Source
        DaysRequested                         = $DayCount
        DaysReturned                          = $Rows.Count
        DateRangeStart                        = $Rows[0].day
        DateRangeEnd                          = $Rows[-1].day
        AverageDailyActiveUsers               = [Math]::Round($totalDailyActiveUsers / $daysReturned, 2)
        PeakDailyActiveUsers                  = [int]$peakDailyUsers
        PeakDailyActiveUsersDate              = $peakDay
        MonthlyActiveUsersMax                 = [int]$maxMonthlyActiveUsers
        MonthlyActiveChatUsersMax             = [int]$maxMonthlyChatUsers
        MonthlyActiveAgentUsersMax            = [int]$maxMonthlyAgentUsers
        CodeGenerationActivityCount           = [int]$totalGenerationActivities
        CodeAcceptanceActivityCount           = [int]$totalAcceptanceActivities
        CodeActivityAcceptanceRatePercent     = $activityAcceptanceRate
        SuggestedLinesToAdd                   = [int]$totalLocSuggestedToAdd
        AcceptedLinesAdded                    = [int]$totalLocAdded
        LocAddedToSuggestedRatioPercent       = $locAddedToSuggestedRatio
        CliSessionCount                       = [int]$totalCliSessions
        CliRequestCount                       = [int]$totalCliRequests
        CliPromptCount                        = [int]$totalCliPrompts
        CliPromptTokens                       = [int]$totalCliPromptTokens
        CliOutputTokens                       = [int]$totalCliOutputTokens
        EstimatedTimeSavedMinutes             = [Math]::Round((($totalAcceptanceActivities * $MinutesPerAcceptance) + ($totalLocAdded * $MinutesPerAcceptedLine)), 2)
        EstimatedTimeSavedHours               = [Math]::Round(((($totalAcceptanceActivities * $MinutesPerAcceptance) + ($totalLocAdded * $MinutesPerAcceptedLine)) / 60), 2)
        EstimatedTimeSavedMethod              = "Heuristic: acceptance_activities * $MinutesPerAcceptance min + accepted_lines * $MinutesPerAcceptedLine min"
    }
}

try {
    $resolvedToken = Get-Token -SuppliedToken $Token
    $metricsData = Get-CopilotMetrics -Org $Organization -AuthToken $resolvedToken -BaseUrl $ApiBaseUrl -DayCount $Days
    $rows = $metricsData.Rows

    if ($rows.Count -eq 0) {
        throw "No Copilot metrics were returned for org '$Organization' in the last $Days day(s)."
    }

    $summary = Get-CopilotMetricsSummary -Rows $rows -Source $metricsData.Source -DayCount $Days -MinutesPerAcceptance $MinutesPerAcceptance -MinutesPerAcceptedLine $MinutesPerAcceptedLine

    Write-Output ''
    Write-Output "GitHub Copilot Metrics Report for org '$Organization'"
    Write-Output "Source endpoint mode: $($summary.Source)"
    Write-Output "Window: $($summary.DateRangeStart) to $($summary.DateRangeEnd) ($($summary.DaysReturned) day(s) returned)"
    Write-Output '---'
    $summary | Format-List

    if ($IncludeRaw.IsPresent) {
        Write-Output ''
        Write-Output 'Raw per-day records:'
        $rows
    }
}
catch {
    $errorMessage = "Failed to load Copilot metrics: $($_.Exception.Message)"
    Write-Error -Message $errorMessage
    exit 1
}
