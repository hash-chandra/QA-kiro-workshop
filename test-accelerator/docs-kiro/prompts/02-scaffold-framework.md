# Prompt: Scaffold Automation Framework

Use Kiro's **Spec session** to build a complete test automation framework from requirements.

---

## When to Use

- Starting a new project from scratch
- Rebuilding/migrating a framework
- Adding a new test module (accessibility, performance, visual)

---

## Spec Requirements Template

Switch to **Spec session type**, then provide:

```
Build a Playwright + TypeScript test automation framework for [APP_NAME].

Requirements:
1. Support both UI and API testing in separate Playwright projects
2. Page Object Model for UI abstractions (extend BasePage)
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

## Phase-by-Phase Guidance

### Requirements Phase
- Be specific about app features and endpoints
- Mention auth mechanism (session, JWT, cookie)
- Specify any integrations (BrowserStack, CI, reporting)

### Design Phase (review carefully)
- Check the proposed file structure matches your team's standards
- Verify the fixture approach makes sense
- Ensure helper interfaces are reusable

### Tasks Phase
- Tasks should be in dependency order
- Each task should be independently verifiable
- Add a post-task hook to run tests after each step

### Implementation Phase
- Let Autopilot mode work through tasks
- Intervene if a task produces errors (Kiro will debug)
- Verify at the end: `npm install && npx playwright install && npm test`

---

## Steering Files to Create First

Before running the Spec, create steering files so generated code follows conventions:

```
Create .kiro/steering/ files:

1. playwright-conventions.md:
   - Page Object Model (extend BasePage)
   - Locator priority: getByTestId > getByRole > getByLabel > CSS
   - Test names: lowercase, verb-first
   - Group with test.describe
   - Import from src/fixtures/base.fixture
   - Independent tests (no shared mutable state)

2. project-structure.md:
   - src/pages/ for page objects
   - src/fixtures/ for fixtures
   - src/helpers/ for utilities
   - tests/ui/ for UI tests
   - tests/api/ for API tests
   - config/ for configuration
   - Barrel exports (index.ts) in each src/ subfolder

3. code-style.md:
   - TypeScript strict mode
   - Async/await only
   - Explicit return types
   - Descriptive names
   - No magic strings
```

---

## Verification Checklist

After framework scaffold completes:

```bash
npm install                    # Dependencies install cleanly
npx playwright install         # Browsers install
npm test                       # All tests pass
npm run test:headed            # Browser visible (UI tests work)
npm run test:api-only          # API tests pass independently
```

---

## Tips

- Create steering files BEFORE the Spec — they influence generation
- Review the Design phase carefully — architecture changes are expensive after implementation
- Use post-task hooks to verify each step
- If a task fails, Kiro debugs automatically — but review the fix
- This Spec pattern works for any framework (Cypress, Karate) — adjust requirements
