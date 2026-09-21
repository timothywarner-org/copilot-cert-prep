#!/usr/bin/env node
/**
 * Check one original GH-300 question before delivery.
 * Usage: Get-Content -Raw question.md | node validate-output.js
 * Add --draft for an internal Markdown draft containing the answer and rationale.
 * Exit 0 means structural checks passed; it does not certify factual accuracy.
 */
"use strict";
const fs = require("node:fs");

/** Keep parsing separate from the CLI so tests can exercise the delivery contract. */
function validateItem(input, { draft = false } = {}) {
  const errors = [];
  const warnings = [];
  const choices = new Map();
  // Reject batches instead of silently validating only question one.
  const countSection = (name) => (input.match(new RegExp(`^\\s*(?:[-#]+\\s*)?(?:\\*\\*)?${name}(?:\\*\\*)?\\s*:?\\s*$`, "gim")) || []).length;
  if (countSection("metadata") !== 1 || countSection("question") !== 1) {
    errors.push("Provide exactly one metadata section and one question section.");
  }
  if (!/\bexam[ \t]*:[ \t]*["'`]?GH-300\b/i.test(input)) errors.push("Metadata must identify exam: GH-300.");
  for (const field of ["skill_area", "objective", "bloom", "difficulty", "stem"]) {
    if (!new RegExp(`\\b${field}[ \\t]*:[ \\t]*[^\\s]`, "i").test(input)) errors.push(`Missing value: ${field}.`);
  }
  // Rationale also has A-D labels; only the question owns answer choices.
  const questionText = input.split(/^\s*(?:[-#]+\s*)?(?:\*\*)?(?:result|correct_answer|rationale|references)(?:\*\*)?\s*:/im)[0];
  const optionPattern = /^\s*(?:[-*]\s*)?(?:\*\*)?([A-Z])(?:\*\*)?[ \t]*:[ \t]*(.*)$/gim;
  for (const match of questionText.matchAll(optionPattern)) {
    const label = match[1].toUpperCase();
    if (!"ABCD".includes(label)) errors.push(`Unexpected answer choice ${label}; provide exactly A-D.`);
    const value = match[2].trim().replace(/^["'`]|["'`]$/g, "").trim();
    if (choices.has(label)) errors.push(`Duplicate answer choice ${label}; check one question at a time.`);
    if (!value) errors.push(`Answer choice ${label} is empty.`);
    choices.set(label, value);
  }
  if (!["A", "B", "C", "D"].every((label) => choices.has(label))) errors.push("Missing one or more answer choices A-D (use A: through D:).");
  if (new Set([...choices.values()].map((value) => value.toLowerCase())).size !== choices.size) errors.push("Answer choices must be distinct.");
  if (/all of the above|none of the above|both a and b/i.test(input)) errors.push("Contains a prohibited all/none/both answer pattern.");
  if (/\b(?:can['’]t|don['’]t|won['’]t|it['’]s|you['’]re|we['’]re|isn['’]t|aren['’]t|doesn['’]t|didn['’]t|shouldn['’]t|couldn['’]t|wouldn['’]t)\b/i.test(input)) errors.push("Use no contractions in exam-style content.");
  if (!draft && /correct[_ ]answer|^\s*(?:[-#]+\s*)?(?:\*\*)?(?:result|rationale|references)(?:\*\*)?\s*:/im.test(input)) errors.push("Phase 1 must not reveal the answer, rationale, or references; use --draft for internal review.");
  if (choices.size === 4 && [...choices.values()].every(Boolean)) {
    const lengths = [...choices.entries()].map(([label, value]) => ({ label, length: value.length })).sort((a, b) => b.length - a.length);
    const longest = lengths[0].length;
    const shortest = lengths[3].length;
    // Length is an editorial signal, not evidence that an answer is correct or wrong.
    if (longest - shortest > 40 && longest / shortest > 1.4) warnings.push("Review uneven choice lengths for a giveaway; prefer parallel grammar and comparable detail.");
    const answer = input.match(/correct[_ ]answer(?:\s+letter)?[\s*]*(?:is|:)\s*["'`*]*([A-D])\b/i)?.[1].toUpperCase();
    if (draft && answer === lengths[0].label && longest - lengths[1].length >= 12) warnings.push("The correct answer is conspicuously longest; review for length bias.");
  }
  return { errors, warnings };
}
if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    if (args.some((arg) => arg !== "--draft")) throw new Error("Usage: node validate-output.js [--draft] < question.md");
    const { errors, warnings } = validateItem(fs.readFileSync(0, "utf8"), { draft: args.includes("--draft") });
    for (const warning of warnings) console.log(`REVIEW: ${warning}`);
    for (const error of errors) console.error(`FAIL: ${error}`);
    if (!errors.length) console.log("PASS: Structural checks passed. Verify sources, distractors, and one defensible answer manually.");
    process.exitCode = errors.length ? 1 : 0;
  } catch (error) {
    console.error(`FAIL: ${error.message}`);
    process.exitCode = 1;
  }
}
module.exports = { validateItem };
