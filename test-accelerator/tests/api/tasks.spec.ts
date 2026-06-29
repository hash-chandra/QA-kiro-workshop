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

  test('GET /api/tasks filters by status', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/tasks', { status: 'todo' });
    expect(res.status()).toBe(200);
    const body = await res.json();
    for (const task of body) {
      expect(task.status).toBe('todo');
    }
  });

  test('GET /api/tasks filters by search', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/tasks', { search: 'login' });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.length).toBeGreaterThan(0);
    for (const task of body) {
      expect(task.title.toLowerCase()).toContain('login');
    }
  });

  test('GET /api/tasks/:id returns a single task', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/tasks/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
  });

  test('GET /api/tasks/:id returns 404 for non-existent task', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/tasks/9999');
    expect(res.status()).toBe(404);
  });

  test('POST /api/tasks creates a new task', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const task = randomTask();
    const res = await api.post('/api/tasks', task);
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.title).toBe(task.title);
    expect(body.status).toBe(task.status);
    expect(body.id).toBeTruthy();
  });

  test('PUT /api/tasks/:id updates a task', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    // create a dedicated task so we never mutate a shared seeded task
    const createRes = await api.post('/api/tasks', randomTask());
    const created = await createRes.json();

    const res = await api.put(`/api/tasks/${created.id}`, { title: 'Updated task title' });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe('Updated task title');
  });

  test('DELETE /api/tasks/:id deletes a task', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    // create a task to delete
    const createRes = await api.post('/api/tasks', randomTask());
    const created = await createRes.json();

    const deleteRes = await api.delete(`/api/tasks/${created.id}`);
    expect(deleteRes.status()).toBe(200);

    const getRes = await api.get(`/api/tasks/${created.id}`);
    expect(getRes.status()).toBe(404);
  });

  test('DELETE /api/tasks/:id returns 404 for non-existent task', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.delete('/api/tasks/9999');
    expect(res.status()).toBe(404);
  });
});
