import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import WindowPage from '../pages/WindowPage';

describe('Multi-Window & Popup Tab Automation Suite [@window, @enterprise, @smoke]', () => {
  beforeEach(() => {
    WindowPage.loadWindowPortal(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should open target="_blank" link within current tab by removing target attribute [@window, @smoke]', () => {
    WindowPage.clickNewTabLinkRemovingTarget(WindowPage.newTabLink);
    cy.url().should('include', 'Contact-Us');
    cy.get('h2[name="contactme"]').should('be.visible');
  });

  it('should stub window.open method and verify popup URL without opening new window [@window, @regression]', () => {
    WindowPage.stubWindowOpen('popupStub');
    WindowPage.click(WindowPage.popupBtn);
    cy.get('@popupStub').should('have.been.calledWithMatch', 'https://webdriveruniversity.com/Popup-Alerts/index.html');
  });
});
