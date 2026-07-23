import BasePage from './BasePage';

class CrossOriginPage extends BasePage {
  /**
   * Navigates to a primary domain origin.
   * 
   * @param primaryUrl Primary domain URL
   */
  visitPrimaryOrigin(primaryUrl: string) {
    this.open(primaryUrl);
  }

  /**
   * Performs actions and assertions within a secondary cross-origin domain using cy.origin.
   * 
   * @param secondaryOrigin Domain origin string (e.g. 'https://example.com')
   * @param options Object containing contextual arguments to pass into secondary origin scope
   */
  executeInSecondaryOrigin(secondaryOrigin: string, argsData: { expectedTitle: string; testUser: string }) {
    cy.origin(secondaryOrigin, { args: argsData }, ({ expectedTitle, testUser }) => {
      // Navigate to external domain path if needed
      cy.visit('/');
      
      // Perform DOM assertions in secondary origin
      cy.get('h1').should('be.visible');
      cy.get('h1').invoke('text').should('not.be.empty');
      
      // Verify passed argument parameters inside isolated origin context
      expect(testUser).to.eq('qa_automation_user');
      expect(expectedTitle).to.include('Example');
    });
  }

  /**
   * Performs multi-domain workflow: start at primary domain, cross origin to secondary domain, submit data, then return to primary domain.
   * 
   * @param primaryDomain Primary URL
   * @param secondaryDomain Secondary origin URL
   * @param payload Context payload passed across origin boundary
   */
  executeMultiDomainWorkflow(primaryDomain: string, secondaryDomain: string, payload: { authCode: string }) {
    // Phase 1: Primary domain setup
    this.open(primaryDomain);
    cy.url().should('include', 'webdriveruniversity.com');

    // Phase 2: Cross to secondary domain
    cy.origin(secondaryDomain, { args: payload }, ({ authCode }) => {
      cy.visit('/');
      cy.get('body').should('exist');
      expect(authCode).to.eq('AUTH_TOKEN_778899');
    });

    // Phase 3: Seamless return to primary origin
    this.open(primaryDomain);
    cy.url().should('include', 'webdriveruniversity.com');
  }
}

export default new CrossOriginPage();
