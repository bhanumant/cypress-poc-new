import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import FileOperationsPage from '../pages/FileOperationsPage';

describe('UI File Download & Download Verification Tests', () => {
  beforeEach(() => {
    // Load File Download Portal HTML fixture template
    FileOperationsPage.loadDownloadPortal(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should trigger CSV download from UI and verify downloaded file content in downloads directory', () => {
    // Trigger download & save file to downloads directory
    FileOperationsPage.triggerDownloadAndSave(FileOperationsPage.downloadCsvBtn, 'sampleData.csv');

    // Verify downloaded file exists in cypress/downloads and inspect content
    FileOperationsPage.verifyDownloadedFile('sampleData.csv').then((content) => {
      expect(content).to.include('id,employee_name,department,salary,status');
      expect(content).to.include('John Doe');
      expect(content).to.include('Engineering');
    });
  });

  it('should trigger XLSM spreadsheet download from UI and verify downloaded binary file', () => {
    // Trigger XLSM download
    FileOperationsPage.triggerDownloadAndSave(FileOperationsPage.downloadXlsmBtn, 'sampleData.xlsm');

    // Verify downloaded file exists in cypress/downloads
    FileOperationsPage.verifyDownloadedFile('sampleData.xlsm').should('exist');
  });

  it('should trigger PDF document download from UI and verify downloaded binary file', () => {
    // Trigger PDF download
    FileOperationsPage.triggerDownloadAndSave(FileOperationsPage.downloadPdfBtn, 'sampleDocument.pdf');

    // Verify downloaded file exists in cypress/downloads
    FileOperationsPage.verifyDownloadedFile('sampleDocument.pdf').should('exist');
  });
});
