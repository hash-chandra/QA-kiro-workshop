# Prompt: Generate Page Object

Use this prompt with Amazon Q to scaffold a new page object following the accelerator's POM pattern.

## Template

```
Create a Playwright page object for the [PAGE_NAME] page.

Page URL: [URL_PATH]
Key elements:
- [ELEMENT_1]: [DESCRIPTION/SELECTOR_HINT]
- [ELEMENT_2]: [DESCRIPTION/SELECTOR_HINT]

User actions to support:
- [ACTION_1]
- [ACTION_2]

Follow the pattern in @src/pages/base.page.ts and @src/pages/login.page.ts:
- Extend BasePage
- Define locators as private properties using this.page.getByTestId() or this.page.getByRole()
- Expose actions as async methods
- Place the file in src/pages/
- Add it to the barrel export in @src/pages/index.ts
```

## Example — Task Detail Page

```
Create a Playwright page object for the Task Detail page.

Page URL: /tasks/:id
Key elements:
- Task title heading (data-testid="task-title")
- Status badge (data-testid="task-status")
- Assignee field (data-testid="task-assignee")
- Edit button (data-testid="edit-task-button")
- Delete button (data-testid="delete-task-button")

User actions to support:
- open(id) — navigate to a specific task detail page
- getTitle() — return the task title text
- getStatus() — return the status badge text
- clickEdit() — click the edit button
- clickDelete() — click the delete button

Follow the pattern in @src/pages/base.page.ts and @src/pages/login.page.ts:
- Extend BasePage
- Define locators as private properties using this.page.getByTestId() or this.page.getByRole()
- Expose actions as async methods
- Place the file in src/pages/
- Add it to the barrel export in @src/pages/index.ts
```
