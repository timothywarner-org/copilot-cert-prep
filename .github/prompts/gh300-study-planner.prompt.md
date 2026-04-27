---
name: gh300-study-planner
description: "Create a personalized GH-300 study plan based on your confidence ratings."
argument-hint: "Rate confidence by domain, for example: features=Weak, privacy=Moderate"
agent: gh300-cert-buddy-agent
tools:
  - gh300buddy-mslearn/*
---

# GH-300 Study Planner

Generate a **personalized GH-300 study plan** based on your confidence across the six exam skill areas.

## Use this skill

You must follow the workspace skill **gh300-study-planner** for workflow, output format, and delivery rules.

## Inputs (from chat)

- Responsible AI confidence: ${input:responsibleAI:Strong | Moderate | Weak | Unknown}
- Copilot features confidence: ${input:features:Strong | Moderate | Weak | Unknown}
- Data and architecture confidence: ${input:dataArchitecture:Strong | Moderate | Weak | Unknown}
- Prompt engineering confidence: ${input:prompting:Strong | Moderate | Weak | Unknown}
- Developer productivity confidence: ${input:productivity:Strong | Moderate | Weak | Unknown}
- Privacy and exclusions confidence: ${input:privacy:Strong | Moderate | Weak | Unknown}

## Grounding and validation rules

1. Ground all Microsoft Learn module links using the **Microsoft Learn MCP** server. Do not invent URLs.
2. Use the GH-300 exam outline from `references/gh300-objectives.md` for objective mapping.
3. Prioritize weak areas first. Within equal confidence levels, prioritize by exam weight.

## Key rules

- All product names must use current terminology.
- No contractions.
- Do not skip any skill area, even if rated Strong.
- Treat "Unknown" the same as "Weak."
