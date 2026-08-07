# Session 5 — Q&A + Open Lab

**Duration:** ~1 hour  
**Audience:** Workshop participants  
**Goal:** Answer questions, clarify concepts, and optionally do hands-on work with participants' own projects or deeper exploration of workshop topics.

---

## Format

This session is flexible. Structure based on the audience:

| Time | Activity |
|------|----------|
| 0–20 min | Open Q&A — questions from Sessions 1–4 |
| 20–40 min | Live problem-solving — participants bring scenarios |
| 40–55 min | Hands-on lab OR deeper demo on requested topics |
| 55–60 min | Wrap-up, next steps, resources |

---

## Facilitator Prep

### Common Questions to Prepare For

**Kiro General:**
- "How is Kiro priced?" → Check latest at kiro.dev
- "Does Kiro work with our existing repo without changes?" → Yes, it's a standalone IDE
- "Can we use Kiro alongside VS Code?" → Yes, different IDEs for different purposes
- "What languages/frameworks does Kiro support?" → All (TypeScript, Python, Java, etc.)
- "Is our code sent to the cloud?" → Explain Kiro's privacy/data model

**QA-Specific:**
- "Can Kiro work with Selenium/Cypress instead of Playwright?" → Yes, same approach with different steering
- "How does Kiro handle our proprietary components/selectors?" → Steering + source discovery
- "Can it integrate with TestRail/Jira/Xray?" → Via prompts for format export, MCP for integrations
- "How do we enforce Kiro conventions across a team?" → Steering files in the repo = team-wide standards
- "What about visual testing / accessibility / performance?" → See Advanced Session

**Technical:**
- "How do steering files differ from Amazon Q rules?" → Inclusion modes, richer markdown, conditional
- "Can hooks run our CI pipeline locally?" → Yes, any command you can run in terminal
- "What's the difference between preToolUse and postToolUse hooks?" → Before vs after, gate vs review
- "How do sub-agents work?" → Specialized Kiro instances for delegated tasks

---

## Live Problem-Solving Scenarios

If participants don't have their own questions, use these:

### Scenario A — "Bring Your Own Spec"

```
Ask a participant to describe a feature they're testing.
Live-code the test generation workflow:
1. Open the relevant files
2. Use Vibe session to generate test cases
3. Show the iteration when things aren't perfect
```

### Scenario B — "Debug Together"

```
Intentionally break a test in the demo project.
Walk through the debugging process collaboratively:
1. Run the test → see failure
2. Ask the group: "What would you check?"
3. Show how Kiro approaches it with full context
```

### Scenario C — "Build a Hook Pipeline"

```
Ask participants what quality checks they want automated.
Build the hooks live based on their suggestions:
- "We want to check test naming conventions" → fileCreated hook
- "We want to run related tests on save" → fileEdited hook
- "We want a summary after each Spec task" → postTaskExecution hook
```

### Scenario D — "Convert Existing Tests"

```
If a participant has Selenium/Cypress tests, show how Kiro can help migrate:
1. Reference the existing test file
2. Ask Kiro to convert to Playwright following steering conventions
3. Show the output and discuss what needed manual adjustment
```

---

## Hands-On Lab Options (pick based on audience interest)

### Lab 1: Generate Tests for Your App
Participants use Kiro to generate test cases for their own project:
- Bring a component or API route
- Use the prompt templates from the workshop
- Compare Kiro's output with their existing coverage

### Lab 2: Set Up Steering for Your Team
Walk participants through creating steering files for their specific:
- Framework (Playwright, Cypress, Selenium)
- Conventions (naming, structure, patterns)
- Project structure

### Lab 3: Hook Configuration
Participants create hooks for their workflow:
- Lint on save
- Test on spec change
- Convention enforcement

---

## Wrap-Up (5 min)

### Resources

| Resource | Location |
|----------|----------|
| Workshop materials | `test-accelerator/docs-kiro/` |
| Reusable prompt templates | `docs-kiro/prompts/` |
| Example steering file | `docs-kiro/steering/playwright-conventions.md` |
| Hook examples | `docs-kiro/examples/hook-driven-workflow.md` |
| Spec workflow example | `docs-kiro/examples/spec-driven-test-creation.md` |
| Kiro documentation | [kiro.dev/docs](https://kiro.dev/docs) |
| Advanced session | `docs-kiro/sessions/session-advanced-mcp-subagents.md` |

### Day-to-Day Workflow Recommendation

```
Daily work:          Vibe sessions (quick tests, fixes, questions)
New features:        Spec sessions (planned, multi-file)
Team conventions:    Steering files (define once, always enforced)
Quality gates:       Hooks (lint, test, review on every change)
Complex tasks:       Advanced session topics (MCP, sub-agents)
```

### Feedback

- What was most valuable?
- What would you like more depth on?
- Any concerns about adopting Kiro in your workflow?
- Interest in the Advanced Session (MCP, Sub-agents, Spec at scale)?

---

## For Advanced Topics

If participants want more, direct them to:
[Advanced Session — MCP, Sub-agents & Spec at Scale](./session-advanced-mcp-subagents.md)
