# Domain 6 practice: Configure privacy, content exclusions, and safeguards

**Weight on the exam: 10-15%.** Nine original items. These are teaching questions, not real exam content.

Every item here turns on a distinction. **Content exclusion**, the **suggestions matching public code** setting, **editor settings**, **organization policy**, and the **legal position on ownership** are five separate controls, and the most common way to lose marks in this domain is to let one of them stand in for another.

---

## Q1. Making the indemnity apply

**Objective:** Describe ownership and limitations of outputs · **Bloom:** Apply · **Difficulty:** hard

Fabrikam subscribes to Copilot Business and wants the intellectual property indemnity commitment to apply to its developers' use of Copilot. According to Microsoft Learn, which configuration is required?

- **A**: The Suggestions matching public code setting has to be set to Block
- **B**: Content exclusion has to be configured for every repository in the org
- **C**: Each developer has to accept the terms in personal account settings
- **D**: The organization has to enable Copilot code review on release branches

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: Microsoft Learn states that Copilot Business and Enterprise include IP indemnity, and that for GitHub to assume legal responsibility the Matching public code setting must be blocked. This is the single highest-value connection in the domain, because it links a technical setting directly to a legal position.
- **B**: Content exclusion keeps specified content out of context on supported surfaces. It protects the organization's own material and is unrelated to indemnity for suggestions.
- **C**: Indemnity is a commitment in the commercial agreement at the plan level. Individual acceptance in personal settings is not the mechanism.
- **D**: Copilot code review improves review coverage. It carries no contractual consequence.

