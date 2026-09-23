# Domain 3 practice: Understand GitHub Copilot data and architecture

**Weight on the exam: 10-15%.** Eight original items. These are teaching questions, not real exam content.

This domain rewards knowing the **order of the stages** and which safeguard acts at which stage. GitHub Docs describes the filters; the Microsoft Learn process-flow unit is the page that names the **proxy server in a GitHub-owned Microsoft Azure tenant** and separates the inbound flow from the outbound flow. Several items below turn on that separation.

---

## Q1. What the proxy stage does

**Objective:** Explain proxy filtering and post-processing · **Bloom:** Understand · **Difficulty:** medium

A Wide World Importers architect is documenting how a Copilot request travels from the editor to a suggestion. According to the documented inbound flow, what happens after the prompt is assembled from the developer request and the gathered context?

- **A**: The prompt is cached so that identical later requests can skip the model entirely
- **B**: The prompt passes to a proxy server in a GitHub-owned Azure tenant, which filters it
- **C**: The prompt is rewritten into a standardized template before any filtering is applied
- **D**: The prompt is sent to several models and the highest-scoring response is returned

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: No documented caching layer returns a stored suggestion in place of generation. Context differs between requests even when the typed text looks similar.
- **B**: The documented flow states that once context is gathered and the prompt is built, it passes securely to a proxy server hosted in a GitHub-owned Microsoft Azure tenant, where traffic is filtered to block attempts to manipulate the prompt or extract details about how suggestions are generated.
- **C**: Prompt building happens before this point and is shaped by the request and context, not by a fixed template applied at the proxy.
- **D**: A model is selected for a request. Fanning a prompt out across models and scoring the results is not part of the documented flow.

