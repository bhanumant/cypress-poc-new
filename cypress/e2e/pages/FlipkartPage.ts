import BasePage from './BasePage';

class FlipkartPage extends BasePage {
  readonly realUrl = 'https://www.flipkart.com';
  readonly searchInput = 'input[name="q"]';
  readonly searchSubmitBtn = 'button[type="submit"]';

  /**
   * Opens the real Flipkart web application site.
   */
  openFlipkartSite() {
    cy.visit(this.realUrl, {
      failOnStatusCode: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });
    this.closeLoginModalIfPresent();
  }

  /**
   * Closes the initial login popup modal if displayed on Flipkart landing page.
   */
  closeLoginModalIfPresent() {
    cy.get('body').then(($body) => {
      if ($body.find('button._2KpZ6l._2doB4z').length > 0) {
        cy.get('button._2KpZ6l._2doB4z').click();
      } else if ($body.find('span._3058_').length > 0) {
        cy.get('span._3058_').click();
      } else if ($body.find('._2Qf202').length > 0) {
        cy.get('._2Qf202').click();
      }
    });
  }

  /**
   * Searches for a product on real Flipkart site using the search input box or URL fallback.
   * 
   * @param query Search keyword (e.g. "mobile", "iPhone 15", "Samsung Galaxy")
   */
  searchProductOnRealSite(query: string) {
    cy.get('body').then(($body) => {
      if ($body.find('input[name="q"]').length > 0) {
        cy.get('input[name="q"]').first().clear().type(`${query}{enter}`);
      } else {
        cy.visit(`https://www.flipkart.com/search?q=${encodeURIComponent(query)}`, {
          failOnStatusCode: false,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          },
        });
      }
    });
  }

  /**
   * Selects a brand filter checkbox on search results sidebar if available.
   * 
   * @param brandName Brand filter string
   */
  applyBrandFilterOnRealSite(brandName: string) {
    cy.get('body').then(($body) => {
      if ($body.find(`div[title="${brandName}"]`).length > 0) {
        cy.get(`div[title="${brandName}"]`).click();
      } else if ($body.find(`label:contains("${brandName}")`).length > 0) {
        cy.contains('label', brandName).click();
      }
    });
  }
}

export default new FlipkartPage();
