#!/usr/bin/env node

/**
 * GitHub Copilot Metrics API — Guided Tour
 * =========================================
 * A teaching console app for the O'Reilly "GitHub Copilot Certification (GH-300) Prep" class.
 *
 * GH-300 ties directly to this: the "Improve developer productivity" and "Understand Copilot
 * data and architecture" domains expect you to know that adoption is MEASURED, not vibes.
 * This script tours the most useful properties the Copilot Metrics API returns so learners
 * can see what an org owner actually gets back.
 *
 * API: GET /orgs/{org}/copilot/metrics   (X-GitHub-Api-Version: 2022-11-28)
 *   - Returns up to 28 days of daily aggregates (one object per day).
 *   - Requires you to be an ORG OWNER or BILLING MANAGER.
 *   - Token needs the "manage_billing:copilot" OR "read:org" scope (classic PAT),
 *     or "Administration: read" if you use a fine-grained token.
 *   - GitHub SUPPRESSES data when fewer than 5 members had active Copilot in the period
 *     (privacy floor). A 422 or empty array there is expected, not a bug.
 *
 * Why no extra dependencies: this ships to learners who just `git clone` and run. Node 18+
 * has global fetch built in, so there is nothing to npm install. Keep the barrier to entry
 * at zero.
 *
 * Usage:
 *   node copilot-metrics-tour.js <org-name>
 *   node copilot-metrics-tour.js timothywarner-org
 *
 * Token resolution order (first non-empty wins):
 *   GITHUB_TOKEN  ->  GH_TOKEN  ->  GITHUB_PERSONAL_ACCESS_TOKEN
 *
 * Offline demo:
 *   node copilot-metrics-tour.js --demo
 *   Renders the full tour from a SYNTHETIC payload (no token, no network). Use this when
 *   you do not have an org with paid Copilot seats and 5+ active users. The data is clearly
 *   labeled as sample data and must never be presented as live numbers.
 */

'use strict';

// ANSI colors. Kept minimal and paired with text labels (never color alone) so the
// output reads correctly for colorblind learners and in logs that strip escape codes.
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
};

const API_VERSION = '2022-11-28';
const TOKEN_VARS = ['GITHUB_TOKEN', 'GH_TOKEN', 'GITHUB_PERSONAL_ACCESS_TOKEN'];

/**
 * Resolve the first usable token from the environment.
 * @returns {{ token: string, source: string } | null}
 */
function resolveToken() {
  for (const name of TOKEN_VARS) {
    const value = process.env[name];
    if (value && value.trim()) {
      return { token: value.trim(), source: name };
    }
  }
  return null;
}

/**
 * Mask a token for safe display. Never print a full credential to a terminal that
 * may be recorded in a live class.
 */
function maskToken(token) {
  if (token.length <= 10) return '***';
  return `${token.slice(0, 7)}...${token.slice(-3)}`;
}

/** Pretty integer formatting with thousands separators. */
function fmt(n) {
  return typeof n === 'number' ? n.toLocaleString('en-US') : String(n ?? '-');
}

/** Acceptance rate as a percent string, guarding divide-by-zero. */
function rate(accepted, suggested) {
  if (!suggested) return 'n/a';
  return `${((accepted / suggested) * 100).toFixed(1)}%`;
}

function header(title) {
  const bar = '─'.repeat(Math.max(0, 64 - title.length));
  console.log(`\n${c.cyan}${c.bold}▶ ${title}${c.reset} ${c.gray}${bar}${c.reset}`);
}

/**
 * Call the Copilot metrics endpoint and return the parsed array of daily objects.
 * Throws an Error with a teaching-friendly message on the failure modes that
 * actually happen in class (bad scope, not an owner, too few users, no such org).
 */
