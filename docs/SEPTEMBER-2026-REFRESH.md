# September 2026 refresh

**Class:** O'Reilly Live Learning, September 24, 2026, 9 a.m.-1 p.m. Central, four segments.

**Source review:** September 20, 2026.  
**Exam baseline:** [skills measured August 7, 2026](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300).

## Decisions and changes

| Area | Result |
|---|---|
| Cert Buddy improvement | Accepted the choice-quality guidance from PR #29. Corrected validation so structural checks are separate from editorial length warnings and questions are delivered before answers. |
| Exam guidance | Updated objective wording, official scheduling links, 100-minute duration, scaled-score explanation, and current source links. |
| Course schedule | Aligned the plan to four numbered one-hour segments. Breaks are inside Segments 1-3; the mini mock and final study-plan wrap-up are inside Segment 4. |
| Learning materials | Added four bounded activities, six original practice questions with rationales, and explicit no-account routes. |
| Current product behavior | Clarified sessions/handoffs, CLI installation, surface-specific exclusions, model availability, and billing transitions. |
| Hooks | Replaced timer-based stdin reads; ordinary calls now preserve client approvals. Added an optional PowerShell metadata logger and a governance walkthrough. |
| Metrics | Replaced the old daily endpoint and assumed ROI with current aggregate-report parsing, a synthetic fixture, and explicit measurement limits. |
| Tips app | Reviewed all 50 tips and repaired the interactive smoke harness. |
| Presentation | Rebuilt the September deck using the approved O'Reilly template and its native masters/layouts, with four-segment course flow and presenter notes. Superseded slides are preserved in Git history. The deck now carries 34 slides after the September 22 coverage pass below. |
| Repository guidance | Updated `CLAUDE.md` and shared/scoped Copilot instructions with the current exam baseline, O'Reilly identity, source hierarchy, cross-reference checks, and rehearsal boundaries. |
| Source cleanup | Retired raw authoring imports with broken internal references and pointed the teaching skills to maintained style guidance. Replaced the optional Azure appendix's placeholder links and unsupported instructions with a sourced review activity. |
| CI | Added classroom checks and retired obsolete CodeQL/custom-query scaffolding. |

## September 22 objective-coverage pass

A leaf-by-leaf audit compared all 34 bullets of the [August 7, 2026 skills measured](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300) against the deck, the activities, the study guide, and the mini mock. The objectives mirror in `references/gh300-objectives.md` matched the live study guide exactly. Several named objectives were reachable only through speaker notes or the study guide, so they were promoted to slides.

| Change | Objective closed |
|---|---|
| Added **Six principles of responsible AI** to Segment 1 | Ethical and responsible AI usage; potential harms and mitigation strategies |
| Added **Copilot CLI in the terminal** to Segment 2 | Define the CLI and its benefits; key features and commands; interactive use and sessions; generate scripts and manage files |
| Added **Chat is a bounded conversation** to Segment 2 | Enable Copilot in the IDE; limits, options, feedback, and commands of Copilot Chat |
| Added **Productivity is more than new code** to Segment 2 | Code generation, refactoring, and documentation; accelerate learning and reduce context switching; generate sample data and modernize legacy code |
| Added **Ownership follows responsibility** to Segment 4 | Describe ownership and limitations of outputs |
| Added **Organization controls come before enterprise settings** to Segment 4 | Organization-wide policy management and Copilot code review policies; audit log events; manage subscriptions using the REST API |
| Reworded the context-lifecycle slide and its notes | Explain proxy filtering and post-processing |
| Corrected the CLI section of the quick reference | Plan mode is a documented **Shift+Tab** toggle, not a `/plan` slash command; `/review` was not documented as a slash command |
| Cleared a stray **Segment 4** subtitle from seven content slides | Presentation defect, not an objective |

The quick reference gained an **Ownership and limitations of output** section. Slide numbering uses live `slidenum` fields, so the inserted slides renumbered without hand-edited values.

## September 23 sample-code pass

Every sample file now follows one house standard: zero dependencies, `node:`-prefixed built-ins, `"use strict"`, a JSDoc header naming its usage, and comments that justify a decision instead of restating the code.

