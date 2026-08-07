# Prompt: Spec Workflow for QA

Use Kiro's Spec session type for complex, multi-file QA tasks. These templates provide requirements you can paste into the Spec requirements phase.

---

## When to Use Specs vs Vibe

| Task | Session Type |
|------|-------------|
| Single test file | Vibe |
| Fix one bug | Vibe |
| Quick question | Vibe |
| Build entire framework | **Spec** |
| Add new test module (multiple files) | **Spec** |
| Large-scale refactoring | **Spec** |
| Migration (Selenium → Playwright) | **Spec** |
| New integration (accessibility, visual, performance) | **Spec** |

---

## Template — New Test Framework

```
Build a Playwright + TypeScript test automation framework for [APP_NAME].

Requirements:
1. Support UI and API testing in separate Playwright projects
2. Page Object Model (extend BasePage)
3. Custom fixtures: apiContext (unauth), authedApiContext (auth)
4. Centralized env config (URLs, credentials, CI flag)
5. Helpers: API requests, test data generation, wait/retry
6. Playwright config: separate UI and API projects
7. Support: headed, headless, debug, UI mode
8. Reports: HTML with screenshots on failure
9. URLs: [UI_URL], [API_URL]
10. Credentials: [email/password]

App features: [describe app]
Auth mechanism: [describe auth]
```

---

## Template — New Test Module (Accessibility)

```
Add accessibility testing to the framework.

Requirements:
1. Integrate @axe-core/playwright
2. Create reusable a11y helper: scan page, filter by impact
3. Add a11y tests for all existing pages
4. Target WCAG 2.1 Level AA
5. Report violations with: rule ID, affected elements, impact, fix guidance
6. Only fail on critical and serious violations
7. Work with existing fixtures (login before scanning protected pages)
8. New tests in tests/accessibility/ folder
```

---

## Template — New Test Module (Visual Regression)

```
Add visual regression testing to the framework.

Requirements:
1. Use Playwright's built-in screenshot comparison
2. Create a visual test for each page (Login, Dashboard)
3. Baseline screenshots stored in tests/visual/snapshots/
4. Configure pixel threshold for acceptable differences
5. Support multiple viewport sizes (desktop, tablet, mobile)
6. Mask dynamic content (timestamps, random IDs) before comparison
7. Work with existing page objects and fixtures
8. New tests in tests/visual/ folder
```

---

## Template — New Test Module (Performance)

```
Add performance testing to the framework.

Requirements:
1. Measure page load times using Playwright's performance APIs
2. Track Core Web Vitals (LCP, FID, CLS) 
3. Create performance baselines for each page
4. Fail tests when metrics exceed thresholds
5. Generate performance report with trends over time
6. Test under simulated slow network conditions
7. Work with existing page objects
8. New tests in tests/performance/ folder
```

---

## Template — Framework Migration

```
Migrate existing [Selenium/Cypress/etc.] tests to Playwright.

Requirements:
1. Analyze existing test files at [path]
2. Map existing patterns to Playwright equivalents
3. Maintain same test coverage (same scenarios)
4. Use our Playwright conventions (see .kiro/steering/)
5. Create page objects where none exist
6. Update CI/CD configuration for Playwright
7. Document any tests that can't be directly migrated
8. Maintain test naming for traceability
```

---

## Template — Add Cross-Browser Support

```
Add cross-browser testing support to the framework.

Requirements:
1. Configure Playwright for Chrome, Firefox, and Safari
2. Add BrowserStack integration for real device testing
3. Separate configs: local multi-browser and BrowserStack
4. Same tests run on all browsers without code changes
5. Add npm scripts: test:chrome, test:firefox, test:safari, test:bs
6. Configure BrowserStack credentials via environment variables
7. Add browser-specific test skipping where needed (browser.skip)
8. Document setup in README
```

---

## Template — CI/CD Pipeline Integration

```
Add CI/CD pipeline support for running tests automatically.

Requirements:
1. [AWS CodeBuild / GitHub Actions / GitLab CI] configuration
2. Run all tests on push to main/develop branches
3. Run relevant tests on PR (based on changed files)
4. Upload HTML reports as artifacts
5. Fail the pipeline on test failures
6. Support parallel test execution
7. Cache node_modules and Playwright browsers
8. Environment variables for test config (URLs, credentials)
9. Slack/Teams notification on failure
```

---

## Spec Workflow Tips

1. **Be specific in requirements** — vague requirements produce vague designs
2. **Review the Design phase** — catch architecture problems before code
3. **Check task ordering** — dependencies should be respected
4. **Use post-task hooks** — verify each step produces working code
5. **Pause if something's wrong** — Supervised mode lets you reject changes
6. **Reference existing files** — use `#[[file:path]]` syntax in requirements
7. **One Spec per initiative** — don't try to do everything in one Spec
