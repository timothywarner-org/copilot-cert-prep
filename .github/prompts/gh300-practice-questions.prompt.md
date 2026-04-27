---
name: gh300-practice-question
description: "Quiz me on GH-300 topics with exam-realistic questions."
argument-hint: "skillArea='Copilot features' bloom='Apply' difficulty='medium'"
agent: gh300-cert-buddy-agent
tools:
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
3. Provide **Microsoft Learn URLs** in the Phase 2 References section.

## Key rules

- Randomize the correct answer position across A, B, C, D.
- Randomize the fictional company name from `references/fictional-companies.md`.
- Follow all style rules from `references/style-guide.md`.
- All product names must use current terminology.
- No contractions. No trick wording. No fake features.

## Output format (exact) -- two-phase delivery

### Phase 1 (send first, then STOP and wait for user reply)

#### Metadata

- Exam: GH-300
- Skill area:
- Objective:
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

- <Microsoft Learn URL 1>
- <Microsoft Learn URL 2 if needed>
