# GitHub Copilot Chat: Slash Commands Reference Guide

Slash commands are specialized instructions that trigger specific functionality in GitHub Copilot Chat. They help you get more targeted and structured responses for common development tasks. This guide provides a comprehensive reference for all available slash commands, including examples and best practices.

## Overview of Slash Commands

Slash commands are entered at the beginning of your message in Copilot Chat. They follow this general format:

```
/command [optional parameters] Your question or request
```

For example:
```
/explain What does this regex pattern do: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

## Available Slash Commands

### `/explain`

**Purpose**: Get an explanation of code functionality, concepts, or patterns.

**Use cases**:
- Understanding unfamiliar code
- Learning how algorithms work
- Clarifying complex logic
- Understanding error messages

**Examples**:

```
/explain 
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
```

```
/explain What does the spread operator (...) do in JavaScript?
```

```
/explain This error message: "Cannot read property 'filter' of undefined"
```

**Best practices**:
- Include the complete code snippet you want explained
- For complex functions, ask about specific parts if the full explanation is too broad
- Ask follow-up questions to dive deeper into specific aspects
- Request explanations in terms of specific concepts if you're learning

### `/tests`

**Purpose**: Generate test cases for functions, methods, or components.

**Use cases**:
- Creating unit tests for new functions
- Adding test coverage for existing code
- Testing edge cases and error conditions
- Setting up testing frameworks

**Examples**:

```
/tests
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
```

```
/tests Generate Jest tests for this React component, including testing user interactions
```

```
/tests Write pytest tests for this function, including edge cases
```

**Best practices**:
- Specify the testing framework you're using (Jest, Mocha, pytest, etc.)
- Include the complete function or component you want to test
- Mention specific edge cases you want covered
- Specify any mocking requirements for dependencies

### `/fix`

**Purpose**: Debug and fix errors or issues in your code.

**Use cases**:
- Resolving syntax errors
- Fixing runtime exceptions
- Addressing logical bugs
- Correcting type errors

**Examples**:

```
/fix I'm getting "TypeError: Cannot read property 'map' of undefined" with this code:
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

```
/fix This SQL query is giving a syntax error:
SELECT users.name, COUNT(orders.id) AS order_count 
FROM users 
LEFT JOIN orders ON users.id = orders.user_id
WHERE orders.created_at > '2023-01-01'
GROUP users.id
ORDER BY order_count DESC;
```

**Best practices**:
- Include the complete error message
- Provide the code that's causing the error
- Describe what you've already tried
- Mention the context (browser, environment, etc.)
- Include relevant dependencies or imports

### `/optimize`

**Purpose**: Improve the performance, efficiency, or readability of your code.

**Use cases**:
- Reducing time complexity
- Improving memory usage
- Enhancing readability
- Modernizing legacy code

**Examples**:

```
/optimize This function is slow with large arrays:
function findDuplicates(array) {
  const duplicates = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j] && !duplicates.includes(array[i])) {
        duplicates.push(array[i]);
      }
    }
  }
  return duplicates;
}
```

```
/optimize This database query is taking too long:
SELECT * FROM orders 
JOIN order_items ON orders.id = order_items.order_id
JOIN products ON order_items.product_id = products.id
WHERE orders.created_at > '2023-01-01';
```

**Best practices**:
- Specify what aspect you want to optimize (speed, memory, readability)
- Include performance metrics if available
- Mention constraints (must maintain the same API, etc.)
- Describe the context and scale of your data

### `/docs`

**Purpose**: Generate documentation for your code.

**Use cases**:
- Adding function/method documentation
- Creating class documentation
- Writing API documentation
- Generating README files

**Examples**:

```
/docs Generate JSDoc comments for this function:
function calculateTotalPrice(items, taxRate, discountCode) {
  let subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  if (discountCode === 'SAVE10') {
    subtotal *= 0.9;
  } else if (discountCode === 'SAVE20') {
    subtotal *= 0.8;
  }
  
  const tax = subtotal * taxRate;
  return subtotal + tax;
}
```

