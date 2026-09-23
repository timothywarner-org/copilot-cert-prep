/**
 * Cover the tips application's pure helpers and its save contract.
 *
 * These are the functions class activity 4 asks learners to inspect: each test names the
 * defect it catches, so the group can answer "what does this test establish, and what does
 * it not establish?" A passing suite here proves catalog handling, not Copilot behavior.
 */
"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  CopilotTipsApp,
  completionPercent,
  getCategoryEmoji,
  nextTipId,
  searchTips,
  tipsByCategory,
  wrapText
} = require("../src/app");

const SAMPLE = [
  { id: 1, title: "Attach relevant files", content: "Scope the request.", category: "Best Practices" },
  { id: 7, title: "Filter public code matches", content: "Check the setting.", category: "Security" },
  { id: 3, title: "Assert real behavior", content: "Testing beats vibes.", category: "Testing" }
];

describe("searchTips", () => {
  test("matches case-insensitively across title, content, and category", () => {
    expect(searchTips(SAMPLE, "TeStInG").map(tip => tip.id)).toEqual([3]);
    expect(searchTips(SAMPLE, "SECURITY").map(tip => tip.id)).toEqual([7]);
    expect(searchTips(SAMPLE, "scope").map(tip => tip.id)).toEqual([1]);
  });

  test("a blank term matches nothing rather than the whole catalog", () => {
    // Returning every tip for an empty search would look like a working feature to a
    // reviewer skimming output, which is exactly the failure this test exists to catch.
    expect(searchTips(SAMPLE, "   ")).toEqual([]);
    expect(searchTips(SAMPLE, "")).toEqual([]);
  });

  test("tolerates malformed entries instead of throwing", () => {
    expect(searchTips([{ id: 9 }, null], "anything")).toEqual([]);
  });

  test("returns an empty array for a non-array catalog", () => {
    expect(searchTips(null, "testing")).toEqual([]);
  });
});

describe("tipsByCategory", () => {
  test("matches a partial category name", () => {
    expect(tipsByCategory(SAMPLE, "test").map(tip => tip.id)).toEqual([3]);
  });

  test("does not match against title or content", () => {
    expect(tipsByCategory(SAMPLE, "vibes")).toEqual([]);
  });
});

describe("nextTipId", () => {
  test("derives from the highest id, not the array length", () => {
    // Length-based ids collide as soon as a tip is removed from the middle of the catalog.
    expect(nextTipId(SAMPLE)).toBe(8);
  });

  test("starts at 1 for an empty or invalid catalog", () => {
    expect(nextTipId([])).toBe(1);
    expect(nextTipId(undefined)).toBe(1);
  });
});

describe("completionPercent", () => {
  test("reports 0 for an empty catalog rather than NaN", () => {
    expect(completionPercent(0, 0)).toBe(0);
  });

  test("rounds to a whole percentage", () => {
    expect(completionPercent(1, 3)).toBe(33);
    expect(completionPercent(50, 50)).toBe(100);
  });
});

describe("wrapText", () => {
  test("never exceeds the requested width", () => {
    const lines = wrapText("the quick brown fox jumps over the lazy dog", 12);
    expect(Math.max(...lines.map(line => line.length))).toBeLessThanOrEqual(12);
  });

  test("splits a word longer than the width instead of overflowing the box border", () => {
    expect(wrapText("supercalifragilistic", 5)).toEqual(["super", "calif", "ragil", "istic"]);
  });

  test("returns one empty line for empty input", () => {
    expect(wrapText("")).toEqual([""]);
  });

  test("rejects a non-string", () => {
    expect(() => wrapText(null)).toThrow(TypeError);
  });
});

describe("getCategoryEmoji", () => {
  test("falls back to a generic glyph for an unknown category", () => {
    expect(getCategoryEmoji("Security")).toBe("🔒");
    expect(getCategoryEmoji("Agent Mode")).toBe("📌");
  });
});

describe("resolveMenuChoice", () => {
  const app = new CopilotTipsApp();

  test("accepts the documented menu keys", () => {
    expect(app.resolveMenuChoice("4")).toBe("search");
    expect(app.resolveMenuChoice("q")).toBe("quit");
    expect(app.resolveMenuChoice("Q")).toBe("quit");
  });

  test("prefers the more specific rule for category search", () => {
    expect(app.resolveMenuChoice("search by category")).toBe("search_by_category");
    expect(app.resolveMenuChoice("search")).toBe("search");
  });

  test("rejects an ambiguous fragment rather than guessing", () => {
    // "cat" matches both category entries. Guessing one would silently send the learner
    // somewhere they did not choose.
    expect(app.resolveMenuChoice("cat")).toBeNull();
    expect(app.resolveMenuChoice("")).toBeNull();
  });
});

describe("saveTips", () => {
  let directory;
  let catalog;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), "gh300-tips-"));
    catalog = path.join(directory, "tips.json");
  });

  afterEach(() => {
    fs.rmSync(directory, { recursive: true, force: true });
  });

  test("writes valid JSON that loads back identically", () => {
    const app = new CopilotTipsApp(catalog);
    expect(app.saveTips(SAMPLE)).toBe(true);
    expect(JSON.parse(fs.readFileSync(catalog, "utf8"))).toEqual({ tips: SAMPLE });

    const reader = new CopilotTipsApp(catalog);
    expect(reader.loadTips()).toBe(true);
    expect(reader.tips).toEqual(SAMPLE);
  });

  test("leaves no temporary file behind on success", () => {
    const app = new CopilotTipsApp(catalog);
    app.saveTips(SAMPLE);
    expect(fs.readdirSync(directory)).toEqual(["tips.json"]);
  });

  test("reports a missing catalog without throwing", () => {
    const app = new CopilotTipsApp(path.join(directory, "absent.json"));
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect(app.loadTips()).toBe(false);
    expect(app.tips).toEqual([]);
    console.error.mockRestore();
  });

  test("reports invalid JSON without throwing", () => {
    fs.writeFileSync(catalog, "{ not json", "utf8");
    const app = new CopilotTipsApp(catalog);
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect(app.loadTips()).toBe(false);
    console.error.mockRestore();
  });
});
