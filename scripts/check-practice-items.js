#!/usr/bin/env node
/**
 * Gate every practice item in docs/practice/ with the repository's own item validator.
 *
 * Usage: node scripts/check-practice-items.js [--verbose]
 *
 * The learner-facing banks are written for reading, with collapsible rationale. The
 * validator in .github/skills/gh300-item-creator expects the delivery format Cert Buddy
 * emits. This script converts each item to that canonical form and runs the real validator
 * rather than reimplementing its rules, so the bank and the agent are held to one standard.
 *
 * It also applies set-level checks a single-item validator cannot see: answer-letter
 * distribution, scenario company variety, and duplicate stems.
 *
 * Exit 0 means structural checks passed. It does not certify factual accuracy.
 */
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { validateItem } = require("../.github/skills/gh300-item-creator/scripts/validate-output.js");

const root = path.resolve(__dirname, "..");
const bankDir = path.join(root, "docs", "practice");

/** Domain banks and the skill area each one reports to the validator. */
const SKILL_AREAS = {
  "domain-1-responsible-use.md": "Use GitHub Copilot responsibly",
  "domain-2-features.md": "Use GitHub Copilot features",
  "domain-3-data-architecture.md": "Understand GitHub Copilot data and architecture",
  "domain-4-prompt-engineering.md": "Apply prompt engineering and context crafting",
  "domain-5-productivity.md": "Improve developer productivity with GitHub Copilot",
  "domain-6-privacy-safeguards.md": "Configure privacy, content exclusions, and safeguards"
};

/**
 * Split one bank file into its items.
 *
 * @param {string} text File contents.
 * @returns {Array<{number: string, title: string, body: string}>}
 */
function splitItems(text) {
  const items = [];
  const pattern = /^## Q(\d+)\.\s*(.+)$/gm;
  const marks = [...text.matchAll(pattern)];
  marks.forEach((mark, index) => {
    const start = mark.index + mark[0].length;
    const end = index + 1 < marks.length ? marks[index + 1].index : text.length;
    items.push({ number: mark[1], title: mark[2].trim(), body: text.slice(start, end) });
  });
  return items;
}

/** Pull the four labelled lines out of a block, in order. */
function readChoices(block) {
  const found = new Map();
  for (const match of block.matchAll(/^-\s*\*\*([A-D])\*\*:\s*(.+)$/gm)) {
    if (!found.has(match[1])) {
      found.set(match[1], match[2].trim());
    }
  }
  return found;
}

/**
 * Parse one item into its parts.
 *
 * @param {{number: string, title: string, body: string}} item Raw item.
 * @returns {{parsed: object|null, errors: string[]}}
 */
function parseItem(item) {
  const errors = [];
  const detailsAt = item.body.indexOf("<details>");
  if (detailsAt < 0) {
    return { parsed: null, errors: ["Missing the <details> answer block."] };
  }
  const front = item.body.slice(0, detailsAt);
  const back = item.body.slice(detailsAt);

  const meta = front.match(/\*\*Objective:\*\*\s*(.+?)\s*·\s*\*\*Bloom:\*\*\s*(\S+)\s*·\s*\*\*Difficulty:\*\*\s*(\S+)/);
  if (!meta) {
    errors.push("Missing or malformed Objective/Bloom/Difficulty line.");
  }

  // The stem is everything between the metadata line and the first answer choice.
  const stemBlock = front
    .replace(/\*\*Objective:\*\*[^\n]*\n/, "")
    .split(/^-\s*\*\*A\*\*:/m)[0];
  const stem = stemBlock.replace(/\s+/g, " ").trim();
  if (!stem) {
    errors.push("Missing stem.");
  }

  const choices = readChoices(front);
  if (choices.size !== 4) {
    errors.push(`Expected four answer choices, found ${choices.size}.`);
  }

  const correct = back.match(/\*\*Correct answer:\s*([A-D])\*\*/);
  if (!correct) {
    errors.push("Missing or malformed 'Correct answer: X' line.");
  }

  const rationale = readChoices(back);
  if (rationale.size !== 4) {
    errors.push(`Expected four rationale entries, found ${rationale.size}.`);
  }

  const sourcesLine = back.match(/\*\*Sources:\*\*\s*(.+)/);
  const urls = sourcesLine ? [...sourcesLine[1].matchAll(/\((https?:\/\/[^)]+)\)/g)].map(m => m[1]) : [];
  if (urls.length === 0) {
    errors.push("Missing at least one source link.");
  }

  if (errors.length > 0) {
    return { parsed: null, errors };
  }
  return {
    parsed: {
      objective: meta[1],
      bloom: meta[2],
      difficulty: meta[3],
      stem,
      choices,
      correct: correct[1],
      rationale,
      urls
    },
    errors
  };
}

