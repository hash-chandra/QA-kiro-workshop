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
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return this.waitForText(this.loginError);
  }

  async isFormVisible(): Promise<boolean> {
    return this.waitForVisible(this.loginForm);
  }

  async isLoginButtonDisabled(): Promise<boolean> {
    await this.loginButton.waitFor({ state: 'visible' });
    return this.loginButton.isDisabled();
  }
}
