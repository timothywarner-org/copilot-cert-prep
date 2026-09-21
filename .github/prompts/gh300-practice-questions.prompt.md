---
name: gh300-practice-questions
description: "Quiz me on GH-300 topics with exam-realistic questions."
argument-hint: "skillArea='Copilot features' bloom='Apply' difficulty='medium'"
agent: gh300-cert-buddy-agent
tools:
  - read
  - search
  - web
  - execute
  - gh300buddy-mslearn/*
---

# GH-300 Practice Question

Generate **ONE** original, exam-realistic **GH-300** practice question.

## Use this skill

You must follow the workspace skill **gh300-item-creator** for item structure, guardrails, and **delivery rules** (Phase 1 / Phase 2 interactive flow).

## Inputs (from chat)

- Skill area: ${input:skillArea:Pick a GH-300 domain (or leave blank and the agent picks one)}
- Objective: ${input:objective:Specific objective line to measure (optional)}
- Bloom: ${input:bloom:Remember | Understand | Apply | Analyze}
- Difficulty: ${input:difficulty:easy | medium | hard}

## Grounding and validation rules

1. Ground the correct behavior in **Microsoft Learn** using the **Microsoft Learn MCP** server (`microsoft_docs_search`, then `microsoft_docs_fetch` for detail).
2. If the item includes command examples or settings paths, confirm with `microsoft_code_sample_search` when relevant.
3. Provide primary-source URLs in Phase 2. Use Learn for exam scope and current GitHub or VS Code documentation for product behavior.

## Key rules

- Randomize the correct answer position across A, B, C, D.
- Randomize the fictional company name from `references/fictional-companies.md`.
- Follow all style rules from `references/style-guide.md`.
- All product names must use current terminology.
- No contractions. No trick wording. No fake features.

## Output contract

Use the exact Markdown Phase 1 and Phase 2 formats in `.github/skills/gh300-item-creator/SKILL.md`; do not maintain a second schema here. Phase 1 uses `metadata`, `question`, a single-line `stem:`, and `A:` through `D:` choices.

Deliver one question, then wait. Reveal the answer, two-sentence rationale for every choice, and primary-source references only after the learner responds. The item validator checks structure, not factual truth.
