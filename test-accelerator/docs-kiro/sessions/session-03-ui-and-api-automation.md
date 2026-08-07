# Session 3 — UI & API Test Automation

**Duration:** ~1 hour (slides + live demo)  
**Audience:** QA engineers learning Kiro  
**Goal:** Generate complete UI tests (page objects + specs) and API tests (CRUD, auth, validation) using Kiro with source code discovery.

---

## Slide Deck Outline (10 min)

### Kiro's Approach to Test Generation

| Traditional AI | Kiro |
|---------------|------|
| You paste HTML snippets | Kiro reads entire component files via `#File` |
| You list selectors manually | Kiro discovers `data-testid`, roles, labels from source |
| You describe API endpoints | Kiro reads route handlers, finds schemas, status codes |
| Generic patterns | Steering files enforce YOUR patterns |
| One-shot generation | Iterate: generate → run → fix → refine |

### The UI Test Workflow

```
1. Reference source (#File component)     → Kiro discovers selectors & flows
2. Generate page object first             → Single responsibility, reusable
3. Generate test spec second              → Uses the page object
4. Run tests                              → Paste failures back to Kiro
5. Iterate until green                    → Kiro fixes based on actual errors
```

### The API Test Workflow

```
1. Reference route source (#File route.js)  → Kiro discovers endpoints, schemas, errors
2. Generate test spec                       → CRUD, validation, auth, edge cases
3. Use correct fixtures                     → authedApiContext vs apiContext
4. Run and iterate                          → Same fix loop as UI
```

---

## Live Demo — Part 1: UI Testing (25 min)

### Demo 1 — Generate a Page Object from Source (10 min)

**Prompt:**
```
Look at #File qe-playground/client/src/pages/DashboardPage.jsx and 
#File qe-playground/client/src/components/TaskForm.jsx

Generate a page object for the Dashboard page at src/pages/dashboard.page.ts.

Follow the pattern in #File test-accelerator/src/pages/login.page.ts 
and extend BasePage from #File test-accelerator/src/pages/base.page.ts.

Discover all interactive elements from the source code. Include methods for:
- All user actions (create, search, filter, delete)
- All assertions (verify task exists, count tasks)
- Navigation and page load verification
```

**What to show:**
- Kiro reads actual React components and finds real `data-testid` values
- It follows BasePage pattern from steering + referenced file
- Methods are named with action verbs

### Demo 2 — Generate UI Test Spec (10 min)

**Prompt:**
```
Generate a comprehensive UI test spec at tests/ui/dashboard.spec.ts.

Use the page object you just created and follow the pattern in 
#File test-accelerator/tests/ui/login.spec.ts.

Generate tests for ALL scenarios:
- Positive: valid user flows (create task, search, filter)
- Negative: invalid inputs, empty states
- Edge cases: special characters, long titles

Requirements:
- Each test must be independent
- Use test.describe to group by feature area
- Login before each test using LoginPage
- Use test data helpers for dynamic data
```

### Demo 3 — Run and Fix (5 min)

```bash
npm run test:headed
```

**If failures occur:**
```
Look at #Terminal — the dashboard test is failing.
Also check #File tests/ui/dashboard.spec.ts and #File src/pages/dashboard.page.ts.
Identify the root cause and fix it.
```

**Point out the loop:** generate → run → paste error → Kiro fixes → re-run

---

## Live Demo — Part 2: API Testing (25 min)

### Demo 4 — Generate API Tests from Route Source (12 min)

**Prompt:**
```
Look at the API routes:
- #File qe-playground/server/src/routes/tasks.js
- #File qe-playground/server/src/store.js
- #File test-accelerator/src/fixtures/base.fixture.ts

Generate a comprehensive API test spec at tests/api/tasks.spec.ts.

Discover ALL endpoints, methods, request/response shapes, validation rules,
and error codes from the source. Generate tests for:
1. CRUD operations (Create, Read, Update, Delete)
2. Query parameters and filters (status, search)
3. Validation errors (missing fields, invalid data)
4. Authentication (protected vs unprotected routes)
5. Edge cases (empty body, extra fields, special characters)

Use authedApiContext for authenticated calls.
Use apiContext for unauthenticated tests.
Follow the pattern in #File test-accelerator/tests/api/auth.spec.ts.
```

**What to show:**
- Kiro reads Express/Fastify route handlers
- Discovers actual endpoints, validation logic, error responses
- Generates both happy-path and error-path tests
- Uses correct fixtures based on auth requirements

### Demo 5 — Authentication Boundary Tests (8 min)

**Prompt:**
```
Look at #File qe-playground/server/src/routes/auth.js and 
#File qe-playground/server/src/store.js

Generate API tests at tests/api/auth.spec.ts covering:
- Successful login with valid credentials
- Login failure with wrong password / non-existent email
- Login with missing fields / invalid email format
- Accessing protected routes without auth
- Logout and session invalidation

Discover the actual credentials and validation rules from store.js.
```

### Demo 6 — Flaky Endpoint Pattern (5 min)

**Prompt:**
```
Look at #File qe-playground/server/src/routes/unstable.js and 
#File test-accelerator/src/helpers/wait.helper.ts

This endpoint is intentionally flaky (~30% failure rate).
Generate tests that use retry logic. Show both approaches:
- Playwright's built-in toPass() for polling
- Our custom retry() helper
```

**Point out:** Real-world flakiness handling — not just "retry 3 times" but proper patterns.

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| Source-first approach | `#File` actual components/routes — Kiro discovers real selectors and schemas |
| Page object before tests | Generate PO first, then tests that use it |
| API discovery | Route handlers tell Kiro endpoints, validation, status codes |
| Correct fixtures | `authedApiContext` for protected routes, `apiContext` for public |
| Iterate with real errors | Run → paste failure → Kiro fixes → repeat |
| Steering handles patterns | You don't repeat conventions — they're automatic |

---

## Quick Reference — Prompt Templates

### UI Page Object
```
Look at #File [component.jsx]
Generate page object at src/pages/[name].page.ts.
Follow pattern in #File src/pages/base.page.ts.
Discover all interactive elements.
```

### UI Test Spec
```
Generate tests at tests/ui/[feature].spec.ts using #File src/pages/[name].page.ts.
Follow pattern in #File tests/ui/login.spec.ts.
Cover positive, negative, edge cases. Independent tests.
```

### API Test Suite
```
Look at #File [route.js] and #File [store.js]
Generate tests at tests/api/[resource].spec.ts.
Discover endpoints, validation, errors. Cover CRUD + auth + edge cases.
Use authedApiContext / apiContext fixtures.
```

### Fix Failing Test
```
Look at #Terminal — [test name] is failing.
Check #File [test] and #File [source]. Fix it.
```

---

## Next Session

[Session 4 — Debugging, Refactoring & Hooks](./session-04-debug-refactor-and-hooks.md)
