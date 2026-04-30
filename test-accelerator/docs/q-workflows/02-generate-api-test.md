# Prompt: Generate API Test

Use this prompt with Amazon Q to generate API test specs using the accelerator's fixture and helper patterns.

## Template

```
Generate a Playwright API test for the [RESOURCE] endpoints.

Endpoints to cover:
- [METHOD] [ENDPOINT] — [DESCRIPTION]

Use the existing framework:
- Create the test spec in tests/api/
- Import test/expect from src/fixtures/base.fixture
- Use the apiContext fixture (or authedApiContext for authenticated endpoints) and wrap it with ApiHelper from src/helpers
- Assert status codes and response body shapes
- Use test.describe to group related tests

Reference @tests/api/tasks.spec.ts for the pattern.
Reference @src/helpers/api.helper.ts for available methods.
```

## Example — Users API

```
Generate a Playwright API test for the Users endpoints.

Endpoints to cover:
- GET /api/users — returns list of users
- GET /api/users/:id — returns a single user with id, name, email, role fields
- POST /api/users — creates a new user (requires name, email, role)
- PUT /api/users/:id — updates an existing user
- DELETE /api/users/:id — deletes a user and returns 200

Use the existing framework:
- Create the test spec in tests/api/
- Import test/expect from src/fixtures/base.fixture
- Use the apiContext fixture and wrap it with ApiHelper from src/helpers
- Use randomEmail() and uniqueId() from src/helpers for dynamic test data
- Assert status codes and response body shapes
- Use test.describe to group related tests

Reference @tests/api/tasks.spec.ts for the pattern.
Reference @src/helpers/api.helper.ts for available methods.
Reference @src/helpers/test-data.helper.ts for test data utilities.
```

## Tips
- Specify exact status codes and response shapes you expect — Q will generate precise assertions
- For authenticated endpoints, use `authedApiContext` fixture which logs in automatically
- Reference `@src/helpers/test-data.helper.ts` when tests need dynamic data
