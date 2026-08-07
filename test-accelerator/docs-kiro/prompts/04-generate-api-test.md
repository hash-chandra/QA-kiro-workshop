# Prompt: Generate API Test

Use this in a Kiro Vibe session to generate API tests from route source code.

---

## Template — Full API Test Suite from Route

```
Look at:
- #File [path/to/route.js] (endpoint implementation)
- #File [path/to/store.js] (data layer)
- #File src/fixtures/base.fixture.ts (available fixtures)

Generate a comprehensive API test spec at tests/api/[resource].spec.ts.

Discover ALL endpoints, methods, request/response shapes, validation rules,
and error codes from the source. Generate tests for:
1. CRUD operations (Create, Read, Update, Delete)
2. Query parameters and filters
3. Validation errors (missing fields, invalid data)
4. Authentication (protected vs unprotected routes)
5. Edge cases (empty body, extra fields, special characters, boundary values)

Use authedApiContext for authenticated calls.
Use apiContext for unauthenticated tests.
Follow the pattern in #File tests/api/auth.spec.ts.
```

---

## Template — Specific Endpoint Coverage

```
The [resource] API has a [METHOD] [path] endpoint.
Look at #File [route source] for the implementation.

Generate tests covering:
- All valid parameter combinations
- All invalid parameter combinations  
- Boundary values
- Response shape verification (not just status codes)
```

---

## Template — Error Handling Tests

```
Look at #File [path/to/route.js]

Generate tests verifying ALL error responses:
- What status codes are returned for invalid requests?
- What does the error response body look like?
- Are error messages user-friendly and consistent?
- Is sensitive information hidden from error responses?
- What happens with malformed request bodies?
```

---

## Template — Authentication Boundary Tests

```
Look at #File [auth route] and #File [protected route]

Generate tests that verify:
- Which endpoints require authentication?
- What response for unauthenticated requests?
- What happens with expired/invalid sessions?
- Are admin-only routes properly protected?
- Session behavior after logout
```

---

## Template — Flaky/Retry Pattern Tests

```
Look at #File [unstable route] and #File src/helpers/wait.helper.ts

This endpoint is unreliable (delays/failures). Generate tests that:
1. Verify eventual success using retry logic
2. Handle timeout scenarios gracefully
3. Demonstrate both Playwright's toPass() and custom retry()

Show assertions that tolerate variability without being meaningless.
```

---

## Template — Coverage Gap Analysis

```
Look at:
- #File [route source] (all endpoints)
- #File [existing test file] (current coverage)

What endpoints/scenarios have no test coverage?
Rank gaps by risk. Generate tests for the top gaps.
```

---

## Template — Using Spec Session for Multi-Endpoint Coverage

Switch to **Spec session**:

```
Add comprehensive API test coverage for the [Resource] endpoints.

Requirements:
1. Test all CRUD operations
2. Test access controls (admin vs user)
3. Test input validation
4. Test pagination/filtering if supported
5. Test error response format consistency
6. All tests must be independent (create own test data)
7. Use existing fixtures from src/fixtures/base.fixture.ts
8. Use helpers from src/helpers/

Source: [route file path]
Data store: [store file path]
```

---

## Tips

- **`#File` the route handlers** — Kiro discovers endpoints, validation, error codes
- **Include the data store** — Kiro finds seeded data, schemas, constraints
- **Test the contract** — verify response shapes, not just status codes
- **Independent tests** — each test creates its own data
- **Error paths matter most** — validation and auth failure tests catch real bugs
- **Combine endpoints** — test workflows that span multiple endpoints (create → read → update)
- **Use Spec for multi-file** — when you need new helpers or fixtures alongside tests
