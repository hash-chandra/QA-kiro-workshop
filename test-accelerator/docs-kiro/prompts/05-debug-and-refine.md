# Prompt: Debug and Refine Tests

Use these prompts to debug failures, fix flaky tests, and refactor test code.

---

## Debug a Failing Test

```
Look at #Terminal — the test "[test name]" is failing.

Also look at:
- #File [test file path]
- #File [page object or source file]
- #Problems

Identify the root cause and fix it. Explain what went wrong and why.
```

---

## Flaky Test Analysis

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

## Bulk Error Fixing

```
Look at #Terminal — multiple tests are failing after [describe change].

Analyze the pattern:
- Are all failures the same root cause?
- Is it a config issue, selector change, or app behavior change?

Fix all failures. If the app changed, update tests to match.
If tests are wrong, fix the test logic.
```

---

## Refactor Repeated Code

```
Look at #Folder tests/ui/ (or tests/api/)

Identify:
- Duplicated setup/teardown code
- Repeated assertions that could be helper methods
- Common patterns that should be extracted to fixtures

Refactor to reduce duplication while maintaining test independence.
```

---

## Performance Optimization

```
Look at #File [test file path]

This test suite takes [X seconds] to run. Analyze for:
- Unnecessary page navigations (could reuse state?)
- Redundant waits or fixed timeouts
- Tests that could run in parallel
- API setup that could replace slower UI setup

Optimize without sacrificing reliability or independence.
```

---

## Split Large Test File

```
#File [large test file] has grown to [N] lines.

Split into focused files by feature area. Maintain the same coverage.
Update shared setup into fixtures if needed.
Ensure each new file can run independently.
```

---

## Add Better Error Context

```
Look at #File [test file path]

Improve error handling:
- Add meaningful assertion messages (what failed and why)
- Add test.step() for complex multi-step workflows
- Use soft assertions where appropriate (continue after first failure)
```

---

## Tips

- `#Terminal` lets Kiro read actual error output — always include it for failures
- `#Problems` shows current IDE diagnostics (type errors, red squiggles)
- Ask Kiro to explain the root cause, not just patch the symptom
- Re-run after a fix to confirm it actually resolves the issue
- Post-save hooks can re-run affected tests automatically
