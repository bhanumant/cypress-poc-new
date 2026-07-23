import { WEBDRIVER_UNI_URLS, SLIDER_DATA } from '../../support/constants';
import SliderPage from '../pages/SliderPage';

describe('Custom UI Dual-Handle & Mouse Drag Slider Verification Tests', () => {
  beforeEach(() => {
    SliderPage.loadCustomDualSliderPortal(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should simulate mouse drag events on custom slider handle', () => {
    SliderPage.dragSliderHandle(SliderPage.minHandle, 250);
    SliderPage.updateCustomSliderValue(SliderPage.minHandle, 250);

    SliderPage.getElement(SliderPage.minPriceDisplay).should('have.text', '250');
    SliderPage.getElement(SliderPage.minHandle).should('have.attr', 'aria-valuenow', '250');
  });

  it('should adjust dual handles for minimum and maximum price range filtering', () => {
    SliderPage.updateCustomSliderValue(SliderPage.minHandle, 300);
    SliderPage.getElement(SliderPage.minPriceDisplay).should('have.text', '300');

    SliderPage.updateCustomSliderValue(SliderPage.maxHandle, 900);
    SliderPage.getElement(SliderPage.maxPriceDisplay).should('have.text', '900');

    SliderPage.getElement(SliderPage.minHandle).should('have.attr', 'aria-valuenow', '300');
    SliderPage.getElement(SliderPage.maxHandle).should('have.attr', 'aria-valuenow', '900');
  });

  it('should adjust custom slider values using Keyboard Arrow key navigation', () => {
    SliderPage.getElement(SliderPage.minPriceDisplay).should('have.text', SLIDER_DATA.initialMinNow);

    SliderPage.adjustSliderWithKeys(SliderPage.minHandle, '{rightarrow}');
    SliderPage.getElement(SliderPage.minPriceDisplay).should('have.text', SLIDER_DATA.stepUpNow);

    SliderPage.adjustSliderWithKeys(SliderPage.minHandle, '{leftarrow}');
    SliderPage.getElement(SliderPage.minPriceDisplay).should('have.text', SLIDER_DATA.stepDownNow);
  });

  it('should validate ARIA accessibility attributes on dual slider handles', () => {
    SliderPage.getElement(SliderPage.minHandle)
      .should('have.attr', 'role', SLIDER_DATA.role)
      .and('have.attr', 'aria-valuemin', SLIDER_DATA.min)
      .and('have.attr', 'aria-valuemax', SLIDER_DATA.max)
      .and('have.attr', 'aria-valuenow', SLIDER_DATA.initialMinNow);

    SliderPage.getElement(SliderPage.maxHandle)
      .should('have.attr', 'role', SLIDER_DATA.role)
      .and('have.attr', 'aria-valuemin', SLIDER_DATA.min)
      .and('have.attr', 'aria-valuemax', SLIDER_DATA.max)
      .and('have.attr', 'aria-valuenow', SLIDER_DATA.initialMaxNow);
  });
});
