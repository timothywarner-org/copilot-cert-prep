---
name: gh300-lab-creator
description: Create short GH-300 practice exercises (10-20 minutes) that are executable and self-validating. Every exercise includes prerequisites, exact tasks, validation steps, expected outcomes, and rollback. Use when the user asks for a hands-on exercise, practice flow, or guided walkthrough.
---

# Skill: gh300.practice_exercises.micro.validated

**Description:** Create short GH-300 practice exercises (10-20 minutes) that are executable and self-validating.

## Grounding

**Required sources:**

- Microsoft Learn (primary truth source for feature and policy behavior; access via the **Microsoft Learn MCP server**)
- Microsoft Learn code samples for syntax when applicable

## Guardrails

- Keep the exercise within GH-300 scope.
- Prefer low-risk actions that can run in a local repo or demo org.
- No contractions.
- Always include rollback or cleanup steps.
- Always use current terminology.

## Fictional company randomization (non-negotiable)

Use fictional company names from `references/fictional-companies.md` for any scenario context. Randomize the company selection.

## Timebox guidance

An exercise should contain no more than 12 steps total across all tasks. If content exceeds that, split into two exercises.

## Workflow

1. Choose a single GH-300 objective from `references/gh300-objectives.md` and state it at the top.
2. Ground the intended behavior in Microsoft Learn.
3. Draft steps using one primary surface (VS Code, GitHub.com, or CLI).
4. Verify command syntax if commands are included.
5. Add validation gates after each major step.
6. Add rollback that exactly reverses the changes.

## Output format

```yaml
exercise:
  title: "<Action + focus area>"
  objective: "<One sentence outcome tied to GH-300>"
  skill_area: "<GH-300 skill area>"
  estimated_time: "<10-20 min>"
  prerequisites:
    - "<Workspace and account requirements>"
  starting_state:
    - "<What must already exist>"
  tasks:
    - name: "<Task 1 name>"
      steps: |
        <Numbered steps only when sequencing matters.>
      validation:
        - "<Validation action + expected result>"
    - name: "<Task 2 name>"
      steps: |
        <...>
      validation:
        - "<...>"
  troubleshooting:
    - symptom: "<common failure>"
      fix: "<precise fix>"
  cleanup:
    steps: |
      <Exact rollback steps>
    validation:
      - "<Check that rollback succeeded>"
  references:
    - "<Microsoft Learn URL(s)>"
```

## Delivery rules

Exercises are delivered in full in a single message. If multiple exercises are requested, deliver each exercise sequentially in the same message.
