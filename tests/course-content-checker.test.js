/** Cross-reference checks must preserve real anchors without stalling on hostile path text. */
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { headingIds, isInlinePath } = require("../scripts/check-course-content");

test("preserves formatted, linked, duplicate, and explicit anchors", () => {
  const markdown = [
    "# **Course** overview", "## [Practice](docs/practice.md)", "## Practice",
    "## ⚙️ Helper commands", '<a id="instructor-notes"></a>', "```md", "# Example only", "```"
  ].join("\n");
  expect([...headingIds(markdown)]).toEqual([
    "course-overview", "practice", "practice-1", "-helper-commands", "instructor-notes"
  ]);
});

test("handles quoted angle characters and nested malformed markup deterministically", () => {
  const markdown = '# <span title="x > y">Review</span> tools\n## <scr<script>ipt>Scope</scr<script>ipt>';
  expect([...headingIds(markdown)]).toEqual(["review-tools", "scope"]);
});

test.each([
  "README.md", "../references/style-guide.md", ".github/skills/*/SKILL.md",
  "docs/Class notes.md", "scripts/hooks/"
])("recognizes the local path %s", (candidate) => {
  expect(isInlinePath(candidate)).toBe(true);
});

test.each([
  "node src/app.js", "https://example.com/guide.md", "/login", "docs//guide.md",
  "docs/guide.md!", '{ "file": "guide.md" }'
])("does not classify an example or malformed path as a reference: %s", (candidate) => {
  expect(isInlinePath(candidate)).toBe(false);
});

test("rejects many ambiguous segments within a bounded child process", () => {
  // A process timeout prevents a future backtracking regression from hanging the test runner.
  const script = path.resolve(__dirname, "../scripts/check-course-content.js");
  const result = spawnSync(process.execPath, ["-e",
    'const { isInlinePath } = require(process.argv[1]); console.log(isInlinePath(".*/".repeat(20000) + "!"));', script
  ], { encoding: "utf8", timeout: 5000 });
  expect(result.error).toBeUndefined();
  expect(result.status).toBe(0);
  expect(result.stdout.trim()).toBe("false");
});
