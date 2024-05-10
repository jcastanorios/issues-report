
Cypress.Screenshot.defaults({
  capture: 'viewport',
  disableTimersAndAnimations: false
})

const ScreenshotPage = {

  takeScreenshot(folderName, fileName) {
    const screenshotPath = `${folderName}/${fileName}`;
    cy.screenshot(screenshotPath, { overwrite: true });
  }
  };
  
  export default ScreenshotPage;