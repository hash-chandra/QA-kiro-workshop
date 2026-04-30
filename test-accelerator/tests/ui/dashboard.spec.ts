import { test, expect } from '../../src/fixtures/base.fixture';
import { LoginPage, DashboardPage } from '../../src/pages';
import { TEST_USERS } from '../../src/helpers';

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
    await dashboardPage.searchTasks('login');
    const titles = await dashboardPage.getTaskTitles();
    expect(titles).toHaveLength(1);
    expect(titles[0]).toContain('login');
  });

  test('filters tasks by status', async () => {
    await dashboardPage.filterByStatus('todo');
    const statuses = await dashboardPage.getTaskStatuses();
    for (const status of statuses) {
      expect(status).toBe('todo');
    }
  });

  test('shows no tasks message for unmatched search', async () => {
    await dashboardPage.searchTasks('nonexistenttask');
    expect(await dashboardPage.isNoTasksMessageVisible()).toBe(true);
  });

  test('creates a new task', async () => {
    await dashboardPage.createTask('New automation task', 'todo', 'tester@playground.dev');
    const titles = await dashboardPage.getTaskTitles();
    expect(titles).toContain('New automation task');
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
    await expect(page).toHaveURL('/');
    const loginPage = new LoginPage(page);
    expect(await loginPage.isFormVisible()).toBe(true);
  });
});
