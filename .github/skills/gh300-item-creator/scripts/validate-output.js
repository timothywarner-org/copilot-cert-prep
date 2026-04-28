#!/usr/bin/env node

const fs = require("fs");

const input = fs.readFileSync(0, "utf8");
const issues = [];

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

if (issues.length === 0) {
  console.log("PASS: Item draft meets baseline structural checks.");
  process.exit(0);
}

console.log("FAIL: Item draft violates baseline checks.");
for (const issue of issues) {
  console.log(`- ${issue}`);
}
process.exit(1);
