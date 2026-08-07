# Session 4 — API Test Automation with Amazon Q

**Duration:** 1 hour
**Audience:** Experienced QA engineers
**Goal:** Use Amazon Q to generate comprehensive API tests. Q reads the server route files — the same way you'd read API documentation or a Jira ticket — and decides what to test. You provide the source, Q derives the scenarios.

---

## Starting State

Session 3 must be complete:
- `qe-playground` app is running
- UI tests exist and pass
- No API tests yet

Verify:
```bash
ls test-accelerator/tests/api/    # should be empty or have stubs only
```

If you need to catch up:
```bash
git checkout session-4-start
cd qe-playground && npm run dev
```

---

## What You'll Learn

- How Q discovers API contracts (endpoints, status codes, required fields) from server source — you don't list them
- How to use `apiContext` vs `authedApiContext` fixtures
- How to test a flaky endpoint with retry logic

---

## Part 1 — Auth API Tests (10 min)

### Prompt 1 — Auth tests

> Attach: `specs/test-accelerator-spec.md`, `../qe-playground/server/src/routes/auth.js`, `../qe-playground/server/src/store.js`

```
Generate a comprehensive Playwright API test spec for the Auth endpoints.

Analyse the attached route file and store to discover all endpoints,
required fields, status codes, and validation rules. Generate all
positive, negative, and edge case tests you can identify.

Use the existing framework:
- Create the test spec in tests/api/auth.spec.ts
- Import test/expect from src/fixtures/base.fixture
- Use apiContext fixture wrapped with ApiHelper
- Use TEST_USERS from src/helpers for credentials
- Use test.describe to group by scenario category
```

**Verify:**
```bash
cd test-accelerator
npm run test:api-only -- --grep "Auth"
```

---

## Part 2 — Tasks API Tests (15 min)

### Prompt 2 — Tasks CRUD + filters

> Attach: `specs/test-accelerator-spec.md`, `../qe-playground/server/src/routes/tasks.js`, `../qe-playground/server/src/store.js`

```
Generate a comprehensive Playwright API test spec for the Tasks endpoints.

Analyse the attached route file and store to discover all endpoints,
HTTP methods, query parameters, required fields, status codes, and
validation rules. Generate all positive, negative, and edge case tests
you can identify — including CRUD operations, filter combinations,
missing/invalid input, and non-existent resource handling.

Use the existing framework:
- Create the test spec in tests/api/tasks.spec.ts
- Use authedApiContext fixture (tasks require authentication)
- Use randomTask() from src/helpers for dynamic test data
- Assert response body shapes, not just status codes
- Use test.describe to group by operation
```

**Verify:**
```bash
npm run test:api-only -- --grep "Tasks"
```

---

## Part 3 — Users API Tests (10 min)

### Prompt 3 — Users CRUD

> Attach: `specs/test-accelerator-spec.md`, `../qe-playground/server/src/routes/users.js`, `../qe-playground/server/src/store.js`

```
Generate a comprehensive Playwright API test spec for the Users endpoints.

Analyse the attached route file and store to discover all endpoints,
required fields, status codes, and validation rules. Generate all
positive, negative, and edge case tests you can identify.

Use authedApiContext fixture.
Use randomEmail() and uniqueId() from src/helpers for dynamic test data.
Reference @tests/api/tasks.spec.ts for the pattern.
Create the spec in tests/api/users.spec.ts.
```

---

## Part 4 — Health and Flaky Endpoint Tests (10 min)

### Prompt 4A — Health check

> Attach: `../qe-playground/server/src/routes/health.js`

```
Analyse the attached health route and generate all meaningful API tests for it.

Create the test in tests/api/health.spec.ts.
Use apiContext (no auth needed).
```

### Prompt 4B — Flaky endpoint with retry

> Attach: `../qe-playground/server/src/routes/unstable.js`, `@src/helpers/wait.helper.ts`

```
Analyse the attached unstable route to understand its failure behaviour.
Generate API tests that handle this non-determinism correctly using the
retry utility from @src/helpers/wait.helper.ts.

The tests should be deterministic — they must not mask real failures.
Use apiContext fixture.
Create the test in tests/api/unstable.spec.ts.
```

**Discussion point:** Q reads the route implementation and understands the failure mode — you didn't need to describe the 30% failure rate or the delay. This is the same as reading API docs before writing tests.

---

## Part 5 — Strengthen Assertions (10 min)

After generating the tests, use Q to review and improve them.

### Prompt 5 — Assertion review

```
Review @tests/api/tasks.spec.ts and strengthen the assertions.

Look for:
- Tests that only assert status codes but not response body shape
- Weak assertions (toBeTruthy instead of specific value checks)
- Missing negative test cases
- Tests that create data but don't verify deletion side effects

Apply all improvements in one pass.
```

---

## Discussion Points (5 min)

### `apiContext` vs `authedApiContext`

| Fixture | When to use |
|---------|-------------|
| `apiContext` | Unauthenticated endpoints (health, login itself) |
| `authedApiContext` | Any endpoint that requires a session (tasks, users) |

The `authedApiContext` fixture logs in automatically — no repeated login code in tests.

### The real-world parallel

Route files here = API documentation or Jira AC in your project. The pattern is identical:
- Attach the route file → Q discovers endpoints, fields, status codes
- Attach the Jira AC → Q discovers what to test

### Assert shapes, not just status codes

```typescript
// Weak
expect(res.status()).toBe(200);

// Strong
const body = await res.json();
expect(body).toMatchObject({ id: expect.any(Number), title: expect.any(String), status: 'todo' });
```

---

## Key Takeaways

- Attach route files — Q discovers all endpoints, fields, and status codes, you list nothing
- Use `authedApiContext` for protected endpoints — no repeated login boilerplate
- Assert response body shapes, not just status codes
- Ask Q to review assertions separately — it catches gaps consistently

---

## Session Wrap-Up

Full API test coverage exists: auth, tasks, users, health, unstable.

Next session: [Session 5 — Debugging, Flaky Tests, and Q Best Practices](./session-05-debug-and-refine.md)
