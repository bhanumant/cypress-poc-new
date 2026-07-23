import { WEBDRIVER_UNI_URLS, WEBDRIVER_UNI_ASSERTIONS } from '../../support/constants';
import FileUploadPage from '../pages/FileUploadPage';

describe('WebDriverUniversity File Upload Verification Tests', () => {
  beforeEach(() => {
    // Navigate to the File Upload page
    FileUploadPage.open(WEBDRIVER_UNI_URLS.fileUploadPage);
  });

  it('should verify alert when submitting without selecting a file', () => {
    // Verify alert message
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(WEBDRIVER_UNI_ASSERTIONS.fileUploadPage.noFileAlert);
    });

    // Click submit
    FileUploadPage.clickSubmit();
  });

  it('should successfully upload a file and verify success alert', () => {
    // Verify success alert message
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(WEBDRIVER_UNI_ASSERTIONS.fileUploadPage.successAlert);
    });

    // Upload dummy file using dynamic cypress buffer selection
    FileUploadPage.uploadFile(
      WEBDRIVER_UNI_ASSERTIONS.fileUploadPage.dummyContent,
      WEBDRIVER_UNI_ASSERTIONS.fileUploadPage.dummyFileName,
      'text/plain'
    );

    // Click submit
    FileUploadPage.clickSubmit();
  });
});
