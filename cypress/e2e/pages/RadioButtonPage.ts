import BasePage from './BasePage';

class RadioButtonPage extends BasePage {
  readonly colorBlue = 'input[value="blue"]';
  readonly colorOrange = 'input[value="orange"]';
  readonly vegetablePumpkin = 'input[value="pumpkin"]';
  readonly vegetableLettuce = 'input[value="lettuce"]';
  readonly vegetableCabbage = 'input[value="cabbage"]';

  checkRadioButton(selector: string) {
    this.getElement(selector).should('be.visible').check();
  }
}

export default new RadioButtonPage();
