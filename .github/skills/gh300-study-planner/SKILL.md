---
name: gh300-study-planner
description: Generates a personalized GH-300 study plan based on the user's self-assessed confidence across exam skill areas, prioritizing weak areas with estimated hours and Microsoft Learn links. Use when the user asks for a study plan, is unsure what to study, or wants exam prep guidance.
---

# Skill: gh300.study_planner.personalized

**Description:** Generates a personalized GH-300 study plan based on the user's self-assessed confidence across exam skill areas.

## Grounding

**Required sources:**

- `references/gh300-objectives.md` (GH-300 skills measured, January 2026)
- Microsoft Learn (access via the **Microsoft Learn MCP server** using `microsoft_docs_search` for current links)

## Workflow

1. **Present skill areas with weights.** Show the six GH-300 skill areas and exam weight percentages:

   | Skill Area                                            | Exam Weight |
   | ----------------------------------------------------- | ----------- |
   | Use GitHub Copilot responsibly                        | 15-20%      |
   | Use GitHub Copilot features                           | 25-30%      |
   | Understand GitHub Copilot data and architecture       | 10-15%      |
   | Apply prompt engineering and context crafting         | 10-15%      |
   | Improve developer productivity with GitHub Copilot    | 10-15%      |
   | Configure privacy, content exclusions, and safeguards | 10-15%      |

2. **Ask for confidence ratings.** Ask the user to rate confidence in each area as Strong, Moderate, Weak, or Unknown.

3. **Generate a prioritized study plan.**
   - Order areas from weakest to strongest.
   - Within equal confidence levels, prioritize areas with higher exam weight.
   - For each area, provide:
     - Estimated study hours (weak: 8-12 hours, moderate: 4-6 hours, strong: 1-2 hours).
     - Two to three specific Microsoft Learn links.
     - Key objectives to focus on (from `references/gh300-objectives.md`).
   - Include a total estimated hours range.

4. **Offer to start practicing.** Ask whether the learner wants practice questions or a hands-on exercise on the first recommended topic.

## Guardrails

- Do not skip any skill area.
- Do not invent Microsoft Learn URLs.
- Treat Unknown confidence the same as Weak.
- Always use current terminology.
- No contractions.

## Delivery rules

Deliver the full study plan in a single message after the user provides confidence ratings.
