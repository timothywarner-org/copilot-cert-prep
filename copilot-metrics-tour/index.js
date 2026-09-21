#!/usr/bin/env node
/**
 * Read the current GitHub Copilot aggregate usage-report format.
 * Usage: node index.js --demo | --file report.ndjson | --org organization
 * Live mode uses GITHUB_TOKEN or GH_TOKEN; credentials and signed URLs are never printed.
 */
"use strict";
const fs = require("node:fs");
const path = require("node:path");

/** NDJSON errors identify the line without echoing potentially private report contents. */
function parseReport(text) {
  const records = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter(line => line.trim()).map((line, index) => {
    try { return JSON.parse(line); } catch { throw new Error("Invalid report JSON on line " + (index + 1)); }
  });
  const days = [];
  for (const record of records) {
    if (!record || typeof record !== "object" || Array.isArray(record)) throw new Error("Expected aggregate NDJSON objects.");
    if ("day_totals" in record && !Array.isArray(record.day_totals)) throw new Error("day_totals must be an array.");
    days.push(...(record.day_totals ?? [record]));
  }
  if (!days.length) throw new Error("The report contains no aggregate days.");
  const seen = new Set();
  for (const day of days) {
    if (!day || typeof day !== "object" || !/^\d{4}-\d{2}-\d{2}$/.test(day.day || "")) throw new Error("An aggregate day is missing a date.");
    if ("user_login" in day || "user_id" in day) throw new Error("Use an organization aggregate report, not a user-level report.");
    if (seen.has(day.day)) throw new Error("Duplicate day: use one organization's non-overlapping aggregate report.");
    seen.add(day.day);
    if (day.totals_by_feature !== undefined && !Array.isArray(day.totals_by_feature)) throw new Error("totals_by_feature must be an array.");
  }
  return days.sort((a, b) => a.day.localeCompare(b.day));
}

/** Missing telemetry is unknown, never an invented zero. */
function count(value, label) {
  if (value === undefined || value === null) return null;
  if (!Number.isSafeInteger(value) || value < 0) throw new Error("Invalid nonnegative count: " + label);
  return value;
}
function sumKnown(values) {
  return values.some(value => value === null) ? null : values.reduce((sum, value) => sum + value, 0);
}

/** Completion acceptance has a feature-specific denominator; daily users are not additive. */
function summarize(days) {
  const completions = days.map(day => (day.totals_by_feature || []).find(feature => feature.feature === "code_completion"));
  const generated = sumKnown(completions.map(feature => count(feature?.code_generation_activity_count, "completion generations")));
  const accepted = sumKnown(completions.map(feature => count(feature?.code_acceptance_activity_count, "completion acceptances")));
  const active = days.map(day => count(day.daily_active_users, "daily active users"));
  return {
    start: days[0].day,
    end: days.at(-1).day,
    days: days.length,
    peakDailyUsers: active.some(value => value === null) ? null : Math.max(...active),
    interactions: sumKnown(days.map(day => count(day.user_initiated_interaction_count, "interactions"))),
    generated,
    accepted,
    acceptancePercent: generated && accepted !== null ? accepted / generated * 100 : null,
    cliPrompts: sumKnown(days.map(day => count(day.totals_by_cli?.prompt_count, "CLI prompts")))
  };
}

/** Only the GitHub API request carries authentication; signed downloads authorize themselves. */
async function fetchReport(org, token, fetchImpl = fetch) {
  if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38})$/.test(org)) throw new Error("Provide a valid organization login.");
  if (!token) throw new Error("Set GITHUB_TOKEN or GH_TOKEN for live mode, or use --demo.");
  let response;
  try {
    response = await fetchImpl("https://api.github.com/orgs/" + encodeURIComponent(org) + "/copilot/metrics/reports/organization-28-day/latest", {
      headers: { Accept: "application/vnd.github+json", Authorization: "Bearer " + token, "X-GitHub-Api-Version": "2026-03-10" },
      redirect: "error",
      signal: AbortSignal.timeout(30000)
    });
  } catch { throw new Error("GitHub report request failed; check connectivity and retry."); }
  if (!response.ok) throw new Error("GitHub report request returned HTTP " + response.status + ". Check account access, token permissions, and report availability.");
  let manifest;
  try { manifest = await response.json(); } catch { throw new Error("GitHub returned an invalid report manifest."); }
  if (!Array.isArray(manifest.download_links) || !manifest.download_links.length) throw new Error("No report download links were returned.");
  const chunks = [];
  for (const link of manifest.download_links) {
    let url;
    try { url = new URL(link); } catch { throw new Error("Invalid report download URL."); }
    if (url.protocol !== "https:" || url.username || url.password) throw new Error("Report downloads require HTTPS without embedded credentials.");
    let report;
    try {
      report = await fetchImpl(url.href, { redirect: "error", signal: AbortSignal.timeout(30000) });
    } catch { throw new Error("Report download failed; request fresh links and retry."); }
    if (!report.ok) throw new Error("Report download returned HTTP " + report.status + "; request fresh links and retry.");
    chunks.push(await report.text());
  }
  return parseReport(chunks.join("\n"));
}

/** Output labels keep the synthetic classroom data and measurement limits visible. */
async function main(args) {
  let days;
  let label;
  if (args.length === 1 && args[0] === "--demo") {
    days = parseReport(fs.readFileSync(path.join(__dirname, "fixtures/synthetic-organization.ndjson"), "utf8"));
    label = "SYNTHETIC CLASSROOM DATA - not a real organization's usage";
  } else if (args.length === 2 && args[0] === "--file") {
    days = parseReport(fs.readFileSync(args[1], "utf8"));
    label = "LOCAL AGGREGATE REPORT";
  } else if (args.length === 2 && args[0] === "--org") {
    days = await fetchReport(args[1], process.env.GITHUB_TOKEN || process.env.GH_TOKEN);
    label = "LIVE ORGANIZATION AGGREGATE REPORT";
  } else {
    throw new Error("Usage: node index.js --demo | --file report.ndjson | --org organization");
  }
  const result = summarize(days);
  const show = value => value === null ? "unavailable" : value;
  console.log(label);
  console.log("Observed days: " + result.start + " through " + result.end + " (" + result.days + " days)");
  console.log("Peak daily active users: " + show(result.peakDailyUsers) + " (not unique users over the period)");
  console.log("User-initiated interactions: " + show(result.interactions));
  console.log("Code completions accepted/generated: " + show(result.accepted) + "/" + show(result.generated));
  console.log("Completion acceptance: " + (result.acceptancePercent === null ? "unavailable" : result.acceptancePercent.toFixed(1) + "%"));
  console.log("CLI prompts: " + show(result.cliPrompts) + " (separate surface measure)");
  console.log("\nDiscuss: What outcome would establish faster, safer delivery?");
  console.log("Activity is not measured time saved, financial ROI, code quality, or individual performance.");
}
if (require.main === module) main(process.argv.slice(2)).catch(error => {
  console.error("Metrics tour: " + error.message);
  process.exitCode = 1;
});
module.exports = { parseReport, summarize, fetchReport };
