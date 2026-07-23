import { WEBDRIVER_UNI_URLS, CONTACT_US_DATA } from '../../support/constants';
import ContactUsPage from '../pages/ContactUsPage';

describe('WebdriverUniversity Contact Us Form Automation Suite [@contact-us, @form, @smoke, @regression]', () => {
  beforeEach(() => {
    ContactUsPage.loadContactUs(WEBDRIVER_UNI_URLS.contactUs);
  });

  it('should successfully submit Contact Us form with complete valid data [@contact-us, @smoke]', () => {
    const user = CONTACT_US_DATA.validUser;
    ContactUsPage.fillContactForm(user.firstName, user.lastName, user.email, user.comments);
    ContactUsPage.submitForm();
    cy.get('body', { timeout: 15000 }).should('contain.text', CONTACT_US_DATA.messages.success);
  });

  it('should display error message when mandatory fields are missing [@contact-us, @regression]', () => {
    const user = CONTACT_US_DATA.incompleteUser;
    ContactUsPage.fillContactForm(user.firstName, undefined, undefined, user.comments);
    ContactUsPage.submitForm();
    ContactUsPage.getText(ContactUsPage.bodyText).should('contain', CONTACT_US_DATA.messages.errorRequired);
  });

  it('should display error message when invalid email address format is entered [@contact-us, @regression]', () => {
    const user = CONTACT_US_DATA.invalidEmailUser;
    ContactUsPage.fillContactForm(user.firstName, user.lastName, user.email, user.comments);
    ContactUsPage.submitForm();
    ContactUsPage.getText(ContactUsPage.bodyText).should('contain', CONTACT_US_DATA.messages.errorInvalidEmail);
  });

  it('should clear all input fields when reset button is clicked [@contact-us, @sanity]', () => {
    const user = CONTACT_US_DATA.draftUser;
    ContactUsPage.fillContactForm(user.firstName, user.lastName, user.email, user.comments);
    ContactUsPage.resetForm();

    ContactUsPage.getElement(ContactUsPage.firstNameInput).should('have.value', '');
    ContactUsPage.getElement(ContactUsPage.lastNameInput).should('have.value', '');
    ContactUsPage.getElement(ContactUsPage.emailInput).should('have.value', '');
    ContactUsPage.getElement(ContactUsPage.commentsInput).should('have.value', '');
  });
});
