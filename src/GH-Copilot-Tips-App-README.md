# GitHub Copilot tips app

A small interactive application for the class's explain, search, review, and testing activities. The 50 tips were reviewed September 20, 2026; [the quick reference](../docs/QUICK-REFERENCE.md) provides current product sources.

## Run

From the repository root, with Node.js 22+:

```powershell
# The application uses Node built-ins, so running it needs no dependency installation.
node src/app.js
```

Select **4** to search, enter **testing**, and use **q** to quit. Select **7** for category search. Menu text and symbols accompany color so color is not the only signal.

```powershell
node src/test-app.js
```

The smoke test drives the actual prompts and checks mixed-case search, the no-match response, and clean exit. Root Jest tests run separately with `npm ci` and `npm test -- --runInBand`.

## Use it as teaching code

The app reads `tips.json`; menu option **2** writes a new tip into that file. Use a classroom copy and inspect the diff after adding content. Keep the `id`, `title`, `content`, and `category` fields consistent.

Ask Copilot to explain the existing behavior before proposing one improvement. Preserve the menu and JSON contract, review the change, and define an observable success check. Follow [class activity 2](../docs/CLASS-ACTIVITIES.md#activity-2-one-task-two-surfaces-15-minutes).