async function fetchMetrics(org, token) {
  const url = `https://api.github.com/orgs/${encodeURIComponent(org)}/copilot/metrics`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': API_VERSION,
      'User-Agent': 'gh300-copilot-metrics-tour',
    },
  });

  // Surface the rate-limit budget; org owners hammering this in a demo can hit it.
  const remaining = res.headers.get('x-ratelimit-remaining');

  if (res.status === 401) {
    throw new Error(
      'HTTP 401 Unauthorized. The token is invalid or expired. Re-check the PAT value.'
    );
  }
  if (res.status === 403) {
    throw new Error(
      'HTTP 403 Forbidden. The token lacks scope OR you are not an org owner/billing manager.\n' +
        '   Fix: classic PAT needs "manage_billing:copilot" or "read:org"; you must be an org owner.'
    );
  }
  if (res.status === 404) {
    throw new Error(
      `HTTP 404 Not Found. Org "${org}" does not exist, or Copilot metrics are not enabled for it,\n` +
        '   or your token cannot see it. Confirm the org slug and that Copilot Business/Enterprise is on.'
    );
  }
  if (res.status === 422) {
    throw new Error(
      'HTTP 422. GitHub returns this when fewer than 5 members had active Copilot in the window.\n' +
        '   This is the PRIVACY FLOOR, not a code bug. Try a larger org or a longer-running rollout.'
    );
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText}. ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  return { data, remaining };
}

/**
 * Tour the headline org-wide adoption numbers from the most recent day in the window.
 * These are the figures a GH-300 candidate must be able to interpret.
 */
function tourHeadline(latest) {
  header('Headline adoption (most recent day)');
  console.log(`  ${c.bold}Date:${c.reset}                 ${latest.date}`);
  console.log(
    `  ${c.bold}Total active users:${c.reset}   ${fmt(latest.total_active_users)} ` +
      `${c.dim}(had any Copilot activity)${c.reset}`
  );
  console.log(
    `  ${c.bold}Total engaged users:${c.reset}  ${fmt(latest.total_engaged_users)} ` +
      `${c.dim}(actually used a feature, e.g. accepted a suggestion or chatted)${c.reset}`
  );
  console.log(
    `  ${c.gray}Teaching point: "active" vs "engaged" is a classic GH-300 distractor. ` +
      `Engaged is the stricter, more meaningful number.${c.reset}`
  );
}

/**
 * Tour IDE code completions — the bread-and-butter "ghost text" metric.
 * Walks editors -> models -> languages and computes acceptance rate.
 */
function tourCodeCompletions(latest) {
  header('IDE code completions (ghost text)');
  const block = latest.copilot_ide_code_completions;
  if (!block) {
    console.log(`  ${c.yellow}No code-completion data in this day's payload.${c.reset}`);
    return;
  }

  console.log(`  ${c.bold}Engaged users:${c.reset} ${fmt(block.total_engaged_users)}`);

  // Top languages by engaged users — the "what are people coding in" view.
  if (Array.isArray(block.languages) && block.languages.length) {
    const top = [...block.languages]
      .sort((a, b) => (b.total_engaged_users || 0) - (a.total_engaged_users || 0))
      .slice(0, 5);
    console.log(`  ${c.bold}Top languages by engaged users:${c.reset}`);
    for (const lang of top) {
      console.log(`    ${c.green}•${c.reset} ${lang.name}: ${fmt(lang.total_engaged_users)}`);
    }
  }

  // Editor -> model -> language acceptance, the part learners find most concrete.
  if (Array.isArray(block.editors) && block.editors.length) {
    console.log(`  ${c.bold}Editors and acceptance:${c.reset}`);
    for (const editor of block.editors) {
      console.log(
        `    ${c.magenta}${editor.name}${c.reset} ` +
          `${c.dim}(engaged: ${fmt(editor.total_engaged_users)})${c.reset}`
      );
      for (const model of editor.models || []) {
        const tag = model.is_custom_model ? ' [custom model]' : '';
        // Roll the per-language counters up to a model total for a clean acceptance rate.
        let suggested = 0;
        let accepted = 0;
        let linesSuggested = 0;
        let linesAccepted = 0;
        for (const lang of model.languages || []) {
          suggested += lang.total_code_suggestions || 0;
          accepted += lang.total_code_acceptances || 0;
          linesSuggested += lang.total_code_lines_suggested || 0;
          linesAccepted += lang.total_code_lines_accepted || 0;
        }
        console.log(
          `      ${c.cyan}${model.name}${tag}${c.reset}: ` +
            `${fmt(accepted)}/${fmt(suggested)} suggestions accepted ` +
            `${c.green}(${rate(accepted, suggested)})${c.reset}, ` +
            `${fmt(linesAccepted)}/${fmt(linesSuggested)} lines ` +
            `${c.green}(${rate(linesAccepted, linesSuggested)})${c.reset}`
        );
      }
    }
    console.log(
      `  ${c.gray}Teaching point: acceptance RATE matters more than raw counts. ` +
        `A high suggestion count with low acceptance can signal prompt or context problems.${c.reset}`
    );
  }
}

