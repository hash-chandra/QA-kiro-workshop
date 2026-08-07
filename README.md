# Intelligent Test Automation Accelerator — Workspace

A monorepo for the QE CoE **Intelligent Test Automation Accelerator** (AWS BOX funded). It combines AI-assisted test generation (Amazon Q Developer), cross-browser execution (BrowserStack), and AWS-native CI/CD (CodeBuild) into a reusable Playwright framework.

## Workspace Structure

| Folder | Purpose |
|--------|---------|
| `qe-playground/` | **App under test** — React + Fastify task-management app with seeded data, `data-testid` attributes, and an intentionally flaky endpoint for QA training. |
| `test-accelerator/` | **Accelerator framework** — Playwright + TypeScript with Page Object Model, custom fixtures, API helpers, BrowserStack integration, and AWS CodeBuild pipeline. |

## Quick Start

### 1. Start the App Under Test

```bash
cd qe-playground
npm run install:all
npm run dev           # API on :3000, UI on :5173
```

### 2. Run Tests

```bash
cd test-accelerator
npm install
npx playwright install
cp .env.example .env  # configure environment variables

npm test              # all tests headless
npm run test:headed   # browser visible (great for demos)
npm run test:ui       # interactive Playwright UI mode
npm run report        # open HTML report
```

### 3. Cross-Browser (BrowserStack)

```bash
# Requires BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY in .env
npm run test:bs:chrome
npm run test:bs:firefox
npm run test:bs:safari
```

## Test Credentials (QE Playground)

| Email | Password | Role |
|-------|----------|------|
| `admin@playground.dev` | `admin123` | admin |
| `tester@playground.dev` | `test123` | tester |

## CI/CD

AWS CodeBuild pipeline defined in `buildspec.yml` + `codebuild-cfn.yml`:
- Installs dependencies → runs Playwright tests → uploads HTML reports to S3
- Supports nightly BrowserStack runs via `NIGHTLY_BROWSERSTACK=true` env flag

## Documentation

- [Test Accelerator README](test-accelerator/README.md) — framework details, patterns, and commands
- [QE Playground README](qe-playground/README.md) — API endpoints and app architecture
- [BrowserStack Setup](test-accelerator/docs-amazonQ/browserstack.md) — credential configuration
- [Amazon Q Workflows](test-accelerator/docs-amazonQ/q-workflows/README.md) — AI-assisted test generation prompts

## Prerequisites

- Node.js ≥ 22
- npm
- (Optional) BrowserStack account for cross-browser testing
- (Optional) Amazon Q Developer extension for AI-assisted workflows
