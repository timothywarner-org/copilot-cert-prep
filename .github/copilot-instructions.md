# GitHub Copilot Certification Prep Repository

## 🎯 Project Overview

This is a **teaching repository** for O'Reilly Live Learning GitHub Copilot certification (GH-300) preparation. The codebase demonstrates enterprise-ready patterns across Node.js, Python, and testing frameworks while showcasing Copilot's capabilities.

## 🏗️ Architecture & Structure

### Multi-Demo Architecture

- **Root project** (`/`): Main course materials with Jest testing framework
- **Individual demos** (`/demos/02-14/`): Self-contained applications by lesson number
- **Teaching modules** (`/copilot/`, `/exam-metadata/`): Best practices and certification materials

### Key Technology Stacks

```bash
# Root: Jest testing environment (80% coverage requirement)
npm test              # Run all tests with coverage thresholds
npm run test:watch    # Watch mode for active development

# Node.js/Express demos (e.g., demos/12/node-express-azure/)
npm test              # Mocha/Chai testing
npm start             # Production server

# Python demos (e.g., demos/11/)
pip install -r requirements.txt
python app.py         # FastAPI applications
```

## 🔧 Development Patterns

### Testing Standards

- **Jest configuration** enforces 80% coverage across branches, functions, lines, statements
- **Test patterns**: `**/test/**/*.js` and `**/?(*.)+(spec|test).js`
- **Mocha/Chai** used in Express demos for HTTP testing
- Generate tests focusing on enterprise scenarios: error handling, edge cases, performance

### Copilot Integration Patterns

```typescript
// Use teaching-focused comments for better suggestions
// @copilot context: This is for GitHub Copilot certification training
// Stack: Node.js + Express + Jest, Python + FastAPI
// Focus: Enterprise patterns, security, testing
```

### Dependency Management

- **Dependabot** configured for weekly updates (Node.js direct deps, Python all deps)
- **Jest pinned** to v29+ for stability
- Multi-project structure requires careful dependency isolation

## 📚 Course-Specific Context

### 5-Segment Course Flow

1. **Foundations** (Responsible AI, IDE setup, plans comparison)
2. **Core Features** (Prompt engineering, Chat, CLI integration)
3. **Enterprise** (Testing, Knowledge Bases, security, custom models)
4. **Privacy & Config** (Exclusions, troubleshooting, org policies)
5. **Exam Prep** (Practice questions, emerging features)

### Certification Exam Domains (GH-300)

- **Plans & Features** (31% weight) - Primary focus
- **Privacy & Exclusions** (15%) - Enterprise critical
- **How Copilot Works** (15%) - Technical depth
- **Other domains** (39%) - Balanced coverage

## 🚀 Enterprise Focus Areas

### Real-World Business Scenarios

When generating examples, use enterprise contexts:

- **Inventory management APIs** with error handling
- **Employee directory tools** with security considerations
- **Automated reporting pipelines** with data validation
- **CI/CD automation** with GitHub Actions integration
- **Azure/AWS deployment** patterns

### Code Quality Standards

- **Conventional Commits** for all examples
- **Branch naming**: `feature/`, `bugfix/`, `hotfix/`
- **Business-context comments** explaining _why_, not just _what_
- **Security-first** prompting and validation

## 🔐 Configuration Files

### Key Files to Reference

- `copilot/workspace-config.json` - Copilot feature toggles and security settings
- `examples/jest.config.js` - Testing standards with detailed JSDoc
- `.github/dependabot.yml` - Automated dependency management
- `COURSE-PLAN-SEPT-2025.md` - Complete curriculum structure

### Custom Instructions Pattern

```markdown
# When working in this repo:

# 1. Maintain 80% test coverage (jest.config.js)

# 2. Use enterprise security patterns

# 3. Generate teaching-appropriate examples

# 4. Focus on certification exam domains

# 5. Always include "Next Steps" for learners
```

## 💡 Copilot Best Practices for This Repo

- **Teaching context**: Always explain code for learners preparing for certification
- **Enterprise patterns**: Emphasize security, testing, and scalability
- **Multi-stack support**: Handle Node.js, Python, Bash, and GitHub CLI seamlessly
- **Exam preparation**: Reference specific GH-300 domains and weightings
- **Practical application**: Focus on hands-on, job-ready skills over theory

## 📋 Next Steps Template

When providing assistance, always end with actionable items:

1. **Practice item** specific to the current topic
2. **Deep dive** suggestion for advanced learning
3. **Real-world application** for immediate value
