#!/usr/bin/env node

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

function findToolName(payload) {
  return (
    payload.tool_name ||
    payload.toolName ||
    payload.tool?.name ||
    payload.tool ||
    ""
  );
}

function findCommand(payload) {
  const input = payload.tool_input || payload.toolInput || payload.input || {};
  if (typeof input.command === "string") {
    return input.command;
  }
  if (typeof payload.command === "string") {
    return payload.command;
  }
  return "";
}

async function main() {
  const raw = await readStdinWithTimeout();
  const payload = parseJson(raw);
  const toolName = findToolName(payload);
  const command = findCommand(payload);

  const appliesToTerminalTools = /run_in_terminal|send_to_terminal/i.test(
    toolName,
  );
  const riskyPatterns = [
    /git\s+reset\s+--hard/i,
    /git\s+checkout\s+--\s+/i,
    /rm\s+-rf\s+\//i,
    /remove-item\s+-recurse\s+-force/i,
  ];

  if (
    appliesToTerminalTools &&
    riskyPatterns.some((pattern) => pattern.test(command))
  ) {
    const response = {
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason:
          "Blocked destructive command. Use safer, non-destructive alternatives or ask the user for explicit approval first.",
      },
      stopReason:
        "This command is blocked by workspace guardrails because it can destroy local changes.",
    };

    process.stdout.write(`${JSON.stringify(response)}\n`);
    process.exit(0);
  }

  process.stdout.write(
    `${JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "allow",
      },
    })}\n`,
  );
}

main();
