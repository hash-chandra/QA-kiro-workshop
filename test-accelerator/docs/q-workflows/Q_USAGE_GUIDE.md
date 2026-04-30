# Amazon Q Developer — QE Workflow Usage Guide

This guide explains how to use Amazon Q Developer effectively within the Playwright test automation accelerator. The goal is repeatable, prompt-driven workflows — not ad hoc usage.

---

## Prerequisites

1. Install the **Amazon Q Developer** extension in VS Code
2. Open this project as your workspace root
3. The `.amazonq/rules/playwright-conventions.md` file auto-injects framework conventions into every Q interaction — no manual setup needed

---

## How It Works

The accelerator includes three layers of Q integration:

| Layer | Location | Purpose |
|---|---|---|
| **Project Rules** | `.amazonq/rules/` | Auto-injected into every Q chat and inline request. Enforces POM, fixture, and helper conventions |
| **Prompt Templates** | `docs/q-workflows/` | Copy-paste-customize prompts for common QE tasks |
| **Documented Examples** | `docs/q-workflows/examples/` | Walkthroughs showing the prompt → generate → refine loop |

---

## Available Workflows

### 1. Generate UI Tests
**Template:** `docs/q-workflows/01-generate-ui-test.md`

Use when: You need a new UI test spec with a page object.

Workflow:
1. Copy the template prompt
2. Fill in page name, URL, elements, and scenarios
3. Reference existing files with `@` (e.g. `@src/pages/base.page.ts`)
4. Q generates the page object + test spec following POM conventions
5. Run the tests, then ask Q to refine any failures

### 2. Generate API Tests
**Template:** `docs/q-workflows/02-generate-api-test.md`

Use when: You need API test coverage for new endpoints.

Workflow:
1. Copy the template prompt
2. List the endpoints, methods, and expected behaviors
3. Reference `@tests/api/tasks.spec.ts` and `@src/helpers/api.helper.ts`
4. Q generates the test spec using `apiContext` fixture and `ApiHelper`
5. Run and refine

### 3. Debug & Refine Tests
**Template:** `docs/q-workflows/03-debug-and-refine.md`

Use when: A test is failing, flaky, or needs structural improvement.

Workflow:
1. Pick the relevant sub-prompt (debug failure, fix flaky, refine structure, improve assertions)
2. Paste the error output or describe the flaky behavior
3. Reference the failing test file with `@`
4. Q diagnoses the issue and applies fixes using framework utilities

### 4. Flaky Test Analysis
**Template:** `docs/q-workflows/04-flaky-test-analysis.md`

Use when: A test passes intermittently, especially on CI.

Workflow:
1. Copy the template and fill in pass/fail context (local vs CI, failure rate, error message)
2. Q analyzes for race conditions, timing issues, state leakage
3. Q applies fixes using `waitForNetworkIdle`, `retry`, web-first assertions

### 5. Generate Page Objects
**Template:** `docs/q-workflows/05-generate-page-object.md`

Use when: You need a standalone page object without a full test spec.

Workflow:
1. Copy the template and list the page elements and actions
2. Q generates a page object extending `BasePage`

---

## Tips for Effective Q Usage

- **Always use `@` file references** — Q produces dramatically better output when it can see your existing code patterns. Reference `@src/pages/base.page.ts`, `@tests/ui/login.spec.ts`, etc.

- **Split complex tasks** — Ask Q to generate the page object first, then the test spec. Two focused prompts beat one vague one.

- **Iterate: prompt → run → refine** — Generate code, run it, paste any errors back to Q. This loop is where Q adds the most value.

- **Don't repeat framework rules** — The `.amazonq/rules/` file handles that automatically. Focus your prompts on the specific task.

- **Be specific about scenarios** — "Generate tests for the login page" produces generic output. "Generate tests that verify: empty form shows validation, valid credentials redirect to dashboard" produces usable tests.

- **Use Q for assertion review** — After writing tests, ask Q to review and strengthen assertions. It catches missing validations consistently.

---

## File Reference

```
.amazonq/
└── rules/
    └── playwright-conventions.md    # auto-injected project rules

docs/q-workflows/
├── 01-generate-ui-test.md           # UI test generation prompt
├── 02-generate-api-test.md          # API test generation prompt
├── 03-debug-and-refine.md           # debugging & refinement prompts
├── 04-flaky-test-analysis.md        # flaky test analysis prompt
├── 05-generate-page-object.md       # page object generation prompt
└── examples/
    ├── ui-test-creation.md           # full UI test walkthrough
    └── api-test-improvement.md       # full API test walkthrough
```
