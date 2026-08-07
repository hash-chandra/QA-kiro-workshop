# Prompt: Generate Manual Test Cases

Use this in a Kiro Vibe session to generate comprehensive manual test cases from source code.

---

## Template — From Source Code

```
I am a QA engineer. Analyze these files:
- #File [path/to/frontend-component.jsx]
- #File [path/to/backend-route.js]
- #File [path/to/data-store.js]

Based on the actual implementation, generate a complete manual test suite 
for the [FEATURE_NAME] feature.

Cover:
1. Positive scenarios (valid user flows)
2. Negative scenarios (invalid inputs, error handling)
3. Edge cases (boundary values, unusual states)
4. Security considerations (auth, session, injection)

Format as:
| Test Case ID | Category | Title | Precondition | Steps | Expected Result | Priority |

Explain WHY each scenario matters based on what you found in the code.
```

---

## Template — From User Story

```
Here is a user story:
"[paste user story]"

Generate:
1. Acceptance criteria in Given/When/Then format
2. A complete test suite covering positive, negative, and edge cases
3. Test data requirements for each scenario

Format test cases as:
| ID | Category | Title | Precondition | Steps | Expected Result | Priority |
```

---

## Template — Coverage Gap Analysis

```
Here are my current test cases for [FEATURE_NAME]:

[paste existing test cases]

Now look at #File [source file] and #File [route file].
What test scenarios am I missing? Rank gaps by risk (likelihood × impact).
```

---

## Template — Exploratory Charter

```
I need a [TIME]-minute exploratory testing session on [FEATURE_AREA].
Look at #Folder [source folder] to understand the feature.

Generate a charter with:
- Mission statement
- Target areas to explore
- Risks to investigate
- Oracles (how to judge correctness)
- Session notes template
```

---

## Template — Bug Report

```
I found a bug. Here are my rough notes:
"[paste rough notes]"

Write a professional bug report:
- Title (concise, descriptive)
- Severity and Priority
- Environment
- Steps to Reproduce (numbered)
- Expected Result
- Actual Result
- Attachments needed
- Suggested root cause (if detectable from source)
```

---

## Tips

- Use `#File` to reference actual source — Kiro discovers real validations
- Ask "based on the implementation" — forces source-driven scenarios
- Combine frontend + backend files for full coverage
- Iterate: ask Kiro to go deeper on specific risk areas
- Use as a reviewer: paste YOUR cases and ask "what am I missing?"
