import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import VisualPage from '../pages/VisualPage';

describe('Baseline Visual Image Verification & Regression Suite [@visual, @baseline, @smoke]', () => {
  beforeEach(() => {
    VisualPage.open(WEBDRIVER_UNI_URLS.contactUs);
  });

  it('should compare portal header visual baseline and assert matching pixels [@visual, @smoke]', () => {
    VisualPage.compareElementWithBaseline('h2[name="contactme"]', 'contact_header_baseline').then((result) => {
      expect(result.matched).to.be.true;
      expect(result.mismatchPercentage).to.be.lessThan(5.0);
    });
  });

  it('should compare form container component against visual baseline snapshot [@visual, @regression]', () => {
    VisualPage.compareElementWithBaseline('#contact_form', 'contact_form_baseline').then((result) => {
      expect(result.matched).to.be.true;
      expect(result.mismatchPercentage).to.be.lessThan(5.0);
    });
  });

  it('should handle initial baseline creation gracefully [@visual, @sanity]', () => {
    VisualPage.compareElementWithBaseline('input[name="first_name"]', 'first_name_input_baseline').then((result) => {
      expect(result.mismatchPercentage).to.be.a('number');
    });
  });
});
