# Prompt: Generate UI Test

Use this in a Kiro Vibe session to generate UI tests. Reference source files — Kiro discovers selectors and derives scenarios.

---

## Template — Page Object First

```
Look at #File [path/to/component.jsx] and any related components.

Generate a page object at src/pages/[name].page.ts.
Follow the pattern in #File src/pages/base.page.ts.

Discover all interactive elements from the source. Include methods for:
- All user actions (create, search, filter, delete, etc.)
- All assertions a test would need (verify element exists, count items, etc.)
- Navigation and page load verification
```

---

## Template — Test Spec (after page object exists)

```
Generate a comprehensive UI test spec at tests/ui/[feature].spec.ts.

Use the page object at #File src/pages/[name].page.ts
and follow the pattern in #File tests/ui/login.spec.ts.

Cover:
- Positive scenarios (valid user flows)
- Negative scenarios (invalid inputs, error states)
- Edge cases (empty states, boundary values, special characters)

Requirements:
- Each test must be independent (no shared state)
- Use test.describe to group by feature area
- Login before each test if the page requires authentication
- Use test data helpers for dynamic data
```

---

## Template — Combined (Page Object + Tests in One Shot)

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

## Template — Add Coverage to Existing Tests

```
Look at:
- #File tests/ui/[existing-spec].spec.ts (current tests)
- #File [path/to/component.jsx] (source)

What additional test scenarios am I missing?
Generate ONLY the new tests (don't duplicate existing ones).
Focus on: [validation edges / accessibility / error states / specific feature]
```

---

## Template — Fix Failing UI Test

```
Look at #Terminal — the test "[test name]" is failing.

Also check:
- #File [test file]
- #File [page object]
- #File [component source]

Identify the root cause and fix it. Explain what went wrong.
```

---

## Template — Using Playwright MCP

```
Use Playwright MCP to navigate to [URL].
Log in with [credentials] if needed.

Explore the [page name] and:
1. Identify all interactive elements and their best selectors
2. Test user flows by actually clicking through them
3. Generate a page object based on the real rendered DOM
4. Generate test specs based on actual app behavior
```

---

## Tips

- **Page object first, tests second** — Kiro generates better tests when the PO exists
- **Reference actual source** — `#File` gives real selectors, not invented ones
- **Run immediately** — generate → run → paste failure → Kiro fixes
- **Steering handles conventions** — you don't need to repeat patterns in every prompt
- **For dynamic content** — use Playwright MCP to see the rendered state
- **Split complex pages** — one page object per logical area, not one per URL
