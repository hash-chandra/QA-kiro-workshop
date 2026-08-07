# Session 1 — Manual Testing with Amazon Q

**Duration:** 1 hour
**Audience:** Experienced QA engineers
**Goal:** Use Amazon Q to accelerate every phase of manual testing — test case design, coverage analysis, exploratory charters, and bug reporting.

No code. No IDE setup needed. Just Amazon Q Chat.

---

## What You'll Learn

- Let Q derive all test scenarios (positive, negative, edge) from a feature description — you provide context, Q does the thinking
- Identify coverage gaps in an existing test suite
- Create exploratory testing charters
- Write structured bug reports faster
- Generate acceptance criteria and test cases from a user story

---

## The App Under Test

**QE Playground** — a task management app. Open `specs/qe-playground-spec.md` — this is the feature context you'll feed to Q throughout this session. Think of it as your Jira ticket / AC document.

---

## Demo 1 — Generate a Complete Test Suite from a Feature Description (15 min)

The key shift: you give Q the feature description and ask it to identify what to test. You don't pre-think the scenarios.

### Prompt 1 — Full test suite from spec

```
I am a QA engineer. Here is the feature specification for the Login page:

[PASTE the Login-relevant section from specs/qe-playground-spec.md]

Analyse this spec and generate a complete test suite covering all positive,
negative, and edge cases you can identify. For each category, explain why
those scenarios matter.

Format as a table: | Test Case ID | Category | Title | Precondition | Steps | Expected Result |
```

**What to observe:**
- Q identifies scenario categories you may not have thought of
- Compare Q's list against what you would have written manually — note the gaps
- The spec gave Q everything it needed; you listed nothing yourself

### Prompt 1 follow-up — Push deeper on a category

After reviewing Q's output, pick one category and ask Q to go deeper:

```
The security and session management scenarios look thin.
Based on the same spec, what additional test cases should I add in those areas?
```

---

## Demo 2 — Coverage Gap Analysis (10 min)

You have an existing test suite. Ask Q to find what's missing — without telling it where to look.

### Prompt 2A — Identify gaps

```
Here is my current test suite for the Login feature:

TC-001: Valid admin login redirects to dashboard
TC-002: Invalid password shows error message
TC-003: Empty email field shows validation

Based on the Login spec I shared earlier, what test scenarios am I missing?
```

### Prompt 2B — Prioritize by risk

```
From the gaps you identified, rank the top 3 by risk.
Consider: likelihood of failure in production, user impact, and how hard the bug would be to detect manually.
```

---

## Demo 3 — Exploratory Testing Charter (10 min)

### Prompt 3 — Generate a charter from the spec

```
I need to do an exploratory testing session on the Dashboard feature.

Here is the spec: [PASTE the Dashboard-relevant section from specs/qe-playground-spec.md]

Generate an exploratory testing charter. Include: mission, target area,
suggested time box, risks to investigate, and oracles to use.
```

### Prompt 3B — Session notes template

```
Give me a session notes template to fill in during that exploratory session.
Include: observations, bugs found, questions raised, coverage achieved.
```

---

## Demo 4 — Bug Report Writing (10 min)

### Prompt 4A — Write a bug report from rough notes

```
I found a bug. Here are my rough notes:
"search box - typed 'fix' - table showed nothing but there are tasks with 'fix' in the title -
refreshed page - tasks are there - search broken?"

Write a professional bug report with: Title, Environment, Severity and Priority,
Steps to Reproduce, Expected Result, Actual Result, Attachments needed.
```

### Prompt 4B — Improve a weak bug report

```
Review this bug report and make it specific, reproducible, and professional:

Title: Login doesn't work
Steps: Go to login page, enter details, click login
Expected: Should work
Actual: It doesn't
```

---

## Demo 5 — Acceptance Criteria and Test Cases from a User Story (10 min)

### Prompt 5A — AC + test cases from a user story

```
Here is a user story:
"As a logged-in user, I want to filter tasks by status so I can focus on what's relevant."

1. Generate acceptance criteria in Given/When/Then format.
2. Generate a complete test suite from those criteria — positive, negative, and edge cases.
```

### Prompt 5B — Review your own test cases

```
Review these test cases and identify all weaknesses:

TC-010: Create a task
Steps: Click Add Task, fill in title, click Save
Expected: Task appears in the table

TC-011: Delete a task
Steps: Click delete on a task
Expected: Task is removed
```

---

## Key Takeaways

| What Q accelerates | How |
|--------------------|-----|
| Test case generation | Give Q the spec → Q derives all scenarios, you list nothing |
| Coverage gaps | Paste your existing cases → Q finds what's missing |
| Exploratory charters | Give Q the spec → Q creates a time-boxed mission |
| Bug reports | Paste rough notes → Q writes a professional report |
| AC + test cases | Paste user story → Q generates Given/When/Then + full test suite |

---

## Tips for Effective Q Prompting (Manual Testing)

- **Give context, not scenarios** — paste the spec or AC, let Q decide what to test
- **Specify the output format** — table, Given/When/Then, bullet list — Q will follow it
- **Iterate** — ask Q to go deeper on a specific risk area after reviewing its first output
- **Use Q as a reviewer** — paste your own test cases and ask "what am I missing?"
- **Constraints matter** — "in-memory store resets on restart", "no account lockout" — these details change what Q generates

---

## Session Wrap-Up

Next session: [Session 2 — Build the App and Framework with Amazon Q](./session-02-build-and-scaffold.md)
