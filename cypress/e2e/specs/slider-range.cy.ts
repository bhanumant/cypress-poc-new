import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import SliderPage from '../pages/SliderPage';

describe('HTML5 Native Range Slider Automation & Verification Tests', () => {
  beforeEach(() => {
    // Load HTML5 single range slider portal template via Page Object helper
    SliderPage.loadSingleSliderPortal(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should set HTML5 range slider value via invoke and verify dynamic readout', () => {
    const targetVolume = 85;

    // Set Volume slider value to 85 using .invoke('val')
    SliderPage.setRangeSliderValue(SliderPage.volumeSlider, targetVolume);

    // Verify slider input value attribute matches target
    SliderPage.getElement(SliderPage.volumeSlider)
      .should('have.value', targetVolume.toString());

    // Verify UI readout text updates dynamically
    SliderPage.getElement(SliderPage.volumeDisplay)
      .should('have.text', targetVolume.toString());

    // Set Volume slider to 20 and re-verify
    SliderPage.setRangeSliderValue(SliderPage.volumeSlider, 20);
    SliderPage.getElement(SliderPage.volumeDisplay)
      .should('have.text', '20');
  });

  it('should adjust range slider value and update readout dynamically', () => {
    // Default volume value is 50 with step 5
    SliderPage.getElement(SliderPage.volumeDisplay).should('have.text', '50');

    // Set value to 60 and verify readout updates
    SliderPage.setRangeSliderValue(SliderPage.volumeSlider, 60);
    SliderPage.getElement(SliderPage.volumeDisplay).should('have.text', '60');

    // Set value to 55 and verify readout updates
    SliderPage.setRangeSliderValue(SliderPage.volumeSlider, 55);
    SliderPage.getElement(SliderPage.volumeDisplay).should('have.text', '55');
  });

  it('should verify boundary values (min, max, step) on brightness slider', () => {
    // Assert HTML5 range slider attributes (min, max, step, initial value)
    SliderPage.getElement(SliderPage.brightnessSlider)
      .should('have.attr', 'min', '0')
      .and('have.attr', 'max', '10')
      .and('have.attr', 'step', '1')
      .and('have.value', '3');

    // Set value to absolute minimum (0) and verify
    SliderPage.setRangeSliderValue(SliderPage.brightnessSlider, 0);
    SliderPage.getElement(SliderPage.brightnessDisplay).should('have.text', '0');

    // Set value to absolute maximum (10) and verify
    SliderPage.setRangeSliderValue(SliderPage.brightnessSlider, 10);
    SliderPage.getElement(SliderPage.brightnessDisplay).should('have.text', '10');
  });
});
