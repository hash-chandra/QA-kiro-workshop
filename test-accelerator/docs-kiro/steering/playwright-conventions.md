# Example Steering File: Playwright Conventions

> Copy this to `.kiro/steering/playwright-conventions.md` in your project.
> Kiro will automatically apply these conventions to all interactions.

---

```markdown
---
inclusion: auto
---

# Playwright Test Automation Conventions

## Locator Strategy (priority order)
1. page.getByTestId('element-name') — preferred for all interactive elements
2. page.getByRole('button', { name: 'Submit' }) — for semantic elements
3. page.getByLabel('Email') — for form inputs with labels
4. page.locator('[data-testid="..."]') — CSS fallback only when above don't work

NEVER use:
- Class-based selectors (.my-class)
- Tag hierarchy (div > span > a)
- XPath
- nth-child or index-based selectors

## Test Structure
- Import test/expect from src/fixtures/base.fixture (NOT from @playwright/test)
- Group tests: test.describe('feature name', () => { ... })
- Test names: lowercase, start with a verb (e.g., "displays error on invalid login")
- One assertion concept per test (multiple expects OK if verifying same concept)
- Use test.step() for complex multi-step workflows

## Page Objects
- Extend BasePage from src/pages/base.page
- File naming: {name}.page.ts (e.g., login.page.ts)
- Private locator properties, public action/assertion methods
- Action methods: verb names (fillEmail, clickSubmit, selectStatus)
- Assertion methods: verify/get/is prefix (verifyErrorShown, getTaskCount, isLoaded)
- Constructor initializes all locators
- Export from src/pages/index.ts barrel file

## Test Data
- Use randomTask(), uniqueId() from src/helpers/test-data.helper
- Never hardcode test data that needs to be unique
- Never depend on data from other tests
- Use TEST_USERS constant for credentials

## Fixtures
- Use apiContext for unauthenticated API calls
- Use authedApiContext for authenticated API calls
- Don't create new APIRequestContext manually — use fixtures

## File Organization
- UI tests: tests/ui/{feature}.spec.ts
- API tests: tests/api/{resource}.spec.ts
- Page objects: src/pages/{name}.page.ts
- Helpers: src/helpers/{name}.helper.ts
- Fixtures: src/fixtures/{name}.fixture.ts
- Config: config/{name}.config.ts

## Error Handling
- Use meaningful assertion messages: expect(count, 'task count after creation').toBe(5)
- Prefer toBeVisible() over toHaveCount(1) for element presence
- Use waitForLoadState('networkidle') sparingly — prefer specific element waits
```
