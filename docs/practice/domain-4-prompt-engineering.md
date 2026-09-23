# Domain 4 practice: Apply prompt engineering and context crafting

**Weight on the exam: 10-15%.** Eight original items. These are teaching questions, not real exam content.

One warning before you start. GitHub Docs describes this domain in plain language and says "give examples." Microsoft Learn supplies the vocabulary the exam uses, including **zero-shot** and **few-shot**. If you study only GitHub Docs you will know the technique and not recognize its name, so two items below test the terms deliberately.

---

## Q1. Adding three examples to a request

**Objective:** Use zero-shot and few-shot prompting · **Bloom:** Understand · **Difficulty:** easy

A Coho Winery developer asks Copilot to generate distribution report titles and receives inconsistent formatting. The developer revises the request to include three correctly formatted titles as examples of what is wanted. What has the request become?

- **A**: A zero-shot request, because no system-level instruction was supplied with it
- **B**: A chain-of-thought request, because intermediate reasoning steps are now shown
- **C**: A few-shot request, because worked examples demonstrate the intended pattern
- **D**: A retrieval request, because reference material is now attached to the prompt

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: Zero-shot describes a request that supplies no worked example. Adding three examples is precisely what moves a request out of that category, and the presence or absence of a system instruction is a different axis.
- **B**: Chain-of-thought prompting asks a model to show its reasoning steps. Supplying examples of a finished output format is not the same technique.
- **C**: Few-shot prompting supplies a small number of worked examples so that the model can infer the pattern rather than guess at it. Three formatted titles is the textbook case, and it is the standard fix for inconsistent output shape.
- **D**: Retrieval brings in external documents or tool results as evidence. Examples authored inside the prompt are not retrieved material.

**Sources:** [Prompt engineering foundations and best practices](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/2-prompt-engineering-foundations-best-practices) · [Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)

</details>

---

## Q2. Rescuing a vague request

**Objective:** Describe prompt structure and context · **Bloom:** Apply · **Difficulty:** easy

A Fourth Coffee developer types "make the scheduling code better" and receives a sprawling rewrite that touches files nobody intended to change. Which revision best applies documented prompt structure?

- **A**: State the goal, name the relevant files, set a constraint, and define the check
- **B**: Repeat the same request three times so the model weights the intent more heavily
- **C**: Ask for the longest response available so that no requirement can be overlooked
- **D**: Switch to a larger model and submit exactly the same wording a second time

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: A well-formed request supplies a goal, the relevant context, a constraint that bounds the change, and an observable way to tell whether the result is acceptable. Each element removes one assumption the model would otherwise make for itself.
- **B**: Repetition adds tokens without adding information. It does not tell the model which files matter or what "better" means here.
- **C**: Length is not a proxy for correctness. A longer answer to an underspecified request is a longer guess.
- **D**: A more capable model given the same vague request still has to invent the missing requirements. Model choice does not substitute for specification.

