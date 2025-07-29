# 🚀 Azure Developer CLI (AZD) Scaffolding Guide

[![AZD Version](https://img.shields.io/badge/AZD-latest-blue.svg)](https://learn.microsoft.com/azure/developer/azure-developer-cli/overview)
[![Azure](https://img.shields.io/badge/Azure-latest-0089D6?logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Table of Contents
- [Installation](#-installation)
- [Authentication](#-authentication)
- [Project Templates](#-project-templates)
- [Helper Commands](#-helper-commands)
- [Environment Setup](#-environment-setup)
- [Quick Tips](#-quick-tips)

## 💿 Installation

### Linux/macOS
```bash
curl -fsSL https://aka.ms/install-azd.sh | bash
```

### Windows (PowerShell)
```powershell
winget install Microsoft.Azure.DevCLI
```

## 🔐 Authentication

```bash
# Login to Azure
azd auth login

# Verify authentication
az account show
```

## 🎨 Project Templates

### 1. Node.js Express API with Cosmos DB 🌟
```bash
mkdir express-cosmos-api && cd express-cosmos-api
azd init --template Azure-Samples/todo-nodejs-mongo
azd up
```
**Features:**
- Express.js backend
- MongoDB API
- Azure Cosmos DB integration
- REST API endpoints
- Swagger documentation

### 2. Simple Node.js Express Web App 💻
```bash
mkdir express-webapp && cd express-webapp
azd init --template Azure-Samples/todo-nodejs-mongo-aca
azd up
```
**Features:**
- Container Apps deployment
- Express.js server
- Static file serving
- Environment configuration

### 3. Python FastAPI with Cosmos DB 🐍
```bash
mkdir python-fastapi-cosmos && cd python-fastapi-cosmos
azd init --template Azure-Samples/todo-python-mongo
azd up
```
**Features:**
- FastAPI framework
- Async MongoDB support
- OpenAPI documentation
- Python best practices

### 4. Node.js Static Web App with API ⚡
```bash
mkdir static-web-api && cd static-web-api
azd init --template Azure-Samples/todo-nodejs-staticwebapp
azd up
```
**Features:**
- Static Web Apps hosting
- Serverless API
- GitHub Actions integration
- Global CDN

### 5. DevOps CI/CD Pipeline Example 🔄
```bash
mkdir devops-cicd && cd devops-cicd
azd init --template Azure-Samples/azure-devops-demo
azd up
```
**Features:**
- Azure DevOps pipelines
- Infrastructure as Code
- Automated testing
- Release management

### 6. Minimal Node.js API (Teaching Focus) 📚
```bash
mkdir minimal-node-api && cd minimal-node-api
azd init --template Azure-Samples/todo-nodejs-mongo-aca-minimal
azd up
```
**Features:**
- Simplified architecture
- Basic CRUD operations
- Clear code structure
- Learning-focused setup

### 7. Full Stack JavaScript App 🎯
```bash
mkdir fullstack-js && cd fullstack-js
azd init --template Azure-Samples/todo-nodejs-mongo-aca-fullstack
azd up
```
**Features:**
- React frontend
- Node.js backend
- MongoDB database
- Complete architecture

## 🛠️ Helper Commands

### AZD Core Commands
| Command | Description |
|---------|-------------|
| `azd init` | Initialize new project |
| `azd up` | Provision and deploy |
| `azd down` | Delete resources |
| `azd monitor` | View logs/metrics |
| `azd pipeline config` | Setup CI/CD |

### Azure Authentication
| Command | Description |
|---------|-------------|
| `az login` | Interactive login |
| `az account list` | List subscriptions |
| `az account set` | Set subscription |
| `az account show` | Show current sub |

## 🌍 Environment Setup

### Required Variables
```bash
# Create new environment
azd env new development

# Set required variables
azd env set AZURE_LOCATION eastus
azd env set AZURE_SUBSCRIPTION_ID <your-subscription-id>
azd env set AZURE_TENANT_ID <your-tenant-id>
```

### Optional Variables
```bash
# Application specific
azd env set AZURE_RESOURCE_GROUP rg-myapp
azd env set AZURE_APP_NAME myapp
```

## 💡 Quick Tips

1. **Project Management**
   - Use `azd status` to check project state
   - Run `azd clean` to reset local state
   - Execute `azd env list` to view environments

2. **Cost Management**
   - Monitor with `az cost management`
   - Use `azd down` to delete unused resources
   - Set budget alerts in Azure Portal

3. **Development Flow**
   - Start with `azd init`
   - Test locally with `azd local`
   - Deploy with `azd up`
   - Monitor with `azd monitor`

4. **Troubleshooting**
   - Check logs with `azd monitor`
   - Use `azd env show` for configuration
   - Enable debug with `--debug` flag

## 🔍 Additional Resources

- [AZD Documentation](https://learn.microsoft.com/azure/developer/azure-developer-cli/)
- [Azure Samples Gallery](https://github.com/Azure-Samples)
- [AZD GitHub Repository](https://github.com/Azure/azure-dev)
- [Azure Architecture Center](https://learn.microsoft.com/azure/architecture/)

## 🤝 Contributing

Feel free to:
- Submit issues
- Fork the repository
- Submit pull requests
- Share your experiences

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

[![Star this repo](https://img.shields.io/github/stars/your-username/your-repo?style=social)](https://github.com/your-username/your-repo)
[![Follow on Twitter](https://img.shields.io/twitter/follow/your-twitter?style=social)](https://twitter.com/your-twitter)

**Made with ❤️ for the Azure Developer Community**

</div> 