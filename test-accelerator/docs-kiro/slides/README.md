# Slide Deck Outlines

Each session has a slide section (10-15 min) followed by live demo (45-50 min).  
Use these outlines to build your presentation slides.

---

## Recommended Slide Tool

- Google Slides, Keynote, or PowerPoint
- Keep slides visual — screenshots of Kiro IDE, diagrams, comparison tables
- Limit text per slide — the demo is where learning happens

---

## Slide Structure Per Session

```
1. Title slide (session name + date + presenter)
2. Agenda (what we'll cover)
3. Concept slides (2-4 slides explaining the theory)
4. Comparison table (Kiro vs Copilot vs Q — when relevant)
5. Demo preview (what we're about to do live)
6. [LIVE DEMO happens here]
7. Key takeaways (summary slide)
8. Next session preview
```

---

## Session-Specific Slide Content

### Session 1 — Kiro Fundamentals + Manual Testing
- What is Kiro (standalone IDE, not extension)
- Two session types (Vibe vs Spec) — with diagram
- Two autonomy modes (Autopilot vs Supervised)
- Feature comparison table (Kiro vs Copilot vs Q)
- Key features for QA (Steering, Hooks, MCP, Sub-agents)
- When to use which tool
- Source-aware testing (Kiro reads code, discovers scenarios)
- Manual testing workflows: test cases, gap analysis, charters

### Session 2 — Framework Scaffolding + Steering
- The problem with ad-hoc framework building
- Specs workflow diagram (Requirements → Design → Tasks → Implementation)
- Steering files: define once, enforce always
- Steering inclusion modes (auto, fileMatch, manual)
- When to use Specs vs Vibe (decision matrix)
- Demo preview: building a framework with Specs

### Session 3 — UI & API Test Automation
- Kiro's approach: source discovery + steering enforcement
- UI workflow: source → page object → test spec → iterate
- API workflow: route source → endpoint discovery → test coverage
- The iteration loop: generate → run → fix → refine
- Demo preview: page object + UI tests + API tests from source

### Session 4 — Debugging, Refactoring & Hooks
- Kiro debugging advantage (#Terminal, #Problems, source cross-ref)
- The debug loop (fail → read → diagnose → fix → verify)
- Refactoring with steering (conventions maintained)
- Hooks overview: event types and action types
- Hook templates for QA (lint, test, review, convention check)
- Full workflow: Steering + Specs + Hooks = quality pipeline

### Session 5 — Q&A + Open Lab
- No slides needed — fully interactive
- Have the workshop recap slide ready
- Resources/links slide for wrap-up

### Advanced — MCP, Sub-agents & Spec at Scale
- MCP architecture diagram (Kiro → MCP → Playwright → Browser)
- When to use MCP vs source code
- Sub-agents: divide and conquer
- Spec-driven modules (accessibility, visual, performance)
- Combining all features for enterprise-grade workflow

---

## Visual Assets to Prepare

- [ ] Screenshot: Kiro IDE with chat panel open
- [ ] Screenshot: Spec session phases (Requirements/Design/Tasks)
- [ ] Screenshot: Steering file being auto-applied
- [ ] Screenshot: Hook triggering after file save
- [ ] Screenshot: Playwright MCP navigating the app (Advanced session)
- [ ] Diagram: Specs workflow (Requirements → Design → Tasks → Implementation)
- [ ] Diagram: MCP architecture (Kiro → MCP Protocol → Server → Browser)
- [ ] Table: Feature comparison (Kiro vs Copilot vs Q)
- [ ] GIF/Video: Full cycle demo (prompt → generation → test run → pass)

---

## Demo Tips

- Use a large terminal font (audience needs to read)
- Pre-start the QE Playground app before the session
- Have the test-accelerator project open in Kiro
- Keep a "backup" of working prompts in case live prompting goes differently
- Use Supervised mode during demo so audience can see each change
- Switch to Autopilot to show the speed difference
- For Q&A session: have the demo project ready for any live exploration
