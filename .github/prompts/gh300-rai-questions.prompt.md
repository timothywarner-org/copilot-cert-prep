---
name: gh300-rai-questions
description: "Quiz me on responsible AI principles for the GH-300 exam."
argument-hint: "bloom='Apply' difficulty='medium' principle='fairness'"
agent: gh300-cert-buddy-agent
tools:
  - read
  - search
  - web
  - execute
  - gh300buddy-mslearn/*
---

# GH-300 Responsible AI Practice Question

Generate **ONE** original, exam-realistic **GH-300** practice question on **responsible AI principles**.

## Scope

This prompt targets the **Use GitHub Copilot responsibly (15-20%)** domain, specifically:

- **Understand responsible AI principles** (risks and limitations, ethical and responsible usage, harms and mitigation).
- **Validate and operate AI tools** (validating output, operating Copilot responsibly).

## Use this skill

You must follow the workspace skill **gh300-item-creator**, and in particular its **Recipe: responsible AI principle items** section for grounding, the six principles, and the RAI-specific distractor traps. Apply the same **delivery rules** (Phase 1 / Phase 2 interactive flow).

## Inputs (from chat)

- Principle: ${input:principle:fairness | reliability and safety | privacy and security | inclusiveness | transparency | accountability (or leave blank and the agent picks one)}
- Bloom: ${input:bloom:Remember | Understand | Apply | Analyze}
- Difficulty: ${input:difficulty:easy | medium | hard}

## Grounding and validation rules

1. Ground the correct behavior in the **Responsible AI with GitHub Copilot** Learn module via the Microsoft Learn MCP server (`microsoft_docs_fetch` on the six-principles and mitigate-risks units).
2. Cite the matching Microsoft Learn unit URL in the Phase 2 References section.
3. Do not attribute Azure AI Foundry or Copilot Studio responsible AI controls to GitHub Copilot, except deliberately as a distractor.

## Key rules

- Randomize the correct answer position across A, B, C, D.
- Randomize the fictional company name from `references/fictional-companies.md`.
- Follow all style rules from `references/style-guide.md`.
- Use plausible, parallel distractors. Do not force an obvious unrelated-product choice.
- No contractions. No trick wording. No fake features.

## Output contract

Follow the Phase 1 and Phase 2 Markdown formats in the gh300-item-creator skill. Use a single-line stem and A: through D: choices. Add principle to metadata when useful. Deliver the question first, then wait before revealing the answer, rationale, or primary-source references.
