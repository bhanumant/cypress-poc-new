import BasePage from './BasePage';

class GmailAuthPage extends BasePage {
  // Locators for Registration & Gmail OTP Verification
  readonly firstNameInput = '#firstName';
  readonly lastNameInput = '#lastName';
  readonly emailInput = '#regEmail';
  readonly passwordInput = '#regPassword';
  readonly registerBtn = '#registerBtn';
  readonly verificationCodeInput = '#emailOtpInput';
  readonly activateAccountBtn = '#activateAccountBtn';
  readonly resendGmailCodeBtn = '#resendGmailCodeBtn';
  readonly statusBanner = '.account-status-banner';

  /**
   * Loads the HTML fixture template for the Gmail Auth Portal into the page document.
   * 
   * @param pageUrl Target base page URL to open first
   * @param sentMsgText Status message text when OTP is dispatched
   * @param activatedMsgText Status message text when account is activated
   * @param invalidMsgText Error message text when OTP is invalid
   */
  loadGmailAuthPortal(
    pageUrl: string,
    sentMsgText: string,
    activatedMsgText: string,
    invalidMsgText: string
  ) {
    this.open(pageUrl);
    cy.fixture('html/gmailPortal.html').then((htmlContent: string) => {
      cy.document().then((doc) => {
        doc.body.innerHTML = htmlContent;

        let activeServerOtp = '';

        const regBtn = doc.getElementById('registerBtn');
        const activateBtn = doc.getElementById('activateAccountBtn');
        const resendBtn = doc.getElementById('resendGmailCodeBtn');

        if (regBtn) {
          regBtn.addEventListener('click', () => {
            const email = (doc.getElementById('regEmail') as HTMLInputElement).value;
            fetch('/api/v1/auth/register-gmail', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
            })
            .then(res => res.json())
            .then(data => {
              activeServerOtp = data.otp;
              const sec = doc.getElementById('verificationSection');
              const status = doc.getElementById('accountStatus');
              if (sec) sec.style.display = 'block';
              if (status) status.innerHTML = `<span style="color:#0056b3;">${sentMsgText}</span>`;
            });
          });
        }

        if (resendBtn) {
          resendBtn.addEventListener('click', () => {
            const email = (doc.getElementById('regEmail') as HTMLInputElement).value;
            fetch('/api/v1/auth/register-gmail', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
            })
            .then(res => res.json())
            .then(data => {
              activeServerOtp = data.otp;
              const status = doc.getElementById('accountStatus');
              if (status) status.innerHTML = `<span style="color:#0056b3;">New code sent to ${email}</span>`;
            });
          });
        }

        if (activateBtn) {
          activateBtn.addEventListener('click', () => {
            const entered = (doc.getElementById('emailOtpInput') as HTMLInputElement).value;
            const status = doc.getElementById('accountStatus');
            if (entered === activeServerOtp && entered !== '') {
              if (status) status.innerHTML = `<span style="color:green;">${activatedMsgText}</span>`;
            } else {
              if (status) status.innerHTML = `<span style="color:red;">${invalidMsgText}</span>`;
            }
          });
        }
      });
    });
  }

  /**
   * Fills out user account registration form with name, Gmail address, and password.
   * 
   * @param firstName User first name
   * @param lastName User last name
   * @param email User Gmail address
   * @param password Account password
   */
  fillRegistrationForm(firstName: string, lastName: string, email: string, password: string) {
    this.getElement(this.firstNameInput).should('be.visible').clear().type(firstName);
    this.getElement(this.lastNameInput).should('be.visible').clear().type(lastName);
    this.getElement(this.emailInput).should('be.visible').clear().type(email);
    this.getElement(this.passwordInput).should('be.visible').clear().type(password);
  }

  /**
   * Submits the registration form to trigger Gmail verification email dispatch.
   */
  submitRegistration() {
    this.click(this.registerBtn);
  }

  /**
   * Invokes Node-level email task to query Gmail inbox and extract the 6-digit verification OTP.
   * 
   * @param email Registered Gmail address
   * @param overrideOtp Optional explicit OTP for deterministic test runs
   * @returns Cypress Chainable resolving to the 6-digit OTP code string
   */
  fetchOtpFromGmailInbox(email: string, overrideOtp?: string): Cypress.Chainable<string> {
    return cy.task('fetchGmailOtp', { email, overrideOtp }) as Cypress.Chainable<string>;
  }

  /**
   * Enters the 6-digit verification code into the input field.
   * 
   * @param otpCode 6-digit OTP code string
   */
  enterGmailVerificationCode(otpCode: string) {
    this.getElement(this.verificationCodeInput).should('be.visible').clear().type(otpCode);
  }

  /**
   * Enters the Gmail OTP code and clicks Activate Account.
   * 
   * @param otpCode 6-digit OTP code string
   */
  verifyAndActivateAccount(otpCode: string) {
    this.enterGmailVerificationCode(otpCode);
    this.click(this.activateAccountBtn);
  }

  /**
   * Requests a new verification code to be sent to the Gmail address.
   */
  resendGmailCode() {
    this.click(this.resendGmailCodeBtn);
  }
}

export default new GmailAuthPage();
