# Amazon Q Workflows — QA Enablement Program

Prompt-driven workflows for AI-assisted testing using Amazon Q Developer.
Covers manual testing and automation (UI + API).

---

## Folder Structure

```
q-workflows/
├── sessions/               # Training program — follow in order
│   ├── 00-prerequisites.md
│   ├── session-01-manual-testing.md
│   ├── session-02-build-and-scaffold.md
│   ├── session-03-ui-automation.md
│   ├── session-04-api-automation.md
│   ├── session-05-debug-and-refine.md
│   └── session-states/     # Git branch snapshots for isolated starts
├── prompts/                # Reusable prompt templates (post-training reference)
│   ├── build-guide.md
│   ├── 01-generate-ui-test.md
│   ├── 02-generate-api-test.md
│   ├── 03-debug-and-refine.md
│   ├── 04-flaky-test-analysis.md
│   └── 05-generate-page-object.md
├── specs/                  # Design decisions that drive Q generation
│   ├── qe-playground-spec.md
│   └── test-accelerator-spec.md
└── examples/               # Annotated walkthroughs of real Q output
    ├── ui-test-creation.md
    └── api-test-improvement.md
```

---

## Training Program — 5 Sessions × 1 Hour

| | Session | Topic |
|--|---------|-------|
| Pre-setup | [00-prerequisites.md](./sessions/00-prerequisites.md) | Environment setup — complete before Session 1 |
| Session 1 | [session-01-manual-testing.md](./sessions/session-01-manual-testing.md) | Manual testing with Q — test cases (+/-/edge), exploratory, bug reports |
| Session 2 | [session-02-build-and-scaffold.md](./sessions/session-02-build-and-scaffold.md) | Build the app + framework scaffold with Q |
| Session 3 | [session-03-ui-automation.md](./sessions/session-03-ui-automation.md) | UI test automation — page objects + test specs |
| Session 4 | [session-04-api-automation.md](./sessions/session-04-api-automation.md) | API test automation — CRUD, auth, filters, flaky endpoint |
| Session 5 | [session-05-debug-and-refine.md](./sessions/session-05-debug-and-refine.md) | Debug, fix flaky tests, refactor, advanced Q patterns |

Each session is isolated — see [session-states/README.md](./sessions/session-states/README.md).

---

## Reusable Prompt Templates

Use these standalone after training for day-to-day work.

| Template | Use When |
|----------|----------|
| [build-guide.md](./prompts/build-guide.md) | Rebuilding the project from zero (6 prompts) |
| [01-generate-ui-test.md](./prompts/01-generate-ui-test.md) | New UI test spec + page object |
| [02-generate-api-test.md](./prompts/02-generate-api-test.md) | New API test coverage |
| [03-debug-and-refine.md](./prompts/03-debug-and-refine.md) | Fixing failures, flakiness, structure |
| [04-flaky-test-analysis.md](./prompts/04-flaky-test-analysis.md) | Systematic flaky test diagnosis |
| [05-generate-page-object.md](./prompts/05-generate-page-object.md) | Standalone page object scaffolding |

---

## Core Principles

- **Attach source files with `@`** — Q discovers selectors, endpoints, and data shapes; you don't list them manually
- **Split complex tasks** — page object first, then test spec
- **Iterate: prompt → run → refine** — paste errors back to Q
- **Be specific about scenarios** — "verify empty form shows validation" beats "test the login page"
- **Q works for manual testing too** — test case design, exploratory charters, bug reports
