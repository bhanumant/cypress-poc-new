import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import { CryptoUtils } from '../../support/utils/CryptoUtils';
import EncryptionPage from '../pages/EncryptionPage';

describe('Credential Encryption & Runtime Decryption Tests', () => {
  beforeEach(() => {
    // Load login portal HTML fixture template via Page Object helper
    EncryptionPage.loadLoginPortal(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should decrypt AES encrypted password at runtime and authenticate successfully', () => {
    cy.fixture('encryptedCredentials.json').then((creds) => {
      const account = creds.orangeHrmAccount;

      // Verify encrypted password is NOT in plain text in the fixture
      expect(account.encryptedPassword).to.not.eq('admin123');
      expect(account.encryptedPassword).to.include(':');

      // Login using encrypted credentials with runtime AES decryption & log masking
      EncryptionPage.loginWithEncryptedPassword(
        account.username,
        account.encryptedPassword,
        account.secretKey
      );

      // Assert successful authentication and dashboard welcome text visibility
      EncryptionPage.getElement(EncryptionPage.userDropdown)
        .should('be.visible')
        .and('contain.text', 'Welcome, Admin!');
    });
  });

  it('should verify AES encryption and decryption round-trip integrity', () => {
    const rawPassword = 'EnterprisePlainPassword@2026';
    const secretKey = 'CompanyMasterSecretKey#123';
    CryptoUtils.encrypt(rawPassword, secretKey).then((cipherText) => {
      expect(cipherText).to.not.eq(rawPassword);
      expect(cipherText).to.include(':');
      CryptoUtils.decrypt(cipherText, secretKey).then((decryptedPassword) => {
        expect(decryptedPassword).to.eq(rawPassword);
      });
    });
  });

  it('should fail decryption when provided an invalid secret key', () => {
    const rawPassword = 'ConfidentialPassword';
    const correctKey = 'ValidSecretKey123';
    const wrongKey = 'InvalidSecretKey456';

    CryptoUtils.encrypt(rawPassword, correctKey).then((cipherText) => {
      // Attempting decryption with incorrect key returns bad decrypt result
      cy.task('decryptCredential', { cipherText, secretKey: wrongKey }).then((res: any) => {
        expect(res.success).to.be.false;
        expect(res.error).to.exist;
      });
    });
  });

  it('should mask sensitive credential strings for safe UI log output', () => {
    const sensitiveString = 'SuperSecretToken';
    const maskedResult = CryptoUtils.maskLog(sensitiveString);

    expect(maskedResult).to.eq('****************');
    expect(maskedResult.length).to.eq(sensitiveString.length);
  });
});