| Change | Reason |
|---|---|
| Removed the dated June course-plan redirect | A single course plan. Nothing linked to the redirect. [COURSE-PLAN.md](../COURSE-PLAN.md) is now the only one. |
| Removed the orphaned TypeScript environment and database samples under `src/` | Orphaned TypeScript in a repository with no TypeScript toolchain. They imported undeclared packages and the database sample was an unreachable stub, so neither could run. Git history preserves both. |
| Removed five phantom dependencies and the stale lockfile from `src/package.json` | The manifest declared **boxen**, **chalk**, **cli-width**, **inquirer**, and **ora**, none of which the application used. The README already told learners the app needs no installation. |
| Rewrote `src/app.js` | See the defect list below. |
| Added `tests/tips-app.test.js` | 22 tests over the newly extracted pure helpers and the save/load contract. |
| Added `node:` prefixes to the three skill validation scripts | Consistency with every other script in the repository. |
| Upgraded Jest to 30.5.2 | Current stable. Verified with a clean `npm ci`. |

Defects corrected in `src/app.js` while preserving the menu keys, prompts, and output strings that `src/test-app.js` and the class activities depend on:

- Statistics reported `NaN%` for an empty catalog, a state the application explicitly supports.
- `saveTips` wrote in place, so an interrupted write truncated the catalog at `src/tips.json`. It now writes a temporary file and renames it.
- Adding a tip mutated the in-memory list and undid the change on failure, leaving memory ahead of disk. The next catalog is now built first and adopted only after a successful write.
- A lexical declaration sat directly inside a `switch` case.
- `existsSync` ran before every read, which is a race the read had to handle anyway.
- A title longer than 48 characters, or a single word longer than the box, broke the display border.
- The invalid-choice help suggested typing `cat`, which is ambiguous between two menu entries and resolves to nothing.
- The create-tip prompt listed a hard-coded category set rather than the catalog's actual categories.
- Process-wide exception handlers were installed from the constructor, so importing the module for a test had global side effects.
- A 500 ms artificial loading spinner overlapped the output it was pretending to wait for.
- The callback `readline` wrapper was replaced with `node:readline/promises`.

## September 23 resource-link build and verification sweep

Added [GH-300-RESOURCE-LINKS.md](GH-300-RESOURCE-LINKS.md): every objective bullet mapped to first-party Microsoft Learn, GitHub Docs, GitHub terms, or VS Code sources. **77 URLs, every one requested over HTTP and returning 200 at its canonical address, with zero redirects and zero dead links.** Research ran as six parallel passes, one per domain; every returned URL was then re-verified independently rather than trusted.

Added `scripts/check-external-links.js` and `npm run check:links`, plus 8 tests. CI already checks Markdown external links daily with lychee, so this is not the first external check; it adds three things lychee does not give us. It runs locally on demand, it reports **REDIRECT** separately from **DEAD** so moved pages can be canonicalized rather than merely surviving, and with `--file` it can check a URL list extracted from the deck's speaker notes, which no Markdown checker can see. It fails only on DEAD.

Sweep results across the existing materials: **49 external URLs in Markdown, 0 dead**; **31 URLs in the deck's speaker notes, 0 dead**.

### Corrections this pass produced

| Correction | Detail |
|---|---|
| **Copilot CLI plan mode** | The September 22 note claimed plan mode is a Shift+Tab toggle **and not** a slash command. That is wrong. GitHub documents **both** the Shift+Tab toggle and the `/plan` command, and `/review`, `/security-review`, `/session`, `/delegate`, `/model`, `/compact`, and `/add-dir` are documented as well. Corrected in the quick reference, the course plan's rehearsal gate, and the deck's CLI slide. |
| **GitHub Spark is sunsetting** | Spark on github.com stopped accepting new users and new app creation on **August 4, 2026**; the app export deadline was August 31, 2026; every Spark docs path now redirects to the deprecation changelog. Spark is still named in the August 7 objectives, so it is now taught as a one-line definition plus product status, never a demo. |
| **Copilot terms superseded** | The **Copilot Product Specific Terms** page was archived **March 5, 2026**. The governing document is the **Generative AI Services Terms**, which says *Inputs* and *Outputs* rather than *Suggestions* and *Your Code*. |
| **IP indemnity has a stated condition** | Microsoft Learn states that for GitHub to assume legal responsibility, the **Suggestions matching public code** setting must be **blocked**. The September 22 pass dropped this claim as unverifiable; it is now sourced and added to the ownership slide and the quick reference. |
| **Proxy filtering is now sourced** | The September 22 pass could not find a first-party page naming the Copilot proxy. Microsoft Learn's user prompt process flow names it: a proxy server in a GitHub-owned Microsoft Azure tenant, with post-processing and the matching-public-code check after the model. The lifecycle slide's notes now carry the seven steps. |
| **Cookbook and docs paths moved** | The Copilot Chat Cookbook is now `/tutorials/copilot-cookbook/`. Organization policy, Spaces, enterprise policies, and agentic audit-log pages all moved. The resource list records canonical post-redirect paths only. |
| **VS Code Chat docs moved** | `code.visualstudio.com/docs/copilot/chat/copilot-chat` now redirects to `/docs/chat/chat-overview`. Updated in the deck. |

