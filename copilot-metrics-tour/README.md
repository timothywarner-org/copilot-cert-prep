# Copilot Metrics API — Guided Tour

A zero-dependency Node.js console app that tours the most useful properties of the **GitHub Copilot Metrics API**. Built for the O'Reilly **GitHub Copilot Certification (GH-300) Prep** class to make one point concrete: Copilot adoption is **measured**, not guessed.

The tour runs in two modes:

- **`--demo`** — renders the full tour from a clearly labeled **synthetic payload**. No token, no network, no org with paid seats required. This is the mode used in class.
- **Live** — calls `GET /orgs/{org}/copilot/metrics` against a real organization where you are an owner or billing manager.

## What it shows

The script walks the daily metrics object and frames each block as a real use case, not just a field dump.

| Section | Use case | Key properties toured |
| ------- | -------- | --------------------- |
| Reporting window | It is a 28-day **time series**, one object per day | `date`, array length |
| Headline adoption | `active` vs `engaged` (a classic exam distractor) | `total_active_users`, `total_engaged_users` |
| Adoption funnel | Licensed seats to active to engaged | `total_active_users`, `total_engaged_users`, `--seats` |
| IDE code completions | Language mix and **acceptance rate** | `languages[]`, `editors[].models[].languages[]` with `total_code_suggestions`, `total_code_acceptances`, `total_code_lines_suggested`, `total_code_lines_accepted` |
| IDE chat | "Did chat produce usable code" | `total_chats`, `total_chat_insertion_events`, `total_chat_copy_events` |
| GitHub.com chat and PR summaries | Platform-side surfaces | `copilot_dotcom_chat`, `copilot_dotcom_pull_requests.repositories[]` |
| Time saved and ROI | A **defensible estimate** with assumptions shown | accepted lines x tunable model |
| Governance and surface mix | Where value comes from, and whether policy is working | engaged users per surface |

## Requirements

- **Node.js 18 or newer** (global `fetch` is built in, so there is nothing to install).
- For **live** mode only:
  - A GitHub token in one of these environment variables (first non-empty wins): `GITHUB_TOKEN`, `GH_TOKEN`, `GITHUB_PERSONAL_ACCESS_TOKEN`.
  - Classic PAT scope **`manage_billing:copilot`** or **`read:org`** (fine-grained token: **Administration: read**).
  - You must be an **organization owner or billing manager**.
  - The org needs **Copilot Business or Enterprise** with at least **5 active users** in the window. GitHub suppresses smaller cohorts for privacy.

## Run it

Offline demo (recommended for class):

```powershell
node index.js --demo
```

Live, against your org:

```powershell
node index.js timothywarner-org
```

Tune the ROI model (all optional, sensible defaults built in):

```powershell
node index.js --demo --seats 300 --minutes-per-line 0.1 --hourly-rate 75 --seat-cost 19
```

Or use the npm scripts:

```powershell
npm run demo        # offline synthetic tour
npm run tour        # live against timothywarner-org
npm run tour:roi    # demo with explicit ROI assumptions
```

## ROI flags

The time-saved section is an **estimate**, not a value the API returns. The API gives you **accepted lines**; the dollar figure is a model you must be able to defend. All inputs are visible in the output and overridable:

| Flag | Default | Meaning |
| ---- | ------- | ------- |
| `--seats N` | (none) | Licensed Copilot seats, for the adoption funnel and cost side |
| `--minutes-per-line N` | `0.1` | Minutes of developer time saved per accepted line |
| `--hourly-rate N` | `75` | Loaded developer cost per hour, in dollars |
| `--seat-cost N` | `19` | Copilot Business list price per seat per month, in dollars |

The defaults are deliberately conservative. Change them, watch the ROI move, and you have taught the most important lesson in the deck: **the measured numbers are above the line, the assumptions are below it, and you always show your work.**

## Expected failure modes (these are teaching moments)

In live mode the script translates HTTP errors into plain-language guidance instead of a stack trace:

| Status | Meaning |
| ------ | ------- |
| **401** | Token is invalid or expired |
| **403** | Token lacks scope, or you are not an org owner or billing manager |
| **404** | Org does not exist, or Copilot metrics are not enabled for it |
| **422** | Fewer than 5 active Copilot users in the window (the privacy floor) |

A personal-scale org with no paid Copilot seats returns **404**. That is expected. Use `--demo` to see the populated output.

## A note on the synthetic data

The `--demo` payload is hand-built to match the documented `2022-11-28` schema. Every number is fabricated and the output is banner-labeled **SAMPLE DATA — NOT LIVE** at the top and bottom. Never present it as real numbers. Fictional companies (Fabrikam, Tailwind Traders) stand in for repository names.

## How this maps to GH-300

- **Improve developer productivity** — adoption funnel, acceptance rate, time-saved model.
- **Understand Copilot data and architecture** — the metrics object shape, the 5-user privacy floor, the 28-day window.
- **Configure privacy, exclusions, and safeguards** — the governance and surface-mix section, plus the scope and ownership requirements behind the 403 and 422 responses.
