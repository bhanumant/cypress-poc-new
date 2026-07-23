import BasePage from './BasePage';
import { APP_URLS } from '../../support/constants';

class LoginPage extends BasePage {
  readonly usernameInput = '[name="username"]';
  readonly passwordInput = '[name="password"]';
  readonly loginButton = 'button[type="submit"]';
  readonly submitButton = 'button[type="submit"]';
  readonly errorMessage = '.oxd-alert-content-text';
  readonly userDropdown = '.oxd-userdropdown-name';
  readonly loginTitle = '.orangehrm-login-title';
  readonly loginLogo = '.orangehrm-login-logo';
  readonly allInputs = 'input';
  readonly forgotPasswordLink = '.orangehrm-login-forgot-header';
  readonly cancelForgotPasswordButton = '.orangehrm-forgot-password-button--cancel';


  login(username: string, password: string) {
    this.type(this.usernameInput, username);
    this.type(this.passwordInput, password);
    this.click(this.loginButton);
  }

  getLoginErrorMessage() {
    return this.getText(this.errorMessage);
  }

  isLoggedIn() {
    this.waitForVisible(this.userDropdown);
    cy.url().should('include', APP_URLS.dashboard);
    return this.getElement(this.userDropdown).should('be.visible');
  }
}

export default new LoginPage();
