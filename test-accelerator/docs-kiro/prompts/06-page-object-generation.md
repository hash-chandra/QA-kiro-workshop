# Prompt: Generate Page Object

Use this to generate standalone page objects from source code or browser discovery.

---

## Template — From Component Source

```
Look at #File [path/to/component.jsx] and any child components it imports.

Generate a page object at src/pages/[name].page.ts.
Extend BasePage from #File src/pages/base.page.ts.

Include:
- Private locator properties for all interactive elements
- Public action methods (verb-named: clickSubmit, fillEmail, etc.)
- Public assertion methods (verify*, get*, is*)
- Navigation method (navigate to this page)
- Wait for loaded method (page is ready for interaction)

Discover real data-testid values from the source.
Follow locator priority: getByTestId > getByRole > getByLabel > CSS.
```

---

## Template — From Playwright MCP (Browser Discovery)

```
Use Playwright MCP to navigate to [URL].
[Log in if needed: credentials]

Explore the page and identify all interactive elements.
Generate a page object at src/pages/[name].page.ts with:
- Locators based on what you find in the actual DOM
- Methods for every user action possible on this page
- Assertion helpers for verifying page state

Extend BasePage from #File src/pages/base.page.ts.
```

---

## Template — Extend Existing Page Object

```
Look at #File src/pages/[name].page.ts (existing page object)
and #File [component source].

The page object is missing methods for [describe what's missing].
Add:
- [specific methods needed]
- [specific assertions needed]

Maintain the existing code style and patterns.
```

---

## Template — Refactor Page Object

```
Look at #File src/pages/[name].page.ts

This page object has issues:
- [describe problems: too many methods, wrong selectors, etc.]

Refactor it:
- Split into logical sections if too large
- Update selectors to follow locator priority
- Ensure methods are focused (single responsibility)
- Add missing wait/verification logic
- Add JSDoc comments for complex methods
```

---

## Page Object Conventions (reference)

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ExamplePage extends BasePage {
  // Private locators
  private readonly submitButton: Locator;
  private readonly emailInput: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.getByTestId('submit-btn');
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
  }

  // Action methods (verbs)
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  // Assertion helpers
  async getErrorMessage(): Promise<string> {
    return await this.page.getByTestId('error-msg').textContent() ?? '';
  }

  async isSubmitEnabled(): Promise<boolean> {
    return await this.submitButton.isEnabled();
  }
}
```

---

## Tips

- **Source code gives you real selectors** — always prefer `#File` over guessing
- **One page object per logical area** — Dashboard might have DashboardPage + TaskFormComponent
- **Keep page objects focused** — if it has 30+ methods, consider splitting
- **Private locators, public methods** — tests never access selectors directly
- **Return useful data** — getter methods return strings/booleans, action methods return void
- **Playwright MCP for dynamic content** — when the DOM depends on API data
