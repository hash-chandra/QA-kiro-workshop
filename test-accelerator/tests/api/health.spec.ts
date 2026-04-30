import { test, expect } from '../../src/fixtures/base.fixture';
import { ApiHelper } from '../../src/helpers';

test.describe('Health API', () => {
  test('GET /api/health returns ok', async ({ apiContext }) => {
    const api = new ApiHelper(apiContext);
    const res = await api.get('/api/health');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('ok');
  });
});
