import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private emailInput = this.page.getByTestId('email-input');
  private passwordInput = this.page.getByTestId('password-input');
  private loginButton = this.page.getByTestId('login-button');
  private loginError = this.page.getByTestId('login-error');
  private loginForm = this.page.getByTestId('login-form');

  async open(): Promise<void> {
    await this.navigate('/');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return this.loginError.innerText();
  }

  async isFormVisible(): Promise<boolean> {
    return this.loginForm.isVisible();
  }

  async isLoginButtonDisabled(): Promise<boolean> {
    return this.loginButton.isDisabled();
  }
}
