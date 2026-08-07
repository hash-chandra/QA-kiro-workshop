# Prompt: Generate Page Object

Use this to generate standalone page objects from source code or browser discovery.

---

## From Component Source

```
Look at #File [path/to/component.jsx] and any child components it imports.

Generate a page object at src/pages/[name].page.ts.
Extend BasePage from #File src/pages/base.page.ts.

Include:
- Private locator properties for all interactive elements
- Public action methods (verb-named: clickSubmit, fillEmail, selectStatus)
- Public assertion methods (verify*, get*, is*)
- Navigation method and wait-for-loaded method

Discover real data-testid values from the source.
```

---

## From Playwright MCP (Browser Discovery)

```
Use Playwright MCP to navigate to [URL].
[Log in if needed: credentials]

Explore the page and identify all interactive elements.
Generate a page object at src/pages/[name].page.ts extending BasePage.

Include locators based on the actual DOM, methods for every user action,
and assertion helpers for verifying page state.
```

---

## Extend Existing Page Object

```
Look at #File src/pages/[name].page.ts (existing page object)
and #File [component source].

The page object is missing methods for [describe what's missing].
Add the missing methods while maintaining the existing code style.
```

---

## Refactor Page Object

```
Look at #File src/pages/[name].page.ts

This page object has issues:
- [describe problems: too large, wrong selectors, unclear methods, etc.]

Refactor it:
- Split into logical sections if too large
- Ensure methods are focused (single responsibility)
- Add missing wait/verification logic
- Add JSDoc comments for complex methods
```

---

## Tips

- Source code gives you real selectors — always prefer `#File` over guessing
- One page object per logical area — a complex page might split into multiple objects
- If a page object grows past 30 methods, consider splitting it
- For dynamic or JS-heavy content, use Playwright MCP to see the rendered state
- Conventions (locator priority, naming, structure) are handled by your steering file
