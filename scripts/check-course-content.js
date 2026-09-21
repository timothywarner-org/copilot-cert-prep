#!/usr/bin/env node
/**
 * Audit every tracked and new non-ignored Markdown file, including hidden skills.
 * Usage: node scripts/check-course-content.js [--json]
 * Checks local links, Markdown heading anchors, and standalone inline-code paths.
 * External HTTP links are checked by the separate link workflow. Code samples,
 * command arguments, and external-repository examples need editorial review.
 */
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");

// These exact paths are instructions to create files elsewhere or keep folders absent.
// Keeping the reasons next to each exemption prevents a broad ignore from hiding drift.
const examples = new Map([
  ["docs/HOOKS-AND-GOVERNANCE.md", new Map([
    [".github/hooks/tool-use-logger.json", "Optional file the learner creates during Demo A"],
    ["tool-use-logger.json", "Cleanup of the optional learner-created file"],
    ["copilot/managed-settings.json", "Configuration created in the separate enterprise repository"],
    [".github-private/copilot/", "Separate enterprise repository, never this public learner tree"],
    ["managed-settings.json", "Example file under the separate enterprise repository"],
    ["team-mappings.json", "Example file under the separate enterprise repository"],
    ["teams/class-demo.json", "Example file under the separate enterprise repository"]
  ])],
  [".github/copilot-instructions.md", new Map(
    ["demos/", "copilot/", "examples/", "course-materials/", "new-resources/", "exam-metadata/"]
      .map((name) => [name, "Explicit instruction not to recreate a removed directory"])
  )]
]);

/** Include new course files during editing; dependencies and ignored scratch files stay out. */
function trackedFiles() {
  return execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], { cwd: root, encoding: "utf8" })
    .split("\0").filter((file) => file && fs.existsSync(path.join(root, file)));
}

/** Preserve line numbers while keeping fenced examples out of navigation checks. */
function proseLines(text) {
  let fence = null;
  return text.split(/\r?\n/).map((line) => {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1][0];
      else if (marker[1][0] === fence) fence = null;
      return "";
    }
    return fence ? "" : line;
  });
}

/** Remove angle markup in one pass for anchor comparison, never for HTML rendering. */
function headingText(text) {
  const result = [];
  let depth = 0;
  let quote = null;
  for (const character of text) {
    if (depth > 0) {
      if (quote) {
        if (character === quote) quote = null;
      } else if (character === '"' || character === "'") quote = character;
      else if (character === "<") depth++;
      else if (character === ">") depth--;
    } else if (character === "<") depth = 1;
    else result.push(character);
  }
  return result.join("");
}

/** Match GitHub's heading IDs for the ordinary Markdown headings used in this repository. */
function headingIds(text) {
  const ids = new Set();
  const lines = proseLines(text);
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const atx = line.match(/^ {0,3}#{1,6}\s+(.+?)(?:\s+#+)?\s*$/);
    const setext = index + 1 < lines.length && /^ {0,3}(?:=+|-+)\s*$/.test(lines[index + 1]);
    if (atx || (setext && line.trim())) {
      const title = atx ? atx[1] : line;
      const base = headingText(title).toLowerCase().replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/&amp;/g, "&").replace(/[\uFE0E\uFE0F]/g, "").replace(/[^\p{L}\p{N}\p{M}\s_-]/gu, "").replace(/ /g, "-");
      let id = base;
      let suffix = 0;
      while (ids.has(id)) id = base + "-" + ++suffix;
      ids.add(id);
    }
    for (const match of line.matchAll(/<(?:a|[a-z][a-z0-9]*)\b[^>]*\b(?:id|name)=["']([^"']+)["']/gi)) ids.add(match[1]);
  }
  return ids;
}

/** Windows accepts wrong filename casing; GitHub and Linux do not. Check against Git's exact names. */
function publishedTarget(target, inventory) {
  const relative = path.relative(root, target).split(path.sep).join("/");
  if (relative.startsWith("../") || path.isAbsolute(relative)) return false;
  return inventory.has(relative) || [...inventory].some((file) => file.startsWith(relative.replace(/\/$/, "") + "/"));
}

/** Inline code paths are conventionally repository-relative, except skill resources local to their SKILL.md. */
function inlineTarget(file, target, inventory) {
  const candidates = [path.resolve(path.dirname(path.join(root, file)), target), path.resolve(root, target)];
  if (target.includes("*")) {
    return candidates.some((candidate) => {
      const relative = path.relative(root, candidate).split(path.sep).join("/");
      const expression = new RegExp("^" + relative.split("*").map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("[^/]*") + "$");
      return [...inventory].some((entry) => expression.test(entry));
    });
  }
  return candidates.some((candidate) => publishedTarget(candidate, inventory));
}

