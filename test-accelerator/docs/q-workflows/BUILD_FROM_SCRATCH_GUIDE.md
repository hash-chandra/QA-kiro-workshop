# Build QE Playground + Test Accelerator from Scratch

Step-by-step Amazon Q prompts to build the entire project from scratch.
Requirements live in the `specs/` folder — attach them as context when prompted.

## Prerequisites

- Node.js 18+ installed
- IDE with Amazon Q extension
- Basic TypeScript/JavaScript knowledge

---

## Phase 1: QE Playground Application

### Step 1 — Scaffold the full-stack project

> **Attach**: `specs/qe-playground-spec.md`

```
As a Senior Full-Stack QA Engineer, create the "qe-playground" application
based on the attached specification. Include the complete project structure,
all dependencies, and root package.json scripts.
```

### Step 2 — Create the data store and seed data

> **Attach**: `specs/qe-playground-spec.md`

```
Create the in-memory data store in server/src/store.ts with seed users
(using the test credentials from the spec), sample tasks with mixed
statuses, and helper functions for CRUD operations on both entities.
```

### Step 3 — Build authentication routes

> **Attach**: `specs/qe-playground-spec.md`

```
Create authentication routes (login, logout, me) in the Fastify server.
Use session cookies for auth state. Include proper validation and error
handling.
```

### Step 4 — Build tasks CRUD routes

> **Attach**: `specs/qe-playground-spec.md`

```
Create tasks CRUD routes in the Fastify server with support for query
filters (status, assignee, search). Include validation and proper error
responses.
```

### Step 5 — Build users CRUD routes

> **Attach**: `specs/qe-playground-spec.md`

```
Create users CRUD routes in the Fastify server with validation for
required fields and proper error responses.
```

### Step 6 — Build utility endpoints

> **Attach**: `specs/qe-playground-spec.md`

```
Create the health check and unstable (flaky) endpoints as described
in the attached spec.
```

### Step 7 — Create the React client with API module

> **Attach**: `specs/qe-playground-spec.md`

```
Set up the React + Vite client with React Router and create the API
client module with fetch wrappers. Follow the project structure in
the attached spec.
```

### Step 8 — Build the Login page

> **Attach**: `specs/qe-playground-spec.md`

```
Create the LoginPage component with email/password form, validation,
error display, and redirect to dashboard on success. Add data-testid
attributes on all interactive elements.
```

### Step 9 — Build the Dashboard page

> **Attach**: `specs/qe-playground-spec.md`

```
Create the DashboardPage component with task table, search, status
filter, add task form, and delete functionality. Add data-testid
attributes on all interactive elements.
```

### Step 10 — Set up routing and navigation

> **Attach**: `specs/qe-playground-spec.md`

```
Set up React Router with protected routes, login at "/", dashboard
at "/dashboard", and a navbar with logout.
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

## Phase 2: Test Accelerator Framework

### Step 11 — Scaffold the Playwright project

> **Attach**: `specs/test-accelerator-spec.md`

```
As a Senior Test Automation Engineer, create the "test-accelerator"
Playwright + TypeScript project based on the attached specification.
Include playwright.config.ts with separate UI and API projects,
tsconfig.json, .env.example, and all npm scripts.
```

### Step 12 — Create environment config and helpers

> **Attach**: `specs/test-accelerator-spec.md`, `../qe-playground/server/src/store.js`

```
Create the environment config (config/env.config.ts), API helper,
test data helper, and wait helper following the spec. Discover test
credentials from the attached store.js. Include barrel exports in
src/helpers/index.ts.
```

### Step 13 — Create custom test fixtures

> **Attach**: `specs/test-accelerator-spec.md`

```
Create the custom Playwright fixtures in src/fixtures/base.fixture.ts
with apiContext and authedApiContext as described in the attached spec.
Export custom test and expect.
```

### Step 14 — Create page objects

> **Attach**: `specs/test-accelerator-spec.md`, `../qe-playground/client/src/pages/LoginPage.jsx`, `../qe-playground/client/src/pages/DashboardPage.jsx`, `../qe-playground/client/src/components/TaskForm.jsx`, `../qe-playground/client/src/components/Navbar.jsx`

```
Create BasePage, LoginPage, and DashboardPage in src/pages/. Discover
the actual locators and needed action methods by inspecting the attached
QE Playground source files. Follow the locator strategy priority in the
spec. Include barrel export in src/pages/index.ts.
```

### Step 15 — Create UI tests

> **Attach**: `specs/test-accelerator-spec.md`, `../qe-playground/client/src/pages/LoginPage.jsx`, `../qe-playground/client/src/pages/DashboardPage.jsx`, `../qe-playground/client/src/components/TaskForm.jsx`

```
Create UI test files (login.spec.ts, dashboard.spec.ts) in tests/ui/.
Discover all testable user flows from the attached QE Playground
components and write comprehensive tests covering positive, negative,
and edge cases. Use page objects and custom fixtures.
```

### Step 16 — Create API tests

> **Attach**: `specs/test-accelerator-spec.md`, `../qe-playground/server/src/routes/`, `../qe-playground/server/src/store.js`

```
Create all API test files (auth, tasks, users, health, unstable) in
tests/api/. Discover all endpoints, required fields, query params,
status codes, and response shapes from the attached server source.
Write comprehensive CRUD + error tests. Use apiContext and
authedApiContext fixtures.
```

### Step 17 — Add Amazon Q rules and documentation

```
Create .amazonq/rules/playwright-conventions.md with the framework
conventions (import patterns, page object patterns, test naming, code
style). Create a README.md with setup and run instructions.
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
| `specs/qe-playground-spec.md`    | Steps 1–10      |
| `specs/test-accelerator-spec.md` | Steps 11–17     |

## Tips

- Attach spec files using the **paperclip icon** or `@` mention in Amazon Q chat
- For Steps 12–16, also attach the relevant QE Playground source files so Amazon Q discovers selectors, API contracts, and seed data automatically
- Verify each phase before moving to the next
- If a step fails, paste the error into Amazon Q and ask it to fix
