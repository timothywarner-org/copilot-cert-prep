# Optional GH-300 lab: generate and validate tests with Copilot

**Duration:** 15 minutes. This is optional testing practice for the O'Reilly course, not a prerequisite for the four segments.

**Exam alignment:** Improve developer productivity with GitHub Copilot (10-15%). Generate unit tests, identify edge cases, and validate AI-generated output.

## Scenario and prerequisites

At Tailwind Traders, you are checking how well Copilot turns a written contract into tests. FizzBuzz is a small practice fixture that keeps the focus on test quality.

Use this repository in VS Code with GitHub Copilot and Node.js. From the repository root, install the test dependencies once:

```powershell
npm ci
```

The implementation is already complete. Your task is to generate independent tests, review their assertions, and check whether they detect a deliberate mistake. If you cannot use Copilot, write the same test plan yourself and follow the remaining steps.

## The contract

[`fizzBuzz.js`](../fizzBuzz.js) exports `{ fizzBuzz }` using CommonJS. `fizzBuzz(limit = 100)` returns a new array of strings. It does not print during a function call or when imported. Running `node fizzBuzz.js` directly prints the default sequence, one value per line.

| Input or rule | Required behavior |
| --- | --- |
| Each integer from 1 through `limit`, inclusive | Return one string in ascending order |
| Divisible by both 3 and 5 | `"FizzBuzz"` |
| Divisible by 3 only | `"Fizz"` |
| Divisible by 5 only | `"Buzz"` |
| Any other integer in the sequence | Its decimal string, such as `"1"` |
| Omitted argument or `undefined` | Use 100; return 100 strings ending with `"Buzz"` |
| `0` | Return `[]` |
| `1` | Return `["1"]` |
| Finite integer from 0 through 10,000 | Accepted; the cap bounds memory use for this exercise |
| Negative integer or integer above 10,000 | Throw `RangeError` |
| String, boolean, `null`, fraction, `NaN`, or infinity | Throw `TypeError`; do not coerce or round |

For example, `fizzBuzz(5)` returns `["1", "2", "Fizz", "4", "Buzz"]`.

## 1. Frame the request (3 minutes)

Open `fizzBuzz.js` and this lab in Copilot Chat. Supply the contract above with this prompt:

```text
Using the supplied FizzBuzz contract, propose a minimal Jest test plan.
Include normal cases, both divisibility rules together, zero and one,
the default, the maximum supported input, and each invalid-input category.
Identify expected values and error classes. Do not invent requirements
or change the implementation.
```

**Review gate:** Compare the plan with the table. Reject a plan that expects numbers instead of strings, silently converts `"15"`, or forgets the combined rule at 15.

## 2. Generate independent tests (6 minutes)

Use this prompt:

```text
Create tests/fizzbuzz.practice.test.js using Jest and CommonJS.
Import { fizzBuzz } from ../fizzBuzz. Implement the reviewed test plan.
Use literal expected values rather than reimplementing FizzBuzz in a test.
Keep production code unchanged. Explain why each boundary test matters.
```

Review the diff before accepting it. The repository also contains [`tests/fizzbuzz-contract.test.js`](../tests/fizzbuzz-contract.test.js) as the maintained reference suite. Write your practice tests first, then use the reference for comparison.

**Review gate:** The new practice file checks the normal and combined rules, at least two boundaries, and both error classes. Its assertions test returned values rather than merely checking that execution finishes.

## 3. Run the tests and prove they can fail (4 minutes)

Run only your practice tests:

```powershell
npm test -- --runInBand tests/fizzbuzz.practice.test.js
```

If a test fails, compare its expectation with the contract before changing code. Ask Copilot to explain the mismatch with this prompt:

```text
Explain this Jest failure against the supplied contract. Identify whether
the expectation or implementation is wrong. Propose the smallest correction
and explain why it preserves the contract.
```

After the tests pass, temporarily change the return value for multiples of 15 in `fizzBuzz.js` from `"FizzBuzz"` to `"Fizz"`. Run the same command and confirm that a test fails for that behavior. Undo that one temporary edit, then run the command again.

**Review gate:** Your tests pass for the correct implementation, fail for the deliberate defect, and pass again after you restore it. A passing test alone does not establish that it would detect a mistake.

## 4. Review and explain (2 minutes)

Compare your practice suite with the reference suite, then run both:

```powershell
npm test -- --runInBand tests/fizzbuzz.practice.test.js tests/fizzbuzz-contract.test.js
```

Identify one useful boundary assertion and one Copilot suggestion you corrected or rejected. If you kept every suggestion, explain how you checked them. Avoid adding redundant tests solely to increase the test count.

## Cleanup

Keep your practice file if you want to study it later. To remove only the exercise file:

```powershell
Remove-Item -LiteralPath .\tests\fizzbuzz.practice.test.js -ErrorAction SilentlyContinue
git status --short
```

Confirm that the temporary production edit is undone. Leave the reference suite in place.

## References

- [Current GH-300 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300)
- [Developer use cases for AI with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/developer-use-cases-for-ai-with-github-copilot/)
- [Develop unit tests using GitHub Copilot tools](https://learn.microsoft.com/en-us/training/modules/develop-unit-tests-using-github-copilot-tools/)
