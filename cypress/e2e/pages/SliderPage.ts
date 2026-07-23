import BasePage from './BasePage';

class SliderPage extends BasePage {
  // Locators for Single Range Sliders
  readonly volumeSlider = '#volumeSlider';
  readonly volumeDisplay = '#volumeValue';
  readonly brightnessSlider = '#brightnessSlider';
  readonly brightnessDisplay = '#brightnessValue';

  // Locators for Custom Dual-Handle Sliders
  readonly minHandle = '#minHandle';
  readonly maxHandle = '#maxHandle';
  readonly minPriceDisplay = '#minPrice';
  readonly maxPriceDisplay = '#maxPrice';

  /**
   * Loads the HTML fixture template for Single HTML5 Range Sliders into page document.
   * 
   * @param pageUrl Target base page URL to open first
   */
  loadSingleSliderPortal(pageUrl: string) {
    this.open(pageUrl);
    cy.fixture('html/singleSliderPortal.html').then((htmlContent: string) => {
      cy.document().then((doc) => {
        doc.body.innerHTML = htmlContent;

        const vol = doc.getElementById('volumeSlider') as HTMLInputElement;
        const volVal = doc.getElementById('volumeValue');
        const bright = doc.getElementById('brightnessSlider') as HTMLInputElement;
        const brightVal = doc.getElementById('brightnessValue');

        if (vol && volVal) {
          const updateVol = () => { volVal.textContent = vol.value; };
          vol.addEventListener('input', updateVol);
          vol.addEventListener('change', updateVol);
        }

        if (bright && brightVal) {
          const updateBright = () => { brightVal.textContent = bright.value; };
          bright.addEventListener('input', updateBright);
          bright.addEventListener('change', updateBright);
        }
      });
    });
  }

  /**
   * Loads the HTML fixture template for Custom Dual-Handle Range Sliders into page document.
   * 
   * @param pageUrl Target base page URL to open first
   */
  loadCustomDualSliderPortal(pageUrl: string) {
    this.open(pageUrl);
    cy.fixture('html/customDualSliderPortal.html').then((htmlContent: string) => {
      cy.document().then((doc) => {
        doc.body.innerHTML = htmlContent;

        const minH = doc.getElementById('minHandle');
        const maxH = doc.getElementById('maxHandle');
        const minP = doc.getElementById('minPrice');
        const maxP = doc.getElementById('maxPrice');

        // Event listener for updating Min Handle value
        if (minH && minP) {
          minH.addEventListener('updateValue', (e: any) => {
            const val = e.detail.value;
            minH.setAttribute('aria-valuenow', val.toString());
            minP.textContent = val.toString();
          });

          minH.addEventListener('keydown', (e: KeyboardEvent) => {
            let current = parseInt(minH.getAttribute('aria-valuenow') || '100');
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') current = Math.min(1000, current + 50);
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') current = Math.max(0, current - 50);
            minH.dispatchEvent(new CustomEvent('updateValue', { detail: { value: current } }));
          });
        }

        // Event listener for updating Max Handle value
        if (maxH && maxP) {
          maxH.addEventListener('updateValue', (e: any) => {
            const val = e.detail.value;
            maxH.setAttribute('aria-valuenow', val.toString());
            maxP.textContent = val.toString();
          });

          maxH.addEventListener('keydown', (e: KeyboardEvent) => {
            let current = parseInt(maxH.getAttribute('aria-valuenow') || '800');
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') current = Math.min(1000, current + 50);
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') current = Math.max(0, current - 50);
            maxH.dispatchEvent(new CustomEvent('updateValue', { detail: { value: current } }));
          });
        }
      });
    });
  }

  /**
   * Sets value of an HTML5 range slider via .invoke('val') and triggers 'input' and 'change' events.
   * 
   * @param selector Target range slider selector
   * @param value Target numeric value to set
   */
  setRangeSliderValue(selector: string, value: number) {
    this.getElement(selector)
      .should('be.visible')
      .invoke('val', value)
      .trigger('input')
      .trigger('change');
  }

  /**
   * Focuses on slider and sends keyboard arrow key commands ({rightarrow}, {leftarrow}, {uparrow}, {keydown}).
   * 
   * @param selector Target slider selector
   * @param keySequence Keyboard arrow key sequence
   */
  adjustSliderWithKeys(selector: string, keySequence: string) {
    this.getElement(selector)
      .should('be.visible')
      .focus()
      .type(keySequence)
      .trigger('input')
      .trigger('change');
  }

  /**
   * Simulates mouse drag movement on custom slider handle.
   * 
   * @param selector Target slider handle selector
   * @param clientX Target X coordinate position for mousemove
   */
  dragSliderHandle(selector: string, clientX: number) {
    this.getElement(selector)
      .should('be.visible')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: clientX })
      .trigger('mouseup', { force: true });
  }

  /**
   * Updates custom slider handle ARIA value directly for test validation.
   * 
   * @param selector Target slider handle selector
   * @param newValue Numeric ARIA value
   */
  updateCustomSliderValue(selector: string, newValue: number) {
    this.getElement(selector).then(($el) => {
      const el = $el[0];
      el.dispatchEvent(new CustomEvent('updateValue', { detail: { value: newValue } }));
    });
  }
}

export default new SliderPage();
