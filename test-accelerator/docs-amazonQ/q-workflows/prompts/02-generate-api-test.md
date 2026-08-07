# Prompt: Generate API Test

Use this prompt with Amazon Q to generate API test specs. Attach the server route files — Q discovers the endpoints, fields, status codes, and derives the test scenarios. You don't list them.

## Template

> Attach: `specs/test-accelerator-spec.md`, the relevant route file(s) from `../qe-playground/server/src/routes/`, `../qe-playground/server/src/store.js`

```
Generate a comprehensive Playwright API test spec for the [RESOURCE] endpoints.

Analyse the attached route file and store to discover all endpoints,
HTTP methods, query parameters, required fields, status codes, and
validation rules. Generate all positive, negative, and edge case tests
you can identify.

Use the existing framework:
- Create the test spec in tests/api/
- Import test/expect from src/fixtures/base.fixture
- Use apiContext for unauthenticated endpoints, authedApiContext for protected ones
- Wrap with new ApiHelper(context) for CRUD operations
- Assert response body shapes, not just status codes
- Use test.describe to group by operation

Reference @tests/api/tasks.spec.ts for the pattern.
Reference @src/helpers/api.helper.ts for available methods.
```

## Tips
- Attach both the route file and `store.js` — Q needs the store to understand seed data, required fields, and valid values
- For authenticated endpoints, mention `authedApiContext` — Q will use it without you listing which endpoints need auth
- Ask Q to review assertions in a follow-up prompt — it consistently finds weak or missing ones
