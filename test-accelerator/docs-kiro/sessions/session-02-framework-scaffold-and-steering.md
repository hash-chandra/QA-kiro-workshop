# Session 2 — Framework Scaffolding with Specs + Steering

**Duration:** ~1 hour (slides + live demo)  
**Audience:** QA engineers learning Kiro  
**Goal:** Build a complete Playwright + TypeScript automation framework from scratch using Kiro's Specs workflow and Steering files. Understand the structured planning approach vs ad-hoc prompting.

---

## Slide Deck Outline (15 min)

### The Problem with Ad-Hoc Prompting for Complex Tasks

When you ask AI to "build me a test framework" in one prompt:
- You get inconsistent patterns across files
- Missing pieces that require follow-up prompts
- No clear plan of what was built or why
- Hard to reproduce for another project

### Kiro's Answer: The Specs Workflow

```
Requirements  →  Design  →  Tasks  →  Implementation
(what)           (how)      (steps)   (code)
```

| Phase | What Happens | You Do | Kiro Does |
|-------|-------------|--------|-----------|
| Requirements | Define acceptance criteria | Write/refine requirements | Suggest additional criteria |
| Design | Technical approach | Review & approve | Propose architecture, file structure, interfaces |
| Tasks | Ordered implementation steps | Review task list | Break design into atomic, testable steps |
| Implementation | Write code | Monitor & intervene | Execute tasks one by one |

### Steering Files: Your Team's Convention Enforcement

**Problem:** Every time you prompt, you repeat the same conventions.  
**Solution:** `.kiro/steering/*.md` — define once, applied to ALL Kiro interactions.

```
.kiro/steering/
├── playwright-conventions.md    # Test patterns and locator strategy
├── code-style.md                # TypeScript conventions
└── project-structure.md         # Where files go
```

**Steering inclusion modes:**
- `inclusion: auto` — always included (default)
- `inclusion: fileMatch` + `fileMatchPattern` — included when matching files are read
- `inclusion: manual` — only when referenced via `#` in chat

### When to Use Specs vs Vibe

| Task | Use |
|------|-----|
| Quick bug fix, single test file, explain code | **Vibe** |
| Build a full framework, add multi-file modules, major refactoring | **Spec** |

---

## Live Demo (45 min)

### Demo 1 — Create Steering Files (10 min)

Before building the framework, establish conventions:

**Prompt (Vibe mode):**
```
Create a .kiro/steering/ directory with the following steering files for 
our Playwright + TypeScript test automation project:

1. playwright-conventions.md — Define:
   - Use Page Object Model pattern
   - Locator priority: getByTestId > getByRole > getByLabel > CSS
   - Test names: lowercase, start with a verb
   - Group with test.describe by feature area
   - Import test/expect from src/fixtures/base.fixture
   - Each page object extends BasePage
   - Use helpers from src/helpers/ for test data and API calls
   - All tests must be independent (no shared mutable state)

2. project-structure.md — Define the file layout:
   - src/pages/ for page objects
   - src/fixtures/ for test fixtures
   - src/helpers/ for utilities
   - tests/ui/ for UI tests
   - tests/api/ for API tests
   - config/ for configuration
   - Barrel exports (index.ts) in each src/ subfolder

3. code-style.md — Define:
   - TypeScript strict mode
   - Async/await (no .then chains)
   - Explicit return types on public methods
   - No magic strings — use constants
```

**Show the audience:** These are now automatically included in every Kiro interaction. Any code Kiro generates will follow these conventions.

### Demo 2 — Build Framework with Specs Workflow (25 min)

Switch to **Spec session type**.

**Step 1: Define Requirements**

```
Build a Playwright + TypeScript test automation framework for the 
QE Playground application (React + Fastify task management app).

Requirements:
1. Framework must support both UI and API testing
2. Use Page Object Model for UI abstractions
3. Include custom fixtures for authenticated and unauthenticated API contexts
4. Centralized environment configuration (URLs, credentials, CI flag)
5. Helper utilities for: API requests, test data generation, wait/retry
6. Playwright config with separate UI and API projects
7. Support for headed/headless, debug mode, and UI mode
8. HTML report generation with screenshots on failure
9. Base URL: http://localhost:5173 (UI), http://localhost:3000 (API)
10. Test credentials: admin@playground.dev / admin123

The app has:
- Login page with email/password form
- Dashboard with task table, search, filters, create/delete
- API routes: /api/auth, /api/tasks, /api/users, /api/health, /api/unstable
```

**Step 2: Review Design**

Kiro proposes file structure, interfaces, configuration approach. **Review and refine** — catch architectural issues BEFORE code is written.

**Step 3: Review Tasks**

Kiro breaks the design into ordered tasks. Each task is independently verifiable.

**Step 4: Execute**

Let Kiro implement tasks in Autopilot mode.

**Show the audience:**
- The structured plan before any code was written
- How steering files influence the generated code
- The ability to pause, review, and adjust between tasks

### Demo 3 — Verify + Quick Page Object Demo (10 min)

After Kiro completes:

```bash
npm install
npx playwright install chromium
npm test
```

**Then show a quick Vibe session to generate a page object:**
```
Look at #File qe-playground/client/src/pages/LoginPage.jsx

Generate a page object at src/pages/login.page.ts.
Follow the pattern in #File src/pages/base.page.ts.
Discover all interactive elements from the source.
```

**Point out:** Steering conventions are followed automatically — locator priority, method naming, BasePage extension — without repeating instructions.

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| Specs for complex tasks | Requirements → Design → Tasks → Implementation |
| Steering for conventions | Define once in `.kiro/steering/`, never repeat |
| Review before implementation | Catch architecture issues at design phase |
| Steering inclusion modes | `auto` (always), `fileMatch` (conditional), `manual` (on demand) |
| Specs are reproducible | Same Spec pattern works for any framework/project |
| Vibe for quick tasks | Page objects, single tests, questions — stay in Vibe |

---

## Next Session

[Session 3 — UI & API Test Automation](./session-03-ui-and-api-automation.md)
