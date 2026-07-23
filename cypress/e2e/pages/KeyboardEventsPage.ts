import BasePage from './BasePage';

class KeyboardEventsPage extends BasePage {
  // Locators for testing Keyboard Actions
  readonly inputField = '#myInput';
  readonly autocompleteOptions = '#myInputautocomplete-list div';
  readonly submitButton = '#submit-button';

  /**
   * Types text into a target field followed by a special key sequence (e.g., '{enter}', '{esc}', '{tab}').
   * 
   * @param selector Target input selector
   * @param text Text string to type
   * @param specialKey Cypress special key representation (e.g. '{enter}')
   */
  typeWithSpecialKey(selector: string, text: string, specialKey: string) {
    this.getElement(selector).should('be.visible').clear().type(`${text}${specialKey}`);
  }

  /**
   * Focuses on an element and sends a specific key press or key combination.
   * 
   * @param selector Target element selector
   * @param keySequence Key string or combination (e.g. '{downarrow}', '{enter}', '{esc}')
   */
  pressKey(selector: string, keySequence: string) {
    this.getElement(selector).focus().type(keySequence);
  }

  /**
   * Highlights all existing text in an input using {selectall} and overwrites it with new text.
   * 
   * @param selector Target element selector
   * @param newText Replacement text string
   */
  selectAllAndType(selector: string, newText: string) {
    this.getElement(selector).focus().type(`{selectall}${newText}`);
  }

  /**
   * Deletes characters from the current input value by sending backspace keys.
   * 
   * @param selector Target element selector
   * @param count Number of backspace key presses to perform
   */
  clearWithBackspace(selector: string, count: number) {
    const backspaces = '{backspace}'.repeat(count);
    this.getElement(selector).type(backspaces);
  }

  /**
   * Triggers explicit low-level DOM keyboard events on an element.
   * 
   * @param selector Target element selector
   * @param eventType Event name ('keydown' | 'keyup' | 'keypress')
   * @param eventInitMap DOM KeyboardEventInit options (e.g. { key: 'Enter', keyCode: 13, which: 13 })
   */
  triggerKeyboardEvent(selector: string, eventType: string, eventInitMap: object = {}) {
    this.getElement(selector).trigger(eventType, eventInitMap);
  }
}

export default new KeyboardEventsPage();
