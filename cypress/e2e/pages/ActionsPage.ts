import BasePage from './BasePage';

class ActionsPage extends BasePage {
  readonly draggableElement = '#draggable';
  readonly droppableElement = '#droppable';
  readonly doubleClickElement = '#double-click';
  readonly hoverFirstBtn = 'button:contains("Hover Over Me First!")';
  readonly hoverSecondBtn = 'button:contains("Hover Over Me Second!")';
  readonly hoverThirdBtn = 'button:contains("Hover Over Me Third!")';
  readonly clickBoxElement = '#click-box';
}

export default new ActionsPage();
