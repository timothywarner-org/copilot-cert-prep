# GH-300 practice quiz: Responsible AI with GitHub Copilot

**10 original practice questions | Exam domain: Use GitHub Copilot responsibly (15–20%)**

> **Exam:** GH-300 — GitHub Copilot
> **Blueprint version:** January 2026
> **Domain weight:** 15–20% of scored questions
> **Difficulty mix:** 2 easy · 5 medium · 3 hard

This quiz covers the **Use GitHub Copilot responsibly** domain. Questions address the six Microsoft responsible AI principles as applied to GitHub Copilot, risks and limitations of generative AI tools, mitigation strategies for AI harms, and the responsible operation of AI-assisted development workflows. Attempt all 10 questions before consulting the answer key.

---

## Questions

---

### Question 1

**Skill area:** Use GitHub Copilot responsibly — understand responsible AI principles
**Objective:** Describe ethical and responsible AI usage
**Bloom level:** Analyze | **Difficulty:** Medium

A development team at Fabrikam, Inc. uses GitHub Copilot to generate code for a loan-application processing service. During a code review, a senior engineer notices that the AI-generated scoring algorithm consistently produces lower scores for applicants from specific geographic regions. The team lead asks which responsible AI principle is most directly violated by this behavior.

Which principle applies?

- **A.** Transparency, because GitHub Copilot did not disclose that geographic data was used as a scoring factor in the suggestion.
- **B.** Fairness, because GitHub Copilot produced suggestions that treat applicants from certain regions inequitably.
- **C.** Accountability, because the development team failed to assign a designated human reviewer before deploying the scoring logic.
- **D.** Reliability and safety, because the scoring algorithm may produce inconsistent results across different runtime environments.

---

### Question 2

**Skill area:** Use GitHub Copilot responsibly — validate and operate AI tools
**Objective:** Identify how to operate GitHub Copilot responsibly
**Bloom level:** Apply | **Difficulty:** Medium

A junior developer at Tailwind Traders copies a GitHub Copilot–generated authentication module directly into a production deployment pipeline without review, reasoning that Copilot is "accurate enough." A security incident occurs when the module contains a hard-coded credential. Which statement best explains the responsible AI principle that was violated?

Which statement is correct?

- **A.** Transparency, because GitHub Copilot should have displayed a warning that credentials were present in the suggestion.
- **B.** Reliability and safety, because the authentication module failed to perform consistently across runtime environments.
- **C.** Privacy and security, because the module exposed credentials to external parties through the pipeline logs.
- **D.** Accountability, because the developer is responsible for reviewing and validating AI-generated code before deploying it to production.

---

### Question 3

**Skill area:** Use GitHub Copilot responsibly — validate and operate AI tools
**Objective:** Explain the need to validate AI output
**Bloom level:** Understand | **Difficulty:** Easy

A team at Northwind Traders is evaluating the risks of using GitHub Copilot to write unit tests for a critical inventory management system. A project manager asks a developer why AI-generated tests must always be reviewed before being merged to the main branch.

Which explanation most accurately describes the core reason?

- **A.** GitHub Copilot can produce plausible-looking but incorrect output, so human validation is required to ensure reliability and safety before tests enter the codebase.
- **B.** GitHub Copilot automatically disables test coverage reports, so a human must re-enable them after each code generation session.
- **C.** Running the Azure AI Content Safety service on test files will catch any logical errors that Copilot introduces during generation.
- **D.** GitHub Copilot test output is governed by the inclusiveness principle, which requires review by a diverse cross-functional team before merging.

---

### Question 4

**Skill area:** Use GitHub Copilot responsibly — understand responsible AI principles
**Objective:** Describe ethical and responsible AI usage; privacy and security
**Bloom level:** Apply | **Difficulty:** Hard

An engineer at Litware, Inc. is configuring GitHub Copilot for an enterprise repository that stores proprietary customer personally identifiable information (PII). The security team requires that file contents in the `/customer-data` folder are never sent as context when Copilot builds suggestions. Which configuration action should the engineer take?

Which action is correct?

- **A.** Enable the **Restrict AI models** toggle in the organization Copilot policy settings to block all large language model access to the repository.
- **B.** Apply an Azure AI Content Safety policy to the repository to filter outbound prompt data before it reaches the Copilot service.
- **C.** Add a content exclusion rule that specifies the `/customer-data` path in the Copilot settings at the repository or organization level.
- **D.** Set the Copilot suggestion mode to `secure` in the `.github/copilot-config.json` file at the root of the repository.

