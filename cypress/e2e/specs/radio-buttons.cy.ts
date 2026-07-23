import { WEBDRIVER_UNI_URLS, WEBDRIVER_UNI_ASSERTIONS } from '../../support/constants';
import RadioButtonPage from '../pages/RadioButtonPage';

describe('WebDriverUniversity Radio Button Functionality Tests', () => {
  beforeEach(() => {
    // Navigate to the WebdriverUniversity Dropdown, Checkbox & Radio Button page
    RadioButtonPage.open(WEBDRIVER_UNI_URLS.checkboxPage);
  });

  it('should verify the default states of the radio buttons', () => {
    // Under Selected & Disabled: Pumpkin is checked by default
    RadioButtonPage.getElement(RadioButtonPage.vegetablePumpkin).should('be.checked');

    // Lettuce and Cabbage are unchecked by default
    RadioButtonPage.getElement(RadioButtonPage.vegetableLettuce).should('not.be.checked');
    RadioButtonPage.getElement(RadioButtonPage.vegetableCabbage).should('not.be.checked');

    // Cabbage should be disabled
    RadioButtonPage.getElement(RadioButtonPage.vegetableCabbage).should('be.disabled');

    // Lettuce should be enabled
    RadioButtonPage.getElement(RadioButtonPage.vegetableLettuce).should('not.be.disabled');

    // Colors: Blue and Orange are unchecked by default
    RadioButtonPage.getElement(RadioButtonPage.colorBlue).should('not.be.checked');
    RadioButtonPage.getElement(RadioButtonPage.colorOrange).should('not.be.checked');
  });

  it('should select radio buttons individually and assert state changes', () => {
    // Select Blue and verify it is checked
    RadioButtonPage.checkRadioButton(RadioButtonPage.colorBlue);
    RadioButtonPage.getElement(RadioButtonPage.colorBlue).should('be.checked');
    RadioButtonPage.getElement(RadioButtonPage.colorOrange).should('not.be.checked');

    // Select Orange and verify it changes selection
    RadioButtonPage.checkRadioButton(RadioButtonPage.colorOrange);
    RadioButtonPage.getElement(RadioButtonPage.colorOrange).should('be.checked');
    RadioButtonPage.getElement(RadioButtonPage.colorBlue).should('not.be.checked');
  });

  it('should assert behavior of disabled and enabled radio buttons', () => {
    // Check Lettuce and verify it is checkable
    RadioButtonPage.checkRadioButton(RadioButtonPage.vegetableLettuce);
    RadioButtonPage.getElement(RadioButtonPage.vegetableLettuce).should('be.checked');
    RadioButtonPage.getElement(RadioButtonPage.vegetablePumpkin).should('not.be.checked');

    // Check that cabbage is disabled and not checkable
    RadioButtonPage.getElement(RadioButtonPage.vegetableCabbage).should('be.disabled');
  });
});

