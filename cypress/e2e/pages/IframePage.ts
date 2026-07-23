import BasePage from './BasePage';

class IframePage extends BasePage {
  readonly iframeSelector = '#frame';
  readonly findOutMoreBtn = '#button-find-out-more';
  readonly modalTitle = '#myModal h4.modal-title';
  readonly modalCloseBtn = '#myModal button:contains("Close")';

  loadIframe() {
    cy.frameLoaded(this.iframeSelector);
  }

  clickFindOutMore() {
    cy.iframe(this.iframeSelector).find(this.findOutMoreBtn).should('be.visible').click();
  }

  getIframeElement(selector: string) {
    return cy.iframe(this.iframeSelector).find(selector);
  }

  closeModal() {
    cy.iframe(this.iframeSelector).find(this.modalCloseBtn).should('be.visible').click();
  }
}

export default new IframePage();
