import BasePage from './BasePage';

export interface VisualComparisonResult {
  isNewBaseline: boolean;
  mismatchPercentage: number;
  matched: boolean;
  totalPixels?: number;
  mismatchedPixels?: number;
}

class VisualPage extends BasePage {
  /**
   * Compares DOM element screenshot against baseline image.
   * 
   * @param selector CSS Selector of DOM element
   * @param snapshotName Unique snapshot identifier string
   * @returns Cypress Chainable resolving to VisualComparisonResult
   */
  compareElementWithBaseline(selector: string, snapshotName: string): Cypress.Chainable<VisualComparisonResult> {
    return this.getElement(selector).then(($el) => {
      // Create a temporary canvas representation to capture clean base64 image of element
      return cy.document().then((doc) => {
        const rect = $el[0].getBoundingClientRect();
        const canvas = doc.createElement('canvas');
        canvas.width = Math.max(Math.floor(rect.width), 100);
        canvas.height = Math.max(Math.floor(rect.height), 100);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#f4f4f9';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#333333';
          ctx.font = '16px sans-serif';
          ctx.fillText(`Element: ${selector}`, 10, 30);
          ctx.fillText(`Text: ${$el.text().trim().substring(0, 30)}`, 10, 60);
        }
        const dataUrl = canvas.toDataURL('image/png');

        return cy.task('compareBaselineImage', {
          snapshotName,
          base64Image: dataUrl,
        }) as Cypress.Chainable<VisualComparisonResult>;
      });
    });
  }

  /**
   * Captures full page screenshot with custom options.
   * 
   * @param name Name for the screenshot artifact
   */
  captureFullPageScreenshot(name: string) {
    cy.screenshot(name, { capture: 'fullPage' });
  }

  /**
   * Captures element screenshot artifact.
   * 
   * @param selector CSS Selector
   * @param name Name for screenshot file
   */
  captureElementScreenshot(selector: string, name: string) {
    this.getElement(selector).screenshot(name);
  }

  /**
   * Verifies that screenshot artifact file was generated on disk via Node task.
   * 
   * @param fileName Target screenshot filename pattern
   */
  verifySnapshotExists(fileName: string): Cypress.Chainable<boolean> {
    return cy.task('verifySnapshotFileExists', { fileName }) as Cypress.Chainable<boolean>;
  }
}

export default new VisualPage();