```
/docs Create a README.md for my Node.js API project that includes installation, usage, and API endpoints
```

**Best practices**:
- Specify the documentation format you want (JSDoc, docstrings, markdown, etc.)
- Include the complete code you want documented
- Mention any specific sections or details you want included
- Provide context about the project or codebase

### `/simplify`

**Purpose**: Simplify complex or verbose code.

**Use cases**:
- Reducing nested conditionals
- Simplifying complex algorithms
- Converting verbose code to more concise forms
- Making code more maintainable

**Examples**:

```
/simplify This function has too many nested conditions:
function processPayment(payment) {
  if (payment) {
    if (payment.method) {
      if (payment.method === 'credit') {
        if (payment.amount > 0) {
          if (payment.currency === 'USD') {
            return processCreditPayment(payment);
          } else {
            return new Error('Unsupported currency');
          }
        } else {
          return new Error('Invalid amount');
        }
      } else if (payment.method === 'debit') {
        // Similar nested conditions...
      } else {
        return new Error('Unsupported method');
      }
    } else {
      return new Error('Missing payment method');
    }
  } else {
    return new Error('Missing payment');
  }
}
```

```
/simplify This React component has repetitive code:
function UserProfile({ user }) {
  if (user.role === 'admin') {
    return (
      <div className="profile">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div className="admin-controls">
          <button>Edit Users</button>
          <button>View Reports</button>
          <button>System Settings</button>
        </div>
      </div>
    );
  } else if (user.role === 'manager') {
    return (
      <div className="profile">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div className="manager-controls">
          <button>View Team</button>
          <button>View Reports</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  }
}
```

**Best practices**:
- Include the complete code you want simplified
- Specify any constraints (must maintain the same functionality, etc.)
- Mention if you prefer certain patterns or approaches
- Describe what aspects you find most complex or problematic

### `/vulnerabilities`

**Purpose**: Identify security issues and vulnerabilities in your code.

**Use cases**:
- Finding security flaws
- Addressing injection risks
- Fixing authentication issues
- Improving data protection

**Examples**:

```
/vulnerabilities Check this Express.js route for security issues:
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.query(query, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      req.session.user = result[0];
      res.redirect('/dashboard');
    } else {
      res.redirect('/login?error=1');
    }
  });
});
```

```
/vulnerabilities Review this file upload function for security vulnerabilities:
function uploadUserAvatar(req, res) {
  const file = req.files.avatar;
  const fileName = file.name;
  const path = __dirname + '/uploads/' + fileName;
  
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ fileName, path });
  });
}
```

**Best practices**:
- Include the complete code you want analyzed
- Provide context about the environment and framework
- Mention any existing security measures
- Specify if you're concerned about particular types of vulnerabilities

### `/terminal`

**Purpose**: Generate terminal commands or shell scripts.

**Use cases**:
- Creating complex command sequences
- Learning command syntax
- Automating repetitive tasks
- Setting up development environments

**Examples**:

```
/terminal How do I find all JavaScript files in a directory that contain the text "TODO" and list them with line numbers?
```

```
/terminal Create a bash script that backs up a MySQL database, compresses it, and uploads it to S3
```

```
/terminal How do I set up a new React project with TypeScript and configure ESLint?
```

**Best practices**:
- Specify your operating system (Linux, macOS, Windows)
- Mention any specific tools or versions you're using
- Describe the task in detail
- Indicate if you need explanations of the commands

### `/new`

**Purpose**: Start a new chat session, clearing the current conversation history.

**Use cases**:
- Switching to a new topic
- Starting fresh after resolving an issue
- Clearing context when it's no longer relevant
- Reducing confusion from previous conversations

**Example**:

```
/new
```