/** Tour IDE chat — insertions and copies are the real "did it help" signals. */
function tourIdeChat(latest) {
  header('IDE chat (Copilot Chat in the editor)');
  const block = latest.copilot_ide_chat;
  if (!block) {
    console.log(`  ${c.yellow}No IDE chat data in this day's payload.${c.reset}`);
    return;
  }
  console.log(`  ${c.bold}Engaged users:${c.reset} ${fmt(block.total_engaged_users)}`);

  let chats = 0;
  let insertions = 0;
  let copies = 0;
  for (const editor of block.editors || []) {
    for (const model of editor.models || []) {
      chats += model.total_chats || 0;
      insertions += model.total_chat_insertion_events || 0;
      copies += model.total_chat_copy_events || 0;
    }
  }
  console.log(`  ${c.bold}Total chats:${c.reset}            ${fmt(chats)}`);
  console.log(`  ${c.bold}Code insertion events:${c.reset}  ${fmt(insertions)} ${c.dim}(inserted chat code into a file)${c.reset}`);
  console.log(`  ${c.bold}Code copy events:${c.reset}       ${fmt(copies)} ${c.dim}(copied chat code to clipboard)${c.reset}`);
  console.log(
    `  ${c.gray}Teaching point: insertions + copies are your "chat actually produced usable code" proxy.${c.reset}`
  );
}

/** Tour github.com chat and PR summaries — the platform-side (non-IDE) surfaces. */
function tourDotcom(latest) {
  header('GitHub.com chat and PR summaries');

  const chat = latest.copilot_dotcom_chat;
  if (chat) {
    let chats = 0;
    for (const model of chat.models || []) chats += model.total_chats || 0;
    console.log(`  ${c.bold}Dotcom chat engaged users:${c.reset} ${fmt(chat.total_engaged_users)}, chats: ${fmt(chats)}`);
  } else {
    console.log(`  ${c.dim}No github.com chat data.${c.reset}`);
  }

  const pr = latest.copilot_dotcom_pull_requests;
  if (pr) {
    let summaries = 0;
    for (const repo of pr.repositories || []) {
      for (const model of repo.models || []) summaries += model.total_pr_summaries_created || 0;
    }
    console.log(
      `  ${c.bold}PR summary engaged users:${c.reset} ${fmt(pr.total_engaged_users)}, ` +
        `PR summaries created: ${fmt(summaries)}`
    );
    // Show which repos drive PR-summary usage — useful for adoption storytelling.
    const repos = (pr.repositories || [])
      .map((r) => ({
        name: r.name,
        summaries: (r.models || []).reduce((s, m) => s + (m.total_pr_summaries_created || 0), 0),
      }))
      .filter((r) => r.summaries > 0)
      .sort((a, b) => b.summaries - a.summaries)
      .slice(0, 5);
    if (repos.length) {
      console.log(`  ${c.bold}Top repos by PR summaries:${c.reset}`);
      for (const r of repos) {
        console.log(`    ${c.green}•${c.reset} ${r.name}: ${fmt(r.summaries)}`);
      }
    }
  } else {
    console.log(`  ${c.dim}No github.com PR-summary data.${c.reset}`);
  }
}

