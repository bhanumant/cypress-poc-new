export class CryptoUtils {
  /**
   * Invokes Node task to encrypt a plain text string using AES-256-CBC algorithm.
   * 
   * @param text Plain text string to encrypt
   * @param secretKey Secret passphrase used for key derivation
   * @returns Cypress Chainable resolving to the ciphertext string
   */
  static encrypt(text: string, secretKey: string): Cypress.Chainable<string> {
    return cy.task('encryptCredential', { text, secretKey }) as Cypress.Chainable<string>;
  }

  /**
   * Invokes Node task to decrypt an AES-256-CBC ciphertext back into plain text.
   * 
   * @param cipherText Ciphertext string formatted as "iv_hex:encrypted_hex"
   * @param secretKey Secret passphrase used for key derivation
   * @returns Cypress Chainable resolving to the decrypted plain text string
   */
  static decrypt(cipherText: string, secretKey: string): Cypress.Chainable<string> {
    return cy.task('decryptCredential', { cipherText, secretKey }).then((res: any) => {
      if (!res || !res.success) {
        throw new Error(res?.error || 'Failed to decrypt credential with secret key');
      }
      return res.decrypted;
    }) as Cypress.Chainable<string>;
  }

  /**
   * Obfuscates sensitive strings for safe UI logging.
   * 
   * @param text Sensitive string
   * @returns Masked asterisks string
   */
  static maskLog(text: string): string {
    return '*'.repeat(text ? text.length : 8);
  }
}
