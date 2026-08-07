# Session 2 — Build the App and Framework with Amazon Q

**Duration:** 1 hour
**Audience:** Experienced QA engineers
**Goal:** Use Amazon Q to generate the full QE Playground app and the Playwright framework scaffold from spec files. Understand how Q uses context to produce production-quality code.

---

## Starting State

Fresh repo. Nothing built yet.

Verify:
```bash
ls qe-playground/client/src/    # should be empty or minimal
ls test-accelerator/src/        # should be empty or minimal
```

If you completed Session 1 and the repo already has code, reset to the baseline:
```bash
git checkout session-2-start
```

---

## What You'll Learn

- How spec files give Q the context it needs to generate accurate code
- How to build a full-stack app with 3 prompts
- How to scaffold a Playwright framework with 1 prompt
- The difference between what you specify vs. what Q discovers from source

---

## The Spec Files

Two files define all design decisions. Q discovers everything else from source code.

| Spec file | What it defines |
|-----------|----------------|
| [`specs/qe-playground-spec.md`](../specs/qe-playground-spec.md) | App tech stack, routes, credentials, data-testid requirements |
| [`specs/test-accelerator-spec.md`](../specs/test-accelerator-spec.md) | Framework structure, locator strategy, fixture patterns, import conventions |

Open both files and read them before running any prompts. These are the single source of truth.

---

## Phase 1 — Build the QE Playground App (3 prompts, ~25 min)

### Prompt 1 — Backend

> Attach: `specs/qe-playground-spec.md`

```
As a Senior Full-Stack QA Engineer, create the complete Fastify backend
for "qe-playground": in-memory store with seed data, all API routes
(auth, tasks CRUD with filters, users CRUD, health, flaky /api/unstable),
session auth, CORS, validation, and error handling. Port 3000.
```

**What Q will generate:**
- `server/src/store.js` — in-memory data store with seeded users and tasks
- `server/src/routes/` — auth, tasks, users, health, unstable route files
- `server/src/index.js` — Fastify server entry point
- `server/package.json`

**Verify:**
```bash
cd qe-playground/server && npm install && npm run dev
curl http://localhost:3000/api/health
# Expected: {"status":"ok"}
```

---

### Prompt 2 — Frontend

> Attach: `specs/qe-playground-spec.md`

```
Create the React + Vite frontend: API client module, LoginPage with
validation, DashboardPage with task table/search/filter/add/delete,
React Router with protected routes, navbar with logout.
data-testid on ALL interactive elements.
```

**What Q will generate:**
- `client/src/api/client.js` — fetch wrappers
- `client/src/pages/LoginPage.jsx` — login form with validation
- `client/src/pages/DashboardPage.jsx` — task table, search, filter, add, delete
- `client/src/components/Navbar.jsx`, `TaskForm.jsx`
- `client/package.json`

**Verify:**
```bash
cd qe-playground/client && npm install && npm run dev
# Open http://localhost:5173
# Login: admin@playground.dev / admin123
```

Check that every interactive element has a `data-testid`. Open DevTools → inspect the login button — it should have `data-testid="login-button"`.

---

### Prompt 3 — Root wiring

> Attach: `specs/qe-playground-spec.md`

```
Create root package.json with install:all, dev, dev:server, dev:client
scripts using concurrently. Add README with setup and test credentials.
```

**Verify:**
```bash
cd qe-playground
npm run install:all
npm run dev
# Both server (3000) and client (5173) should start
```

---

## Phase 2 — Scaffold the Test Framework (1 prompt, ~15 min)

### Prompt 4 — Framework scaffold

> Attach: `specs/test-accelerator-spec.md`, `../qe-playground/server/src/store.js`

```
Create the Playwright + TypeScript project: playwright.config.ts with
UI and API projects, env config, custom fixtures (apiContext,
authedApiContext), all helpers (API, test-data, wait) with barrel exports.
```

**What Q will generate:**
- `playwright.config.ts` — UI and API test projects
- `config/env.config.ts` — centralized environment config
- `src/fixtures/base.fixture.ts` — apiContext and authedApiContext fixtures
- `src/helpers/api.helper.ts`, `test-data.helper.ts`, `wait.helper.ts`, `index.ts`
- `package.json` with all npm scripts

**Verify:**
```bash
cd test-accelerator
npm install
npx playwright install chromium
npx tsc --noEmit
# No TypeScript errors
```

---

## Discussion Points (10 min)

### Why spec files matter

See the full breakdown in [prompts/build-guide.md](../prompts/build-guide.md#philosophy) — the Philosophy table shows exactly what we specify vs. what Q discovers from source.

### The `.amazonq/rules/` file

Open `.amazonq/rules/playwright-conventions.md`. This file is auto-injected into every Q interaction in this project. Trainees don't need to repeat framework rules in every prompt — Q already knows them.

### What makes a good spec file

- Defines decisions that can't be discovered from code (structure, strategy, conventions)
- Does NOT over-specify implementation details — let Q figure those out
- Stays in sync with the actual codebase

---

## Key Takeaways

- 3 prompts built a full-stack app with auth, CRUD, and test-friendly attributes
- 1 prompt scaffolded a complete Playwright framework with fixtures and helpers
- Spec files are the investment — the more precise they are, the better Q's output
- Q discovers selectors, endpoints, and data shapes from source — you don't need to list them

---

## Session Wrap-Up

The app is running. The framework scaffold exists. No tests yet.

Next session: [Session 3 — UI Test Automation with Page Objects](./session-03-ui-automation.md)