/** Show the shape of the window so learners understand it is a time series. */
function tourWindow(data) {
  header('Reporting window');
  console.log(`  ${c.bold}Days returned:${c.reset} ${data.length} ${c.dim}(API caps at 28 days)${c.reset}`);
  if (data.length) {
    console.log(`  ${c.bold}Range:${c.reset} ${data[0].date} -> ${data[data.length - 1].date}`);
  }
  console.log(
    `  ${c.gray}Teaching point: each element is one DAY. Trend the acceptance rate across ` +
      `the window to spot whether a rollout is sticking.${c.reset}`
  );
}

/**
 * Sum accepted code lines across one day, walking editors -> models -> languages.
 * This is the single raw number that feeds every "time saved" and ROI estimate.
 */
function acceptedLinesForDay(day) {
  const block = day.copilot_ide_code_completions;
  if (!block) return 0;
  let lines = 0;
  for (const editor of block.editors || []) {
    for (const model of editor.models || []) {
      for (const lang of model.languages || []) {
        lines += lang.total_code_lines_accepted || 0;
      }
    }
  }
  return lines;
}

/**
 * USE CASE 1 — Adoption funnel.
 * Licensed -> active -> engaged is the story every champion presents to leadership.
 * The metrics API gives active and engaged directly; seats come from the billing API,
 * so we accept an optional seat count to complete the funnel.
 */
function tourAdoption(latest, seats) {
  header('Use case: adoption funnel (who is actually using it)');
  const active = latest.total_active_users || 0;
  const engaged = latest.total_engaged_users || 0;

  if (seats) {
    const activeOfSeats = ((active / seats) * 100).toFixed(0);
    console.log(`  ${c.bold}Licensed seats:${c.reset}       ${fmt(seats)} ${c.dim}(from billing API / --seats)${c.reset}`);
    console.log(`  ${c.bold}Active users:${c.reset}         ${fmt(active)} ${c.green}(${activeOfSeats}% of seats)${c.reset}`);
  } else {
    console.log(`  ${c.bold}Active users:${c.reset}         ${fmt(active)} ${c.dim}(pass --seats N to show % of licenses)${c.reset}`);
  }
  const engagedOfActive = active ? ((engaged / active) * 100).toFixed(0) : 'n/a';
  console.log(`  ${c.bold}Engaged users:${c.reset}        ${fmt(engaged)} ${c.green}(${engagedOfActive}% of active)${c.reset}`);
  console.log(
    `  ${c.gray}Teaching point: a wide active->engaged gap means people have Copilot open but ` +
      `are not accepting suggestions. That is a coaching problem, not a licensing one.${c.reset}`
  );
}

/**
 * USE CASE 2 — Time saved and ROI.
 * This is an ESTIMATE, not a metric the API returns. We make the assumptions explicit so
 * learners can defend or adjust them. Model: accepted lines x minutes-saved-per-line,
 * compared against seat cost. The point is to teach the method, not to assert a number.
 */
