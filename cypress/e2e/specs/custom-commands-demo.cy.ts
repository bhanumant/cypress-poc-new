import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import FakerApiPage from '../pages/FakerApiPage';

describe('Reusable Cypress Custom Commands Demonstration Suite [@custom-commands, @regression]', () => {
  beforeEach(() => {
    FakerApiPage.loadDynamicFormPortal(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should query DOM elements cleanly using cy.getByTestId() custom command [@custom-commands, @smoke]', () => {
    // Select elements by data-testid
    cy.getByTestId('first-name').should('be.visible');
    cy.getByTestId('last-name').should('be.visible');
    cy.getByTestId('submit-btn').should('be.visible');
  });

  it('should perform form input and assert text using custom commands [@custom-commands, @regression]', () => {
    // Type into data-testid field using slowType
    cy.getByTestId('first-name').type('CustomCommandUser');
    cy.getByTestId('submit-btn').click();

    // Assert element text using custom command
    cy.assertElementText('[data-testid="status-msg"]', 'USER_REGISTERED_SUCCESSFULLY');
  });

  it('should execute loginViaUi custom command gracefully [@custom-commands, @sanity]', () => {
    // Invoke reusable login command
    cy.loginViaUi('enterprise_admin', 'Pass123!');
  });
});