**Sources:** [GitHub Copilot user prompt process flow](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/3-github-copilot-user-prompt-process-flow) · [GitHub Trust Center](https://github.com/trust-center)

</details>

---

## Q2. What happens on the way back

**Objective:** Explain proxy filtering and post-processing · **Bloom:** Understand · **Difficulty:** medium

Blue Yonder Airlines wants to document what happens to a model response before it reaches the developer as a suggestion. Which activity takes place during post-processing?

- **A**: The response is re-ranked against suggestions the developer accepted previously
- **B**: The response is added to the repository index to improve later retrieval quality
- **C**: The response is translated into the dominant programming language of the repository
- **D**: The response is checked for code quality concerns and optionally for public code matches

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: Acceptance and rejection inform a feedback loop over time, but no documented step re-ranks a specific response against an individual developer's history before delivery.
- **B**: The repository index supports context retrieval. Responses are not written into it as part of returning a suggestion.
- **C**: Language selection is determined by the file and the request, not by a post-processing translation step.
- **D**: The documented outbound flow applies a final layer of checks at the proxy server, covering code quality concerns such as common vulnerability patterns, and, when the administrator has enabled the filter, comparison against matching public code. A response that fails these checks is truncated or discarded.

**Sources:** [GitHub Copilot user prompt process flow](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/3-github-copilot-user-prompt-process-flow) · [GitHub Copilot code referencing](https://docs.github.com/en/copilot/concepts/completions/code-referencing)

</details>

---

## Q3. A completion that knows about another file

**Objective:** Describe input processing and prompt building · **Bloom:** Analyze · **Difficulty:** medium

A Fabrikam developer is surprised that a Copilot completion correctly uses a helper function defined in a different file that happens to be open in another editor tab. Which part of input processing best explains this?

- **A**: Context gathering can include open tabs, file details, and code around the cursor
- **B**: The model retains every file from the developer's previous editing sessions
- **C**: The repository index is rebuilt on every keystroke and sent with each prompt
- **D**: Completions are generated from the repository default branch rather than local files

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: The documented inbound flow gathers code before and after the cursor, the file name and type, information about adjacent open tabs, project structure, and the languages and frameworks in use. An open tab is one of the named context sources, which is why the helper was available.
- **B**: A model does not carry state between sessions. Anything it appears to remember arrived as context with the current request.
- **C**: Repository indexing exists to support retrieval, but it is not rebuilt per keystroke, and that is not the mechanism behind an adjacent-tab completion.
- **D**: Completions reflect the working state in the editor. Generating from the default branch would make uncommitted local work invisible, which is not the observed behavior.

**Sources:** [GitHub Copilot user prompt process flow](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/3-github-copilot-user-prompt-process-flow) · [Concepts for providing context to Copilot](https://docs.github.com/en/copilot/concepts/context)

</details>

---

## Q4. Where content filtering acts

**Objective:** Explain proxy filtering and post-processing · **Bloom:** Analyze · **Difficulty:** hard

Contoso is mapping which safeguards act on a prompt and which act on a response. In the documented flow, where does filtering for harmful content and personal data take place?

- **A**: Only on the response, immediately before the suggestion is shown to the developer
- **B**: Only on the prompt, immediately after the developer accepts a suggestion in an editor
- **C**: On the prompt before generation, and again on the response after generation occurs
- **D**: On neither, because filtering runs inside the editor extension before transmission

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: Outbound filtering is real, but treating it as the only pass misses the inbound toxicity filtering stage that runs before the model receives the prompt.
- **B**: Acceptance happens at the end of the flow, so nothing about it can filter a prompt. The ordering in this option is impossible.
- **C**: The documented flow applies content filtering on the way in, covering hate speech, offensive content, and personal data before intent extraction and generation, and then filters again on the way out before the proxy applies its final checks. Filtering acts on both sides.
- **D**: Filtering happens in GitHub-operated services rather than locally in the extension. A client-side-only model would place the safeguard where a user could disable it.

**Sources:** [GitHub Copilot user prompt process flow](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/3-github-copilot-user-prompt-process-flow) · [Responsible use of GitHub Copilot](https://docs.github.com/en/copilot/responsible-use)

</details>

---

## Q5. Drawing the lifecycle

**Objective:** Visualize code suggestion lifecycle · **Bloom:** Understand · **Difficulty:** medium

A Northwind Traders trainer is drawing the code suggestion lifecycle for a new team. Which ordering matches the documented flow?

- **A**: Prompt assembly, model generation, proxy filtering, post-processing, delivery
- **B**: Proxy filtering, prompt assembly, post-processing, model generation, delivery
- **C**: Prompt assembly, post-processing, proxy filtering, model generation, delivery
- **D**: Prompt assembly, proxy filtering, model generation, post-processing, delivery

<details>
<summary>Answer and rationale</summary>

**Correct answer: D**

- **A**: This places the proxy after generation. The proxy screens the prompt on the way in, before the model sees it, and then applies checks again on the way out.
- **B**: Filtering cannot precede prompt assembly, because there is no prompt to filter yet. Context gathering and prompt building come first.
- **C**: Post-processing acts on a response, so it cannot occur before generation. This ordering inverts the outbound half of the flow.
- **D**: The documented order is context gathering and prompt assembly, the proxy filter, toxicity filtering, model generation, post-processing and response validation, then delivery to the developer with a feedback loop. This option preserves that sequence.

**Sources:** [GitHub Copilot user prompt process flow](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/3-github-copilot-user-prompt-process-flow) · [Introduction to prompt engineering with GitHub Copilot](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/)

</details>

---

## Q6. A compliance question about retention

**Objective:** Explain data usage, flow, and sharing · **Bloom:** Understand · **Difficulty:** hard

A WoodGrove Bank compliance reviewer asks a single question before approving a pilot: does GitHub retain Copilot prompts? What is the most accurate response to give?

- **A**: Retention differs by feature and surface, so current documentation must be checked
- **B**: Every prompt is retained for the life of the organization's Copilot subscription
- **C**: No prompt is ever retained, because each request is discarded after generation
- **D**: Retention is governed entirely by the content exclusion policy for the repository

<details>
<summary>Answer and rationale</summary>

**Correct answer: A**

- **A**: Data handling is documented per feature and per surface, and it differs between code completions and chat, and between working inside an editor and working on GitHub. The defensible answer is to name the surface and check the current trust documentation rather than to state one universal rule.
- **B**: A blanket retention claim overstates what the documentation says and would fail a review for the same reason a blanket denial would.
- **C**: A blanket denial is equally wrong. Some interactions are documented as retained for a period, so this answer cannot be defended.
- **D**: Content exclusion controls what may be used as context on supported surfaces. It is a different control from data retention and does not govern it.

**Sources:** [GitHub Trust Center](https://github.com/trust-center) · [GitHub Copilot data](https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/4-github-copilot-data)

</details>

---

## Q7. Earlier details stop mattering

**Objective:** Describe limitations of LLMs and Copilot · **Bloom:** Analyze · **Difficulty:** medium

A Tailwind Traders developer attaches a large folder to a long-running Chat conversation and notices that details discussed early on stop influencing later answers. Which limitation best explains this behavior?

- **A**: Chat discards all attachments once a conversation exceeds ten exchanges
- **B**: Chat prioritizes the repository default branch over any attached local file
- **C**: A context window is finite, so not everything supplied remains in view
- **D**: Chat requires a brand new session before any attachment takes effect

<details>
<summary>Answer and rationale</summary>

**Correct answer: C**

- **A**: No fixed exchange count triggers discarding attachments. A specific threshold like this is the kind of invented rule that reads plausibly and is not documented.
- **B**: Attached context is used for the request. There is no rule that a default branch outranks a file the developer explicitly supplied.
- **C**: A model processes a bounded amount of context per request. As a conversation and its attachments grow past that bound, earlier material is summarized or displaced, which is why a focused session or a deliberate compaction restores relevance.
- **D**: Attachments take effect on the request they accompany. Starting a fresh session is a useful remedy for accumulated clutter, but it is not a precondition.

**Sources:** [Optimize Copilot Chat context](https://docs.github.com/en/copilot/tutorials/optimize-chat-usage) · [Understand limitations and measure impact](https://learn.microsoft.com/en-us/training/modules/developer-use-cases-for-ai-with-github-copilot/5-understand-limitations-measure-impact)

</details>

---

## Q8. Does the model host change the safeguards

**Objective:** Explain data usage, flow, and sharing · **Bloom:** Understand · **Difficulty:** hard

An Adventure Works architect observes that some Copilot models are hosted by external providers rather than by GitHub, and asks whether selecting such a model bypasses GitHub content filtering. Which statement is accurate?

- **A**: Selecting an externally hosted model removes GitHub filtering from the request path
- **B**: Inputs and outputs continue to pass through Copilot content filtering in either case
- **C**: Filtering applies only to models hosted inside GitHub's own Azure tenant environment
- **D**: Filtering is disabled automatically whenever an organization permits a custom model

<details>
<summary>Answer and rationale</summary>

**Correct answer: B**

- **A**: This is the intuitive but incorrect reading. Hosting describes where inference runs; it does not remove the surrounding request pipeline.
- **B**: GitHub documents which provider hosts each model together with the data commitments that apply, and confirms that inputs and outputs still pass through Copilot content filtering. The safeguard is a property of the Copilot pipeline rather than of the host.
- **C**: Restricting filtering to GitHub-hosted models would create a gap that the documentation explicitly closes.
- **D**: Model availability is an administrative policy decision. Permitting additional models does not switch off filtering.

**Sources:** [Hosting of models for GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/model-hosting) · [GitHub Trust Center](https://github.com/trust-center)

</details>
