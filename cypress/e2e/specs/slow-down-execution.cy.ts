import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import BasePage from '../pages/BasePage';

describe('Slow Down Execution & Visual Debugging Pacing Tests [@slowdown, @smoke]', () => {
  const basePage = new BasePage();

  beforeEach(() => {
    basePage.open(WEBDRIVER_UNI_URLS.contactUs);
  });

  it('should slow down execution speed using cy.slowDown() custom command [@slowdown, @smoke]', () => {
    basePage.getElement('#contact_form').should('be.visible');
    cy.slowDown(1000);
    cy.get('input[name="first_name"]').type('SlowExecution');
    cy.slowDown(1000);
    cy.get('input[name="first_name"]').should('have.value', 'SlowExecution');
  });

  it('should type text with keypress delays using cy.slowType() custom command [@slowdown, @regression]', () => {
    // Perform typing with explicit per-keystroke speed delay
    cy.slowType('input[name="last_name"]', 'VisualDebuggingSpeed', 40);

    // Verify typed result
    cy.get('input[name="last_name"]').should('have.value', 'VisualDebuggingSpeed');
  });
});
