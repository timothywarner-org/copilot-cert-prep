# GH-300 practice bank

**Sixty original items across the six exam domains, weighted to the blueprint.** Reviewed September 23, 2026 against the [August 7, 2026 skills measured](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300).

These are **original teaching questions**. They are not real exam items, they are not sourced from any leaked material, and passing them does not predict an exam result. What they do is force the decision the exam forces, then explain every choice.

## The banks

| Domain | Weight | Items | Bank |
|---|---|---:|---|
| 1. Use GitHub Copilot responsibly | 15-20% | 10 | [Responsible use](domain-1-responsible-use.md) |
| 2. Use GitHub Copilot features | 25-30% | 17 | [Features](domain-2-features.md) |
| 3. Understand data and architecture | 10-15% | 8 | [Data and architecture](domain-3-data-architecture.md) |
| 4. Apply prompt engineering and context crafting | 10-15% | 8 | [Prompt engineering](domain-4-prompt-engineering.md) |
| 5. Improve developer productivity | 10-15% | 8 | [Productivity](domain-5-productivity.md) |
| 6. Configure privacy, exclusions, and safeguards | 10-15% | 9 | [Privacy and safeguards](domain-6-privacy-safeguards.md) |

Item counts follow the published weights, so Domain 2 is the largest bank by design.

## How to use these

**Answer before you open the rationale.** Every item hides its answer behind a collapsed block. Write down your letter **and one sentence saying why** before expanding it. The sentence is the part that transfers to the exam; the letter is not.

**Read all four rationales, including the one you picked.** Each wrong option explains why it is plausible and where it breaks. Most GH-300 items are decided by eliminating a near-miss, not by recognizing the right answer on sight, so the distractor reasoning is the content.

**Follow the source links when a rationale surprises you.** Every item cites the primary pages it was written from, and all of them were verified over HTTP on September 23, 2026.

## Start with the twelve-item diagnostic

If you do not know where you are weak, work these twelve first. They span all six domains and concentrate on the distinctions that decide the most items.

| # | Item | What it checks |
|---:|---|---|
| 1 | [D1 Q1](domain-1-responsible-use.md#q1-a-ranking-function-inherits-a-historical-pattern) | Telling fairness from inclusiveness |
| 2 | [D1 Q7](domain-1-responsible-use.md#q7-an-unfamiliar-dependency-appears-in-a-suggestion) | Validating an unfamiliar dependency |
| 3 | [D2 Q3](domain-2-features.md#q3-how-far-does-an-exclusion-reach) | Content exclusion is surface-specific |
| 4 | [D2 Q8](domain-2-features.md#q8-running-it-without-a-human-present) | Running Copilot CLI unattended |
| 5 | [D3 Q4](domain-3-data-architecture.md#q4-where-content-filtering-acts) | Filtering acts inbound and outbound |
| 6 | [D3 Q5](domain-3-data-architecture.md#q5-drawing-the-lifecycle) | Ordering the suggestion lifecycle |
| 7 | [D4 Q1](domain-4-prompt-engineering.md#q1-adding-three-examples-to-a-request) | Naming few-shot prompting |
| 8 | [D4 Q3](domain-4-prompt-engineering.md#q3-being-sure-a-file-was-considered) | Explicit versus implicit context |
| 9 | [D5 Q1](domain-5-productivity.md#q1-refactoring-a-module-with-no-tests) | Refactoring needs a safety net |
| 10 | [D5 Q6](domain-5-productivity.md#q6-three-tests-that-assert-almost-nothing) | Assertion strength beats test count |
| 11 | [D6 Q1](domain-6-privacy-safeguards.md#q1-making-the-indemnity-apply) | Indemnity requires blocking the filter |
| 12 | [D6 Q4](domain-6-privacy-safeguards.md#q4-an-excluded-file-still-seems-to-be-in-play) | Diagnosing a per-surface exclusion gap |

**Scoring the diagnostic.** Two wrong in one domain means work that domain's full bank next. Then open the matching rows in [the objective-mapped resource links](../GH-300-RESOURCE-LINKS.md) and read the sources before returning to the questions.

## Five distinctions that decide the most items

These recur across domains and are worth knowing cold:

1. **Content exclusion** is not the **suggestions matching public code** setting is not an **editor setting** is not an **organization policy**. Four controls, four purposes.
2. **Organization policy** is not **enterprise managed settings**. Different owner, different level, different configuration location.
3. A **session** is not a **subagent** is not a **handoff**. One conversation, one delegated context, one continuation elsewhere.
4. **Blocking the public code filter** activates **IP indemnity** on Business and Enterprise. A setting and a legal position, linked.
5. The **proxy** filters on the way in; **post-processing** checks on the way out. Both exist, in that order.

## Two vocabulary gaps

The exam uses words the product documentation avoids, and the reverse.

- Microsoft Learn says **zero-shot** and **few-shot**. GitHub Docs says "give examples." Learn the exam's vocabulary.
- The objectives still name **Copilot Edits** and **Spark**. GitHub's current documentation folds Edits into agent mode and code review, and Spark stopped accepting new users on August 4, 2026. Recognize both terms, and do not expect a live demo of Spark.

## Integrity and validation

Every item is checked by the repository's own item validator, the same one the Cert Buddy agent uses:

```powershell
npm run check:items
```

That gate enforces exactly four distinct choices, one correct answer, no all-or-none constructions, no contractions, balanced option lengths, an even spread of correct letters across the bank, and scenario company variety. It reports structure only. **Factual accuracy is a human review, not a script result.**

If you find an item you can defend a second answer for, that is a bug worth reporting. An item with two defensible answers teaches nothing.
