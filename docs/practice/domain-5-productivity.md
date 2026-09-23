# Domain 5 practice: Improve developer productivity with GitHub Copilot

**Weight on the exam: 10-15%.** Eight original items. These are teaching questions, not real exam content.

This domain is wider than test generation. **Refactoring, documentation, reducing context switching, generating sample data, and modernizing legacy code** are each named objectives, and items are drawn from all of them. Three of the eight below sit outside testing for exactly that reason.

---

## Q1. Refactoring a module with no tests

**Objective:** Use Copilot for code generation, refactoring, and documentation · **Bloom:** Apply · **Difficulty:** medium

Northwind Traders wants Copilot to refactor a 900-line order pricing module that currently has no automated tests. What should the team do first?

- **A**: Ask for the refactor and document the reasoning in the pull request description
- **B**: Establish tests that capture current behavior, then refactor against that net
- **C**: Split the module into smaller files so that each one fits a context window
- **D**: Turn on agent mode so the refactor and its verification happen in one pass

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: A description records intent. It provides no way to detect that the refactor silently changed a pricing outcome, which is the risk that matters here.
- **B**: A refactor is defined as changing structure while preserving behavior, so it needs a way to detect changed behavior. Characterization tests written against the current module supply that, and they are useful whether or not Copilot does the refactoring.
- **C**: Splitting the file is itself a refactor, performed with the same missing safety net. It moves the risk earlier rather than reducing it.
- **D**: Agent mode can run tests as part of its loop, but it cannot run tests that do not exist. Automation does not substitute for the missing oracle.

