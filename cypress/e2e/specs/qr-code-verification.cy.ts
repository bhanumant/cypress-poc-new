import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import QrCodePage from '../pages/QrCodePage';

describe('QR Code Verification & Payload Extraction Automation [@qr, @smoke, @regression]', () => {
  beforeEach(() => {
    // Load QR Code Portal fixture template via Page Object
    QrCodePage.loadQrPortal(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should scan and decode image QR code and verify payload URL [@qr, @smoke]', () => {
    QrCodePage.decodeImageQrCode(QrCodePage.qrImage).then((decodedText) => {
      expect(decodedText).to.include('webdriveruniversity.com');
      expect(decodedText).to.include('qr_sec_9988');
      QrCodePage.verifyPayloadOnUI(decodedText);
      QrCodePage.getText(QrCodePage.statusMessage).should('contain', 'SUCCESS');
    });
  });

  it('should scan and decode HTML5 canvas QR code element [@qr, @regression]', () => {
    QrCodePage.decodeCanvasQrCode(QrCodePage.qrCanvas).then((decodedCanvasText) => {
      expect(decodedCanvasText).to.eq('OTP-SECRET-KEY-9988');
      QrCodePage.verifyPayloadOnUI(decodedCanvasText);
      QrCodePage.getText(QrCodePage.statusMessage).should('contain', 'SUCCESS');
    });
  });

  it('should handle invalid QR payload and display appropriate UI warning [@qr, @sanity]', () => {
    // Submit invalid manual QR string
    QrCodePage.verifyPayloadOnUI('UNAUTHORIZED_UNTRUSTED_QR');

    // Assert status error message
    QrCodePage.getText(QrCodePage.statusMessage).should('contain', 'INVALID');
  });
});
