import BasePage from './BasePage';

class ContactUsPage extends BasePage {
  readonly firstNameInput = 'input[name="first_name"]';
  readonly lastNameInput = 'input[name="last_name"]';
  readonly emailInput = 'input[name="email"]';
  readonly commentsInput = 'textarea[name="message"]';
  readonly submitBtn = 'input[type="submit"]';
  readonly resetBtn = 'input[type="reset"]';
  readonly successHeader = 'h1';
  readonly bodyText = 'body';

  /**
   * Navigates directly to the real WebdriverUniversity Contact Us page.
   * 
   * @param pageUrl Target contact page URL
   */
  loadContactUs(pageUrl: string = 'https://webdriveruniversity.com/Contact-Us/contactus.html') {
    this.open(pageUrl);
  }

  /**
   * Fills contact form input fields.
   * 
   * @param firstName First Name string
   * @param lastName Last Name string
   * @param email Email string
   * @param comments Comments text string
   */
  fillContactForm(firstName?: string, lastName?: string, email?: string, comments?: string) {
    if (firstName) this.type(this.firstNameInput, firstName);
    if (lastName) this.type(this.lastNameInput, lastName);
    if (email) this.type(this.emailInput, email);
    if (comments) this.type(this.commentsInput, comments);
  }

  /**
   * Submits the contact us form by clicking submit button.
   */
  submitForm() {
    this.click(this.submitBtn);
  }

  /**
   * Resets form text inputs by clicking reset button.
   */
  resetForm() {
    this.click(this.resetBtn);
  }
}

export default new ContactUsPage();
