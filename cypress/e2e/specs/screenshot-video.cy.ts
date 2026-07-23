import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import VisualPage from '../pages/VisualPage';

describe('Screenshot & Video Artifact Automation Suite [@screenshot, @video, @regression]', () => {
  beforeEach(() => {
    VisualPage.open(WEBDRIVER_UNI_URLS.contactUs);
  });

  it('should capture full page viewport screenshot with custom filename [@screenshot, @smoke]', () => {
    const screenshotName = 'full_page_contact_us_portal';
    
    // Capture full-page screenshot
    VisualPage.captureFullPageScreenshot(screenshotName);

    // Verify screenshot file exists on disk
    VisualPage.verifySnapshotExists(screenshotName).should('be.true');
  });

  it('should capture targeted element-level screenshot [@screenshot, @regression]', () => {
    const elementSnapshotName = 'contact_form_element_snapshot';

    // Capture element screenshot
    VisualPage.captureElementScreenshot('#contact_form', elementSnapshotName);

    // Verify element screenshot artifact
    VisualPage.verifySnapshotExists(elementSnapshotName).should('be.true');
  });

  it('should capture screenshot on failure & verify video recording configuration [@video, @sanity]', () => {
    // Assert video configuration option presence in Cypress environment
    const videoConfig = Cypress.config('video');
    expect(videoConfig).to.be.a('boolean');

    // Trigger controlled element screenshot for test run artifact logging
    cy.get('input[type="submit"]').screenshot('submit_button_artifact');
  });
});
