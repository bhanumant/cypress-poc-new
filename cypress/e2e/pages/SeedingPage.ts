import BasePage from './BasePage';

export interface SeedStateResult {
  success: boolean;
  seededCount: number;
  entityIds: string[];
  timestamp: string;
}

export interface CleanStateResult {
  success: boolean;
  cleanedCount: number;
  status: string;
}

class SeedingPage extends BasePage {
  /**
   * Invokes Node task to seed test database state before running spec scenarios.
   * 
   * @param env Environment target string
   * @param entityCount Number of test data records to seed
   * @returns Cypress Chainable resolving to SeedStateResult
   */
  seedDatabase(env: string = 'staging', entityCount: number = 3): Cypress.Chainable<SeedStateResult> {
    return cy.task('seedDatabaseState', { env, entityCount }) as Cypress.Chainable<SeedStateResult>;
  }

  /**
   * Invokes Node task to clean up database test state after spec scenarios finish.
   * 
   * @param entityIds Array of seeded entity IDs to delete
   * @returns Cypress Chainable resolving to CleanStateResult
   */
  cleanupDatabase(entityIds: string[]): Cypress.Chainable<CleanStateResult> {
    return cy.task('cleanupDatabaseState', { entityIds }) as Cypress.Chainable<CleanStateResult>;
  }
}

export default new SeedingPage();
