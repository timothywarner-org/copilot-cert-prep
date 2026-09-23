/**
 * Cover the external link checker's parsing, which is where a false result would come from.
 *
 * The network behavior is deliberately not mocked here. These tests prove URL extraction and
 * comparison, not that any particular page is reachable; `npm run check:links` does that
 * against the live web.
 */
"use strict";

const { extractUrls, stripTrackingAndCase } = require("../scripts/check-external-links");

describe("extractUrls", () => {
  test("finds Markdown link targets and bare URLs, with line numbers", () => {
    const text = ["# Title", "", "See [the guide](https://docs.github.com/en/copilot).", "", "https://learn.microsoft.com/en-us/"].join("\n");
    const found = extractUrls(text);
    expect(found.get("https://docs.github.com/en/copilot")).toBe(3);
    expect(found.get("https://learn.microsoft.com/en-us/")).toBe(5);
  });

  test("strips sentence punctuation that would otherwise produce a false 404", () => {
    const found = extractUrls("Read https://docs.github.com/en/copilot, then stop.");
    expect([...found.keys()]).toEqual(["https://docs.github.com/en/copilot"]);
  });

  test("does not swallow a closing Markdown parenthesis", () => {
    const found = extractUrls("[x](https://example.org/a) and [y](https://docs.github.com/b)");
    // example.org is skipped as an illustration host; the real link must survive intact.
    expect([...found.keys()]).toEqual(["https://docs.github.com/b"]);
  });

  test("skips REST templates, which are patterns rather than pages", () => {
    const found = extractUrls("https://api.github.com/orgs/{org}/copilot/metrics");
    expect(found.size).toBe(0);
  });

  test("records only the first occurrence of a repeated URL", () => {
    const found = extractUrls("https://docs.github.com/en/copilot\nhttps://docs.github.com/en/copilot");
    expect(found.get("https://docs.github.com/en/copilot")).toBe(1);
    expect(found.size).toBe(1);
  });
});

describe("stripTrackingAndCase", () => {
  test("treats a fragment or trailing slash as the same page", () => {
    expect(stripTrackingAndCase("https://docs.github.com/en/copilot/")).toBe(
      stripTrackingAndCase("https://docs.github.com/en/copilot#intro")
    );
  });

  test("treats a different path as a different page", () => {
    expect(stripTrackingAndCase("https://learn.microsoft.com/training/x")).not.toBe(
      stripTrackingAndCase("https://learn.microsoft.com/en-us/training/x")
    );
  });

  test("returns the input for a value that is not a URL", () => {
    expect(stripTrackingAndCase("not a url")).toBe("not a url");
  });
});
