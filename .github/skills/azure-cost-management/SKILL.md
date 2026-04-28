---
name: azure-cost-management
description: Analyze Azure costs, recommend FinOps optimizations, design budget alert strategies, and generate tagging policies. Use when the user asks about Azure spending, cost optimization, reservations, savings plans, or FinOps governance.
---

# Skill: azure.cost_management.finops

**Description:** Analyze Azure costs, recommend FinOps optimizations, design budget alert strategies, and produce tagging governance policies grounded in Azure Cost Management documentation.

## Grounding

**Required sources:**

- Azure Cost Management documentation on Microsoft Learn (`https://learn.microsoft.com/azure/cost-management-billing/`)
- Azure Well-Architected Framework — Cost Optimization pillar (`https://learn.microsoft.com/azure/well-architected/cost-optimization/`)
- Azure Pricing Calculator (`https://azure.microsoft.com/pricing/calculator/`)
- Cloud Adoption Framework — Manage costs (`https://learn.microsoft.com/azure/cloud-adoption-framework/govern/cost-management/`)

## Guardrails

- Do not invent SKU pricing. Reference official Microsoft Learn pricing pages or advise the user to confirm via the Azure Pricing Calculator.
- Do not recommend deprecated services (for example, Classic VMs, Azure Service Manager).
- Always state that cost estimates are approximations and vary by region, commitment term, and usage pattern.
- No contractions in output.
- Always include cleanup or rollback steps when recommending resource changes.

## Workflow

1. Identify the user's Azure workload type and region.
2. Retrieve current Azure Cost Management guidance from Microsoft Learn.
3. Assess the relevant cost levers: compute right-sizing, reserved instances, savings plans, spot instances, auto-shutdown, storage tiers.
4. Propose a tagging strategy aligned to the Cloud Adoption Framework.
5. Draft budget alert thresholds using Azure Cost Management budgets.
6. Produce a prioritized optimization backlog with estimated monthly savings.

## Output format

```markdown
## Azure Cost Optimization Report

### Workload summary
- Workload: <name and description>
- Region(s): <Azure region(s)>
- Estimated monthly baseline cost: <USD range>

### Cost levers reviewed

| Lever | Current state | Recommendation | Estimated saving |
|-------|--------------|----------------|-----------------|
| Compute right-sizing | <state> | <action> | <USD/month> |
| Reserved instances (1-yr) | <state> | <action> | <USD/month> |
| Azure Savings Plan | <state> | <action> | <USD/month> |
| Spot / preemptible workloads | <state> | <action> | <USD/month> |
| Storage tiering (Cool/Archive) | <state> | <action> | <USD/month> |
| Auto-shutdown (dev/test) | <state> | <action> | <USD/month> |

### Tagging strategy

| Tag key | Values | Purpose |
|---------|--------|---------|
| `environment` | `prod`, `staging`, `dev`, `test` | Cost allocation by environment |
| `cost-center` | `<business unit code>` | Chargeback / showback |
| `workload` | `<workload name>` | Resource grouping |
| `owner` | `<team alias>` | Accountability |
| `expiry-date` | `YYYY-MM-DD` | Auto-cleanup governance |

### Budget alert policy

- **Monthly budget threshold:** <USD>
- **Alert at 80%:** Notify <owner email / action group>
- **Alert at 100%:** Notify <owner email + manager>
- **Forecasted overage alert:** 110% threshold

### Optimization backlog (prioritized)

1. **<Action>** — saves ~$<amount>/month — effort: <low|medium|high>
2. **<Action>** — saves ~$<amount>/month — effort: <low|medium|high>
3. **<Action>** — saves ~$<amount>/month — effort: <low|medium|high>

### References

- <Microsoft Learn URL 1>
- <Microsoft Learn URL 2>

### Next steps

1. **Practice:** Run `Get-CopilotMetricsReport.ps1` to baseline your current Copilot seat utilization before committing to a license tier.
2. **Deep dive:** Review the Azure Well-Architected Framework Cost Optimization checklist at `https://learn.microsoft.com/azure/well-architected/cost-optimization/checklist`.
3. **Real-world application:** Create a budget alert in the Azure portal for your highest-cost resource group and configure an action group to notify your team.
```
