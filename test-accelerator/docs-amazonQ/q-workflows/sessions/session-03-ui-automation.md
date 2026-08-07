# Session 3 — UI Test Automation with Amazon Q

**Duration:** 1 hour
**Audience:** Experienced QA engineers
**Goal:** Use Amazon Q to generate page objects and UI test specs. Q reads the app's source files — the same way you'd read a Jira ticket's AC — and decides what to test. You provide context, Q derives the scenarios.

---

## Starting State

Session 2 must be complete:
- `qe-playground` app is running (`npm run dev` in `qe-playground/`)
- `test-accelerator` framework scaffold exists (helpers, fixtures, config)
- No page objects or test specs yet

Verify:
```bash
ls test-accelerator/src/pages/    # should have base.page.ts only (or be empty)
ls test-accelerator/tests/ui/     # should be empty
```

If you need to catch up:
```bash
git checkout session-3-start
cd qe-playground && npm run dev   # keep this running in a separate terminal
```

---

## What You'll Learn

- How to generate a page object by pointing Q at the app's source code
- How Q derives test scenarios from source files — you don't list them
- The iterative loop: prompt → run → refine
- How `@` file references change Q's output quality

---

## Part 1 — Generate the Login Page Object (10 min)

### Prompt 1 — Login page object

> Attach: `specs/test-accelerator-spec.md`, `../qe-playground/client/src/pages/LoginPage.jsx`

```
Create a Playwright page object for the Login page.

Discover all interactive elements, data-testid values, and user actions
from the attached LoginPage.jsx source. Expose every meaningful user
interaction as an async method.

Follow the pattern in @src/pages/base.page.ts.
Place the file in src/pages/login.page.ts and add it to @src/pages/index.ts.
```

**Key observation:** Q reads `LoginPage.jsx` and finds the real `data-testid` values and all interactions — you listed nothing.

---

## Part 2 — Generate the Dashboard Page Object (10 min)

### Prompt 2 — Dashboard page object

> Attach: `specs/test-accelerator-spec.md`, `../qe-playground/client/src/pages/DashboardPage.jsx`, `../qe-playground/client/src/components/TaskForm.jsx`, `../qe-playground/client/src/components/Navbar.jsx`

```
Create a Playwright page object for the Dashboard page.

Discover all interactive elements, data-testid values, and user actions
from the attached source files. Expose every meaningful user interaction
as an async method, including task table interactions, search, filter,
task form, and navbar.

Follow the pattern in @src/pages/base.page.ts and @src/pages/login.page.ts.
Place the file in src/pages/dashboard.page.ts and add it to @src/pages/index.ts.
```

---

## Part 3 — Generate Login UI Tests (10 min)

### Prompt 3 — Login test spec

> Attach: `specs/test-accelerator-spec.md`, `../qe-playground/client/src/pages/LoginPage.jsx`, `@src/pages/login.page.ts`

```
Generate a comprehensive Playwright UI test spec for the Login page.

Analyse the attached LoginPage.jsx source and the LoginPage page object to
identify all testable scenarios — positive, negative, and edge cases.
Do not limit coverage to happy path only.

Use the existing framework:
- Import test/expect from src/fixtures/base.fixture
- Import LoginPage from src/pages
- Import TEST_USERS from src/helpers
- Use test.describe to group by scenario category
- Test names: lowercase, start with a verb

Place the spec in tests/ui/login.spec.ts.
```

**Verify:**
```bash
cd test-accelerator
npm run test:ui-only -- --grep "Login"
```

---

## Part 4 — Generate Dashboard UI Tests (10 min)

### Prompt 4 — Dashboard test spec

> Attach: `specs/test-accelerator-spec.md`, `../qe-playground/client/src/pages/DashboardPage.jsx`, `../qe-playground/client/src/components/TaskForm.jsx`, `@src/pages/dashboard.page.ts`, `@src/pages/login.page.ts`

```
Generate a comprehensive Playwright UI test spec for the Dashboard page.

Analyse the attached source files to identify all testable user flows —
positive, negative, and edge cases across search, filter, task creation,
task deletion, and navigation. All tests require login first — use
LoginPage and TEST_USERS.admin in beforeEach.

Use the existing framework:
- Import test/expect from src/fixtures/base.fixture
- Import LoginPage, DashboardPage from src/pages
- Import TEST_USERS from src/helpers
- Use test.describe to group by feature area

Place the spec in tests/ui/dashboard.spec.ts.
```

**Verify:**
```bash
npm run test:ui-only
```

If any tests fail, move to Part 5.

---

## Part 5 — Iterate: Refine a Failing Test (10 min)

Run the tests, pick a failure, paste it back to Q.

### Prompt 5 — Debug a failing UI test

```
This UI test is failing. Analyze the error and fix it.

Error output:
[PASTE THE FULL ERROR AND STACK TRACE HERE]

Reference @tests/ui/[failing-spec].ts for the test code.
Reference @src/pages/[relevant-page].ts for the page object.
```

### Prompt 5B — If a test is timing out

```
This test is timing out intermittently:

Test file: @tests/ui/dashboard.spec.ts
Failing test: "creates a new task — task appears in the table"
Error: Timeout waiting for element

The task form is submitted via an API call. The table updates after the response.
Apply a web-first assertion fix — do not use waitForTimeout.
```

---

## Discussion Points (5 min)

### Why `@` file references matter

Run Prompt 3 again without attaching `LoginPage.jsx`. Compare the output — Q will invent selector names and guess scenarios instead of reading the real source. This is the single biggest quality lever.

### The real-world parallel

In your project, the source files are replaced by Jira tickets and AC. The pattern is identical:
- Jira AC → paste into Q → Q derives test cases
- Source files → attach to Q → Q derives test cases and selectors

### The iterative loop

```
Attach source → Prompt → Run → Paste error back to Q → Fix → Run again
```

---

## Key Takeaways

- Attach source files — Q discovers selectors and derives scenarios, you list nothing
- Generate page object first, test spec second — two focused prompts beat one vague one
- Run tests immediately after generation — paste failures back to Q
- The `.amazonq/rules/` file means you never need to repeat framework conventions

---

## Session Wrap-Up

Login and Dashboard page objects exist. UI tests are passing.

Next session: [Session 4 — API Test Automation](./session-04-api-automation.md)
