# Pre-Training Setup

Complete this before Session 1. Takes ~15 minutes.

---

## 1. Tools to Install

| Tool | Version | Check | Notes |
|------|---------|-------|-------|
| Node.js | ≥ 22 | `node -v` | Required for Playwright + app |
| AWS Kiro IDE | Latest | Download from [kiro.dev](https://kiro.dev) | Kiro is a standalone IDE (not a VS Code extension) |
| Git | Any | `git -v` | For repo management |
| Playwright browsers | Latest | Installed in step 4 | Chromium minimum |

> **Important:** Kiro is NOT a VS Code extension like GitHub Copilot or Amazon Q. It is a standalone IDE built on VS Code technology. Download and install it separately.

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

## 5. Open the Workspace in Kiro

```bash
# Open Kiro and use File > Open Folder
# Navigate to: /path/to/test-automation-workspace
```

**First-time Kiro setup:**
1. Sign in with your AWS account (Builder ID or IAM Identity Center)
2. Familiarize yourself with the Kiro sidebar — you'll see the agent chat panel
3. Check that the chat panel shows "Vibe" as the default session type

---

## 6. Verify Kiro is Working

In the Kiro chat panel, type:

```
What files are in this workspace?
```

Kiro should respond with the folder structure. If it does, you're ready.

---

## 7. Understand the Repo Layout

```
test-automation-workspace/
├── qe-playground/              # App under test (React + Fastify)
├── test-accelerator/           # Playwright framework
│   ├── .kiro/steering/         # Kiro project conventions (created in Session 2)
│   ├── docs-kiro/              # This workshop material
│   ├── docs-amazonQ/           # Amazon Q workshop (for reference)
│   ├── src/                    # Page objects, helpers, fixtures
│   └── tests/                  # UI and API test specs
└── prompt-optimizer/           # VS Code extension (separate project)
```

---

## 8. Kiro vs What You Already Know

If you've used GitHub Copilot or Amazon Q:

| Concept | Copilot / Amazon Q | Kiro |
|---------|-------------------|------|
| IDE | VS Code extension | Standalone IDE |
| Chat | Copilot Chat / Q Chat | Vibe sessions (conversational) |
| Structured work | — | Specs (requirements → design → tasks) |
| Project rules | `.github/copilot-instructions.md` / `.amazonq/rules/` | `.kiro/steering/*.md` |
| Auto-triggers | — | Hooks (run on file events, tool use, etc.) |
| Code completion | Inline suggestions | Inline suggestions + agent mode |
| Autonomy | Manual accept/reject | Autopilot or Supervised mode |

---

## Checklist

- [ ] Node.js ≥ 22 installed
- [ ] Kiro IDE downloaded and installed
- [ ] Signed into Kiro with AWS account
- [ ] Repo cloned
- [ ] QE Playground starts and login works
- [ ] Test-accelerator tests pass
- [ ] Kiro chat responds to a simple question
