import BasePage from './BasePage';

class DropdownPage extends BasePage {
  readonly dropdownMenu1 = '#dropdowm-menu-1';
  readonly dropdownMenu2 = '#dropdowm-menu-2';
  readonly dropdownMenu3 = '#dropdowm-menu-3';
  readonly fruitSelect = '#fruit-selects';

  selectOption(selector: string, value: string) {
    this.getElement(selector).should('be.visible').select(value);
  }
}

export default new DropdownPage();
