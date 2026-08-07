# Prompt: Scaffold Automation Framework

Use Kiro's **Spec session** to build a complete test automation framework from requirements.

---

## When to Use

- Starting a new project from scratch
- Rebuilding or migrating a framework
- Adding a new test module (accessibility, performance, visual)

---

## Spec Requirements Template

Switch to **Spec session type**, then provide:

```
Build a Playwright + TypeScript test automation framework for [APP_NAME].

Requirements:
1. Support UI and API testing in separate Playwright projects
2. Page Object Model with a BasePage abstraction
3. Custom fixtures for authenticated and unauthenticated API contexts
4. Centralized environment configuration (URLs, credentials, CI mode)
5. Helper utilities: API requests, test data generation, wait/retry
6. Playwright config with separate UI and API projects
7. Support headed/headless, debug mode, and UI mode
8. HTML report with screenshots on failure, video on retry
9. Base URL: [UI_URL], API URL: [API_URL]
10. Test credentials: [credentials]

The app has:
- [describe pages/features]
- [describe API endpoints]
- [describe auth mechanism]
```

---

## Steering Files to Create First

Before running the Spec, create steering files so generated code follows your team's conventions:

```
Create .kiro/steering/ files:

1. playwright-conventions.md — locator priority, POM patterns, test structure, fixtures
2. project-structure.md — folder layout, barrel exports, naming conventions
3. code-style.md — TypeScript strict mode, async/await, explicit types, no magic strings
```

See docs-kiro/steering/playwright-conventions.md for a complete example.

---

## Verification After Scaffold

```bash
npm install                    # Dependencies install cleanly
npx playwright install         # Browsers install
npm test                       # All tests pass
npm run test:headed            # Browser visible
npm run test:api-only          # API tests pass independently
```

---

## Tips

- Create steering files before the Spec — they influence all generated code
- Review the Design phase carefully — architecture changes are expensive after implementation starts
- Use post-task hooks to verify each step produces working code
- This pattern works for any framework (Cypress, Karate, etc.) — adjust requirements accordingly