---

### Question 5

**Skill area:** Use GitHub Copilot responsibly — understand responsible AI principles
**Objective:** Describe risks and limitations of generative AI tools
**Bloom level:** Understand | **Difficulty:** Medium

A solutions architect at Blue Yonder Airlines is briefing non-technical stakeholders on GitHub Copilot. When asked why developers cannot simply trust all Copilot suggestions without review, she explains one key limitation of large language models.

Which limitation should she describe?

- **A.** GitHub Copilot requires a persistent internet connection and silently produces empty suggestions whenever the developer works offline.
- **B.** GitHub Copilot can generate confident-sounding code that contains factual errors, references to outdated APIs, or subtle logic flaws — a behavior known as *hallucination*.
- **C.** GitHub Copilot supports only Python and JavaScript, which limits its reliability for teams working in polyglot codebases.
- **D.** GitHub Copilot produces suggestions based only on the single file open in the active editor tab, making cross-file context impossible.

---

### Question 6

**Skill area:** Use GitHub Copilot responsibly — understand responsible AI principles
**Objective:** Describe ethical and responsible AI usage; inclusiveness
**Bloom level:** Analyze | **Difficulty:** Hard

The accessibility team at Fourth Coffee is reviewing GitHub Copilot–generated front-end components. The team finds that every AI suggestion omits ARIA attributes and keyboard navigation support. A developer proposes accepting the suggestions as-is and adding accessibility in a separate, later sprint. Which responsible AI principle does this proposal most risk undermining?

Which principle applies?

- **A.** Transparency, because accessibility omissions should be disclosed to end users in the product release notes and documentation.
- **B.** Reliability and safety, because components that lack ARIA attributes are likely to crash in certain browser or assistive-technology environments.
- **C.** Fairness, because incomplete accessible components create an unequal experience only for users in specific geographic regions.
- **D.** Inclusiveness, because AI-assisted development should produce features that work for people of all abilities, not defer accessibility as an optional enhancement.

---

### Question 7

**Skill area:** Use GitHub Copilot responsibly — validate and operate AI tools
**Objective:** Identify potential harms and mitigation strategies of AI usage
**Bloom level:** Apply | **Difficulty:** Medium

A DevOps engineer at Woodgrove Bank asks GitHub Copilot Chat to explain a complex database migration script. Copilot provides a detailed explanation, but the engineer later discovers that several described behaviors do not match the actual script logic. Which mitigation strategy most directly addresses this type of harm?

Which strategy is correct?

- **A.** Cross-reference Copilot's explanations against the actual codebase and authoritative technical documentation before acting on them.
- **B.** Enable the Azure AI RAI dashboard in the Azure portal to monitor Copilot Chat explanation accuracy in real time across developer sessions.
- **C.** Select the thumbs-down button in Copilot Chat to immediately retrain the model on the corrected explanation for the current session.
- **D.** Switch from Copilot Chat to GitHub Copilot CLI, which generates more accurate explanations for database migration scripts than the chat interface.

---

### Question 8

**Skill area:** Use GitHub Copilot responsibly — validate and operate AI tools
**Objective:** Explain the need to validate AI output
**Bloom level:** Apply | **Difficulty:** Medium

A QA engineer at Humongous Insurance accepts a GitHub Copilot suggestion for a premium calculation function and merges it to the main branch without running the existing test suite. The function later produces incorrect premium values for edge-case inputs. Which statement best describes the responsible AI practice that was neglected?

Which statement is correct?

- **A.** The engineer should have enabled the Copilot duplication detection feature to prevent the incorrect function from being committed.
- **B.** The engineer should have applied the Azure AI Content Safety filter to the suggestion before accepting it into the codebase.
- **C.** The engineer should have validated the AI-generated output by running the test suite and reviewing edge cases before merging the suggestion.
- **D.** The engineer should have used **Ask** mode instead of **Edit** mode in Copilot Chat to generate more reliable premium calculation logic.

---

### Question 9

**Skill area:** Use GitHub Copilot responsibly — validate and operate AI tools
**Objective:** Identify how to operate GitHub Copilot responsibly
**Bloom level:** Remember | **Difficulty:** Easy

