# Session 1 — Kiro Fundamentals + Manual Testing

**Duration:** ~1 hour (slides + live demo)  
**Audience:** QA engineers experienced with AI tools (Copilot, Amazon Q) who want to learn Kiro  
**Goal:** Understand what Kiro is, its unique features vs other AI tools, and use it to accelerate manual testing workflows.

---

## Slide Deck Outline (15 min)

### What is AWS Kiro?

- AI-powered IDE built by AWS (standalone, NOT a VS Code extension)
- Built on VS Code technology — familiar editor experience
- Designed for agentic development: Kiro doesn't just suggest, it acts
- Works with your existing projects, languages, and tools

### Kiro's Two Session Types

| Session Type | Use When | How It Works |
|--------------|----------|--------------|
| **Vibe** | Exploratory work, quick tasks, Q&A | Conversational chat — ask questions, get code, iterate |
| **Spec** | Complex features, multi-file changes | Structured: Requirements → Design → Tasks → Implementation |

### Kiro's Two Autonomy Modes

| Mode | Behavior | Best For |
|------|----------|----------|
| **Autopilot** (default) | Kiro works end-to-end autonomously | Trusted tasks, scaffolding, generation |
| **Supervised** | Kiro pauses after each file edit for approval | Learning, reviewing, sensitive changes |

### Key Features for QA

| Feature | What It Does | QA Use Case |
|---------|-------------|-------------|
| Vibe Sessions | Chat-based interaction | Quick test generation, debugging, exploration |
| Specs Workflow | Requirements → design → tasks | Build test frameworks, plan test strategies |
| Steering Files | `.kiro/steering/*.md` — persistent project rules | Enforce coding conventions across all interactions |
| Hooks | Auto-trigger actions on IDE events | Run tests on save, lint before commit, validate writes |
| MCP Integration | Connect external tools (Playwright MCP) | Agent drives a real browser for test discovery |
| Sub-agents | Delegate complex tasks | Parallel test generation, codebase investigation |

### How Kiro Differs from Copilot and Amazon Q

| Capability | GitHub Copilot | Amazon Q | AWS Kiro |
|-----------|---------------|----------|----------|
| IDE model | Extension (VS Code/JetBrains) | Extension (VS Code/JetBrains) | Standalone IDE |
| Inline completion | ✅ | ✅ | ✅ |
| Chat | ✅ Copilot Chat | ✅ Q Chat | ✅ Vibe sessions |
| Agentic mode | ✅ (Agent mode) | ✅ (/dev, agents) | ✅ (Autopilot/Supervised) |
| Structured planning | ❌ | ❌ | ✅ Specs workflow |
| Persistent project rules | `.github/copilot-instructions.md` | `.amazonq/rules/` | `.kiro/steering/*.md` |
| Event-driven automation | ❌ | ❌ | ✅ Hooks |
| External tool integration | Limited MCP | Limited MCP | ✅ Full MCP support |
| Sub-agents | ❌ | ❌ | ✅ Specialized sub-agents |
| File context | `#file` / `@workspace` | `@file` references | `#File` / `#Folder` references |

### When to Use Kiro vs Other Tools

| Scenario | Recommended Tool |
|----------|-----------------|
| Quick inline code completion while typing | Copilot or Q (if already in VS Code) |
| Building a complete test framework from scratch | **Kiro** (Specs workflow) |
| Enforcing team conventions across all test files | **Kiro** (Steering files) |
| Auto-running tests when you save a file | **Kiro** (Hooks) |
| Generating tests with real browser discovery | **Kiro** (Playwright MCP) |
| Ad-hoc debugging, quick questions | Any (Kiro Vibe, Copilot Chat, Q Chat) |
| Multi-step feature development with planning | **Kiro** (Specs) |

### Kiro for Manual Testing — Why?

- Kiro reads your actual source code — it discovers features, validations, and edge cases from the implementation
- Unlike generic AI chat, Kiro has full project context via `#File` and `#Folder` references
- Steering files ensure consistent output format across the team
- Kiro can read API routes, UI components, and database schemas to derive test scenarios you'd miss manually

---

