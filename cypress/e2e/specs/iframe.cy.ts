import { WEBDRIVER_UNI_URLS, WEBDRIVER_UNI_ASSERTIONS } from '../../support/constants';
import IframePage from '../pages/IframePage';

describe('WebDriverUniversity IFrame Functionality Tests', () => {
  beforeEach(() => {
    // Navigate to the WebdriverUniversity IFrame page
    IframePage.open(WEBDRIVER_UNI_URLS.iframePage);
  });

  it('should interact with elements inside the iframe correctly', () => {
    // 1. Verify and load the iframe
    IframePage.loadIframe();

    // 2. Click the "Find Out More!" button inside the iframe
    IframePage.clickFindOutMore();

    // 3. Verify modal inside the iframe is visible and has correct text
    IframePage.getIframeElement(IframePage.modalTitle)
      .should('be.visible')
      .and('contain.text', WEBDRIVER_UNI_ASSERTIONS.iframePage.modalTitle);

    // 4. Close the modal inside the iframe
    IframePage.closeModal();

    // 5. Verify the modal is no longer visible
    IframePage.getIframeElement(IframePage.modalTitle).should('not.be.visible');
  });
});
