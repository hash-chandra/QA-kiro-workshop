import { test, expect } from '../../src/fixtures/base.fixture';
import { LoginPage, DashboardPage } from '../../src/pages';
import { TEST_USERS, uniqueId } from '../../src/helpers';

test.describe('Dashboard Page', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(TEST_USERS.admin.email, TEST_USERS.admin.password);
    await expect(page).toHaveURL(/\/dashboard/);
    dashboardPage = new DashboardPage(page);
  });

  test('displays welcome message with user name', async () => {
    expect(await dashboardPage.getWelcomeText()).toContain(TEST_USERS.admin.name);
  });

  test('displays navbar with user email', async () => {
    expect(await dashboardPage.getNavbarUserText()).toBe(TEST_USERS.admin.email);
  });

  test('displays task table with seeded tasks', async () => {
    expect(await dashboardPage.isTaskTableVisible()).toBe(true);
    expect(await dashboardPage.getTaskCount()).toMatch(/\d+ task\(s\)/);
  });

  test('searches tasks by title', async () => {
    const title = uniqueId('search-task');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toEqual([title]);
    }).toPass({ timeout: 15_000 });
  });

  test('filters tasks by status', async () => {
    await dashboardPage.filterByStatus('todo');
    await expect(async () => {
      const statuses = await dashboardPage.getTaskStatuses();
      expect(statuses.length).toBeGreaterThan(0);
      for (const status of statuses) {
        expect(status).toBe('todo');
      }
    }).toPass({ timeout: 15_000 });
  });

  test('shows no tasks message for unmatched search', async () => {
    await dashboardPage.searchTasks('nonexistenttask');
    expect(await dashboardPage.isNoTasksMessageVisible()).toBe(true);
  });

  test('creates a new task', async () => {
    const title = uniqueId('new-task');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(title);
    }).toPass({ timeout: 15_000 });
  });

  test('shows task form validation error for empty title', async () => {
    await dashboardPage.clickAddTask();
    expect(await dashboardPage.isTaskFormVisible()).toBe(true);
    await dashboardPage.submitEmptyTask();
    expect(await dashboardPage.getTaskFormError()).toBe('Title is required');
  });

  test('toggles task form visibility', async () => {
    await dashboardPage.clickAddTask();
    expect(await dashboardPage.isTaskFormVisible()).toBe(true);
    await dashboardPage.clickAddTask(); // cancel
    expect(await dashboardPage.isTaskFormVisible()).toBe(false);
  });

  test('logs out and redirects to login', async ({ page }) => {
    await dashboardPage.logout();
    await expect(page).toHaveURL(/\/$/);  
    const loginPage = new LoginPage(page);
    expect(await loginPage.isFormVisible()).toBe(true);
  });
});
