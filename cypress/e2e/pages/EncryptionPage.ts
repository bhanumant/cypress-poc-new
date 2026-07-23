import BasePage from './BasePage';
import { CryptoUtils } from '../../support/utils/CryptoUtils';

class EncryptionPage extends BasePage {
  // Locators for Login Portal
  readonly usernameInput = '[name="username"], #username';
  readonly passwordInput = '[name="password"], #password';
  readonly loginButton = 'button[type="submit"], #loginBtn';
  readonly userDropdown = '.oxd-userdropdown-name, #userDashboard';
  readonly errorMessage = '.oxd-alert-content-text, #loginStatus';

  /**
   * Loads the HTML fixture template for the Login Portal into the page document.
   * 
   * @param pageUrl Target base page URL to open first
   */
  loadLoginPortal(pageUrl: string) {
    this.open(pageUrl);
    cy.fixture('html/loginPortal.html').then((htmlContent: string) => {
      cy.document().then((doc) => {
        doc.body.innerHTML = htmlContent;

        const btn = doc.getElementById('loginBtn');
        if (btn) {
          btn.addEventListener('click', () => {
            const user = (doc.getElementById('username') as HTMLInputElement).value;
            const pass = (doc.getElementById('password') as HTMLInputElement).value;
            const dashboard = doc.getElementById('userDashboard');
            const status = doc.getElementById('loginStatus');

            if (user === 'Admin' && pass === 'admin123') {
              if (dashboard) dashboard.style.display = 'block';
              if (status) status.innerHTML = '<span style="color:green;">Login Successful</span>';
            } else {
              if (status) status.innerHTML = '<span style="color:red;">Invalid credentials</span>';
            }
          });
        }
      });
    });
  }

  /**
   * Decrypts encrypted password ciphertext using secret key.
   * 
   * @param encryptedPassword AES ciphertext string
   * @param secretKey Secret passphrase used for decryption
   * @returns Cypress Chainable resolving to decrypted plain text password
   */
  getDecryptedPassword(encryptedPassword: string, secretKey: string): Cypress.Chainable<string> {
    return CryptoUtils.decrypt(encryptedPassword, secretKey);
  }

  /**
   * Decrypts password ciphertext at execution runtime and performs login using { log: false } to mask sensitive plain text password.
   * 
   * @param username Account username
   * @param encryptedPassword AES ciphertext string
   * @param secretKey Secret passphrase used for decryption
   */
  loginWithEncryptedPassword(username: string, encryptedPassword: string, secretKey: string) {
    this.type(this.usernameInput, username);

    CryptoUtils.decrypt(encryptedPassword, secretKey).then((plainTextPassword) => {
      // Type decrypted password with { log: false } to obscure sensitive plain text from Cypress Command Log
      this.getElement(this.passwordInput).should('be.visible').clear().type(plainTextPassword, { log: false });

      // Click submit button
      this.click(this.loginButton);
    });
  }
}

export default new EncryptionPage();
