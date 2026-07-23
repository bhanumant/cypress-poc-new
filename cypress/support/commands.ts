/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Slows down execution speed by adding a controlled delay for visual debugging.
       * @param delayMs Delay duration in milliseconds (default: 1000ms)
       */
      slowDown(delayMs?: number): Chainable<void>;

      /**
       * Types text into a DOM element with controlled delay between keystrokes.
       * @param selector CSS Selector
       * @param text Text content to type
       * @param delayMs Typing delay per keypress in milliseconds (default: 80ms)
       */
      slowType(selector: string, text: string, delayMs?: number): Chainable<JQuery<HTMLElement>>;

      /**
       * Performs UI login using custom reusable command.
       * @param username User credential
       * @param password Password credential
       */
      loginViaUi(username?: string, password?: string): Chainable<void>;

      /**
       * Selects DOM element by data-testid attribute.
       * @param testId Value of data-testid attribute
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Asserts that a DOM element contains specified text content.
       * @param selector CSS Selector
       * @param expectedText Expected text substring
       */
      assertElementText(selector: string, expectedText: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// 1. slowDown custom command implementation
Cypress.Commands.add('slowDown', (delayMs: number = 1000) => {
  cy.log(`[SlowDown Command] Pausing execution for ${delayMs}ms for visual inspection...`);
  cy.wait(delayMs);
});

// 2. slowType custom command implementation
Cypress.Commands.add('slowType', (selector: string, text: string, delayMs: number = 80) => {
  cy.log(`[SlowType Command] Typing "${text}" into ${selector} with ${delayMs}ms delay per keypress`);
  return cy.get(selector).should('be.visible').clear().type(text, { delay: delayMs });
});

// 3. loginViaUi custom command implementation
Cypress.Commands.add('loginViaUi', (username: string = 'Admin', password: string = 'admin123') => {
  cy.log(`[LoginViaUi Command] Logging in as user: ${username}`);
  cy.get('body').then(($body) => {
    if ($body.find('#username').length > 0) {
      cy.get('#username').clear().type(username);
      cy.get('#password').clear().type(password);
      if ($body.find('#login-button').length > 0) {
        cy.get('#login-button').click();
      }
    }
  });
});

// 4. getByTestId custom command implementation
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// 5. assertElementText custom command implementation
Cypress.Commands.add('assertElementText', (selector: string, expectedText: string) => {
  return cy.get(selector).should('contain.text', expectedText);
});

export {};

