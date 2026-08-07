# Prompt: Generate UI Test

Use in a Kiro Vibe session to generate UI tests. Reference source files so Kiro discovers real selectors and derives scenarios from the implementation.

---

## Page Object First, Then Tests

```
Look at #File [path/to/component.jsx] and any related components.

Generate a page object at src/pages/[name].page.ts.
Follow the pattern in #File src/pages/base.page.ts.

Discover all interactive elements from the source. Include methods for:
- All user actions (create, search, filter, delete, etc.)
- All assertions a test would need (verify state, count items, check visibility)
- Navigation and page-ready verification
```

---

## Test Spec (after page object exists)

```
Generate a UI test spec at tests/ui/[feature].spec.ts.

Use the page object at #File src/pages/[name].page.ts
and follow the pattern in #File tests/ui/login.spec.ts.

Cover positive scenarios, negative scenarios, and edge cases.
Each test must be independent. Use test data helpers for dynamic values.
Login before each test if the page requires authentication.
```

---

## Combined — Page Object + Tests in One Shot

```
Look at #File [path/to/component.jsx]

Generate both:
1. A page object at src/pages/[name].page.ts (extend BasePage)
2. A test spec at tests/ui/[feature].spec.ts

Discover selectors from the source. Follow patterns in:
- #File src/pages/login.page.ts (page object pattern)
- #File tests/ui/login.spec.ts (test pattern)

Cover positive, negative, and edge cases.
```

---

## Add Coverage to Existing Tests

```
Look at:
- #File tests/ui/[existing-spec].spec.ts (current tests)
- #File [path/to/component.jsx] (source)

What additional scenarios am I missing?
Generate only the new tests — don't duplicate existing ones.
Focus on: [validation edges / accessibility / error states / specific area]
```

---

## Using Playwright MCP for Browser Discovery

```
Use Playwright MCP to navigate to [URL].
Log in with [credentials] if needed.

Explore the [page name] and:
1. Identify all interactive elements and their best selectors
2. Test user flows by clicking through them
3. Generate a page object based on the real rendered DOM
4. Generate test specs based on actual app behavior
```

---

## Tips

- Generate the page object first, then tests — Kiro produces better tests when the PO exists
- Reference actual source with `#File` — gives real selectors, not guessed ones
- Run tests immediately after generation, then paste failures back for Kiro to fix
- For dynamic or JS-heavy content, use Playwright MCP to see the rendered state
- Split complex pages into one page object per logical area, not one per URL
