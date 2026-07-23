import { WEBDRIVER_UNI_URLS } from '../../support/constants';
import CrossOriginPage from '../pages/CrossOriginPage';

describe('Cross-Origin Multi-Domain E2E Automation Tests [@cross-origin, @regression]', () => {
  const primaryDomain = WEBDRIVER_UNI_URLS.contactUs;
  const secondaryDomain = 'https://example.com';

  it('should navigate to primary domain and execute assertions in cross-origin domain via cy.origin() [@cross-origin, @smoke]', () => {
    CrossOriginPage.visitPrimaryOrigin(primaryDomain);
    cy.url().should('include', 'webdriveruniversity.com');
    CrossOriginPage.executeInSecondaryOrigin(secondaryDomain, {
      expectedTitle: 'Example Domain',
      testUser: 'qa_automation_user',
    });
  });

  it('should complete multi-domain cross-origin workflow and return to primary origin [@cross-origin, @regression]', () => {
    // Execute 3-phase multi-domain origin workflow
    CrossOriginPage.executeMultiDomainWorkflow(primaryDomain, secondaryDomain, {
      authCode: 'AUTH_TOKEN_778899',
    });
  });

  it('should verify isolated localStorage and cookies across origin boundaries [@cross-origin, @sanity]', () => {
    // Visit primary domain and set cookie
    CrossOriginPage.visitPrimaryOrigin(primaryDomain);
    cy.setCookie('primary_domain_cookie', 'val_primary');

    // Cross origin to secondary domain and verify origin isolation
    cy.origin(secondaryDomain, () => {
      cy.visit('/');
      cy.getCookie('primary_domain_cookie').should('be.null');
    });
  });
});
