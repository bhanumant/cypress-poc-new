import './commands';
import 'cypress-iframe';
import 'allure-cypress';
import { TagUtils } from './utils/TagUtils';

// Handle uncaught third-party site exceptions without crashing test suites
Cypress.on('uncaught:exception', () => {
  return false;
});

// Global hook for dynamic tag-based selective test execution
beforeEach(function () {
  const envTags = Cypress.env('tags') || Cypress.env('TAGS');
  if (envTags) {
    const fullTestTitle = `${this.currentTest?.parent?.title || ''} ${this.currentTest?.title || ''}`;
    const matches = TagUtils.matchesTag(fullTestTitle, envTags);
    if (!matches) {
      cy.log(`[Tag Filter] Skipping test: "${this.currentTest?.title}" (Does not match requested tags: ${envTags})`);
      this.skip();
    }
  }
});