/**
 * Rebuild the item in the format the shared validator expects.
 *
 * Nothing is invented here: every field comes from the document.
 *
 * @param {object} parsed Parsed item.
 * @param {string} skillArea Domain name for this bank.
 * @returns {string} Canonical item text.
 */
function toCanonical(parsed, skillArea) {
  const lines = [
    "**metadata**",
    "exam: GH-300",
    `skill_area: "${skillArea}"`,
    `objective: "${parsed.objective}"`,
    `bloom: "${parsed.bloom}"`,
    `difficulty: "${parsed.difficulty}"`,
    "",
    "**question**",
    `stem: ${parsed.stem}`,
    ...["A", "B", "C", "D"].map(label => `- **${label}**: ${parsed.choices.get(label)}`),
    "",
    `**correct_answer:** ${parsed.correct}`,
    "",
    "**rationale:**",
    ...["A", "B", "C", "D"].map(label => `- **${label}**: ${parsed.rationale.get(label)}`),
    "",
    "**references:**",
    ...parsed.urls.map(url => `- ${url}`)
  ];
  return lines.join("\n");
}

function main() {
  const verbose = process.argv.includes("--verbose");
  if (!fs.existsSync(bankDir)) {
    console.error("FAIL: docs/practice does not exist.");
    process.exitCode = 1;
    return;
  }

  let total = 0;
  let failures = 0;
  let warnings = 0;
  const letters = new Map([["A", 0], ["B", 0], ["C", 0], ["D", 0]]);
  const stems = new Map();
  const companies = new Map();
  const companyNames = fs
    .readFileSync(path.join(root, "references", "fictional-companies.md"), "utf8")
    .split("\n")
    .map(line => line.match(/^\|\s*([A-Z][A-Za-z ]+?)\s*\|/))
    .filter(Boolean)
    .map(match => match[1].trim())
    .filter(name => name !== "Company");

  for (const [file, skillArea] of Object.entries(SKILL_AREAS)) {
    const full = path.join(bankDir, file);
    if (!fs.existsSync(full)) {
      console.error(`FAIL: missing bank file ${file}`);
      failures += 1;
      continue;
    }
    const text = fs.readFileSync(full, "utf8");
    const items = splitItems(text);
    if (items.length === 0) {
      console.error(`FAIL: ${file} contains no items.`);
      failures += 1;
    }

    for (const item of items) {
      total += 1;
      const label = `${file} Q${item.number}`;
      const { parsed, errors } = parseItem(item);
      if (!parsed) {
        failures += 1;
        for (const error of errors) {
          console.error(`FAIL: ${label}: ${error}`);
        }
        continue;
      }

      const canonical = toCanonical(parsed, skillArea);
      const result = validateItem(canonical, { draft: true });
      for (const error of result.errors) {
        console.error(`FAIL: ${label}: ${error}`);
        failures += 1;
      }
      for (const warning of result.warnings) {
        console.log(`REVIEW: ${label}: ${warning}`);
        warnings += 1;
      }

      letters.set(parsed.correct, letters.get(parsed.correct) + 1);

      const key = parsed.stem.toLowerCase().slice(0, 90);
      if (stems.has(key)) {
        console.error(`FAIL: ${label}: stem duplicates ${stems.get(key)}.`);
        failures += 1;
      }
      stems.set(key, label);

      for (const name of companyNames) {
        if (parsed.stem.includes(name)) {
          companies.set(name, (companies.get(name) ?? 0) + 1);
        }
      }

      if (verbose) {
        console.log(`  ok  ${label}  answer ${parsed.correct}  ${parsed.urls.length} source(s)`);
      }
    }
  }

  console.log(`\nItems: ${total}`);
  console.log(`Answer distribution: ${[...letters].map(([k, v]) => `${k}=${v}`).join("  ")}`);

  // A bank that leans on one letter teaches the letter, not the objective.
  const expected = total / 4;
  const skewed = [...letters.values()].some(count => Math.abs(count - expected) > Math.max(3, expected * 0.4));
  if (total > 0 && skewed) {
    console.error("FAIL: answer letters are unevenly distributed; rebalance the correct answers.");
    failures += 1;
  }

  const used = [...companies.entries()].sort((a, b) => b[1] - a[1]);
  console.log(`Scenario companies used: ${used.length} of ${companyNames.length}`);
  if (total >= 20 && used.length < 6) {
    console.error("FAIL: too few distinct scenario companies; vary them across the bank.");
    failures += 1;
  }

  if (failures === 0) {
    console.log(`PASS: ${total} items passed structural validation (${warnings} review note(s)).`);
    console.log("Structure only. Factual accuracy and one defensible answer still need human review.");
  } else {
    console.error(`\nFAIL: ${failures} problem(s) across ${total} item(s).`);
    process.exitCode = 1;
  }
}

module.exports = { splitItems, parseItem, toCanonical };

if (require.main === module) {
  main();
}
