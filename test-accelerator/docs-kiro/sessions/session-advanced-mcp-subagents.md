# Advanced Session (Optional) — MCP, Sub-agents & Spec-Driven Development at Scale

**Duration:** ~1 hour (slides + live demo)  
**Audience:** Participants who completed Sessions 1–4 and want to go deeper  
**Goal:** Master Kiro's advanced capabilities — Playwright MCP for browser-driven test discovery, sub-agents for complex tasks, and full Spec-driven test development at scale.

**This session is optional.** Offer it to participants who want more after the core 4 sessions, or to teams planning large-scale adoption.

---

## Slide Deck Outline (15 min)

### MCP (Model Context Protocol) — What and Why

**What:** MCP lets Kiro connect to external tools. For QA, the killer app is **Playwright MCP** — Kiro drives a real browser.

**Why it matters for QA:**
- Kiro navigates the actual app, sees real elements, discovers selectors from rendered DOM
- Instead of reading source code, Kiro interacts with the running app
- Perfect for: exploring unfamiliar apps, visual verification, discovering dynamic content

**How it works:**
```
Kiro Agent  →  MCP Protocol  →  Playwright MCP Server  →  Real Browser
                                                             ↓
                                                    Your App (localhost)
```

**Configuration (`.kiro/settings/mcp.json`):**
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "disabled": false
    }
  }
}
```

### Sub-agents — Divide and Conquer

Sub-agents are specialized Kiro instances that handle delegated tasks:

| Sub-agent | Use Case for QA |
|-----------|----------------|
| `context-gatherer` | Investigate codebase — "find all error handlers and their test coverage" |
| `general-task-execution` | Execute isolated subtasks — "generate tests for this module while I work on another" |

### When to Use MCP vs Source Code vs Sub-agents

| Scenario | Approach |
|----------|----------|
| App source is in the repo | `#File` the components — faster |
| Testing a deployed/external app | Playwright MCP — navigate and discover |
| Dynamic content (rendered by API) | Playwright MCP — sees actual state |
| Large codebase investigation | Sub-agent — focused analysis |
| Parallel test generation | Sub-agent — works independently |
| Complex multi-file initiative | Spec workflow — structured planning |

---

## Live Demo (45 min)

### Demo 1 — Playwright MCP: Browser-Driven Discovery (15 min)

**Setup:** Ensure QE Playground is running (`npm run dev` in qe-playground/).

**Prompt:**
```
Use the Playwright MCP to navigate to http://localhost:5173.
Log in with admin@playground.dev / admin123.

Once on the dashboard, explore the page and tell me:
1. What interactive elements exist?
2. What are their selectors (data-testid, roles, labels)?
3. What user flows are possible?
4. What edge cases should I test based on the actual rendered state?
```

**What to show:**
- Kiro drives a real browser (audience sees navigation happening)
- Discovers elements from the rendered DOM
- Finds dynamic content not obvious from source alone
- Can take screenshots for reference

**Follow-up — generate tests from browser exploration:**
```
Based on what you just discovered in the browser, generate a UI test 
for the "create task" flow. Use the actual selectors you found.
```

**Advanced MCP usage:**
```
Navigate to the dashboard and test the search functionality.
Try: "fix", "nonexistent", empty string, special characters.
Based on the actual app behavior you observe, generate tests that 
verify search works correctly for all scenarios.
```

### Demo 2 — Sub-agents for Complex Investigation (10 min)

**Prompt:**
```
I want to add test coverage for all error handling in the app.
First, investigate the entire qe-playground/server/src/ folder and 
identify every place that returns an error response (4xx or 5xx).

Then, check which of those error paths already have test coverage 
in tests/api/. Give me a gap analysis.
```

**What to show:**
- Kiro uses the context-gatherer sub-agent to explore
- The sub-agent works autonomously, reading multiple files
- Returns focused summary: "these 7 error paths have no test coverage"
- You get actionable results without cluttering the main conversation

**Follow-up:**
```
For the top 3 uncovered error paths, generate tests now.
```

### Demo 3 — Full Spec-Driven Test Module (20 min)

Switch to **Spec session** for a complex multi-file addition:

**Requirements:**
```
Add a complete accessibility testing module to the test-accelerator framework.

Requirements:
1. Integrate @axe-core/playwright for automated accessibility scanning
2. Create reusable a11y helper that scans a page and reports violations
3. Add accessibility tests for all existing pages (Login, Dashboard)
4. Verify WCAG 2.1 Level AA compliance
5. Report violations with: rule ID, affected elements, impact, remediation
6. Only fail on critical and serious violations (not minor)
7. Work with existing fixture system (login before scanning dashboard)
8. New tests in tests/accessibility/ folder
```

**Walk through Spec phases:**

1. **Design** — Kiro proposes file structure, integration approach, reporting format. Review it.
2. **Tasks** — Ordered steps: install deps → create helper → extend fixtures → create tests
3. **Implementation** — Kiro executes. Post-task hooks verify each step.

**Point out:**
- Entire module planned, reviewed, and implemented systematically
- Hooks ensured every step produced working code
- New team member could follow this same Spec for another project
- No ad-hoc prompting — auditable, reproducible

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| Playwright MCP | Kiro drives a real browser — discovers elements from rendered app |
| MCP config | `.kiro/settings/mcp.json` — add servers, auto-connect |
| Sub-agents | Delegate investigation or parallel work |
| Spec at scale | Complex multi-file additions stay structured and verified |
| Combine everything | MCP + Specs + Hooks + Steering = enterprise-grade workflow |

---

## Combining All Features — The Full Stack

```
Daily QA workflow with Kiro:

1. Steering files define team conventions          → Consistency
2. Vibe sessions for quick tasks                  → Speed
3. Specs for complex additions                    → Structure
4. MCP for browser-based discovery               → Real-world accuracy
5. Sub-agents for investigation                  → Focus
6. Hooks for automated verification              → Safety
7. All together = AI-powered QA pipeline         → Productivity
```

---

## Additional Spec Templates for Teams

### Visual Regression Testing
```
Add visual regression tests using Playwright screenshots.
Baselines in tests/visual/snapshots/. Pixel threshold config.
Multiple viewports. Mask dynamic content.
```

### Performance Testing
```
Add performance tests measuring Core Web Vitals.
Fail on threshold breaches. Simulate slow networks.
Generate trend reports.
```

### Cross-Browser Testing
```
Add BrowserStack integration. Same tests, multiple browsers.
Separate configs per browser. npm scripts for each.
```

### CI/CD Integration
```
Add [GitHub Actions / CodeBuild / GitLab CI].
Run tests on push/PR. Upload reports. Parallel execution.
Cache dependencies. Notify on failure.
```

---

## Resources

- [Kiro Documentation](https://kiro.dev/docs)
- [Playwright MCP GitHub](https://github.com/microsoft/playwright-mcp)
- [MCP Protocol Specification](https://modelcontextprotocol.io)
- Workshop prompt templates: `docs-kiro/prompts/`
- Hook examples: `docs-kiro/examples/hook-driven-workflow.md`
- Spec examples: `docs-kiro/examples/spec-driven-test-creation.md`
