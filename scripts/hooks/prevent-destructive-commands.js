#!/usr/bin/env node
/**
 * Teaching example: veto a few destructive command patterns before a tool runs.
 * VS Code supplies one JSON event on stdin. An empty response preserves approvals.
 * This pattern matcher is bypassable and is not an enterprise security boundary.
 */
"use strict";
const fs = require("node:fs");

/** A deny is deliberate; everything else abstains so normal client policy still applies. */
function evaluate(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Expected a hook event object.");
  const command = payload.tool_input?.command;
  if (typeof command !== "string") return {};
  // These illustrate a veto, not a shell parser or a complete command allowlist.
  const patterns = [
    /\bgit\s+reset\s+--hard\b/i,
    /\bgit\s+push\b[^\r\n]*(?:--force\b|\s-f(?:\s|$))/i,
    /\bgit\s+checkout\s+--\s+/i,
    /\brm\s+-(?:rf|fr)\b/i,
    /\bRemove-Item\b(?=[^\r\n]*-Recurse\b)(?=[^\r\n]*-Force\b)/i
  ];
  if (!patterns.some(pattern => pattern.test(command))) return {};
  return {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: "The classroom hook vetoes this destructive command pattern. Review scope and use a safer operation."
    }
  };
}
if (require.main === module) {
  try {
    // Read through EOF: a timer could truncate a delayed or multi-chunk event.
    process.stdout.write(JSON.stringify(evaluate(JSON.parse(fs.readFileSync(0, "utf8")))) + "\n");
  } catch {
    console.error("Invalid hook input; no command was approved.");
    process.exitCode = 2;
  }
}
module.exports = { evaluate };
