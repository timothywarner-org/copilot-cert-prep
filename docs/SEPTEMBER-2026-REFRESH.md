# September 2026 refresh

**Class:** September 24, 2026, four hours.  
**Source review:** September 20, 2026.  
**Exam baseline:** [skills measured August 7, 2026](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300).

## Decisions and changes

| Area | Result |
|---|---|
| Cert Buddy improvement | Accepted the choice-quality guidance from PR #29. Corrected validation so structural checks are separate from editorial length warnings and questions are delivered before answers. |
| Exam guidance | Updated objective wording, Pearson VUE scheduling, 100-minute duration, scaled-score explanation, and current official links. |
| Course schedule | Replaced the five-hour plan with the published four-hour course, including breaks, activities, mini mock, and study plan. |
| Learning materials | Added four bounded activities, six original practice questions with rationales, and explicit no-account routes. |
| Current product behavior | Clarified sessions/handoffs, CLI installation, surface-specific exclusions, model availability, and billing transitions. |
| Hooks | Replaced timer-based stdin reads; ordinary calls now preserve client approvals. Added an optional PowerShell metadata logger and a governance walkthrough. |
| Metrics | Replaced the old daily endpoint and assumed ROI with current aggregate-report parsing, a synthetic fixture, and explicit measurement limits. |
| Tips app | Reviewed all 50 tips and repaired the interactive smoke harness. |
| Presentation | Added a 24-slide September deck with O'Reilly cover, current course flow, and presenter notes. Preserved the original June deck. |
| CI | Added classroom checks and repaired obsolete CodeQL/custom-query scaffolding. |

## Validation and limits

Local verification passed: **32 tests**, the interactive app smoke test, local-file link checks, **35 current source URLs**, and a direct PowerShell logger check. Tests cover the item validator, hook decisions and delayed input, usage-report parsing/arithmetic/authentication separation, interactive app behavior, and local links.

The September deck was rendered and visually inspected. Package, slide geometry, expected dimensions, and re-import checks passed. Its course text is editable; source illustrations remain images. This is a focused teaching deck, not a claim that every June appendix slide was refreshed.

**Live rehearsal remains necessary** for custom-agent discovery, Learn MCP retrieval, actual VS Code hook delivery, CLI sign-in/model availability, enterprise settings reception, PowerPoint Presenter View, and timed delivery. Follow the [rehearsal gates](../COURSE-PLAN.md#instructor-rehearsal-gates). Synthetic or mocked tests do not establish those outcomes.

## Source trail

- [Published O'Reilly course](https://www.oreilly.com/live-events/pass-your-github-copilot-certification-exam/0642572414696/0642572414689/)
- [GH-300 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300)
- [Certification and scheduling](https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/)
- [Current quick reference and product sources](QUICK-REFERENCE.md)
- [Hooks and managed-settings sources](HOOKS-AND-GOVERNANCE.md)
- [Current metrics API and schema](../copilot-metrics-tour/README.md)

Current entry points use stable filenames. June-named Markdown pages redirect learners, while Git history preserves the earlier content. The old PDF and June presentation are historical resources.
