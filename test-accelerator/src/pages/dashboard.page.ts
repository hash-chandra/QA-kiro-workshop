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

  async createTask(title: string, status: string, assignee: string): Promise<void> {
    await this.clickAddTask();
    await this.taskTitleInput.fill(title);
    await this.taskStatusSelect.selectOption(status);
    await this.taskAssigneeInput.fill(assignee);
    await this.submitTaskButton.click();
  }

  async deleteTask(id: number): Promise<void> {
    await this.page.getByTestId(`delete-task-${id}`).click();
  }

  async getTaskCount(): Promise<string> {
    return this.taskCount.innerText();
  }

  async isTaskTableVisible(): Promise<boolean> {
    return this.taskTable.isVisible();
  }

  async isNoTasksMessageVisible(): Promise<boolean> {
    return this.noTasksMessage.isVisible();
  }

  async isTaskFormVisible(): Promise<boolean> {
    return this.taskForm.isVisible();
  }

  async getTaskFormError(): Promise<string> {
    return this.taskFormError.innerText();
  }

  async getNavbarUserText(): Promise<string> {
    return this.navbarUser.innerText();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  async getTaskTitles(): Promise<string[]> {
    return this.page.getByTestId('task-title').allInnerTexts();
  }

  async getTaskStatuses(): Promise<string[]> {
    return this.page.getByTestId('task-status').allInnerTexts();
  }

  async submitEmptyTask(): Promise<void> {
    await this.submitTaskButton.click();
  }
}
