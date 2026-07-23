import BasePage from './BasePage';

class StoragePage extends BasePage {
  // Locators for Storage Portal
  readonly localKeyInput = '#localKey';
  readonly localValInput = '#localVal';
  readonly saveLocalBtn = '#saveLocalBtn';
  readonly localDisplay = '#localDisplay';

  readonly sessionKeyInput = '#sessionKey';
  readonly sessionValInput = '#sessionVal';
  readonly saveSessionBtn = '#saveSessionBtn';
  readonly sessionDisplay = '#sessionDisplay';

  /**
   * Loads the HTML fixture template for Storage Portal into page document.
   * 
   * @param pageUrl Target base page URL to open first
   */
  loadStoragePortal(pageUrl: string) {
    this.open(pageUrl);
    cy.fixture('html/storagePortal.html').then((htmlContent: string) => {
      cy.document().then((doc) => {
        doc.body.innerHTML = htmlContent;

        const saveLocalBtn = doc.getElementById('saveLocalBtn');
        const saveSessionBtn = doc.getElementById('saveSessionBtn');

        if (saveLocalBtn) {
          saveLocalBtn.addEventListener('click', () => {
            const k = (doc.getElementById('localKey') as HTMLInputElement).value;
            const v = (doc.getElementById('localVal') as HTMLInputElement).value;
            if (k) {
              window.localStorage.setItem(k, v);
              const disp = doc.getElementById('localDisplay');
              if (disp) disp.textContent = v;
            }
          });
        }

        if (saveSessionBtn) {
          saveSessionBtn.addEventListener('click', () => {
            const k = (doc.getElementById('sessionKey') as HTMLInputElement).value;
            const v = (doc.getElementById('sessionVal') as HTMLInputElement).value;
            if (k) {
              window.sessionStorage.setItem(k, v);
              const disp = doc.getElementById('sessionDisplay');
              if (disp) disp.textContent = v;
            }
          });
        }
      });
    });
  }

  /**
   * Sets an item directly in browser localStorage.
   * 
   * @param key Storage key
   * @param value Storage value
   */
  setLocalStorageItem(key: string, value: string) {
    cy.window().then((win) => {
      win.localStorage.setItem(key, value);
    });
  }

  /**
   * Retrieves an item from browser localStorage as a Cypress chainable string.
   * 
   * @param key Storage key
   */
  getLocalStorageItem(key: string): Cypress.Chainable<string | null> {
    return cy.window().then((win) => win.localStorage.getItem(key)) as unknown as Cypress.Chainable<string | null>;
  }

  /**
   * Sets an item directly in browser sessionStorage.
   * 
   * @param key Session storage key
   * @param value Session storage value
   */
  setSessionStorageItem(key: string, value: string) {
    cy.window().then((win) => {
      win.sessionStorage.setItem(key, value);
    });
  }

  /**
   * Retrieves an item from browser sessionStorage as a Cypress chainable string.
   * 
   * @param key Session storage key
   */
  getSessionStorageItem(key: string): Cypress.Chainable<string | null> {
    return cy.window().then((win) => win.sessionStorage.getItem(key)) as unknown as Cypress.Chainable<string | null>;
  }
}

export default new StoragePage();
