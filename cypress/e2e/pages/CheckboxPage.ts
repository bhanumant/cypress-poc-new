import BasePage from './BasePage';

class CheckboxPage extends BasePage {
  readonly checkboxOption1 = 'input[value="option-1"]';
  readonly checkboxOption2 = 'input[value="option-2"]';
  readonly checkboxOption3 = 'input[value="option-3"]';
  readonly checkboxOption4 = 'input[value="option-4"]';
  readonly allCheckboxes = '#checkboxes input[type="checkbox"]';

  checkCheckbox(selector: string) {
    this.getElement(selector).should('be.visible').check();
  }

  uncheckCheckbox(selector: string) {
    this.getElement(selector).should('be.visible').uncheck();
  }
}

export default new CheckboxPage();
