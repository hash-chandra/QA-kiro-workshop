# Prompt: Generate UI Test

Use this prompt with Amazon Q to generate a new UI test spec following the accelerator's Page Object Model pattern.

## Template

```
Generate a Playwright UI test for the [PAGE_NAME] page.

Requirements:
- Page URL: [URL_PATH]
- Test scenarios:
  1. [SCENARIO_1]
  2. [SCENARIO_2]

Use the existing framework:
- Create a page object in src/pages/ extending BasePage from src/pages/base.page.ts
- Create the test spec in tests/ui/
- Import test/expect from src/fixtures/base.fixture
- Import the page object from src/pages
- Use Playwright built-in locators (getByRole, getByText, getByLabel, getByTestId)
- Add the page object to src/pages/index.ts barrel export

Reference @src/pages/base.page.ts and @src/pages/login.page.ts for the pattern.
Reference @tests/ui/login.spec.ts for the test structure.
```

## Example — Dashboard Page

```
Generate a Playwright UI test for the Dashboard page.

Requirements:
- Page URL: /dashboard (requires login first)
- Test scenarios:
  1. displays welcome message with logged-in user name
  2. shows task table with seeded tasks
  3. filters tasks by status using the dropdown
  4. creates a new task via the task form

Use the existing framework:
- Create a page object in src/pages/ extending BasePage from src/pages/base.page.ts
- Create the test spec in tests/ui/
- Import test/expect from src/fixtures/base.fixture
- Import the page object from src/pages
- Use Playwright built-in locators (getByRole, getByText, getByLabel, getByTestId)
- Add the page object to src/pages/index.ts barrel export
- Use TEST_USERS from src/helpers/test-data.helper.ts for login credentials

Reference @src/pages/base.page.ts and @src/pages/login.page.ts for the pattern.
Reference @tests/ui/dashboard.spec.ts for the test structure.
```

## Tips
- Use `@` file references so Q has full context of existing patterns
- List specific scenarios rather than saying "generate tests" — Q produces better output with concrete requirements
- For complex pages, break into multiple prompts: first the page object, then the test spec
