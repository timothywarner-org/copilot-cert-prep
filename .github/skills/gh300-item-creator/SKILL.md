---
name: gh300-item-creator
description: Generate GH-300 practice questions that feel like the real exam without copying it. Every item is grounded in current Microsoft Learn content, uses modern Copilot terminology, and follows Microsoft-style exam item rules (scenario-first, plausible distractors, no trick wording). Use when the user asks for practice questions, quiz items, or exam prep.
---

# Skill: gh300.practice_questions.exam_realistic

**Description:** Generate GH-300 practice questions that feel like the real exam without copying it. Every item is grounded in current Microsoft Learn content, uses modern Copilot terminology, and follows Microsoft-style exam item rules.

## Grounding

**Required sources:**

- Microsoft Learn (primary truth source for objectives and capabilities; access via the **Microsoft Learn MCP server** using `microsoft_docs_search` and `microsoft_docs_fetch`)
- Microsoft Learn samples (for syntax or command accuracy; access via `microsoft_code_sample_search`)

**Study guide:**

- Study guide for Exam GH-300 [Microsoft Learn]
- `references/gh300-objectives.md` for the full skills-measured list

## Style

**Microsoft style:**

- Follow Microsoft sentence-style capitalization and UI-label rules.
- See `references/style-guide.md` for detailed writing rules.

## Bundled assets

Use the skill-local bundle so this skill is reproducible and teachable as a package, not only a prompt.

- `resources/source-pack.md`
- `resources/microsoft-voice-principles.md`
- `resources/item-quality-checklist.md`
- `scripts/validate-output.js`

## Guardrails

**Exam integrity:**

- Do not recreate or paraphrase real exam questions.
- Do not reference braindumps or leaked content.
- Write original scenarios and stems every time.

**Terminology:**

- Always use current GitHub Copilot and GitHub platform terminology.

**Item quality:**

- No contractions.
- Avoid negatives; if truly required, **CAP** + **bold** the negative word.
- Exactly 4 options (A-D) unless the requested item type explicitly differs.
- Exactly 1 correct answer unless the requested item type explicitly differs.
- No "all of the above" or "none of the above."
- Distractors must be plausible and real.

## Answer choice randomization (non-negotiable)

You MUST randomize which letter (A, B, C, or D) is the correct answer for each question. Do not default to any single letter position. Across a set of questions, distribute the correct answer roughly evenly among A, B, C, and D.

## Fictional company randomization (non-negotiable)

Use fictional company names from `references/fictional-companies.md` for scenario context. You MUST randomize the company selection -- do not default to Contoso for every scenario.

## Workflow

1. Pull current GH-300 skill areas from `references/gh300-objectives.md` and choose a target objective.
2. Ground the intended correct behavior in Microsoft Learn using `microsoft_docs_search` first, then `microsoft_docs_fetch` if you need full page detail.
3. If the item touches command or settings specifics, invoke `microsoft_code_sample_search` where relevant.
4. Pick a random fictional company from `references/fictional-companies.md` and draft a workplace scenario stem.
5. Randomly assign the correct answer to A, B, C, or D. Write 1 correct answer and 3 plausible distractors.
6. Run a mutual exclusivity check on answer choices.
7. Run a terminology check.
8. Run a clarity check.
9. Run the checks in `resources/item-quality-checklist.md` and use `scripts/validate-output.js` logic as a final structure gate.
10. Prepare rationale internally but **do not deliver it yet**.

## Delivery rules (non-negotiable)

When presenting a question to the user:

**Phase 1 -- Question only:**

- Show metadata, scenario stem, and choices (A-D).
- Do **NOT** include correct_answer, rationale, or references.
- End the message and wait for the user to reply.

**Phase 2 -- Evaluation:**

- After the user replies with their answer, show:
  - Whether they were correct or incorrect.
  - The correct answer letter.
  - Full rationale for every choice.
  - References (Microsoft Learn URLs).

If multiple questions were requested, repeat this Phase 1 / Phase 2 cycle for each question sequentially.

## Output format

**Phase 1 message (question only):**

- **metadata**
  - exam: GH-300
  - skill_area: "`<one of the GH-300 skill areas>`"
  - objective: "`<specific objective line>`"
  - bloom: "`<Remember|Understand|Apply|Analyze>`"
  - difficulty: "`<easy|medium|hard>`"
- **question**
  - stem:
    - `<Scenario + question. One decision.>`
  - choices:
    - A: "`<choice>`"
    - B: "`<choice>`"
    - C: "`<choice>`"
    - D: "`<choice>`"

_(Stop here. Wait for the user to answer.)_

**Phase 2 message (evaluation, after user replies):**

- **result:** "<Correct! / Incorrect.> The correct answer is <A|B|C|D>."
- **rationale:**
  - A: "<2-sentence explanation>"
  - B: "<2-sentence explanation>"
  - C: "<2-sentence explanation>"
  - D: "<2-sentence explanation>"
- **references:**
  - "<Microsoft Learn URL 1>"
  - "<Microsoft Learn URL 2 if needed>"
