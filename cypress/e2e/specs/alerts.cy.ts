import { WEBDRIVER_UNI_URLS, WEBDRIVER_UNI_ASSERTIONS } from '../../support/constants';
import AlertPage from '../pages/AlertPage';

describe('WebDriverUniversity Popup & Alert Functionality Tests', () => {
  beforeEach(() => {
    // Navigate to the WebdriverUniversity Popup & Alerts page
    AlertPage.open(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should handle JavaScript alert box correctly', () => {
    // Cypress handles alerts automatically by clicking OK, but we can capture and verify the alert message
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(WEBDRIVER_UNI_ASSERTIONS.alertPage.alertMessage);
    });

    // Trigger the alert
    AlertPage.clickAlertButton();
  });

  it('should handle JavaScript confirm box - Clicking OK', () => {
    // Return true to simulate clicking "OK" on confirm popup
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal(WEBDRIVER_UNI_ASSERTIONS.alertPage.confirmMessage);
      return true;
    });

    // Trigger confirm and assert text on page changes to OK status
    AlertPage.clickConfirmButton();
    AlertPage.getElement(AlertPage.confirmAlertText)
      .should('be.visible')
      .and('have.text', WEBDRIVER_UNI_ASSERTIONS.alertPage.confirmOkText);
  });

  it('should handle JavaScript confirm box - Clicking Cancel', () => {
    // Return false to simulate clicking "Cancel" on confirm popup
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal(WEBDRIVER_UNI_ASSERTIONS.alertPage.confirmMessage);
      return false;
    });

    // Trigger confirm and assert text on page changes to Cancel status
    AlertPage.clickConfirmButton();
    AlertPage.getElement(AlertPage.confirmAlertText)
      .should('be.visible')
      .and('have.text', WEBDRIVER_UNI_ASSERTIONS.alertPage.confirmCancelText);
  });

});
