# Enhanced Amazon Q Prompts — Professional Style

Short, role-based prompts that reference external spec files for design decisions
and attach QE Playground source files for Amazon Q to discover everything else.

---

## Prompt 1 — Create QE Playground Application

> **Attach**: `specs/qe-playground-spec.md`

```
As a Senior Full-Stack QA Engineer, create the complete "qe-playground"
task management application based on the attached specification.
Build both the React + Vite frontend and Fastify backend with all API
endpoints, seed data, UI components with data-testid attributes, and
root package.json scripts.
```

---

## Prompt 2 — Create Playwright Test Framework

> **Attach**: `specs/test-accelerator-spec.md`, `../qe-playground/client/src/pages/`, `../qe-playground/client/src/components/`, `../qe-playground/server/src/routes/`, `../qe-playground/server/src/store.js`

```
As a Senior Test Automation Engineer, create the "test-accelerator"
Playwright + TypeScript framework based on the attached specification.
Discover selectors, API contracts, seed data, required fields, status
codes, and response shapes from the attached QE Playground source files.
Follow the locator strategy priority defined in the spec. Include
playwright.config.ts, custom fixtures, page objects, helpers, all UI
and API test files, barrel exports, and npm scripts.
```

---

## What Amazon Q Discovers vs What We Specify

| We specify (in spec files)       | Amazon Q discovers (from source)         |
|----------------------------------|------------------------------------------|
| Project structure & file layout  | Actual `data-testid` selectors           |
| Locator strategy priority        | API endpoints, methods, query params     |
| Playwright config settings       | Required fields & validation schemas     |
| Import conventions & code style  | HTTP status codes & response shapes      |
| Environment config shape         | Seed data (users, tasks, credentials)    |
| npm scripts                      | UI component structure & user flows      |
| Custom fixture definitions       | Page object methods needed               |
| Framework patterns (POM, etc.)   | Test cases to cover                      |

## Spec Files

| File                             | Contents                              |
|----------------------------------|---------------------------------------|
| `specs/qe-playground-spec.md`    | Tech stack, structure, credentials, key requirements |
| `specs/test-accelerator-spec.md` | Framework structure, locator strategy, conventions   |
