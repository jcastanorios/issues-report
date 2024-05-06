const { faker } = require("@faker-js/faker");
class PageOnDraftObjectModel {
  constructor(driver) {
    this.driver = driver;
  }

  async getUrlPage() {
    await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/pages");
  }

  async filterPage() {
    console.log(
      await this.driver
        .$(".gh-contentfilter-sort")
        .$(".gh-contentfilter-menu-trigger")
        .$(".ember-power-select-selected-item")
    );
  }

  async getRecentlyPages() {
    await this.driver.url(
      "https://ghost-aaej.onrender.com/ghost/#/pages?order=updated_at%20desc"
    );
  }

  async getFirstTitlePage() {    
    const titleElement = await this.driver.$('.gh-content-entry-title');
    return await titleElement.getText();
  }

  async wait(time) {
    await new Promise((resolve) => setTimeout(resolve, time));
  }

  async visit() {
    await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/pages");
  }

  async clickNewPage() {
    await this.driver.$('//span[contains(text(), "New page")]').click();
  }
  async enterPageDetails(tituloPage) {
    let element1 = await this.driver.$('textarea[placeholder="Page title"]');
    await element1.setValue(tituloPage);
    const contenidoPage = faker.lorem.paragraph(3);
    let element2 = await this.driver.$(
      'div[data-placeholder="Begin writing your page..."]'
    );
    await element2.setValue(contenidoPage);
  }
}

module.exports = PageOnDraftObjectModel;
