# Session 4 — Debugging, Refactoring & Hooks

**Duration:** ~1 hour (slides + live demo)  
**Audience:** QA engineers learning Kiro  
**Goal:** Use Kiro to debug test failures, refactor test code, and set up Hooks for automated quality gates. This completes the core workflow: build → test → debug → automate.

---

## Slide Deck Outline (15 min)

### Debugging with Kiro — The Context Advantage

| Generic AI debugging | Kiro debugging |
|---------------------|----------------|
| You copy-paste error messages | Kiro reads `#Terminal` and `#Problems` directly |
| You describe the file structure | Kiro explores the codebase |
| Guesses at the cause | Reads actual source, test, AND app code |
| Suggests generic fixes | Applies the fix and re-runs to verify |

### Kiro Debugging Workflow

```
1. Test fails → Kiro reads #Terminal for the error
2. Kiro reads the test file + source code
3. Kiro identifies root cause (not symptoms)
4. Kiro applies fix (Autopilot) or proposes (Supervised)
5. Kiro can re-run to verify
```

### Hooks — Automated Quality Gates

Hooks trigger actions automatically on IDE events. Think of them as your personal CI that runs locally, instantly.

| Event | Use Case |
|-------|----------|
| `fileEdited` | Run linter when a test file is saved |
| `fileCreated` | Verify new files follow conventions |
| `postToolUse` (write) | Agent self-reviews code quality |
| `postTaskExecution` | Run tests after Spec task completes |
| `userTriggered` | Manual "run tests" button |

**Hook structure:**
```json
{
  "name": "Hook Name",
  "version": "1.0.0",
  "when": {
    "type": "event type",
    "patterns": ["file patterns"]
  },
  "then": {
    "type": "runCommand or askAgent",
    "command": "command to run"
  }
}
```

**Two action types:**
- `runCommand` — executes a shell command (lint, test, build)
- `askAgent` — sends a prompt to Kiro (review, fix, verify)

---

## Live Demo (45 min)

### Demo 1 — Debug a Failing Test (12 min)

**Setup:** Run tests (or intentionally break one):

```bash
npm run test:headed
```

**Prompt (after failure):**
```
Look at #Terminal — the test "dashboard > creates a new task" is failing.

Also look at:
- #File tests/ui/dashboard.spec.ts
- #File src/pages/dashboard.page.ts
- #File qe-playground/client/src/pages/DashboardPage.jsx

Identify the root cause and fix it. Explain what went wrong and why.
```

**What to show:**
- Kiro reads the terminal output (actual error + stack trace)
- Cross-references test code AND app source
- Identifies whether issue is: wrong selector, timing, app behavior, or test logic
- Applies fix directly in Autopilot

**Flaky test analysis:**
```
This test passes sometimes and fails other times:
#File tests/api/unstable.spec.ts

Analyze why it's flaky. Consider: race conditions, timing, 
network variability, shared state. Propose a robust fix.
```

### Demo 2 — Refactor Test Code (10 min)

**Prompt — Extract common patterns:**
```
Look at #File tests/ui/login.spec.ts and #File tests/ui/dashboard.spec.ts.

Both files repeat the login setup. Refactor to:
1. Create a shared beforeEach that handles authentication
2. Keep tests focused on their actual assertions
3. Maintain test independence

Follow our conventions in .kiro/steering/playwright-conventions.md.
```

**Prompt — Upgrade locators:**
```
Look at #Folder tests/ and #Folder src/pages/

Find any tests using CSS class selectors or fragile locators.
Refactor to our locator priority: getByTestId > getByRole > getByLabel.

If a getByTestId doesn't exist in the app source, list what 
data-testid attributes should be added.
```

### Demo 3 — Create Hooks (15 min)

**Hook 1 — Lint on save:**
```
Create a Kiro hook that runs ESLint every time a TypeScript file 
in tests/ or src/ is saved.
```

Expected result:
```json
{
  "name": "Lint on Save",
  "version": "1.0.0",
  "when": {
    "type": "fileEdited",
    "patterns": ["src/**/*.ts", "tests/**/*.ts"]
  },
  "then": {
    "type": "runCommand",
    "command": "npx eslint --fix"
  }
}
```

**Hook 2 — Post-task test verification:**
```
Create a hook that runs the full Playwright test suite after any 
Spec task is marked as completed.
```