An organization administrator at Trey Research, Inc. is reviewing GitHub Copilot policy settings. A researcher asks which Copilot setting helps prevent the model from suggesting code that closely matches publicly available licensed code, thereby reducing intellectual property risk for the organization.

Which setting should the administrator enable?

- **A.** Content exclusions, configured at the organization level to prevent all public GitHub repositories from being indexed as Copilot context.
- **B.** Duplication detection — also called **suggestions matching public code** — which filters out suggestions that closely match known public code above a configurable similarity threshold.
- **C.** A Copilot usage policy requiring all developers to sign an individual contributor license agreement (CLA) before activating Copilot in the IDE.
- **D.** The **public code** audit log filter, which records every suggestion that contained a public code match for compliance review without blocking the suggestion.

---

### Question 10

**Skill area:** Use GitHub Copilot responsibly — understand responsible AI principles
**Objective:** Describe risks and limitations of generative AI tools
**Bloom level:** Analyze | **Difficulty:** Hard

A software engineering lead at AdventureWorks Cycles is mentoring a teammate on the responsible use of GitHub Copilot for security-sensitive code. The lead asks the teammate to identify the statement that most accurately represents a core risk.

Which statement is correct?

- **A.** GitHub Copilot cannot generate code in compiled languages such as C++ or Go, which limits its security risk to interpreted scripting contexts only.
- **B.** GitHub Copilot routes all suggestions through the Azure Defender for DevOps service before delivery, which eliminates most security vulnerabilities in generated code.
- **C.** GitHub Copilot suggestions are deterministic — given identical prompts, the model always produces the same output — so a single review per prompt is sufficient.
- **D.** GitHub Copilot may suggest code patterns that contain known vulnerabilities such as SQL injection or insecure deserialization, requiring developer review before any security-sensitive suggestion is used.

---

## Answer key

| Question | Correct answer | Skill objective |
|---|---|---|
| 1 | **B** | Fairness principle |
| 2 | **D** | Accountability principle |
| 3 | **A** | Need to validate AI output (reliability and safety) |
| 4 | **C** | Privacy and security — content exclusions |
| 5 | **B** | Risks and limitations — hallucination |
| 6 | **D** | Inclusiveness principle |
| 7 | **A** | Mitigation strategies — cross-reference |
| 8 | **C** | Need to validate AI output |
| 9 | **B** | Duplication detection |
| 10 | **D** | Risks — security vulnerabilities in suggestions |

---

### Question 1 rationale — Correct answer: B

**A — Incorrect.** Transparency concerns whether an AI system's capabilities and limitations are understandable to users and stakeholders; it is not about disclosing which data features a model used internally when generating a suggestion. In this scenario the issue is inequitable treatment of applicant groups based on geography, which is a fairness concern, not a disclosure concern.

**B — Correct.** Fairness requires that AI systems treat all individuals and groups equitably and do not produce outputs that disadvantage people based on sensitive characteristics such as geographic origin. A loan-scoring algorithm that systematically penalizes a region is a direct fairness failure, and developers using GitHub Copilot remain responsible for detecting and correcting bias in AI-generated logic before deployment.

**C — Incorrect.** Accountability holds that humans remain responsible for AI-assisted outcomes and is always relevant when AI generates consequential logic; however, the question asks which principle is *most directly* violated, and the primary issue here is the biased output itself rather than the absence of a review step. Fairness names the specific failure mode more precisely than accountability does in this scenario.

**D — Incorrect.** Reliability and safety addresses whether an AI system performs consistently and without causing harm under expected operating conditions, not whether its logic is discriminatory. An algorithm can produce perfectly consistent output while simultaneously violating fairness, so these two principles address distinct failure modes.

**References:**
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai>
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/>

---

### Question 2 rationale — Correct answer: D

**A — Incorrect.** Transparency requires that an AI system's capabilities and limitations be understandable to users; it does not mandate that the tool warn users about every potential security issue in its own output. While GitHub Copilot does surface some security-related warnings through secret scanning integrations, the root failure in this scenario is the developer's decision to skip validation, not a missing disclosure from the tool.

**B — Incorrect.** Reliability and safety addresses whether the AI system itself performs consistently and safely; the authentication module may have been generated consistently by Copilot across sessions. The failure was a process decision made by the developer, not an inconsistency in Copilot's generation behavior, so reliability and safety does not name the violated principle most accurately.

