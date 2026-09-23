# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This public teaching repository supports Tim Warner's **Pass Your GitHub Copilot Certification Exam** O'Reilly Live Learning class. Current delivery: **Thursday, September 24, 2026, 9 a.m.-1 p.m. Central / 7-11 a.m. Pacific**. Content baseline reviewed **September 23, 2026**. Follow [the canonical course plan](COURSE-PLAN.md) and [shared repository instructions](.github/copilot-instructions.md), which also govern GitHub Copilot in this repo.

## Authority

- Exam scope: [August 7, 2026 objectives](references/gh300-objectives.md), checked against the [official GH-300 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300).
- Product behavior: current GitHub Docs; client behavior: current VS Code documentation.
- Learner route: [README](README.md), [activities](docs/CLASS-ACTIVITIES.md), [study guide](docs/GH-300-STUDY-GUIDE.md), [resource links](docs/GH-300-RESOURCE-LINKS.md), [practice bank](docs/practice/README.md).
- Delivery: [published O'Reilly course](https://www.oreilly.com/live-events/pass-your-github-copilot-certification-exam/0642572414696/0642572414689/), [course plan](COURSE-PLAN.md), and [September deck](warner-github-cert-prep-september-2026.pptx).
- Question style: [style guide](references/style-guide.md) and [fictional companies](references/fictional-companies.md).

Microsoft writing guidance governs item style; **O'Reilly is the training identity**. Keep learner-facing branding, title slides, masters, footers, and speaker notes consistent with that identity. Superseded decks and exam PDFs belong in Git history, not the current learning route. [COURSE-PLAN.md](COURSE-PLAN.md) is the **only** course plan; do not add a dated or alternate one. The remaining June-named Markdown file is a compatibility redirect, not an alternate source of truth. The shared instructions list six removed directory trees that must not be recreated.

## Four-segment delivery

| Segment | Central time | Instructional purpose |
|---|---|---|
| **1. Foundations and responsible operation** | 9-10 a.m. | Validate generated output and establish human accountability |
| **2. Core features: IDE, Chat, CLI** | 10-11 a.m. | Choose a surface, inspect evidence, and reuse a prompt |
| **3. Data, agents, MCP, and context** | 11 a.m.-noon | Explain data flow and improve the context for a bounded task |
| **4. Privacy, governance, productivity, and exam practice** | Noon-1 p.m. | Apply safeguards, test changes, interpret metrics, and plan study |

Include five-minute breaks in Segments 1-3. Segment 4 includes the mini mock and the final five-minute wrap-up. Keep the six-domain exam coverage and learning evidence intact when tightening a demo. Hooks and enterprise managed settings are enrichment, not newly invented exam objectives.

## Currency and cross-references

- Verify volatile product claims against primary sources before changing teaching content. Record the review date and link the supporting page. Do not infer the current UI from an old screenshot or conversation.
- Keep exam scope separate from product availability. **Spark** is still a named objective but stopped accepting new users on August 4, 2026, so teach it as a definition, never a demo. The **Copilot Product Specific Terms** page was archived March 5, 2026; cite the **Generative AI Services Terms**.
- Do not hard-code model rosters, prices, preview status, or policy support without current evidence.
- Distinguish content-exclusion support by surface, instructions from enforced controls, and repository hooks from enterprise governance.
- Update links and heading anchors when moving a file or renaming a section. Check README, the course plan, the deck's speaker notes, agent/skill instructions, and compatibility redirects together.

## Architecture

| Area | What it is |
|---|---|
| `src/` | Interactive tips app, the main teaching artifact. `src/test-app.js` drives the real prompts as a smoke test. |
| `copilot-metrics-tour/` | Zero-dependency aggregate usage-report demonstration with a synthetic fixture. |
| `scripts/hooks/`, `.github/hooks/` | Executable teaching hooks and their declarations. |
| `scripts/check-*.js` | The three repository gates. See **Verification**. |
| `docs/practice/` | Six domain banks, 60 original items weighted to the blueprint. |
| `.github/skills/`, `.github/agents/` | Cert Buddy: the agent definition, three skills, and their validators. |

Use **Node.js 22+** and **PowerShell 7** for documented classroom commands.

All sample code is zero-dependency and uses `node:`-prefixed built-ins, `"use strict"`, a JSDoc header naming its usage, and comments that justify a decision rather than restate the code. `fizzBuzz.js` and `src/app.js` are the reference examples. Keep the tips application in one file: class activity 2 asks learners to attach `src/app.js` and `src/tips.json` to Chat, and splitting it breaks that comparison.

Cert Buddy consists of the agent definition, three skills, prompt files, and the configured Microsoft Learn MCP server. Select it from the agent picker. Preserve question-first delivery and the distinction between automated structure checks and factual review.

## Verification

```powershell
npm ci                          # root test dependencies only
npm test -- --runInBand         # all suites
npm run check:content           # local links, heading anchors, inline paths
npm run check:items             # every practice item, through the shared validator
npm run check:links             # every external URL, over real HTTP
node src/test-app.js            # tips app smoke test
node copilot-metrics-tour/index.js --demo
```

Run one suite or one test:

```powershell
npx jest tests/tips-app.test.js --runInBand
npm test -- -t "rejects an ambiguous fragment"
```

**Every gate here obeys three rules.** A checker that produces false positives with no way out gets reworded around instead of satisfied, which is how a gate quietly stops being trusted. So each one must:

1. **Not fire on something that was never a claim.** `check:content` ignores a backticked path that sits inside a URL on the same line, and ignores a directory whose first segment names nothing in this tree, because `concepts/context/` is prose about somebody else's layout.
2. **Offer a local, documented opt-out that needs no code change.** Declare it in the document itself, and a reason is required:
   `<!-- allow-missing-path: teams/class-demo.json | lives in the separate enterprise repo -->`
   An exemption that stops matching anything is reported as an error, so the list cannot rot into a blanket ignore.
3. **Print the remedy in the failure.** Every gate ends a failing run by naming how to fix it. If you find yourself rewording prose to satisfy a checker, the checker is wrong; fix the checker.

**The gates do not overlap, and knowing which catches what saves a CI cycle:**

- `check:content` validates repo-internal links, heading anchors, and **inline code-formatted paths**. A backticked filename in prose must resolve from the file that mentions it, so writing `` `tips.json` `` inside `docs/` fails while `` `src/tips.json` `` passes. This is the gate that most often fails on a documentation edit.
- `check:items` converts each learner-facing practice item into the delivery format and runs the **existing** validator in `.github/skills/gh300-item-creator`, so the bank and Cert Buddy share one standard. It adds set-level checks a single-item validator cannot make.
- `check:links` reports **REDIRECT separately from DEAD** so moved pages get canonicalized, and `--file <path>` accepts a path outside the repo, which is how the deck's speaker-note URLs get checked. CI also runs lychee against Markdown links nightly.

No root build or enforced coverage threshold is required. `node src/app.js` runs the application directly. Keep `.vscode/launch.json` committed for learners. Give each core activity a no-account route, an observable success check, and cleanup instructions.

## Working with the deck

`warner-github-cert-prep-september-2026.pptx` is **34 slides** on the O'Reilly template, whose branding lives on the master rather than on individual slides.

- Page numbers are live `slidenum` fields, so inserting slides renumbers automatically. Never hand-write a slide number or a slide count; recompute derived values.
- Edit with `python-pptx`, cloning an existing slide of the right bullet count to preserve run-level fonts. Assert before writing and verify retired strings are absent afterward.
- **Render and visually inspect after every change.** LibreOffice is not installed; export PNGs through PowerPoint COM, then read the images. A valid PPTX package does not prove slide quality.
- **Speaker notes are terse instructor cue cards**, not spoken narration: imperative directives, deliberately uncontracted negations, and a trailing `Source:` URL. Only the title slide uses Tim's spoken voice. Match the cue-card register when adding slides, and keep the source line.

## Writing practice items

Items are governed by `.github/skills/gh300-item-creator` and enforced by `npm run check:items`:

- Exactly four distinct choices A through D, one defensible answer, no all-or-none constructions.
- **No contractions.** The validator fails on them, which is Microsoft item style rather than Tim's prose voice.
- Randomize which letter is correct across a set, and vary the fictional company.
- Keep option lengths comparable so the longest choice is not a giveaway.
- Rationale explains **every** choice, including the correct one, and cites the primary pages it was written from.
- Do not paraphrase real exam content. Write original scenarios.

## Boundaries

Use small changes, error handling, why comments, public-safe fictional data, and explicit validation boundaries. No em dashes. Do not expose private presenter links, correspondence, real usage reports, or credentials. Record completed checks accurately in [refresh notes](docs/SEPTEMBER-2026-REFRESH.md).

Do not infer live Copilot integration, enterprise enforcement, Presenter View behavior, or timed delivery from local tests. Automated checks establish local code and content behavior only. Follow the [instructor rehearsal gates](COURSE-PLAN.md#instructor-rehearsal-gates) before class.
