import BasePage from './BasePage';

class FileUploadPage extends BasePage {
  readonly fileInput = '#myFile';
  readonly submitBtn = '#submit-button';

  uploadFile(contents: string, fileName: string, mimeType: string) {
    this.getElement(this.fileInput).selectFile({
      contents: Cypress.Buffer.from(contents),
      fileName,
      mimeType,
    });
  }

  clickSubmit() {
    this.click(this.submitBtn);
  }
}

export default new FileUploadPage();
