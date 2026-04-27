# GitHub Copilot Certification Exam Objectives

## Study Guide Overview

Get exam-ready for the GitHub Copilot Certification with our comprehensive study guide. We've curated the essential resources and learning activities to better prepare you for the exam and boost your chances of success.

## Exam Domains and Objectives

The GitHub Copilot certification exam covers seven domains, with the following percentage distribution:

| Domain | Percentage |
|--------|------------|
| Domain 1: Responsible AI | 7% |
| Domain 2: GitHub Copilot plans and features | 31% |
| Domain 3: How GitHub Copilot works and handles data | 15% |
| Domain 4: Prompt crafting and Prompt engineering | 9% |
| Domain 5: Developer use cases for AI | 14% |
| Domain 6: Testing with GitHub Copilot | 9% |
| Domain 7: Privacy fundamentals and context exclusions | 15% |

### Domain 1: Responsible AI (7%)

- Explain responsible usage of AI
- Describe the risks associated with using AI
- Explain the limitations of using generative AI tools (depth of the source data for the model, bias in the data, etc.)
- Explain the need to validate the output of AI tools
- Identify how to operate a responsible AI
- Identify the potential harms of generative AI (bias, secure code, fairness, privacy, transparency)
- Explain how to mitigate the occurrence of potential harms
- Explain ethical AI

### Domain 2: GitHub Copilot Plans and Features (31%)

> **January 2026 Update**: This domain now includes Agent Mode, multi-model selection, and Mission Control. Expect exam questions on these new capabilities.

#### General Plans and Features
- Identify the different GitHub Copilot plans
- Understand the differences between Copilot Individual, Copilot Business, Copilot Enterprise, and Copilot Business for non-GHE
- Understand Copilot for non-GitHub customers
- Define GitHub Copilot in the IDE
- Define GitHub Copilot Chat in the IDE
- Describe the different ways to trigger GitHub Copilot (chat, inline chat, suggestions, multiple suggestions, exception handling, CLI)
- **NEW**: Understand multi-model selection (GPT-5.1, Claude Opus 4.5, Gemini 3 Pro, Raptor Mini)
- **NEW**: Differentiate between Agent Mode (IDE) and Coding Agent (GitHub Actions)
- **NEW**: Describe Mission Control for managing agent sessions
- **NEW**: Explain Plan Mode for reviewing proposed changes before execution

#### Copilot Individual
- Identify the main features with GitHub Copilot Individual
- Explain the difference between GitHub Copilot Individual and GitHub Copilot Business (data exclusions, IP indemnity, billing, etc.)
- Understand the available features in the IDE for GitHub Copilot Individual

#### Copilot Business
- Identify the main features of GitHub Copilot Business
- Demonstrate how to exclude specific files from GitHub Copilot
- Demonstrate how to establish organization-wide policy management
- Describe the purpose of organization audit logs for GitHub Copilot Business
- Explain how to search audit log events for GitHub Copilot Business
- Explain how to manage GitHub Copilot Business subscriptions via the REST API

#### Copilot Chat
- Identify the main features with GitHub Copilot Chat
- Identify the use cases where GitHub Copilot Chat is most effective
- Explain how to improve performance for GitHub Copilot Chat
- Identify the limitations of using GitHub Copilot Chat
- Identify the available options for using code suggestions from GitHub Copilot Chat
- Explain how to share feedback about GitHub Copilot Chat
- Identify the common best practices for using GitHub Copilot Chat
- Identify the available slash commands when using GitHub Copilot Chat

#### Copilot Business
- Identify the main features of GitHub Copilot Business
- Demonstrate how to exclude specific files from GitHub Copilot
- Demonstrate how to establish organization-wide policy management
- Describe the purpose of organization audit logs for GitHub Copilot Business
- Explain how to search audit log events for GitHub Copilot Business
- Explain how to manage GitHub Copilot Business subscriptions via the REST API
- **NEW**: Explain Coding Agent capabilities for automated PR generation
- **NEW**: Describe budget tracking and per-team usage limits
- **NEW**: Understand BYOK (Bring Your Own Key) for enterprise model providers

