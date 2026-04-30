# Example: Q-Assisted UI Test Creation

This walkthrough shows how Amazon Q Developer was used to generate a complete UI test for the QE Playground dashboard page, following the accelerator's POM pattern.

---

## Step 1 — Prompt Q to Generate the Page Object

**Prompt sent to Amazon Q:**

```
Create a Playwright page object for the Dashboard page.

Page URL: /dashboard
Key elements:
- Welcome message (data-testid="welcome-message")
- Search input (data-testid="search-input")
- Status filter dropdown (data-testid="status-filter")
- Add task button (data-testid="add-task-button")
- Task table (data-testid="task-table")
- Task count (data-testid="task-count")

User actions to support:
- open() — navigate to the dashboard
- getWelcomeText() — return the welcome message text
- searchTasks(query) — type a search query
- filterByStatus(status) — select a status from the dropdown
- clickAddTask() — click the add task button
- getTaskCount() — return the task count text

Follow the pattern in @src/pages/base.page.ts and @src/pages/login.page.ts
```

**Q generated `src/pages/dashboard.page.ts`:**

```typescript
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  private welcomeMessage = this.page.getByTestId('welcome-message');
  private searchInput = this.page.getByTestId('search-input');
  private statusFilter = this.page.getByTestId('status-filter');
  private addTaskButton = this.page.getByTestId('add-task-button');
  private taskTable = this.page.getByTestId('task-table');
  private taskCount = this.page.getByTestId('task-count');

  async open(): Promise<void> {
    await this.navigate('/dashboard');
  }

  async getWelcomeText(): Promise<string> {
    return this.welcomeMessage.innerText();
  }

  async searchTasks(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async filterByStatus(status: string): Promise<void> {
    await this.statusFilter.selectOption(status);
  }

  async clickAddTask(): Promise<void> {
    await this.addTaskButton.click();
  }

  async getTaskCount(): Promise<string> {
    return this.taskCount.innerText();
  }
}
```

---

## Step 2 — Prompt Q to Generate the Test Spec

**Prompt sent to Amazon Q:**

```
Generate a Playwright UI test for the Dashboard page.

Requirements:
- Requires login before each test (use LoginPage and TEST_USERS)
- Test scenarios:
  1. displays welcome message with user name
  2. shows task table with seeded tasks
  3. filters tasks by status

Use the DashboardPage object from @src/pages/dashboard.page.ts
Reference @tests/ui/login.spec.ts for the test structure.
```

**Q generated `tests/ui/dashboard.spec.ts`:**

```typescript
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

  test('displays task table with seeded tasks', async () => {
    expect(await dashboardPage.isTaskTableVisible()).toBe(true);
  });

  test('filters tasks by status', async () => {
    await dashboardPage.filterByStatus('todo');
    const statuses = await dashboardPage.getTaskStatuses();
    for (const status of statuses) {
      expect(status).toBe('todo');
    }
  });
});
```

---

## Step 3 — Prompt Q to Refine

After running the tests, the welcome message assertion was brittle because the in-memory store can be mutated by other tests. Follow-up prompt:

```
The "displays welcome message" test is fragile because the user name can change
if other tests mutate the store. Refine it to check for the "Welcome," prefix instead.
```

Q suggested using a regex match: `expect(await dashboardPage.getWelcomeText()).toMatch(/Welcome,/)`.

---

## Key Takeaways

1. **Reference existing files with `@`** — Q produces code that matches your patterns exactly
2. **Split page object and test generation** into separate prompts for better results
3. **Run the tests, then ask Q to refine** — the iterative loop is where Q adds the most value
4. **The `.amazonq/rules/` file auto-injects conventions** — you don't need to repeat framework rules in every prompt
