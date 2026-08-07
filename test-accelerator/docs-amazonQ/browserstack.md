# BrowserStack Integration

Cross-browser execution via BrowserStack Automate using the `browserstack-node-sdk`.

## Prerequisites

1. A BrowserStack Automate account — [sign up](https://www.browserstack.com/users/sign_up)
2. Your credentials from [Account Settings](https://www.browserstack.com/accounts/settings)
3. QE Playground running locally (`cd ../qe-playground && npm run dev`)

## Configuration

Set credentials in `.env` (never commit this file):

```env
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
BROWSERSTACK_BUILD_NAME=optional-custom-build-name
```

Or export them in your shell:

```bash
export BROWSERSTACK_USERNAME=your_username
export BROWSERSTACK_ACCESS_KEY=your_access_key
```

> **Security**: Credentials are read from environment variables only. The `.env` file is gitignored. Never hardcode keys in source.

## How It Works

The integration uses two files:

- **`browserstack.yml`** — defines platforms, local tunnel, and BrowserStack options
- **`browserstack.config.ts`** — Playwright config with increased timeouts for remote execution

The `browserstack-node-sdk` wraps the Playwright runner, automatically:
- Starts/stops the BrowserStack Local tunnel (for localhost access)
- Routes tests to remote browsers defined in `browserstack.yml`
- Reports results to the BrowserStack dashboard

## Execution Commands

| Command | Description |
|---------|-------------|
| `npm run test:bs` | Run UI tests on all platforms (Chrome/Win, Firefox/Win, WebKit/macOS) |
| `npm run test:bs:chrome` | Chrome on Windows 11 only |
| `npm run test:bs:firefox` | Firefox on Windows 11 only |
| `npm run test:bs:safari` | WebKit/Safari on macOS Sonoma only |

## Platform Matrix (browserstack.yml)

| Browser | OS | Version |
|---|---|---|
| Chrome | Windows 11 | latest |
| Firefox | Windows 11 | latest |
| WebKit | macOS Sonoma | latest |

## Viewing Results

- **BrowserStack Dashboard**: https://automate.browserstack.com/ — view sessions, videos, network logs, console logs
- **Playwright HTML Report**: `npm run report` — local report with screenshots/traces

## Timeout Configuration

Remote browsers are slower than local. The BrowserStack config uses increased timeouts:

| Setting | Value | Purpose |
|---|---|---|
| `timeout` | 60s | Overall test timeout |
| `actionTimeout` | 15s | Click, fill, etc. |
| `navigationTimeout` | 30s | Page navigations |
| `expect.timeout` | 15s | Assertion retries |

## Validation Checklist

- [x] Credentials set in `.env`
- [x] `npm run test:bs` executes on BrowserStack
- [x] Sessions visible in BrowserStack Automate dashboard
- [x] Tests pass on multiple browser/OS combinations
- [ ] No credentials committed to source control

## Troubleshooting

| Issue | Resolution |
|---|---|
| `BROWSERSTACK_USERNAME must be set` | Set env vars in `.env` or export in shell |
| Port 45691 already in use | Kill stale process: `pkill -f BrowserStackLocal` |
| Tests timeout on BrowserStack | Increase timeouts in `browserstack.config.ts` |
| `localhost` not reachable | Ensure `browserstackLocal: true` in `browserstack.yml` |
| Flaky tests on remote | Add retries, increase `actionTimeout` |