**Sources:** [Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering) · [Best practices for using GitHub Copilot](https://docs.github.com/en/copilot/get-started/best-practices)

</details>

---

## Q3. Being sure a file was considered

**Objective:** Understand how context is determined · **Bloom:** Apply · **Difficulty:** medium

A Proseware developer needs confidence that Copilot actually considered a specific interface definition when answering a question about a contract change. What is the most reliable approach?

- **A**: Open the file in a background tab and rely on adjacent tabs always being read
- **B**: Name the file in prose and assume the name resolves to the file contents
- **C**: Rely on repository indexing, which guarantees every file is read per request
- **D**: Attach the file as explicit context, then inspect which references were used

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: Open tabs can contribute to context, but contribution is not a guarantee for any particular file. Relying on it is exactly the assumption that produces confidently wrong answers.
- **B**: Mentioning a name puts a string in the prompt. It does not attach the contents of the file behind that name.
- **C**: Indexing supports retrieval of likely-relevant material. It does not load an entire repository into every request, and a context window would not accommodate that.
- **D**: Supplying the file explicitly is the one mechanism that puts its contents in the request deliberately, and checking the references reported with the answer is how the developer confirms what was actually used. Explicit context plus verification is the defensible practice.

**Sources:** [Concepts for providing context to Copilot](https://docs.github.com/en/copilot/concepts/context) · [Add context to chat](https://code.visualstudio.com/docs/chat/copilot-chat-context)

</details>

---

## Q4. Writing the internal guidance

**Objective:** Apply best practices for prompt crafting · **Bloom:** Understand · **Difficulty:** medium

Contoso is writing internal guidance on prompt crafting for Copilot Chat and wants it to match GitHub's published advice. Which sequence should the guidance recommend?

- **A**: Begin with edge cases, then broaden to the general goal at the very end
- **B**: Begin with the general goal, add specifics, and break complex tasks apart
- **C**: Begin with the output format and omit the goal so results stay unbiased
- **D**: Begin with the largest available context and narrow only after a failure

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: Leading with edge cases gives the model exceptions before it knows the rule. The general goal is what makes the exceptions interpretable.
- **B**: GitHub advises starting general and then getting specific, supplying examples, breaking a complex task into smaller ones, and iterating. That ordering gives the model the frame first and the detail second.
- **C**: Omitting the goal does not remove bias; it removes information. The model then infers a goal, which is a worse outcome than stating one.
- **D**: Loading maximum context first crowds the window with irrelevant material and makes the important parts harder to weigh. Relevance beats volume.

**Sources:** [Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering) · [Prompt engineering foundations and best practices](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/2-prompt-engineering-foundations-best-practices)

</details>

---

## Q5. Answers drifting toward an old topic

**Objective:** Describe prompt process flow and chat history usage · **Bloom:** Apply · **Difficulty:** medium

An Alpine Ski House developer notices that Chat answers about a booking defect keep drifting toward an unrelated payment refactor that was discussed earlier in the same long thread. Which action best addresses this?

- **A**: Start a new conversation so that unrelated history stops shaping responses
- **B**: Attach more files so the correct topic outweighs the earlier discussion
- **C**: Repeat the question without changes until the responses converge on it
- **D**: Change models, because history handling is a property of the model alone

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: Copilot Chat uses conversation history as context, which helps while a thread stays on one topic and hurts once unrelated material accumulates. Starting a fresh conversation for an unrelated task is the documented remedy, and compacting a thread serves the same purpose.
- **B**: Adding files enlarges the request without removing the misleading history. The competing topic is still present and still weighed.
- **C**: Repetition inside the same polluted thread reinforces the existing context rather than clearing it.
- **D**: History is supplied with the request by the client, so changing the model does not change what history is sent.

**Sources:** [Optimize Copilot Chat context](https://docs.github.com/en/copilot/tutorials/optimize-chat-usage) · [Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)

</details>

---

## Q6. Close, but missing a rule

**Objective:** Explain prompt engineering principles · **Bloom:** Apply · **Difficulty:** easy

A Wide World Importers developer receives a response that is nearly right but omits a required validation rule for purchase order totals. According to documented prompt engineering practice, what is the recommended next move?

- **A**: Accept the response now and add the validation rule in a separate later commit
- **B**: Discard the conversation and begin again with completely different wording
- **C**: Iterate on the request, naming the missing rule and the evidence required
- **D**: Escalate to agent mode so that the omission is corrected without more input

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: Deferring a known gap ships an incomplete change and relies on memory to close it. The gap is known right now, which is the cheapest moment to fix it.
- **B**: Starting over discards the parts that were already correct. Nothing about the situation suggests the whole framing was wrong.
- **C**: Prompting is documented as an iterative activity: review what came back, state precisely what is missing, and say how success will be checked. That is the smallest correction that uses the work already done.
- **D**: Agent mode changes how work is carried out, not whether the requirement was stated. An unstated rule stays unstated on any surface.

**Sources:** [Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering) · [GitHub Copilot Cookbook](https://docs.github.com/en/copilot/tutorials/copilot-cookbook)

</details>

---

## Q7. What informs an answer

**Objective:** Understand how context is determined · **Bloom:** Understand · **Difficulty:** medium

An Adventure Works developer asks how Copilot decides which code informs a Chat answer about a service module. Which description is accurate?

- **A**: Only files the developer edited during the current session are considered
- **B**: Implicit context and explicitly supplied references both inform a request
- **C**: Only the file containing the cursor is considered, and others are ignored
- **D**: Every file in the repository is loaded for every request, without selection

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: Edit history within a session is not the selection rule, and a file the developer has never touched can still be highly relevant.
- **B**: Context arrives two ways: implicitly, from the active editor, open tabs, workspace information, and retrieval, and explicitly, when the developer attaches a file, folder, selection, or tool result. Both paths contribute, which is why explicit attachment is the reliable one.
- **C**: Restricting context to the current file would make cross-file explanation impossible, and Copilot routinely answers across files.
- **D**: Loading an entire repository per request is neither possible within a context window nor how retrieval works.

**Sources:** [Add context to chat](https://code.visualstudio.com/docs/chat/copilot-chat-context) · [Concepts for providing context to Copilot](https://docs.github.com/en/copilot/concepts/context)

</details>

---

## Q8. Naming the technique

**Objective:** Use zero-shot and few-shot prompting · **Bloom:** Remember · **Difficulty:** easy

A Fabrikam developer asks Copilot to write a currency conversion function from a single sentence of description, supplying no sample inputs and no sample outputs. How is this request classified?

- **A**: Few-shot, because the descriptive sentence itself serves as one example
- **B**: Role prompting, because a professional persona is implied by the request
- **C**: Retrieval-augmented, because repository context is attached to a request
- **D**: Zero-shot, because the request supplies no demonstration of the pattern

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: A description of what is wanted is not a worked example of the output. Few-shot requires demonstrations, not instructions.
- **B**: Role prompting assigns a persona or expertise to shape tone and depth. Nothing here assigns a role, and doing so would not change the shot classification.
- **C**: Retrieval-augmented describes supplying retrieved external evidence. Ordinary editor context does not make a request retrieval-augmented.
- **D**: Zero-shot means the model is asked to perform the task with no worked example to pattern-match against. That is exactly this request, and it is the default state of most everyday prompts.

**Sources:** [Prompt engineering foundations and best practices](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/2-prompt-engineering-foundations-best-practices) · [Introduction to prompt engineering with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/)

</details>
