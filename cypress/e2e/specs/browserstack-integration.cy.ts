import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import BrowserStackPage from '../pages/BrowserStackPage';

describe('BrowserStack Cloud Execution & Live Dashboard Reporting Suite [@browserstack, @cloud, @smoke]', () => {
  beforeEach(() => {
    BrowserStackPage.open(WEBDRIVER_UNI_URLS.contactUs);
  });

  it('should execute test scenario on BrowserStack cloud and send status report annotation [@browserstack, @smoke]', () => {
    BrowserStackPage.annotateSession('Navigated to WebdriverUniversity Contact Us portal', 'info');
    BrowserStackPage.verifyBrowserStackExecutionEnv();

    cy.get('h2[name="contactme"]').should('be.visible');

    BrowserStackPage.setSessionStatus('passed', 'Contact Us page rendering successfully verified on BrowserStack cloud runner');
  });

  it('should record step annotations and handle cloud build metadata reporting [@browserstack, @regression]', () => {
    BrowserStackPage.annotateSession('Starting cross-browser element accessibility check', 'info');

    cy.get('input[name="first_name"]').should('be.visible');
    cy.get('input[name="last_name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');

    BrowserStackPage.annotateSession('Form input fields verified on BrowserStack runner', 'info');
    BrowserStackPage.setSessionStatus('passed', 'Form input elements successfully verified on cloud instance');
  });
});
