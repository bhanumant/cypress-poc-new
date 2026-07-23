import BasePage from './BasePage';

class CookiesPage extends BasePage {
  // Locators for Cookie Portal
  readonly cookieNameInput = '#cookieName';
  readonly cookieValInput = '#cookieValue';
  readonly setCookieBtn = '#setCookieBtn';
  readonly clearCookieBtn = '#clearCookieBtn';
  readonly cookieOutput = '#cookieOutput';

  /**
   * Loads the HTML fixture template for Cookie Management Portal into page document.
   * 
   * @param pageUrl Target base page URL to open first
   */
  loadCookiePortal(pageUrl: string) {
    this.open(pageUrl);
    cy.fixture('html/cookiePortal.html').then((htmlContent: string) => {
      cy.document().then((doc) => {
        doc.body.innerHTML = htmlContent;

        const setBtn = doc.getElementById('setCookieBtn');
        const clearBtn = doc.getElementById('clearCookieBtn');
        const out = doc.getElementById('cookieOutput');

        const updateDisplay = () => {
          if (out) {
            out.textContent = doc.cookie || 'No cookies present';
          }
        };

        if (setBtn) {
          setBtn.addEventListener('click', () => {
            const name = (doc.getElementById('cookieName') as HTMLInputElement).value;
            const val = (doc.getElementById('cookieValue') as HTMLInputElement).value;
            if (name) {
              doc.cookie = `${name}=${val}; path=/`;
              updateDisplay();
            }
          });
        }

        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            const cookies = doc.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i];
              const eqPos = cookie.indexOf('=');
              const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
              if (name) {
                doc.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
              }
            }
            updateDisplay();
          });
        }

        updateDisplay();
      });
    });
  }

  /**
   * Sets a custom browser cookie using Cypress command.
   * 
   * @param name Cookie name
   * @param value Cookie value
   * @param options Optional Cypress cookie options
   */
  setCustomCookie(name: string, value: string, options?: Partial<Cypress.SetCookieOptions>): Cypress.Chainable<Cypress.Cookie> {
    return cy.setCookie(name, value, options);
  }

  /**
   * Gets a specific browser cookie by name using Cypress command.
   * 
   * @param name Cookie name
   */
  getCustomCookie(name: string): Cypress.Chainable<Cypress.Cookie | null> {
    return cy.getCookie(name);
  }

  /**
   * Retrieves all active browser cookies for current domain.
   */
  getAllBrowserCookies(): Cypress.Chainable<Cypress.Cookie[]> {
    return cy.getCookies();
  }

  /**
   * Clears a specific cookie by name using Cypress command.
   * 
   * @param name Cookie name
   */
  clearSpecificCookie(name: string): Cypress.Chainable<null> {
    return cy.clearCookie(name);
  }

  /**
   * Clears all browser cookies using Cypress command.
   */
  clearAllBrowserCookies(): Cypress.Chainable<null> {
    return cy.clearAllCookies();
  }
}

export default new CookiesPage();
