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

## Testable helpers

`app.js` exports its pure helpers alongside the class, so the testing segment has something
to assert against without driving the interactive loop:

| Export | What it does |
|---|---|
| `searchTips(tips, keyword)` | Case-insensitive match across title, content, and category |
| `tipsByCategory(tips, query)` | Partial match on the category field only |
| `nextTipId(tips)` | Next identifier, derived from the highest existing id |
| `completionPercent(shown, total)` | Whole percentage; an empty catalog reports 0, not `NaN` |
| `wrapText(text, width)` | Wraps without breaking the display box |
| `getCategoryEmoji(category)` | Decorative glyph, with a generic fallback |

`tests/tips-app.test.js` covers these plus the save and load contract. Each test names the
defect it catches, which supports the activity 4 question: what does a passing test
establish, and what does it leave unproven?

## Use it as teaching code

The app reads `tips.json`; menu option **2** writes a new tip into that file. The save path
writes a temporary file and renames it, so an interrupted write cannot truncate the catalog. Use a classroom copy and inspect the diff after adding content. Keep the `id`, `title`, `content`, and `category` fields consistent.

Ask Copilot to explain the existing behavior before proposing one improvement. Preserve the menu and JSON contract, review the change, and define an observable success check. Follow [class activity 2](../docs/CLASS-ACTIVITIES.md#activity-2-one-task-two-surfaces-15-minutes).
