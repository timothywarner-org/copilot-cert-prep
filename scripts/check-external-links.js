#!/usr/bin/env node
/**
 * Verify every external hyperlink in the course materials over real HTTP.
 *
 * Usage: node scripts/check-external-links.js [--json] [--file <path>] [--quiet]
 *   --json   Emit machine-readable results instead of the table.
 *   --file   Check one file instead of every tracked Markdown file.
 *   --quiet  Print only failures and the summary line.
 *
 * check-course-content.js validates local links and inline paths and explicitly leaves
 * external URLs unchecked. This closes that gap: link rot in a certification resource list
 * sends a learner to a 404 during study, which is worse than omitting the link.
 *
 * Exit 0 means every URL resolved. Exit 1 means at least one is dead or permanently moved.
 * A 403 from a source known to challenge automated clients is reported, not failed, because
 * bot protection is not evidence that a page is gone.
 */
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const CONCURRENCY = 6;
const TIMEOUT_MS = 25000;
const RETRY_STATUS = new Set([429, 500, 502, 503, 504]);

/**
 * Hosts that answer automated requests with a challenge. A non-2xx here is inconclusive,
 * so the run reports it for a human to open rather than failing the build on it.
 */
const CHALLENGE_HOSTS = new Set(["github.com", "www.oreilly.com", "oreilly.com"]);

/** A browser user agent, used only to retry a host that refused the honest one. */
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";

/**
 * Statuses that mean "this client is not welcome" rather than "this page is gone".
 * 444 is nginx closing the connection, which several commercial sites use on bots.
 */
const REFUSED_CLIENT = new Set([401, 403, 429, 444]);

/** Skip patterns that are examples rather than destinations a learner should be able to open. */
const SKIP = [
  /^https?:\/\/example\.(com|org|net)/i,
  /^https?:\/\/localhost/i,
  /^https?:\/\/127\.0\.0\.1/i,
  /\{[^}]*\}/ // REST templates such as /orgs/{org}/copilot/...
];

/** Include new course files during editing; dependencies and ignored scratch files stay out. */
function trackedMarkdown() {
  return execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], {
    cwd: root,
    encoding: "utf8"
  })
    .split("\0")
    .filter(file => file.endsWith(".md") && fs.existsSync(path.join(root, file)));
}

/**
 * Pull external URLs out of Markdown.
 *
 * Trailing punctuation is stripped because a URL at the end of a sentence would otherwise
 * be requested with the period attached and report a false 404.
 *
 * @param {string} text File contents.
 * @returns {Map<string, number>} URL to the first line number where it appears.
 */
function extractUrls(text) {
  const found = new Map();
  text.split(/\r?\n/).forEach((line, index) => {
    for (const match of line.matchAll(/https?:\/\/[^\s<>"'`\])]+/g)) {
      const url = match[0].replace(/[.,;:!?]+$/, "");
      if (SKIP.some(pattern => pattern.test(url))) {
        continue;
      }
      if (!found.has(url)) {
        found.set(url, index + 1);
      }
    }
  });
  return found;
}

/**
 * Request one URL, preferring HEAD and falling back to GET.
 *
 * Some documentation hosts reject HEAD outright, so a HEAD failure alone is not a verdict.
 *
 * @param {string} url URL to check.
 * @param {string} method HTTP method.
 * @param {string} [agent] User agent to send.
 * @returns {Promise<{status: number, finalUrl: string}>}
 */
async function request(url, method, agent) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        // Identify the checker honestly; an absent user agent is refused by several hosts.
        "user-agent":
          agent ||
          "gh300-course-link-checker/1.0 (+https://github.com/timothywarner-org/copilot-cert-prep)",
        accept: "text/html,application/xhtml+xml,*/*"
      }
    });
    return { status: response.status, finalUrl: response.url || url };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Classify one URL.
 *
 * @param {string} url URL to check.
 * @returns {Promise<{url: string, state: string, status: number|string, finalUrl: string, note: string}>}
 */
