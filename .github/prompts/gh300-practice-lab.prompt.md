---
name: gh300-practice-lab
description: "Build a hands-on GH-300 exercise with validation and rollback."
argument-hint: "skillArea='Copilot CLI' toolPreference='VS Code' timebox='15'"
agent: gh300-cert-buddy-agent
tools:
  - gh300buddy-mslearn/*
---

# GH-300 Practice Exercise

Generate **ONE** short, self-validating **GH-300** hands-on exercise.

## Use this skill

You must follow the workspace skill **gh300-lab-creator** for exercise structure, guardrails, workflow, output format, and delivery rules.

## Inputs (from chat)

- Skill area: ${input:skillArea:Pick a GH-300 skill area (or leave blank and the agent picks one)}
- Objective: ${input:objective:Specific objective to practice (optional)}
- Tool preference: ${input:toolPreference:VS Code | GitHub.com | CLI (default VS Code)}
- Timebox: ${input:timebox:Duration in minutes (default 15)}

## Grounding and validation rules

1. Ground the exercise in **Microsoft Learn** using the **Microsoft Learn MCP** server.
2. If command syntax is included, confirm it with `microsoft_code_sample_search` when possible.
3. Provide **Microsoft Learn URLs** in the References section.

## Key rules

- Randomize the fictional company name from `references/fictional-companies.md`.
- Follow all style rules from `references/style-guide.md`.
- Default to **VS Code + Copilot Chat** if no tool preference is specified.
- All product names must use current terminology.
- No contractions. Rollback is mandatory.

## Output format

Use the YAML output format defined in the **gh300-lab-creator** skill exactly. The output must include: title, objective, skill_area, estimated_time, prerequisites, starting_state, tasks (each with steps and validation), troubleshooting, cleanup, and references.
