export default class BasePage {
  open(path: string = '/') {
    cy.visit(path);
  }

  getElement(selector: string, timeout: number = 10000) {
    return cy.get(selector, { timeout });
  }

  type(selector: string, text: string) {
    this.getElement(selector).should('be.visible').clear().type(text);
  }

  click(selector: string) {
    this.getElement(selector).should('be.visible').click();
  }

  getText(selector: string) {
    return this.getElement(selector).invoke('text');
  }

  waitForVisible(selector: string) {
    this.getElement(selector).should('be.visible');
  }
}

