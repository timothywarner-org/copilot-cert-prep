/**
 * Cover the practice-bank checker's parsing and its conversion to the validator format.
 *
 * The value of the checker is that it hands real items to the repository's own item
 * validator rather than reimplementing its rules. These tests prove the parsing and the
 * conversion, because a silent parse failure would make the whole gate report a false pass.
 */
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const { splitItems, parseItem, toCanonical } = require("../scripts/check-practice-items");
const { validateItem } = require("../.github/skills/gh300-item-creator/scripts/validate-output");

const ITEM = [
  "## Q1. A short title",
  "",
  "**Objective:** Explain the need to validate AI output · **Bloom:** Apply · **Difficulty:** medium",
  "",
  "Northwind Traders receives a suggestion that uses an unfamiliar method. What should happen first?",
  "",
  "- **A**: Verify the method against the published reference documentation",
  "- **B**: Approve the change because the surrounding naming looks consistent",
  "- **C**: Request a longer explanation and attach it to the pull request body",
  "- **D**: Run the same prompt again and compare the two generated responses",
  "",
  "<details>",
  "<summary>Answer and rationale</summary>",
  "",
  "**Correct answer: A**",
  "",
  "- **A**: Documentation exposes a fabricated method. Verification is the check that applies.",
  "- **B**: Naming consistency is a maintainability signal. It does not establish correctness.",
  "- **C**: A longer explanation can repeat the same incorrect assumption in more words.",
  "- **D**: Repeating a prompt can reproduce the same error rather than disprove it.",
  "",
  "**Sources:** [Review AI-generated code](https://docs.github.com/en/copilot/tutorials/review-ai-generated-code)",
  "",
  "</details>"
].join("\n");

describe("splitItems", () => {
  test("splits on numbered question headings", () => {
    const items = splitItems(`${ITEM}\n\n## Q2. Another title\n\nbody\n`);
    expect(items.map(item => item.number)).toEqual(["1", "2"]);
    expect(items[0].title).toBe("A short title");
  });

  test("returns nothing for a document with no items", () => {
    expect(splitItems("# Heading\n\nProse only.\n")).toEqual([]);
  });
});

describe("parseItem", () => {
  const [item] = splitItems(ITEM);

  test("extracts metadata, stem, choices, answer, rationale, and sources", () => {
    const { parsed, errors } = parseItem(item);
    expect(errors).toEqual([]);
    expect(parsed.objective).toBe("Explain the need to validate AI output");
    expect(parsed.bloom).toBe("Apply");
    expect(parsed.difficulty).toBe("medium");
    expect(parsed.correct).toBe("A");
    expect([...parsed.choices.keys()]).toEqual(["A", "B", "C", "D"]);
    expect([...parsed.rationale.keys()]).toEqual(["A", "B", "C", "D"]);
    expect(parsed.urls).toHaveLength(1);
  });

  test("keeps the stem separate from the answer choices", () => {
    const { parsed } = parseItem(item);
    expect(parsed.stem).toMatch(/^Northwind Traders/);
    expect(parsed.stem).not.toMatch(/Verify the method/);
  });

  test("reports a missing answer block instead of throwing", () => {
    const [broken] = splitItems("## Q1. No details block\n\nStem text only.\n");
    const { parsed, errors } = parseItem(broken);
    expect(parsed).toBeNull();
    expect(errors.join(" ")).toMatch(/details/i);
  });

  test("reports a missing sources line", () => {
    const [broken] = splitItems(ITEM.replace(/\*\*Sources:\*\*.*/, ""));
    const { errors } = parseItem(broken);
    expect(errors.join(" ")).toMatch(/source/i);
  });
});

describe("toCanonical", () => {
  test("produces text the shared item validator accepts", () => {
    const { parsed } = parseItem(splitItems(ITEM)[0]);
    const canonical = toCanonical(parsed, "Use GitHub Copilot responsibly");
    const result = validateItem(canonical, { draft: true });
    expect(result.errors).toEqual([]);
  });

  test("carries the supplied skill area and the exam identifier", () => {
    const { parsed } = parseItem(splitItems(ITEM)[0]);
    const canonical = toCanonical(parsed, "Use GitHub Copilot responsibly");
    expect(canonical).toMatch(/exam: GH-300/);
    expect(canonical).toMatch(/skill_area: "Use GitHub Copilot responsibly"/);
  });

  test("a rewritten item that breaks a rule is rejected by the validator", () => {
    // Proves the gate has teeth: duplicate choices must not pass.
    const { parsed } = parseItem(splitItems(ITEM)[0]);
    parsed.choices.set("B", parsed.choices.get("A"));
    const result = validateItem(toCanonical(parsed, "Use GitHub Copilot responsibly"), { draft: true });
    expect(result.errors.join(" ")).toMatch(/distinct/i);
  });
});

describe("the shipped banks", () => {
  const bankDir = path.join(__dirname, "..", "docs", "practice");
  const banks = fs.readdirSync(bankDir).filter(name => name.startsWith("domain-"));

  test("every domain bank is present", () => {
    expect(banks).toHaveLength(6);
  });

  test("every shipped item parses and validates", () => {
    let count = 0;
    for (const bank of banks) {
      const text = fs.readFileSync(path.join(bankDir, bank), "utf8");
      for (const raw of splitItems(text)) {
        const { parsed, errors } = parseItem(raw);
        expect({ bank, item: raw.number, errors }).toEqual({ bank, item: raw.number, errors: [] });
        const result = validateItem(toCanonical(parsed, "Use GitHub Copilot features"), { draft: true });
        expect({ bank, item: raw.number, errors: result.errors }).toEqual({
          bank,
          item: raw.number,
          errors: []
        });
        count += 1;
      }
    }
    expect(count).toBe(60);
  });

  test("correct answers are spread evenly across the four letters", () => {
    const letters = { A: 0, B: 0, C: 0, D: 0 };
    for (const bank of banks) {
      const text = fs.readFileSync(path.join(bankDir, bank), "utf8");
      for (const raw of splitItems(text)) {
        letters[parseItem(raw).parsed.correct] += 1;
      }
    }
    // A bank that leans on one letter teaches the letter rather than the objective.
    for (const count of Object.values(letters)) {
      expect(count).toBeGreaterThanOrEqual(10);
    }
    expect(Object.values(letters).reduce((sum, value) => sum + value, 0)).toBe(60);
  });
});
