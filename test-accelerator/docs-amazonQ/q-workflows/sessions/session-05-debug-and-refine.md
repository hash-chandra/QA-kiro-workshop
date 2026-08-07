# Session 5 — Debug, Fix Flaky Tests, and Q Best Practices

**Duration:** 1 hour
**Audience:** Experienced QA engineers
**Goal:** Use Amazon Q to diagnose test failures, systematically fix flaky tests, refactor test structure, and apply advanced prompting patterns. Consolidate everything learned across the week.

---

## Starting State

Session 4 must be complete:
- All UI and API tests exist
- Some tests may be failing or flaky (intentional for this session)

Verify:
```bash
cd test-accelerator
npm test
# Note which tests fail or are intermittent
```

If you need to catch up:
```bash
git checkout session-5-start
cd qe-playground && npm run dev
```

---

## What You'll Learn

- How to diagnose a failing test using Q
- How to systematically fix flaky tests
- How to refactor test structure without breaking coverage
- Advanced Q prompting patterns that experienced engineers use
- How to use Q for ongoing maintenance, not just generation

---

## Part 1 — Debug a Failing Test (15 min)

Pick a failing test from your suite, or introduce one deliberately:

**To introduce a deliberate failure:** In `src/pages/dashboard.page.ts`, change one `getByTestId` selector to a wrong value (e.g. `'task-table-wrong'`). Run the tests and observe the failure.

### Prompt 1A — Diagnose and fix

```
This test is failing. Analyze the error and fix it.

Error output:
[PASTE THE FULL ERROR AND STACK TRACE HERE]

Reference @tests/ui/dashboard.spec.ts for the test code.
Reference @src/pages/dashboard.page.ts for the page object.
```

### Prompt 1B — If the error is a selector mismatch

```
The test is failing with "locator not found". The page object uses getByTestId('task-table-wrong')
but the actual data-testid in the app is different.

Reference @src/pages/dashboard.page.ts and @../qe-playground/client/src/pages/DashboardPage.jsx.
Find the correct data-testid value and fix the page object.
```

**Key observation:** Q cross-references the page object against the app source to find the mismatch. This is faster than manually inspecting the DOM.

---

## Part 2 — Fix a Flaky Test (15 min)

The `/api/unstable` endpoint and the task creation flow are good candidates for flakiness demos.

### Prompt 2A — Analyze for flakiness

```
Analyze this test for flakiness patterns and provide fixes.

Test file: @tests/ui/dashboard.spec.ts
Failing test: "creates a new task — task appears in the table"

Test results context:
- Passes locally: yes (most of the time)
- Passes on CI: no (fails ~40% of runs)
- Error message when it fails: "Timeout 5000ms exceeded waiting for expect(locator).toHaveText()"

Common flakiness causes to check:
1. Race conditions — actions before elements are ready
2. Network timing — API response not awaited before asserting
3. Animation/transition timing — table re-renders after form submit

Apply fixes using:
- Playwright web-first assertions (toBeVisible, toHaveText, toContainText)
- waitForNetworkIdle from src/helpers/wait.helper.ts if needed
- Avoid page.waitForTimeout

Reference @src/helpers/wait.helper.ts for available utilities.
```

### Prompt 2B — Systematic flaky test analysis

```
Analyze @tests/api/unstable.spec.ts for flakiness.

The /api/unstable endpoint has ~30% failure rate and 0–3s random delay.
The current test does not use retry logic.

Apply the retry utility from @src/helpers/wait.helper.ts to make the test
deterministic without masking real failures. The test should:
- Retry up to 3 times with 1s delay between attempts
- Fail if all retries are exhausted
- Pass if any attempt succeeds
```

---

## Part 3 — Refactor Test Structure (10 min)

### Prompt 3 — Refactor for maintainability

```
Refactor @tests/ui/dashboard.spec.ts to follow the accelerator's conventions.

Check for:
- Tests that instantiate page objects inside individual test cases instead of beforeEach
- Hardcoded credentials instead of TEST_USERS
- Missing test.describe grouping
- Tests that depend on execution order (shared mutable state)
- Assertions that use toBeTruthy instead of specific matchers

Reference @tests/ui/login.spec.ts for the target pattern.
Apply all fixes in one pass.
```

