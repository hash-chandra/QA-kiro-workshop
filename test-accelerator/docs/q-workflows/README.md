# Amazon Q Workflows for QE Playground & Test Accelerator

## Philosophy

**Spec files define design decisions. Amazon Q discovers everything else from source code.**

| We specify                       | Amazon Q discovers from source           |
|----------------------------------|------------------------------------------|
| Project structure & file layout  | Actual `data-testid` selectors           |
| Locator strategy priority        | API endpoints, methods, query params     |
| Playwright config settings       | Required fields & validation schemas     |
| Import conventions & code style  | HTTP status codes & response shapes      |
| Environment config shape         | Seed data, credentials, task statuses    |
| npm scripts & framework patterns | Page object methods & test cases         |

## Spec Files

```
specs/
├── qe-playground-spec.md       # Tech stack, structure, credentials, key requirements
└── test-accelerator-spec.md    # Framework structure, locator strategy, conventions
```

---

## 🚀 Quick Start — Pick Your Speed

| Guide | Prompts | Best For |
|-------|---------|----------|
| [BUILD_FROM_SCRATCH_GUIDE.md](./BUILD_FROM_SCRATCH_GUIDE.md) | 17 steps | Beginners, maximum control |
| [QUICK_BUILD_GUIDE.md](./QUICK_BUILD_GUIDE.md) | 6 prompts | Balanced — fewer steps, still structured |
| [PROFESSIONAL_STYLE_PROMPTS.md](./PROFESSIONAL_STYLE_PROMPTS.md) | 2 prompts | Power users, one-shot generation |

---

## 📋 All Guides

| Guide | Description |
|-------|-------------|
| [BUILD_FROM_SCRATCH_GUIDE.md](./BUILD_FROM_SCRATCH_GUIDE.md) | Step-by-step build with short prompts (17 steps) |
| [QUICK_BUILD_GUIDE.md](./QUICK_BUILD_GUIDE.md) | Condensed build guide (6 prompts) |
| [PROFESSIONAL_STYLE_PROMPTS.md](./PROFESSIONAL_STYLE_PROMPTS.md) | Power-user 2-prompt approach |
| [DETAILED_SUB_PROMPTS.md](./DETAILED_SUB_PROMPTS.md) | Granular breakdowns for complex steps |
| [COMMON_SCENARIOS.md](./COMMON_SCENARIOS.md) | Prompts for frequent testing scenarios |

## 📖 Existing Workflow Templates

| Workflow | Template |
|----------|----------|
| Generate UI tests | [01-generate-ui-test.md](./01-generate-ui-test.md) |
| Generate API tests | [02-generate-api-test.md](./02-generate-api-test.md) |
| Debug & refine tests | [03-debug-and-refine.md](./03-debug-and-refine.md) |
| Flaky test analysis | [04-flaky-test-analysis.md](./04-flaky-test-analysis.md) |
| Generate page objects | [05-generate-page-object.md](./05-generate-page-object.md) |

## 💡 Tips

- Attach spec files using the **paperclip icon** or `@` mention in Amazon Q chat
- For test framework steps, also attach QE Playground source files so Amazon Q discovers selectors, API contracts, and seed data automatically
- Verify each phase before moving to the next
- If a step fails, paste the error into Amazon Q and ask it to fix
