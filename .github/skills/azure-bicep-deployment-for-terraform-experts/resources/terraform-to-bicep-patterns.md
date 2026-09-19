# Terraform to Bicep Patterns for Azure Deployments

Use this as the canonical translation guide when advising Terraform experts.

## Concept Translation Table

| Terraform concept        | Bicep equivalent                                                 | Key difference that impacts delivery                                                                 |
| ------------------------ | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Provider configuration   | Target scope and deployment command context                      | Bicep relies on Azure deployment scope and authenticated context instead of provider blocks.         |
| Backend state            | Deployment operation history + source-controlled parameter files | No direct state file equivalent. Drift handling relies on what-if, policy, and operational controls. |
| Module                   | Bicep module                                                     | Bicep modules are strongly typed and can target explicit scopes.                                     |
| Variable                 | Parameter (`param`) and `.bicepparam`                            | Use explicit typing and defaults; avoid hidden environment assumptions.                              |
| Local value              | Variable (`var`)                                                 | Keep derived values deterministic and side-effect free.                                              |
| Output                   | `output`                                                         | Outputs can flow into pipeline stages or integration scripts.                                        |
| Workspace                | Environment parameterization + pipeline environment              | Model env differences via parameter files and policy boundaries.                                     |
| Plan                     | `what-if` and validation                                         | What-if is advisory for resource changes, not a 1:1 Terraform plan clone.                            |
| Apply                    | Deployment create/update command                                 | Operations are scope-specific and trackable by deployment name/history.                              |
| Lifecycle meta-arguments | Resource/property-level design choices and policy controls       | Not all lifecycle behaviors map directly. Use policy, locks, and safe rollout patterns.              |

## Recommended Repository Layout

```text
infra/
  main.bicep
  modules/
    networking.bicep
    identity.bicep
    data.bicep
    app.bicep
  parameters/
    dev.bicepparam
    test.bicepparam
    prod.bicepparam
  pipelines/
    deploy-dev.yml
    deploy-prod.yml
```

## Deterministic Deployment Principles

- One scope per deployment stage unless a cross-scope dependency requires otherwise.
- One parameter file per environment.
- One approved naming convention across all modules.
- One rollback checkpoint per stage.
- One source of truth for policy and RBAC assignments.

## Safety Gates

1. Lint and compile validation.
2. What-if review with explicit approval criteria.
3. Policy compliance check before deployment.
4. Post-deployment verification checks.

## Common Anti-Patterns

- Treating what-if as a guaranteed full diff equivalent to Terraform plan.
- Embedding environment-specific values directly in modules.
- Mixing subscription and resource group scope resources in a single opaque deployment.
- Deploying without RBAC and policy checks.
