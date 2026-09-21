# Copilot usage-report tour

A small, zero-dependency demonstration of the **current aggregate report API**. It replaces the older daily-metrics endpoint and its speculative time-saved/ROI calculation.

## Run without credentials

From the repository root, with Node.js 22+:

```powershell
node copilot-metrics-tour/index.js --demo
```

The fixture is **synthetic**, contains two days, and is not a complete 28-day report. Expected results: peak daily users **25**, interactions **500**, completion acceptance **240/600 = 40.0%**, and CLI prompts **30**.

Discuss why the sum of daily active users is not the number of unique people. Ask what delivery/quality evidence would be needed before claiming productivity improvement.

## Read an exported report

```powershell
# Keep real reports outside the public repository because they contain organization data.
node copilot-metrics-tour/index.js --file C:\temp\copilot-organization.ndjson
```

Use an organization **aggregate** report. The parser supports 28-day `day_totals` records and daily aggregate records, rejects duplicate dates and user-level records, and displays missing counters as unavailable.

## Optional live demonstration

An organization owner or authorized metrics reader needs suitable token access. Fine-grained tokens require **Organization Copilot metrics: read**; classic tokens use `read:org` with an authorized identity. Use an existing secure environment variable, `GITHUB_TOKEN` or `GH_TOKEN`.

```powershell
node copilot-metrics-tour/index.js --org YOUR-ORGANIZATION
```

The request is:

```text
GET /orgs/{org}/copilot/metrics/reports/organization-28-day/latest
```

The API returns a manifest with expiring download URLs, not the metric array itself. The script downloads the NDJSON without forwarding the GitHub token to the report host. It does not print credentials, report URLs, or individual identities.

Authorization failures and unavailable reports require investigation. An HTTP status alone does not prove a privacy threshold was responsible.

## Interpret the output

| Measure | Useful for | Limitation |
|---|---|---|
| Daily active users | Adoption on an observed day | Cannot be summed into period-unique people |
| User-initiated interactions | Recorded activity | Coverage depends on telemetry and surface |
| Code-completion acceptance | Accepted/generation activity for `code_completion` | Does not establish quality or financial return |
| CLI prompts | A distinct CLI usage measure | Do not silently combine with IDE measures |

Sources, reviewed September 20, 2026: [REST endpoints](https://docs.github.com/en/rest/copilot/copilot-usage-metrics), [schema examples](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/example-schema), [reconciling metrics](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics).

Local tests exercise parsing, arithmetic, error handling, and token separation with mocked responses. Live organization access is a separate rehearsal check.
