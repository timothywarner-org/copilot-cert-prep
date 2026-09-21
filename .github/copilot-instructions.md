# GitHub Copilot certification teaching repository

Tim Warner's four-hour O'Reilly class is **September 24, 2026, 9 a.m.-1 p.m. Central**. The canonical plan is `COURSE-PLAN.md`; the exam baseline is the **August 7, 2026** skills measured in `references/gh300-objectives.md`.

## Sources and scope

Use Microsoft Learn for exam objectives, GitHub Docs for product/policy/API behavior, and VS Code documentation for that client's configuration and previews. Verify volatile claims before teaching them. Distinguish named exam objectives from current-product enrichment such as hooks and enterprise managed settings. Do not memorize model rosters or invent settings, UI labels, or slash commands.

Keep the teaching arc: responsible habits, core tools, data/context/agents, then safeguards and practice. Follow the published four-hour schedule, including breaks.

## Work areas and validation

| Area | Purpose | Check |
|---|---|---|
| `src/` | Interactive tips app and teaching code | `node src/test-app.js` |
| `copilot-metrics-tour/` | Current usage reports, synthetic offline demo | `node copilot-metrics-tour/index.js --demo` |
| `scripts/hooks/` | Small executable hook examples | Root Jest tests and direct-input checks |
| `.github/skills/` | Cert Buddy workflows and validators | Item-validator regression tests |
| `docs/`, `references/` | Learner materials and grounding | `npm run check:content` |

The two demos use Node built-ins. Root tests require `npm ci`, then `npm test -- --runInBand`. Use PowerShell 7 and Node.js 22+. Keep changes small, explain why in code comments, handle errors, and preserve existing data formats.

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
- Keep secrets in environment variables; never print credentials or signed report URLs.
- No em dashes. Use blank lines around headings, lists, and code fences.
- End learner-facing teaching responses with a practice task, a deeper study topic, and a workplace application.

Do not recreate the removed `demos/`, `copilot/`, `examples/`, `course-materials/`, `new-resources/`, or `exam-metadata/` trees. Historical files stay clearly labeled; current entry points must link to current materials.
