#!/usr/bin/env node

const fs = require("fs");

const input = fs.readFileSync(0, "utf8");
const issues = [];

const requiredAreas = [
  /Use GitHub Copilot responsibly/i,
  /Use GitHub Copilot features/i,
  /Understand GitHub Copilot data and architecture/i,
  /Apply prompt engineering and context/i,
  /Improve developer productivity/i,
  /Configure privacy, content exclusions, and safeguards/i,
];

for (const area of requiredAreas) {
  if (!area.test(input)) {
    issues.push(`Missing required GH-300 area: ${area}`);
  }
}

if (!/15-20%/.test(input) || !/25-30%/.test(input)) {
  issues.push("Missing expected GH-300 weight ranges.");
}

if (!/total estimated hours|total study hours/i.test(input)) {
  issues.push("Missing total estimated hours summary.");
}

if (
  /\b(can't|don't|won't|it's|you're|we're|isn't|aren't|doesn't|didn't)\b/i.test(
    input,
  )
) {
  issues.push("Contains contractions (avoid in exam-prep outputs).");
}

if (issues.length === 0) {
  console.log("PASS: Study plan draft meets baseline checks.");
  process.exit(0);
}

console.log("FAIL: Study plan draft violates baseline checks.");
for (const issue of issues) {
  console.log(`- ${issue}`);
}
process.exit(1);
