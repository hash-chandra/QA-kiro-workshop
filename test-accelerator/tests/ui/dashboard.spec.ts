import { test, expect } from '../../src/fixtures/base.fixture';
import { LoginPage } from '../../src/pages';
import { TEST_USERS, uniqueId } from '../../src/helpers';

test.describe('Dashboard Page', () => {
  test('displays welcome message with user name', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    expect(await dashboardPage.getWelcomeText()).toContain(TEST_USERS.admin.name);
  });

  test('displays navbar with user email', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    expect(await dashboardPage.getNavbarUserText()).toBe(TEST_USERS.admin.email);
  });

  test('displays task table with seeded tasks', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    expect(await dashboardPage.isTaskTableVisible()).toBe(true);
    expect(await dashboardPage.getTaskCount()).toMatch(/\d+ task\(s\)/);
  });

  test('searches tasks by title', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('search-task');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.waitForToastToDisappear();
    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toEqual([title]);
    }).toPass({ timeout: 15_000 });
  });

  test('filters tasks by status', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    await dashboardPage.filterByStatus('todo');
    await expect(async () => {
      const statuses = await dashboardPage.getTaskStatuses();
      expect(statuses.length).toBeGreaterThan(0);
      for (const status of statuses) {
        expect(status).toBe('todo');
      }
    }).toPass({ timeout: 15_000 });
  });

  test('shows no tasks message for unmatched search', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    await dashboardPage.searchTasks('nonexistenttask');
    expect(await dashboardPage.isNoTasksMessageVisible()).toBe(true);
  });

  test('creates a new task', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('new-task');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.waitForToastToDisappear();
    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(title);
    }).toPass({ timeout: 15_000 });
  });

  test('shows task form validation error for empty title', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    await dashboardPage.clickAddTask();
    expect(await dashboardPage.isTaskFormVisible()).toBe(true);
    await dashboardPage.submitEmptyTask();
    expect(await dashboardPage.getTaskFormError()).toBe('Title is required');
  });

  test('toggles task form visibility', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    await dashboardPage.clickAddTask();
    expect(await dashboardPage.isTaskFormVisible()).toBe(true);
    await dashboardPage.clickAddTask(); // cancel
    expect(await dashboardPage.isTaskFormVisible()).toBe(false);
  });

  test('logs out and redirects to login', async ({ loggedInPage }) => {
    const { page, dashboardPage } = loggedInPage;
    await dashboardPage.logout();
    await expect(page).toHaveURL(/\/$/);
    const loginPage = new LoginPage(page);
    expect(await loginPage.isFormVisible()).toBe(true);
  });
});

test.describe('Dashboard — Toast Notifications', () => {
  test('shows success toast when task is created', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('toast-create');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    expect(await dashboardPage.isToastVisible()).toBe(true);
    expect(await dashboardPage.getToastMessage()).toBe('Task created successfully');
  });

  test('shows success toast when task is deleted', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('toast-delete');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.waitForToastToDisappear();

    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(title);
    }).toPass({ timeout: 15_000 });

    await dashboardPage.clickDeleteButtonByTitle(title);
    await dashboardPage.confirmDeletion();

    expect(await dashboardPage.isToastVisible()).toBe(true);
    expect(await dashboardPage.getToastMessage()).toBe('Task deleted successfully');
  });

  test('shows success toast when task is edited', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('toast-edit');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.waitForToastToDisappear();

    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(title);
    }).toPass({ timeout: 15_000 });

    await dashboardPage.clickEditButtonByTitle(title);
    await dashboardPage.editTask(`${title}-updated`, 'done', 'admin@playground.dev');

    expect(await dashboardPage.isToastVisible()).toBe(true);
    expect(await dashboardPage.getToastMessage()).toBe('Task updated successfully');
  });
});

test.describe('Dashboard — Delete Confirmation Dialog', () => {
  test('shows confirmation dialog when delete is clicked', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('confirm-del');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.waitForToastToDisappear();

    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(title);
    }).toPass({ timeout: 15_000 });

    await dashboardPage.clickDeleteButtonByTitle(title);
    expect(await dashboardPage.isConfirmDialogVisible()).toBe(true);
  });

  test('cancelling delete dialog keeps the task', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('cancel-del');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.waitForToastToDisappear();

    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(title);
    }).toPass({ timeout: 15_000 });

    await dashboardPage.clickDeleteButtonByTitle(title);
    await dashboardPage.cancelDeletion();

    const titles = await dashboardPage.getTaskTitles();
    expect(titles).toContain(title);
  });

  test('confirming delete removes the task', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('del-task');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.waitForToastToDisappear();

    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(title);
    }).toPass({ timeout: 15_000 });

    await dashboardPage.clickDeleteButtonByTitle(title);
    await dashboardPage.confirmDeletion();

    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).not.toContain(title);
    }).toPass({ timeout: 15_000 });
  });
});

test.describe('Dashboard — Edit Task Modal', () => {
  test('opens edit modal with pre-filled data', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('edit-prefill');
    await dashboardPage.createTask(title, 'in-progress', 'tester@playground.dev');
    await dashboardPage.waitForToastToDisappear();

    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(title);
    }).toPass({ timeout: 15_000 });

    await dashboardPage.clickEditButtonByTitle(title);
    expect(await dashboardPage.isEditModalVisible()).toBe(true);
    expect(await dashboardPage.getEditTitleValue()).toBe(title);
    expect(await dashboardPage.getEditStatusValue()).toBe('in-progress');
    expect(await dashboardPage.getEditAssigneeValue()).toBe('tester@playground.dev');
  });

  test('edits task title and status', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('edit-task');
    const updatedTitle = uniqueId('edited');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.waitForToastToDisappear();

    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(title);
    }).toPass({ timeout: 15_000 });

    await dashboardPage.clickEditButtonByTitle(title);
    await dashboardPage.editTask(updatedTitle, 'done', 'admin@playground.dev');

    await dashboardPage.searchTasks(updatedTitle);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(updatedTitle);
    }).toPass({ timeout: 15_000 });
  });

  test('cancel edit does not modify the task', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('cancel-edit');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.waitForToastToDisappear();

    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(title);
    }).toPass({ timeout: 15_000 });

    await dashboardPage.clickEditButtonByTitle(title);
    await dashboardPage.cancelEdit();

    const titles = await dashboardPage.getTaskTitles();
    expect(titles).toContain(title);
  });

  test('edit modal shows validation error for empty title', async ({ loggedInPage }) => {
    const { dashboardPage } = loggedInPage;
    const title = uniqueId('edit-validate');
    await dashboardPage.createTask(title, 'todo', 'tester@playground.dev');
    await dashboardPage.waitForToastToDisappear();

    await dashboardPage.searchTasks(title);
    await expect(async () => {
      const titles = await dashboardPage.getTaskTitles();
      expect(titles).toContain(title);
    }).toPass({ timeout: 15_000 });

    await dashboardPage.clickEditButtonByTitle(title);
    await dashboardPage.editTask('', 'todo', 'tester@playground.dev');
    expect(await dashboardPage.getEditTaskError()).toBe('Title is required');
  });
});
