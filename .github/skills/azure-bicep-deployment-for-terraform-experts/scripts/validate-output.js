#!/usr/bin/env node

const fs = require("fs");

const input = fs.readFileSync(0, "utf8");
const issues = [];

const requiredHeadings = [
  /Requirements Validation/i,
  /Documentation Lookup Summary/i,
  /Recommended Architecture/i,
  /Primary WAF Pillar/i,
  /Cross-Pillar Trade-offs/i,
  /Azure Services and Configurations/i,
  /Implementation Guidance/i,
  /Validation Checklist/i,
];

for (const rule of requiredHeadings) {
  if (!rule.test(input)) {
    issues.push(`Missing required section matching: ${rule}`);
  }
}

const requiredBlueprintKeys = [
  /bicep_deployment_blueprint\s*:/i,
  /terraform_to_bicep_map\s*:/i,
  /module_strategy\s*:/i,
  /parameter_strategy\s*:/i,
  /deployment_sequence\s*:/i,
  /governance_controls\s*:/i,
  /rollback_plan\s*:/i,
  /references\s*:/i,
];

for (const keyRule of requiredBlueprintKeys) {
  if (!keyRule.test(input)) {
    issues.push(`Missing blueprint key matching: ${keyRule}`);
  }
}

if (!/https:\/\/learn\.microsoft\.com\//i.test(input)) {
  issues.push("Missing Microsoft Learn reference URL.");
}

if (
  /\b(can't|don't|won't|it's|you're|we're|isn't|aren't|doesn't|didn't)\b/i.test(
    input,
  )
) {
  issues.push("Contains contractions. Use formal, deterministic wording.");
}

if (issues.length === 0) {
  console.log("PASS: Output meets deterministic Azure Bicep skill checks.");
  process.exit(0);
}

console.log("FAIL: Output violates deterministic Azure Bicep skill checks.");
for (const issue of issues) {
  console.log(`- ${issue}`);
}
process.exit(1);
