import BasePage from './BasePage';

class FileOperationsPage extends BasePage {
  // Locators for Download Portal
  readonly downloadCsvBtn = '#downloadCsvBtn';
  readonly downloadXlsmBtn = '#downloadXlsmBtn';
  readonly downloadPdfBtn = '#downloadPdfBtn';

  /**
   * Loads the HTML fixture template for the File Download Portal into page document.
   * 
   * @param pageUrl Target base page URL to open first
   */
  loadDownloadPortal(pageUrl: string) {
    this.open(pageUrl);
    cy.fixture('html/downloadPortal.html').then((htmlContent: string) => {
      cy.document().then((doc) => {
        doc.body.innerHTML = htmlContent;
      });
    });
  }

  /**
   * Reads and parses CSV file into JSON array of row objects via Node task.
   * 
   * @param filePath Absolute or relative path to CSV file
   */
  readCsvData(filePath: string): Cypress.Chainable<any[]> {
    return cy.task('parseCsvFile', { filePath }) as Cypress.Chainable<any[]>;
  }

  /**
   * Reads and parses .xlsm / .xlsx binary Excel spreadsheet into JSON array via Node task.
   * 
   * @param filePath Absolute or relative path to Excel file
   * @param sheetName Optional worksheet name (defaults to first sheet)
   */
  readExcelData(filePath: string, sheetName?: string): Cypress.Chainable<any[]> {
    return cy.task('parseExcelFile', { filePath, sheetName }) as Cypress.Chainable<any[]>;
  }

  /**
   * Reads and extracts text content from .pdf binary document via Node task.
   * 
   * @param filePath Absolute or relative path to PDF file
   */
  readPdfData(filePath: string): Cypress.Chainable<string> {
    return cy.task('parsePdfFile', { filePath }) as Cypress.Chainable<string>;
  }

  /**
   * Triggers UI download button click and copies fixture file into cypress/downloads/.
   * 
   * @param selector Target button selector
   * @param fileName Target downloaded file name
   */
  triggerDownloadAndSave(selector: string, fileName: string) {
    this.click(selector);
    cy.task('saveDownloadedFile', { fileName });
  }

  /**
   * Asserts downloaded file exists in cypress/downloads/ directory.
   * 
   * @param fileName Downloaded file name
   */
  verifyDownloadedFile(fileName: string): Cypress.Chainable<any> {
    return cy.readFile(`cypress/downloads/${fileName}`, { timeout: 15000 });
  }
}

export default new FileOperationsPage();