### Prompt 3B — Extract repeated setup

```
In @tests/ui/dashboard.spec.ts, the login + navigate to dashboard sequence
is repeated in multiple beforeEach blocks.

Extract this into a shared helper function in src/helpers/test-data.helper.ts
called loginAsAdmin(page) that returns a DashboardPage instance ready to use.

Reference @src/helpers/test-data.helper.ts for the existing pattern.
```

---

## Part 4 — Advanced Q Patterns (10 min)

These are the patterns that separate productive Q users from average ones.

### Pattern A — Ask Q to explain code you didn't write

Highlight the `authedApiContext` fixture in `src/fixtures/base.fixture.ts` and ask:

```
Explain what authedApiContext does and why it's structured this way.
What would break if we moved the login call to afterEach instead of the fixture setup?
```

### Pattern B — Ask Q to find missing test coverage

```
Review the test files in @tests/ui/ and @tests/api/ against the app's routes in
@../qe-playground/server/src/routes/ and pages in @../qe-playground/client/src/pages/.

List any user flows or API endpoints that have no test coverage.
Prioritize by risk: which gaps are most likely to cause production issues?
```

### Pattern C — Ask Q to generate test data variations

> Attach: `../qe-playground/server/src/routes/tasks.js`

```
Analyse the task creation endpoint in the attached route file.
Identify all boundary conditions and input constraints for the task fields.
Generate boundary-value and equivalence-partition test cases for each field.

Use the task creation API: POST /api/tasks
Reference @src/helpers/test-data.helper.ts for the existing data helpers.
```

### Pattern D — Ask Q to review for security test cases

> Attach: `../qe-playground/server/src/routes/`

```
Analyse the attached API routes and identify security risks.
Generate security-focused test cases for any vulnerabilities you find.
Format as a test case table with severity rating.
```

---

## Part 5 — Run the Full Suite and Review (5 min)

```bash
cd test-accelerator
npm test
npm run report
```

Open the HTML report. Walk through:
- Pass/fail breakdown
- Screenshots on failure
- Trace files for flaky tests

### Prompt — Interpret a test failure from the report

```
Here is a Playwright test failure from the HTML report:

[PASTE THE FAILURE DETAILS — test name, error, screenshot description]

What is the most likely root cause? What should I check first?
```

---

## Discussion: Q for Ongoing Maintenance

Q isn't just for generation. Here's how experienced engineers use it daily:

| Task | Q prompt pattern |
|------|-----------------|
| Selector broke after UI change | Paste error + attach new source file → Q finds the new selector |
| New endpoint added | Attach new route file → Q generates tests for it |
| Test suite is slow | Ask Q to identify parallelization opportunities |
| New team member onboarding | Ask Q to explain any file in plain language |
| Regression after refactor | Paste diff + failing test → Q identifies the breaking change |

---

## Key Takeaways

| Skill | What you practiced |
|-------|--------------------|
| Debugging | Paste error + reference files → Q diagnoses and fixes |
| Flaky test analysis | Describe CI vs local behavior → Q applies stability patterns |
| Refactoring | Ask Q to enforce conventions → consistent codebase |
| Coverage gaps | Ask Q to compare tests vs source → prioritized gap list |
| Advanced patterns | Explain, review, generate variations, security cases |

---

## Week Wrap-Up

| Session | What you built |
|---------|---------------|
| 1 | Test cases, exploratory charters, bug reports — all with Q |
| 2 | Full-stack app + Playwright framework scaffold — 4 prompts |
| 3 | Login + Dashboard page objects + UI test specs |
| 4 | Auth, Tasks, Users, Health, Unstable API tests |
| 5 | Debugging, flaky fixes, refactoring, advanced patterns |

### The core loop

```
Attach context → Prompt → Run → Paste result back → Refine
```

This loop works for generation, debugging, refactoring, and review. The more context you give Q (spec files, source files, error output), the better the output.

### What to do next

- Apply these patterns to your own project's test suite
- Create a spec file for your app (like `qe-playground-spec.md`) — this is the highest-leverage investment
- Add `.amazonq/rules/` conventions for your framework
- Use Q for test case design (Session 1 patterns) before writing any automation
