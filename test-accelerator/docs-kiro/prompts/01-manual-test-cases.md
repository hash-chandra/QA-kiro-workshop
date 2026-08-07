# Prompt: Generate Manual Test Cases

Use in a Kiro Vibe session to generate manual test cases grounded in actual source code.

---

## From Source Code

```
I am a QA engineer. Analyze these files:
- #File [path/to/frontend-component.jsx]
- #File [path/to/backend-route.js]
- #File [path/to/data-store.js]

Based on the implementation, generate a manual test suite for [FEATURE_NAME].

Cover:
1. Positive scenarios (valid user flows)
2. Negative scenarios (invalid inputs, error handling)
3. Edge cases (boundary values, unusual states)
4. Security considerations (auth, session, injection)

Format as:
| Test Case ID | Category | Title | Precondition | Steps | Expected Result | Priority |

For each scenario, explain why it matters based on what you found in the code.
```

---

## From User Story

```
Here is a user story:
"[paste user story]"

Generate:
1. Acceptance criteria in Given/When/Then format
2. A test suite covering positive, negative, and edge cases
3. Test data requirements for each scenario

Format as:
| ID | Category | Title | Precondition | Steps | Expected Result | Priority |
```

---

## Coverage Gap Analysis

```
Here are my current test cases for [FEATURE_NAME]:

[paste existing test cases]

Now look at #File [source file] and #File [route file].
What scenarios am I missing? Rank gaps by risk (likelihood × impact).
```

---

## Exploratory Charter

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

## Tips

- Use `#File` to reference actual source so Kiro discovers real validations and logic
- Combine frontend + backend files together for full-stack coverage
- Iterate: ask Kiro to go deeper on specific risk areas after the initial suite
- Use the coverage gap template to review your own test cases against the code
