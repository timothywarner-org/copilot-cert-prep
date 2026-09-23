# Six-question mini mock

**Original teaching questions, not real exam items.** Allow 10 minutes for decisions and 5 minutes for review. Each question has one best answer. Record your answer and reason before expanding the debrief.

## Q1. Responsible use

Tailwind Traders receives a Copilot-generated function that calls an unfamiliar library method. The function appears to meet the requirement, but no test has run. What should the developer do first?

A. Approve the change after comparing its naming with nearby code.  
B. Verify the method in documentation and test the expected behavior.  
C. Accept the change after generating a longer explanation in Chat.  
D. Approve the change after reproducing the prompt in a new session.

<details>
<summary>Answer and debrief</summary>

**B.** Verify the API and behavior before relying on the output.

- **A:** Naming consistency does not establish correctness. It remains a useful maintainability check after the behavior is verified.
- **B:** Documentation can expose a fabricated or misused API, and tests check the stated behavior. The developer remains responsible for accepting the change.
- **C:** A longer explanation can repeat the same incorrect assumption. Explanations help understanding but do not substitute for verification.
- **D:** Repeating a prompt can reproduce a hallucination. Independent evidence is more useful than agreement between unverified responses.

[Responsible AI with Copilot](https://learn.microsoft.com/en-us/training/modules/responsible-ai-with-github-copilot/)
</details>

## Q2. Features and workflow

WoodGrove Bank developers repeatedly request the same change-review checklist in VS Code. They want a reusable task prompt that developers intentionally invoke. Which repository artifact best fits?

A. A repository-wide instructions file that applies general project guidance.  
B. An MCP configuration file that connects an external documentation tool.  
C. A hook configuration file that runs a script at a tool-use event.  
D. A prompt file that contains the shared change-review procedure.

<details>
<summary>Answer and debrief</summary>

**D.** A prompt file packages a reusable task.

- **A:** Repository instructions supply persistent project guidance. They are appropriate for conventions rather than an intentionally invoked review task.
- **B:** MCP connects tools and data sources. It does not itself define the requested reusable review prompt.
- **C:** Hooks execute code at supported events. That is different from a developer choosing to run a review prompt.
- **D:** Prompt files capture reusable task instructions. Developers can invoke the same review procedure without rebuilding the request each time.

[Prompt files](https://code.visualstudio.com/docs/agent-customization/prompt-files)
</details>

## Q3. Data and architecture

Adventure Works asks Copilot to explain a function after attaching one source file. The answer confidently describes behavior implemented in another file that was not supplied or retrieved. Which response is most appropriate?

A. Inspect the missing implementation and verify the claim with that evidence.  
B. Treat the attached file as evidence that the entire repository was examined.  
C. Treat the confidence of the explanation as evidence of complete context.  
D. Repeat the explanation as documentation because the wording is consistent.

<details>
<summary>Answer and debrief</summary>

**A.** Establish what context was used and verify the missing behavior.

- **A:** The missing file may change the explanation. Inspecting it provides evidence rather than relying on an inference.
- **B:** Attaching one file does not demonstrate that all files were read. Available context depends on the request and retrieval.
- **C:** Confident language is not proof of context coverage. A model can produce a fluent but unsupported description.
- **D:** Consistent wording does not establish factual accuracy. Documentation should describe verified implementation behavior.

[Context in VS Code](https://code.visualstudio.com/docs/chat/copilot-chat-context)
</details>

## Q4. Prompt engineering

Fabrikam wants generated tests to follow its existing arrange-act-assert conventions. Which prompt change most directly supplies few-shot guidance?

A. Increase the requested response length and ask for more detailed wording.  
B. Provide two representative tests and identify the new behavior to cover.  
C. Start a fresh conversation and repeat the original request without examples.  
D. Request another model and leave the task description otherwise unchanged.

<details>
<summary>Answer and debrief</summary>

**B.** Representative examples demonstrate the pattern.

- **A:** Response length does not supply examples of the intended convention. It can produce more text without improving alignment.
- **B:** A small set of examples gives the model a pattern to follow. The requested behavior still needs clear assertions and review.
- **C:** A fresh session can reduce unrelated context. It does not create few-shot guidance without worked examples.
- **D:** A different model may change the result. Model selection is separate from supplying examples in the prompt.

[Prompt engineering](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)
</details>

## Q5. Productivity

Contoso sees increased completion acceptance after a Copilot rollout. Leadership wants to conclude that delivery time improved. What additional evidence best supports that conclusion?

A. A larger count of suggested lines during the same reporting period.  
B. A list of available models and their current context-window limits.  
C. Comparable delivery measures, with task mix and quality considered.  
D. A higher count of tool calls across all active agent sessions.

<details>
<summary>Answer and debrief</summary>

**C.** Measure the outcome being claimed.

- **A:** Suggested-line volume measures activity. It does not establish faster delivery or unchanged quality.
- **B:** Model capabilities describe available tools. They do not measure the team's actual delivery outcome.
- **C:** Comparable outcome measures address the claim directly. Task complexity and quality matter when interpreting any change.
- **D:** Tool-call volume can increase for many reasons, including retries. It is not a direct measure of value delivered.

[Interpreting usage metrics](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics)
</details>

## Q6. Privacy and safeguards

Northwind configures content exclusions and plans to use IDE Agent mode on sensitive files. What must the administrator verify before relying on those exclusions?

A. Whether the exact Copilot surface and mode support the exclusion policy.  
B. Whether the repository has instructions that repeat the desired policy.  
C. Whether developers have selected the same available language model.  
D. Whether the workspace has a file named .copilotignore at its root.

<details>
<summary>Answer and debrief</summary>

**A.** Policy support depends on the surface.

- **A:** Current documentation says IDE Edit and Agent modes do not support content exclusions. The administrator must choose a workflow and controls that meet the actual requirement.
- **B:** Instructions can communicate expectations. They do not make an unsupported exclusion policy enforceable.
- **C:** Selecting a common model does not establish policy coverage. The relevant distinction is the product surface and supported controls.
- **D:** That filename is not a documented replacement for configured content exclusions. A local placeholder cannot establish the required protection.

[Content exclusion](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion)
</details>

## Review your evidence

Map each missed decision to the matching numbered domain in the [study guide](GH-300-STUDY-GUIDE.md). Explain why the distractors fail, then do one activity in your weakest area. Six questions cannot predict your exam result.
