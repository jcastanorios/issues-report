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

  async getRecentlyPages(){
    await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/pages?order=updated_at%20desc");
  }

  async wait(time) {
    await new Promise((resolve) => setTimeout(resolve, time));
  }
}

/*
    const svgElement = await this.driver
      .$(".gh-contentfilter-sort")
      .$('svg[viewBox="0 0 26 17"]');
    svgElement.click();
    const content = await this.driver
      .$(".ember-application")
      .$(".gh-contentfilter-menu-dropdown");
    const lista = content.$(".ember-power-select-options");
    console.log(lista.$(":nth-child(3)").getText());
*/
/*
await this.driver.waitUntil(
      async () => {
        const svgElement = await this.driver
          .$(".gh-contentfilter-sort")
          .$('svg[viewBox="0 0 26 17"]');
        svgElement.click();

        await this.driver
          .$(".ember-application")
          .$(".gh-contentfilter-menu-dropdown");

        return await this.driver.$(".ember-power-select-options").isDisplayed();
      },
      { timeout: 9000 }
    );
    await this.driver.$(":nth-child(3)").click();*/

module.exports = PageOnDraftObjectModel;
