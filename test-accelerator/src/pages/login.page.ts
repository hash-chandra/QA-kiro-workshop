import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private emailInput = this.page.getByTestId('email-input');
  private passwordInput = this.page.getByTestId('password-input');
  private loginButton = this.page.getByTestId('login-button');
  private loginError = this.page.getByTestId('login-error');
  private loginForm = this.page.getByTestId('login-form');

  async open(): Promise<void> {
    await this.navigate('/');
    await this.waitForVisible(this.loginForm);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    const message = await this.waitForText(this.loginError);
    return message;
  }

  async isFormVisible(): Promise<boolean> {
    const visible = await this.waitForVisible(this.loginForm);
    return visible;
  }

  async isLoginButtonDisabled(): Promise<boolean> {
    await this.loginButton.waitFor({ state: 'visible' });
    const disabled = await this.loginButton.isDisabled();
    return disabled;
  }
}
