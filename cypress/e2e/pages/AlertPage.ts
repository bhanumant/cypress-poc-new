import BasePage from './BasePage';

class AlertPage extends BasePage {
  readonly alertButton = '#button1';
  readonly modalButton = '#button2';
  readonly confirmButton = '#button4';
  readonly confirmAlertText = '#confirm-alert-text';
  readonly modalCloseButton = '#myModal button[data-dismiss="modal"]';
  readonly modalTitle = '#myModal .modal-title';

  clickAlertButton() {
    this.click(this.alertButton);
  }

  clickModalButton() {
    this.click(this.modalButton);
  }

  clickConfirmButton() {
    this.click(this.confirmButton);
  }

  closeModal() {
    this.click(this.modalCloseButton);
  }
}

export default new AlertPage();