**Best practices**:
- Save important information before starting a new chat
- Use when the current conversation context is no longer helpful
- Start with a clear, specific question in your new chat

## Additional Commands

### `/help`

**Purpose**: Get information about available commands and how to use them.

**Example**:

```
/help
```

### `/clear`

**Purpose**: Clear the current chat history without starting a completely new session.

**Example**:

```
/clear
```

## Agent Mode Commands (New in 2025)

These commands work with Copilot's Agent Mode for multi-file operations:

### `/agent`

**Purpose**: Invoke agent mode for complex, multi-file tasks.

**Use cases**:
- Implementing features across multiple files
- Refactoring entire modules
- Creating new project structures

**Examples**:

```
/agent Create a user authentication system with login, registration, and password reset
```

```
/agent Refactor this monolithic service into microservices
```

**Best practices**:
- Be specific about the scope of the task
- Review the generated plan before approving
- Use with Plan Mode enabled for visibility

### `/plan`

**Purpose**: Generate an execution plan without making changes.

**Use cases**:
- Understanding the scope of a change before executing
- Reviewing proposed file modifications
- Teaching others about implementation approaches

**Examples**:

```
/plan How would you implement rate limiting for this API?
```

```
/plan Show me the steps to add dark mode to this React app
```

### `/review`

**Purpose**: Perform an AI-powered code review with linter integration.

**Use cases**:
- Pre-commit code review
- Identifying security vulnerabilities
- Checking code quality and style

**Examples**:

```
/review Check this PR for security issues and best practices
```

```
/review Analyze this function for performance problems
```

**New Features (Nov 2025)**:
- Linter integration (ESLint, Pylint, Rubocop)
- Confidence scores for each suggestion
- Rationale explaining *why* issues matter

---

## IDE-Specific Commands

Different IDEs may have additional specialized commands:

### Visual Studio Code

- `/workspace` - Analyze your entire workspace
- `/compare` - Compare two code snippets
- `/references` - Find references to a symbol
- `/missionControl` - Open the agent task dashboard (new)
- `/branch` - Create a threaded conversation (new)

### Visual Studio 2026

- `/cloudAgent` - Delegate task to GitHub cloud agent (new)
- `/intent` - Search with intent detection (new)

### JetBrains IDEs

- `/generate` - Generate code based on context
- `/refactor` - Suggest refactoring options
- `/analyze` - Analyze code quality
- `/subagent` - Create an isolated subagent (new)

## Best Practices for Using Slash Commands

### 1. Choose the Right Command

- Select the command that best matches your specific need
- Use `/explain` before `/fix` if you don't understand the problem
- Combine commands in sequence for complex tasks (explain, then fix, then optimize)

### 2. Provide Sufficient Context

- Include complete code snippets, not just fragments
- Mention relevant technologies, frameworks, and versions
- Describe the broader context of what you're trying to achieve

### 3. Be Specific in Your Requests

- Clearly state what you want to accomplish
- Specify any constraints or requirements
- Ask for specific formats or approaches when needed

### 4. Follow Up Effectively

- Ask clarifying questions if the response isn't clear
- Request alternatives if the first suggestion doesn't work
- Use the conversation history to build on previous responses

### 5. Learn from the Process

- Pay attention to explanations, not just solutions
- Ask about the reasoning behind suggestions
- Request best practices and patterns to improve your skills

## Troubleshooting

If slash commands aren't working as expected:

1. **Command not recognized**: Ensure you're using the correct command syntax with a forward slash
2. **Incomplete responses**: Try providing more context or breaking your request into smaller parts
3. **Incorrect results**: Clarify your request and provide more specific details
4. **IDE integration issues**: Check that you have the latest version of the Copilot extension

## Conclusion

Slash commands significantly enhance the power and precision of GitHub Copilot Chat. By using the appropriate command for each task and following best practices, you can get more accurate, relevant, and useful responses to your development questions and challenges. 