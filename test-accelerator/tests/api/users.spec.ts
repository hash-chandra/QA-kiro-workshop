import { test, expect } from '../../src/fixtures/base.fixture';
import { ApiHelper, randomEmail, uniqueId } from '../../src/helpers';

test.describe('Users API', () => {
  test('GET /api/users returns seeded users', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/users');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.length).toBeGreaterThanOrEqual(2);
  });

  test('GET /api/users/:id returns a single user', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/users/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body.email).toBeTruthy();
  });

  test('GET /api/users/:id returns 404 for non-existent user', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/users/9999');
    expect(res.status()).toBe(404);
  });

  test('POST /api/users creates a new user', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const user = { name: uniqueId('User'), email: randomEmail(), role: 'tester' };
    const res = await api.post('/api/users', user);
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.name).toBe(user.name);
    expect(body.email).toBe(user.email);
    expect(body.id).toBeTruthy();
  });

  test('PUT /api/users/:id updates a user', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    // create a dedicated user so we never mutate a shared seeded user
    const createRes = await api.post('/api/users', {
      name: uniqueId('User'),
      email: randomEmail(),
      role: 'tester',
    });
    const created = await createRes.json();

    const res = await api.put(`/api/users/${created.id}`, { name: 'Updated Admin' });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe('Updated Admin');
  });

  test('DELETE /api/users/:id deletes a user', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    // create a user to delete
    const createRes = await api.post('/api/users', {
      name: uniqueId('Temp'),
      email: randomEmail(),
      role: 'tester',
    });
    const created = await createRes.json();

    const deleteRes = await api.delete(`/api/users/${created.id}`);
    expect(deleteRes.status()).toBe(200);

    const getRes = await api.get(`/api/users/${created.id}`);
    expect(getRes.status()).toBe(404);
  });

  test('DELETE /api/users/:id returns 404 for non-existent user', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.delete('/api/users/9999');
    expect(res.status()).toBe(404);
  });
});
