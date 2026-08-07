import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  // Core locators
  private welcomeMessage = this.page.getByTestId('welcome-message');
  private searchInput = this.page.getByTestId('search-input');
  private statusFilter = this.page.getByTestId('status-filter');
  private addTaskButton = this.page.getByTestId('add-task-button');
  private taskTable = this.page.getByTestId('task-table');
  private taskCount = this.page.getByTestId('task-count');
  private noTasksMessage = this.page.getByTestId('no-tasks-message');

  // Task form locators
  private taskForm = this.page.getByTestId('task-form');
  private taskTitleInput = this.page.getByTestId('task-title-input');
  private taskStatusSelect = this.page.getByTestId('task-status-select');
  private taskAssigneeInput = this.page.getByTestId('task-assignee-input');
  private submitTaskButton = this.page.getByTestId('submit-task-button');
  private taskFormError = this.page.getByTestId('task-form-error');

  // Confirm dialog locators
  private confirmDialog = this.page.getByTestId('confirm-dialog');
  private confirmOkButton = this.page.getByTestId('confirm-ok-button');
  private confirmCancelButton = this.page.getByTestId('confirm-cancel-button');

  // Edit modal locators
  private editModal = this.page.getByTestId('edit-task-modal');
  private editTitleInput = this.page.getByTestId('edit-title-input');
  private editStatusSelect = this.page.getByTestId('edit-status-select');
  private editAssigneeInput = this.page.getByTestId('edit-assignee-input');
  private editSaveButton = this.page.getByTestId('edit-save-button');
  private editCancelButton = this.page.getByTestId('edit-cancel-button');
  private editTaskError = this.page.getByTestId('edit-task-error');

  // Toast locators
  private toastMessage = this.page.getByTestId('toast-message');

  // Navbar locators
  private navbarUser = this.page.getByTestId('navbar-user');
  private logoutButton = this.page.getByTestId('logout-button');

  // --- Navigation ---

  async open(): Promise<void> {
    await this.navigate('/dashboard');
    await this.waitForVisible(this.welcomeMessage);
  }

  // --- Dashboard info ---

  async getWelcomeText(): Promise<string> {
    return this.waitForText(this.welcomeMessage);
  }

  async getNavbarUserText(): Promise<string> {
    return this.waitForText(this.navbarUser);
  }

  async getTaskCount(): Promise<string> {
    return this.waitForText(this.taskCount);
  }

  async isTaskTableVisible(): Promise<boolean> {
    return this.waitForVisible(this.taskTable);
  }

  async isNoTasksMessageVisible(): Promise<boolean> {
    return this.waitForVisible(this.noTasksMessage);
  }

  // --- Search & filter ---

  async searchTasks(query: string): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(query);
    await this.searchInput.dispatchEvent('input');
  }

  async filterByStatus(status: string): Promise<void> {
    await this.statusFilter.waitFor({ state: 'visible' });
    await this.statusFilter.selectOption(status);
  }

  // --- Task CRUD ---

  async clickAddTask(): Promise<void> {
    await this.addTaskButton.waitFor({ state: 'visible' });
    await this.addTaskButton.click();
  }

  async createTask(title: string, status: string, assignee: string): Promise<void> {
    await this.clickAddTask();
    await this.taskTitleInput.waitFor({ state: 'visible' });
    await this.taskTitleInput.fill(title);
    await this.taskStatusSelect.selectOption(status);
    await this.taskAssigneeInput.fill(assignee);
    await this.submitTaskButton.click();
  }

  async isTaskFormVisible(): Promise<boolean> {
    return this.waitForVisible(this.taskForm);
  }

  async getTaskFormError(): Promise<string> {
    return this.waitForText(this.taskFormError);
  }

  async submitEmptyTask(): Promise<void> {
    await this.submitTaskButton.waitFor({ state: 'visible' });
    await this.submitTaskButton.click();
  }

  async getTaskTitles(): Promise<string[]> {
    const firstTitle = this.page.getByTestId('task-title').first();
    await firstTitle.waitFor({ state: 'visible', timeout: 15_000 });
    return this.page.getByTestId('task-title').allInnerTexts();
  }

  async getTaskStatuses(): Promise<string[]> {
    const firstStatus = this.page.getByTestId('task-status').first();
    await firstStatus.waitFor({ state: 'visible', timeout: 15_000 });
    return this.page.getByTestId('task-status').allInnerTexts();
  }

  // --- Row-level actions (by task ID) ---

  async deleteTask(id: number): Promise<void> {
    await this.clickDeleteButton(id);
    await this.confirmDeletion();
  }

  async clickDeleteButton(id: number): Promise<void> {
    const deleteButton = this.page.getByTestId(`delete-task-${id}`);
    await deleteButton.waitFor({ state: 'visible' });
    await deleteButton.click();
  }

  async clickEditButton(id: number): Promise<void> {
    const editButton = this.page.getByTestId(`edit-task-${id}`);
    await editButton.waitFor({ state: 'visible' });
    await editButton.click();
  }

  // --- Row-level actions (by task title) ---

  private getTaskRowByTitle(title: string) {
    return this.page
      .getByTestId('task-title')
      .filter({ hasText: title })
      .locator('xpath=ancestor::tr');
  }

  async clickDeleteButtonByTitle(title: string): Promise<void> {
    const row = this.getTaskRowByTitle(title);
    await row.waitFor({ state: 'visible' });
    const deleteBtn = row.locator('[data-testid^="delete-task-"]');
    await deleteBtn.click();
  }

  async clickEditButtonByTitle(title: string): Promise<void> {
    const row = this.getTaskRowByTitle(title);
    await row.waitFor({ state: 'visible' });
    const editBtn = row.locator('[data-testid^="edit-task-"]');
    await editBtn.click();
  }

  // --- Confirm dialog ---

  async isConfirmDialogVisible(): Promise<boolean> {
    return this.waitForVisible(this.confirmDialog);
  }

  async confirmDeletion(): Promise<void> {
    await this.confirmOkButton.waitFor({ state: 'visible' });
    await this.confirmOkButton.click();
  }

  async cancelDeletion(): Promise<void> {
    await this.confirmCancelButton.waitFor({ state: 'visible' });
    await this.confirmCancelButton.click();
  }

  // --- Edit modal ---

  async isEditModalVisible(): Promise<boolean> {
    return this.waitForVisible(this.editModal);
  }

  async editTask(title: string, status: string, assignee: string): Promise<void> {
    await this.editTitleInput.waitFor({ state: 'visible' });
    await this.editTitleInput.fill(title);
    await this.editStatusSelect.selectOption(status);
    await this.editAssigneeInput.fill(assignee);
    await this.editSaveButton.click();
  }

  async cancelEdit(): Promise<void> {
    await this.editCancelButton.waitFor({ state: 'visible' });
    await this.editCancelButton.click();
  }

  async getEditTitleValue(): Promise<string> {
    await this.editTitleInput.waitFor({ state: 'visible' });
    return this.editTitleInput.inputValue();
  }

  async getEditStatusValue(): Promise<string> {
    await this.editStatusSelect.waitFor({ state: 'visible' });
    return this.editStatusSelect.inputValue();
  }

  async getEditAssigneeValue(): Promise<string> {
    await this.editAssigneeInput.waitFor({ state: 'visible' });
    return this.editAssigneeInput.inputValue();
  }

  async getEditTaskError(): Promise<string> {
    return this.waitForText(this.editTaskError);
  }

  // --- Toast notifications ---

  async getToastMessage(): Promise<string> {
    await this.toastMessage.first().waitFor({ state: 'visible', timeout: 5_000 });
    return this.toastMessage.first().innerText();
  }

  async isToastVisible(): Promise<boolean> {
    return this.waitForVisible(this.toastMessage.first(), 5_000);
  }

  async waitForToastToDisappear(): Promise<void> {
    await this.toastMessage.first().waitFor({ state: 'hidden', timeout: 5_000 });
  }

  // --- Auth ---

  async logout(): Promise<void> {
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();
  }
}
