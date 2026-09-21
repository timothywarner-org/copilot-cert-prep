#!/usr/bin/env node
/**
 * PostToolUse reminder: validate repository links after a file-editing tool.
 * A post-event check can report a problem; it cannot undo an already completed edit.
 */
"use strict";
const fs = require("node:fs");
const { checkContent } = require("../check-course-content.js");
try {
  const event = JSON.parse(fs.readFileSync(0, "utf8"));
  if (!event || typeof event !== "object" || Array.isArray(event)) throw new Error("Invalid event");
  if (/edit|write|create|apply_patch|replace_string/i.test(event.tool_name || "")) {
    const failures = checkContent();
    if (failures.length) {
      console.error("GH-300 content check:\n" + failures.join("\n"));
      process.exitCode = 2;
    }
  }
} catch {
  console.error("Content check could not read the hook event or repository.");
  process.exitCode = 1;
}
