#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function readStdinWithTimeout(timeoutMs = 50) {
  return new Promise((resolve) => {
    let data = "";
    let done = false;

    const finish = () => {
      if (!done) {
        done = true;
        resolve(data);
      }
    };

    const timer = setTimeout(finish, timeoutMs);

    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => {
      clearTimeout(timer);
      finish();
    });
    process.stdin.on("error", () => {
      clearTimeout(timer);
      finish();
    });

    process.stdin.resume();
  });
}

function parseJson(value) {
  if (!value || !value.trim()) {
    return {};
  }
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function getToolName(payload) {
  return (
    payload.tool_name ||
    payload.toolName ||
    payload.tool?.name ||
    payload.tool ||
    ""
  );
}

function shouldRunValidation(toolName) {
  return /edit|write|create|apply_patch|replace_string/i.test(toolName);
}

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

async function main() {
  const raw = await readStdinWithTimeout();
  const payload = parseJson(raw);
  const toolName = getToolName(payload);

  if (!shouldRunValidation(toolName)) {
    process.exit(0);
  }

  const repoRoot = process.cwd();
  const filesToCheck = [
    path.join(repoRoot, "README.md"),
    path.join(repoRoot, "CLAUDE.md"),
    path.join(repoRoot, ".github", "copilot-instructions.md"),
  ];

  const failures = [];

  for (const file of filesToCheck) {
    const content = safeRead(file);
    if (!content) {
      continue;
    }

    if (/COURSE-PLAN-SEPT-2025\.md/i.test(content)) {
      failures.push(
        `${path.relative(repoRoot, file)} references retired file COURSE-PLAN-SEPT-2025.md.`,
      );
    }

    if (/\|\s*1\.\s*Responsible AI\s*\|\s*7%\s*\|/i.test(content)) {
      failures.push(
        `${path.relative(repoRoot, file)} appears to use outdated fixed GH-300 weights instead of ranges.`,
      );
    }
  }

  if (failures.length > 0) {
    process.stderr.write("GH-300 content guardrail failed:\n");
    for (const failure of failures) {
      process.stderr.write(`- ${failure}\n`);
    }
    process.stderr.write(
      "Use January 2026 GH-300 weight ranges and current course-plan references before proceeding.\n",
    );
    process.exit(2);
  }

  process.exit(0);
}

main();
