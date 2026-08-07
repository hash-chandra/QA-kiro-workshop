# Example: Hook-Driven QA Workflow

Annotated walkthrough of setting up Kiro Hooks to create an automated quality pipeline during development.

---

## Scenario

You're developing tests actively and want automatic quality checks:
- Lint when you save a file
- Run affected tests when a spec file changes
- Verify conventions when new test files are created
- Run full suite after Spec tasks complete

---

## The Hook Pipeline

```
File Saved (.ts)          → ESLint runs automatically
Spec File Edited          → Relevant tests re-run
New Test Created          → Agent verifies conventions
Spec Task Completed       → Full test suite runs
Write Operation           → Agent reviews code quality
```

---

## Hook 1: Lint on Save

**What it does:** Runs ESLint every time a TypeScript file in `src/` or `tests/` is saved.

**How to create it:**

Prompt in Vibe session:
```
Create a Kiro hook that runs ESLint on every TypeScript file save 
in src/ and tests/ directories.
```

**Resulting hook file (.kiro/hooks/lint-on-save.json):**
```json
{
  "name": "Lint on Save",
  "version": "1.0.0",
  "description": "Runs ESLint when TypeScript files are saved",
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

**What happens:**
1. You edit `tests/ui/login.spec.ts` and save
2. Hook triggers → ESLint runs on the file
3. Auto-fixes formatting issues
4. You see lint output in the terminal

---

## Hook 2: Run Tests on Spec File Change

**What it does:** When you edit a `.spec.ts` file, runs that specific test file.

**How to create it:**

```
Create a hook that runs the related Playwright test when any .spec.ts 
file is edited. It should run just that test file, not the entire suite.
```

**Resulting hook:**
```json
{
  "name": "Run Affected Test",
  "version": "1.0.0",
  "description": "Runs the edited test file automatically",
  "when": {
    "type": "fileEdited",
    "patterns": ["tests/**/*.spec.ts"]
  },
  "then": {
    "type": "runCommand",
    "command": "npx playwright test --reporter=list"
  }
}
```

**What happens:**
1. You edit `tests/api/tasks.spec.ts` and save
2. Hook triggers → Playwright runs that test file
3. You see pass/fail immediately — no manual test run needed

---

## Hook 3: Convention Check on New Files

**What it does:** When a new test file is created, asks the agent to verify it follows conventions.

**How to create it:**

```
Create a hook that triggers when a new .spec.ts file is created.
It should ask the agent to verify the file follows our steering conventions.
```

**Resulting hook:**
```json
{
  "name": "Convention Check - New Test",
  "version": "1.0.0",
  "description": "Verifies new test files follow steering conventions",
  "when": {
    "type": "fileCreated",
    "patterns": ["tests/**/*.spec.ts"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "A new test file was just created. Review it against .kiro/steering/playwright-conventions.md. Check: correct imports (from fixtures, not @playwright/test), test.describe grouping, verb-first test names, proper locator strategy (getByTestId priority). If violations found, fix them immediately."
  }
}
```

**What happens:**
1. Kiro (or you) creates `tests/ui/signup.spec.ts`
2. Hook triggers → Agent reviews the new file
3. Agent checks imports, naming, locators, structure
4. If violations found → Agent auto-fixes them
5. Result: every new test file is convention-compliant from creation

---

## Hook 4: Post-Task Test Verification

**What it does:** After any Spec task completes, runs the full test suite to verify nothing broke.

**How to create it:**

```
Create a hook that runs the full Playwright test suite after any 
Spec task is marked as completed.
```

**Resulting hook:**
```json
{
  "name": "Verify After Task",
  "version": "1.0.0",
  "description": "Runs full test suite after Spec task completion",
  "when": {
    "type": "postTaskExecution"
  },
  "then": {
    "type": "runCommand",
    "command": "npx playwright test --reporter=list"
  }
}
```

**What happens:**
1. Kiro completes a Spec task (e.g., "Create login page object")
2. Hook triggers → Full test suite runs
3. If tests pass → Kiro moves to next task
4. If tests fail → Kiro sees the failure and debugs before continuing

---

## Hook 5: Review Write Operations

**What it does:** After Kiro writes to any file, the agent self-reviews for quality.

**How to create it:**

```
Create a hook that triggers after any write operation to .ts files.
Have the agent verify the code follows our conventions.
```

**Resulting hook:**
```json
{
  "name": "Self-Review Writes",
  "version": "1.0.0",
  "description": "Agent reviews its own code after writing",
  "when": {
    "type": "postToolUse",
    "toolTypes": ["write"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "Review the code you just wrote. Verify: 1) Follows .kiro/steering/ conventions, 2) No hardcoded values that should be configurable, 3) Proper error handling, 4) Imports are correct. If any issues, fix them now."
  }
}
```

---

## Full Pipeline in Action

Here's what happens during a typical Spec-driven development session with all hooks active:

```
1. You start a Spec session → "Add tests for user profile page"
2. Kiro plans: Requirements → Design → Tasks
3. Task 1: Create page object
   └── Kiro writes src/pages/profile.page.ts
   └── Hook 5 triggers: Agent self-reviews the write ✓
   └── Hook 1 triggers: ESLint runs on the new file ✓
4. Task 1 complete
   └── Hook 4 triggers: Full test suite runs → all pass ✓
5. Task 2: Create test spec  
   └── Kiro writes tests/ui/profile.spec.ts
   └── Hook 5 triggers: Agent self-reviews ✓
   └── Hook 3 triggers: New test convention check ✓
   └── Hook 1 triggers: ESLint runs ✓
6. Task 2 complete
   └── Hook 4 triggers: Full suite including new tests → all pass ✓
7. All tasks done → Verified, convention-compliant code
```

**Without hooks:** You'd manually run lint, manually run tests, manually check conventions after each step. Hooks make the quality pipeline automatic.

---

## Key Observations

| Hook Type | Value for QA |
|-----------|-------------|
| fileEdited → runCommand | Instant feedback on code quality |
| fileCreated → askAgent | Convention compliance from day one |
| postTaskExecution → runCommand | CI-like verification during development |
| postToolUse → askAgent | Self-correcting agent behavior |
| preToolUse → askAgent | Gate dangerous operations (optional) |

---

## When NOT to Use Hooks

- Don't create hooks that take minutes to run (slow feedback loop)
- Don't create circular hooks (Hook A triggers write → triggers Hook B → triggers write → ...)
- Don't hook every single event — start with the high-value ones
- Don't use `postToolUse` on `read` operations (too noisy)
- Start simple (2-3 hooks), add more as needed

---

## Recommended Starter Set for QA

If you're setting up hooks for the first time, start with these three:

1. **Lint on save** — catches formatting immediately
2. **Post-task test run** — verifies Spec tasks produce working code
3. **New file convention check** — ensures consistency without manual review

Add more as your workflow matures.
