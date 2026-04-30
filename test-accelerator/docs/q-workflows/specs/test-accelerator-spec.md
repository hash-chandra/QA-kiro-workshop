# Test Accelerator — Framework Specification

## Overview
Playwright + TypeScript test automation framework targeting the QE Playground application.
Covers both UI and API testing with Page Object Model, custom fixtures, and reusable helpers.

## Target Application
- **UI**: http://localhost:5173 (QE Playground React client)
- **API**: http://localhost:3000 (QE Playground Fastify server)
- **Source code**: `../qe-playground/` — attach source files so Amazon Q can discover selectors, API contracts, seed data, and response shapes

## Tech Stack
- Playwright Test (latest)
- TypeScript strict mode
- dotenv for environment configuration

## Project Structure
```
test-accelerator/
├── config/
│   └── env.config.ts                # centralized environment config
├── src/
│   ├── fixtures/
│   │   └── base.fixture.ts          # custom test fixtures
│   ├── helpers/
│   │   ├── api.helper.ts            # reusable API request helper
│   │   ├── wait.helper.ts           # wait/retry utilities
│   │   ├── test-data.helper.ts      # test data generation & credentials
│   │   └── index.ts                 # barrel export
│   └── pages/
│       ├── base.page.ts             # base page object
│       ├── login.page.ts            # login page object
│       ├── dashboard.page.ts        # dashboard page object
│       └── index.ts                 # barrel export
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts
│   │   └── dashboard.spec.ts
│   └── api/
│       ├── auth.spec.ts
│       ├── tasks.spec.ts
│       ├── users.spec.ts
│       ├── health.spec.ts
│       └── unstable.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── .env.example
└── package.json
```

## Environment Configuration (`config/env.config.ts`)
```typescript
export const ENV_CONFIG = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:5173',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
  ENV: process.env.ENV || 'dev',
  CI: process.env.CI === 'true'
};
```

## Playwright Config (`playwright.config.ts`)
| Setting       | UI Project                  | API Project                  |
|---------------|-----------------------------|------------------------------|
| Browser       | Chromium                    | None (API only)              |
| Base URL      | http://localhost:5173       | http://localhost:3000         |
| Test dir      | ./tests/ui                  | ./tests/api                  |
| Retries       | 2                           | 2                            |
| Workers       | 4                           | 4                            |
| Reporter      | HTML with screenshots on failure | HTML                    |

## Locator Strategy

**Do NOT hardcode selectors.** Inspect the QE Playground source code
(`../qe-playground/client/src/`) to discover the actual `data-testid` values,
element roles, labels, and text content.

Use this priority order when choosing locators:
1. `page.getByTestId()` — preferred, most stable
2. `page.getByRole()` — for buttons, links, headings, etc.
3. `page.getByLabel()` — for form inputs with labels
4. `page.getByText()` — for static text content
5. `page.getByPlaceholder()` — for inputs with placeholder text
6. `page.locator()` with CSS/XPath — last resort only

### Source files to inspect
- `../qe-playground/client/src/pages/LoginPage.jsx` — login page selectors
- `../qe-playground/client/src/pages/DashboardPage.jsx` — dashboard selectors
- `../qe-playground/client/src/components/TaskForm.jsx` — task form selectors
- `../qe-playground/client/src/components/Navbar.jsx` — navigation selectors
- `../qe-playground/server/src/routes/` — API contracts, status codes, required fields
- `../qe-playground/server/src/store.js` — seed data, credentials, data shapes

## Custom Fixtures (`src/fixtures/base.fixture.ts`)
| Fixture           | Description                                          |
|-------------------|------------------------------------------------------|
| apiContext         | Unauthenticated Playwright APIRequestContext          |
| authedApiContext   | Pre-authenticated context (admin session cookie set)  |

Export custom `test` and `expect` for all test files.

## Page Objects
- **BasePage** (`src/pages/base.page.ts`): base class with common navigation and utility methods
- **LoginPage** (`src/pages/login.page.ts`): extends BasePage — discover locators and actions from `LoginPage.jsx`
- **DashboardPage** (`src/pages/dashboard.page.ts`): extends BasePage — discover locators and actions from `DashboardPage.jsx` and `TaskForm.jsx`
- Barrel export in `src/pages/index.ts`

## Helpers
- **ApiHelper** (`src/helpers/api.helper.ts`): wraps Playwright APIRequestContext with get/post/put/delete methods
- **TestDataHelper** (`src/helpers/test-data.helper.ts`): test credentials (discover from `store.js`), random data generators
- **WaitHelper** (`src/helpers/wait.helper.ts`): retry, polling, and wait-for-condition utilities
- Barrel export in `src/helpers/index.ts`

## Test Coverage
- **UI tests**: Discover all testable user flows from the React page components and write comprehensive tests covering positive, negative, and edge cases
- **API tests**: Discover all endpoints, required fields, query params, and status codes from the server route files and write comprehensive CRUD + error tests
- Include flaky endpoint testing with retry logic for `/api/unstable`

## Import Conventions
```typescript
import { test, expect } from '../../src/fixtures/base.fixture';
import { LoginPage, DashboardPage } from '../../src/pages';
import { ApiHelper, TEST_USERS, randomEmail, uniqueId } from '../../src/helpers';
```

## npm Scripts
```json
{
  "test": "playwright test",
  "test:ui-only": "playwright test tests/ui",
  "test:api-only": "playwright test tests/api",
  "test:headed": "playwright test --headed",
  "test:ui": "playwright test --ui",
  "test:debug": "playwright test --debug",
  "report": "playwright show-report"
}
```

## Code Style Rules
- TypeScript strict mode — no `any` types
- Use `async/await` — no `.then()` chains
- Minimal comments — self-documenting code
- Test names: lowercase, descriptive, start with a verb
