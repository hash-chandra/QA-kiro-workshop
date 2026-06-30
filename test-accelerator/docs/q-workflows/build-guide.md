# Build from Scratch Guide

Step-by-step Amazon Q prompts to rebuild the entire project. Attach spec files as context.

## Spec Files

```
specs/
├── qe-playground-spec.md       # App tech stack, structure, credentials, requirements
└── test-accelerator-spec.md    # Framework structure, locator strategy, conventions
```

## Philosophy

**Spec files define design decisions. Amazon Q discovers everything else from source code.**

| We specify | Amazon Q discovers from source |
|---|---|
| Project structure & file layout | Actual `data-testid` selectors |
| Locator strategy priority | API endpoints, methods, query params |
| Playwright config settings | Required fields & validation schemas |
| Import conventions & code style | HTTP status codes & response shapes |
| Environment config shape | Seed data, credentials, task statuses |

---

## Phase 1: QE Playground (3 prompts)

### Prompt 1 — Backend

> **Attach**: `specs/qe-playground-spec.md`

```
As a Senior Full-Stack QA Engineer, create the complete Fastify backend
for "qe-playground": in-memory store with seed data, all API routes
(auth, tasks CRUD with filters, users CRUD, health, flaky /api/unstable),
session auth, CORS, validation, and error handling. Port 3000.
```

### Prompt 2 — Frontend

> **Attach**: `specs/qe-playground-spec.md`

```
Create the React + Vite frontend: API client module, LoginPage with
validation, DashboardPage with task table/search/filter/add/delete,
React Router with protected routes, navbar with logout.
data-testid on ALL interactive elements.
```

### Prompt 3 — Root wiring

> **Attach**: `specs/qe-playground-spec.md`

```
Create root package.json with install:all, dev, dev:server, dev:client
scripts using concurrently. Add README with setup and test credentials.
```

### ✅ Verify: `npm run install:all && npm run dev`

---

## Phase 2: Test Accelerator (3 prompts)

### Prompt 4 — Framework scaffold

> **Attach**: `specs/test-accelerator-spec.md`, `../qe-playground/server/src/store.js`

```
Create the Playwright + TypeScript project: playwright.config.ts with
UI and API projects, env config, custom fixtures (apiContext,
authedApiContext), all helpers (API, test-data, wait) with barrel exports.
```

### Prompt 5 — Page objects + UI tests

> **Attach**: `specs/test-accelerator-spec.md`, `../qe-playground/client/src/pages/`, `../qe-playground/client/src/components/`

```
Create page objects (BasePage, LoginPage, DashboardPage) and UI tests
(login.spec.ts, dashboard.spec.ts). Discover locators from the attached
source. Follow locator priority: getByTestId → getByRole → getByLabel.
```

### Prompt 6 — API tests + docs

> **Attach**: `specs/test-accelerator-spec.md`, `../qe-playground/server/src/routes/`, `../qe-playground/server/src/store.js`

```
Create all API tests (auth, tasks, users, health, unstable) and
.amazonq/rules/playwright-conventions.md. Discover endpoints, fields,
status codes from attached source.
```

### ✅ Verify: `npm install && npx playwright install && npm test`

---

## Tips

- Use `@` file references so Q has full context of existing patterns
- Verify each phase before moving to the next
- If a step fails, paste the error into Q and ask it to fix
- For complex pages, split into separate prompts: page object first, then tests
