import BasePage from './BasePage';

export interface BrowserStackExecutorPayload {
  action: string;
  arguments: Record<string, any>;
}

class BrowserStackPage extends BasePage {
  /**
   * Annotates current execution session status on BrowserStack Cloud Automate dashboard.
   * 
   * @param status 'passed' or 'failed'
   * @param reason Description message explaining status outcome
   */
  setSessionStatus(status: 'passed' | 'failed', reason: string) {
    cy.window().then((win: any) => {
      const payload: BrowserStackExecutorPayload = {
        action: 'setSessionStatus',
        arguments: { status, reason },
      };
      if (win.browserstack_executor) {
        win.browserstack_executor(payload);
      } else {
        cy.log(`[BrowserStack Reporter] Session Status: ${status.toUpperCase()} | Reason: ${reason}`);
      }
    });
  }

  /**
   * Annotates step log message onto BrowserStack cloud session dashboard timeline.
   * 
   * @param annotation Step annotation message string
   * @param level Log severity level ('info' | 'warn' | 'error')
   */
  annotateSession(annotation: string, level: 'info' | 'warn' | 'error' = 'info') {
    cy.window().then((win: any) => {
      const payload: BrowserStackExecutorPayload = {
        action: 'annotate',
        arguments: { data: annotation, level },
      };
      if (win.browserstack_executor) {
        win.browserstack_executor(payload);
      } else {
        cy.log(`[BrowserStack Annotation] [${level.toUpperCase()}] ${annotation}`);
      }
    });
  }

  /**
   * Validates active browser user agent and cloud execution window metadata.
   */
  verifyBrowserStackExecutionEnv() {
    cy.window().then((win) => {
      expect(win.navigator.userAgent).to.not.be.empty;
      cy.log(`[BrowserStack Env Check] User Agent: ${win.navigator.userAgent}`);
    });
  }
}

export default new BrowserStackPage();
