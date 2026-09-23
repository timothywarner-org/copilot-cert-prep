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

/**
 * Regression cover for the false positive that recurred four times: a backticked fragment of
 * a URL reads as a repository path. Each case below is one that actually reached a failed run.
 */
describe("prose about an address is not a path claim", () => {
  const { describesAnAddress, addressRanges } = require("../scripts/check-course-content");

  test.each([
    [
      "moved out of `concepts/context/` per https://docs.github.com/en/copilot/concepts/context/content-exclusion",
      "concepts/context/"
    ],
    [
      "see https://example.org/a/b/guide.md for `a/b/guide.md` in the published docs",
      "a/b/guide.md"
    ],
    [
      "the [exclusion page](https://docs.github.com/en/copilot/concepts/security/content-exclusion) covers `concepts/security/`",
      "concepts/security/"
    ]
  ])("ignores a URL fragment: %s", (line, candidate) => {
    const at = line.indexOf("`" + candidate + "`");
    expect(at).toBeGreaterThan(-1);
    expect(describesAnAddress(line, at, candidate)).toBe(true);
  });

  test("still treats a genuine repository path as a claim", () => {
    const line = "Open `src/tips.json` before the demo.";
    expect(describesAnAddress(line, line.indexOf("`"), "src/tips.json")).toBe(false);
  });

  test("a path that merely shares a word with a link is still checked", () => {
    const line = "See [the guide](docs/CLASS-ACTIVITIES.md) and open `src/app.js`.";
    expect(describesAnAddress(line, line.indexOf("`src"), "src/app.js")).toBe(false);
  });

  test("reports the ranges it protects", () => {
    expect(addressRanges("a https://x.test/p b").length).toBe(1);
    expect(addressRanges("no addresses here").length).toBe(0);
  });
});

describe("a document declares its own exemptions", () => {
  const { declaredExemptions } = require("../scripts/check-course-content");

  test("reads the path and its reason", () => {
    const { allowed, errors } = declaredExemptions(
      "intro\n<!-- allow-missing-path: teams/class-demo.json | lives in the enterprise repo -->\n"
    );
    expect(errors).toEqual([]);
    expect(allowed.get("teams/class-demo.json")).toBe("lives in the enterprise repo");
  });

  test("refuses an exemption with no reason, so the list cannot become a blanket ignore", () => {
    const { allowed, errors } = declaredExemptions("<!-- allow-missing-path: demos/ -->");
    expect(allowed.size).toBe(0);
    expect(errors.join(" ")).toMatch(/needs a reason/);
  });

  test("documenting the directive does not declare one", () => {
    // CLAUDE.md explains this feature by showing the syntax. Showing it must not enable it.
    const { allowed, errors } = declaredExemptions(
      "Declare it like this: `<!-- allow-missing-path: THE/PATH | why it is absent -->`"
    );
    expect(allowed.size).toBe(0);
    expect(errors).toEqual([]);
  });

  test("collects several declarations from one document", () => {
    const { allowed } = declaredExemptions(
      [
        "<!-- allow-missing-path: demos/ | removed tree -->",
        "<!-- allow-missing-path: examples/ | removed tree -->"
      ].join("\n")
    );
    expect([...allowed.keys()]).toEqual(["demos/", "examples/"]);
  });
});

describe("the shipped tree passes its own gate", () => {
  const { auditContent } = require("../scripts/check-course-content");

  test("no errors, and every declared exemption is still in use", () => {
    const report = auditContent();
    expect(report.errors).toEqual([]);
    // A stale exemption is reported as an error, so an empty error list also proves none rotted.
    expect(report.skippedExamples.length).toBe(6);
    expect(report.skippedExamples.every(item => item.reason.length > 0)).toBe(true);
  });
});

describe("a directory under a root this repository lacks is prose", () => {
  const { namesARepositoryLocation, auditContent } = require("../scripts/check-course-content");
  const inventory = new Set(auditContent === null ? [] : ["docs/README.md", "src/app.js", "scripts/x.js"]);

  test.each(["concepts/context/", "demos/", "course-materials/", "exam-metadata/"])(
    "ignores the foreign directory %s",
    (candidate) => {
      expect(namesARepositoryLocation(candidate, inventory)).toBe(false);
    }
  );

  test.each(["docs/", "docs/no-such-folder/", "src/config/", "scripts/hooks/"])(
    "still checks %s, because its root exists here",
    (candidate) => {
      expect(namesARepositoryLocation(candidate, inventory)).toBe(true);
    }
  );

  test("a file reference is always checked, whatever its directory", () => {
    expect(namesARepositoryLocation("anything/at/all.md", inventory)).toBe(true);
    expect(namesARepositoryLocation("tips.json", inventory)).toBe(true);
  });
});