Expected result:
```json
{
  "name": "Verify After Task",
  "version": "1.0.0",
  "when": {
    "type": "postTaskExecution"
  },
  "then": {
    "type": "runCommand",
    "command": "npx playwright test --reporter=list"
  }
}
```

**Hook 3 — Convention check on new test files:**
```
Create a hook that triggers when a new .spec.ts file is created.
It should ask the agent to verify it follows our steering conventions.
```

Expected result:
```json
{
  "name": "New Test Convention Check",
  "version": "1.0.0",
  "when": {
    "type": "fileCreated",
    "patterns": ["tests/**/*.spec.ts"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "A new test file was created. Verify it follows .kiro/steering/playwright-conventions.md: correct imports, test.describe grouping, verb-first names, proper locators. Fix any issues."
  }
}
```

**Show hooks in action:**
1. Save a test file → linter runs automatically
2. Create a new spec → convention check runs
3. Complete a Spec task → tests run

**Point out:** These create a safety net — bad code is caught immediately without manual effort.

### Demo 4 — The Complete Workflow (8 min)

Show how everything connects — the full pipeline a QA engineer uses daily:

```
1. Steering defines conventions         → .kiro/steering/
2. Specs plan complex work              → Spec session
3. Kiro implements with conventions     → Code generated
4. Hooks verify automatically           → Tests run, lint runs
5. Failures feed back to Kiro           → #Terminal → fix
6. Code stays consistent and tested     → Quality maintained
```

**Quick demo of the cycle:**
1. Start a small Spec task
2. Kiro generates code → Hook runs linter → Hook runs tests
3. If test fails → Kiro sees it and fixes
4. All green → done

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| `#Terminal` + `#Problems` | Kiro reads actual error output — no copy-pasting |
| Root cause, not symptoms | Kiro cross-references test + source + app code |
| Steering guides refactoring | Conventions maintained during restructuring |
| Hooks = automatic quality gates | Lint, test, and review on every change |
| Hooks + Specs = CI-like safety | Post-task hooks verify each implementation step |
| `askAgent` hooks for reviews | Agent can self-correct after writing code |

---

## Hook Templates for QA Teams

### Starter Set (recommended)

| Hook | Event | Action | Purpose |
|------|-------|--------|---------|
| Lint on Save | `fileEdited` (*.ts) | `runCommand`: eslint | Catch formatting immediately |
| Test After Task | `postTaskExecution` | `runCommand`: playwright test | Verify Spec steps work |
| Convention Check | `fileCreated` (*.spec.ts) | `askAgent`: verify conventions | Consistency from creation |

### Advanced (add as needed)

| Hook | Event | Action | Purpose |
|------|-------|--------|---------|
| Self-Review | `postToolUse` (write) | `askAgent`: review code | Agent catches its own mistakes |
| Pre-Write Gate | `preToolUse` (write) | `askAgent`: verify approach | Stop bad writes before they happen |
| Full Suite on Stop | `agentStop` | `runCommand`: npm test | Final verification after agent work |

---

## Debugging Prompt Templates

### General Failure
```
Look at #Terminal — [test name] is failing.
Check #File [test] and #File [source]. Fix it.
```

### Flaky Test
```
This test is flaky: #File [test file]
Analyze for race conditions, timing, shared state. Fix robustly.
```

### Bulk Failures
```
Look at #Terminal — multiple tests failing after [change].
Same root cause? Config issue? Selector change? Fix all.
```

### Refactoring
```
Look at #Folder [folder] — identify duplication and convention violations.
Refactor while maintaining coverage.
```

---

## Workshop Complete! 🎉

You've covered the core Kiro workflow for QA:

| Session | What You Learned |
|---------|-----------------|
| 1 — Fundamentals + Manual | Kiro features, manual test generation from source |
| 2 — Framework + Steering | Specs workflow, steering files, building frameworks |
| 3 — UI & API Automation | Test generation, page objects, API coverage from routes |
| 4 — Debug + Hooks | Fix failures, refactor, automated quality pipeline |

---

## Next Steps

- [Session 5 — Q&A + Open Lab](./session-05-qa-and-open-lab.md) — bring your questions and projects
- [Advanced Session (Optional)](./session-advanced-mcp-subagents.md) — MCP, Sub-agents, Spec at scale
