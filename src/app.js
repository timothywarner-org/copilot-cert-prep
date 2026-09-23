#!/usr/bin/env node
/**
 * WoodGrove Bank internal learning catalog: an interactive GitHub Copilot tips browser.
 *
 * Usage: node src/app.js
 * Reads and writes src/tips.json, which uses the schema { id, title, content, category }.
 *
 * This file stays as a single module on purpose. Class activity 2 asks learners to attach
 * src/app.js and src/tips.json to Chat and compare surfaces, and that comparison is only
 * meaningful when the whole implementation fits in one attachment.
 *
 * The pure helpers below are exported separately so the testing segment has something to
 * assert against without spawning the interactive loop.
 */
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline/promises");

/** Inner width of the display box, in characters, excluding the border glyphs. */
const BOX_WIDTH = 60;

const BANNER = `
╔══════════════════════════════════════════════════════════════╗
║   ____  _ _   _   _       _        ____            _ _       ║
║  / ___||_| |_| | | |_   _| |__    / ___|___  _ __ |_| | ___  ║
║ | |  _ | | __| |_| | | | | '_ \\  | |   / _ \\| '_ \\| | |/ _ \\ ║
║ | |_| || | |_|  _  | |_| | |_) | | |__| (_) | |_) | | | (_) |║
║  \\____|_|\\__|_| |_|\\__,_|_.__/   \\____\\___/| .__/|_|_|\\___/ ║
║                                             |_|              ║
║              🚀 Tips & Tricks Terminal 🚀                    ║
╚══════════════════════════════════════════════════════════════╝
`;

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  gray: "\x1b[90m"
};

/**
 * Menu contract. The keys and the quit label are asserted by src/test-app.js and are
 * referenced by name in docs/CLASS-ACTIVITIES.md, so renaming one is a breaking change
 * to the course, not just to the code.
 */
const MENU_OPTIONS = Object.freeze([
  { key: "1", label: "🎲 See another tip", action: "another" },
  { key: "2", label: "✨ Create a new tip", action: "create" },
  { key: "3", label: "📚 View all categories", action: "categories" },
  { key: "4", label: "🔍 Search tips", action: "search" },
  { key: "5", label: "📊 Statistics", action: "stats" },
  { key: "6", label: "🎯 Random category", action: "random_category" },
  { key: "7", label: "📁 Search by category", action: "search_by_category" },
  { key: "q", label: "👋 Quit", action: "quit" }
]);

/** Category glyphs are decoration only; every category is always printed as text as well. */
const CATEGORY_EMOJIS = Object.freeze({
  "Best Practices": "⭐",
  Security: "🔒",
  Testing: "🧪",
  "Chat Features": "💬",
  "Editor Tips": "✏️",
  Enterprise: "🏢",
  Debugging: "🐛",
  "AI Features": "🤖",
  MCP: "🔌",
  Git: "📦",
  CLI: "⌨️",
  Database: "🗄️",
  Documentation: "📖",
  Automation: "⚙️",
  "Code Quality": "✨",
  Workflow: "🔄"
});

// ---------------------------------------------------------------------------
// Pure helpers. No I/O, no state: these are the functions to generate tests for.
// ---------------------------------------------------------------------------

/**
 * Wrap text to a fixed column width without breaking inside a word.
 *
 * @param {string} text Text to wrap.
 * @param {number} [width=BOX_WIDTH] Maximum line length, in characters.
 * @returns {string[]} Wrapped lines; an empty input yields a single empty line.
 * @throws {TypeError} If text is not a string.
 */
function wrapText(text, width = BOX_WIDTH) {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string.");
  }
  const limit = Number.isInteger(width) && width > 0 ? width : BOX_WIDTH;
  const lines = [];
  let current = "";

  for (const word of text.split(/\s+/).filter(Boolean)) {
    // A single word longer than the box would otherwise overflow the border, so split it.
    if (word.length > limit) {
      if (current) {
        lines.push(current);
        current = "";
      }
      for (let index = 0; index < word.length; index += limit) {
        lines.push(word.slice(index, index + limit));
      }
      continue;
    }
    if (current && current.length + 1 + word.length > limit) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }

  if (current) {
    lines.push(current);
  }
  return lines.length > 0 ? lines : [""];
}

