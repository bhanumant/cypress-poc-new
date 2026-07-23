import BasePage from './BasePage';

class DynamicDropdownPage extends BasePage {
  // Locators for WebdriverUniversity Autocomplete / Dynamic Dropdown
  readonly autocompleteInput = '#myInput';
  readonly autocompleteListOptions = '#myInputautocomplete-list div';
  readonly submitButton = '#submit-button';

  // Locators for Custom UI / Framework Dynamic Dropdowns (e.g. OrangeHRM style)
  readonly customSelectWrapper = '.oxd-select-wrapper';
  readonly customSelectOptions = '.oxd-select-dropdown > div';
  readonly customAutocompleteInput = '.oxd-autocomplete-text-input input';
  readonly customAutocompleteOptions = '.oxd-autocomplete-dropdown > div';

  /**
   * Types search text into dynamic input field, iterates through dynamic suggestion list using .each(),
   * matches the target option text, clicks it, and verifies selection.
   * 
   * @param inputSelector Selector for search input field
   * @param optionsSelector Selector for dynamic option list items
   * @param searchText Text to type into search input
   * @param targetOption Exact or expected option text to select
   */
  searchAndSelectOption(
    inputSelector: string,
    optionsSelector: string,
    searchText: string,
    targetOption: string
  ) {
    this.getElement(inputSelector).should('be.visible').clear().type(searchText);
    
    // Ensure dynamic dropdown suggestion options appear
    cy.get(optionsSelector).should('be.visible').each(($el) => {
      const itemText = $el.text().trim();
      if (itemText === targetOption) {
        cy.wrap($el).click();
      }
    });

    // Verify selected value is populated into the input field
    this.getElement(inputSelector).should('have.value', targetOption);
  }

  /**
   * Dynamic search & select by partial or exact text match.
   * 
   * @param inputSelector Selector for input field
   * @param optionsSelector Selector for dynamic dropdown items
   * @param searchText Text typed into search box
   * @param targetText Target option text to find and click
   * @param exactMatch Whether match must be exact or partial (default: true)
   */
  selectDynamicOptionByText(
    inputSelector: string,
    optionsSelector: string,
    searchText: string,
    targetText: string,
    exactMatch: boolean = true
  ) {
    this.getElement(inputSelector).should('be.visible').clear().type(searchText);

    cy.get(optionsSelector).should('be.visible');

    if (exactMatch) {
      cy.get(optionsSelector).contains(new RegExp(`^${targetText}$`, 'i')).click();
    } else {
      cy.get(optionsSelector).contains(targetText).click();
    }
  }

  /**
   * Types search text into input field and selects the N-th dynamic option from suggestion list.
   * 
   * @param inputSelector Selector for search input
   * @param optionsSelector Selector for dynamic suggestion items
   * @param searchText Search string to trigger dynamic list
   * @param index 0-based index of option to select
   */
  selectDynamicOptionByIndex(
    inputSelector: string,
    optionsSelector: string,
    searchText: string,
    index: number
  ) {
    this.getElement(inputSelector).should('be.visible').clear().type(searchText);
    cy.get(optionsSelector).should('be.visible').eq(index).click();
  }

  /**
   * Submits the autocomplete form.
   */
  submitAutocompleteForm() {
    this.click(this.submitButton);
  }
}

export default new DynamicDropdownPage();
