import { test as base, APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env.config';

type Fixtures = {
  apiContext: APIRequestContext;
  authedApiContext: APIRequestContext;
};

export const test = base.extend<Fixtures>({
  apiContext: async ({ playwright }, use) => {
    const ctx = await playwright.request.newContext({
      baseURL: ENV.apiBaseURL,
    });
    await use(ctx);
    await ctx.dispose();
  },

  authedApiContext: async ({ playwright }, use) => {
    const ctx = await playwright.request.newContext({
      baseURL: ENV.apiBaseURL,
    });
    await ctx.post('/api/auth/login', {
      data: { email: ENV.testUsers.admin.email, password: ENV.testUsers.admin.password },
    });
    await use(ctx);
    await ctx.dispose();
  },
});

export { expect } from '@playwright/test';
