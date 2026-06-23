---
name: gh300-rai-questions
description: "Quiz me on responsible AI principles for the GH-300 exam."
argument-hint: "bloom='Apply' difficulty='medium' principle='fairness'"
agent: gh300-cert-buddy-agent
tools:
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
- Include at least one distractor that is a real responsible-AI control from a DIFFERENT Microsoft product, to test the GH-300 boundary.
- No contractions. No trick wording. No fake features.

## Output format (exact) -- two-phase delivery

### Phase 1 (send first, then STOP and wait for user reply)

#### Metadata

- Exam: GH-300
- Skill area: Use GitHub Copilot responsibly
- Objective:
- Principle:
- Bloom:
- Difficulty:

#### Question

`<scenario-first stem>`

A. `<choice>`
B. `<choice>`
C. `<choice>`
D. `<choice>`

_(Do NOT reveal the answer. Wait for the user to reply.)_

### Phase 2 (send after the user replies with their choice)

**Result:** <Correct! / Incorrect.> The correct answer is **<A|B|C|D>**.

#### Rationale

- A: <2 sentences>
- B: <2 sentences>
- C: <2 sentences>
- D: <2 sentences>

#### References

- <Microsoft Learn unit URL>
