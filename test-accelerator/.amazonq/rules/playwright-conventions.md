## Playwright Accelerator — Amazon Q Rules

You are assisting with a Playwright + TypeScript test automation framework. Follow these conventions strictly.

### Project Structure
- UI tests go in `tests/ui/` and API tests go in `tests/api/`
- Page objects go in `src/pages/` and must extend `BasePage` from `src/pages/base.page.ts`
- Reusable helpers go in `src/helpers/` and must be re-exported from `src/helpers/index.ts`
- Custom fixtures live in `src/fixtures/base.fixture.ts`
- Environment config is in `config/env.config.ts` — never hardcode URLs

### Import Conventions
- Tests import `test` and `expect` from `../../src/fixtures/base.fixture`
- Tests import page objects from `../../src/pages`
- Tests import helpers from `../../src/helpers`

### Test Patterns
- Every UI test must use the Page Object Model — instantiate a page object, call its methods, assert with `expect`
- API tests use the `apiContext` fixture and `ApiHelper` from helpers
- Use `test.describe` blocks to group related tests
- Test names should be lowercase, descriptive, and start with a verb (e.g. "displays error when field is empty")

### Page Object Patterns
- Extend `BasePage` which provides `page`, `locator()`, `navigate()`, and `getTitle()`
- Define locators as private properties using `this.page.getByTestId()` or `this.page.getByRole()`
- Expose user-facing actions as async methods (e.g. `async login(email, password)`)
- Never expose raw locators — wrap interactions in methods
- Add new page objects to the barrel export in `src/pages/index.ts`
- Reference `src/pages/login.page.ts` and `src/pages/dashboard.page.ts` for existing patterns

### API Test Patterns
- Use the `apiContext` fixture for unauthenticated requests and `authedApiContext` for authenticated requests
- Wrap with `new ApiHelper(apiContext)` for CRUD operations
- Assert status codes and response shapes
- Use `TEST_USERS` from `src/helpers/test-data.helper.ts` for credentials
- Reference `tests/api/tasks.spec.ts` and `tests/api/auth.spec.ts` for existing patterns

### Code Style
- TypeScript strict mode — no `any` types
- Prefer Playwright built-in locators: `getByRole`, `getByText`, `getByLabel`, `getByTestId`
- Use `async/await` — no `.then()` chains
- Minimal comments — code should be self-documenting
