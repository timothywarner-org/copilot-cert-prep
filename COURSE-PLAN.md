# Four-hour GH-300 class plan

**Pass Your GitHub Copilot Certification Exam**  
**Thursday, September 24, 2026 | 9 a.m.-1 p.m. Central / 7-11 a.m. Pacific**  
Instructor: Tim Warner

This plan follows the [published O'Reilly course](https://www.oreilly.com/live-events/pass-your-github-copilot-certification-exam/0642572414696/0642572414689/). Teach **four one-hour segments**, with breaks included in Segments 1-3 and the closing study plan included in Segment 4. The [August 7 skills measured](references/gh300-objectives.md) govern exam coverage.

## Learner outcomes

By the end, learners can validate a generated change, choose between inline suggestions/Chat/CLI/agents, improve a prompt using relevant context, explain data handling and safeguards, and use evidence from practice questions to plan further study.

## Run of show

| Central time | Segment | Teaching and demo | Learner evidence |
|---|---|---|---|
| 9:00-10:00 | **1. Foundations and responsible operation** | 10 min orientation/blueprint; 15 min risks, the six responsible AI principles, and human accountability; 10 min flawed export demo; 15 min activity 1; 5 min Q&A; 5 min break | Identify a fabricated API, name the principle a harm violates, and repair an unsafe input path |
| 10:00-11:00 | **2. Core features: IDE, Chat, CLI** | 10 min enablement, configuration, and inline suggestions; 13 min same-task Chat/CLI comparison; 8 min prompt-file demo; 15 min activity 2; 4 min everyday productivity uses; 5 min Q&A; 5 min break | Run a reusable prompt against two tasks and compare results |
| 11:00-12:00 | **3. Data, agents, MCP, and context** | 15 min data flow/context lifecycle; 15 min plan-to-agent and Learn MCP demo; 10 min sessions, subagents, Spaces/Spark; 10 min activity 3/model comparison; 5 min Q&A; 5 min break | Explain a context improvement and justify a surface/model choice |
| 12:00-1:00 | **4. Privacy, governance, productivity, and exam practice** | 12 min exclusion/public-code/ownership distinctions; 10 min activity 4/tests and metrics; 8 min organization controls, hooks, and enterprise governance; 15 min mini mock; 10 min debrief/Q&A; 5 min wrap and tonight's study plan | Defend a safeguard choice, separate a filter setting from a legal position, identify two weak objectives, and leave with a bounded study plan |

If discussion runs long, shorten the governance enrichment demonstration, not the six-domain coverage, mini mock, or closing study plan.

Point learners at [the objective-mapped resource links](docs/GH-300-RESOURCE-LINKS.md) during the Segment 4 study plan. Every objective bullet maps to a verified first-party source, so the weakest domain converts into a reading list without further searching.

## Demo entry points and fallbacks

| Demo | Entry point | Success check | If access fails |
|---|---|---|---|
| Validate before trusting | [Activity 1](docs/CLASS-ACTIVITIES.md#activity-1-validate-before-trusting-15-minutes) | Learner rejects the fake API and tests a real implementation | Inspect the supplied flawed snippet and debrief |
| Chat and CLI | `src/app.js`, [activity 2](docs/CLASS-ACTIVITIES.md#activity-2-one-task-two-surfaces-15-minutes) | Search improvement is scoped, reviewed, and exercised | Compare the supplied prompt and expected evidence |
| Prompt reuse | `.github/prompts/review-learning-change.prompt.md` | Same checklist works for application and hook code | Apply the Markdown checklist manually |
| Context and agents | [Activity 3](docs/CLASS-ACTIVITIES.md#activity-3-context-changes-the-answer-10-minutes) | Stronger prompt names files, constraints, and acceptance evidence | Evaluate the two prompts on paper |
| Learn MCP and Cert Buddy | **gh300-cert-buddy-agent**, `gh300buddy-mslearn` | Retrieved source, original question, answer withheld, four-choice rationale | Use [mini mock](docs/MINI-MOCK.md) with official links |
| Sessions and delegation | Current VS Code sessions UI | Locate the continuation session and its own changes/history | Explain the distinction using the quick-reference table |
| Tests and metrics | `npm test`; `node copilot-metrics-tour/index.js --demo` | Tests catch a failure; learners distinguish activity from outcome | Read synthetic fixture and expected metrics |
| Hooks and governance | [Lab](docs/HOOKS-AND-GOVERNANCE.md) | Logger writes metadata; benign call retains normal approvals | Feed a sample payload directly to the script; discuss policy JSON |

## Coverage map

| Domain | Main segment | Practice or evidence |
|---|---|---|
| Responsible use | 1, reinforced throughout | Flawed code review, the six responsible AI principles mapped to harms and mitigations, accountability explanation, mock Q1 |
| Features | 2-3 | Enablement, inline, Chat limits/commands/feedback, CLI install and session commands, agents, MCP, prompt reuse, review, organization policy/audit/REST; mock Q2 |
| Data and architecture | 3 | Context-to-response lifecycle naming proxy filtering and post-processing; mock Q3 |
| Prompt/context crafting | 2-3 | Zero/few-shot comparison, relevant files, mock Q4 |
| Productivity | 2, 4 | Explanation and context switching, refactoring, documentation, sample data, legacy modernization, tests, metrics limits; mock Q5 |
| Privacy and safeguards | 4 | Exclusions, policies, public-code matching, ownership and limitations of output, mock Q6 |

Include brief recognition examples for **Spaces**, **Spark**, **PR summaries**, and **review instructions**. Access to each surface is not a prerequisite for learning when to use it. The [study guide](docs/GH-300-STUDY-GUIDE.md) supplies the connections.

**Spark is a definition, not a demo.** It remains in the August 7 objectives, but Spark on github.com stopped accepting new users and new apps on August 4, 2026 and its documentation now redirects to a deprecation changelog. State the exam definition, state the product status, and move on. This is the clearest example in the class of exam scope and product availability being separate questions.

## Instructor rehearsal gates

1. Open the [September O'Reilly deck](warner-github-cert-prep-september-2026.pptx) and test Presenter View, links, and four-segment timing on the presenting machine.
2. Start the tips app, search for `testing`, and quit with `q`. Run the synthetic metrics demo and repository checks.
3. In a fresh Copilot session, confirm the custom agent appears, Learn MCP retrieves a source, and the answer is withheld until a learner responds.
4. Confirm current CLI sign-in, available models, session/handoff UI, and hook event delivery. In the installed CLI, run `/help` and confirm which commands your version supports before class. Documentation describes **two entry points to plan mode**, the **Shift+Tab** toggle and the `/plan` command; check which one your build offers rather than promising either from memory. Record actual behavior rather than promising a particular picker label.
5. For enterprise enrichment, verify the licensed account receives the intended server-managed settings. If it does not, teach the supplied configuration and evidence boundary. Do not change class participants' enterprise policies.
6. Keep the mini mock and a no-account route available throughout.

Automated checks establish local code/content behavior. They do not establish VS Code integration, enterprise enforcement, PowerPoint rendering, or live class timing.