**C — Incorrect.** Privacy and security is a valid principle whenever credentials are exposed, and this scenario does involve a credential leak; however, the core violation is that the developer bypassed the human review step that responsible AI operation requires, not that Copilot exfiltrated data to an external party. The accountability principle more precisely describes the root cause.

**D — Correct.** Accountability holds that humans remain responsible for reviewing, validating, and approving AI-generated code before it enters production, regardless of the tool's perceived accuracy. Bypassing review because Copilot is "accurate enough" is the direct violation of accountability that caused the security incident.

**References:**
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai>
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/2-manage-ai-risks>

---

### Question 3 rationale — Correct answer: A

**A — Correct.** Large language models, including GitHub Copilot, can produce plausible-sounding but factually incorrect or logically flawed output — a well-documented behavior called hallucination. Human validation of AI-generated tests before merging is the prescribed mitigation for this risk and directly upholds the reliability and safety principle.

**B — Incorrect.** GitHub Copilot does not automatically disable test coverage reports; this describes a fabricated behavior that has no basis in Copilot's documented functionality. Selecting this option would lead stakeholders to misunderstand what the actual risk of using Copilot for testing is.

**C — Incorrect.** Azure AI Content Safety is an Azure AI Foundry service designed for content moderation of text and images in Azure-hosted applications; it is not a GitHub Copilot feature and cannot evaluate the logical correctness of AI-generated unit tests. Applying a different product's controls does not substitute for human code review in the GH-300 responsible AI framework.

**D — Incorrect.** The inclusiveness principle addresses whether AI tools produce outputs that work for people of all abilities and backgrounds; it does not govern code review requirements for AI-generated test files. Associating inclusiveness with the mandatory validation of test output conflates two unrelated responsible AI concepts.

**References:**
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/2-manage-ai-risks>
- <https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300>

---

### Question 4 rationale — Correct answer: C

**A — Incorrect.** The **Restrict AI models** toggle in Copilot policy settings controls which AI models are available for Copilot to use when generating suggestions; it does not exclude specific file paths or directory contents from being sent as prompt context. Restricting models is a model governance action, not a data-exclusion action, so it would not prevent `/customer-data` contents from leaving the environment.

**B — Incorrect.** Azure AI Content Safety is an Azure AI Foundry product that applies content moderation to prompts and completions in Azure-hosted AI applications; it is not a configuration layer within GitHub Copilot and cannot be applied directly to a GitHub repository to block specific folder paths from Copilot context. Selecting this option confuses two distinct Microsoft product ecosystems.

**C — Correct.** GitHub Copilot content exclusions allow organization administrators and repository owners to specify file paths and glob patterns that Copilot will not read or transmit as context when building suggestions. Adding the `/customer-data` path to a content exclusion rule directly upholds the privacy and security principle by preventing sensitive PII from entering the Copilot prompt pipeline.

**D — Incorrect.** There is no `copilot-config.json` file or `secure` suggestion mode documented in GitHub Copilot's official configuration schema as of the January 2026 blueprint. This choice is a plausible-sounding distractor that describes a feature that does not exist in the product.

**References:**
- <https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-github-copilot-features-in-your-organization/about-content-exclusions-for-github-copilot>
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai>

---

### Question 5 rationale — Correct answer: B

**A — Incorrect.** GitHub Copilot does degrade gracefully in low-connectivity conditions, but silently producing empty suggestions as a universal offline behavior is not a documented limitation of the product. This choice describes a network dependency, not the key LLM risk that explains why developers must review all suggestions.

**B — Correct.** Hallucination — the generation of confident-sounding output that contains factual errors, references to deprecated or nonexistent APIs, or subtle logic flaws — is a well-documented limitation of large language models including GitHub Copilot. This is the primary reason developers must review all Copilot suggestions rather than accepting them as authoritative, and it is a core concept tested in the GH-300 responsible AI domain.

**C — Incorrect.** GitHub Copilot supports a broad range of programming languages well beyond Python and JavaScript, including Go, Rust, C++, Java, TypeScript, and many others; this claim is factually inaccurate. Describing an incorrect language restriction would mislead stakeholders about both the capabilities and the actual risk profile of Copilot.

**D — Incorrect.** GitHub Copilot can draw context from multiple open files, neighboring tabs, referenced symbols, and additional context sources beyond the single active editor tab; the "neighboring tabs" feature is explicitly documented. Describing it as limited to one file misrepresents how the Copilot context window functions.

