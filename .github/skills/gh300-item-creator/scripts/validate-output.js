#!/usr/bin/env node

const fs = require("fs");

const input = fs.readFileSync(0, "utf8");
const issues = [];
const choicePattern = /^\s*(?:-\s*)?([ABCD])\s*:\s*["'`]?(.+?)["'`]?\s*$/i;

function normalizeChoice(choiceText) {
  return choiceText.trim().replace(/\s+/g, " ");
}

function extractChoices(text) {
  const found = {};
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(choicePattern);
    if (!match) {
      continue;
    }

    const label = match[1].toUpperCase();
    if (!found[label]) {
      found[label] = normalizeChoice(match[2]);
    }

    if (["A", "B", "C", "D"].every((letter) => found[letter])) {
      break;
    }
  }
  return found;
}

const choices = extractChoices(input);
const hasAllChoices = ["A", "B", "C", "D"].every((letter) => choices[letter]);

if (
  !/\bA\s*:/m.test(input) ||
  !/\bB\s*:/m.test(input) ||
  !/\bC\s*:/m.test(input) ||
  !/\bD\s*:/m.test(input)
) {
  issues.push("Missing one or more answer choices A-D.");
}

if (/all of the above|none of the above|both a and b/i.test(input)) {
  issues.push("Contains prohibited all/none/both pattern.");
}

if (
  /\b(can't|don't|won't|it's|you're|we're|isn't|aren't|doesn't|didn't)\b/i.test(
    input,
  )
) {
  issues.push("Contains contractions (not allowed in exam-style content).");
}

if (!/metadata/i.test(input) || !/question/i.test(input)) {
  issues.push("Missing expected GH-300 item structure sections.");
}

if (hasAllChoices) {
  const lengths = Object.entries(choices).map(([label, text]) => ({
    label,
    length: text.length,
  }));
  const values = lengths.map((entry) => entry.length);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = max - min;
  const ratio = min > 0 ? max / min : Infinity;

  if (spread > 40 && ratio > 1.4) {
    issues.push(
      "Answer choice lengths are too uneven. Keep options parallel and similar in length.",
    );
  }

  const correctMatch = input.match(
    /correct answer(?:\s+letter)?\s*(?:is|:)\s*([ABCD])/i,
  );
  if (correctMatch) {
    const correctLetter = correctMatch[1].toUpperCase();
    const sorted = [...lengths].sort((a, b) => b.length - a.length);
    const correctEntry = lengths.find((entry) => entry.label === correctLetter);

    if (
      correctEntry &&
      sorted.length >= 2 &&
      correctEntry.length === sorted[0].length &&
      sorted[0].length - sorted[1].length >= 12
    ) {
      issues.push(
        "Correct answer is conspicuously longer than other options. Reduce giveaway length bias.",
      );
    }
  }
}

if (issues.length === 0) {
  console.log("PASS: Item draft meets structural and answer-quality checks.");
  process.exit(0);
}

console.log("FAIL: Item draft violates baseline checks.");
for (const issue of issues) {
  console.log(`- ${issue}`);
}
process.exit(1);