async function check(url) {
  let last = null;
  let refusedHonestAgent = false;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      let result = await request(url, "HEAD");
      if (result.status >= 400) {
        result = await request(url, "GET");
      }
      // Some commercial sites drop a non-browser agent outright. Retrying with a browser
      // agent distinguishes "blocks robots" from "page is gone", which is the distinction
      // that matters when the link is a place a learner has to buy something.
      if (REFUSED_CLIENT.has(result.status)) {
        const retried = await request(url, "GET", BROWSER_UA);
        if (retried.status >= 200 && retried.status < 300) {
          refusedHonestAgent = true;
          result = retried;
        }
      }
      last = result;
      if (!RETRY_STATUS.has(result.status)) {
        break;
      }
    } catch (error) {
      last = { status: error.name === "AbortError" ? "TIMEOUT" : "NETWORK", finalUrl: url, note: error.message };
    }
    // One short pause, so a rate limit is not recorded as a dead page.
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  const { status, finalUrl } = last;
  const host = (() => {
    try {
      return new URL(url).host;
    } catch {
      return "";
    }
  })();

  if (typeof status !== "number") {
    return { url, state: "UNREACHABLE", status, finalUrl, note: last.note ?? "" };
  }
  if (status >= 200 && status < 300) {
    const moved = stripTrackingAndCase(finalUrl) !== stripTrackingAndCase(url);
    if (refusedHonestAgent) {
      return {
        url,
        state: "CHALLENGED",
        status,
        finalUrl,
        note: "reachable, but the host refuses non-browser clients"
      };
    }
    return {
      url,
      state: moved ? "REDIRECT" : "OK",
      status,
      finalUrl,
      note: moved ? "resolves to a different URL" : ""
    };
  }
  if (REFUSED_CLIENT.has(status) && CHALLENGE_HOSTS.has(host)) {
    return { url, state: "CHALLENGED", status, finalUrl, note: "host challenges automated clients" };
  }
  return { url, state: "DEAD", status, finalUrl, note: "" };
}

/** Compare URLs without fragment or trailing-slash noise so a cosmetic change is not a redirect. */
function stripTrackingAndCase(value) {
  try {
    const parsed = new URL(value);
    parsed.hash = "";
    return `${parsed.origin}${parsed.pathname.replace(/\/$/, "")}${parsed.search}`.toLowerCase();
  } catch {
    return String(value).toLowerCase();
  }
}

/** Bounded parallelism keeps a large run from looking like abuse to a documentation host. */
async function mapWithLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index]);
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes("--json");
  const quiet = args.includes("--quiet");
  const fileIndex = args.indexOf("--file");
  const files = fileIndex >= 0 ? [args[fileIndex + 1]] : trackedMarkdown();

  const sources = new Map();
  for (const file of files) {
    // --file may name a path outside the repository, so only repo-relative names get joined.
    const resolved = path.isAbsolute(file) ? file : path.join(root, file);
    const text = fs.readFileSync(resolved, "utf8");
    for (const [url, line] of extractUrls(text)) {
      if (!sources.has(url)) {
        sources.set(url, []);
      }
      sources.get(url).push(`${file}:${line}`);
    }
  }

  const urls = [...sources.keys()].sort();
  if (!asJson) {
    console.log(`Checking ${urls.length} unique external URLs across ${files.length} files.\n`);
  }

  const results = await mapWithLimit(urls, CONCURRENCY, check);
  const byState = state => results.filter(result => result.state === state);

  if (asJson) {
    console.log(JSON.stringify(results.map(r => ({ ...r, sources: sources.get(r.url) })), null, 2));
  } else {
    for (const result of results) {
      if (quiet && (result.state === "OK")) {
        continue;
      }
      const where = sources.get(result.url)[0];
      console.log(`${result.state.padEnd(11)} ${String(result.status).padEnd(8)} ${result.url}`);
      if (result.state === "REDIRECT") {
        console.log(`${" ".repeat(20)}-> ${result.finalUrl}  (${where})`);
      } else if (result.state !== "OK") {
        console.log(`${" ".repeat(20)}   ${where}${result.note ? `  [${result.note}]` : ""}`);
      }
    }
    console.log(
      `\nOK ${byState("OK").length} | REDIRECT ${byState("REDIRECT").length} | ` +
        `CHALLENGED ${byState("CHALLENGED").length} | UNREACHABLE ${byState("UNREACHABLE").length} | ` +
        `DEAD ${byState("DEAD").length}`
    );
  }

  // Only a confirmed dead page fails the run. A challenge or a timeout needs a human look.
  if (byState("DEAD").length > 0) {
    console.error(
      [
        "",
        "    Fix each DEAD link one of three ways:",
        "      1. Find where the page moved and record the canonical post-redirect URL.",
        "      2. If the content is gone, replace it with the nearest current first-party page.",
        "      3. If the host refuses robots but the page is fine in a browser, add its",
        "         hostname to CHALLENGE_HOSTS in this script with a comment saying why.",
        "    A REDIRECT is not a failure, but it does mean the page moved; canonicalize it."
      ].join("\n")
    );
    process.exitCode = 1;
  }
}

module.exports = { extractUrls, stripTrackingAndCase };

if (require.main === module) {
  main().catch(error => {
    console.error(`Link check failed: ${error.message}`);
    process.exitCode = 2;
  });
}
