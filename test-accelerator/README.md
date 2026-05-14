# Intelligent Test Automation Accelerator

Playwright + TypeScript base framework for the QA Test Automation Accelerator (QA-2888).
Tests target the **QE Playground** application (React + Fastify task-management app).

## Prerequisites

Start the QE Playground before running tests:

```bash
cd ../qe-playground
npm run install:all
npm run dev           # server on :3000, client on :5173
```

## Setup

```bash
npm install
npx playwright install
cp .env.example .env          # configure environment variables
```

## Run Tests

```bash
npm test                      # run all tests (UI + API) headless
npm run test:ui-only          # run UI tests only (Chromium)
npm run test:api-only         # run API tests only
npm run test:headed           # run with browser visible
npm run test:ui               # open Playwright UI mode
npm run test:debug            # run in debug mode
npm run report                # view HTML report
```

### BrowserStack (Cross-Browser/Device)

```bash
npm run test:bs               # all BrowserStack browsers/devices
npm run test:bs:chrome        # Chrome on Windows 11
npm run test:bs:firefox       # Firefox on Windows 11
npm run test:bs:safari        # Safari on macOS Sonoma
npm run test:bs:mobile        # Android + iPhone
```

See [docs/browserstack.md](docs/browserstack.md) for full setup and credential configuration.

## Environment Configuration

Set variables in `.env` or export them before running:

| Variable       | Default                    | Description          |
|----------------|----------------------------|----------------------|
| `ENV`          | `dev`                      | Environment name     |
| `BASE_URL`     | `http://localhost:5173`    | UI base URL          |
| `API_BASE_URL` | `http://localhost:3000`    | API base URL         |
| `CI`           | `false`                    | CI mode flag         |
| `BROWSERSTACK_USERNAME` | —               | BrowserStack username |
| `BROWSERSTACK_ACCESS_KEY` | —             | BrowserStack access key |

## Project Structure

```
├── config/
│   └── env.config.ts             # centralized environment config
├── src/
│   ├── fixtures/
│   │   └── base.fixture.ts       # custom test fixtures (apiContext, authedApiContext)
│   ├── helpers/
│   │   ├── api.helper.ts         # reusable API request helper
│   │   ├── wait.helper.ts        # wait/retry utilities
│   │   ├── test-data.helper.ts   # test data generation & test credentials
│   │   └── index.ts              # barrel export
│   └── pages/
│       ├── base.page.ts          # base page object
│       ├── login.page.ts         # login page object
│       ├── dashboard.page.ts     # dashboard page object
│       └── index.ts              # barrel export
├── tests/
│   ├── ui/                       # UI test specs
│   │   ├── login.spec.ts
│   │   └── dashboard.spec.ts
│   └── api/                      # API test specs
│       ├── auth.spec.ts
│       ├── tasks.spec.ts
│       ├── users.spec.ts
│       ├── health.spec.ts
│       └── unstable.spec.ts
├── playwright.config.ts          # Playwright config (UI + API projects)
├── tsconfig.json
├── .env.example
└── package.json
```

## Framework Patterns

- **Page Object Model** — extend `BasePage` in `src/pages/` for UI abstractions
- **Custom Fixtures** — import `test` from `src/fixtures/base.fixture.ts` for shared setup (`apiContext`, `authedApiContext`)
- **Helpers** — reusable utilities in `src/helpers/` (API calls, waits, test data, credentials)
- **Environment Config** — single source of truth in `config/env.config.ts`
- **Separated Projects** — Playwright config defines independent UI (Chromium) and API projects

## Amazon Q Developer Workflows

The accelerator includes prompt-driven workflows for AI-assisted QE tasks. See the full guide at `docs/q-workflows/Q_USAGE_GUIDE.md`.

| Workflow | Template |
|---|---|
| Generate UI tests | `docs/q-workflows/01-generate-ui-test.md` |
| Generate API tests | `docs/q-workflows/02-generate-api-test.md` |
| Debug & refine tests | `docs/q-workflows/03-debug-and-refine.md` |
| Flaky test analysis | `docs/q-workflows/04-flaky-test-analysis.md` |
| Generate page objects | `docs/q-workflows/05-generate-page-object.md` |

Project rules in `.amazonq/rules/` auto-inject framework conventions into every Q interaction.
