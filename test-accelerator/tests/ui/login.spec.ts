import { test, expect } from '../../src/fixtures/base.fixture';
import { LoginPage } from '../../src/pages';
import { TEST_USERS } from '../../src/helpers';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('displays login form', async () => {
    expect(await loginPage.isFormVisible()).toBe(true);
  });

  test('logs in with valid admin credentials', async ({ page }) => {
    await loginPage.login(TEST_USERS.admin.email, TEST_USERS.admin.password);
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('logs in with valid tester credentials', async ({ page }) => {
    await loginPage.login(TEST_USERS.tester.email, TEST_USERS.tester.password);
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('displays error for invalid credentials', async () => {
    await loginPage.login('wrong@example.com', 'wrongpass');
    expect(await loginPage.getErrorMessage()).toBe('Invalid email or password');
  });

  test('displays error when fields are empty', async () => {
    await loginPage.login('', '');
    expect(await loginPage.getErrorMessage()).toBe('Email and password are required');
  });

  test('redirects authenticated user to dashboard', async ({ page }) => {
    await loginPage.login(TEST_USERS.admin.email, TEST_USERS.admin.password);
    await expect(page).toHaveURL(/\/dashboard/);
    await page.goto('/');
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
