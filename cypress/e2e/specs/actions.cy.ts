import { WEBDRIVER_UNI_URLS, WEBDRIVER_UNI_ASSERTIONS } from '../../support/constants';
import ActionsPage from '../pages/ActionsPage';

describe('WebDriverUniversity Mouse Actions & Drag/Drop Tests', () => {
  beforeEach(() => {
    // Navigate to the Actions page
    ActionsPage.open(WEBDRIVER_UNI_URLS.actionsPage);
  });

  it('should drag and drop the element onto the target box', () => {
    // Drag #draggable to #droppable using custom mouse triggers
    cy.get(ActionsPage.draggableElement).trigger('mousedown', { which: 1 });
    cy.get(ActionsPage.droppableElement)
      .trigger('mousemove')
      .trigger('mouseup', { force: true });

    // Assert that drop was successful
    ActionsPage.getElement(ActionsPage.droppableElement)
      .find('p')
      .should('contain.text', WEBDRIVER_UNI_ASSERTIONS.actionsPage.droppedText);
  });

  it('should perform double click and toggle element classes', () => {
    // Initially should not have the "double" class
    ActionsPage.getElement(ActionsPage.doubleClickElement).should('not.have.class', 'double');

    // Double click the element
    ActionsPage.getElement(ActionsPage.doubleClickElement).dblclick();

    // Verify it now has the "double" class
    ActionsPage.getElement(ActionsPage.doubleClickElement).should('have.class', 'double');
  });

  it('should simulate hover over elements and show hidden menus', () => {
    // Get the dropdown content and assert it's not visible
    ActionsPage.getElement(ActionsPage.hoverFirstBtn)
      .next('.dropdown-content')
      .should('not.be.visible');

    // Show the content via jQuery/CSS override to simulate hover state safely in Cypress
    ActionsPage.getElement(ActionsPage.hoverFirstBtn)
      .next('.dropdown-content')
      .invoke('show');

    // Assert link is visible
    cy.contains('Link 1').should('be.visible');
  });

  it('should perform click and hold action and verify text changes', () => {
    // Perform mousedown (click and hold)
    ActionsPage.getElement(ActionsPage.clickBoxElement)
      .trigger('mousedown', { which: 1 })
      .should('have.text', WEBDRIVER_UNI_ASSERTIONS.actionsPage.clickHoldActiveText);

    // Release mouse click (mouseup)
    ActionsPage.getElement(ActionsPage.clickBoxElement)
      .trigger('mouseup')
      .should('have.text', WEBDRIVER_UNI_ASSERTIONS.actionsPage.clickHoldReleasedText);
  });
});