**Sources:** [Implement code improvements using Copilot tools](https://learn.microsoft.com/en-us/training/modules/implement-code-improvements-using-github-copilot-tools/) · [Using Copilot to reduce technical debt](https://docs.github.com/en/copilot/tutorials/reduce-technical-debt)

</details>

---

## Q2. Data for a staging workflow

**Objective:** Generate sample data and modernize legacy code · **Bloom:** Apply · **Difficulty:** easy

Tailwind Traders needs realistic customer records to exercise a new returns workflow in a staging environment. Which approach matches responsible documented practice?

- **A**: Copy a recent slice of the production customer table into the staging database
- **B**: Export real records and replace only the surname column with random strings
- **C**: Retrieve comparable records from a public dataset of real customer profiles
- **D**: Generate fictional records that satisfy the schema and its stated constraints

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: Copying production records moves real personal data into an environment with weaker controls. Convenience does not change the data protection obligation.
- **B**: Replacing one field leaves the rest of the record identifying. Partial masking is a common and inadequate approach, which is what makes it a plausible wrong answer.
- **C**: Public data about real people is still data about real people, and its licensing and provenance add a second problem on top of the privacy one.
- **D**: Generating fictional records that match the schema, the field constraints, and the realistic shape of the data exercises the workflow without handling anyone's personal information. This is the documented use of Copilot for sample data.

**Sources:** [Creating mock objects to abstract layers](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/testing-code/create-mock-objects) · [Develop code features using Copilot tools](https://learn.microsoft.com/en-us/training/modules/develop-code-features-using-github-copilot-tools/)

</details>

---

## Q3. Documentation that describes the wrong behavior

**Objective:** Use Copilot for code generation, refactoring, and documentation · **Bloom:** Analyze · **Difficulty:** medium

A WoodGrove Bank developer asks Copilot to document a settlement function. The generated summary reads well but describes a rounding behavior the function does not actually implement. What does this indicate about generated documentation?

- **A**: Documentation must be verified against the implementation before it is published
- **B**: Documentation should be generated only after a function has shipped to production
- **C**: Documentation generation requires a dedicated MCP server to produce accuracy
- **D**: Documentation is dependable whenever the function already passes existing tests

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: Generated documentation is a proposal about behavior, and a fluent description can state something the code does not do. Reading the summary against the implementation is the check, and inaccurate documentation is more damaging than none because readers trust it.
- **B**: Timing is not the issue. The same mismatch would appear after release, with more people relying on it.
- **C**: An MCP server supplies external context. It does not guarantee that a description of local code is faithful.
- **D**: Passing tests establish the behaviors those tests exercise. A rounding rule that no test covers can be both undocumented in reality and confidently described in prose.

**Sources:** [Generate documentation using Copilot tools](https://learn.microsoft.com/en-us/training/modules/generate-documentation-using-github-copilot-tools/) · [Review AI-generated code](https://docs.github.com/en/copilot/tutorials/review-ai-generated-code)

</details>

---

## Q4. A day lost to switching windows

**Objective:** Accelerate learning and reduce context switching · **Bloom:** Understand · **Difficulty:** easy

A Blue Yonder Airlines developer who is new to the codebase spends most of a day moving between a wiki, a ticket system, and unfamiliar source files trying to understand a scheduling service. Which documented benefit applies most directly?

- **A**: Copilot removes the need to read the service source code at all
- **B**: Copilot guarantees that the wiki and the source code stay consistent
- **C**: Copilot explains unfamiliar code in place, reducing context switching
- **D**: Copilot replaces onboarding documentation with generated equivalents

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: Explanation supports reading the code; it does not replace it. A developer who never reads the source cannot validate what the explanation claims.
- **B**: Nothing about Copilot keeps a wiki synchronized with an implementation. Documentation drift is an organizational problem.
- **C**: Explaining unfamiliar code where the developer is already working is the documented productivity benefit, and reducing context switching is named explicitly in the objectives. Staying in one place while building understanding is the gain.
- **D**: Generated explanations are a supplement to onboarding material, not a replacement, and treating them as authoritative reintroduces the validation problem.

**Sources:** [Developer use cases for AI with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/developer-use-cases-for-ai-with-github-copilot/) · [Using Copilot to explore a codebase](https://docs.github.com/en/copilot/tutorials/explore-a-codebase)

</details>

---

## Q5. Testing a service that calls a gateway

**Objective:** Generate unit and integration tests · **Bloom:** Apply · **Difficulty:** medium

Fourth Coffee wants Copilot to help test a payment service that calls an external gateway. The tests have to run in continuous integration on every pull request without contacting the gateway. Which approach fits?

- **A**: Generate unit tests with the gateway replaced by a mock or stub dependency
- **B**: Generate tests that call the live gateway using a shared sandbox credential
- **C**: Generate one end-to-end test that exercises the deployed staging environment
- **D**: Generate tests that skip themselves whenever the gateway is unreachable

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: Substituting a mock or stub for the external dependency isolates the service logic, keeps the suite fast and deterministic, and removes the network call entirely. That satisfies both stated requirements, and generating mock objects is a documented Copilot use.
- **B**: A live call violates the stated constraint, introduces a shared credential into continuous integration, and makes results depend on a third party's availability.
- **C**: An end-to-end test against staging is valuable separately, but it contacts the gateway and is the wrong instrument for per-pull-request feedback.
- **D**: A test that skips on failure reports green while verifying nothing. Silent skips are worse than an honest absence of coverage.

**Sources:** [Writing tests with GitHub Copilot](https://docs.github.com/en/copilot/tutorials/write-tests) · [Creating mock objects to abstract layers](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/testing-code/create-mock-objects)

</details>

---

## Q6. Three tests that assert almost nothing

**Objective:** Identify edge cases and write assertions · **Bloom:** Analyze · **Difficulty:** medium

A Contoso developer asks Copilot for tests covering a discount calculator and receives three tests that each assert only that the function returns a number. What is the most useful next request?

- **A**: Ask for additional tests so that the total assertion count increases
- **B**: Ask for the same tests rewritten in a different testing framework
- **C**: Ask for a coverage report so that untested lines become visible
- **D**: Ask for boundary and failure cases with assertions on exact values

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: More tests of the same shape add runtime and no information. A weak assertion repeated is still a weak assertion.
- **B**: The framework is not the problem. Changing it preserves the inadequate assertions exactly.
- **C**: Coverage would show these lines as exercised, which is precisely the false comfort that a type-only assertion creates. The metric would look fine.
- **D**: The defect is assertion strength, not test count. Asking for boundary values, invalid input, and exact expected results is what turns a passing suite into evidence about behavior.

**Sources:** [Generating unit tests](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/testing-code/generate-unit-tests) · [Develop unit tests using Copilot tools](https://learn.microsoft.com/en-us/training/modules/develop-unit-tests-using-github-copilot-tools/)

</details>

---

## Q7. One security finding

**Objective:** Suggest security improvements and performance optimizations · **Bloom:** Analyze · **Difficulty:** medium

A Coho Winery team asks Copilot to review a reporting endpoint for security problems, and Copilot identifies a missing input validation check. Which conclusion is accurate?

- **A**: The endpoint is secure once the identified input check has been added
- **B**: A single useful finding does not establish that no other issue remains
- **C**: Copilot can replace code scanning tools for this class of assessment
- **D**: The finding can be accepted unreviewed because it is highly specific

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: Fixing a found issue removes that issue. It says nothing about the issues that were not surfaced, and treating one finding as a clean bill of health is the reasoning error this item targets.
- **B**: Copilot can surface real vulnerability patterns and propose fixes, and GitHub documentation is explicit that this does not substitute for dedicated security tooling. An absence of further findings is not evidence of absence.
- **C**: Code scanning performs systematic analysis with different guarantees. The documentation positions Copilot as complementary rather than as a replacement.
- **D**: A specific finding can still be wrong about this codebase, and a proposed fix can introduce its own defect. Review applies to security suggestions as much as to any other output.

**Sources:** [Finding existing vulnerabilities in code](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/analyze-security/find-vulnerabilities) · [Best practices for using GitHub Copilot](https://docs.github.com/en/copilot/get-started/best-practices)

</details>

---

## Q8. Modernizing an aging reporting tool

**Objective:** Generate sample data and modernize legacy code · **Bloom:** Apply · **Difficulty:** medium

Proseware maintains a reporting tool written in an older language that very few staff can still maintain. Leadership wants Copilot to help modernize it. Which approach matches documented guidance?

- **A**: Request a full rewrite in a single pass and review the resulting diff
- **B**: Freeze the legacy tool and rebuild from scratch without reference to it
- **C**: Work in bounded reviewed steps, verifying behavior at every stage
- **D**: Translate it automatically and deploy once the new code compiles

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: A single enormous diff cannot be reviewed meaningfully, and any behavioral change hides inside it. Review effort scales badly with change size.
- **B**: Discarding the existing implementation discards the accumulated business rules encoded in it, many of which exist nowhere else. That is how modernization projects lose undocumented behavior.
- **C**: GitHub documents modernization and technical debt reduction as incremental work: translate or restructure a bounded piece, verify that behavior is preserved, review it, and repeat. Each step stays reviewable and reversible.
- **D**: Compilation proves syntax, not equivalence. A translated report that compiles can still produce different totals, which is the failure that matters here.

**Sources:** [Using Copilot to reduce technical debt](https://docs.github.com/en/copilot/tutorials/reduce-technical-debt) · [Translating code to a different language](https://docs.github.com/en/copilot/tutorials/copilot-cookbook/refactor-code/translate-code)

</details>
