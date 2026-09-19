# Bicep Deployment Playbook for Terraform Experts

Use this playbook as a deterministic checklist before delivering guidance.

## Required sections in every response

1. Requirement validation.
2. Terraform to Bicep concept mapping.
3. Module and scope strategy.
4. Parameter and environment strategy.
5. Deployment sequence with safety gates.
6. Governance controls.
7. Rollback strategy.
8. Official references.

## Deployment sequence template

1. Validate scope and permissions.
2. Validate and compile Bicep artifacts.
3. Run what-if against target scope.
4. Review policy impact and deny conditions.
5. Execute deployment with deterministic name and parameters.
6. Run post-deployment verification checks.
7. Record outputs and operational handoff notes.

## Governance checklist

- Resource naming and tagging standards applied.
- Least-privilege RBAC assignments defined.
- Policy assignments evaluated before deploy.
- Resource locks strategy documented where required.
- Managed identities preferred over static secrets.

## Rollback checklist

- Rollback trigger conditions defined.
- Rollback command or action listed for each stage.
- Data-impact warning included for stateful resources.
- Verification steps included after rollback.

## Deterministic output rules

- Use stable section names.
- Use explicit scope naming.
- Use environment-parameter file pattern.
- Include at least one Microsoft Learn reference URL.