/** Split first so ambiguous repeated path segments cannot trigger regex backtracking. */
function isInlinePath(candidate) {
  if (/^[a-z][a-z0-9+.-]*:|[{}<>]|^\/|^(?:node|npm|pwsh|git|npx|python|gh)\s/i.test(candidate)) return false;
  const directory = candidate.endsWith("/");
  const segments = candidate.split("/");
  if (directory) segments.pop();
  if (!segments.length || segments.some((segment) => !/^[.\w *-]+$/.test(segment))) return false;
  if (directory) return true;
  const filename = segments.at(-1);
  const dot = filename.lastIndexOf(".");
  return dot > 0 && ["md", "pdf", "pptx", "json", "js", "ts", "ps1", "sh"].includes(filename.slice(dot + 1).toLowerCase());
}

/** Return an evidence summary as well as errors so the CLI states its actual coverage. */
function auditContent() {
  const inventory = new Set(trackedFiles());
  const files = [...inventory].filter((file) => /\.md$/i.test(file));
  const errors = [];
  const skippedExamples = [];
  const summary = { markdownFiles: files.length, localLinks: 0, headingAnchors: 0, inlinePaths: 0 };
  const headings = new Map();
  for (const file of files) {
    const text = fs.readFileSync(path.join(root, file), "utf8");
    for (const [index, line] of proseLines(text).entries()) {
      const location = file + ":" + (index + 1);
      // Inline code may demonstrate Markdown syntax; only rendered links are navigation.
      const navigation = line.replace(/`[^`]*`/g, "");
      const links = [...navigation.matchAll(/!?\[[^\]]*\]\(\s*(<[^>]+>|[^\s)]+)(?:\s+["'][^"']*["'])?\s*\)/g)].map((match) => match[1]);
      const reference = navigation.match(/^ {0,3}\[[^\]]+\]:\s*(<[^>]+>|\S+)/);
      if (reference) links.push(reference[1]);
      for (const raw of links) {
        const value = raw.replace(/^<|>$/g, "");
        if (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(value)) continue;
        summary.localLinks++;
        let destination;
        let anchor;
        try {
          const hash = value.indexOf("#");
          destination = decodeURIComponent((hash < 0 ? value : value.slice(0, hash)).split("?")[0]);
          anchor = hash < 0 ? "" : decodeURIComponent(value.slice(hash + 1));
        } catch {
          errors.push(location + ": malformed URL encoding in " + value);
          continue;
        }
        const absolute = destination ? path.resolve(destination.startsWith("/") ? root : path.dirname(path.join(root, file)), destination.replace(/^\//, "")) : path.join(root, file);
        if (!publishedTarget(absolute, inventory)) { errors.push(location + ": missing or incorrectly cased link target " + value); continue; }
        if (anchor && /\.md$/i.test(absolute)) {
          summary.headingAnchors++;
          if (!headings.has(absolute)) headings.set(absolute, headingIds(fs.readFileSync(absolute, "utf8")));
          if (!headings.get(absolute).has(anchor)) errors.push(location + ": missing heading anchor " + value);
        }
      }
      for (const match of line.matchAll(/`([^`\n]+)`/g)) {
        const candidate = match[1];
        // This recognizes standalone paths, not commands, JSON, URLs, or slash commands.
        if (!isInlinePath(candidate)) continue;
        summary.inlinePaths++;
        const reason = examples.get(file)?.get(candidate);
        if (reason) { skippedExamples.push({ file, path: candidate, reason }); continue; }
        if (!inlineTarget(file, candidate, inventory)) errors.push(location + ": missing inline path " + candidate);
      }
    }
  }
  return { ...summary, errors, skippedExamples };
}

/** Keep the hook's existing array contract while broadening coverage to the whole published tree. */
function checkContent() { return auditContent().errors; }
if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    if (args.some((arg) => arg !== "--json")) throw new Error("Usage: node scripts/check-course-content.js [--json]");
    const report = auditContent();
    if (args.includes("--json")) console.log(JSON.stringify(report, null, 2));
    else {
      report.errors.forEach((error) => console.error(error));
      console.log(`${report.errors.length ? "FAIL" : "PASS"}: ${report.markdownFiles} tracked/new Markdown files, ${report.localLinks} local links, ${report.headingAnchors} heading anchors, ${report.inlinePaths} inline paths.`);
      console.log(`${report.skippedExamples.length} explicit learner-created, external-repository, or deliberately absent path examples. External URLs and code samples require separate checks.`);
    }
    process.exitCode = report.errors.length ? 1 : 0;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
module.exports = { auditContent, checkContent, headingIds, proseLines, isInlinePath };
