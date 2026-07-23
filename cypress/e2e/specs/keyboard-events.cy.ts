import { WEBDRIVER_UNI_URLS, WEBDRIVER_UNI_ASSERTIONS } from '../../support/constants';
import KeyboardEventsPage from '../pages/KeyboardEventsPage';

describe('Keyboard Events & Key Combination Automation Tests', () => {
  beforeEach(() => {
    // Navigate to test page for keyboard interaction testing
    KeyboardEventsPage.open(WEBDRIVER_UNI_URLS.autocompletePage);
  });

  it('should submit form by focusing button and pressing {enter} key', () => {
    const targetFood = WEBDRIVER_UNI_ASSERTIONS.autocomplete.foodItems.chicken;

    // Type input value and submit via {enter} key press on submit button
    KeyboardEventsPage.type(KeyboardEventsPage.inputField, targetFood);
    KeyboardEventsPage.pressKey(KeyboardEventsPage.submitButton, '{enter}');

    // Verify form submission occurred via URL parameter
    cy.url().should('include', `food-item=${encodeURIComponent(targetFood)}`);
  });

  it('should manipulate input text using {backspace} keys', () => {
    const initialText = WEBDRIVER_UNI_ASSERTIONS.keyboardEvents.sampleInputText;
    const deleteCount = 9;

    // Type sample text
    KeyboardEventsPage.type(KeyboardEventsPage.inputField, initialText);
    KeyboardEventsPage.getElement(KeyboardEventsPage.inputField).should('have.value', initialText);

    // Delete last 9 characters via backspace
    KeyboardEventsPage.clearWithBackspace(KeyboardEventsPage.inputField, deleteCount);

    // Assert value is truncated correctly
    const expectedText = initialText.slice(0, -deleteCount);
    KeyboardEventsPage.getElement(KeyboardEventsPage.inputField).should('have.value', expectedText);
  });

  it('should overwrite existing text using {selectall} shortcut', () => {
    const initialText = 'Old Text To Be Replaced';
    const replacementText = WEBDRIVER_UNI_ASSERTIONS.keyboardEvents.overwriteText;

    // Type initial text
    KeyboardEventsPage.type(KeyboardEventsPage.inputField, initialText);

    // Highlight all text using {selectall} and type replacement
    KeyboardEventsPage.selectAllAndType(KeyboardEventsPage.inputField, replacementText);

    // Assert input field holds only the replacement text
    KeyboardEventsPage.getElement(KeyboardEventsPage.inputField).should('have.value', replacementText);
  });

  it('should handle Escape key ({esc}) interactions', () => {
    // Type search prefix to trigger dynamic options
    KeyboardEventsPage.getElement(KeyboardEventsPage.inputField)
      .clear()
      .type(WEBDRIVER_UNI_ASSERTIONS.autocomplete.searchTerms.chi);

    // Dynamic list is displayed
    KeyboardEventsPage.getElement(KeyboardEventsPage.autocompleteOptions).should('be.visible');

    // Send Escape key press
    KeyboardEventsPage.getElement(KeyboardEventsPage.inputField).type('{esc}');

    // Verify input element retains typed value
    KeyboardEventsPage.getElement(KeyboardEventsPage.inputField)
      .should('have.value', WEBDRIVER_UNI_ASSERTIONS.autocomplete.searchTerms.chi);
  });

  it('should navigate dynamic suggestion list using ArrowDown and Enter keys', () => {
    // Type search prefix to trigger dynamic options
    KeyboardEventsPage.getElement(KeyboardEventsPage.inputField)
      .clear()
      .type(WEBDRIVER_UNI_ASSERTIONS.autocomplete.searchTerms.chi);

    // Ensure suggestion list is visible
    KeyboardEventsPage.getElement(KeyboardEventsPage.autocompleteOptions).should('be.visible');

    // Press ArrowDown to highlight first suggestion and Enter to select
    KeyboardEventsPage.getElement(KeyboardEventsPage.inputField).type('{downarrow}{enter}');

    // Verify selected option populated into input
    KeyboardEventsPage.getElement(KeyboardEventsPage.inputField)
      .should('have.value', WEBDRIVER_UNI_ASSERTIONS.autocomplete.foodItems.chicken);
  });

  it('should trigger explicit low-level DOM keydown and keyup events', () => {
    // Trigger explicit keydown event for Enter key
    KeyboardEventsPage.triggerKeyboardEvent(KeyboardEventsPage.inputField, 'keydown', {
      key: 'Enter',
      keyCode: 13,
      which: 13,
      code: 'Enter',
    });

    // Trigger explicit keyup event for Enter key
    KeyboardEventsPage.triggerKeyboardEvent(KeyboardEventsPage.inputField, 'keyup', {
      key: 'Enter',
      keyCode: 13,
      which: 13,
      code: 'Enter',
    });

    // Assert input field remains functional and visible
    KeyboardEventsPage.getElement(KeyboardEventsPage.inputField).should('be.visible');
  });
});
