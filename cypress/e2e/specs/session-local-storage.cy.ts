import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import StoragePage from '../pages/StoragePage';

describe('Session & LocalStorage Automation & Verification Tests', () => {
  beforeEach(() => {
    // Load Browser Storage Portal fixture template via Page Object helper
    StoragePage.loadStoragePortal(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should set, retrieve, and verify items in localStorage', () => {
    const tokenKey = 'auth_token';
    const tokenValue = 'jwt_token_xyz999_enterprise';
    StoragePage.setLocalStorageItem(tokenKey, tokenValue);
    StoragePage.getLocalStorageItem(tokenKey).should('eq', tokenValue);
    StoragePage.type(StoragePage.localKeyInput, 'user_role');
    StoragePage.type(StoragePage.localValInput, 'Administrator');
    StoragePage.click(StoragePage.saveLocalBtn);
    StoragePage.getElement(StoragePage.localDisplay).should('have.text', 'Administrator');
    StoragePage.getLocalStorageItem('user_role').should('eq', 'Administrator');
  });

  it('should set, retrieve, and clear items in sessionStorage', () => {
    const sessionKey = 'tab_session_id';
    const sessionVal = 'active_session_887766';

    // Set item in sessionStorage
    StoragePage.setSessionStorageItem(sessionKey, sessionVal);
    StoragePage.getSessionStorageItem(sessionKey).should('eq', sessionVal);

    // Clear all sessionStorage using Cypress command
    cy.clearAllSessionStorage();

    // Assert item is null after clearing
    StoragePage.getSessionStorageItem(sessionKey).should('be.null');
  });

  it('should inspect and clear all local storage via cy.getAllLocalStorage() and cy.clearLocalStorage()', () => {
    StoragePage.setLocalStorageItem('theme_mode', 'dark');
    StoragePage.setLocalStorageItem('currency_code', 'USD');

    // Inspect all local storage entries
    cy.getAllLocalStorage().should((storageMap) => {
      expect(storageMap).to.exist;
    });

    // Clear local storage
    cy.clearLocalStorage();

    // Verify key no longer exists
    StoragePage.getLocalStorageItem('theme_mode').should('be.null');
  });

  it('should preserve session state across test runs using cy.session()', () => {
    const sessionId = 'enterprise-user-session';

    // Create preserved session state using cy.session()
    cy.session(sessionId, () => {
      cy.visit(WEBDRIVER_UNI_URLS.alertPage);
      cy.window().then((win) => {
        win.localStorage.setItem('cypress_session_active', 'true');
        win.sessionStorage.setItem('cypress_auth_user', 'admin_user');
      });
    });

    // Re-visit page and verify preserved storage state
    cy.visit(WEBDRIVER_UNI_URLS.alertPage);
    cy.window().then((win) => {
      expect(win.localStorage.getItem('cypress_session_active')).to.eq('true');
    });
  });
});
