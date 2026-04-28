---
name: azure-architecture-review
description: "Review or draft an Azure architecture for a given workload, applying Well-Architected Framework pillars and cost optimization guidance."
argument-hint: "workload='3-tier web app' region='East US' budget='$5000/month'"
agent: azure-architect
tools:
  - codebase
  - editFiles
  - fileSearch
---

# Azure Architecture Review and Design Prompt

Use this prompt to ask the **azure-architect** agent to design or review an Azure workload
architecture. The agent will apply all five Azure Well-Architected Framework pillars and
invoke the **azure-cost-management** skill for cost estimation.

## Inputs

- **Workload type:** ${input:workload:Describe the workload (for example, "3-tier web app", "data pipeline", "microservices on AKS")}
- **Target region(s):** ${input:region:Primary Azure region (for example, "East US", "West Europe")}
- **Monthly budget:** ${input:budget:Approximate monthly spend target in USD (for example, "$5000/month")}
- **Scale requirements:** ${input:scale:Expected users or throughput (for example, "1000 concurrent users")}
- **Compliance requirements:** ${input:compliance:Any regulatory requirements (for example, "HIPAA", "PCI-DSS", or "none")}

## What the agent will produce

1. **Architecture diagram** (ASCII or Mermaid) showing the proposed topology.
2. **Component list** with recommended Azure services, SKUs, and rationale.
3. **Well-Architected review** covering all five pillars (Reliability, Security, Cost
   Optimization, Operational Excellence, Performance Efficiency).
4. **Cost estimate** (monthly USD range) using current Azure pricing.
5. **IaC scaffolding** — a starter Bicep template for the core resources.
6. **Security considerations** — Zero Trust controls, private endpoints, Defender for Cloud.
7. **Next steps** — practice task, deep-dive topic, real-world application.

## Grounding

The agent grounds all recommendations in:

- [Azure Architecture Center](https://learn.microsoft.com/azure/architecture/)
- [Azure Well-Architected Framework](https://learn.microsoft.com/azure/well-architected/)
- [Azure Cost Management](https://learn.microsoft.com/azure/cost-management-billing/)
- [Cloud Adoption Framework](https://learn.microsoft.com/azure/cloud-adoption-framework/)

## Example usage

```
@azure-architect Design a hub-and-spoke network for Northwind Traders with 3 spoke VNets,
Azure Firewall Premium, and private DNS zones. Region: East US 2. Budget: $8,000/month.
Compliance: SOC 2 Type II.
```
