# Prompt: Generate API Test

Use in a Kiro Vibe session to generate API tests from route source code.

---

## Full API Test Suite from Route

```
Look at:
- #File [path/to/route.js] (endpoint implementation)
- #File [path/to/store.js] (data layer)
- #File src/fixtures/base.fixture.ts (available fixtures)

Generate an API test spec at tests/api/[resource].spec.ts.

From the source, discover all endpoints, methods, request/response shapes,
validation rules, and error codes. Generate tests for:
1. CRUD operations (Create, Read, Update, Delete)
2. Query parameters and filters
3. Validation errors (missing fields, invalid data)
4. Authentication (protected vs unprotected routes)
5. Edge cases (empty body, extra fields, special characters, boundary values)

Follow the pattern in #File tests/api/auth.spec.ts.
```

---

## Error Handling Tests

```
Look at #File [path/to/route.js]

Generate tests verifying all error responses:
- What status codes are returned for invalid requests?
- What does the error response body look like?
- Are error messages consistent and user-friendly?
- Is sensitive information hidden from error responses?
- What happens with malformed request bodies?
```

---

## Authentication Boundary Tests

```
Look at #File [auth route] and #File [protected route]

Generate tests that verify:
- Which endpoints require authentication?
- What response for unauthenticated requests?
- What happens with expired or invalid sessions?
- Are admin-only routes properly protected?
- Session behavior after logout
```

---

## Flaky/Retry Pattern Tests

```
Look at #File [unstable route] and #File src/helpers/wait.helper.ts

This endpoint is unreliable (delays or intermittent failures). Generate tests that:
1. Verify eventual success using retry logic
2. Handle timeout scenarios gracefully
3. Demonstrate both Playwright's toPass() and custom retry()

Show assertions that tolerate variability without being meaningless.
```

---

## Coverage Gap Analysis

```
Look at:
- #File [route source] (all endpoints)
- #File [existing test file] (current coverage)

What endpoints or scenarios have no test coverage?
Rank gaps by risk. Generate tests for the top gaps.
```

---

## Tips

- Reference the route handlers with `#File` — Kiro discovers endpoints, validation, and error codes automatically
- Include the data store file — Kiro finds seeded data, schemas, and constraints
- Test the response contract (shapes and fields), not just status codes
- Error paths and auth boundaries catch more real bugs than happy-path tests
- For multi-file work (new helpers + fixtures + tests), use a Spec session instead
