# AWS Kiro Workshop — QA Enablement Program

Training material for QA professionals who want to use AWS Kiro for test automation and QA activities.
Covers Kiro fundamentals, manual testing, UI automation, API automation, debugging, and advanced workflows.

---

## Workshop Overview

**Audience:** Experienced QA engineers already familiar with AI tools (Copilot, Amazon Q) who want to learn Kiro  
**Format:** 4 core sessions + 1 Q&A + 1 optional advanced session (~1 hour each, slides + live demo)  
**Framework:** Playwright + TypeScript (extensible to Cypress, Karate in future)  
**App Under Test:** QE Playground (React + Fastify task-management app in this repo)

---

## Folder Structure

```
docs-kiro/
├── sessions/                    # Training sessions
│   ├── 00-prerequisites.md
│   ├── session-01-kiro-fundamentals-and-manual-testing.md
│   ├── session-02-framework-scaffold-and-steering.md
│   ├── session-03-ui-and-api-automation.md
│   ├── session-04-debug-refactor-and-hooks.md
│   ├── session-05-qa-and-open-lab.md
│   └── session-advanced-mcp-subagents.md         (optional)
├── prompts/                     # Reusable prompt templates (post-training reference)
│   ├── 01-manual-test-cases.md
│   ├── 02-scaffold-framework.md
│   ├── 03-generate-ui-test.md
│   ├── 04-generate-api-test.md
│   ├── 05-debug-and-refine.md
│   ├── 06-page-object-generation.md
│   └── 07-spec-workflow.md
├── steering/                    # Example .kiro/steering files for the workshop
│   └── playwright-conventions.md
├── slides/                      # Slide deck outlines per session
│   └── README.md
└── examples/                    # Annotated walkthroughs of real Kiro output
    ├── spec-driven-test-creation.md
    └── hook-driven-workflow.md
```

---

## Training Program

### Core Sessions (4 × ~1 hour)

| # | Session | Topics Covered |
|---|---------|----------------|
| 1 | [Kiro Fundamentals + Manual Testing](./sessions/session-01-kiro-fundamentals-and-manual-testing.md) | IDE tour, Vibe/Spec modes, Autopilot/Supervised, diff from Copilot/Q, steering intro, manual test case generation, coverage gaps, exploratory charters, bug reports |
| 2 | [Framework Scaffolding with Specs + Steering](./sessions/session-02-framework-scaffold-and-steering.md) | Specs workflow (Requirements → Design → Tasks), steering files, build complete Playwright framework, page object generation |
| 3 | [UI & API Test Automation](./sessions/session-03-ui-and-api-automation.md) | Page objects from source, UI test specs, API tests from route discovery, CRUD/auth/validation coverage, flaky endpoint patterns |
| 4 | [Debugging, Refactoring & Hooks](./sessions/session-04-debug-refactor-and-hooks.md) | Debug with #Terminal/#Problems, refactor code, create hooks (lint-on-save, test-after-task, convention-check), full workflow demo |

### Q&A Session (1 × ~1 hour)

| # | Session | Format |
|---|---------|--------|
| 5 | [Q&A + Open Lab](./sessions/session-05-qa-and-open-lab.md) | Open questions, live problem-solving, hands-on with participant projects |

### Optional Advanced Session (1 × ~1 hour)

| # | Session | Topics Covered |
|---|---------|----------------|
| ★ | [Advanced: MCP, Sub-agents & Spec at Scale](./sessions/session-advanced-mcp-subagents.md) | Playwright MCP (browser-driven testing), sub-agents for investigation, Spec-driven modules (a11y, visual, performance) |

---

## Kiro Features Covered

| Feature | Sessions | Description |
|---------|----------|-------------|
| Vibe Sessions | 1, 2, 3, 4 | Conversational chat for exploratory coding and Q&A |
| Specs Workflow | 2, Advanced | Structured requirements → design → tasks → implementation |
| Steering Files | 1, 2, 3, 4 | Persistent project conventions auto-injected into every interaction |
| Hooks | 4 | Auto-run linting, tests, or agent prompts on IDE events |
| MCP Integration | Advanced | Playwright MCP — agent drives a real browser |
| Sub-agents | Advanced | Delegate complex tasks to specialized agents |

---

## How This Differs from the Amazon Q Workshop

| Aspect | Amazon Q Workshop | Kiro Workshop |
|--------|-------------------|---------------|
| Interaction model | Chat + `@` file references | Vibe sessions + Specs workflow |
| Project conventions | `.amazonq/rules/` | `.kiro/steering/` files |
| Automation triggers | Manual | Hooks (auto-run on events) |
| Test generation | Prompt → output | Spec → design → tasks → output |
| Browser interaction | Manual verification | Playwright MCP (agent drives browser) |
| Complex tasks | Single chat | Sub-agents for parallel work |
| Session count | 5 sessions (hands-on only) | 4 + Q&A + optional advanced (slides + demo) |

---

## Quick Start

1. Complete [00-prerequisites.md](./sessions/00-prerequisites.md)
2. Start with [Session 1](./sessions/session-01-kiro-fundamentals-and-manual-testing.md)
3. Follow sessions in order — each builds on the previous
4. Use [prompts/](./prompts/) folder as a day-to-day reference after training
5. [Q&A session](./sessions/session-05-qa-and-open-lab.md) for questions + hands-on practice
6. [Advanced session](./sessions/session-advanced-mcp-subagents.md) for MCP, sub-agents, and scale

---

## Core Principles

- **Specs over ad-hoc prompts** — use the Specs workflow for complex, multi-file tasks
- **Steering for consistency** — define conventions once, Kiro follows them always
- **Hooks for automation** — lint on save, test after task completion, review before writes
- **Iterate in Vibe mode** — quick back-and-forth for exploration, then formalize with Specs
- **Let Kiro discover** — attach source files, Kiro finds selectors, endpoints, and patterns
