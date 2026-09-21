# Repository guidance

This public teaching repository supports Tim Warner's **Pass Your GitHub Copilot Certification Exam** O'Reilly class. Current delivery: **September 24, 2026, 9 a.m.-1 p.m. Central**. Follow [the canonical course plan](COURSE-PLAN.md) and [shared repository instructions](.github/copilot-instructions.md).

## Authority

- Exam scope: [August 7, 2026 objectives](references/gh300-objectives.md), checked against Microsoft Learn.
- Product behavior: current GitHub Docs; client behavior: current VS Code documentation.
- Learner route: [README](README.md), [activities](docs/CLASS-ACTIVITIES.md), [study guide](docs/GH-300-STUDY-GUIDE.md).
- Question style: [style guide](references/style-guide.md) and [fictional companies](references/fictional-companies.md).

The June deck and older PDF are historical. Do not treat their dates, model lists, policy claims, or schedule as current.

## Architecture

The interactive Node.js tips application is in `src/`. The zero-dependency report demonstration is in `copilot-metrics-tour/`. Executable teaching hooks are in `scripts/hooks/` and declared in `.github/hooks/`. Root Jest tests cover validation, hook decisions, and metrics behavior.

Cert Buddy consists of the agent definition, three skills, prompt files, and the configured Microsoft Learn MCP server. Select it from the agent picker. Preserve question-first delivery and the distinction between automated structure checks and factual review.

## Verification

```powershell
# Install only the root test dependencies.
npm ci
npm test -- --runInBand
npm run check:content
node src/test-app.js
node copilot-metrics-tour/index.js --demo
```

No root build or enforced coverage threshold is required. The application can run directly with `node src/app.js`. Keep `.vscode/launch.json` committed for learners.

Use small changes, error handling, why comments, public-safe fictional data, and explicit validation boundaries. Do not expose private presenter links, correspondence, real usage reports, or credentials. Do not infer live Copilot integration or enterprise enforcement from local tests.
