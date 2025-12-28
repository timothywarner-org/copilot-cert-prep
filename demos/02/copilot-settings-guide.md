# GitHub Copilot Individual Settings Guide

> **Updated December 2025**: Includes new settings for multi-model selection, Agent Mode, Mission Control, and Next Edit Suggestions.

This guide demonstrates how to configure GitHub Copilot for individual developers, covering all major settings and customization options.

## IDE Integration Settings

GitHub Copilot is available in multiple IDEs. Here's how to configure it in the most popular environments:

### Visual Studio Code

1. **Enable/Disable Copilot**:
   - Click the GitHub Copilot icon in the status bar
   - Select "Enable" or "Disable" from the menu
   - Keyboard shortcut: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac), then type "GitHub Copilot: Enable/Disable"

2. **Inline Suggestions**:
   - Settings → Extensions → GitHub Copilot → Enable Inline Suggestions
   - Toggle to enable/disable suggestions appearing as you type

3. **Tab Completion**:
   - Settings → Extensions → GitHub Copilot → Tab Completion Enabled
   - When enabled, press Tab to accept suggestions

4. **Language Support**:
   - Settings → Extensions → GitHub Copilot → Enable For Languages
   - Add or remove languages from the list

### Visual Studio

1. **Access Settings**:
   - Tools → Options → GitHub Copilot

2. **Enable/Disable**:
   - Check/uncheck "Enable GitHub Copilot"

3. **Suggestion Behavior**:
   - Configure automatic suggestions vs. manual triggering

### JetBrains IDEs (IntelliJ, PyCharm, etc.)

1. **Access Settings**:
   - File → Settings → Tools → GitHub Copilot

2. **Enable/Disable**:
   - Check/uncheck "Enable GitHub Copilot"

3. **Completion Settings**:
   - Configure auto-completion behavior
   - Set suggestion delay time

## New Features Configuration (December 2025)

### Multi-Model Selection

Copilot now supports multiple AI models. Configure your preferred model for different contexts:

**VS Code Settings:**
```json
{
    "github.copilot.chat.model": "gpt-5.1-codex",
    "github.copilot.inlineSuggest.model": "raptor-mini",
    "github.copilot.agent.model": "claude-opus-4.5"
}
```

**Available Models:**
| Model | Best For | Speed |
|-------|----------|-------|
| `raptor-mini` | Quick inline completions | Ultra-fast |
| `gpt-5.1` | General reasoning | Medium |
| `gpt-5.1-codex` | Code-specific tasks | Medium |
| `claude-opus-4.5` | Nuanced refactoring | Medium |
| `gemini-3-pro` | Multimodal (images + code) | Medium |

### Agent Mode Settings

Configure Agent Mode behavior for multi-file editing:

```json
{
    "github.copilot.agent.enabled": true,
    "github.copilot.agent.planMode": true,
    "github.copilot.agent.autoApprove": false,
    "github.copilot.agent.terminalAccess": true
}
```

**Plan Mode**: When enabled, Agent shows you the plan before executing changes.

**Auto Approve**: If true, Agent executes without confirmation (not recommended for beginners).

### Mission Control

Access the Agent session dashboard:

- **Shortcut**: `Ctrl+Shift+M` (Windows/Linux) or `Cmd+Shift+M` (Mac)
- **Command Palette**: `GitHub Copilot: Open Mission Control`

Settings:
```json
{
    "github.copilot.missionControl.showProgress": true,
    "github.copilot.missionControl.notifications": true
}
```

### Next Edit Suggestions

Enable predictive editing that anticipates your next change:

```json
{
    "github.copilot.nextEditSuggestions": true,
    "github.copilot.nextEditSuggestions.syntaxHighlighting": true
}
```

### Linter Integration (Code Review)

Connect Copilot to your linting tools for smarter code review:

```json
{
    "github.copilot.codeReview.linterIntegration": true,
    "github.copilot.codeReview.showConfidenceScores": true,
    "github.copilot.codeReview.showRationale": true
}
```

### Image Input Support

Enable visual debugging with screenshots:

```json
{
    "github.copilot.chat.imageInput": true
}
```

Use case: Attach error screenshots, UI mockups, or architecture diagrams to Chat.

---

## Advanced Configuration Options

### Keyboard Shortcuts

| Action | VS Code | Visual Studio | JetBrains |
|--------|---------|---------------|-----------|
| Accept suggestion | Tab | Tab | Tab |
| Dismiss suggestion | Esc | Esc | Esc |
| Show next suggestion | Alt+] | Alt+Right | Alt+Right |
| Show previous suggestion | Alt+[ | Alt+Left | Alt+Left |
| Trigger inline suggestion | Alt+\ | Alt+\ | Alt+\ |
| Open Copilot panel | Ctrl+Shift+Alt+\ | Ctrl+Alt+\ | Alt+Shift+\ |

### Customizing Suggestion Behavior

1. **Suggestion Delay**:
   - Adjust how long Copilot waits before showing suggestions
   - Useful for balancing between immediate help and avoiding distraction

2. **Suggestion Confidence**:
   - Configure the threshold for when suggestions appear
   - Higher settings mean fewer but potentially more accurate suggestions

3. **Context Size**:
   - Adjust how much surrounding code Copilot considers
   - Larger context can lead to more relevant suggestions but may slow performance

## Privacy Settings

1. **Telemetry**:
   - Control what usage data is shared with GitHub
   - Settings → Extensions → GitHub Copilot → Telemetry Enabled

2. **Suggestion Collection**:
   - Toggle whether your accepted/rejected suggestions are collected to improve the service
   - Settings → Extensions → GitHub Copilot → Suggestion Collection Enabled

3. **Blocked Files**:
   - Specify files or patterns to exclude from Copilot analysis
   - Create a `.copilotignore` file (similar to `.gitignore`)

## Troubleshooting Common Issues

1. **No Suggestions Appearing**:
   - Verify Copilot is enabled
   - Check internet connection
   - Ensure your subscription is active
   - Try restarting your IDE

2. **Poor Quality Suggestions**:
   - Add more context through comments
   - Break complex problems into smaller parts
   - Try different phrasings in your comments

3. **Authentication Problems**:
   - Sign out and sign back in
   - Verify GitHub account permissions
   - Check for organization restrictions

## Demo Exercise: Optimizing Your Settings

1. Open your IDE and access Copilot settings
2. Adjust the settings based on your coding style:
   - Fast typists: Increase suggestion delay
   - Methodical coders: Decrease suggestion delay
3. Test different keyboard shortcuts to find what works best for your workflow
4. Create a `.copilotignore` file to exclude sensitive code

## Comparison with Business Settings

Individual settings are managed per user, while Business settings can be controlled at the organization level. Key differences:

- **Policy Management**: Business allows centralized policy enforcement
- **Audit Logging**: Business provides organization-wide activity logs
- **IP Ownership**: Different terms for code ownership
- **Private Repository Training**: Different handling of private code for model training 