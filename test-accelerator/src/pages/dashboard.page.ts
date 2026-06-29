import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  private welcomeMessage = this.page.getByTestId('welcome-message');
  private searchInput = this.page.getByTestId('search-input');
  private statusFilter = this.page.getByTestId('status-filter');
  private addTaskButton = this.page.getByTestId('add-task-button');
  private taskTable = this.page.getByTestId('task-table');
  private taskCount = this.page.getByTestId('task-count');
  private noTasksMessage = this.page.getByTestId('no-tasks-message');
  private loadingIndicator = this.page.getByTestId('loading-indicator');

  // Task form locators
  private taskForm = this.page.getByTestId('task-form');
  private taskTitleInput = this.page.getByTestId('task-title-input');
  private taskStatusSelect = this.page.getByTestId('task-status-select');
  private taskAssigneeInput = this.page.getByTestId('task-assignee-input');
  private submitTaskButton = this.page.getByTestId('submit-task-button');
  private taskFormError = this.page.getByTestId('task-form-error');

  // Navbar locators
  private navbarUser = this.page.getByTestId('navbar-user');
  private logoutButton = this.page.getByTestId('logout-button');

  async open(): Promise<void> {
    await this.navigate('/dashboard');
    await this.waitForVisible(this.welcomeMessage);
  }

  async getWelcomeText(): Promise<string> {
    const text = await this.waitForText(this.welcomeMessage);
    return text;
  }

  async searchTasks(query: string): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(query);
    await this.searchInput.dispatchEvent('input');
  }

  async filterByStatus(status: string): Promise<void> {
    await this.statusFilter.waitFor({ state: 'visible' });
    await this.statusFilter.selectOption(status);
  }

  async clickAddTask(): Promise<void> {
    await this.addTaskButton.waitFor({ state: 'visible' });
    await this.addTaskButton.click();
  }

  async createTask(title: string, status: string, assignee: string): Promise<void> {
    await this.clickAddTask();
    await this.taskTitleInput.waitFor({ state: 'visible' });
    await this.taskTitleInput.fill(title);
    await this.taskStatusSelect.waitFor({ state: 'visible' });
    await this.taskStatusSelect.selectOption(status);
    await this.taskAssigneeInput.waitFor({ state: 'visible' });
    await this.taskAssigneeInput.fill(assignee);
    await this.submitTaskButton.waitFor({ state: 'visible' });
    await this.submitTaskButton.click();
  }

  async deleteTask(id: number): Promise<void> {
    const deleteButton = this.page.getByTestId(`delete-task-${id}`);
    await deleteButton.waitFor({ state: 'visible' });
    await deleteButton.click();
  }

  async getTaskCount(): Promise<string> {
    const count = await this.waitForText(this.taskCount);
    return count;
  }

  async isTaskTableVisible(): Promise<boolean> {
    const visible = await this.waitForVisible(this.taskTable);
    return visible;
  }

  async isNoTasksMessageVisible(): Promise<boolean> {
    const visible = await this.waitForVisible(this.noTasksMessage);
    return visible;
  }

  async isTaskFormVisible(): Promise<boolean> {
    const visible = await this.waitForVisible(this.taskForm);
    return visible;
  }

  async getTaskFormError(): Promise<string> {
    const error = await this.waitForText(this.taskFormError);
    return error;
  }

  async getNavbarUserText(): Promise<string> {
    const text = await this.waitForText(this.navbarUser);
    return text;
  }

  async logout(): Promise<void> {
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();
  }

  async getTaskTitles(): Promise<string[]> {
    const firstTitle = this.page.getByTestId('task-title').first();
    await firstTitle.waitFor({ state: 'visible', timeout: 15_000 });
    const titles = await this.page.getByTestId('task-title').allInnerTexts();
    return titles;
  }

  async getTaskStatuses(): Promise<string[]> {
    const firstStatus = this.page.getByTestId('task-status').first();
    await firstStatus.waitFor({ state: 'visible', timeout: 15_000 });
    const statuses = await this.page.getByTestId('task-status').allInnerTexts();
    return statuses;
  }

  async submitEmptyTask(): Promise<void> {
    await this.submitTaskButton.waitFor({ state: 'visible' });
    await this.submitTaskButton.click();
  }
}
