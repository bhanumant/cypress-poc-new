import { WEBDRIVER_UNI_URLS, WEBDRIVER_UNI_ASSERTIONS } from '../../support/constants';
import DataTablePage from '../pages/DataTablePage';

describe('WebDriverUniversity Data Table Verification Tests', () => {
  beforeEach(() => {
    // Navigate to the Data Tables page
    DataTablePage.open(WEBDRIVER_UNI_URLS.dataTablePage);
  });

  it('should verify headers of Table 1', () => {
    DataTablePage.getElement(`${DataTablePage.table1} th`).each(($el, index) => {
      cy.wrap($el).should('have.text', WEBDRIVER_UNI_ASSERTIONS.dataTablePage.table1Headers[index]);
    });
  });

  it('should dynamically find a cell by text and verify adjacent cells', () => {
    // Locate 'Jemma' in Table 1, find the next sibling containing her last name, and assert her age is 94
    DataTablePage.getElement(`${DataTablePage.table1} td`)
      .contains('Jemma')
      .parent()
      .within(() => {
        cy.get('td').eq(1).should('have.text', 'Jackson');
        cy.get('td').eq(2).should('have.text', WEBDRIVER_UNI_ASSERTIONS.dataTablePage.jemmaAge);
      });

    // Locate 'Sarah' in Table 2, and verify her age is 56
    DataTablePage.getElement(`${DataTablePage.table2} td`)
      .contains('Sarah')
      .parent()
      .within(() => {
        cy.get('td').eq(1).should('have.text', 'Jackson');
        cy.get('td').eq(2).should('have.text', WEBDRIVER_UNI_ASSERTIONS.dataTablePage.sarahAge);
      });
  });

  it('should sum all ages in Table 1 and verify against expected total', () => {
    let ageSum = 0;

    DataTablePage.getElement(DataTablePage.table1Ages)
      .each(($el) => {
        const age = Number($el.text());
        ageSum += age;
      })
      .then(() => {
        expect(ageSum).to.equal(WEBDRIVER_UNI_ASSERTIONS.dataTablePage.table1TotalAge);
      });
  });

  it('should verify rows and values in the Traversal Table', () => {
    // Assert traversal table row contents
    DataTablePage.getElement(`${DataTablePage.traversalTable} tbody tr`).should('have.length', 3);
    
    DataTablePage.getElement(`${DataTablePage.traversalTable} tbody tr`)
      .first()
      .within(() => {
        cy.get('td').eq(0).should('have.text', 'Andy');
        cy.get('td').eq(1).should('have.text', 'Otto');
      });
  });
});
