import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import { FakerUtils } from '../../support/utils/FakerUtils';
import FakerApiPage from '../pages/FakerApiPage';

describe('Dynamic Faker Test Data Generation & API Interception Suite [@faker-api, @regression]', () => {
  beforeEach(() => {
    FakerApiPage.loadDynamicFormPortal(WEBDRIVER_UNI_URLS.alertPage);
  });

  it('should generate dynamic user profile with Faker and populate form fields [@faker-api, @smoke]', () => {
    // Generate dynamic user profile via FakerUtils
    const userProfile = FakerUtils.generateUserProfile();

    // Verify dynamic payload properties
    expect(userProfile.firstName).to.not.be.empty;
    expect(userProfile.email).to.include('@');

    // Populate form with dynamically generated profile
    cy.getByTestId('first-name').type(userProfile.firstName);
    cy.getByTestId('last-name').type(userProfile.lastName);
    cy.getByTestId('email').type(userProfile.email);
    cy.getByTestId('job-title').type(userProfile.jobTitle);
    cy.getByTestId('company').type(userProfile.company);

    // Submit form and assert outcome
    cy.getByTestId('submit-btn').click();
    cy.assertElementText('[data-testid="status-msg"]', 'USER_REGISTERED_SUCCESSFULLY');
  });

  it('should intercept GET API requests and return dynamic Faker user list [@faker-api, @regression]', () => {
    // Generate 5 dynamic user profiles
    const mockUsers = FakerUtils.generateUsersList(5);

    // Set up intercept route
    FakerApiPage.interceptUsersApi(mockUsers);

    // Trigger intercepted network request in browser context
    cy.window().then((win) => {
      return win.fetch('/api/v1/users').then((res) => res.json());
    }).then((response: any) => {
      expect(response.success).to.be.true;
      expect(response.total).to.eq(5);
      expect(response.data[0].email).to.include('@');
    });

    // Wait on intercepted alias for assertion
    cy.wait('@getDynamicUsers').its('response.statusCode').should('eq', 200);
  });

  it('should intercept POST order API requests with dynamic Faker ecommerce payload [@faker-api, @sanity]', () => {
    // Generate dynamic order payload
    const mockOrder = FakerUtils.generateOrderPayload();

    // Set up order intercept route
    FakerApiPage.interceptCreateOrderApi(mockOrder);

    // Trigger intercepted POST order network request in browser context
    cy.window().then((win) => {
      return win.fetch('/api/v1/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: mockOrder.product, amount: mockOrder.amount }),
      }).then((res) => res.json());
    }).then((response: any) => {
      expect(response.order.orderId).to.include('ORD-');
      expect(response.order.amount).to.be.a('number');
    });

    // Wait on intercepted alias for assertion
    cy.wait('@postDynamicOrder').its('response.statusCode').should('eq', 201);
  });
});
