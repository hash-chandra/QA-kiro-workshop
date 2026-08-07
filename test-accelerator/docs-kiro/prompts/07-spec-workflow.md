# Prompt: Spec Workflow for QA

Use Kiro's Spec session for complex, multi-file QA tasks. These templates provide requirements for the Spec requirements phase.

---

## When to Use Specs vs Vibe

| Task | Session Type |
|------|-------------|
| Single test file | Vibe |
| Fix a bug or debug a failure | Vibe |
| Quick question or analysis | Vibe |
| Build entire framework | **Spec** |
| Add new test module (multiple files) | **Spec** |
| Large-scale refactoring | **Spec** |
| Framework migration | **Spec** |

---

## New Test Framework

```
Build a Playwright + TypeScript test automation framework for [APP_NAME].

Requirements:
1. Support UI and API testing in separate Playwright projects
2. Page Object Model with BasePage abstraction
3. Custom fixtures: apiContext (unauth), authedApiContext (auth)
4. Centralized env config (URLs, credentials, CI flag)
5. Helpers: API requests, test data generation, wait/retry
6. Playwright config with separate UI and API projects
7. Support headed, headless, debug, and UI mode
8. HTML reports with screenshots on failure
9. URLs: [UI_URL], [API_URL]
10. Credentials: [email/password]

App features: [describe app]
Auth mechanism: [describe auth]
```

---

## Add Accessibility Testing Module

```
Add accessibility testing to the framework.

Requirements:
1. Integrate @axe-core/playwright
2. Create reusable a11y helper: scan page, filter by impact level
3. Add a11y tests for all existing pages
4. Target WCAG 2.1 Level AA
5. Report violations with rule ID, affected elements, impact, and fix guidance
6. Only fail on critical and serious violations
7. Work with existing fixtures for authenticated pages
8. New tests in tests/accessibility/ folder
```

---

## Add Visual Regression Module

```
Add visual regression testing to the framework.

Requirements:
1. Use Playwright's built-in screenshot comparison
2. Visual test for each page (Login, Dashboard)
3. Baselines stored in tests/visual/snapshots/
4. Configurable pixel threshold for acceptable differences
5. Support multiple viewport sizes (desktop, tablet, mobile)
6. Mask dynamic content (timestamps, random IDs) before comparison
7. Work with existing page objects and fixtures
8. New tests in tests/visual/ folder
```

---

## Add Performance Testing Module

```
Add performance testing to the framework.

Requirements:
1. Measure page load times using Playwright's performance APIs
2. Track Core Web Vitals (LCP, FID, CLS)
3. Create performance baselines for each page
4. Fail tests when metrics exceed thresholds
5. Generate performance report with trends
6. Test under simulated slow network conditions
7. Work with existing page objects
8. New tests in tests/performance/ folder
```

---

## Framework Migration

```
Migrate existing [Selenium/Cypress/etc.] tests to Playwright.

Requirements:
1. Analyze existing test files at [path]
2. Map existing patterns to Playwright equivalents
3. Maintain same test coverage (same scenarios)
4. Use our Playwright conventions (see .kiro/steering/)
5. Create page objects where none exist
6. Update CI/CD configuration
7. Document any tests that can't be directly migrated
8. Maintain test naming for traceability
```

---

## CI/CD Pipeline Integration

```
Add CI/CD pipeline support for running tests automatically.

Requirements:
1. [AWS CodeBuild / GitHub Actions / GitLab CI] configuration
2. Run all tests on push to main/develop
3. Run relevant tests on PR (based on changed files)
4. Upload HTML reports as artifacts
5. Fail the pipeline on test failures
6. Support parallel test execution
7. Cache node_modules and Playwright browsers
8. Environment variables for test config
9. Notification on failure (Slack/Teams)
```

---

## Tips

- Be specific in requirements — vague input produces vague architecture
- Review the Design phase carefully — catching problems here saves significant rework
- Use `#[[file:path]]` syntax in requirements to reference existing code
- Use post-task hooks to verify each step produces working code
- One Spec per initiative — don't try to do everything in a single Spec
