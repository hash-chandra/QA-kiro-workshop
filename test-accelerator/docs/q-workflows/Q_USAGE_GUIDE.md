# Amazon Q Developer — QE Workflow Usage Guide

How to use Amazon Q Developer effectively within the Playwright test automation accelerator.

---

## Prerequisites

1. Install the **Amazon Q Developer** extension in your IDE
2. Open this project as your workspace root
3. `.amazonq/rules/playwright-conventions.md` auto-injects conventions into every Q interaction

---

## Available Workflows

### 1. Generate UI Tests — [01-generate-ui-test.md](./01-generate-ui-test.md)

Use when: You need a new UI test spec with a page object.

1. Copy the template, fill in page name, URL, elements, scenarios
2. Reference existing files with `@` (e.g. `@src/pages/base.page.ts`)
3. Q generates page object + test spec
4. Run tests, ask Q to refine any failures

### 2. Generate API Tests — [02-generate-api-test.md](./02-generate-api-test.md)

Use when: You need API test coverage for new endpoints.

1. List endpoints, methods, expected behaviors
2. Reference `@tests/api/tasks.spec.ts` and `@src/helpers/api.helper.ts`
3. Q generates test spec using `apiContext` fixture and `ApiHelper`

### 3. Debug & Refine — [03-debug-and-refine.md](./03-debug-and-refine.md)

Use when: A test is failing, flaky, or needs structural improvement.

1. Pick the relevant sub-prompt (debug, fix flaky, refine, improve assertions)
2. Paste error output, reference failing test file with `@`
3. Q diagnoses and applies fixes

### 4. Flaky Test Analysis — [04-flaky-test-analysis.md](./04-flaky-test-analysis.md)

Use when: A test passes intermittently, especially on CI.

1. Fill in pass/fail context (local vs CI, failure rate, error message)
2. Q analyzes for race conditions, timing issues, state leakage
3. Q applies stability fixes

### 5. Generate Page Objects — [05-generate-page-object.md](./05-generate-page-object.md)

Use when: You need a standalone page object without a full test spec.

### 6. Build from Scratch — [build-guide.md](./build-guide.md)

Use when: Rebuilding the entire project from zero (6 prompts).

---

## Tips for Effective Q Usage

- **Always use `@` file references** — Q produces dramatically better output when it can see existing patterns
- **Split complex tasks** — page object first, then test spec. Two focused prompts beat one vague one
- **Iterate: prompt → run → refine** — this loop is where Q adds the most value
- **Don't repeat framework rules** — `.amazonq/rules/` handles that automatically
- **Be specific about scenarios** — "verify empty form shows validation error" beats "test the login page"
- **Use Q for assertion review** — it catches missing validations consistently

---

## File Reference

```
.amazonq/
└── rules/
    └── playwright-conventions.md    # auto-injected project rules

docs/q-workflows/
├── README.md                        # overview
├── build-guide.md                   # full project build (6 prompts)
├── 01-generate-ui-test.md           # UI test generation
├── 02-generate-api-test.md          # API test generation
├── 03-debug-and-refine.md           # debugging & refinement
├── 04-flaky-test-analysis.md        # flaky test analysis
├── 05-generate-page-object.md       # page object generation
├── examples/
│   ├── ui-test-creation.md          # full UI test walkthrough
│   └── api-test-improvement.md      # full API test walkthrough
└── specs/
    ├── qe-playground-spec.md        # app specification
    └── test-accelerator-spec.md     # framework specification
```
