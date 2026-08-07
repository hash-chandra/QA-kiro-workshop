import { test as base, APIRequestContext, Page } from '@playwright/test';
import { ENV } from '../../config/env.config';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

type Fixtures = {
  apiContext: APIRequestContext;
  authedApiContext: APIRequestContext;
  loggedInPage: { page: Page; dashboardPage: DashboardPage };
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

  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(ENV.testUsers.admin.email, ENV.testUsers.admin.password);
    await page.waitForURL(/\/dashboard/);
    const dashboardPage = new DashboardPage(page);
    await use({ page, dashboardPage });
  },
});

export { expect } from '@playwright/test';
