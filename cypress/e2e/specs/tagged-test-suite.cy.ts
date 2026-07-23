import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import BasePage from '../pages/BasePage';

describe('Enterprise Tagged Test Suite Grouping & Execution Suite [@smoke, @regression, @sanity]', () => {
  const basePage = new BasePage();

  beforeEach(() => {
    basePage.open(WEBDRIVER_UNI_URLS.contactUs);
  });

  describe('Critical Path Smoke Test Group [@smoke, @critical]', () => {
    it('should verify primary portal page title and URL loading [@smoke, @critical]', () => {
      cy.url().should('include', 'Contact-Us');
      cy.title().should('not.be.empty');
    });

    it('should verify main form container visibility [@smoke]', () => {
      basePage.getElement('#contact_form').should('be.visible');
    });
  });

  describe('Deep Regression Test Group [@regression]', () => {
    it('should validate form input text fields under full regression suite [@regression]', () => {
      basePage.type('input[name="first_name"]', 'Enterprise');
      basePage.type('input[name="last_name"]', 'QA');
      basePage.getElement('input[name="first_name"]').should('have.value', 'Enterprise');
    });

    it('should verify form reset action button functionality [@regression]', () => {
      basePage.type('input[name="first_name"]', 'Temporary');
      basePage.click('input[type="reset"]');
      basePage.getElement('input[name="first_name"]').should('have.value', '');
    });
  });

  describe('Sanity Check Test Group [@sanity]', () => {
    it('should quickly verify document body rendering [@sanity]', () => {
      basePage.getElement('body').should('exist');
    });
  });
});
