---
name: azure-bicep-deployment-for-terraform-experts
description: Convert Terraform-first deployment thinking into deterministic Azure Bicep deployment guidance with production-safe defaults. Intended for use by the azure-architect-consultant agent.
user-invocable: false
disable-model-invocation: false
---

# Skill: azure.bicep_deployment.terraform_experts

**Description:** Help Terraform experts design and deploy Azure infrastructure with Bicep while preserving enterprise rigor, determinism, and deployment safety.

## Scope

Use this skill when the user asks for:

- Terraform to Bicep migration strategy.
- Bicep deployment plans for teams experienced with Terraform.
- Azure deployment architecture that requires deterministic Bicep patterns.
- Mapping Terraform concepts (state, modules, variables, outputs, plan/apply) to Bicep workflows.

## Exclusivity Contract

This skill is intended for **azure-architect-consultant** workflows only.

- If the active workflow is not Azure architecture or Bicep deployment guidance, do not apply this skill.
- If the request is implementation-heavy but not architecture-driven, hand off to deployment-focused guidance after producing architecture outputs.

## Grounding

Always ground recommendations in official Microsoft docs before finalizing:

- Microsoft Learn MCP documentation search and fetch.
- Azure Well-Architected guidance when making design trade-offs.

If a service capability is uncertain, look it up before asserting it.

## Bundled assets

- `resources/terraform-to-bicep-patterns.md`
- `resources/deployment-playbook.md`
- `scripts/validate-output.js`

## Required workflow

1. Validate requirements and non-functional constraints.
2. Build a Terraform to Bicep concept map.
3. Propose target Bicep module boundaries and scopes.
4. Define parameterization and environment strategy.
5. Define deployment sequence and rollback points.
6. Include governance controls (policy, RBAC, tagging, locks) as explicit steps.
7. Run checks from `resources/deployment-playbook.md`.
8. Validate the draft with `scripts/validate-output.js` logic before delivering.

## Determinism rules

- Use explicit deployment scopes (tenant, management group, subscription, resource group).
- Use stable naming patterns and deterministic parameter sets.
- Separate reusable module code from environment-specific parameter files.
- Do not mix multiple deployment strategies in one recommendation unless trade-offs require it.
- Always include preflight validation and what-if checks in deployment flow.

## Terraform to Bicep mapping rules

- Terraform state backend maps to deployment operation history and source-controlled parameters; avoid claiming 1:1 state parity.
- Terraform module maps to Bicep module with explicit scope and strongly typed params.
- Terraform workspace maps to environment parameter files and pipeline environments.
- Terraform plan/apply maps to Bicep lint/validate + what-if + create/update deployment.
- Terraform outputs map to Bicep outputs, optionally exported for pipeline consumption.

## Output format

```yaml
bicep_deployment_blueprint:
  audience: "terraform-expert"
  architecture_scope: "<tenant|managementGroup|subscription|resourceGroup>"
  requirement_summary:
    - "<key requirement>"
  terraform_to_bicep_map:
    - terraform: "<concept>"
      bicep: "<equivalent approach>"
      caveat: "<difference that matters>"
  module_strategy:
    - module: "<name>"
      scope: "<scope>"
      responsibility: "<what it deploys>"
  parameter_strategy:
    files:
      - "main.bicep"
      - "parameters/<env>.bicepparam"
    conventions:
      - "<naming and typing rule>"
  deployment_sequence:
    - step: "<preflight>"
      command_or_action: "<action>"
      expected_result: "<result>"
    - step: "<what-if>"
      command_or_action: "<action>"
      expected_result: "<result>"
    - step: "<deploy>"
      command_or_action: "<action>"
      expected_result: "<result>"
  governance_controls:
    - "<policy/rbac/tag/lock control>"
  rollback_plan:
    - "<rollback checkpoint>"
  references:
    - "<Microsoft Learn URL>"
```

## Delivery rules

- Keep recommendations architecture-first, then implementation-ready.
- Include explicit trade-offs across WAF pillars.
- Do not output uncertain claims without a lookup note.
