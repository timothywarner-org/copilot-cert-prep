#!/usr/bin/env node
/**
 * Check local Markdown links in the maintained teaching entry points.
 * Usage: node scripts/check-course-content.js
 * External URLs and heading fragments need separate editorial/source review.
 */
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");

/** Focus on published current materials; historical assets keep their original provenance. */
function checkContent() {
  const files = [
    "README.md", "COURSE-PLAN.md", "CLAUDE.md",
    "docs/CLASS-ACTIVITIES.md", "docs/QUICK-REFERENCE.md", "docs/GH-300-STUDY-GUIDE.md",
    "docs/HOOKS-AND-GOVERNANCE.md", "docs/MINI-MOCK.md", "docs/exam-notes-and-links.md",
    "docs/SEPTEMBER-2026-REFRESH.md", "copilot-metrics-tour/README.md",
    "src/GH-Copilot-Tips-App-README.md"
  ];
  const errors = [];
  for (const file of files) {
    const absolute = path.join(root, file);
    if (!fs.existsSync(absolute)) { errors.push(file + ": missing required teaching file"); continue; }
    const content = fs.readFileSync(absolute, "utf8");
    for (const match of content.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].replace(/^<|>$/g, "").split("#")[0];
      if (!target || /^[a-z]+:/i.test(target)) continue;
      if (!fs.existsSync(path.resolve(path.dirname(absolute), decodeURIComponent(target)))) errors.push(file + ": missing link target " + target);
    }
    if (/\u2014/.test(content)) errors.push(file + ": replace em dash with plain punctuation");
  }
  return errors;
}
if (require.main === module) {
  try {
    const errors = checkContent();
    errors.forEach(error => console.error(error));
    if (!errors.length) console.log("PASS: current teaching files and local file links exist. External URLs and anchors require separate review.");
    process.exitCode = errors.length ? 1 : 0;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
module.exports = { checkContent };
