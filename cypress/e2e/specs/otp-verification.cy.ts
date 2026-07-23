import { WEBDRIVER_UNI_URLS, OTP_ASSERTIONS } from '../../support/constants';
import OtpPage from '../pages/OtpPage';

describe('OTP Verification & 2FA Workflow Tests', () => {
  beforeEach(() => {
    // Load OTP portal template from cypress/fixtures/html/otpPortal.html via Page Object helper
    OtpPage.loadOtpPortal(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should dynamically intercept generated OTP code and authenticate successfully', () => {
    // Generate dynamic 6-digit OTP code for test run
    const dynamicOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Stub network API endpoints
    OtpPage.stubSendOtpApi(dynamicOtp, 'sendOtpReq');
    OtpPage.stubVerifyOtpApi(true, 'verifyOtpReq');
    OtpPage.requestOtp(OTP_ASSERTIONS.dummyPhone);
    cy.wait('@sendOtpReq').its('response.body.otp').should('eq', dynamicOtp);
    OtpPage.verifyOtp(dynamicOtp);
    cy.wait('@verifyOtpReq');

    // Assert authentication success message
    OtpPage.getElement(OtpPage.statusMessage)
      .should('be.visible')
      .and('contain.text', OTP_ASSERTIONS.messages.verificationSuccess);
  });

  it('should distribute OTP digits across 6 individual input boxes', () => {
    const testOtp = OTP_ASSERTIONS.validOtp;

    // Stub network API
    OtpPage.stubSendOtpApi(testOtp, 'sendOtpReq');
    OtpPage.requestOtp(OTP_ASSERTIONS.dummyPhone);
    cy.wait('@sendOtpReq');

    // Populate digits into separate input boxes
    OtpPage.enterMultiBoxOtp(testOtp, '.otp-digit-box');

    // Assert each box contains its respective digit
    const expectedDigits = testOtp.split('');
    cy.get('.otp-digit-box').each(($box, index) => {
      cy.wrap($box).should('have.value', expectedDigits[index]);
    });
  });

  it('should handle invalid OTP error and complete resend OTP workflow', () => {
    const validOtp = OTP_ASSERTIONS.validOtp;
    const invalidOtp = OTP_ASSERTIONS.invalidOtp;
    OtpPage.stubSendOtpApi(validOtp, 'sendOtpReq');
    OtpPage.requestOtp(OTP_ASSERTIONS.dummyPhone);
    cy.wait('@sendOtpReq');
    OtpPage.stubVerifyOtpApi(false, 'verifyInvalidOtp');
    OtpPage.verifyOtp(invalidOtp);
    cy.wait('@verifyInvalidOtp');

    // Assert error message displayed
    OtpPage.getElement(OtpPage.statusMessage)
      .should('be.visible')
      .and('contain.text', OTP_ASSERTIONS.messages.invalidOtpError);
    OtpPage.stubVerifyOtpApi(true, 'verifyValidOtp');
    OtpPage.verifyOtp(validOtp);
    cy.wait('@verifyValidOtp');

    // Assert success message displayed
    OtpPage.getElement(OtpPage.statusMessage)
      .should('be.visible')
      .and('contain.text', OTP_ASSERTIONS.messages.verificationSuccess);
  });
});
