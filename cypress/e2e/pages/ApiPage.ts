import BasePage from './BasePage';

export interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

class ApiPage extends BasePage {
  readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  /**
   * Sends a GET HTTP request via cy.request.
   * 
   * @param endpoint Target API path
   * @returns Cypress Chainable Response
   */
  getPosts(endpoint: string = '/posts'): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}${endpoint}`,
      headers: {
        'Accept': 'application/json',
      },
    });
  }

  /**
   * Sends a POST HTTP request via cy.request.
   * 
   * @param payload Request body
   * @returns Cypress Chainable Response
   */
  createPost(payload: PostPayload): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/posts`,
      body: payload,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  }

  /**
   * Sends a PUT HTTP request to update a resource via cy.request.
   * 
   * @param postId Target post ID
   * @param payload Updated payload
   * @returns Cypress Chainable Response
   */
  updatePost(postId: number, payload: Partial<PostPayload>): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl}/posts/${postId}`,
      body: payload,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  }

  /**
   * Sends a DELETE HTTP request via cy.request.
   * 
   * @param postId Target post ID
   * @returns Cypress Chainable Response
   */
  deletePost(postId: number): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}/posts/${postId}`,
    });
  }

  /**
   * Sets up cy.intercept for GET /api/users with a mock fixture response.
   * 
   * @param alias Route alias string
   * @param fixturePath Fixture file path
   */
  stubUsersListApi(alias: string = 'getMockUsers', fixturePath: string = 'mockApiData.json') {
    cy.fixture(fixturePath).then((data) => {
      cy.intercept('GET', '**/api/v1/users*', {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: data.mockUsers,
      }).as(alias);
    });
  }

  /**
   * Sets up cy.intercept with simulated network response delay.
   * 
   * @param alias Route alias string
   * @param delayMs Delay duration in milliseconds
   */
  stubThrottledApi(alias: string = 'getThrottledUsers', delayMs: number = 1000) {
    cy.intercept('GET', '**/api/v1/throttled*', {
      statusCode: 200,
      delay: delayMs,
      body: { status: 'SLOW_NETWORK_RESPONSE_COMPLETED' },
    }).as(alias);
  }

  /**
   * Sets up cy.intercept to simulate a 500 Internal Server Error.
   * 
   * @param alias Route alias string
   */
  stubServerErrorApi(alias: string = 'getServerError') {
    cy.intercept('GET', '**/api/v1/error*', {
      statusCode: 500,
      body: { error: 'Internal Server Error', message: 'Database connection failed' },
    }).as(alias);
  }
}

export default new ApiPage();
