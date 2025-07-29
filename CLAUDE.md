# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a teaching repository for O'Reilly Live Learning classes on GitHub Copilot certification preparation. The repository contains course materials, demo applications, and examples for students preparing for the GitHub Copilot certification exam.

## Common Development Commands

### Root Project (Jest Testing)
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Node.js Express Demo (demos/12/node-express-azure)
```bash
# Install dependencies
npm install

# Run the application
npm start

# Run tests (using Mocha)
npm test
```

### GitHub Stats Dashboard (demos/14)
```bash
# Install dependencies
npm install

# Run production server
npm start

# Run development server with auto-reload
npm run dev
```

### Python FastAPI Demo (demos/11)
```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

## High-Level Architecture

### Repository Structure
- **Root**: Contains main course materials, Jest configuration for testing examples
- **demos/**: Individual lesson demos organized by number (02-14)
  - Each demo folder contains self-contained applications with their own dependencies
  - Most demos include README.md files with specific instructions
- **copilot/**: Best practices and reference documentation for GitHub Copilot usage
- **exam-metadata/**: Certification exam objectives and study materials
- **docs/**: Additional documentation and examples

### Key Technology Stacks
1. **Node.js/Express**: Primary stack for web application demos
2. **Python/FastAPI**: Used for API and data processing examples
3. **Jest**: Testing framework for JavaScript examples
4. **Mocha/Chai**: Testing framework for the Express application

### Important Configuration Files
- **jest.config.js**: Configures Jest with 80% coverage thresholds
- **.github/dependabot.yml**: Automated dependency updates for Node.js and Python projects
- **copilot-metrics.json**: Contains contributor data for the repository

## Development Guidelines

### Testing Requirements
- Maintain 80% code coverage (configured in jest.config.js)
- Test files should match patterns: `**/test/**/*.js` or `**/?(*.)+(spec|test).js`
- For Express apps, use Mocha tests in the `test/` directory

### Dependency Management
- Dependabot is configured to check weekly for updates
- Node.js: Only direct dependencies are updated
- Python: All dependencies are updated
- Jest is pinned to v29+ to avoid breaking changes

### GitHub Copilot Integration
- Custom instructions are defined in `.github/copilot-instructions.md`
- Focus on enterprise scenarios and real-world business use cases
- Emphasize Git best practices, conventional commits, and PR workflows

### Markdown Formatting (from Cursor Rules)
- Always add blank lines between headings and content
- Always add blank lines between lists and content
- Always add blank lines between code blocks and content

## Course-Specific Context

This repository supports a 5-segment course flow covering:
1. Getting Started, Responsible AI, IDE Essentials
2. Copilot Chat, Slash Commands, CLI & Extensions
3. Agentic AI, Knowledge Bases, GHAS Integration
4. Emerging Features, Trends, Competitive Analysis
5. Certification Exam Guidance & Study Strategies

The exam domains covered include:
- Responsible AI (7%)
- GitHub Copilot Plans and Features (31%)
- How GitHub Copilot Works and Handles Data (15%)
- Prompt Crafting and Prompt Engineering (9%)
- Developer Use Cases for AI (14%)
- Testing with GitHub Copilot (9%)
- Privacy Fundamentals and Context Exclusions (15%)