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

### BrowserStack (Cross-Browser)

```bash
npm run test:bs               # all BrowserStack browsers
npm run test:bs:chrome        # Chrome on Windows 11
npm run test:bs:firefox       # Firefox on Windows 11
npm run test:bs:safari        # Safari on macOS Sonoma
```

See [docs-kiro/browserstack.md](docs-kiro/browserstack.md) for full setup and credential configuration.

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
│   ├── base.config.ts            # shared Playwright settings
│   ├── env.config.ts             # centralized environment config
│   └── browserstack/             # BrowserStack YAML configs
├── src/
│   ├── fixtures/
│   │   └── base.fixture.ts       # custom test fixtures (apiContext, authedApiContext, loggedInPage)
│   ├── helpers/
│   │   ├── api.helper.ts         # reusable API request helper
│   │   ├── wait.helper.ts        # wait/retry utilities
│   │   ├── test-data.helper.ts   # test data generation & test credentials
│   │   └── index.ts              # barrel export
│   ├── pages/
│   │   ├── base.page.ts          # base page object
│   │   ├── login.page.ts         # login page object
│   │   ├── dashboard.page.ts     # dashboard page object (CRUD, edit modal, confirm dialog, toast)
│   │   └── index.ts              # barrel export
│   └── reporters/
│       └── arize-phoenix.reporter.ts  # OpenTelemetry reporter for Arize Phoenix
├── tests/
│   ├── ui/                       # UI test specs
│   │   ├── login.spec.ts
│   │   └── dashboard.spec.ts    # includes toast, edit modal, delete dialog tests
│   └── api/                      # API test specs
│       ├── auth.spec.ts
│       ├── tasks.spec.ts
│       ├── users.spec.ts
│       ├── health.spec.ts
│       └── unstable.spec.ts
├── docs-amazonQ/                 # Amazon Q workflow docs (legacy reference)
├── docs-kiro/                    # Kiro-specific docs, sessions, steering
├── arize/                        # Arize Phoenix failure analysis scripts
├── playwright.config.ts
├── tsconfig.json
├── .env.example
└── package.json
```

## Framework Patterns

- **Page Object Model** — extend `BasePage` in `src/pages/` for UI abstractions
- **Custom Fixtures** — import `test` from `src/fixtures/base.fixture.ts` for shared setup (`apiContext`, `authedApiContext`, `loggedInPage`)
- **Helpers** — reusable utilities in `src/helpers/` (API calls, waits, test data, credentials)
- **Environment Config** — single source of truth in `config/env.config.ts`
- **Separated Projects** — Playwright config defines independent UI (Chromium) and API projects

## Kiro Workflows

The accelerator includes AI-assisted workflows for QE tasks using Kiro. See the docs at `docs-kiro/`.

| Workflow | Description |
|---|---|
| Generate UI tests | AI-assisted UI test generation using specs and steering |
| Generate API tests | AI-assisted API test generation from route source files |
| Debug & refine tests | Iterative debugging with Kiro vibe sessions |
| Flaky test analysis | Root-cause analysis for flaky tests |
| Generate page objects | Page Object scaffolding from app source |

Project conventions in `.kiro/steering/` auto-inject framework patterns into every Kiro interaction.

## Playwright MCP

The accelerator includes [Playwright MCP](https://github.com/microsoft/playwright-mcp)
server config so an AI assistant can drive a real browser and generate tests
against QE Playground:

- Kiro — `.kiro/settings/mcp.json`
- VS Code (Copilot) — `.vscode/mcp.json`

Both launch `@playwright/mcp` via `npx` (no global install).

## Arize Phoenix (Observability)

Test execution spans are exported to Arize Phoenix via OpenTelemetry. See `arize/README.md` for setup.

```bash
pip install arize-phoenix && phoenix serve   # start Phoenix UI
npm test                                      # spans auto-export to http://localhost:6006
```
