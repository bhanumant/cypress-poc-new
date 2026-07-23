import { FLIPKART_DATA } from '../../support/constants';
import FlipkartPage from '../pages/FlipkartPage';

describe('Flipkart Real Web Application Dynamic Mobile Search Suite [@flipkart, @search, @smoke]', () => {
  beforeEach(() => {
    FlipkartPage.openFlipkartSite();
  });

  it('should navigate to real Flipkart site and search for mobile phones [@flipkart, @smoke]', () => {
    FlipkartPage.searchProductOnRealSite(FLIPKART_DATA.searchQueries.mobile);
    cy.url().should('include', FLIPKART_DATA.urlQueryParams.mobile);
    cy.get('body').should('exist');
  });

  it('should search for specific smartphone model on real Flipkart site [@flipkart, @regression]', () => {
    FlipkartPage.searchProductOnRealSite(FLIPKART_DATA.searchQueries.iphone);
    cy.url().should('include', FLIPKART_DATA.urlQueryParams.iphone);
    cy.get('body').should('exist');
  });

  it('should search for Samsung mobile and verify page rendering [@flipkart, @sanity]', () => {
    FlipkartPage.searchProductOnRealSite(FLIPKART_DATA.searchQueries.samsung);
    cy.url().should('include', FLIPKART_DATA.urlQueryParams.samsung);
    cy.get('body').should('exist');
  });
});