**Sources:** [Contractual protections and matching public code](https://learn.microsoft.com/en-us/training/modules/github-copilot-management-and-customizations/3-github-copilot-contractual-protections-disabling-matching-public-code) · [Customer Copyright Commitment required mitigations](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/customer-copyright-commitment)

</details>

---

## Q2. Who owns the output

**Objective:** Describe ownership and limitations of outputs · **Bloom:** Understand · **Difficulty:** medium

An Adventure Works legal reviewer asks who owns the code that Copilot produces and who carries responsibility for using it. Which statement reflects GitHub's current terms?

- **A**: GitHub owns the output and grants the customer a perpetual license to use it
- **B**: Ownership transfers to the customer once a human has edited the suggestion
- **C**: GitHub does not own inputs or outputs, and responsibility for use stays with you
- **D**: Ownership depends on which underlying model generated the suggestion returned

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: GitHub's terms state the opposite. Framing GitHub as the owner granting a license back is a plausible-sounding inversion of the actual position.
- **B**: No editing threshold appears in the terms. Whether a given suggestion attracts protection at all depends on law, length, and how functional rather than expressive it is, not on whether someone changed a line.
- **C**: The current Generative AI Services Terms state that GitHub does not own inputs or outputs and that you retain any ownership you already have in your inputs, while responsibility for reviewing, testing, and using the output remains with you.
- **D**: Model selection affects cost and quality. It has no bearing on the ownership position.

**Sources:** [GitHub Generative AI Services Terms](https://github.com/customer-terms/github-generative-ai-services-terms) · [GitHub Trust Center](https://github.com/trust-center)

</details>

---

## Q3. A notice about similar code

**Objective:** Enable suggestions matching public code filtering · **Bloom:** Understand · **Difficulty:** medium

Wide World Importers sets Suggestions matching public code to Allow. A developer receives a suggestion accompanied by a notice that similar code was found. What does that notice indicate?

- **A**: The suggestion was blocked, and a different suggestion was substituted instead
- **B**: The suggestion matched public code, and a reference to the match is available
- **C**: The suggestion conflicts with the organization's content exclusion configuration
- **D**: The suggestion was generated from the organization's own private repositories

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: Blocking is what the other setting value does. Under Allow the suggestion is shown rather than withheld, which is the whole point of the distinction.
- **B**: When matching is allowed, Copilot surfaces the match and can provide references to the matching public files and the license information it could determine. That gives the developer the evidence needed to make a decision, and a license reported as unknown is exactly the case requiring human judgment.
- **C**: Content exclusion governs what may be used as context from the organization's own repositories. It produces no public-code notice.
- **D**: Suggestions are not generated by copying an organization's private repositories, and the notice specifically concerns publicly available code.

**Sources:** [GitHub Copilot code referencing](https://docs.github.com/en/copilot/concepts/completions/code-referencing) · [Managing Copilot policies for your account](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies)

</details>

---

## Q4. An excluded file still seems to be in play

**Objective:** Resolve issues with suggestions and content exclusions · **Bloom:** Analyze · **Difficulty:** hard

Alpine Ski House configures content exclusion for a sensitive directory. A developer reports that the excluded content still appears to inform responses in one particular interaction mode, although inline suggestions behave as expected. What should the administrator check first?

- **A**: Whether the developer's account currently has an active Copilot seat
- **B**: Whether the repository default branch holds the exclusion configuration
- **C**: Whether the developer has restarted the workstation since the change
- **D**: Whether that interaction mode is documented as supporting exclusions

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: A missing seat would remove Copilot functionality entirely rather than produce mode-specific behavior. The symptom does not fit.
- **B**: Placement matters for repository-scoped configuration, but the developer reports that exclusions work correctly in one mode, which proves the configuration is being read.
- **C**: A reload can help with propagation delay, and delay affects all modes at once. It does not explain a difference between two modes.
- **D**: Content exclusion support is documented per surface and per interaction mode, and GitHub states that some modes do not honor it. A difference between two modes on the same machine points directly at the support matrix.

**Sources:** [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/content-exclusion) · [Troubleshooting common issues](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues)

</details>

---

## Q5. Suggestions missing from the wrong file

**Objective:** Resolve issues with suggestions and content exclusions · **Bloom:** Apply · **Difficulty:** medium

A Northwind Traders developer gets no suggestions at all in a file that nobody intended to exclude, and the Copilot status indicator reports that the file is affected by content exclusion. What is the most direct next step?

- **A**: Review the exclusion patterns at repository and organization scope for a match
- **B**: Reinstall the Copilot extension and clear the editor's local language caches
- **C**: Ask an administrator to assign the developer a different type of Copilot seat
- **D**: Move the file into a new directory so the existing pattern stops matching it

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: The status indicator has already identified the cause, so the question is which rule matched. Exclusion patterns are written at repository, organization, and enterprise scope, and a pattern broader than intended is the usual explanation.
- **B**: Reinstalling addresses client faults. The client is reporting the policy correctly, so there is nothing malfunctioning to repair.
- **C**: Seat type governs plan features. It does not determine which paths an exclusion pattern matches.
- **D**: Moving the file works around a misconfigured rule and leaves that rule in place to catch the next file. It treats the symptom.

**Sources:** [Troubleshooting common issues](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues) · [Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot)

</details>

---

## Q6. Turning suggestions off for one language

**Objective:** Configure content exclusions and editor settings · **Bloom:** Apply · **Difficulty:** medium

A Contoso developer wants inline suggestions to stop appearing while writing Markdown, but wants them to continue working normally in source files. Which mechanism fits this requirement?

- **A**: An organization policy that disables Copilot across documentation repositories
- **B**: A content exclusion rule that removes Markdown files in every repository
- **C**: An editor setting that disables inline suggestions for the Markdown language
- **D**: A prompt file instructing Copilot to ignore Markdown files for the session

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: An organization policy is the wrong scope for one developer's editing preference, and it would affect colleagues who want the behavior.
- **B**: Content exclusion is a privacy and governance control applied by administrators to protect content. Using it as a personal preference switch misapplies the control and affects everyone.
- **C**: Editor settings for Copilot include enabling or disabling inline suggestions per language, which is exactly a per-developer preference expressed at the right scope.
- **D**: Prompt files package reusable tasks. They do not govern whether inline completions render in a file type.

**Sources:** [Configuring Copilot in your environment](https://docs.github.com/en/copilot/how-tos/configure-personal-settings/configure-in-ide) · [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/content-exclusion)

</details>

---

## Q7. Does blocking clear the codebase

**Objective:** Enable suggestions matching public code filtering · **Bloom:** Analyze · **Difficulty:** medium

Blue Yonder Airlines blocks suggestions matching public code and asks whether the codebase can now be considered free of third-party licensing concerns. Which statement is accurate?

- **A**: The setting establishes that no third-party licensed code remains in the project
- **B**: The setting reduces one specific risk and does not clear the codebase overall
- **C**: The setting applies retroactively to any code accepted before it was enabled
- **D**: The setting removes the need for dependency and license scanning altogether

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: Third-party code enters a project through dependencies, vendored source, and copied snippets. A suggestion filter touches none of those paths.
- **B**: Blocking prevents Copilot from returning suggestions that match public code, which addresses one route by which such code could arrive. Everything already present, and everything arriving by another route, is untouched, so the filter is a risk reduction rather than a clearance.
- **C**: The setting governs suggestions at the moment they are generated. It has no effect on code already accepted and committed.
- **D**: Dependency and license scanning analyze what the project actually contains. They answer a different and broader question.

**Sources:** [GitHub Copilot code referencing](https://docs.github.com/en/copilot/concepts/completions/code-referencing) · [Managing policies for Copilot in your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies)

</details>

---

## Q8. A policy citing an archived page

**Objective:** Describe ownership and limitations of outputs · **Bloom:** Apply · **Difficulty:** hard

Fourth Coffee's internal AI policy cites the GitHub Copilot Product Specific Terms for its ownership language. A reviewer opens the link and finds the page marked as archived. What should the team do?

- **A**: Keep citing the archived page, because its ownership language is unchanged
- **B**: Remove the ownership language, because no current terms document exists
- **C**: Cite the product documentation instead, because terms are not authoritative
- **D**: Cite the current Generative AI Services Terms and update the wording used

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: An archived page is superseded by definition, and the wording did change. The current terms speak of inputs and outputs where the archived page spoke of suggestions and your code.
- **B**: A replacement document exists, so deleting the policy language creates a gap rather than resolving one.
- **C**: Documentation explains behavior; the terms govern the commercial and legal relationship. Substituting one for the other weakens the policy.
- **D**: The Generative AI Services Terms govern currently, and a policy that quotes superseded wording will not survive review. Updating both the citation and the terminology is the complete fix.

**Sources:** [GitHub Generative AI Services Terms](https://github.com/customer-terms/github-generative-ai-services-terms) · [Responsible use of GitHub Copilot](https://docs.github.com/en/copilot/responsible-use)

</details>

---

## Q9. A file that looks like a control

**Objective:** Configure content exclusions and editor settings · **Bloom:** Analyze · **Difficulty:** medium

A WoodGrove Bank developer adds a file named .copilotignore to a repository and tells the team that sensitive directories are now excluded from Copilot. What should a reviewer point out?

- **A**: That file is not a documented substitute for configured content exclusion
- **B**: That file takes effect only when placed on the repository default branch
- **C**: That file has to be committed by an organization owner to have effect
- **D**: That file governs inline suggestions but not any chat-based interaction

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: Content exclusion is configured through repository, organization, or enterprise settings, and GitHub documents no .copilotignore file as an equivalent. A file named after a familiar pattern looks like a control and enforces nothing, which makes the team believe it is protected when it is not.
- **B**: Branch placement matters for configuration that GitHub actually reads. Stating a placement rule for a file with no defined behavior implies the file works.
- **C**: Committer identity does not give an unrecognized file meaning. This answer concedes the false premise.
- **D**: Describing a scope for the file also concedes that it does something. The correct response rejects the premise rather than qualifying it.

**Sources:** [Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) · [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/content-exclusion)

</details>