**References:**
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/2-manage-ai-risks>
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/>

---

### Question 6 rationale — Correct answer: D

**A — Incorrect.** Transparency relates to making the AI system's capabilities and limitations understandable to users, developers, and stakeholders — not to publishing release notes about what the tool omitted. Accessibility omissions in generated code are an output quality issue, not a failure of the tool to disclose its own behavior.

**B — Incorrect.** Reliability and safety concerns whether the AI system performs consistently and safely under expected operating conditions. While inaccessible components may create poor user experiences or assistive-technology failures, the responsible AI principle most at stake when a tool systematically excludes users with disabilities from functional output is inclusiveness, not reliability.

**C — Incorrect.** Fairness addresses equitable treatment across groups defined by characteristics such as race, gender, or geography; accessibility needs are a distinct dimension not framed as geographic differences in the Microsoft responsible AI model. Conflating fairness with inclusiveness is a common distractor because both involve equitable outcomes, but they apply to different types of disparity.

**D — Correct.** Inclusiveness requires that AI-assisted development produce outputs that work for people of all abilities and backgrounds, treating accessibility as a built-in requirement rather than an optional add-on. Accepting suggestions that omit ARIA attributes and keyboard navigation support, and deferring accessibility to a future sprint, directly undermines the inclusiveness principle as defined in GitHub's responsible AI framework.

**References:**
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai>
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/>

---

### Question 7 rationale — Correct answer: A

**A — Correct.** The documented mitigation for AI hallucination in explanations and code commentary is to cross-reference Copilot's output against the actual codebase, test results, and authoritative technical documentation before making decisions or taking action. This practice upholds the reliability and safety principle and is the responsible operation model described in the GH-300 blueprint.

**B — Incorrect.** The Azure AI Responsible AI (RAI) dashboard is an Azure Machine Learning feature used to evaluate and monitor trained ML models for fairness, interpretability, and error analysis; it is not a GitHub Copilot enterprise feature and cannot monitor Copilot Chat output accuracy in real time. Selecting this option confuses an Azure AI Foundry tooling feature with a GitHub Copilot control.

**C — Incorrect.** The thumbs-down feedback button in Copilot Chat sends a signal to the GitHub Copilot team to help improve future model behavior through aggregate feedback analysis; it does not retrain the model immediately, does not affect the current session, and is not a mitigation control that corrects an already-delivered inaccurate explanation.

**D — Incorrect.** GitHub Copilot CLI is designed for terminal command generation, shell scripting, and GitHub Actions workflows; it is not documented as producing more accurate code explanations for database migration scripts than Copilot Chat. Switching interaction surfaces does not address the underlying LLM risk that explanations can be inaccurate regardless of delivery channel.

**References:**
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/2-manage-ai-risks>
- <https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot>

---

### Question 8 rationale — Correct answer: C

**A — Incorrect.** Duplication detection — also called suggestions matching public code — filters Copilot suggestions that closely match publicly available licensed code; it is an intellectual property safeguard, not a logical correctness check. Enabling duplication detection would not have caught an edge-case calculation error in a premium formula.

**B — Incorrect.** Azure AI Content Safety is an Azure AI Foundry content moderation service; it is not part of the GitHub Copilot suggestion pipeline and cannot evaluate the mathematical or logical correctness of a generated business function. Applying it to Copilot suggestions is not a supported workflow in the GH-300 responsible AI framework.

**C — Correct.** The responsible AI practice for operating GitHub Copilot is to validate all AI-generated output — in this case by running the existing test suite and manually reviewing edge cases — before merging to the main branch. Skipping this step violates both the reliability and safety principle and the accountability principle, and is the direct cause of the premium calculation defect.

**D — Incorrect.** **Ask** mode and **Edit** mode in Copilot Chat are interaction styles that determine how Copilot structures its response; neither mode guarantees greater mathematical accuracy for domain-specific business logic. Choosing a different interaction mode is not a substitute for human validation of AI-generated calculations.

**References:**
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/2-manage-ai-risks>
- <https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300>

---

### Question 9 rationale — Correct answer: B

**A — Incorrect.** Content exclusions control which repository files and directory paths are used as context when Copilot builds a suggestion prompt; they do not index or block public GitHub repositories from appearing as suggestions. Content exclusions address data privacy by keeping files out of the prompt, not by filtering matched public code patterns from the model's output.

