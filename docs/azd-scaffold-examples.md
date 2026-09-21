# Optional Azure scaffolding review

**Enrichment, reviewed September 20, 2026.** This appendix applies Copilot review habits to an Azure project. It is outside the core four-segment GH-300 class and requires no deployment or Azure account.

The Azure Developer CLI (`azd`) combines project templates, application code, infrastructure definitions, and deployment configuration. Use the [official overview](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/overview) and [template guidance](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/azd-templates) when choosing a current example.

## Installation

Installation is optional for this review. Follow the installation link in the [official overview](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/overview) for your operating system. If `azd` is already installed, these commands inspect its version and help:

```powershell
# Inspect supported commands before trusting generated instructions.
azd version
azd --help
azd init --help
```

## Authentication

Documentation review does not require sign-in. For a later, authorized deployment exercise, follow the selected template's prerequisites and use the [current authentication reference](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/reference#azd-auth). Verify the intended account and subscription before provisioning anything.

## Project templates

Select a template from the official [template guidance](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/azd-templates). Inspect its README, configuration, infrastructure, scripts, and license before copying it. A familiar sample name or an AI-generated repository URL does not prove that the template exists or fits your needs.

Use the real repository URL of the template you selected when providing Copilot context. Do not paste a placeholder account or repository name into a command.

## Helper commands

Use the [command reference](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/reference) to distinguish inspection from changes:

| Command | Purpose | Effect to understand |
|---|---|---|
| `azd version` | Show the installed version | Helps match guidance to the local tool |
| `azd --help` | Show supported commands | Reveals what the installed version actually supports |
| `azd init` | Initialize an application | Changes local project configuration |
| `azd up` | Provision and deploy | Can create or change billable Azure resources |
| `azd down` | Remove a project's Azure resources | Deletes resources; review scope before use |

These are reference examples. This appendix does not instruct you to provision or delete resources.

## Environment setup

For the review activity, use the template's public documentation. If you later create a local copy, keep it separate from this training repository. Derive required variables from that template instead of assuming every application uses the same service, region, or resource names. Keep credentials out of prompts, source files, and screenshots.

## Quick tips: a ten-minute review activity

**Scenario:** Tailwind Traders is evaluating a template for an internal learning application.

1. Select a current public template and identify the files that define its services and infrastructure.
2. Give Copilot those files and the template README. Request an explanation of the application, its Azure resources, required configuration, and unresolved assumptions.
3. Require a file reference for each claim. Verify a proposed command against the official reference before accepting it.
4. Identify one test you would require before deployment and one question that only the application owner can answer.
5. Produce a short review stating what you verified, what remains unknown, and what would authorize deployment.

**Success:** distinguish documented behavior, Copilot inference, and decisions requiring human input. A confident summary alone is insufficient evidence.

**No-account route:** perform the same review from the public template files and command reference without running Copilot or `azd`.

**Cleanup:** no resources are created by this activity. If you made a classroom copy, review its diff and retain only intended changes.

Return to the [core class activities](CLASS-ACTIVITIES.md) or the [four-segment course plan](../COURSE-PLAN.md). Report corrections through the [training repository](https://github.com/timothywarner-org/copilot-cert-prep).
