import { APP_URLS, ASSERTION_DEMO_DATA } from '../../support/constants';
import LoginPage from '../pages/LoginPage';

describe('Cypress Assertions Demonstration', () => {
  beforeEach(() => {
    LoginPage.open(APP_URLS.login);
  });

  it('covers implicit assertions (should, and)', () => {
    // 1. URL Assertions
    cy.url()
      .should('include', ASSERTION_DEMO_DATA.urlSubstrings.loginPath)
      .and('contain', ASSERTION_DEMO_DATA.urlSubstrings.domain)
      .and('not.include', ASSERTION_DEMO_DATA.urlSubstrings.notDashboard);

    // 2. Visibility and Existence
    LoginPage.getElement(LoginPage.submitButton)
      .should('be.visible')
      .and('exist');

    // 3. Text content assertions
    LoginPage.getElement(LoginPage.loginTitle)
      .should('be.visible')
      .and('have.text', ASSERTION_DEMO_DATA.loginTitle)
      .and('contain.text', ASSERTION_DEMO_DATA.loginTitlePartial);

    // 4. State assertions
    LoginPage.getElement(LoginPage.usernameInput)
      .should('be.visible')
      .and('be.enabled')
      .and('have.attr', 'placeholder', ASSERTION_DEMO_DATA.usernamePlaceholder);

    // 5. CSS and Class assertions
    LoginPage.getElement(LoginPage.loginLogo)
      .should('have.class', ASSERTION_DEMO_DATA.logoClass)
      .and('be.visible');

    // 6. Checking length / elements count
    LoginPage.getElement(LoginPage.allInputs).should('have.length', ASSERTION_DEMO_DATA.expectedInputCount);
  });

  it('covers explicit assertions (expect / assert)', () => {
    // Grab text and run JS/Chai assertions
    LoginPage.getElement(LoginPage.loginTitle).invoke('text').then((text) => {
      // 1. Equality & type
      expect(text).to.equal(ASSERTION_DEMO_DATA.loginTitle);
      expect(text).to.be.a('string');

      // 2. Pattern matching
      expect(text).to.match(ASSERTION_DEMO_DATA.titleRegex);
    });

    // Extracting an attribute and asserting explicitly
    LoginPage.getElement(LoginPage.usernameInput).invoke('attr', 'placeholder').then((placeholder) => {
      expect(placeholder).to.exist;
      expect(placeholder).to.have.string(ASSERTION_DEMO_DATA.usernamePlaceholder);
    });

    // Custom object assertions
    const sampleObj = { status: 'success', code: 200, roles: ['admin', 'user'] };
    expect(sampleObj).to.have.property('status', 'success');
    expect(sampleObj.code).to.be.greaterThan(100);
    expect(sampleObj.roles).to.include('admin');
  });
});

