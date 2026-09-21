/** Regression tests protect question-first delivery and prevent false quality claims. */
const { validateItem } = require("../.github/skills/gh300-item-creator/scripts/validate-output");
const question = [
  "- **metadata**", "  - exam: GH-300", "  - skill_area: Responsible use",
  "  - objective: Validate output", "  - bloom: Apply", "  - difficulty: medium",
  "- **question**", "  - stem: Tailwind Traders receives unverified code. What should the developer do?",
  "  - choices:", '    - A: "Review the change and run the relevant tests."',
  '    - B: "Accept the change after checking its layout."',
  '    - C: "Approve the change based on response speed."',
  '    - D: "Merge the change after renaming its symbols."',
].join("\n");
test("accepts the documented Phase 1 Markdown shape", () => {
  expect(validateItem(question).errors).toEqual([]);
});
test("rejects batches instead of silently checking their first choices", () => {
  expect(validateItem(`${question}\n${question}`).errors.join(" ")).toMatch(/exactly one|Duplicate/);
});
test.each(["A", "B", "C", "D"])("rejects a missing %s choice", (label) => {
  expect(validateItem(question.replace(new RegExp(`^.*- ${label}:.*$`, "m"), "")).errors.join(" ")).toMatch(/Missing one/);
});
test("rejects empty and duplicate choices", () => {
  expect(validateItem(question.replace(/A: .+/, 'A: ""')).errors.join(" ")).toMatch(/empty/);
  expect(validateItem(question.replace(/B: .+/, 'B: "Review the change and run the relevant tests."')).errors.join(" ")).toMatch(/distinct/);
});
test("rejects accidental answer disclosure", () => {
  expect(validateItem(`${question}\n- **result:** The correct answer is A.`).errors.join(" ")).toMatch(/Phase 1/);
});
test("internal rationale does not become additional choices", () => {
  const draft = `${question}\n- **result:** The correct answer is A.\n- **rationale:**\n  - A: Correct. Validate code.\n  - B: Incorrect. Layout is not correctness.`;
  expect(validateItem(draft, { draft: true }).errors).toEqual([]);
});
test("uneven length warns without claiming the question is wrong", () => {
  const long = question.replace(/A: .+/, 'A: "Review the proposed change, verify the API against official documentation, and run boundary-condition tests before accepting it."');
  const result = validateItem(`${long}\n- result: The correct answer is A.`, { draft: true });
  expect(result.errors).toEqual([]);
  expect(result.warnings.join(" ")).toMatch(/lengths/);
  expect(result.warnings.join(" ")).toMatch(/correct answer/);
});
test("detects contractions with typographic apostrophes", () => {
  expect(validateItem(question.replace("What should", "Why shouldn’t")).errors.join(" ")).toMatch(/contractions/);
});
