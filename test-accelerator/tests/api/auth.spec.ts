import { test, expect } from '../../src/fixtures/base.fixture';
import { ApiHelper, TEST_USERS } from '../../src/helpers';

test.describe('Auth API', () => {
  test('POST /api/auth/login succeeds with valid credentials', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.post('/api/auth/login', {
      email: TEST_USERS.admin.email,
      password: TEST_USERS.admin.password,
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.user.email).toBe(TEST_USERS.admin.email);
  });

  test('POST /api/auth/login fails with invalid credentials', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.post('/api/auth/login', {
      email: 'wrong@example.com',
      password: 'wrong',
    });
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.success).toBe(false);
  });

  test('GET /api/auth/me returns 401 when not authenticated', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/auth/me');
    expect(res.status()).toBe(401);
  });

  test('GET /api/auth/me returns user when authenticated', async ({ authedApiContext }) => {
    const api = new ApiHelper(authedApiContext);
    const res = await api.get('/api/auth/me');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.user.email).toBe(TEST_USERS.admin.email);
  });

  test('POST /api/auth/logout clears session', async ({ authedApiContext }) => {
    const api = new ApiHelper(authedApiContext);
    const logoutRes = await api.post('/api/auth/logout', {});
    expect(logoutRes.status()).toBe(200);
  });
});