function tourTimeSaved(data, opts) {
  header('Use case: time saved and ROI (an ESTIMATE, assumptions shown)');
  const minutesPerLine = opts.minutesPerLine; // tunable assumption
  const hourlyRate = opts.hourlyRate;         // loaded developer cost per hour
  const seatCostMonth = opts.seatCostMonth;   // Copilot Business list price per seat/month

  // Sum accepted lines across the whole returned window, then project to a month.
  const windowLines = data.reduce((sum, day) => sum + acceptedLinesForDay(day), 0);
  const days = data.length || 1;
  const monthlyLines = Math.round((windowLines / days) * 30);

  const hoursSavedMonth = (monthlyLines * minutesPerLine) / 60;
  const dollarsSavedMonth = hoursSavedMonth * hourlyRate;

  // Cost side: prefer real licensed seats if provided, else fall back to engaged users.
  const engaged = data[data.length - 1].total_engaged_users || 0;
  const seatsForCost = opts.seats || engaged;
  const seatLabel = opts.seats ? 'licensed seats' : 'engaged users (no --seats given)';
  const monthlyCost = seatsForCost * seatCostMonth;
  const roi = monthlyCost ? ((dollarsSavedMonth - monthlyCost) / monthlyCost) * 100 : null;

  console.log(`  ${c.dim}Assumptions (override with flags):${c.reset}`);
  console.log(`    minutes saved per accepted line = ${minutesPerLine}   ${c.dim}(--minutes-per-line)${c.reset}`);
  console.log(`    loaded developer cost           = $${hourlyRate}/hr   ${c.dim}(--hourly-rate)${c.reset}`);
  console.log(`    Copilot seat cost               = $${seatCostMonth}/seat/mo ${c.dim}(--seat-cost)${c.reset}`);
  console.log('');
  console.log(`  ${c.bold}Accepted lines (window):${c.reset}  ${fmt(windowLines)} over ${days} day(s)`);
  console.log(`  ${c.bold}Projected lines/month:${c.reset}    ${fmt(monthlyLines)}`);
  console.log(`  ${c.bold}Est. hours saved/month:${c.reset}   ${fmt(Math.round(hoursSavedMonth))}`);
  console.log(`  ${c.bold}Est. value saved/month:${c.reset}   ${c.green}$${fmt(Math.round(dollarsSavedMonth))}${c.reset}`);
  console.log(`  ${c.bold}Seat cost/month:${c.reset}          $${fmt(Math.round(monthlyCost))} ${c.dim}(${fmt(seatsForCost)} ${seatLabel})${c.reset}`);
  if (roi !== null) {
    const color = roi >= 0 ? c.green : c.red;
    console.log(`  ${c.bold}Estimated ROI:${c.reset}            ${color}${roi.toFixed(0)}%${c.reset}`);
  }
  console.log(
    `  ${c.gray}Teaching point: the API gives you accepted LINES, not time. Everything above the ` +
      `line is measured; everything below it is a defensible model. Show your assumptions or the ` +
      `number is worthless.${c.reset}`
  );
}

/**
 * USE CASE 3 — Governance and surface mix.
 * Where is the value coming from: completions, IDE chat, or platform (github.com)? This is the
 * "privacy, exclusions, safeguards" angle — you cannot govern what you cannot see.
 */
function tourGovernance(latest) {
  header('Use case: governance and surface mix (where value comes from)');

  const completionEngaged = latest.copilot_ide_code_completions?.total_engaged_users || 0;
  const ideChatEngaged = latest.copilot_ide_chat?.total_engaged_users || 0;
  const dotcomChatEngaged = latest.copilot_dotcom_chat?.total_engaged_users || 0;
  const prEngaged = latest.copilot_dotcom_pull_requests?.total_engaged_users || 0;

  const rows = [
    ['IDE code completions', completionEngaged],
    ['IDE chat', ideChatEngaged],
    ['GitHub.com chat', dotcomChatEngaged],
    ['PR summaries', prEngaged],
  ];
  const max = Math.max(1, ...rows.map((r) => r[1]));
  for (const [label, value] of rows) {
    const barLen = Math.round((value / max) * 24);
    const bar = '█'.repeat(barLen) + ' '.repeat(24 - barLen);
    console.log(`  ${label.padEnd(22)} ${c.cyan}${bar}${c.reset} ${fmt(value)}`);
  }
  console.log(
    `  ${c.gray}Teaching point: if PR summaries or github.com chat are near zero, those surfaces ` +
      `may be disabled by policy. The metrics API is how you audit that content exclusions and ` +
      `feature toggles are doing what you set them to.${c.reset}`
  );
}

