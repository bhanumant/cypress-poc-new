import BasePage from './BasePage';

class WindowPage extends BasePage {
  readonly newTabLink = '#openNewTabLink';
  readonly popupBtn = '#triggerPopupBtn';

  /**
   * Loads Multi-Window HTML portal fixture template into page document.
   * 
   * @param pageUrl Target base page URL to open first
   */
  loadWindowPortal(pageUrl: string) {
    this.open(pageUrl);
    cy.fixture('html/windowPortal.html').then((htmlContent: string) => {
      cy.document().then((doc) => {
        doc.body.innerHTML = htmlContent;

        const popupBtn = doc.getElementById('triggerPopupBtn');
        if (popupBtn) {
          popupBtn.onclick = () => {
            if (doc.defaultView) {
              doc.defaultView.open('https://webdriveruniversity.com/Popup-Alerts/index.html', '_blank', 'width=600,height=400');
            }
          };
        }
      });
    });
  }

  /**
   * Clicks a target="_blank" link by removing the target attribute to stay within single tab context.
   * 
   * @param selector CSS Selector of link element
   */
  clickNewTabLinkRemovingTarget(selector: string = this.newTabLink) {
    this.getElement(selector)
      .should('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target')
      .click();
  }

  /**
   * Stubs window.open calls to spy on popup URLs without opening new browser window context.
   * 
   * @param alias Alias name for window.open stub
   */
  stubWindowOpen(alias: string = 'windowOpenStub') {
    cy.window().then((win) => {
      cy.stub(win, 'open').as(alias);
    });
  }
}

export default new WindowPage();
