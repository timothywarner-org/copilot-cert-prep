# Class activities

Use a classroom copy of this repository. The examples use fictional organizations and data. **No-account route:** write your proposed change or decision and compare it with the debrief; the instructor can execute the demonstration.

## Activity 1: validate before trusting (15 minutes)

**Scenario:** Tailwind Traders needs an export of approved order data. An assistant proposes this intentionally flawed snippet:

```javascript
// Deliberately flawed review fixture: do not execute or treat this as a supported API.
const fs = require("node:fs");
function exportOrders(fileName, orders) {
  fs.writeJsonSecure("../exports/" + fileName, orders);
}
```

1. Identify the API assumption and find evidence in [Node's file-system reference](https://nodejs.org/api/fs.html).
2. Identify the unsafe path assumption and determine what order fields should be exported.
3. Ask Copilot to propose a small implementation using a documented API, a fixed output directory, validated input, and explicit error handling.
4. Review its treatment of traversal input, invalid records, a missing output directory, and write failures.
5. Decide which checks can be automated and which require a human data-handling decision.

**Success:** reject the fabricated `writeJsonSecure` method, prevent user-controlled paths from escaping the output directory, exclude unnecessary personal data, and define meaningful tests. Syntax alone is insufficient.

**Debrief:** the API error is a reliability problem; path control and data minimization are privacy/security concerns; responsibility for release remains with the team.

**Cleanup:** keep any implementation under a disposable classroom directory. Do not export real customer records.

## Activity 2: one task, two surfaces (15 minutes)

**Scenario:** WoodGrove Bank uses the tips app as an internal learning catalog.

1. Run `node src/app.js`. Select **4**, search for `testing`, and quit with **q**.
2. In Chat, attach `src/app.js` and `src/tips.json`. Request an explanation of current search behavior and a plan for one small improvement.
3. In a separate Copilot CLI session, request the same explanation from the repository root. Review requested access and compare the evidence each response uses.
4. Invoke the reusable **review-learning-change** prompt on the application. Then apply the same prompt to `scripts/hooks/prevent-destructive-commands.js`.
5. If implementing an improvement, make it in your own branch and verify case-insensitive matching and the no-match result before reviewing the diff.

**Success:** both surfaces identify the relevant implementation; the reusable prompt produces a scoped review for two different files. A polished explanation without code evidence does not count.

**No-account route:** apply the [prompt checklist](../.github/prompts/review-learning-change.prompt.md) directly to the two files.

**Cleanup:** inspect your diff and retain only changes you intend to keep. Stop the CLI session when done.

## Activity 3: context changes the answer (10 minutes)

**Weak request:**

> Make this application better.

**Stronger request:**

> In `src/app.js`, explain keyword search for WoodGrove Bank's learning catalog. Preserve the current menu and `src/tips.json` schema. Propose one small change that helps users find tips. Define case-insensitive and no-match acceptance checks. Show the proposed diff and explain remaining uncertainty.

1. Predict which assumptions the weak request leaves to the model.
2. Run both requests with the same available model and compare relevance and scope.
3. Add one example of desired input/output. Explain why this changes the request from zero-shot to an example-guided prompt.
4. If a second model is available, repeat the stronger request without changing its context. Compare correctness, latency, and usage rather than model reputation.
5. Explain when a new session, a subagent, or an MCP retrieval would help.

**Success:** name the goal, files, constraints, example, and acceptance evidence. Explain how the added context changes the task.

**No-account route:** annotate both prompts and write the checks a reviewer should require.

**Cleanup:** close extra sessions; review any file changes they made.

## Activity 4: tests and safeguards (10 minutes)

**Scenario:** Adventure Works wants to adopt Copilot without treating generated code as verified code.

1. Run `npm test -- --runInBand`. Inspect a test that rejects malformed hook input or leaked quiz answers.
2. Ask what defect that test catches and what it cannot establish.
3. Run `node copilot-metrics-tour/index.js --demo`. Explain why completion acceptance does not prove a business outcome.
4. Choose a safeguard for each concern: sensitive context, matching public code, shell execution, and a faulty generated calculation.
5. Check [current exclusion support](https://docs.github.com/en/copilot/concepts/context/content-exclusion) for the exact surface before claiming protection.

**Success:** match the control to the concern and state its limitation. The checks do not prove enterprise enforcement.

**Cleanup:** these supplied checks require no tenant changes or live metrics credentials.

## Finish

Take the [mini mock](MINI-MOCK.md), record missed objectives, and use the [60-minute study plan](GH-300-STUDY-GUIDE.md#tonights-study-plan-60-minutes). The optional [FizzBuzz exercise](GH300-15min-lab-copilot-testing-fizzbuzz.md) remains available for additional test-design practice.
