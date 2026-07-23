import FileOperationsPage from '../pages/FileOperationsPage';

describe('PDF Document Reading & Text Content Extraction Tests', () => {
  const pdfFilePath = 'cypress/fixtures/sampleDocument.pdf';

  it('should extract text content from PDF binary document and verify text strings', () => {
    FileOperationsPage.readPdfData(pdfFilePath).then((pdfText) => {
      // Assert PDF content is non-empty string
      expect(pdfText).to.be.a('string').and.not.be.empty;

      // Verify specific invoice text lines exist in PDF
      expect(pdfText).to.include('Invoice #INV-2026-001');
      expect(pdfText).to.include('Total Amount: $1,250.00');
      expect(pdfText).to.include('Status: Paid');
    });
  });

  it('should extract metadata fields using regex pattern matching on PDF text', () => {
    FileOperationsPage.readPdfData(pdfFilePath).then((pdfText) => {
      // Extract invoice ID via regex
      const invoiceMatch = pdfText.match(/Invoice\s+(#[A-Z0-9-]+)/);
      expect(invoiceMatch).to.not.be.null;
      expect(invoiceMatch![1]).to.eq('#INV-2026-001');

      // Extract amount via regex
      const amountMatch = pdfText.match(/Total\s+Amount:\s+(\$[\d,]+\.\d{2})/);
      expect(amountMatch).to.not.be.null;
      expect(amountMatch![1]).to.eq('$1,250.00');
    });
  });
});
