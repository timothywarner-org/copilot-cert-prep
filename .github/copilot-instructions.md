# GitHub Copilot certification teaching repository

Tim Warner's four-hour O'Reilly class is **September 24, 2026, 9 a.m.-1 p.m. Central**. The canonical plan is `COURSE-PLAN.md`; the exam baseline is the **August 7, 2026** skills measured in `references/gh300-objectives.md`.

## Sources and scope

Use Microsoft Learn for exam objectives, GitHub Docs for product/policy/API behavior, and VS Code documentation for that client's configuration and previews. Verify volatile claims before teaching them. Distinguish named exam objectives from current-product enrichment such as hooks and enterprise managed settings. Do not memorize model rosters or invent settings, UI labels, or slash commands.

Keep exactly four numbered segments: **1. Foundations and responsible operation; 2. Core features: IDE, Chat, CLI; 3. Data, agents, MCP, and context; 4. Privacy, governance, productivity, and exam practice**. Follow `COURSE-PLAN.md`: Segments 1-3 include five-minute breaks, and Segment 4 includes the mini mock and final five-minute study-plan wrap-up.

This is **O'Reilly training**. Use the approved O'Reilly PowerPoint template, including native masters/layouts, and consistent branding in slide text, footers, notes, and supporting materials. Writing-style references do not change the course's publisher identity.

## Work areas and validation

| Area | Purpose | Check |
|---|---|---|
| `src/` | Interactive tips app and teaching code | `node src/test-app.js` |
| `copilot-metrics-tour/` | Current usage reports, synthetic offline demo | `node copilot-metrics-tour/index.js --demo` |
| `scripts/hooks/` | Small executable hook examples | Root Jest tests and direct-input checks |
| `.github/skills/` | Cert Buddy workflows and validators | Item-validator regression tests |
| `docs/`, `references/` | Learner materials and grounding | `npm run check:content` |

The two demos use Node built-ins. Root tests require `npm ci`, then `npm test -- --runInBand`. Use PowerShell 7 and Node.js 22+. Keep changes small, explain why in code comments, handle errors, and preserve existing data formats.

## Build, test, and lint commands

There is no build step; this is a zero-dependency Node.js content repository. There is no separate lint command — `npm run check:content` is the closest equivalent and validates Markdown links/anchors/paths.

```powershell
npm ci                          # install root test dependencies (Jest only)
npm test -- --runInBand         # all Jest suites in tests/*.test.js
npm run check:content           # local links, heading anchors, inline code paths
npm run check:items             # every practice item, through the shared item validator
npm run check:links             # every external URL, over real HTTP (slow; run when links change)
node src/test-app.js            # tips app smoke test (no Jest, run directly)
node copilot-metrics-tour/index.js --demo   # synthetic metrics demo
```

Run a single test file or a single test by name (both work with plain `npx jest` too):

```powershell
npx jest tests/tips-app.test.js --runInBand
npm test -- -t "rejects an ambiguous fragment"
```

Test files live only in `tests/` at the repo root (Jest's default `**/*.test.js` discovery, no `jest.config.js`). Each maps to one gate or app: `course-content-checker.test.js`, `external-links.test.js`, `practice-items.test.js`, `item-validator.test.js`, `hooks.test.js`, `fizzbuzz-contract.test.js`, `metrics-tour.test.js`, `tips-app.test.js`, `sample.test.js`.

## Architecture

- **Three independent Node CLI gates** in `scripts/check-*.js`, each backed by a same-named test in `tests/`: `check-course-content.js` (links/anchors/paths), `check-external-links.js` (live HTTP), `check-practice-items.js` (delegates to the item validator below). Each must fail with an actionable remedy printed in its own output — if you find yourself rewording content to satisfy a gate, fix the gate instead.
- **`docs/practice/`** holds the 60-item practice bank; `npm run check:items` converts each item into the delivery format and reuses the **same validator** in `.github/skills/gh300-item-creator/scripts` that Cert Buddy uses live, so the static bank and the live agent share one standard.
- **Cert Buddy** (`.github/agents/gh300-cert-buddy-agent.agent.md`) is a Copilot Chat agent selected from the agent picker, not a script. It composes three skills — `gh300-item-creator`, `gh300-lab-creator`, `gh300-study-planner` (all under `.github/skills/`) — and retrieves grounding via the `gh300buddy-mslearn` MCP server declared in `.vscode/mcp.json` (public Learn endpoint, no API key).
- **Hooks** are two layers, not one: `.github/hooks/gh300-guardrails.json` declares `PreToolUse`/`PostToolUse` hooks; the executable logic lives in `scripts/hooks/` (`prevent-destructive-commands.js`, `validate-gh300-content.js`, `Log-CopilotToolUse.ps1`). Treat these as editable teaching code, not centrally enforced governance — see `docs/HOOKS-AND-GOVERNANCE.md`.
- **`src/`** is intentionally a single-file app (`app.js` + `tips.json`): class activity 2 has learners attach both files to Chat for comparison, so do not split it into modules.
- **`copilot-metrics-tour/`** is a separate zero-dependency demo (own `README.md`) using a synthetic fixture; it never calls a real usage-report endpoint.

## Cert Buddy

Select **gh300-cert-buddy-agent** from the Chat agent picker. Its skills are `gh300-item-creator`, `gh300-lab-creator`, and `gh300-study-planner`.

Use `gh300buddy-mslearn` for Learn retrieval, with current GitHub/VS Code primary sources for product details. If retrieval fails, disclose that the claim is unverified. Questions must be original and delivered one at a time: metadata/stem/choices, wait, then answer, two-sentence rationale per choice, and references.

Follow `references/style-guide.md` and vary fictional companies using `references/fictional-companies.md`. Balance choice grammar/detail without mistaking length heuristics for factual validation.

## Teaching conventions

- Use real business scenarios, fictional data, and explicit success checks.
- Preserve a no-account route for every core activity.
- Content exclusions are surface-specific; a `.copilotignore` file is not a supported policy substitute.
- A repository hook is executable, editable code, not centrally enforced governance.
- Ordinary tool calls must retain the client's approval checks; hooks should abstain unless deliberately vetoing.
- Use current usage-report endpoints and distinguish adoption/activity from measured business outcomes.
- When a file or heading moves, repair all incoming references, including prompt/skill files and presentation notes. Keep current entry points stable; June-named Markdown files only redirect old bookmarks.
- Keep secrets in environment variables; never print credentials or signed report URLs.
- No em dashes. Use blank lines around headings, lists, and code fences.
- End learner-facing teaching responses with a practice task, a deeper study topic, and a workplace application.

Do not recreate the removed `demos/`, `copilot/`, `examples/`, `course-materials/`, `new-resources/`, or `exam-metadata/` trees. Superseded decks and exam PDFs are preserved in Git history; current entry points must link to current materials.