/**
 * Build a SYNTHETIC two-day payload that matches the documented 2022-11-28 schema.
 * Numbers are realistic for a mid-size engineering org but entirely made up. This exists
 * so the tour renders its full output offline; it is never live data and is banner-labeled
 * as such at call sites. Companies/repos are drawn from the class fictional pool, not Contoso.
 */
function buildDemoData() {
  const day = (date) => ({
    date,
    total_active_users: 247,
    total_engaged_users: 198,
    copilot_ide_code_completions: {
      total_engaged_users: 184,
      languages: [
        { name: 'typescript', total_engaged_users: 91 },
        { name: 'python', total_engaged_users: 74 },
        { name: 'javascript', total_engaged_users: 63 },
        { name: 'go', total_engaged_users: 38 },
        { name: 'csharp', total_engaged_users: 29 },
      ],
      editors: [
        {
          name: 'vscode',
          total_engaged_users: 152,
          models: [
            {
              name: 'default',
              is_custom_model: false,
              total_engaged_users: 152,
              languages: [
                {
                  name: 'typescript',
                  total_engaged_users: 88,
                  total_code_suggestions: 14203,
                  total_code_acceptances: 4876,
                  total_code_lines_suggested: 32441,
                  total_code_lines_accepted: 10802,
                },
                {
                  name: 'python',
                  total_engaged_users: 70,
                  total_code_suggestions: 10710,
                  total_code_acceptances: 3994,
                  total_code_lines_suggested: 22218,
                  total_code_lines_accepted: 8551,
                },
              ],
            },
          ],
        },
        {
          name: 'JetBrains',
          total_engaged_users: 41,
          models: [
            {
              name: 'default',
              is_custom_model: false,
              total_engaged_users: 41,
              languages: [
                {
                  name: 'go',
                  total_engaged_users: 33,
                  total_code_suggestions: 4944,
                  total_code_acceptances: 1620,
                  total_code_lines_suggested: 11880,
                  total_code_lines_accepted: 3902,
                },
              ],
            },
          ],
        },
      ],
    },
    copilot_ide_chat: {
      total_engaged_users: 121,
      editors: [
        {
          name: 'vscode',
          models: [
            {
              name: 'default',
              is_custom_model: false,
              total_engaged_users: 121,
              total_chats: 8842,
              total_chat_insertion_events: 2611,
              total_chat_copy_events: 1903,
            },
          ],
        },
      ],
    },
    copilot_dotcom_chat: {
      total_engaged_users: 56,
      models: [{ name: 'default', is_custom_model: false, total_engaged_users: 56, total_chats: 1487 }],
    },
    copilot_dotcom_pull_requests: {
      total_engaged_users: 44,
      repositories: [
        {
          name: 'fabrikam-residences/booking-api',
          total_engaged_users: 28,
          models: [{ name: 'default', is_custom_model: false, total_engaged_users: 28, total_pr_summaries_created: 312 }],
        },
        {
          name: 'tailwind-traders/storefront-web',
          total_engaged_users: 19,
          models: [{ name: 'default', is_custom_model: false, total_engaged_users: 19, total_pr_summaries_created: 187 }],
        },
      ],
    },
  });

  // Oldest-first, matching the live API ordering, so latest = last element.
  return [day('2026-06-21'), day('2026-06-22')];
}

function demoBanner() {
  console.log(
    `\n${c.yellow}${c.bold}*** SAMPLE DATA — NOT LIVE ***${c.reset} ` +
      `${c.yellow}--demo renders a synthetic payload for teaching. Do not present as real numbers.${c.reset}`
  );
}

/**
 * Parse a `--flag value` number from argv, falling back to a default. Keeps the ROI
 * assumptions tunable from the command line without pulling in a parsing dependency.
 */
