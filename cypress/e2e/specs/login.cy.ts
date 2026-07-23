import LoginPage from '../pages/LoginPage';
import loginData from '../../fixtures/loginData.json';
import { APP_URLS, ASSERTION_TEXT } from '../../support/constants';

describe('OrangeHRM Login Tests', () => {
  beforeEach(() => {
    LoginPage.open(APP_URLS.login);
  });

  it('should login successfully with valid credentials', () => {
    LoginPage.login(loginData.validUser.username, loginData.validUser.password);
    LoginPage.isLoggedIn();
  });

  it('should show error message with invalid credentials', () => {
    LoginPage.login(loginData.invalidUser.username, loginData.invalidUser.password);
    LoginPage.getLoginErrorMessage().should('contain', ASSERTION_TEXT.loginError);
  });
});
