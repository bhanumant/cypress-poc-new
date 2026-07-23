import ApiPage from '../pages/ApiPage';

describe('Direct Backend HTTP API Testing Suite [@api, @smoke, @regression]', () => {
  it('should execute GET request and validate response status, headers, and body array [@api, @smoke]', () => {
    ApiPage.getPosts().then((response) => {
      // Assert HTTP status 200
      expect(response.status).to.eq(200);

      // Assert content-type header
      expect(response.headers['content-type']).to.include('application/json');

      // Assert response performance SLA (under 2500ms)
      expect(response.duration).to.be.lessThan(2500);

      // Assert response body schema & structure
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.at.least(10);
      expect(response.body[0]).to.have.all.keys('userId', 'id', 'title', 'body');
    });
  });

  it('should execute POST request to create a new resource with payload validation [@api, @smoke]', () => {
    const newPost = {
      title: 'Automated Cypress E2E API Verification',
      body: 'Testing direct HTTP backend endpoints with structured JSON assertions.',
      userId: 42,
    };

    ApiPage.createPost(newPost).then((response) => {
      // Assert HTTP status 201 Created
      expect(response.status).to.eq(201);

      // Assert auto-generated resource ID and mirrored attributes
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq(newPost.title);
      expect(response.body.body).to.eq(newPost.body);
      expect(response.body.userId).to.eq(newPost.userId);
    });
  });

  it('should execute PUT request to update an existing resource [@api, @regression]', () => {
    const updatedPost = {
      title: 'Updated Title via Cypress API Test',
      body: 'Modifying resource content using PUT HTTP method.',
      userId: 1,
    };

    ApiPage.updatePost(1, updatedPost).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq(updatedPost.title);
      expect(response.body.id).to.eq(1);
    });
  });

  it('should execute DELETE request and confirm deletion status code [@api, @regression]', () => {
    ApiPage.deletePost(1).then((response) => {
      expect(response.status).to.be.oneOf([200, 204]);
    });
  });

  it('should handle non-existent endpoints gracefully with failOnStatusCode option [@api, @sanity]', () => {
    cy.request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/invalid-endpoint-path',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
