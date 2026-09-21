/** Guard the distinction between telemetry, outcome claims, and authenticated downloads. */
const fs = require("node:fs");
const path = require("node:path");
const { parseReport, summarize, fetchReport } = require("../copilot-metrics-tour");
const fixture = fs.readFileSync(path.join(__dirname, "../copilot-metrics-tour/fixtures/synthetic-organization.ndjson"), "utf8");
test("summarizes synthetic completion data without adding daily users", () => {
  expect(summarize(parseReport(fixture))).toMatchObject({ peakDailyUsers:25, interactions:500, generated:600, accepted:240, acceptancePercent:40, cliPrompts:30 });
});
test("missing or zero denominator does not become a misleading rate", () => {
  const days = parseReport('{"day":"2026-09-19","totals_by_feature":[]}');
  expect(summarize(days).acceptancePercent).toBeNull();
  expect(summarize(days).peakDailyUsers).toBeNull();
  days[0].totals_by_feature.push({feature:"code_completion",code_generation_activity_count:0,code_acceptance_activity_count:0});
  expect(summarize(days).acceptancePercent).toBeNull();
});
test("rejects malformed, empty, user-level, and overlapping reports", () => {
  for (const text of ["invalid", "", '{"day":"2026-09-19","user_id":1}', fixture + "\n" + fixture]) expect(() => parseReport(text)).toThrow();
});
test("rejects negative counts", () => {
  const days = parseReport('{"day":"2026-09-19","daily_active_users":-1}');
  expect(() => summarize(days)).toThrow(/nonnegative/);
});
test("only the API request receives the token", async () => {
  const fetcher = jest.fn()
    .mockResolvedValueOnce({ok:true,json:async()=>({download_links:["https://reports.example/report.ndjson?signature=private"]})})
    .mockResolvedValueOnce({ok:true,text:async()=>fixture});
  expect((await fetchReport("woodgrove", "test-token", fetcher)).length).toBe(2);
  expect(fetcher.mock.calls[0][0]).toContain("/organization-28-day/latest");
  expect(fetcher.mock.calls[0][1].headers.Authorization).toBe("Bearer test-token");
  expect(fetcher.mock.calls[1][1].headers).toBeUndefined();
});
test("rejects insecure downloads", async () => {
  const fetcher = jest.fn().mockResolvedValue({ok:true,json:async()=>({download_links:["http://reports.example/report"]})});
  await expect(fetchReport("woodgrove", "test-token", fetcher)).rejects.toThrow(/HTTPS/);
  expect(fetcher).toHaveBeenCalledTimes(1);
});
test("reports HTTP authorization failures without claiming a privacy threshold", async () => {
  await expect(fetchReport("woodgrove", "test-token", async()=>({ok:false,status:403}))).rejects.toThrow(/HTTP 403/);
});
test("does not leak signed URLs in a network exception", async () => {
  const fetcher=jest.fn().mockResolvedValueOnce({ok:true,json:async()=>({download_links:["https://reports.example/?signature=secret"]})}).mockRejectedValueOnce(new Error("https://reports.example/?signature=secret"));
  await expect(fetchReport("woodgrove", "test-token", fetcher)).rejects.toThrow("Report download failed; request fresh links and retry.");
});
