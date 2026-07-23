import { WEBDRIVER_UNI_URLS, WEBDRIVER_UNI_ASSERTIONS } from '../../support/constants';
import DynamicDropdownPage from '../pages/DynamicDropdownPage';

describe('Dynamic Dropdown & Autocomplete Functionality Tests', () => {
  beforeEach(() => {
    // Navigate to WebdriverUniversity Autocomplete / Dynamic Dropdown page
    DynamicDropdownPage.open(WEBDRIVER_UNI_URLS.autocompletePage);
  });

  it('should search and select dynamic dropdown option using .each() iteration', () => {
    const searchTerm = WEBDRIVER_UNI_ASSERTIONS.autocomplete.searchTerms.chi;
    const targetItem = WEBDRIVER_UNI_ASSERTIONS.autocomplete.foodItems.chicken;

    // Perform dynamic search and select item from suggestion list via .each() loop
    DynamicDropdownPage.searchAndSelectOption(
      DynamicDropdownPage.autocompleteInput,
      DynamicDropdownPage.autocompleteListOptions,
      searchTerm,
      targetItem
    );

    // Verify input value matches selected target item
    DynamicDropdownPage.getElement(DynamicDropdownPage.autocompleteInput)
      .should('have.value', targetItem);
  });

  it('should select dynamic dropdown option by exact text match', () => {
    const searchTerm = WEBDRIVER_UNI_ASSERTIONS.autocomplete.searchTerms.asp;
    const targetItem = WEBDRIVER_UNI_ASSERTIONS.autocomplete.foodItems.asparagus;

    // Search and select by exact text match
    DynamicDropdownPage.selectDynamicOptionByText(
      DynamicDropdownPage.autocompleteInput,
      DynamicDropdownPage.autocompleteListOptions,
      searchTerm,
      targetItem,
      true
    );

    // Assert the selected value in input field
    DynamicDropdownPage.getElement(DynamicDropdownPage.autocompleteInput)
      .should('have.value', targetItem);
  });

  it('should select dynamic dropdown option by item index', () => {
    const searchTerm = WEBDRIVER_UNI_ASSERTIONS.autocomplete.searchTerms.g;

    // Select the first option (index 0) dynamically populated for "G"
    DynamicDropdownPage.selectDynamicOptionByIndex(
      DynamicDropdownPage.autocompleteInput,
      DynamicDropdownPage.autocompleteListOptions,
      searchTerm,
      0
    );

    // Assert that an option starting with G (e.g. Garlic) was selected
    DynamicDropdownPage.getElement(DynamicDropdownPage.autocompleteInput)
      .should('have.value', WEBDRIVER_UNI_ASSERTIONS.autocomplete.foodItems.garlic);
  });

  it('should submit form after dynamic dropdown selection and verify URL query params', () => {
    const searchTerm = WEBDRIVER_UNI_ASSERTIONS.autocomplete.searchTerms.app;
    const targetItem = WEBDRIVER_UNI_ASSERTIONS.autocomplete.foodItems.apple;

    // Search and select Apple
    DynamicDropdownPage.searchAndSelectOption(
      DynamicDropdownPage.autocompleteInput,
      DynamicDropdownPage.autocompleteListOptions,
      searchTerm,
      targetItem
    );

    // Submit form and verify URL contains selected query value
    DynamicDropdownPage.submitAutocompleteForm();
    cy.url().should('include', `food-item=${encodeURIComponent(targetItem)}`);
  });

  it('should handle dynamic option search with lowercase search text', () => {
    // Type lowercase 'chi' and select 'Chicken'
    DynamicDropdownPage.searchAndSelectOption(
      DynamicDropdownPage.autocompleteInput,
      DynamicDropdownPage.autocompleteListOptions,
      'chi',
      WEBDRIVER_UNI_ASSERTIONS.autocomplete.foodItems.chicken
    );

    DynamicDropdownPage.getElement(DynamicDropdownPage.autocompleteInput)
      .should('have.value', WEBDRIVER_UNI_ASSERTIONS.autocomplete.foodItems.chicken);
  });
});
