# GH-300 Objective Domain

Study guide for GH-300: GitHub Copilot
05/20/2025
Exam Design
Audience Profile

This exam is designed for individuals in the field of software development who are proficient in using GitHub, including software developers, administrators, and project managers. This certification is intended for individuals who have a foundational understanding of GitHub Copilot as a product and its available features, along with hands-on experience in optimizing software development workflows using GitHub Copilot.

Skills Measured
NOTE: The bullets that follow each of the skills measured are intended to illustrate how we are assessing that skill. Related topics may be covered in the exam.

NOTE: Most questions cover features that are general availability (GA). The exam may contain questions on Preview features if those features are commonly used.

Domain 1: Responsible AI (7%)
Explain responsible usage of AI
Describe the risks associated with using AI

Explain the limitations of using generative AI tools (depth of the source data for the model, bias in the data, etc.)

Explain the need to validate the output of AI tools

Identify how to operate a responsible AI

Identify the potential harms of generative AI (bias, secure code, fairness, privacy, transparency)

Explain how to mitigate the occurrence of potential harms

Explain ethical AI

Domain 2: GitHub Copilot plans and features (31%)
Identify the different GitHub Copilot plans
Understand the differences between Copilot Individual, Copilot Business, Copilot Enterprise, and Copilot Business for non-GHE

Understand Copilot for non-GitHub customers

Define GitHub Copilot in the IDE

Define GitHub Copilot Chat in the IDE

Describe the different ways to trigger GitHub Copilot (chat, inline chat, suggestions, multiple suggestions, exception handling, CLI)

Identify the main features with GitHub Copilot Individual
Explain the difference between GitHub Copilot Individual and GitHub Copilot Business (data exclusions, IP indemnity, billing, etc.)

Understand the available features in the IDE for GitHub Copilot Individual

Identify the main features of GitHub Copilot Business
Demonstrate how to exclude specific files from GitHub Copilot

Demonstrate how to establish organization-wide policy management

Describe the purpose of organization audit logs for GitHub Copilot Business

Explain how to search audit log events for GitHub Copilot Business

Explain how to manage GitHub Copilot Business subscriptions via the REST API

Identify the main features with GitHub Copilot Chat
Identify the use cases where GitHub Copilot Chat is most effective

Explain how to improve performance for GitHub Copilot Chat

Identify the limitations of using GitHub Copilot Chat

Identify the available options for using code suggestions from GitHub Copilot Chat

Explain how to share feedback about GitHub Copilot Chat

Identify the common best practices for using GitHub Copilot Chat

Identify the available slash commands when using GitHub Copilot Chat

Identify the main features with GitHub Copilot Enterprise
Explain the benefits of using GitHub Copilot Chat on GitHub.com

Explain GitHub Copilot pull request summaries

Explain how to configure and use Knowledge Bases within GitHub Copilot Enterprise

Describe the different types of knowledge that can be stored in a Knowledge Base (e.g., code snippets, best practices, design patterns)

Explain the benefits of using Knowledge Bases for code completion and review (e.g., improve code quality, consistency, and efficiency)

Describe instructions for creating, managing, and searching Knowledge Bases within GitHub Copilot Enterprise, including details on indexing and other relevant configuration steps

Explain the benefits of using custom models

Using GitHub Copilot in the CLI
Discuss the steps for installing GitHub Copilot in the CLI

Identify the common commands when using GitHub Copilot in the CLI

Identify the multiple settings you can configure within GitHub Copilot in the CLI

Domain 3: How GitHub Copilot works and handles data (15%)
Describe the data pipeline lifecycle of GitHub Copilot code suggestions in the IDE
Visualize the lifecycle of a GitHub Copilot code suggestion

Explain how GitHub Copilot gathers context

Explain how GitHub Copilot builds a prompt

Describe the proxy service and the filters each prompt goes through

Describe how the large language model produces its response

Explain the post-processing of GitHub Copilot’s responses through the proxy server

Identify how GitHub Copilot identifies matching code

Describe how GitHub Copilot handles data
Describe how the data in GitHub Copilot individual is used and shared

Explain the data flow for GitHub Copilot code completion

Explain the data flow for GitHub Copilot Chat

Describe the different types of input processing for GitHub Copilot Chat (types of prompts it was designed for)

Describe the limitations of GitHub Copilot (and LLMs in general)
Describe the effect of most seen examples on the source data

Describe the age of code suggestions (how old and relevant the data is)

Describe the nature of GitHub Copilot providing reasoning and context from a prompt vs calculations

Describe limited context windows

Domain 4: Prompt Crafting and Prompt Engineering (9%)
Describe the fundamentals of prompt crafting
Describe how the context for the prompt is determined

Describe the language options for promoting GitHub Copilot

Describe the different parts of a prompt

Describe the role of prompting

Describe the difference between zero-shot and few-shot prompting

Describe the way chat history is used with GitHub Copilot

Identify prompt crafting best practices when using GitHub Copilot

Describe the fundamentals of prompt engineering
Explain prompt engineering principles, training methods, and best practices

Describe the prompt process flow

Domain 5: Developer use cases for AI (14%)
Improve developer productivity
Describe how AI can improve common use cases for developer productivity

Learning new programming languages and frameworks

Language translation

Context switching

Writing documentation

Personalized context-aware responses

Generating sample data

Modernizing legacy applications

Debugging code

Data science

Code refactoring

Discuss how GitHub Copilot can help with SDLC (Software Development Lifecycle) management

Describe the limitations of using GitHub Copilot

Describe how to use the productivity API to see how GitHub Copilot impacts coding

Domain 6: Testing with GitHub Copilot (9%)
Describe the options for generating testing for your code
Describe how GitHub Copilot can be used to add unit tests, integration tests, and other test types to your code

Explain how GitHub Copilot can assist in identifying edge cases and suggesting tests to address them

Describe the different SKUs for GitHub Copilot
Describe the different SKUs and the privacy considerations for GitHub Copilot

Describe the different code suggestion configuration options on the organization level

Describe the GitHub Copilot Editor config file

Domain 7: Privacy fundamentals and context exclusions (15%)
Enhance code quality through testing
Describe how to improve the effectiveness of existing tests with GitHub Copilot’s suggestions

Describe how to generate boilerplate code for various test types using GitHub Copilot

Explain how GitHub Copilot can help write assertions for different testing scenarios

Leverage GitHub Copilot for security and performance
Describe how GitHub Copilot can learn from existing tests to suggest improvements and identify potential issues in the code

Explain how to use GitHub Copilot Enterprise for collaborative code reviews, leveraging security best practices, and performance considerations

Explain how GitHub Copilot can identify potential security vulnerabilities in your code

Describe how GitHub Copilot can suggest code optimizations for improved performance

Identify content exclusions
Describe how to configure content exclusions in a repository and organization

Explain the effects of content exclusions

Explain the limitations of content exclusions

Describe the ownership of GitHub Copilot outputs

Safeguards
Describe the duplication detector filter

Explain contractual protection

Explain how to configure GitHub Copilot settings on GitHub.com

Enabling/disabling duplication detection

Enabling/disabling prompt and suggestion collection

Describe security checks and warnings

Troubleshooting
Explain how to solve the issue if code suggestions are not showing in your editor for some files

Explain why context exclusions may not be applied

Explain how to trigger GitHub Copilot when suggestions are either absent or not ideal

Explain steps for context exclusions in code editors
