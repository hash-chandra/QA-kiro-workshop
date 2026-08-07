# Prompt: Debug and Refine Tests

Use these prompts to debug failures, fix flaky tests, and refactor test code with Kiro.

---

## Template — Debug a Failing Test

```
Look at #Terminal — the test "[test name]" is failing.

Also look at:
- #File [test file path]
- #File [page object or source file]
- #Problems

Identify the root cause and fix it. Explain what went wrong and why.
```

---

## Template — Flaky Test Analysis

```
This test is flaky — passes sometimes, fails other times:
#File [test file path]

Analyze for:
- Race conditions or timing issues
- Shared state between tests
- Network/API reliability dependencies
- Missing waits or weak assertions
- Order dependency with other tests

Propose a robust fix. If multiple issues exist, address them all.
```

---

## Template — Bulk Error Fixing

```
Look at #Terminal — multiple tests are failing after [describe change].

Analyze the pattern:
- Are all failures the same root cause?
- Is it a config issue, selector change, or app behavior change?

Fix all failures. If the app changed, update tests to match.
If tests are wrong, fix the test logic.
```

---

## Template — Refactor Repeated Code

```
Look at #Folder tests/ui/ (or tests/api/)

Identify:
- Duplicated setup/teardown code
- Repeated assertions that could be helper methods
- Common patterns that should be extracted to fixtures

Refactor to reduce duplication while maintaining test independence.
Follow conventions in .kiro/steering/.
```

---

## Template — Upgrade Locator Strategy

```
Look at #Folder tests/ and #Folder src/pages/

Find any usage of:
- CSS class selectors (.class-name)
- Tag-based selectors (div > span)
- nth-child or index-based selectors
- XPath

Refactor to our locator priority:
1. getByTestId
2. getByRole  
3. getByLabel
4. CSS selector (last resort)

If a getByTestId doesn't exist in the app source, list what 
data-testid attributes should be added.
```

---

## Template — Performance Optimization

```
Look at #File [test file path]

This test suite takes [X seconds] to run. Analyze for:
- Unnecessary page navigations (could reuse state?)
- Redundant waits or fixed timeouts
- Tests that could run in parallel
- API setup that could replace UI setup (faster)

Optimize without sacrificing reliability or independence.
```

---

## Template — Split Large Test File

```
#File [large test file] has grown to [N] lines.

Split it into focused files by feature area:
- [suggestion 1].spec.ts
- [suggestion 2].spec.ts
- [suggestion 3].spec.ts

Maintain the same coverage. Update shared setup into fixtures if needed.
Ensure each file can run independently.
```

---

## Template — Add Error Handling to Tests

```
Look at #File [test file path]

Add proper error handling:
- Meaningful assertion messages (what failed and why)
- test.step() for complex workflows (easier debugging)
- Screenshots on failure (if not already configured)
- Soft assertions where appropriate (continue after first failure)
```

---

## Tips

- **`#Terminal` is your friend** — Kiro reads actual error output
- **`#Problems` shows current issues** — red squiggles, type errors
- **Root cause, not band-aids** — ask Kiro to explain WHY, not just fix symptoms
- **Re-run after fix** — have Kiro verify the fix actually works
- **Steering keeps refactors consistent** — conventions maintained during restructuring
- **Hooks catch regressions** — post-save hooks re-run affected tests immediately
