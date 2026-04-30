# Quick Build Guide (6 Prompts)

Condensed version of the full build guide for users who prefer fewer prompts.
Same spec files, same result — just fewer steps.

For the detailed 17-step version, see [BUILD_FROM_SCRATCH_GUIDE.md](./BUILD_FROM_SCRATCH_GUIDE.md).

## Prerequisites

- Node.js 18+ installed
- IDE with Amazon Q extension
- Basic TypeScript/JavaScript knowledge

---

## Phase 1: QE Playground Application (3 prompts)

### Prompt 1 — Create the complete backend

> **Attach**: `specs/qe-playground-spec.md`

```
As a Senior Full-Stack QA Engineer, create the complete Fastify backend
for the "qe-playground" application based on the attached specification.

Include:
- Project scaffolding with package.json and TypeScript config
- In-memory data store with seed users (from test credentials in spec)
  and sample tasks with mixed statuses
- All API routes: auth (login/logout/me), tasks CRUD with query filters,
  users CRUD, health check, and the flaky /api/unstable endpoint
- Session-based authentication, CORS, validation, and proper error handling
- Server entry point listening on port 3000
```

### Prompt 2 — Create the complete frontend

> **Attach**: `specs/qe-playground-spec.md`

```
Create the complete React + Vite frontend for the "qe-playground"
application based on the attached specification.

Include:
- Vite + React + TypeScript project setup in client/ directory
- API client module with fetch wrappers for all HTTP methods
- LoginPage with email/password form, validation, error display,
  and redirect to dashboard on success
- DashboardPage with task table, search, status filter, add task
  form, and delete functionality
- React Router with protected routes, login at "/", dashboard at
  "/dashboard", and navbar with logout
- data-testid attributes on ALL interactive elements
```

### Prompt 3 — Wire up root project and verify

> **Attach**: `specs/qe-playground-spec.md`

```
Create the root package.json for "qe-playground" that ties the client
and server together using the scripts defined in the attached spec
(install:all, dev, dev:server, dev:client). Add a root README.md with
setup instructions and test credentials.
```

### ✅ Verify Phase 1

```bash
cd qe-playground
npm run install:all
npm run dev
# Server on http://localhost:3000, Client on http://localhost:5173
# Login with admin@playground.dev / admin123
```

---

## Phase 2: Test Accelerator Framework (3 prompts)

### Prompt 4 — Scaffold framework with config, fixtures, and helpers

> **Attach**: `specs/test-accelerator-spec.md`, `../qe-playground/server/src/store.js`

```
As a Senior Test Automation Engineer, create the "test-accelerator"
Playwright + TypeScript project based on the attached specification.

Include:
- playwright.config.ts with separate UI and API projects
- tsconfig.json, .env.example, package.json with all npm scripts
- Environment config in config/env.config.ts
- Custom fixtures in src/fixtures/base.fixture.ts (apiContext,
  authedApiContext) — discover credentials from attached store.js
- All helpers (API helper, test data helper, wait helper) with
  barrel export in src/helpers/index.ts
```

### Prompt 5 — Create page objects and UI tests

> **Attach**: `specs/test-accelerator-spec.md`, `../qe-playground/client/src/pages/LoginPage.jsx`, `../qe-playground/client/src/pages/DashboardPage.jsx`, `../qe-playground/client/src/components/TaskForm.jsx`, `../qe-playground/client/src/components/Navbar.jsx`

```
Create all page objects and UI tests for the test-accelerator framework.

Discover the actual locators and user flows by inspecting the attached
QE Playground source files. Follow the locator strategy priority in the
spec (getByTestId → getByRole → getByLabel → getByText).

Include:
- BasePage, LoginPage, DashboardPage in src/pages/ with barrel export
- tests/ui/login.spec.ts — comprehensive login tests (positive,
  negative, validation)
- tests/ui/dashboard.spec.ts — comprehensive dashboard tests (search,
  filter, add, delete tasks)
```

### Prompt 6 — Create API tests and documentation

> **Attach**: `specs/test-accelerator-spec.md`, `../qe-playground/server/src/routes/`, `../qe-playground/server/src/store.js`

```
Create all API tests and project documentation for the test-accelerator
framework.

Discover all endpoints, required fields, query params, status codes,
and response shapes from the attached server source files.

Include:
- tests/api/auth.spec.ts — login, logout, me endpoint tests
- tests/api/tasks.spec.ts — full CRUD + query filter + error tests
- tests/api/users.spec.ts — full CRUD + error tests
- tests/api/health.spec.ts — health check test
- tests/api/unstable.spec.ts — flaky endpoint test with retry logic
- .amazonq/rules/playwright-conventions.md with framework conventions
- README.md with setup and run instructions
```

### ✅ Verify Phase 2

```bash
cd test-accelerator
npm install
npx playwright install
npm test              # all tests should pass
npm run report        # view HTML report
```

---

## Quick Reference

| Spec File                        | Used In         |
|----------------------------------|-----------------|
| `specs/qe-playground-spec.md`    | Prompts 1–3     |
| `specs/test-accelerator-spec.md` | Prompts 4–6     |

## Tips

- Attach spec files using the **paperclip icon** or `@` mention in Amazon Q chat
- For Prompts 4–6, also attach the QE Playground source files listed above
- Verify Phase 1 before starting Phase 2
- If a prompt generates too much at once, break it into smaller pieces using the [detailed guide](./BUILD_FROM_SCRATCH_GUIDE.md)
