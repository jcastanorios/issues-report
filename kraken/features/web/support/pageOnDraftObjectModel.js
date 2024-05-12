const { faker } = require("@faker-js/faker");
const TakeScreenshotTest = require('../support/screenshot.js');

class PageOnDraftObjectModel {
  constructor(driver) {
    this.driver = driver;
    this.takeScreenshotTest = new TakeScreenshotTest(this.driver);
  }

  async getUrlPage(nombreEscenario) {
    await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/pages");
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'page-draft-visit');
  }

  async filterPage() {
    console.log(
      await this.driver
        .$(".gh-contentfilter-sort")
        .$(".gh-contentfilter-menu-trigger")
        .$(".ember-power-select-selected-item")
    );
  }

  async getRecentlyPages(nombreEscenario) {
    await this.driver.url(
      "https://ghost-aaej.onrender.com/ghost/#/pages?order=updated_at%20desc"
    );
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'page-draft-visit-url');
  }

  async getFirstTitlePage(nombreEscenario) {    
    const titleElement = await this.driver.$('.gh-content-entry-title');
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'page-draft-first-title-page');
    return await titleElement.getText();
  }

  async wait(time) {
    await new Promise((resolve) => setTimeout(resolve, time));
  }

  async visit() {
    await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/pages");
  }

  async clickNewPage(nombreEscenario) {
    await this.driver.$('//span[contains(text(), "New page")]').click();
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'page-draft-new-page');
  }

  async enterPageDetails(tituloPage, nombreEscenario) {
    let element1 = await this.driver.$('textarea[placeholder="Page title"]');
    await element1.setValue(tituloPage);
    const contenidoPage = faker.lorem.paragraph(3);
    let element2 = await this.driver.$(
      'div[data-placeholder="Begin writing your page..."]'
    );
    await element2.setValue(contenidoPage);
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'page-draft-page-details');
  }
}

module.exports = PageOnDraftObjectModel;