### Known naming gaps to call out in class

**Copilot Edits** and **Spark** are still in the objectives but are fading from GitHub's documentation, and GitHub Docs never writes **zero-shot** or **few-shot** while Microsoft Learn does. A learner who studies only one of the two sources will meet exam wording they have not seen.

## September 23 repository hygiene

| Change | Detail |
|---|---|
| Added `LICENSE` | MIT, Tim Warner, 2025-2026. Two package manifests already declared MIT while no license file shipped. The root manifest now declares it as well, and the README carries a License section noting that O'Reilly branding, the Copilot interface in screenshots, and the Microsoft Learn objectives remain with their owners. |
| Wired up `images/copilot-cover-image.png` | Now the README hero image, with descriptive alt text. |
| Wired up `images/code-matching-example.png` | Now illustrates the public-code match in the quick reference, with descriptive alt text. Captioned explicitly as an **archived capture kept for the concept, not the interface**, since its panel labels and model picker are out of date. |

Neither image was referenced by any file before this pass. No images remain orphaned.

## September 23 practice bank

Added [docs/practice](practice/README.md): **60 original items** across the six domains, weighted to the published blueprint, each with a scenario stem, four choices, a rationale for **every** choice, and links to the primary sources it was written from.

| Domain | Weight | Items |
|---|---|---:|
| Use GitHub Copilot responsibly | 15-20% | 10 |
| Use GitHub Copilot features | 25-30% | 17 |
| Understand data and architecture | 10-15% | 8 |
| Apply prompt engineering and context crafting | 10-15% | 8 |
| Improve developer productivity | 10-15% | 8 |
| Configure privacy, exclusions, and safeguards | 10-15% | 9 |

Added `scripts/check-practice-items.js` and `npm run check:items`, wired into CI. It converts each learner-facing item into the delivery format and runs the **existing** validator in `.github/skills/gh300-item-creator`, rather than reimplementing those rules, so the bank and the Cert Buddy agent are held to one standard. It adds three set-level checks a single-item validator cannot make: correct-answer distribution, scenario company variety, and duplicate stems. 12 tests cover the parsing and conversion, including a negative case proving the gate rejects a broken item.

Results: **60 items, zero structural failures, zero review notes.** Correct answers distribute exactly 15/15/15/15 across A, B, C, and D. All 12 fictional companies appear. All 81 source links resolve with zero redirects and zero dead links.

The bank index carries a **twelve-item diagnostic** spanning all six domains, so a learner who does not know where they are weak gets a route into the right bank and then into the matching resource-link rows.

Two deliberate style departures from the rest of the repository, both required by the item rules: exam items use **no contractions**, and choices are kept to comparable lengths so that the longest option is not a giveaway. The validator enforces both.

## September 23 scheduling and credential links

[GH-300-RESOURCE-LINKS.md](GH-300-RESOURCE-LINKS.md) gained three sections: **register, schedule, and sit the exam**; **practice and assessment**; and **the rest of the GitHub certification track**. [exam-notes-and-links.md](exam-notes-and-links.md) was updated to match so the two pages cannot drift.

| Finding | Detail |
|---|---|
| **Delivery partner confirmed** | GitHub certification exams have been delivered **exclusively through Pearson VUE** since July 1, 2025, in partnership with Microsoft Learn, with a test-center or online proctored option. An early inference that PSI delivered the exam was wrong: `starttest.com` hosts only the demo sandbox. |
| **Free official practice assessment exists for GH-300** | Written by the team that builds the exam, with a rationale on every question and unlimited attempts. It was not previously linked anywhere in this repository, which was the largest gap on the page. |
| **Exam facts** | 100 minutes, scaled pass at 700, credential validity 24 months, English, Portuguese, Spanish, Korean, and Japanese, scheduling capped at 90 days ahead, and an unexpired government photo ID matching the registration name. |
| **Renewal in transition** | GitHub is moving to Microsoft's recertification process; certifications expiring before it is available are extended by six months. |
| **MeasureUp included and labelled** | The only commercial vendor on the page. Listed because learners ask for it by name, marked clearly as optional and not Microsoft-authored, and the page header no longer claims every resource is first-party. |
| **A defect in Microsoft's own catalog** | Their practice-assessment list points the GH-900 entry at the GH-500 path. The table links the GH-900 certification page instead and says why. |
| **Another moved GitHub page** | The content exclusion concept page moved out of the context area and into the security, governance, and network settings area. Canonicalized across seven Markdown files and one deck slide. |

