import { APP_URLS, NAVIGATION_DEMO_DATA } from '../../support/constants';
import LoginPage from '../pages/LoginPage';

describe('Cypress Browser Navigation Demonstration', () => {
  beforeEach(() => {
    LoginPage.open(APP_URLS.login);
  });

  it('should demonstrate full browser navigation flow (back, forward, and reload)', () => {
    // 1. Initial State: Assert we are on the login page
    cy.url().should('include', NAVIGATION_DEMO_DATA.urlSubstrings.loginPath);
    LoginPage.getElement(LoginPage.loginTitle)
      .should('be.visible')
      .and('have.text', NAVIGATION_DEMO_DATA.loginTitle);

    // 2. Navigate away: Click on "Forgot your password?" link
    LoginPage.click(LoginPage.forgotPasswordLink);

    // Assert we navigated to the Reset Password page
    cy.url().should('include', NAVIGATION_DEMO_DATA.urlSubstrings.resetPasswordPath);
    cy.contains(NAVIGATION_DEMO_DATA.resetPasswordTitle).should('be.visible');

    // 3. Browser Back navigation: Go back to the Login page using cy.go('back')
    cy.log('Navigating backward in browser history...');
    cy.go('back');

    // Assert we are back on the login page
    cy.url().should('include', NAVIGATION_DEMO_DATA.urlSubstrings.loginPath);
    LoginPage.getElement(LoginPage.loginButton).should('be.visible');

    // 4. Browser Forward navigation: Go forward in history using cy.go('forward')
    cy.log('Navigating forward in browser history...');
    cy.go('forward');

    // Assert we are back on the Reset Password page
    cy.url().should('include', NAVIGATION_DEMO_DATA.urlSubstrings.resetPasswordPath);
    cy.contains(NAVIGATION_DEMO_DATA.resetPasswordTitle).should('be.visible');

    // 5. Browser Back navigation (alternative format): Using numeric index -1
    cy.log('Navigating backward using index -1...');
    cy.go(-1);

    // Assert we are on the Login page
    cy.url().should('include', NAVIGATION_DEMO_DATA.urlSubstrings.loginPath);

    // 6. Application level navigation: Navigate back to forgot password page, then cancel
    LoginPage.click(LoginPage.forgotPasswordLink);
    LoginPage.click(LoginPage.cancelForgotPasswordButton);

    // Assert cancel navigation brings us back to the Login page
    cy.url().should('include', NAVIGATION_DEMO_DATA.urlSubstrings.loginPath);

    // 7. Page Reload: Reload page using cy.reload()
    cy.log('Reloading the page...');
    cy.reload();

    // Assert that components are still visible after normal reload
    LoginPage.getElement(LoginPage.loginTitle)
      .should('be.visible')
      .and('have.text', NAVIGATION_DEMO_DATA.loginTitle);

    // 8. Page Reload with Cache Bypass: Reload the page forcing to bypass browser cache
    cy.log('Reloading the page and forcing cache bypass...');
    cy.reload(true);

    // Assert elements are visible after forced cache-bypass reload
    LoginPage.getElement(LoginPage.usernameInput).should('be.visible');
    LoginPage.getElement(LoginPage.passwordInput).should('be.visible');
  });
});