## Live Demo (45 min)

### Demo 1 — Tour of the Kiro IDE (8 min)

Walk through the Kiro interface:

1. **Open the workspace** in Kiro
2. **Chat panel** — show Vibe session type (default)
3. **Autonomy toggle** — show Autopilot vs Supervised mode
4. **File explorer** — same as VS Code
5. **Terminal** — integrated terminal
6. **Context references** — `#File`, `#Folder`, `#Problems`, `#Terminal`, `#Git Diff`

**Quick interaction:**
```
Explain the structure of this test-accelerator project.
What testing framework does it use and what patterns are implemented?
```

**Point out:** Kiro reads the actual files (show tool calls in output), provides actionable suggestions, not just descriptions.

### Demo 2 — Steering Files Introduction (7 min)

Show how steering files work:

```
Create a .kiro/steering/ directory with a playwright-conventions.md file
that defines our test automation standards:
- Use Page Object Model
- Locator priority: getByTestId > getByRole > getByLabel > CSS selectors
- Test names: lowercase, start with a verb
- Group tests with test.describe by feature area
- Import test/expect from src/fixtures/base.fixture
- Use helpers from src/helpers/ for test data and API calls
```

**Point out:** These conventions are now automatically applied to ALL future interactions — you never repeat them.

### Demo 3 — Generate Test Suite from Source Code (15 min)

Instead of pasting a spec, let Kiro discover from the actual source:

**Prompt:**
```
I am a QA engineer. Analyze these files:
- #File qe-playground/client/src/pages/LoginPage.jsx
- #File qe-playground/server/src/routes/auth.js
- #File qe-playground/server/src/store.js

Based on the actual implementation, generate a complete manual test suite 
for the Login feature. Cover:
1. Positive scenarios (valid flows)
2. Negative scenarios (invalid inputs, error handling)
3. Edge cases (boundary values, unusual states)
4. Security considerations

For each test case, provide:
| Test Case ID | Category | Title | Precondition | Steps | Expected Result | Priority |

Explain WHY each scenario matters based on what you found in the code.
```

**What to show the audience:**
- Kiro reads the actual source files (show tool calls)
- It discovers real validations (email format, password rules, error messages)
- It finds edge cases from the store (e.g., in-memory reset behavior)
- Compare its output vs what you'd write manually — note the gaps it catches

### Demo 4 — Coverage Gap Analysis (8 min)

**Prompt:**
```
Here are my current manual test cases for the Dashboard feature:

TC-001: User can view task list after login
TC-002: User can create a new task
TC-003: Search box filters tasks by title
TC-004: User can delete a task

Now look at #File qe-playground/client/src/pages/DashboardPage.jsx 
and #File qe-playground/server/src/routes/tasks.js

What test scenarios am I missing? Rank the gaps by risk (likelihood × impact).
```

### Demo 5 — Exploratory Charter + Bug Report (7 min)

**Prompt:**
```
I need a 30-minute exploratory testing session on the QE Playground dashboard.
Look at #Folder qe-playground/client/src/ to understand the feature set.

Generate an exploratory testing charter with:
- Mission statement
- Target areas to explore
- Risks to investigate
- Session notes template
```

**Follow-up (bug report):**
```
I found a bug. Rough notes:
"search box - typed 'fix' - table showed nothing but there are tasks 
with 'fix' in the title - refreshed page - tasks are there"

Write a professional bug report with: Title, Severity, Steps to Reproduce,
Expected vs Actual, Environment.
```

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| Kiro is a standalone IDE | Not an extension — download separately |
| Two session types | Vibe (chat) and Spec (structured planning) |
| Two autonomy modes | Autopilot (hands-off) and Supervised (approve each change) |
| Steering = persistent conventions | Define once in `.kiro/steering/`, applied always |
| Source-aware testing | Use `#File` — Kiro discovers real validations and edge cases |
| Context via `#` | `#File`, `#Folder`, `#Problems`, `#Terminal`, `#Git Diff` |

---

## Next Session

[Session 2 — Framework Scaffolding with Specs + Steering](./session-02-framework-scaffold-and-steering.md)
