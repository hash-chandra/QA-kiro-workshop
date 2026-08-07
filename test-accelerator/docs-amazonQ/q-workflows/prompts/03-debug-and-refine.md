# Prompt: Debug & Refine Tests

Use these prompts with Amazon Q to diagnose test failures, fix flaky tests, and refine existing test code.

---

## Debug a Failing Test

```
This test is failing. Analyze the error and fix it.

Error output:
[PASTE ERROR OUTPUT HERE]

Reference @tests/[path-to-failing-spec] for the test code.
Reference @src/pages/[relevant-page].ts if it's a UI test.
```

### Tips
- Paste the full error including the stack trace — Q uses line numbers to pinpoint the issue
- Use `@` to reference the failing test file so Q sees the actual code
- If the failure is intermittent, mention that — Q will suggest stability patterns like `waitFor` or retry logic

---

## Fix a Flaky Test

```
This test passes intermittently. Analyze it for flakiness and apply stability fixes.

Test file: @tests/[path-to-spec]
Flaky behavior: [DESCRIBE WHAT HAPPENS — e.g. "element not found on slow networks", "timing out on CI"]

Apply fixes using:
- Playwright auto-waiting and web-first assertions (toBeVisible, toHaveText)
- waitForNetworkIdle or retry from src/helpers/wait.helper.ts if needed
- Avoid hard-coded waits (page.waitForTimeout)

Reference @src/helpers/wait.helper.ts for available utilities.
```

---

## Refine Test Structure

```
Refactor this test file to follow the accelerator's conventions.

Test file: @tests/[path-to-spec]

Ensure:
- Uses Page Object Model (page object in src/pages/ extending BasePage)
- Imports test/expect from src/fixtures/base.fixture
- Uses test.describe grouping
- Uses Playwright built-in locators (getByRole, getByText, getByLabel, getByTestId)
- No hardcoded URLs — uses page object navigate methods

Reference @src/pages/login.page.ts and @tests/ui/login.spec.ts for the target pattern.
```

---

## Improve Assertions

```
Review this test and strengthen the assertions.

Test file: @tests/[path-to-spec]

Look for:
- Missing assertions (actions without verification)
- Weak assertions (toBeTruthy instead of specific checks)
- Missing negative test cases
- Response body shape validation (for API tests)
```