/**
 * Case-insensitive keyword search across title, content, and category.
 *
 * @param {ReadonlyArray<object>} tips Tips to search.
 * @param {string} keyword Search term; a blank term matches nothing rather than everything.
 * @returns {object[]} Matching tips, in their original order.
 */
function searchTips(tips, keyword) {
  if (!Array.isArray(tips) || typeof keyword !== "string" || !keyword.trim()) {
    return [];
  }
  const needle = keyword.trim().toLowerCase();
  return tips.filter(
    tip =>
      String(tip?.title ?? "").toLowerCase().includes(needle) ||
      String(tip?.content ?? "").toLowerCase().includes(needle) ||
      String(tip?.category ?? "").toLowerCase().includes(needle)
  );
}

/**
 * Partial, case-insensitive match on the category field only.
 *
 * @param {ReadonlyArray<object>} tips Tips to filter.
 * @param {string} categoryQuery Full or partial category name.
 * @returns {object[]} Matching tips, in their original order.
 */
function tipsByCategory(tips, categoryQuery) {
  if (!Array.isArray(tips) || typeof categoryQuery !== "string" || !categoryQuery.trim()) {
    return [];
  }
  const needle = categoryQuery.trim().toLowerCase();
  return tips.filter(tip => String(tip?.category ?? "").toLowerCase().includes(needle));
}

/**
 * Next identifier for a new tip.
 *
 * Derived from the highest existing id rather than the array length, because deleting a
 * tip would otherwise hand out an id that is already in use.
 *
 * @param {ReadonlyArray<{id: number}>} tips Existing tips.
 * @returns {number} An identifier not currently present in tips.
 */
function nextTipId(tips) {
  if (!Array.isArray(tips) || tips.length === 0) {
    return 1;
  }
  const highest = tips.reduce(
    (max, tip) => (Number.isInteger(tip?.id) && tip.id > max ? tip.id : max),
    0
  );
  return highest + 1;
}

/**
 * Percentage of tips seen this session.
 *
 * @param {number} shown Count of tips already displayed.
 * @param {number} total Count of tips available.
 * @returns {number} A whole percentage; an empty catalog reports 0 rather than NaN.
 */
function completionPercent(shown, total) {
  if (!Number.isFinite(total) || total <= 0) {
    return 0;
  }
  return Math.round((shown / total) * 100);
}

// ---------------------------------------------------------------------------
// Application
// ---------------------------------------------------------------------------

class CopilotTipsApp {
  /**
   * @param {string} [tipsFile] Path to the tips catalog. Injectable so a test can point at
   *   a disposable fixture instead of the file learners edit during class.
   */
  constructor(tipsFile = path.join(__dirname, "tips.json")) {
    this.tipsFile = tipsFile;
    this.tips = [];
    this.shownTipIds = new Set();
    this.rl = null;
  }

  /**
   * Register process-level handlers.
   *
   * Called from run() rather than the constructor so that importing this module for a unit
   * test does not quietly install global handlers as a side effect.
   */
  registerSignalHandlers() {
    process.once("SIGINT", () => {
      console.log("\n\n👋 Goodbye! Thanks for using GitHub Copilot Tips!\n");
      this.cleanup();
      process.exit(0);
    });
    process.once("SIGTERM", () => {
      this.cleanup();
      process.exit(0);
    });
  }

  cleanup() {
    if (this.rl) {
      this.rl.close();
      this.rl = null;
    }
  }

  clearScreen() {
    process.stdout.write("\x1Bc");
  }

