# Pre-Training Setup

Complete this before Session 1. Takes ~15 minutes.

---

## 1. Tools to Install

| Tool | Version | Check |
|------|---------|-------|
| Node.js | ≥ 22 | `node -v` |
| VS Code | Latest | — |
| Amazon Q Developer extension | Latest | VS Code Extensions panel |
| Git | Any | `git -v` |

---

## 2. Clone the Repo

```bash
git clone <repo-url>
cd test-automation-workspace
```

---

## 3. Install App Dependencies

```bash
cd qe-playground
npm run install:all
```

Verify it starts:

```bash
npm run dev
```

Open `http://localhost:5173` — you should see the login page.
Login with `admin@playground.dev` / `admin123`.

Stop the server (`Ctrl+C`) after verifying.

---

## 4. Install Framework Dependencies

```bash
cd ../test-accelerator
npm install
npx playwright install chromium
```

Verify tests run:

```bash
npm test
```

All tests should pass (or show a known baseline).

---

## 5. Open the Workspace in VS Code

```bash
code /path/to/test-automation-workspace
```

Confirm Amazon Q Developer is active — you should see the Q icon in the sidebar.

---

## 6. Understand the Repo Layout

```
test-automation-workspace/
├── qe-playground/          # App under test (React + Fastify)
└── test-accelerator/       # Playwright framework + Q workflows
    ├── .amazonq/rules/     # Auto-injected Q conventions
    ├── docs/q-workflows/   # All training prompts live here
    ├── src/                # Page objects, helpers, fixtures
    └── tests/              # UI and API test specs
```

---

## 7. Session Starting States

See [sessions/session-states/README.md](./session-states/README.md) for the full breakdown of what should exist at the start of each session and how to use the git branch snapshots to catch up.
