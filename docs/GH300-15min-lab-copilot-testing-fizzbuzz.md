# GH-300 15-minute lab: generate and validate tests with GitHub Copilot

## Objective alignment

- Domain: Improve developer productivity with GitHub Copilot (10-15%)
- Skill focus: Generate unit tests, identify edge cases, and validate AI-generated output

## Lab duration

- 15 minutes

## Scenario

You are a developer at Northwind Traders. Your team wants faster test creation for a small JavaScript utility while keeping test quality high.

## Assumption

This lab uses VS Code with GitHub Copilot Chat.

## Prerequisites

- Access to this repository in VS Code
- GitHub Copilot enabled in VS Code
- Node.js installed
- Dependencies installed at repo root

## Success criteria

- A working Jest test file validates expected FizzBuzz behavior
- Tests include at least two edge-case checks
- All tests pass locally

## Timeboxed tasks

### Task 1 (3 minutes): inspect and frame the request

1. Open fizzBuzz.js in the repo root.
2. Open Copilot Chat in VS Code.
3. Enter this prompt:

```text
Review this file and propose a minimal Jest test plan for the expected FizzBuzz behavior. Include normal cases, boundary cases, and one invalid-input case.
```

Validation gate:

- The response includes at least one normal case, one boundary case, and one invalid-input case.

### Task 2 (6 minutes): generate the test file

1. Enter this prompt in Copilot Chat:

```text
Create a Jest test file named fizzBuzz.test.js in the repository root. Write tests for standard FizzBuzz output expectations and include at least two edge cases. If exports are missing in fizzBuzz.js, suggest the smallest safe change required.
```

1. Review the generated test content before saving.
1. If Copilot suggests code changes in fizzBuzz.js, accept only the minimum changes required for testability.

Validation gate:

- fizzBuzz.test.js exists in the repo root.
- The file contains clear assertions for divisible-by-3, divisible-by-5, and divisible-by-15 behavior.
- The file contains at least two edge-case assertions.

### Task 3 (4 minutes): execute and repair

1. Run tests:

```powershell
npm test -- fizzBuzz.test.js
```

1. If tests fail, enter this Copilot Chat prompt:

```text
Analyze this Jest output and propose the smallest code or test fix that aligns with FizzBuzz requirements. Explain why the failure occurred.
```

1. Apply only the minimal fix, then run tests again.

Validation gate:

- Test run completes successfully.
- You can explain one failure and why the selected fix resolved it.

### Task 4 (2 minutes): quality hardening

1. Enter this Copilot Chat prompt:

```text
Suggest one additional edge-case test and one readability improvement for the test file without changing behavior.
```

1. Add the extra test if it improves coverage.

Validation gate:

- The final test file is readable, and test names clearly describe expected behavior.

## Debrief questions

- Which Copilot suggestion was correct on the first pass, and why?
- Which suggestion needed human correction, and what was the risk if accepted unchanged?
- How did prompt specificity affect test quality?

## Rollback and cleanup

1. Remove artifacts created for the exercise if you do not want to keep them:

```powershell
Remove-Item .\fizzBuzz.test.js -ErrorAction SilentlyContinue
```

1. Revert local changes to fizzBuzz.js manually in the editor if you made temporary edits.
1. Run a quick status check to confirm cleanup:

```powershell
git status --short
```

## References

- [Developer use cases for AI with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/developer-use-cases-for-ai-with-github-copilot/)
- [Develop unit tests using GitHub Copilot tools](https://learn.microsoft.com/en-us/training/modules/develop-unit-tests-using-github-copilot-tools/)
- [GitHub Copilot certification overview](https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/)
