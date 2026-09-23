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

/**
 * A document declares its own exemptions, so adding one never means editing this script.
 * Put this on any line of the file that needs it:
 *
 *   <!-- allow-missing-path: teams/class-demo.json | lives in the separate enterprise repo -->
 *
 * The reason is required, and an exemption that no longer matches anything is reported,
 * so the list cannot quietly rot into a blanket ignore.
 */
const DIRECTIVE = /<!--\s*allow-missing-path:\s*([^|>]+?)\s*(?:\|\s*([^>]*?))?\s*-->/g;

/** Printed with every failure, because a checker that cannot be satisfied gets reworded around. */
const REMEDY = [
  "    Fix it one of three ways:",
  "      1. If it is a real file, write the path repository-relative, for example src/tips.json.",
  "      2. If it is prose about a URL, put the whole URL in the backticks or drop the backticks.",
  "      3. If it is deliberately absent, declare it in this file:",
  "         <!-- allow-missing-path: THE/PATH | why it is absent -->"
].join("\n");

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

/**
 * Could this directory-style candidate plausibly name a location in this repository?
 *
 * Anything ending in a slash matches the path shape, so unqualified prose such as
 * `concepts/context/` was reported as a broken reference. A real directory reference here
 * starts from a directory that exists, so a first segment that names nothing in the tree is
 * prose about somebody else's layout. A wrong path under a real directory still fails,
 * which is the case worth catching.
 *
 * @param {string} candidate Backticked text, already shaped like a path.
 * @param {Set<string>} inventory Every tracked file, repository-relative.
 * @returns {boolean}
 */
function namesARepositoryLocation(candidate, inventory) {
  if (!candidate.endsWith("/")) return true;
  const first = candidate.split("/")[0];
  if (!first || first === "." || first === "..") return true;
  for (const entry of inventory) {
    if (entry === first || entry.startsWith(first + "/")) return true;
  }
  return false;
}

/**
 * Character ranges on a line that belong to a URL or a link destination.
 *
 * A backticked fragment of a URL is the single most common false positive: `concepts/context/`
 * looks exactly like a directory. Anything sitting inside one of these ranges is prose about
 * an address, not a claim that a repository file exists.
 *
 * @param {string} line One line of prose.
 * @returns {Array<[number, number]>} Start and end offsets, end exclusive.
 */
function addressRanges(line) {
  const ranges = [];
  for (const match of line.matchAll(/[a-z][a-z0-9+.-]*:\/\/\S+/gi)) {
    ranges.push([match.index, match.index + match[0].length]);
  }
  for (const match of line.matchAll(/\]\(\s*<?([^\s)>]+)>?/g)) {
    ranges.push([match.index, match.index + match[0].length]);
  }
  return ranges;
}

/**
 * Does a backticked candidate describe an address rather than a repository file?
 *
 * True when the backticks sit inside a URL, or when the text also appears inside a URL
 * elsewhere on the same line, which is how a path fragment gets quoted in prose.
 *
 * @param {string} line The whole line.
 * @param {number} at Offset of the backticked run.
 * @param {string} candidate The text between the backticks.
 * @returns {boolean}
 */
function describesAnAddress(line, at, candidate) {
  const ranges = addressRanges(line);
  if (ranges.some(([start, end]) => at >= start && at < end)) return true;
  return ranges.some(([start, end]) => line.slice(start, end).includes(candidate));
}

/**
 * Exemptions a document declares about itself.
 *
 * @param {string} text Whole file contents.
 * @returns {{allowed: Map<string, string>, errors: string[]}}
 */
function declaredExemptions(text) {
  const allowed = new Map();
  const errors = [];
  text.split(/\r?\n/).forEach((line, index) => {
    // Documenting the directive must not declare one, so an example shown inside inline
    // code is not a declaration. This file's own guidance in CLAUDE.md depends on that.
    const declarations = line.replace(/`[^`\n]*`/g, "");
    for (const match of declarations.matchAll(DIRECTIVE)) {
      const target = match[1].trim();
      const reason = (match[2] || "").trim();
      if (!reason) {
        errors.push(`:${index + 1}: allow-missing-path for ${target} needs a reason after a | character`);
        continue;
      }
      allowed.set(target, reason);
    }
  });
  return { allowed, errors };
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
    const { allowed, errors: directiveErrors } = declaredExemptions(text);
    const usedExemptions = new Set();
    for (const problem of directiveErrors) errors.push(file + problem);
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
        // A fragment of an address on this line is prose about a URL, not a file claim.
        if (describesAnAddress(line, match.index, candidate)) continue;
        // A directory under a root this repository does not have is somebody else's layout.
        if (!namesARepositoryLocation(candidate, inventory)) continue;
        summary.inlinePaths++;
        const reason = allowed.get(candidate);
        if (reason) {
          usedExemptions.add(candidate);
          skippedExamples.push({ file, path: candidate, reason });
          continue;
        }
        if (!inlineTarget(file, candidate, inventory)) {
          errors.push(`${location}: missing inline path ${candidate}\n${REMEDY}`);
        }
      }
    }
    // A stale exemption is how an ignore list turns into a blanket one.
    for (const [target] of allowed) {
      if (!usedExemptions.has(target)) {
        errors.push(`${file}: allow-missing-path for ${target} matches nothing; remove it`);
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
module.exports = {
  auditContent,
  checkContent,
  headingIds,
  proseLines,
  isInlinePath,
  addressRanges,
  describesAnAddress,
  declaredExemptions,
  namesARepositoryLocation
};
