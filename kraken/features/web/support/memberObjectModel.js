
const TakeScreenshotTest = require('../support/screenshot.js');

class MemberObjectModel {
  constructor(driver) {
    this.driver = driver;
    this.takeScreenshotTest = new TakeScreenshotTest(this.driver);
  }

  async getMembersPage(nombreEscenario) {
    await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/members");
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'get-members-page');
  }
  async clickOnMembers(nombreEscenario) {
    await this.driver.$('//span[contains(text(), "New member")]').click();
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'clic-on-members-page');

  }

  async setNameMember(nombre, nombreEscenario) {
    await this.driver.$('input[id="member-name"]').setValue(nombre);
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'input-set-name-member');
  }

  async setEmailMember(email, nombreEscenario) {
    await this.driver.$('input[id="member-email"]').setValue(email);
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'input-set-email-member');
  }

  async saveMember(nombreEscenario) {
    await this.driver.$('//span[contains(text(), "Save")]').click();
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'clic-save-member');
  }
  async validateMemberCreation(nombreEscenario) {
    const spanElement = await this.driver.$("span.gh-nav-member-count");
    const texto = await spanElement.getText();
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'validate-member-creation');
    return texto;
  }

  async getIdFromMemberCreate(nombreEscenario) {
    await this.driver.waitUntil(
      async () => {
        const divElement = await this.driver.$(".gh-list-scrolling");
        return await divElement.isDisplayed();
      },
      { timeout: 1000 }
    );

    const tableElement = await this.driver.$(".gh-list-scrolling .gh-list");
    const firstLink = await tableElement.$("a");
    const href = await firstLink.getAttribute("href");
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'get-id-from-member-create');
    return href;
  }

  async getMemberPageById(url, nombreEscenario) {
    const regex = /\/members\/(.*)\//;
    const match = url.match(regex);
    const memberId = match ? match[1] : null;
    this.driver.url(
      "https://ghost-aaej.onrender.com/ghost/#/members/" + memberId
    );
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'get-member-by-id');
  }

  async getActions(nombreEscenario) {
    const svgElement = await this.driver
      .$(".gh-btn")
      .$('svg[viewBox="0 0 24 24"]');
    svgElement.click();
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'get-actions');
  }

  async getDeleteMember(nombreEscenario) {
    const span = await this.driver
      .$(".dropdown")
      .$(".mr2")
      .$('//span[contains(text(), "Delete member")]');
    span.click();
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'get-delete-member');
  }

  async confirmDeleteMember(nombreEscenario) {
    const span = this.driver.$(".gh-btn-red").click();
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'confirm-delete-member');
  }
}

module.exports = MemberObjectModel;
