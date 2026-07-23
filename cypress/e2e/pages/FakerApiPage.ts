import BasePage from './BasePage';
import { FakeUserProfile, FakeOrderPayload } from '../../support/utils/FakerUtils';

class FakerApiPage extends BasePage {
  /**
   * Sets up cy.intercept route to mock GET /api/v1/users with dynamically generated Faker users list.
   * 
   * @param mockUsers Dynamic array of FakeUserProfile objects
   */
  interceptUsersApi(mockUsers: FakeUserProfile[]) {
    cy.intercept('GET', '**/api/v1/users*', {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: {
        success: true,
        total: mockUsers.length,
        data: mockUsers,
      },
    }).as('getDynamicUsers');
  }

  /**
   * Sets up cy.intercept route to mock POST /api/v1/orders with dynamic Faker order payload.
   * 
   * @param mockOrder Dynamic FakeOrderPayload object
   */
  interceptCreateOrderApi(mockOrder: FakeOrderPayload) {
    cy.intercept('POST', '**/api/v1/orders*', {
      statusCode: 201,
      headers: { 'content-type': 'application/json' },
      body: {
        success: true,
        message: 'Order created successfully',
        order: mockOrder,
      },
    }).as('postDynamicOrder');
  }

  /**
   * Loads an HTML fixture page with form fields for dynamic Faker population.
   * 
   * @param pageUrl Target page URL
   */
  loadDynamicFormPortal(pageUrl: string) {
    this.open(pageUrl);
    cy.fixture('html/loginPortal.html').then((htmlContent: string) => {
      cy.document().then((doc) => {
        doc.body.innerHTML = `
          <div style="padding:20px; font-family:sans-serif; max-width:500px; margin:auto;">
            <h2>Faker Dynamic API & Form Portal</h2>
            <form id="userForm">
              <div><label>First Name:</label><input type="text" id="firstNameInput" data-testid="first-name"></div>
              <div><label>Last Name:</label><input type="text" id="lastNameInput" data-testid="last-name"></div>
              <div><label>Email:</label><input type="email" id="emailInput" data-testid="email"></div>
              <div><label>Job Title:</label><input type="text" id="jobTitleInput" data-testid="job-title"></div>
              <div><label>Company:</label><input type="text" id="companyInput" data-testid="company"></div>
              <button type="button" id="submitUserBtn" data-testid="submit-btn" style="margin-top:10px;">Register User</button>
            </form>
            <div id="outputStatus" data-testid="status-msg" style="margin-top:15px; font-weight:bold;"></div>
          </div>
        `;

        const btn = doc.getElementById('submitUserBtn');
        if (btn) {
          btn.addEventListener('click', () => {
            const out = doc.getElementById('outputStatus');
            if (out) out.textContent = 'USER_REGISTERED_SUCCESSFULLY';
          });
        }
      });
    });
  }
}

export default new FakerApiPage();