#### Copilot Enterprise
- Identify the main features with GitHub Copilot Enterprise
- Explain the benefits of using GitHub Copilot Chat on GitHub.com
- Explain GitHub Copilot pull request summaries
- Explain how to configure and use Knowledge Bases within GitHub Copilot Enterprise
- Describe the different types of knowledge that can be stored in a Knowledge Base (e.g. code snippets, best practices, design patterns)
- Explain the benefits of using Knowledge Bases for code completion and review
- Describe instructions for creating, managing, and searching Knowledge Bases
- Explain the benefits of using custom models
- **NEW**: Describe the Private MCP Registry for internal tools
- **NEW**: Explain organization-wide custom instructions
- **NEW**: Understand delegated AI controls management

#### CLI Integration
- Discuss the steps for installing GitHub Copilot in the CLI
- Identify the common commands when using GitHub Copilot in the CLI
- Identify the multiple settings you can configure within GitHub Copilot in the CLI
- **NEW**: Explain how CLI now supports agentic coding (local editing, debugging)
- **NEW**: Describe MCP integration for CLI context enhancement
- **NEW**: Understand image input support for visual debugging
- **NEW**: Explain semantic codebase search capabilities

### Domain 3: How GitHub Copilot Works and Handles Data (15%)

#### Data Pipeline and Processing
- Describe the data pipeline lifecycle of GitHub Copilot code suggestions in the IDE
- Visualize the lifecycle of a GitHub Copilot code suggestion
- Explain how GitHub Copilot gathers context
- Explain how GitHub Copilot builds a prompt
- Describe the proxy service and the filters each prompt goes through
- Describe how the large language model produces its response
- Explain the post-processing of GitHub Copilot's responses through the proxy server
- Identify how GitHub Copilot identifies matching code

#### Data Handling
- Describe how GitHub Copilot handles data
- Describe how the data in GitHub Copilot individual is used and shared
- Explain the data flow for GitHub Copilot code completion
- Explain the data flow for GitHub Copilot Chat
- Describe the different types of input processing for GitHub Copilot Chat

#### Limitations
- Describe the limitations of GitHub Copilot (and LLMs in general)
- Describe the effect of most seen examples on the source data
- Describe the age of code suggestions (how old and relevant the data is)
- Describe the nature of GitHub Copilot providing reasoning and context from a prompt vs calculations
- Describe limited context windows

## Audience Profile

This exam is designed for individuals in the field of software development who are proficient in using GitHub, including software developers, administrators, and project managers. This certification is intended for individuals who have a foundational understanding of GitHub Copilot as a product and its available features, along with hands-on experience in optimizing software development workflows using GitHub Copilot.

## Learning Resources

### Microsoft Learn

Two comprehensive learning paths are available:
- GitHub Copilot Fundamentals - Understand the AI Pair Programmer
- Accelerate App Development by Using GitHub Copilot

### LinkedIn Learning

A comprehensive video-based learning path is coming soon, which will cover all aspects of GitHub Copilot and prepare you for certification.

### New Feature Resources (January 2026)

- [GitHub Copilot What's New](https://github.com/features/copilot/whats-new) - Official feature announcements
- [November 2025 Copilot Roundup](https://github.com/orgs/community/discussions/180828) - 50+ updates overview
- [Agent Mode Documentation](https://docs.github.com/en/copilot/using-github-copilot/using-agent-mode) - Multi-file editing guide
- [MCP Integration Guide](https://docs.github.com/en/copilot/mcp) - Model Context Protocol setup
- [Enterprise Governance](https://resources.github.com/enterprise-content-roundup/december/) - December enterprise updates

### Study Focus Areas for 2025

Based on recent feature releases, prioritize understanding:

1. **Multi-Model Architecture** - When to use GPT-5.1 vs Claude Opus 4.5 vs Gemini 3 Pro
2. **Agent Mode vs Coding Agent** - This distinction is critical and likely to appear on exams
3. **Plan Mode** - How to preview changes before execution
4. **Mission Control** - Managing multiple agent sessions
5. **MCP (Model Context Protocol)** - Enhanced context gathering
6. **BYOK (Bring Your Own Key)** - Enterprise model provider integration
7. **Copilot Spaces** - Organizing context for conversations
8. **Linter Integration** - Code review with ESLint/Pylint/Rubocop

