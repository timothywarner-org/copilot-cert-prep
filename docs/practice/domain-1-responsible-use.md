# Domain 1 practice: Use GitHub Copilot responsibly

**Weight on the exam: 15-20%.** Ten original items. These are teaching questions, not real exam content.

Decide your answer and your reason before opening the rationale. On the real exam the reason is what transfers; the letter is not.

The six principles this domain tests are **fairness**, **reliability and safety**, **privacy and security**, **inclusiveness**, **transparency**, and **accountability**. Several items below hinge on telling two neighboring principles apart, which is the distinction most candidates lose marks on.

---

## Q1. A ranking function inherits a historical pattern

**Objective:** Identify potential harms and mitigation strategies of AI usage · **Bloom:** Analyze · **Difficulty:** medium

Fourth Coffee is building a staff scheduling application. A developer asks GitHub Copilot to generate a function that ranks employees for premium shifts. The generated function weights a reliability score that the team later traces to historical data in which part-time parents were systematically under-scheduled. Which responsible AI principle does this outcome most directly put at risk?

- **A**: Transparency
- **B**: Fairness
- **C**: Reliability and safety
- **D**: Inclusiveness

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: Transparency concerns whether a system and its limitations are understandable to the people affected. The team can explain exactly how the score is calculated, so the failure is in what the calculation encodes rather than in whether it can be explained.
- **B**: Fairness requires that a system treat similarly situated people equitably. A score derived from historically skewed scheduling reproduces that skew and produces differential outcomes for employees with comparable performance, which is the defining fairness failure.
- **C**: Reliability and safety concerns whether a system performs consistently and as designed. This function runs exactly as written and returns a stable result, so the defect is not one of reliability.
- **D**: Inclusiveness concerns whether people of all abilities and backgrounds can use and benefit from a system. That principle is close, but it addresses access and participation, whereas this item is about unequal treatment of comparable employees.

**Sources:** [Six principles of responsible AI](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai) · [Mitigate AI risks](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/2-manage-ai-risks)

</details>

---

## Q2. Who owns the defect after it ships

**Objective:** Identify how to operate GitHub Copilot responsibly · **Bloom:** Understand · **Difficulty:** easy

A Proseware developer accepts a Copilot suggestion, opens a pull request, and the change is merged and released. A defect in the generated logic later produces incorrect customer invoices. During the incident review, the developer notes that the code originated from Copilot. Which responsible AI principle determines where responsibility for the released defect sits?

- **A**: Transparency
- **B**: Privacy and security
- **C**: Reliability and safety
- **D**: Accountability

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: Transparency would govern whether Proseware disclosed that AI assistance was used and what its limits are. Disclosure does not move responsibility for the released code away from the team.
- **B**: Privacy and security would apply if the defect exposed customer data or credentials. The described failure is an arithmetic error in invoicing rather than a data protection problem.
- **C**: Reliability and safety describes the property the released code failed to deliver. It names the symptom, but the question asks who is answerable for the outcome, which is a different principle.
- **D**: Accountability states that people remain responsible for AI-assisted systems. The developer who accepted the suggestion and the team that approved the pull request own the released defect, and the origin of the code does not transfer that responsibility.

