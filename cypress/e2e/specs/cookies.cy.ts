import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import CookiesPage from '../pages/CookiesPage';

describe('Browser Cookie Management Automation & Verification Tests', () => {
  beforeEach(() => {
    // Load Cookie Portal fixture template via Page Object helper
    CookiesPage.loadCookiePortal(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should set a custom cookie and verify its properties via cy.getCookie()', () => {
    const cookieName = 'auth_session';
    const cookieVal = 'sess_abc123_enterprise';
    CookiesPage.setCustomCookie(cookieName, cookieVal, { path: '/' });
    CookiesPage.getCustomCookie(cookieName).should((cookie) => {
      expect(cookie).to.not.be.null;
      expect(cookie?.name).to.eq(cookieName);
      expect(cookie?.value).to.eq(cookieVal);
      expect(cookie?.path).to.eq('/');
    });
  });

  it('should set and display cookies interactively via HTML Portal UI controls', () => {
    // Fill cookie name and value in UI inputs
    CookiesPage.type(CookiesPage.cookieNameInput, 'ui_cookie');
    CookiesPage.type(CookiesPage.cookieValInput, 'ui_value_999');
    CookiesPage.click(CookiesPage.setCookieBtn);

    // Verify cookie output display in DOM
    CookiesPage.getElement(CookiesPage.cookieOutput).should('contain.text', 'ui_cookie=ui_value_999');

    // Verify cookie exists via Cypress getCookie
    CookiesPage.getCustomCookie('ui_cookie').should('exist');
  });

  it('should retrieve and inspect all active browser cookies via cy.getCookies()', () => {
    // Set multiple cookies
    CookiesPage.setCustomCookie('user_id', 'usr_9988');
    CookiesPage.setCustomCookie('user_role', 'Administrator');
    CookiesPage.setCustomCookie('theme_pref', 'dark_mode');

    // Retrieve all active cookies
    CookiesPage.getAllBrowserCookies().then((cookies) => {
      expect(cookies.length).to.be.at.least(3);
      const names = cookies.map((c) => c.name);
      expect(names).to.include.members(['user_id', 'user_role', 'theme_pref']);
    });
  });

  it('should clear a specific cookie by name via cy.clearCookie()', () => {
    CookiesPage.setCustomCookie('keep_cookie', 'val_preserve');
    CookiesPage.setCustomCookie('target_delete_cookie', 'val_delete');

    // Clear specific cookie
    CookiesPage.clearSpecificCookie('target_delete_cookie');

    // Assert deleted cookie is null
    CookiesPage.getCustomCookie('target_delete_cookie').should('be.null');

    // Assert preserved cookie still exists
    CookiesPage.getCustomCookie('keep_cookie').should((cookie) => {
      expect(cookie?.value).to.eq('val_preserve');
    });
  });

  it('should wipe out all browser cookies via cy.clearAllCookies()', () => {
    CookiesPage.setCustomCookie('session_token_1', 'tok_111');
    CookiesPage.setCustomCookie('session_token_2', 'tok_222');

    // Wipe out all browser cookies
    CookiesPage.clearAllBrowserCookies();

    // Assert cookies list is empty
    CookiesPage.getAllBrowserCookies().should('be.empty');
  });
});
