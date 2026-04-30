import { test, expect } from '../../src/fixtures/base.fixture';
import { ApiHelper, retry } from '../../src/helpers';

test.describe('Unstable API', () => {
  test('GET /api/unstable returns success or 500', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/unstable');
    expect([200, 500]).toContain(res.status());
    const body = await res.json();
    expect(body.delay).toBeDefined();
  });

  test('GET /api/unstable succeeds with retry', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const body = await retry(async () => {
      const res = await api.get('/api/unstable');
      expect(res.status()).toBe(200);
      return res.json();
    }, 5, 500);
    expect(body.success).toBe(true);
    expect(body.timestamp).toBeTruthy();
  });
});
