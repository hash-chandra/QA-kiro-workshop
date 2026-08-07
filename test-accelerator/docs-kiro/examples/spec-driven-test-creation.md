# Example: Spec-Driven Test Creation

Annotated walkthrough of using Kiro's Spec workflow to add a complete test module.

---

## Scenario

We want to add comprehensive API tests for the `/api/tasks` endpoint, including CRUD operations, filters, validation, and error handling.

---

## Step 1: Switch to Spec Session

In the Kiro chat panel, select **Spec** session type.

---

## Step 2: Provide Requirements

```
Add comprehensive API test coverage for the Tasks endpoint.

Requirements:
1. Test all CRUD operations (Create, Read single, Read all, Update, Delete)
2. Test query parameters: ?status=pending, ?search=keyword
3. Test validation: missing title, invalid status, empty body
4. Test authentication: verify protected routes reject unauthenticated requests
5. Test edge cases: special characters in title, very long titles, concurrent creates
6. All tests must be independent (create own test data, no ordering)
7. Use authedApiContext fixture for authenticated calls
8. Use apiContext fixture for unauthenticated tests
9. Use test data helpers (randomTask, uniqueId) for dynamic data
10. Follow conventions in .kiro/steering/playwright-conventions.md

Source files:
- #[[file:../qe-playground/server/src/routes/tasks.js]]
- #[[file:../qe-playground/server/src/store.js]]
- #[[file:src/fixtures/base.fixture.ts]]
- #[[file:src/helpers/test-data.helper.ts]]
```

---

## Step 3: Review Design (Kiro proposes)

Kiro analyzes the source files and proposes:

**What Kiro discovers from tasks.js:**
- `GET /api/tasks` — list all tasks, supports `?status` and `?search` params
- `GET /api/tasks/:id` — get single task
- `POST /api/tasks` — create task (requires: title, optional: status, description)
- `PUT /api/tasks/:id` — update task
- `DELETE /api/tasks/:id` — delete task
- All routes require authentication (session check middleware)
- Validation: title required, status must be valid enum

**What Kiro discovers from store.js:**
- Valid statuses: pending, in-progress, completed
- Tasks have: id, title, description, status, createdAt, userId
- Seed data includes 5 default tasks

**Proposed file structure:**
```
tests/api/tasks.spec.ts (single file, grouped with test.describe)
  ├── describe('CRUD operations')
  │   ├── creates a task with valid data
  │   ├── reads all tasks
  │   ├── reads a single task by id
  │   ├── updates an existing task
  │   └── deletes a task
  ├── describe('query filters')
  │   ├── filters tasks by status
  │   ├── searches tasks by keyword
  │   └── combines status filter with search
  ├── describe('validation')
  │   ├── rejects task without title
  │   ├── rejects task with invalid status
  │   └── rejects update with invalid id
  ├── describe('authentication')
  │   ├── rejects unauthenticated GET request
  │   ├── rejects unauthenticated POST request
  │   └── rejects unauthenticated DELETE request
  └── describe('edge cases')
      ├── handles special characters in title
      ├── handles very long title
      └── handles concurrent task creation
```

**You review and approve** — or modify before implementation.

---

## Step 4: Review Tasks (Kiro breaks into steps)

Kiro creates ordered implementation tasks:

1. ✅ Verify fixtures and helpers exist (dependencies check)
2. 📋 Create tests/api/tasks.spec.ts with CRUD test group
3. 📋 Add query filter tests
4. 📋 Add validation error tests
5. 📋 Add authentication boundary tests
6. 📋 Add edge case tests
7. 📋 Run full test suite and verify all pass

---

## Step 5: Implementation (Kiro executes)

Kiro works through each task. With a post-task hook configured, tests run after each step.

**Example output (Task 2 — CRUD tests):**

```typescript
import { test, expect } from '../../src/fixtures/base.fixture';
import { randomTask, uniqueId } from '../../src/helpers';

test.describe('tasks API - CRUD operations', () => {
  test('creates a task with valid data', async ({ authedApiContext }) => {
    const task = randomTask();
    const response = await authedApiContext.post('/api/tasks', { data: task });
    
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe(task.title);
    expect(body.status).toBe('pending');
    expect(body.id).toBeDefined();
  });

  test('reads all tasks', async ({ authedApiContext }) => {
    const response = await authedApiContext.get('/api/tasks');
    
    expect(response.status()).toBe(200);
    const tasks = await response.json();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThan(0);
  });

  // ... more tests
});
```

---

## Step 6: Verification

After all tasks complete:

```bash
$ npx playwright test tests/api/tasks.spec.ts --reporter=list

  ✓ tasks API - CRUD operations > creates a task with valid data (45ms)
  ✓ tasks API - CRUD operations > reads all tasks (23ms)
  ✓ tasks API - CRUD operations > reads a single task by id (31ms)
  ✓ tasks API - CRUD operations > updates an existing task (38ms)
  ✓ tasks API - CRUD operations > deletes a task (29ms)
  ✓ tasks API - query filters > filters tasks by status (42ms)
  ✓ tasks API - query filters > searches tasks by keyword (35ms)
  ✓ tasks API - validation > rejects task without title (18ms)
  ✓ tasks API - validation > rejects task with invalid status (16ms)
  ✓ tasks API - authentication > rejects unauthenticated GET request (12ms)
  ...

  15 passed (4.2s)
```

---

## Key Observations

| What Happened | Why It Matters |
|---------------|----------------|
| Kiro read the actual route file | Tests verify real behavior, not documented behavior |
| Design was reviewable before coding | You caught issues early (e.g., missing edge cases) |
| Tasks were ordered logically | Each step was independently verifiable |
| Steering conventions applied automatically | Consistent code without repeating rules |
| Post-task hooks verified each step | No broken intermediate states |
| All tests are independent | Can run in any order, parallelizable |

---

## Compare: Same Task with Ad-Hoc Prompting

Without Specs, you'd need multiple prompts:
1. "Generate API tests for tasks" → gets partial coverage
2. "Add filter tests" → might not follow same patterns
3. "Add auth tests" → inconsistent structure
4. "Fix the imports" → because patterns diverged
5. "Run tests" → failures from accumulated inconsistencies

**With Specs:** One coherent plan, consistent execution, verified at each step.
