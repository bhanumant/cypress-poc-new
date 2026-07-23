import { WEBDRIVER_UNI_URLS, WEBDRIVER_UNI_ASSERTIONS } from '../../support/constants';
import CheckboxPage from '../pages/CheckboxPage';

describe('WebDriverUniversity Checkbox Functionality Tests', () => {
  beforeEach(() => {
    // Navigate to the WebdriverUniversity Dropdown, Checkbox & Radio Button page
    CheckboxPage.open(WEBDRIVER_UNI_URLS.checkboxPage);
  });

  it('should verify the default states of the checkboxes', () => {
    // Checkbox 1, 2, and 4 are unchecked by default
    CheckboxPage.getElement(CheckboxPage.checkboxOption1).should('not.be.checked');
    CheckboxPage.getElement(CheckboxPage.checkboxOption2).should('not.be.checked');
    CheckboxPage.getElement(CheckboxPage.checkboxOption4).should('not.be.checked');

    // Checkbox 3 is checked by default
    CheckboxPage.getElement(CheckboxPage.checkboxOption3).should('be.checked');

    // Assert total count of checkbox inputs
    CheckboxPage.getElement(CheckboxPage.allCheckboxes)
      .should('have.length', WEBDRIVER_UNI_ASSERTIONS.expectedCheckboxCount);
  });

  it('should check and uncheck individual checkboxes successfully', () => {
    // Check Option 1 and verify it is checked
    CheckboxPage.checkCheckbox(CheckboxPage.checkboxOption1);
    CheckboxPage.getElement(CheckboxPage.checkboxOption1).should('be.checked');

    // Uncheck Option 3 and verify it is unchecked
    CheckboxPage.uncheckCheckbox(CheckboxPage.checkboxOption3);
    CheckboxPage.getElement(CheckboxPage.checkboxOption3).should('not.be.checked');
  });

  it('should check multiple checkboxes using an array of option values', () => {
    // Cypress .check() can take an array of values to check multiple inputs in a single command
    const optionsToSelect = [
      WEBDRIVER_UNI_ASSERTIONS.options.option1,
      WEBDRIVER_UNI_ASSERTIONS.options.option2,
      WEBDRIVER_UNI_ASSERTIONS.options.option4,
    ];

    CheckboxPage.getElement(CheckboxPage.allCheckboxes).check(optionsToSelect);

    // Verify all selected options are checked
    CheckboxPage.getElement(CheckboxPage.checkboxOption1).should('be.checked');
    CheckboxPage.getElement(CheckboxPage.checkboxOption2).should('be.checked');
    CheckboxPage.getElement(CheckboxPage.checkboxOption4).should('be.checked');

    // Checkbox 3 should remain checked (since it was already checked)
    CheckboxPage.getElement(CheckboxPage.checkboxOption3).should('be.checked');
  });

  it('should check and uncheck all checkboxes sequentially', () => {
    // Check all checkboxes
    CheckboxPage.getElement(CheckboxPage.allCheckboxes).check().should('be.checked');

    // Uncheck all checkboxes
    CheckboxPage.getElement(CheckboxPage.allCheckboxes).uncheck().should('not.be.checked');
  });
});

