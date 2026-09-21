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
| Presentation | Rebuilt the 28-slide September deck using the approved O'Reilly template and its native masters/layouts, with four-segment course flow and presenter notes. Superseded slides are preserved in Git history. |
| Repository guidance | Updated `CLAUDE.md` and shared/scoped Copilot instructions with the current exam baseline, O'Reilly identity, source hierarchy, cross-reference checks, and rehearsal boundaries. |
| Source cleanup | Retired raw authoring imports with broken internal references and pointed the teaching skills to maintained style guidance. Replaced the optional Azure appendix's placeholder links and unsupported instructions with a sourced review activity. |
| CI | Added classroom checks and retired obsolete CodeQL/custom-query scaffolding. |

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
