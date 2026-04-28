#!/usr/bin/env node

const fs = require("fs");

const input = fs.readFileSync(0, "utf8");
const issues = [];

if (!/exercise\s*:/i.test(input)) {
  issues.push("Missing top-level exercise section.");
}

if (!/estimated_time\s*:\s*"?<10-20 min>"?|estimated_time\s*:/i.test(input)) {
  issues.push("Missing estimated_time field.");
}

if (!/cleanup\s*:/i.test(input)) {
  issues.push("Missing cleanup section.");
}

if (!/validation\s*:/i.test(input)) {
  issues.push("Missing validation sections.");
}

if (
  /\b(can't|don't|won't|it's|you're|we're|isn't|aren't|doesn't|didn't)\b/i.test(
    input,
  )
) {
  issues.push("Contains contractions (avoid in exam-style lab outputs).");
}

if (issues.length === 0) {
  console.log("PASS: Lab draft meets baseline structure checks.");
  process.exit(0);
}

console.log("FAIL: Lab draft violates baseline checks.");
for (const issue of issues) {
  console.log(`- ${issue}`);
}
process.exit(1);