  /**
   * Load the catalog from disk.
   *
   * Reads directly and handles ENOENT instead of calling existsSync first: a separate
   * existence check is a race, and the read has to handle the failure anyway.
   *
   * @returns {boolean} True when at least one tip was loaded.
   */
  loadTips() {
    try {
      const data = fs.readFileSync(this.tipsFile, "utf8");
      if (!data.trim()) {
        console.error(`${COLORS.yellow}⚠️  Tips file is empty${COLORS.reset}`);
        this.tips = [];
        return false;
      }

      const parsed = JSON.parse(data);
      this.tips = Array.isArray(parsed?.tips) ? parsed.tips : [];

      if (this.tips.length === 0) {
        console.warn(`${COLORS.yellow}⚠️  No tips found in file${COLORS.reset}`);
        return false;
      }
      return true;
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error(`${COLORS.red}❌ Tips file not found: ${this.tipsFile}${COLORS.reset}`);
      } else if (error instanceof SyntaxError) {
        console.error(`${COLORS.red}❌ Invalid JSON in tips file: ${error.message}${COLORS.reset}`);
      } else {
        console.error(`${COLORS.red}❌ Error loading tips: ${error.message}${COLORS.reset}`);
      }
      this.tips = [];
      return false;
    }
  }

  /**
   * Persist the catalog.
   *
   * Writes a sibling temporary file and renames it over the target. A crash partway through
   * a direct write would leave learners with a truncated tips.json and no way back.
   *
   * @param {ReadonlyArray<object>} tips Catalog to write.
   * @returns {boolean} True when the catalog reached disk.
   */
  saveTips(tips) {
    const temporaryFile = `${this.tipsFile}.tmp`;
    try {
      fs.writeFileSync(temporaryFile, `${JSON.stringify({ tips }, null, 2)}\n`, "utf8");
      fs.renameSync(temporaryFile, this.tipsFile);
      return true;
    } catch (error) {
      console.error(`${COLORS.red}❌ Error saving tips: ${error.message}${COLORS.reset}`);
      // Leaving a stray .tmp file behind would make a re-run look like a corrupted catalog.
      try {
        fs.rmSync(temporaryFile, { force: true });
      } catch {
        // The cleanup is best effort; the save failure above is the message that matters.
      }
      return false;
    }
  }

  /**
   * Pick a tip the learner has not seen yet, cycling once every tip has been shown.
   *
   * @returns {object|null} A tip, or null when the catalog is empty.
   */
  getRandomTip() {
    if (this.tips.length === 0) {
      return null;
    }

    const unshown = this.tips.filter(tip => !this.shownTipIds.has(tip.id));
    if (unshown.length === 0) {
      this.shownTipIds.clear();
      return this.tips[Math.floor(Math.random() * this.tips.length)];
    }

    const tip = unshown[Math.floor(Math.random() * unshown.length)];
    this.shownTipIds.add(tip.id);
    return tip;
  }

  /**
   * Render one tip inside a fixed-width box.
   *
   * @param {object|null} tip Tip to display.
   */
  displayTip(tip) {
    if (!tip) {
      console.log(`\n${COLORS.yellow}📭 No tips available.${COLORS.reset}\n`);
      return;
    }

    const border = "─".repeat(BOX_WIDTH + 2);
    // Truncate rather than let a long title push the right border out of alignment.
    const heading = `💡 TIP #${tip.id}: ${tip.title}`.slice(0, BOX_WIDTH);

    console.log(`\n┌${border}┐`);
    console.log(`│  ${COLORS.bright}${heading.padEnd(BOX_WIDTH)}${COLORS.reset}│`);
    console.log(`├${border}┤`);
    for (const line of wrapText(String(tip.content ?? ""))) {
      console.log(`│  ${line.padEnd(BOX_WIDTH)}│`);
    }
    console.log(`├${border}┤`);
    console.log(`│  ${`📂 Category: ${tip.category}`.slice(0, BOX_WIDTH).padEnd(BOX_WIDTH)}│`);
    console.log(`└${border}┘`);
  }

  /**
   * Ask one question and wait for the answer.
   *
   * @param {string} question Prompt to display.
   * @returns {Promise<string>} The trimmed answer.
   */
  async promptUser(question) {
    if (!this.rl) {
      this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    }
    const answer = await this.rl.question(question);
    return answer.trim();
  }

  async createNewTip() {
    console.log(`\n${COLORS.cyan}✨ Create a New Tip${COLORS.reset}`);
    console.log("─".repeat(40));

    const title = await this.promptUser(`${COLORS.yellow}📝 Title: ${COLORS.reset}`);
    if (!title) {
      console.log(`${COLORS.red}❌ Title cannot be empty. Cancelled.${COLORS.reset}`);
      return;
    }

    const content = await this.promptUser(`${COLORS.yellow}💭 Content: ${COLORS.reset}`);
    if (!content) {
      console.log(`${COLORS.red}❌ Content cannot be empty. Cancelled.${COLORS.reset}`);
      return;
    }

    // List the categories actually present in the catalog. A hard-coded list drifts as soon
    // as a learner adds a tip in a new category.
    const existing = [...new Set(this.tips.map(tip => tip.category))].sort();
    console.log(
      `\n${COLORS.dim}Existing categories: ${existing.join(", ") || "none yet"}${COLORS.reset}`
    );

    const category = await this.promptUser(`${COLORS.yellow}📂 Category: ${COLORS.reset}`);
    if (!category) {
      console.log(`${COLORS.red}❌ Category cannot be empty. Cancelled.${COLORS.reset}`);
      return;
    }

    const newTip = { id: nextTipId(this.tips), title, content, category };
    // Build the next catalog first, then adopt it only after the write succeeds. Mutating
    // in place and undoing the change on failure leaves the in-memory list ahead of disk.
    const nextTips = [...this.tips, newTip];

    if (this.saveTips(nextTips)) {
      this.tips = nextTips;
      console.log(`\n${COLORS.green}✅ Tip #${newTip.id} added successfully!${COLORS.reset}`);
      this.displayTip(newTip);
    } else {
      console.log(`\n${COLORS.red}❌ Failed to save the new tip.${COLORS.reset}`);
    }
  }

  displayInteractiveMenu() {
    console.log(`\n${COLORS.cyan}╔════════════════════════════════╗${COLORS.reset}`);
    console.log(`${COLORS.cyan}║${COLORS.reset}     ${COLORS.bright}🎯 MAIN MENU${COLORS.reset}              ${COLORS.cyan}║${COLORS.reset}`);
    console.log(`${COLORS.cyan}╚════════════════════════════════╝${COLORS.reset}\n`);

    for (const option of MENU_OPTIONS) {
      console.log(`  ${COLORS.bright}[${option.key}]${COLORS.reset} ${option.label}`);
    }

    console.log(`\n${COLORS.dim}💡 Type to filter or enter choice:${COLORS.reset}`);
  }

  viewCategories() {
    const categories = [...new Set(this.tips.map(tip => tip.category))].sort();

    if (categories.length === 0) {
      console.log(`\n${COLORS.yellow}📭 No categories found.${COLORS.reset}\n`);
      return;
    }

    console.log(`\n${COLORS.cyan}📚 Tip Categories${COLORS.reset}`);
    console.log("─".repeat(40));

    for (const category of categories) {
      const count = this.tips.filter(tip => tip.category === category).length;
      console.log(
        `  ${getCategoryEmoji(category)} ${COLORS.bright}${category}${COLORS.reset} ${COLORS.dim}(${count} tips)${COLORS.reset}`
      );
    }
  }

  /**
   * Print a compact result list shared by both search paths.
   *
   * @param {ReadonlyArray<object>} results Tips to summarize.
   */
  printResults(results) {
    console.log("─".repeat(50) + "\n");
    for (const tip of results) {
      const preview = tip.content.length > 70 ? `${tip.content.slice(0, 70)}...` : tip.content;
      console.log(`${getCategoryEmoji(tip.category)} ${COLORS.bright}#${tip.id} ${tip.title}${COLORS.reset}`);
      console.log(`   ${COLORS.dim}${preview}${COLORS.reset}`);
      console.log();
    }
  }

  async searchTipsInteractive() {
    const keyword = await this.promptUser(`${COLORS.yellow}🔍 Search: ${COLORS.reset}`);
    if (!keyword) {
      console.log(`${COLORS.red}Search cancelled.${COLORS.reset}`);
      return;
    }

    const results = searchTips(this.tips, keyword);
    if (results.length === 0) {
      console.log(`\n${COLORS.yellow}😔 No tips found matching "${keyword}".${COLORS.reset}\n`);
      return;
    }

    console.log(`\n${COLORS.green}✨ Found ${results.length} tip(s) matching "${keyword}"${COLORS.reset}`);
    this.printResults(results);
  }

  async searchByCategory() {
    const categoryQuery = await this.promptUser(`${COLORS.yellow}📁 Category: ${COLORS.reset}`);
    if (!categoryQuery) {
      console.log(`${COLORS.red}Search cancelled.${COLORS.reset}`);
      return;
    }

    const results = tipsByCategory(this.tips, categoryQuery);
    if (results.length === 0) {
      console.log(`\n${COLORS.yellow}😔 No tips found in category "${categoryQuery}".${COLORS.reset}\n`);
      return;
    }

    console.log(
      `\n${COLORS.green}✨ Found ${results.length} tip(s) in category "${categoryQuery}"${COLORS.reset}`
    );
    this.printResults(results);
  }

  showStatistics() {
    console.log(`\n${COLORS.cyan}📊 Statistics${COLORS.reset}`);
    console.log("─".repeat(40));

    const totalTips = this.tips.length;
    const shownTips = this.shownTipIds.size;
    const categories = [...new Set(this.tips.map(tip => tip.category))];

    console.log(`  📝 Total tips: ${COLORS.bright}${totalTips}${COLORS.reset}`);
    console.log(`  ✅ Tips shown this session: ${COLORS.bright}${shownTips}${COLORS.reset}`);
    console.log(`  📚 Categories: ${COLORS.bright}${categories.length}${COLORS.reset}`);
    console.log(`  🎯 Completion: ${COLORS.bright}${completionPercent(shownTips, totalTips)}%${COLORS.reset}`);

    const counts = new Map();
    for (const tip of this.tips) {
      counts.set(tip.category, (counts.get(tip.category) ?? 0) + 1);
    }
    const [topCategory, topCount] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0] ?? [];
    if (topCategory) {
      console.log(`  🏆 Top category: ${COLORS.bright}${topCategory}${COLORS.reset} (${topCount} tips)`);
    }
  }

  showRandomCategory() {
    const categories = [...new Set(this.tips.map(tip => tip.category))];
    if (categories.length === 0) {
      console.log(`\n${COLORS.yellow}📭 No categories available.${COLORS.reset}\n`);
      return;
    }

    const category = categories[Math.floor(Math.random() * categories.length)];
    const categoryTips = this.tips.filter(tip => tip.category === category);

    console.log(`\n${COLORS.cyan}🎲 Random category: ${category}${COLORS.reset}`);
    this.displayTip(categoryTips[Math.floor(Math.random() * categoryTips.length)]);
  }

  /**
   * Map a raw menu entry to an action.
   *
   * Accepts the key, a unique label substring, or a few common words, so a learner who
   * types "search" instead of "4" still gets somewhere.
   *
   * @param {string} choice Raw input.
   * @returns {string|null} The action name, or null when nothing matched.
   */
  resolveMenuChoice(choice) {
    const normalized = String(choice ?? "").trim().toLowerCase();
    if (!normalized) {
      return null;
    }

    const byKey = MENU_OPTIONS.find(option => option.key === normalized);
    if (byKey) {
      return byKey.action;
    }

    const byLabel = MENU_OPTIONS.filter(option => option.label.toLowerCase().includes(normalized));
    if (byLabel.length === 1) {
      return byLabel[0].action;
    }

    // Ordered longest-first so "search by category" is not captured by the bare "search" rule.
    const wordRules = [
      [normalized.includes("categ") && normalized.includes("search"), "search_by_category"],
      [normalized.includes("random"), "random_category"],
      [normalized.includes("categ"), "categories"],
      [normalized.includes("search"), "search"],
      [normalized.includes("stat"), "stats"],
      [normalized.includes("create") || normalized.includes("new"), "create"],
      [normalized.includes("tip") || normalized === "another", "another"],
      [normalized.includes("quit") || normalized.includes("exit"), "quit"]
    ];
    return wordRules.find(([matched]) => matched)?.[1] ?? null;
  }

  /**
   * Run the interactive loop until the learner quits.
   *
   * @returns {Promise<void>}
   */
  async run() {
    try {
      this.registerSignalHandlers();
      this.clearScreen();
      console.log(`${COLORS.cyan}${BANNER}${COLORS.reset}`);

      if (!this.loadTips()) {
        console.log(`${COLORS.yellow}⚠️  Starting with empty tips database.${COLORS.reset}`);
        console.log(`${COLORS.dim}Use 'Create a new tip' to add your first tip!${COLORS.reset}\n`);
      } else {
        this.displayTip(this.getRandomTip());
      }

      let running = true;
      while (running) {
        this.displayInteractiveMenu();
        const choice = await this.promptUser(`${COLORS.green}➜${COLORS.reset} `);

        switch (this.resolveMenuChoice(choice)) {
          case "another": {
            const tip = this.getRandomTip();
            if (tip) {
              this.clearScreen();
              console.log(`${COLORS.cyan}${BANNER}${COLORS.reset}`);
              this.displayTip(tip);
            } else {
              console.log(`${COLORS.yellow}📭 No tips available. Create some first!${COLORS.reset}`);
            }
            break;
          }
          case "create":
            await this.createNewTip();
            break;
          case "categories":
            this.viewCategories();
            break;
          case "search":
            await this.searchTipsInteractive();
            break;
          case "stats":
            this.showStatistics();
            break;
          case "random_category":
            this.showRandomCategory();
            break;
          case "search_by_category":
            await this.searchByCategory();
            break;
          case "quit":
            console.log(`\n${COLORS.green}✨ Thanks for using GitHub Copilot Tips!${COLORS.reset}`);
            console.log(`${COLORS.dim}Keep learning and happy coding! 🚀${COLORS.reset}\n`);
            running = false;
            break;
          default:
            // Only suggest words that actually resolve. "cat" matches two menu entries and
            // is deliberately rejected as ambiguous, so it is not a useful example.
            console.log(`\n${COLORS.red}❓ Invalid choice. Try typing part of the menu option.${COLORS.reset}`);
            console.log(`${COLORS.dim}Example: type 'search', 'stats', or 'categories', or use keys 1-7 and q${COLORS.reset}\n`);
        }
      }
    } finally {
      // Runs on the normal path and on a thrown error, so the terminal is never left in raw mode.
      this.cleanup();
    }
  }
}

/**
 * Look up the decorative glyph for a category.
 *
 * @param {string} category Category name.
 * @returns {string} A glyph, defaulting to a generic pin for unknown categories.
 */
function getCategoryEmoji(category) {
  return CATEGORY_EMOJIS[category] ?? "📌";
}

module.exports = {
  CopilotTipsApp,
  completionPercent,
  getCategoryEmoji,
  nextTipId,
  searchTips,
  tipsByCategory,
  wrapText
};

if (require.main === module) {
  new CopilotTipsApp().run().catch(error => {
    console.error(`${COLORS.red}Fatal error:${COLORS.reset}`, error.message);
    process.exitCode = 1;
  });
}
