import BasePage from './BasePage';

class OtpPage extends BasePage {
  // Locators for OTP Verification UI Components
  readonly phoneInput = '[name="mobile"], #phoneInput, input[type="tel"]';
  readonly sendOtpBtn = '#send-otp-btn, button:contains("Send OTP"), button:contains("Request OTP")';
  readonly singleOtpInput = '[name="otp"], #otpInput, input[placeholder*="OTP"]';
  readonly verifyBtn = '#verify-otp-btn, button:contains("Verify"), button[type="submit"]';
  readonly resendBtn = '#resend-otp-btn, button:contains("Resend")';
  readonly statusMessage = '.otp-status-message, .alert, #otp-status';

  /**
   * Loads the HTML fixture template for the OTP Portal into the page document.
   * 
   * @param pageUrl Target base page URL to open first
   */
  loadOtpPortal(pageUrl: string) {
    this.open(pageUrl);
    cy.fixture('html/otpPortal.html').then((htmlContent: string) => {
      cy.document().then((doc) => {
        doc.body.innerHTML = htmlContent;

        const sendBtn = doc.getElementById('send-otp-btn');
        const verifyBtn = doc.getElementById('verify-otp-btn');

        if (sendBtn) {
          sendBtn.addEventListener('click', () => {
            fetch('/send-otp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ mobile: (doc.getElementById('phoneInput') as HTMLInputElement).value })
            })
            .then(res => res.json())
            .then(data => {
              const section = doc.getElementById('otp-section');
              const status = doc.getElementById('otp-status');
              if (section) section.style.display = 'block';
              if (status) status.innerHTML = `<span style="color:green;">${data.message}</span>`;
            });
          });
        }

        if (verifyBtn) {
          verifyBtn.addEventListener('click', () => {
            const enteredOtp = (doc.getElementById('otpInput') as HTMLInputElement).value;
            fetch('/verify-otp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ otp: enteredOtp })
            })
            .then(res => res.json())
            .then(data => {
              const status = doc.getElementById('otp-status');
              if (status) {
                if (data.success) {
                  status.innerHTML = `<span style="color:green;">${data.message}</span>`;
                } else {
                  status.innerHTML = `<span style="color:red;">${data.message}</span>`;
                }
              }
            });
          });
        }
      });
    });
  }

  /**
   * Enters phone number or email and requests OTP generation.
   * 
   * @param identifier Mobile number or email address
   */
  requestOtp(identifier: string) {
    this.getElement(this.phoneInput).should('be.visible').clear().type(identifier);
    this.click(this.sendOtpBtn);
  }

  /**
   * Enters a full OTP code into a single input field.
   * 
   * @param otpCode 6-digit OTP code string
   */
  enterSingleInputOtp(otpCode: string) {
    this.getElement(this.singleOtpInput).should('be.visible').clear().type(otpCode);
  }

  /**
   * Distributes digits of an OTP code into multiple individual input boxes.
   * 
   * @param otpCode 6-digit OTP string (e.g. "849201")
   * @param containerSelector Parent container or selector pattern for digit boxes
   */
  enterMultiBoxOtp(otpCode: string, containerSelector: string = '.otp-digit-box') {
    const digits = otpCode.split('');
    cy.get(containerSelector).should('have.length', digits.length).each(($box, index) => {
      cy.wrap($box).clear().type(digits[index]);
    });
  }

  /**
   * Enters OTP and clicks the Verification button.
   * 
   * @param otpCode OTP code string
   */
  verifyOtp(otpCode: string) {
    this.enterSingleInputOtp(otpCode);
    this.click(this.verifyBtn);
  }

  /**
   * Intercepts outgoing send-otp network API requests to mock or capture dynamic OTP.
   * 
   * @param mockOtp Code to inject in response payload
   * @param alias Route alias for cy.wait()
   */
  stubSendOtpApi(mockOtp: string = '849201', alias: string = 'sendOtp') {
    cy.intercept('POST', '**/send-otp*', {
      statusCode: 200,
      body: {
        success: true,
        message: 'OTP sent successfully',
        otp: mockOtp,
      },
    }).as(alias);
  }

  /**
   * Intercepts verify-otp network API requests to return success or failure.
   * 
   * @param success Whether verification succeeds
   * @param alias Route alias for cy.wait()
   */
  stubVerifyOtpApi(success: boolean = true, alias: string = 'verifyOtp') {
    cy.intercept('POST', '**/verify-otp*', (req) => {
      if (success) {
        req.reply({
          statusCode: 200,
          body: { success: true, message: 'OTP verification successful! Access granted.' },
        });
      } else {
        req.reply({
          statusCode: 400,
          body: { success: false, message: 'Invalid OTP code entered. Please try again.' },
        });
      }
    }).as(alias);
  }
}

export default new OtpPage();
