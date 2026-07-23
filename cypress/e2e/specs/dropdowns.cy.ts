import { WEBDRIVER_UNI_URLS, WEBDRIVER_UNI_ASSERTIONS } from '../../support/constants';
import DropdownPage from '../pages/DropdownPage';

describe('WebDriverUniversity Dropdown Functionality Tests', () => {
  beforeEach(() => {
    // Navigate to the WebdriverUniversity Dropdown, Checkbox & Radio Button page
    DropdownPage.open(WEBDRIVER_UNI_URLS.checkboxPage);
  });

  it('should select options by value and assert correct selections', () => {
    // Dropdown 1: Select Python
    DropdownPage.selectOption(DropdownPage.dropdownMenu1, WEBDRIVER_UNI_ASSERTIONS.dropdowns.menu1.python);
    DropdownPage.getElement(DropdownPage.dropdownMenu1).should('have.value', WEBDRIVER_UNI_ASSERTIONS.dropdowns.menu1.python);

    // Dropdown 2: Select Maven
    DropdownPage.selectOption(DropdownPage.dropdownMenu2, WEBDRIVER_UNI_ASSERTIONS.dropdowns.menu2.maven);
    DropdownPage.getElement(DropdownPage.dropdownMenu2).should('have.value', WEBDRIVER_UNI_ASSERTIONS.dropdowns.menu2.maven);

    // Dropdown 3: Select JavaScript
    DropdownPage.selectOption(DropdownPage.dropdownMenu3, WEBDRIVER_UNI_ASSERTIONS.dropdowns.menu3.javascript);
    DropdownPage.getElement(DropdownPage.dropdownMenu3).should('have.value', WEBDRIVER_UNI_ASSERTIONS.dropdowns.menu3.javascript);
  });

  it('should select options by visible text and assert values', () => {
    // Dropdown 1: Select SQL by visible text (SQL text matches SQL value)
    DropdownPage.getElement(DropdownPage.dropdownMenu1).select('SQL');
    DropdownPage.getElement(DropdownPage.dropdownMenu1).should('have.value', WEBDRIVER_UNI_ASSERTIONS.dropdowns.menu1.sql);

    // Dropdown 2: Select TestNG by visible text
    DropdownPage.getElement(DropdownPage.dropdownMenu2).select('TestNG');
    DropdownPage.getElement(DropdownPage.dropdownMenu2).should('have.value', WEBDRIVER_UNI_ASSERTIONS.dropdowns.menu2.testng);

    // Dropdown 3: Select CSS by visible text
    DropdownPage.getElement(DropdownPage.dropdownMenu3).select('CSS');
    DropdownPage.getElement(DropdownPage.dropdownMenu3).should('have.value', WEBDRIVER_UNI_ASSERTIONS.dropdowns.menu3.css);
  });

  it('should verify default states, disabled option, and interaction for fruit select dropdown', () => {
    // Grape is selected by default
    DropdownPage.getElement(DropdownPage.fruitSelect).should('have.value', WEBDRIVER_UNI_ASSERTIONS.dropdowns.fruits.grape);

    // Orange option is disabled
    DropdownPage.getElement(`${DropdownPage.fruitSelect} option[value="${WEBDRIVER_UNI_ASSERTIONS.dropdowns.fruits.orange}"]`)
      .should('be.disabled');

    // Select Pear and verify selection state changes
    DropdownPage.selectOption(DropdownPage.fruitSelect, WEBDRIVER_UNI_ASSERTIONS.dropdowns.fruits.pear);
    DropdownPage.getElement(DropdownPage.fruitSelect).should('have.value', WEBDRIVER_UNI_ASSERTIONS.dropdowns.fruits.pear);
  });
});