**Sources:** [Six principles of responsible AI](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai) · [Responsible use of GitHub Copilot](https://docs.github.com/en/copilot/responsible-use)

</details>

---

## Q3. A live credential in a chat prompt

**Objective:** Describe ethical and responsible AI usage · **Bloom:** Apply · **Difficulty:** easy

A Coho Winery developer is troubleshooting a failing distribution report. To ask why the query fails, the developer pastes the full connection string, including the live database password, into Copilot Chat. Which responsible AI principle does this action most directly compromise?

- **A**: Inclusiveness
- **B**: Accountability
- **C**: Privacy and security
- **D**: Fairness

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: Inclusiveness addresses whether a system serves people of all abilities and backgrounds. Nothing about pasting a credential changes who can use the reporting application.
- **B**: Accountability addresses who answers for an AI-assisted outcome. It remains relevant in the background, but the immediate failure is the handling of a secret rather than a question of ownership.
- **C**: Privacy and security requires protecting data and collecting only what a task needs. A live password is not required to explain why a query fails, and placing it in a prompt exposes it beyond the systems approved to hold it.
- **D**: Fairness addresses equitable treatment of similarly situated people. No group is treated differently by this action, so fairness is not the principle at stake.

**Sources:** [Six principles of responsible AI](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai) · [GitHub Trust Center](https://github.com/trust-center)

</details>

---

## Q4. Passing tests, unexpected input

**Objective:** Describe risks and limitations of generative AI tools · **Bloom:** Analyze · **Difficulty:** medium

Blue Yonder Airlines asks Copilot to generate a fare recalculation routine. The routine passes every existing unit test. During a staging rehearsal, a delayed-flight scenario that no existing test covered causes the routine to return a negative fare. Which responsible AI principle does this outcome most directly illustrate?

- **A**: Reliability and safety
- **B**: Privacy and security
- **C**: Fairness
- **D**: Transparency

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: Reliability and safety requires that a system behave predictably and respond safely to unexpected conditions. A routine that produces a negative fare on an uncovered but realistic input has failed exactly that requirement, and the passing tests only prove the cases they exercise.
- **B**: Privacy and security concerns protecting data and respecting data handling boundaries. No customer or credential data is exposed by an incorrect fare calculation.
- **C**: Fairness concerns equitable outcomes for similarly situated people. The routine misbehaves on a scenario rather than on a group of passengers, so the failure is not differential treatment.
- **D**: Transparency concerns whether capabilities and limits are understandable. The team can read the routine, so the gap is in its behavior rather than in its explainability.

**Sources:** [Six principles of responsible AI](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai) · [Application card: inline suggestions](https://docs.github.com/en/copilot/responsible-use/inline-suggestions)

</details>

---

## Q5. Announcing the adoption honestly

**Objective:** Describe ethical and responsible AI usage · **Bloom:** Understand · **Difficulty:** easy

Wide World Importers is preparing an internal announcement about adopting Copilot on its purchasing team. The engineering manager insists that the announcement state plainly what Copilot does well, where its suggestions can be wrong, and that a person reviews every change before it merges. Which responsible AI principle does this communication uphold?

- **A**: Accountability
- **B**: Transparency
- **C**: Inclusiveness
- **D**: Fairness

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: Accountability is reinforced by the review commitment in the announcement, but accountability is about who answers for outcomes rather than about making capabilities understandable.
- **B**: Transparency requires being honest about what an AI system can and cannot do so that the people relying on it can calibrate their trust. Stating the strengths, the failure modes, and the review step is that principle applied directly.
- **C**: Inclusiveness concerns whether a system empowers people of all abilities and backgrounds. An internal announcement about capabilities does not change who can use the tooling.
- **D**: Fairness concerns equitable treatment across comparable groups. Nothing in the announcement allocates a benefit or a burden differently between teams.

**Sources:** [Six principles of responsible AI](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai) · [Responsible AI with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/)

</details>

---

## Q6. Generated markup that signals with color alone

**Objective:** Identify potential harms and mitigation strategies of AI usage · **Bloom:** Apply · **Difficulty:** medium

Alpine Ski House uses Copilot to generate a seasonal booking form. The generated markup indicates a validation failure only by changing a field border to red, with no accompanying text and no programmatic association between the message and the input. Which responsible AI principle does the generated markup fail to uphold?

- **A**: Reliability and safety
- **B**: Privacy and security
- **C**: Inclusiveness
- **D**: Accountability

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: Reliability and safety would be at issue if the validation logic itself were wrong or unstable. The validation works; the problem is how its result is communicated.
- **B**: Privacy and security would apply if the form leaked booking data or mishandled input. Color-only error signaling does not expose data.
- **C**: Inclusiveness requires that a system work for people of all abilities, including those using assistive technology and those who cannot distinguish the color used. An error conveyed only by a red border reaches neither group, which makes this an accessibility failure in the generated output that the developer is responsible for correcting.
- **D**: Accountability describes who answers for the outcome, and the developer does. The question asks which principle the markup fails to uphold, and the failure is one of access rather than ownership.

**Sources:** [Six principles of responsible AI](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai) · [Review AI-generated code](https://docs.github.com/en/copilot/tutorials/review-ai-generated-code)

</details>

---

## Q7. An unfamiliar dependency appears in a suggestion

**Objective:** Explain the need to validate AI output · **Bloom:** Apply · **Difficulty:** medium

A Northwind Traders developer accepts a Copilot suggestion that imports a package the developer does not recognize. The project compiles and the order export runs locally. What is the most responsible next step before the change enters a pull request?

- **A**: Raise the test coverage percentage for the changed file, then open the pull request
- **B**: Ask Chat for a longer explanation and attach that explanation to the pull request
- **C**: Run the same prompt again in a fresh session to see whether the suggestion repeats
- **D**: Confirm that the package exists, is the intended one, and is genuinely required here

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: Coverage measures which lines a test suite executes, not whether a dependency is legitimate. A well-covered file can still import a package that should never have been added.
- **B**: A longer explanation can restate the same incorrect assumption in more words. An explanation produced by the same system is not independent evidence about a third-party package.
- **C**: Repeating a prompt can reproduce the same error, because a consistent output is a property of the model rather than proof of correctness. Agreement between two unverified responses establishes nothing.
- **D**: A suggested dependency can be misremembered, abandoned, or a name close to a legitimate package, which is a known supply-chain risk in AI-assisted code. Confirming that the package exists, that it is the intended one, and that the project actually needs it is the check that catches all three cases.

**Sources:** [Review AI-generated code](https://docs.github.com/en/copilot/tutorials/review-ai-generated-code) · [Best practices for using GitHub Copilot](https://docs.github.com/en/copilot/get-started/best-practices)

</details>

---

## Q8. Writing the mitigation into policy

**Objective:** Identify potential harms and mitigation strategies of AI usage · **Bloom:** Understand · **Difficulty:** medium

Contoso is drafting an internal policy for AI-assisted development. Leadership is specifically concerned that AI-assisted decisions could become difficult to explain or attribute after the fact. According to Microsoft guidance on mitigating AI risks, which combination of measures addresses that concern?

- **A**: Robust governance frameworks, transparency in AI processes, and human oversight
- **B**: Longer prompts, a larger set of attached context files, and a more capable model
- **C**: Automatic approval of any suggestion that passes the linter, plus a quarterly audit
- **D**: Disabling agent mode and restricting developers to inline suggestions in the editor

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: Microsoft guidance on mitigating AI risks names exactly these three levers: implement robust governance frameworks, ensure transparency in AI processes, and incorporate human oversight. Together they address decisions that are hard to interpret or attribute.
- **B**: Better prompting and a stronger model can improve output quality, but neither creates a record of how a decision was made or who approved it. Quality and accountability are separate problems.
- **C**: Automatic approval removes the human oversight that the guidance requires, and a linter checks style and common defects rather than the soundness of a decision. A later audit cannot restore a judgment that nobody made.
- **D**: Restricting the surface reduces exposure but does not make the remaining decisions explainable or attributable. Inline suggestions still produce code that someone must own.

**Sources:** [Mitigate AI risks](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/2-manage-ai-risks) · [Responsible AI with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/)

</details>

---

## Q9. Asking for a guarantee

**Objective:** Identify how to operate GitHub Copilot responsibly · **Bloom:** Understand · **Difficulty:** hard

An Adventure Works architect asks how the team can guarantee that no GitHub Copilot suggestion ever introduces a security vulnerability into the service catalogue. Which statement accurately describes what is available?

- **A**: Azure AI Content Safety can be configured to block insecure GitHub Copilot suggestions
- **B**: Copilot applies filtering, and human review plus security testing remain necessary
- **C**: The Copilot Studio responsible AI dashboard reports vulnerabilities for each repository
- **D**: Turning on agent mode routes every suggestion through an added vulnerability scanner

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: Azure AI Content Safety is a real Microsoft service, but it governs content in Azure AI applications and is not a control that screens GitHub Copilot code suggestions. Attributing another product's capability to Copilot is a common trap.
- **B**: Copilot applies filtering to prompts and responses, and GitHub documentation is explicit that this does not remove the need for review, testing, and security tooling. No configuration produces a guarantee, which is what makes this the accurate statement.
- **C**: Copilot Studio is a separate product for building conversational agents, and its responsible AI tooling does not analyze repositories for vulnerabilities. The name is close enough to be plausible and wrong.
- **D**: Agent mode changes how work is planned and applied across files. It adds tool use and approvals rather than an additional security scanner over every suggestion.

**Sources:** [Application card: inline suggestions](https://docs.github.com/en/copilot/responsible-use/inline-suggestions) · [Best practices for using GitHub Copilot](https://docs.github.com/en/copilot/get-started/best-practices)

</details>

---

## Q10. Confident guidance about a changed API

**Objective:** Describe risks and limitations of generative AI tools · **Bloom:** Understand · **Difficulty:** medium

A Fabrikam developer asks Copilot Chat how to call a library method whose behavior changed in a release published last month. Copilot returns confident, well-formatted guidance that matches the previous behavior. Which limitation of generative AI tools does this outcome illustrate?

- **A**: Chat responses are capped at a fixed character count for every answer returned
- **B**: Chat cannot discuss third-party libraries unless an MCP server supplies them
- **C**: Responses reflect training data and available context, which may lag a release
- **D**: Chat declines to answer whenever it detects a recently changed API surface

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: Response length limits exist, but a truncated answer looks incomplete rather than confidently outdated. Length does not explain guidance that is fluent and wrong.
- **B**: Copilot discusses third-party libraries routinely. An MCP server can supply current documentation as additional context, which is a mitigation for this problem rather than a precondition for answering.
- **C**: A model responds from patterns learned during training plus whatever context is supplied at request time. When neither includes a change published after that point, the answer can be fluent, confident, and describe superseded behavior, which is why the developer must check the current release notes.
- **D**: Copilot has no reliable way to know that an API changed unless that information reaches it as context. It does not detect staleness and withhold an answer.

**Sources:** [Application card: Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat) · [Understand limitations and measure impact](https://learn.microsoft.com/en-us/training/modules/developer-use-cases-for-ai-with-github-copilot/5-understand-limitations-measure-impact)

</details>