function numFlag(args, name, fallback) {
  const i = args.indexOf(name);
  if (i === -1 || i === args.length - 1) return fallback;
  const v = Number(args[i + 1]);
  return Number.isFinite(v) ? v : fallback;
}

/** Run the complete tour against a window of daily objects. Shared by live and demo paths. */
function runTours(data, opts) {
  const latest = data[data.length - 1];

  // Diagnostics: who is using it, and is it sticking.
  tourWindow(data);
  tourHeadline(latest);
  tourAdoption(latest, opts.seats);

  // Feature depth: completions, chat, platform surfaces.
  tourCodeCompletions(latest);
  tourIdeChat(latest);
  tourDotcom(latest);

  // Business cases: the conversations a champion actually has with leadership.
  tourTimeSaved(data, opts);
  tourGovernance(latest);
}

async function main() {
  console.log(`${c.cyan}${c.bold}GitHub Copilot Metrics API — Guided Tour${c.reset}`);
  console.log(`${c.dim}GH-300 prep: what an org owner actually sees in the adoption data.${c.reset}`);

  const args = process.argv.slice(2);

  // ROI assumptions and the optional seat count, all overridable from the CLI.
  const opts = {
    seats: numFlag(args, '--seats', 0) || 0,
    minutesPerLine: numFlag(args, '--minutes-per-line', 0.1),
    hourlyRate: numFlag(args, '--hourly-rate', 75),
    seatCostMonth: numFlag(args, '--seat-cost', 19),
  };

  // Offline path: render the full tour from synthetic data. No token or network required.
  if (args.includes('--demo')) {
    demoBanner();
    const data = buildDemoData();
    // Give the demo a realistic seat count so the adoption funnel shows a license %.
    runTours(data, { ...opts, seats: opts.seats || 300 });
    header('Done');
    demoBanner();
    console.log(
      `  ${c.gray}This was SAMPLE data. Run against a real org with Copilot Business ` +
        `to see live numbers.${c.reset}\n`
    );
    return;
  }

  const org = args[0];
  if (!org) {
    console.error(`\n${c.red}Missing org name.${c.reset}`);
    console.error(`Usage: ${c.bold}node index.js <org-name>${c.reset}`);
    console.error(`       ${c.bold}node index.js --demo${c.reset}  ${c.dim}(offline sample data)${c.reset}`);
    console.error(`Example: node index.js timothywarner-org`);
    process.exitCode = 2;
    return;
  }

  const resolved = resolveToken();
  if (!resolved) {
    console.error(
      `\n${c.red}No token found.${c.reset} Set one of: ${TOKEN_VARS.join(', ')}.`
    );
    process.exitCode = 2;
    return;
  }
  console.log(
    `\n${c.green}✓ Token:${c.reset} ${maskToken(resolved.token)} ${c.dim}(from ${resolved.source})${c.reset}`
  );
  console.log(`${c.green}✓ Org:${c.reset}   ${org}`);

  try {
    const { data, remaining } = await fetchMetrics(org, resolved.token);

    if (!Array.isArray(data) || data.length === 0) {
      console.log(
        `\n${c.yellow}The API returned an empty result.${c.reset} ` +
          `Usually means fewer than 5 active Copilot users in the window (privacy floor).`
      );
      return;
    }

    // The API returns oldest-first; runTours reads the most recent day internally.
    runTours(data, opts);

    header('Done');
    if (remaining) console.log(`  ${c.dim}API requests remaining this hour: ${remaining}${c.reset}`);
    console.log(
      `  ${c.gray}Next: pipe this JSON into a dashboard, or diff two days to show acceptance-rate trend.${c.reset}\n`
    );
  } catch (err) {
    console.error(`\n${c.red}✗ ${err.message}${c.reset}\n`);
    process.exitCode = 1;
  }
}

// Set exitCode and let the event loop drain rather than calling process.exit().
// Hard-exiting while undici's keep-alive socket is still open trips a libuv
// assertion on Windows. Letting Node finish naturally avoids that entirely.
main();
