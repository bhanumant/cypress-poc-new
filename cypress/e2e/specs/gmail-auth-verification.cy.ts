import { WEBDRIVER_UNI_URLS, GMAIL_AUTH } from '../../support/constants';
import GmailAuthPage from '../pages/GmailAuthPage';

describe('Gmail OTP Account Creation & Email Verification Tests', () => {
  beforeEach(() => {
    // Load Gmail auth portal template from cypress/fixtures/html/gmailPortal.html via Page Object helper
    GmailAuthPage.loadGmailAuthPortal(
      WEBDRIVER_UNI_URLS.alertPage,
      GMAIL_AUTH.messages.otpSentToGmail,
      GMAIL_AUTH.messages.accountActivated,
      GMAIL_AUTH.messages.invalidCodeError
    );
  });

  it('should create account, fetch OTP from Gmail inbox via cy.task(), and activate account', () => {
    const user = GMAIL_AUTH.user;
    const expectedOtp = '937204';

    // Intercept account registration API
    cy.intercept('POST', '**/register-gmail*', {
      statusCode: 200,
      body: {
        success: true,
        message: 'Verification code dispatched to Gmail',
        otp: expectedOtp,
      },
    }).as('registerGmailReq');
    GmailAuthPage.fillRegistrationForm(user.firstName, user.lastName, user.gmailAddress, user.password);
    GmailAuthPage.submitRegistration();
    cy.wait('@registerGmailReq');
    GmailAuthPage.fetchOtpFromGmailInbox(user.gmailAddress, expectedOtp).then((gmailOtp) => {
      expect(gmailOtp).to.eq(expectedOtp);
      GmailAuthPage.verifyAndActivateAccount(gmailOtp);

      // Assert successful activation message
      GmailAuthPage.getElement(GmailAuthPage.statusBanner)
        .should('be.visible')
        .and('contain.text', GMAIL_AUTH.messages.accountActivated);
    });
  });

  it('should handle invalid Gmail verification code and succeed after Resend Code workflow', () => {
    const user = GMAIL_AUTH.user;
    const initialOtp = '112233';
    const newResentOtp = '778899';
    cy.intercept('POST', '**/register-gmail*', {
      statusCode: 200,
      body: { success: true, otp: initialOtp },
    }).as('registerReq');

    GmailAuthPage.fillRegistrationForm(user.firstName, user.lastName, user.gmailAddress, user.password);
    GmailAuthPage.submitRegistration();
    cy.wait('@registerReq');
    GmailAuthPage.verifyAndActivateAccount('000000');

    // Assert error message
    GmailAuthPage.getElement(GmailAuthPage.statusBanner)
      .should('be.visible')
      .and('contain.text', GMAIL_AUTH.messages.invalidCodeError);
    cy.intercept('POST', '**/register-gmail*', {
      statusCode: 200,
      body: { success: true, otp: newResentOtp },
    }).as('resendReq');

    GmailAuthPage.resendGmailCode();
    cy.wait('@resendReq');
    GmailAuthPage.fetchOtpFromGmailInbox(user.gmailAddress, newResentOtp).then((freshOtp) => {
      expect(freshOtp).to.eq(newResentOtp);
      GmailAuthPage.verifyAndActivateAccount(freshOtp);

      // Assert successful account activation
      GmailAuthPage.getElement(GmailAuthPage.statusBanner)
        .should('be.visible')
        .and('contain.text', GMAIL_AUTH.messages.accountActivated);
    });
  });
});
