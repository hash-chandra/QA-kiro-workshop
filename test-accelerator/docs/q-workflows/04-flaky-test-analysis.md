# Prompt: Flaky Test Analysis

Use this prompt with Amazon Q to systematically analyze and fix flaky tests.

## Template

```
Analyze this test for flakiness patterns and provide fixes.

Test file: @tests/[path-to-spec]

Test results context:
- Passes locally: [yes/no]
- Passes on CI: [yes/no]
- Failure rate: [approximate, e.g. "fails ~30% of runs"]
- Error message when it fails: [PASTE ERROR]

Common flakiness causes to check:
1. Race conditions — actions before elements are ready
2. Network timing — API responses not awaited
3. State leakage — tests depending on execution order
4. Animation/transition timing — clicks during animations
5. Viewport/device differences — elements off-screen

Apply fixes using the framework's patterns:
- Playwright web-first assertions (toBeVisible, toHaveText, toBeEnabled)
- waitForNetworkIdle from src/helpers/wait.helper.ts
- retry utility from src/helpers/wait.helper.ts for non-deterministic operations
- test.beforeEach for proper state setup
- test.afterEach for cleanup

Reference @src/helpers/wait.helper.ts for available utilities.
```

## Tips
- Provide the CI vs local context — many flaky tests only fail in CI due to slower environments
- If you have Playwright trace files, mention them — Q can help interpret trace output
- Ask Q to add `test.describe.configure({ mode: 'serial' })` only if tests genuinely depend on order
