# Amazon Q Workflows

Prompt-driven workflows for AI-assisted test automation using Amazon Q Developer.

## How It Works

| Layer | Location | Purpose |
|---|---|---|
| **Project Rules** | `.amazonq/rules/` | Auto-injected into every Q interaction — enforces conventions |
| **Workflow Templates** | `docs/q-workflows/` | Copy-paste prompts for common QE tasks |
| **Spec Files** | `docs/q-workflows/specs/` | Design decisions that guide generation |

## Workflows

| Workflow | File | Use When |
|----------|------|----------|
| Build from scratch | [build-guide.md](./build-guide.md) | Rebuilding the project from zero |
| Generate UI tests | [01-generate-ui-test.md](./01-generate-ui-test.md) | New UI test spec + page object |
| Generate API tests | [02-generate-api-test.md](./02-generate-api-test.md) | New API test coverage |
| Debug & refine | [03-debug-and-refine.md](./03-debug-and-refine.md) | Fixing failures, flakiness, structure |
| Flaky test analysis | [04-flaky-test-analysis.md](./04-flaky-test-analysis.md) | Systematic flaky test diagnosis |
| Generate page objects | [05-generate-page-object.md](./05-generate-page-object.md) | Standalone page object scaffolding |

## Examples

| Example | File |
|---------|------|
| UI test creation walkthrough | [examples/ui-test-creation.md](./examples/ui-test-creation.md) |
| API test improvement walkthrough | [examples/api-test-improvement.md](./examples/api-test-improvement.md) |

## Tips

- **Always use `@` file references** — Q produces dramatically better output when it sees your existing patterns
- **Split complex tasks** — page object first, then test spec
- **Iterate: prompt → run → refine** — paste errors back to Q
- **Be specific about scenarios** — "verify empty form shows validation" beats "test the login page"
