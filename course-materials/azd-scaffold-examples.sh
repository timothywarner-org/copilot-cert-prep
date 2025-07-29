#!/bin/bash

# Install Azure Developer CLI (azd)
echo "Installing Azure Developer CLI..."
curl -fsSL https://aka.ms/install-azd.sh | bash

# Alternative for Windows (PowerShell)
echo "For Windows, run this in PowerShell:"
echo 'winget install Microsoft.Azure.DevCLI'

# Authenticate to Azure
echo "Authenticating to Azure..."
azd auth login

# Create a working directory for our projects
mkdir copilot-azd-demos
cd copilot-azd-demos

# 1. Node.js Express API with Cosmos DB
echo "Scaffolding Node.js Express API with Cosmos DB..."
mkdir express-cosmos-api
cd express-cosmos-api
azd init --template Azure-Samples/todo-nodejs-mongo
azd up
cd ..

# 2. Simple Node.js Express Web App
echo "Scaffolding Simple Node.js Express Web App..."
mkdir express-webapp
cd express-webapp
azd init --template Azure-Samples/todo-nodejs-mongo-aca
azd up
cd ..

# 3. Python FastAPI with Cosmos DB
echo "Scaffolding Python FastAPI with Cosmos DB..."
mkdir python-fastapi-cosmos
cd python-fastapi-cosmos
azd init --template Azure-Samples/todo-python-mongo
azd up
cd ..

# 4. Node.js Static Web App with API
echo "Scaffolding Static Web App with API..."
mkdir static-web-api
cd static-web-api
azd init --template Azure-Samples/todo-nodejs-staticwebapp
azd up
cd ..

# 5. DevOps CI/CD Pipeline Example
echo "Scaffolding DevOps CI/CD Example..."
mkdir devops-cicd
cd devops-cicd
azd init --template Azure-Samples/azure-devops-demo
azd up
cd ..

# 6. Minimal Node.js API (Great for Teaching)
echo "Scaffolding Minimal Node.js API..."
mkdir minimal-node-api
cd minimal-node-api
azd init --template Azure-Samples/todo-nodejs-mongo-aca-minimal
azd up
cd ..

# 7. Full Stack JavaScript App
echo "Scaffolding Full Stack JavaScript App..."
mkdir fullstack-js
cd fullstack-js
azd init --template Azure-Samples/todo-nodejs-mongo-aca-fullstack
azd up
cd ..

# Helper Commands Reference
echo "
🚀 Helpful AZD Commands:
------------------------
azd init              # Initialize a new project
azd up               # Provision infrastructure and deploy
azd down             # Delete all resources
azd monitor          # View logs and metrics
azd pipeline config  # Configure CI/CD pipeline
azd env list         # List environments
azd env new          # Create new environment
azd env delete       # Delete environment

🔑 Azure Authentication Commands:
--------------------------------
az login             # Interactive login
az account list      # List subscriptions
az account set       # Set subscription
az account show      # Show current subscription

📦 Environment Variables Needed:
--------------------------------
AZURE_SUBSCRIPTION_ID
AZURE_TENANT_ID
AZURE_LOCATION (e.g., eastus)

💡 Quick Tips:
---------------
1. Use 'azd env set' to configure environment variables
2. Check 'azd status' to verify project state
3. Use 'azd template list' to see more templates
4. Monitor costs with 'az cost management'
"

# Example environment setup (uncomment and modify as needed)
# azd env new development
# azd env set AZURE_LOCATION eastus
# azd env set AZURE_SUBSCRIPTION_ID your-subscription-id
# azd env set AZURE_TENANT_ID your-tenant-id

echo "
✨ All examples scaffolded! Each directory contains a different project type.
📂 Navigate to any directory and use 'azd up' to deploy.
🔍 Check the README.md in each project for specific instructions.
"
