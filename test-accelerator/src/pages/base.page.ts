import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  protected async waitForVisible(locator: Locator, timeout = 15_000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  protected async waitForText(locator: Locator, timeout = 15_000): Promise<string> {
    await locator.waitFor({ state: 'visible', timeout });
    const text = await locator.innerText();
    return text;
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    const title = await this.page.title();
    return title;
  }
}
