# Prompt: Generate UI Test

Use this prompt with Amazon Q to generate a UI test spec. Attach the app's source files — Q discovers the selectors and derives the test scenarios. You don't list them.

## Template

> Attach: `specs/test-accelerator-spec.md`, the relevant page source file(s) from `../qe-playground/client/src/`, the page object if it already exists

```
Generate a comprehensive Playwright UI test spec for the [PAGE_NAME] page.

Analyse the attached source files to discover all interactive elements,
user flows, and validation rules. Generate all positive, negative, and
edge case tests you can identify.

Use the existing framework:
- Create a page object in src/pages/ extending BasePage if one doesn't exist
- Create the test spec in tests/ui/
- Import test/expect from src/fixtures/base.fixture
- Import page objects from src/pages
- Use test.describe to group by scenario category
- Test names: lowercase, start with a verb

Reference @src/pages/base.page.ts and @src/pages/login.page.ts for the pattern.
Reference @tests/ui/login.spec.ts for the test structure.
```

## Tips
- Attach the actual JSX/TSX source — Q discovers real `data-testid` values instead of inventing them
- If the page requires login, also attach `@src/pages/login.page.ts` and mention it in the prompt
- For complex pages, split into two prompts: page object first, then test spec
- Run tests immediately after generation — paste failures back to Q to refine