**B — Correct.** Duplication detection — documented in GitHub Copilot settings as **suggestions matching public code** — causes Copilot to block suggestions that match publicly available code above a configurable similarity threshold, reducing the risk that developers inadvertently introduce unlicensed code into proprietary projects. Enabling this setting is the documented, platform-native control for intellectual property risk management in GitHub Copilot.

**C — Incorrect.** Requiring developers to sign contributor license agreements (CLAs) is a legal and process control applied to open-source project contributions; it is not a GitHub Copilot platform setting and does not affect how the Copilot model filters or selects suggestions. CLAs govern what contributors donate to a project, not what Copilot produces.

**D — Incorrect.** Audit log filters in GitHub organizations can record Copilot-related events including public code matches, providing visibility for compliance audits; however, the audit log records events after they occur and does not block or filter suggestions in real time. Logging a match is a transparency control, not a mitigation control like duplication detection.

**References:**
- <https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-github-copilot-features-in-your-organization/about-content-exclusions-for-github-copilot>
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/3-six-principles-of-responsible-ai>

---

### Question 10 rationale — Correct answer: D

**A — Incorrect.** GitHub Copilot supports compiled languages including C++, Go, Rust, Java, and many others; restricting its language support to scripting contexts is factually inaccurate. Security risks from Copilot suggestions exist across all supported languages and are not bounded by whether a language is interpreted or compiled.

**B — Incorrect.** Azure Defender for DevOps is a Microsoft Defender for Cloud feature that scans repositories for infrastructure-as-code misconfigurations and exposed secrets; it is not integrated into the GitHub Copilot suggestion pipeline and does not pre-screen suggestions for application-layer security vulnerabilities before delivery. Describing it as a pre-delivery Copilot filter is a cross-product distractor.

**C — Incorrect.** GitHub Copilot suggestions are probabilistic, not deterministic; the same prompt can produce different suggestions across sessions because large language models use temperature-based sampling during inference. Assuming determinism creates a false sense of security and is not consistent with Copilot's documented behavior.

**D — Correct.** GitHub Copilot may generate code patterns that contain known security vulnerabilities — such as SQL injection, insecure deserialization, path traversal, or improper input validation — because the underlying model was trained on a broad corpus of code that includes insecure examples. Developers must review all security-sensitive AI-generated suggestions before use, which is a core tenet of the accountability and reliability and safety principles in the GH-300 responsible AI domain.

**References:**
- <https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/2-manage-ai-risks>
- <https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot>

---

## Score yourself

| Score | Interpretation |
|---|---|
| 9–10 correct | Strong grasp of the responsible AI domain. Review any missed items and proceed to the next domain. |
| 7–8 correct | Solid foundation. Revisit the six principles unit and the mitigation strategies unit on Microsoft Learn. |
| 5–6 correct | Moderate gaps. Work through the full **Responsible AI with GitHub Copilot** module before retesting. |
| 0–4 correct | Foundational review needed. Start with the Microsoft Learn module, then return to this quiz. |

---

## Next steps

1. **Review the source module.** Work through every unit in [Responsible AI with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/) on Microsoft Learn, paying particular attention to the six principles unit and the manage-AI-risks unit. Both units map directly to items that appear in this quiz.

2. **Study the full GH-300 blueprint.** The responsible AI domain carries 15–20% of the exam weight. Review the complete skills-measured list at <https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300> to confirm you have covered all sub-objectives.

3. **Practice cross-domain connections.** Responsible AI principles intersect with the data and architecture domain (prompt filtering, content exclusions) and the privacy and safeguards domain (duplication detection). Quiz yourself on questions that require applying a principle in the context of a specific Copilot configuration or feature.

4. **Move to the next domain.** When you score 9 or higher on this quiz, advance to **Use GitHub Copilot features (25–30%)**, the highest-weighted exam domain.

5. **Use the study planner.** If you are unsure which domain to focus on next, ask the gh300-cert-buddy-agent to generate a personalized study plan based on your confidence ratings across all six GH-300 skill areas.

---

*Quiz generated using the gh300-item-creator skill recipe and grounded in Microsoft Learn content as of June 2026. All scenarios use fictional Microsoft company names. No exam questions were reproduced or paraphrased.*
