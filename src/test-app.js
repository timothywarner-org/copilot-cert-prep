#!/usr/bin/env node
/**
 * Smoke-test the real menu, mixed-case search, no-match path, and clean exit.
 * Drive prompts as they appear so readline cannot discard prebuffered answers.
 */
"use strict";
const { spawn } = require("node:child_process");
const path = require("node:path");
const steps = [
  ["➜ ", "4"],
  ["Search:", "TeStInG"],
  ["➜ ", "4"],
  ["Search:", "gh300-no-match-928461"],
  ["➜ ", "q"]
];
const child = spawn(process.execPath, [path.join(__dirname, "app.js")], { stdio: ["pipe", "pipe", "pipe"] });
let output = "", buffer = "", errorOutput = "", step = 0, timedOut = false;
const timeout = setTimeout(() => { timedOut = true; child.kill(); }, 15000);
child.stdout.on("data", chunk => {
  const clean = chunk.toString().replace(/\x1b\[[0-9;]*m/g, "");
  output += clean; buffer += clean;
  if (step < steps.length && buffer.includes(steps[step][0])) {
    const answer = steps[step++][1];
    buffer = "";
    child.stdin.write(answer + "\n");
  }
});
child.stderr.on("data", chunk => { errorOutput += chunk; });
child.on("error", error => { clearTimeout(timeout); console.error(error.message); process.exitCode = 1; });
child.on("close", code => {
  clearTimeout(timeout);
  const passed = !timedOut && code === 0 && step === steps.length && !errorOutput &&
    /Found \d+ tip\(s\) matching "TeStInG"/.test(output) &&
    output.includes('No tips found matching "gh300-no-match-928461"') &&
    output.includes("Thanks for using GitHub Copilot Tips");
  console.log(passed ? "PASS: menu, mixed-case search, no-match result, and q exit." : "FAIL: application smoke test.");
  if (!passed) { console.error(errorOutput || output.slice(-1800)); process.exitCode = 1; }
});
