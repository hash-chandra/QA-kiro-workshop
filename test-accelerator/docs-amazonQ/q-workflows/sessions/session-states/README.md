# Session Starting States

Each session is isolated — trainees start from a known working state. No rework between sessions.

---

## How It Works

Each session has a corresponding git branch (`session-N-start`) that contains exactly the state needed to begin that session. If a trainee falls behind or something breaks, they check out the branch and continue without losing time.

```bash
git checkout session-2-start   # start of Session 2
git checkout session-3-start   # start of Session 3
git checkout session-4-start   # start of Session 4
git checkout session-5-start   # start of Session 5
```

Session 1 needs no branch — it uses Q Chat only, no code.

---

## State Snapshots

### session-2-start

What exists:
- `qe-playground/` — empty (no server or client code)
- `test-accelerator/` — empty (no src, tests, or config)
- `docs/q-workflows/specs/` — both spec files present
- `.amazonq/rules/playwright-conventions.md` — present

What does NOT exist yet:
- Any app code
- Any framework code
- Any tests

---

### session-3-start

What exists:
- `qe-playground/` — fully built and running (server + client)
- `test-accelerator/src/helpers/` — api.helper.ts, test-data.helper.ts, wait.helper.ts, index.ts
- `test-accelerator/src/fixtures/base.fixture.ts` — apiContext and authedApiContext
- `test-accelerator/config/` — env.config.ts, base.config.ts
- `test-accelerator/playwright.config.ts`
- `test-accelerator/package.json` with all npm scripts

What does NOT exist yet:
- `src/pages/` — no page objects
- `tests/ui/` — no UI tests
- `tests/api/` — no API tests

Verify before starting:
```bash
cd qe-playground && npm run dev
# http://localhost:5173 should show the login page
```

---

### session-4-start

What exists:
- Everything from session-3-start
- `src/pages/base.page.ts` — BasePage
- `src/pages/login.page.ts` — LoginPage
- `src/pages/dashboard.page.ts` — DashboardPage
- `src/pages/index.ts` — barrel export
- `tests/ui/login.spec.ts` — login UI tests (passing)
- `tests/ui/dashboard.spec.ts` — dashboard UI tests (passing)

What does NOT exist yet:
- `tests/api/` — no API tests

Verify before starting:
```bash
cd test-accelerator && npm run test:ui-only
# All UI tests should pass
```

---

### session-5-start

What exists:
- Everything from session-4-start
- `tests/api/auth.spec.ts`
- `tests/api/tasks.spec.ts`
- `tests/api/users.spec.ts`
- `tests/api/health.spec.ts`
- `tests/api/unstable.spec.ts`

Some tests are intentionally left with minor issues (weak assertions, missing cleanup) for the debugging exercises in Session 5.

Verify before starting:
```bash
cd test-accelerator && npm test
# Most tests pass; note any failures — these are the debugging targets
```

---

## Creating the Branches (Trainer Setup)

Run this once before the training week to create all session branches:

```bash
# From the repo root

# session-2-start: clean slate
git checkout -b session-2-start
# Remove app and framework code, keep specs and rules
git rm -r qe-playground/client/src qe-playground/server/src test-accelerator/src test-accelerator/tests test-accelerator/config 2>/dev/null || true
git commit -m "session-2-start: clean slate for build demo"

# session-3-start: app built, framework scaffold only
git checkout main
git checkout -b session-3-start
git rm -r test-accelerator/src/pages test-accelerator/tests 2>/dev/null || true
git commit -m "session-3-start: app built, no page objects or tests"

# session-4-start: UI tests complete
git checkout main
git checkout -b session-4-start
git rm -r test-accelerator/tests/api 2>/dev/null || true
git commit -m "session-4-start: UI tests complete, no API tests"

# session-5-start: all tests exist, some with intentional issues
git checkout main
git checkout -b session-5-start
# Introduce deliberate weak assertions in tasks.spec.ts for debugging exercise
git commit -m "session-5-start: full suite with debugging targets"
```