`scripts/check-external-links.js` now retries a refused request once with a browser user agent and reports **CHALLENGED** rather than **DEAD**. MeasureUp answered the checker's honest agent with an nginx 444, which would otherwise have failed the build on a page that works perfectly for a learner.

Sweep after the change: **131 external URLs across the Markdown, 0 dead**; **31 URLs in the deck's speaker notes, 0 dead**. The two remaining redirects are correct as written: a `.git` clone URL and the Microsoft Learn profile path that personalizes to `/users/me/`.

## September 23 gate repair

`npm run check:content` produced the same false positive four times in one week: a backticked string in prose read as a claim that a repository file exists. Each time the response was to reword the sentence, which is the symptom of a gate that cannot be satisfied honestly. Three design flaws caused it.

| Flaw | Repair |
|---|---|
| **No context.** Any `foo/bar/` in prose was a path claim, so a URL fragment such as a docs path segment failed the run. | The checker now ignores a candidate that sits inside a URL on the same line, or whose text appears inside one. It also ignores a directory whose first segment names nothing in this tree, because that describes somebody else's layout. |
| **No escape hatch except editing the script.** Exemptions lived in a hard-coded map keyed by filename, so every legitimate mention required a code change. | A document declares its own exemptions with `allow-missing-path`, and a reason is required. An exemption that stops matching anything is reported as an error, so the list cannot rot into a blanket ignore. |
| **No remedy in the message.** The failure said what was wrong and never what to do. | Every failing run now prints the three ways to resolve it. The same property was added to the link checker and the item checker. |

The tightened heuristic made **7 of the 13 exemptions unnecessary**, and the stale-exemption check found them rather than leaving them to rot. Six remain, all genuine: files a learner creates during the hooks demo, or files that live in the separate enterprise repository.

Two bugs surfaced while fixing it, both caught by the gate itself. Documenting the directive in [CLAUDE.md](../CLAUDE.md) declared one, so a directive shown inside inline code is no longer a declaration. And the first remedy message was written with a broken escape, which the syntax check caught before it ran.

Regression cover is in `tests/course-content-checker.test.js`: every historical false positive is replayed as a test, alongside cases proving a genuinely missing file and a missing directory under a real root still fail. The principle is recorded in [CLAUDE.md](../CLAUDE.md#verification) so the next gate is built the same way: do not fire on what was never a claim, offer a local opt-out that needs no code change, and print the remedy.

## Validation and limits

Local verification covers the item validator, hook decisions and delayed input, usage-report parsing/arithmetic/authentication separation, interactive app behavior, local links, current source URLs, and a direct PowerShell logger check. Run the commands in [repository guidance](../CLAUDE.md#verification) after changing the course materials; earlier results do not validate subsequent edits.

The presentation verification includes rendered-slide inspection, package and slide-geometry checks, expected dimensions, and re-import checks. Course text remains editable; source illustrations remain images.

**Live rehearsal remains necessary** for custom-agent discovery, Learn MCP retrieval, actual VS Code hook delivery, CLI sign-in/model availability, enterprise settings reception, PowerPoint Presenter View, and timed delivery. Follow the [rehearsal gates](../COURSE-PLAN.md#instructor-rehearsal-gates). Synthetic or mocked tests do not establish those outcomes.

## Source trail

- [Published O'Reilly course](https://www.oreilly.com/live-events/pass-your-github-copilot-certification-exam/0642572414696/0642572414689/)
- [GH-300 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300)
- [Certification and scheduling](https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/)
- [Current quick reference and product sources](QUICK-REFERENCE.md)
- [Hooks and managed-settings sources](HOOKS-AND-GOVERNANCE.md)
- [Current metrics API and schema](../copilot-metrics-tour/README.md)

Current entry points use stable filenames. June-named Markdown pages redirect learners to current materials. Git history preserves the superseded exam PDF and June presentation.
