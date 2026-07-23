import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import ApiPage from '../pages/ApiPage';

describe('Network Traffic Interception & Mocking Suite [@intercept, @regression]', () => {
  beforeEach(() => {
    ApiPage.open(WEBDRIVER_UNI_URLS.contactUs);
  });

  it('should intercept GET API call and stub response using mock fixture data [@intercept, @smoke]', () => {
    ApiPage.stubUsersListApi('getMockUsers', 'mockApiData.json');
    cy.window().then((win) => {
      return win.fetch('/api/v1/users').then((res) => res.json());
    }).then((response: any) => {
      expect(response).to.be.an('array');
      expect(response.length).to.eq(2);
      expect(response[0].name).to.eq('Jane Doe');
      expect(response[0].email).to.eq('jane.doe@enterprise-qa.com');
      expect(response[1].name).to.eq('John Smith');
    });
    cy.wait('@getMockUsers').its('response.statusCode').should('eq', 200);
  });

  it('should intercept outgoing request and inject authorization header [@intercept, @regression]', () => {
    const customAuthToken = 'Bearer enterprise_jwt_token_9988';

    // Intercept and modify outgoing request headers
    cy.intercept('GET', '**/api/v1/secure-data*', (req) => {
      req.headers['authorization'] = customAuthToken;
      req.reply({
        statusCode: 200,
        body: { authenticated: true, userRole: 'Admin' },
      });
    }).as('secureRequest');

    // Trigger request in browser context
    cy.window().then((win) => {
      return win.fetch('/api/v1/secure-data').then((res) => res.json());
    }).then((body: any) => {
      expect(body.authenticated).to.be.true;
    });

    // Verify injected request header via intercept alias
    cy.wait('@secureRequest').then((interception) => {
      expect(interception.request.headers['authorization']).to.eq(customAuthToken);
    });
  });

  it('should simulate network response latency throttling (delay: 1000ms) [@intercept, @regression]', () => {
    // Set up throttled route with delay
    ApiPage.stubThrottledApi('getThrottledUsers', 1000);

    const startTime = Date.now();
    cy.window().then((win) => {
      return win.fetch('/api/v1/throttled').then((res) => res.json());
    }).then((body: any) => {
      const elapsedMs = Date.now() - startTime;
      expect(elapsedMs).to.be.at.least(900);
      expect(body.status).to.eq('SLOW_NETWORK_RESPONSE_COMPLETED');
    });

    cy.wait('@getThrottledUsers');
  });

  it('should simulate 500 Internal Server Error and verify failure handling [@intercept, @sanity]', () => {
    // Stub 500 error route
    ApiPage.stubServerErrorApi('getServerError');

    cy.window().then((win) => {
      return win.fetch('/api/v1/error');
    }).then((response: Response) => {
      expect(response.status).to.eq(500);
    });

    cy.wait('@getServerError').its('response.statusCode').should('eq', 500);
  });

  it('should spy on live network requests without modifying response payload [@intercept, @smoke]', () => {
    // Spy on XHR/fetch calls without stubbing body
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/*').as('spyGetPost');

    cy.window().then((win) => {
      return win.fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) => res.json());
    }).then((post: any) => {
      expect(post.id).to.eq(1);
    });

    // Assert request was spied on
    cy.wait('@spyGetPost').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.request.url).to.include('/posts/1');
    });
  });
});
