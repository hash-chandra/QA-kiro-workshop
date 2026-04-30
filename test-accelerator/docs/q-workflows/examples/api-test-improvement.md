# Example: Q-Assisted API Test Improvement

This walkthrough shows how Amazon Q Developer was used to expand and improve the existing Tasks API test suite.

---

## Step 1 — Prompt Q to Expand Coverage

Starting from the existing `tests/api/tasks.spec.ts` which covers GET and POST, we asked Q to add full CRUD coverage.

**Prompt sent to Amazon Q:**

```
Expand the API tests in @tests/api/tasks.spec.ts to cover full CRUD operations.

Add tests for:
- GET /api/tasks/:id — returns a single task with id, title, status, assignee fields
- PUT /api/tasks/:id — updates a task and returns the updated data
- DELETE /api/tasks/:id — deletes a task and returns 200, then GET returns 404

Use the existing ApiHelper pattern from @src/helpers/api.helper.ts.
Use randomTask() from @src/helpers/test-data.helper.ts for dynamic test data.
Assert response body shapes, not just status codes.
```

**Q generated the expanded test:**

```typescript
import { test, expect } from '../../src/fixtures/base.fixture';
import { ApiHelper, randomTask } from '../../src/helpers';

test.describe('Tasks API', () => {
  test('GET /api/tasks returns seeded tasks', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/tasks');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.length).toBeGreaterThanOrEqual(5);
  });

  test('GET /api/tasks/:id returns a single task', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/tasks/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
  });

  test('POST /api/tasks creates a new task', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const task = randomTask();
    const res = await api.post('/api/tasks', task);
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.title).toBe(task.title);
    expect(body.id).toBeTruthy();
  });

  test('PUT /api/tasks/:id updates a task', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.put('/api/tasks/1', { title: 'Updated task title' });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe('Updated task title');
  });

  test('DELETE /api/tasks/:id deletes a task', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const createRes = await api.post('/api/tasks', randomTask());
    const created = await createRes.json();

    const deleteRes = await api.delete(`/api/tasks/${created.id}`);
    expect(deleteRes.status()).toBe(200);

    const getRes = await api.get(`/api/tasks/${created.id}`);
    expect(getRes.status()).toBe(404);
  });
});
```

---

## Step 2 — Prompt Q to Strengthen Assertions

**Follow-up prompt:**

```
Review @tests/api/tasks.spec.ts and strengthen the assertions.

Look for:
- Missing response body shape validation
- Weak assertions (toBeTruthy instead of specific checks)
- Missing negative test cases
```

Q identified that the POST test wasn't validating the full response shape and suggested adding `expect.objectContaining` assertions. It also suggested adding negative tests:

```typescript
test('GET /api/tasks/:id returns 404 for non-existent task', async ({ apiContext }) => {
  const api = new ApiHelper(apiContext);
  const res = await api.get('/api/tasks/9999');
  expect(res.status()).toBe(404);
});
```

---

## Step 3 — Prompt Q to Add Filter Tests

**Follow-up prompt:**

```
Add tests for the query parameter filters on GET /api/tasks.
The endpoint supports: status (todo, in-progress, done), assignee, and search.

Reference @src/helpers/test-data.helper.ts for TEST_USERS assignee emails.
```

Q generated filter tests:

```typescript
test('GET /api/tasks filters by status', async ({ apiContext }) => {
  const api = new ApiHelper(apiContext);
  const res = await api.get('/api/tasks', { status: 'todo' });
  expect(res.status()).toBe(200);
  const body = await res.json();
  for (const task of body) {
    expect(task.status).toBe('todo');
  }
});
```

---

## Key Takeaways

1. **Start with existing tests and ask Q to expand** — more effective than generating from scratch
2. **Ask Q to review assertions separately** — it catches gaps you might miss
3. **Reference helper files with `@`** — Q will use your utilities instead of inventing its own
4. **Iterative refinement works well** — prompt → run → refine → repeat
