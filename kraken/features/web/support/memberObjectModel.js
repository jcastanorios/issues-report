class MemberObjectModel {
  constructor(driver) {
    this.driver = driver;
  }

  async getMembersPage() {
    await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/members");
  }
  async clickOnMembers() {
    await this.driver.$('//span[contains(text(), "New member")]').click();
  }

  async setNameMember(nombre) {
    await this.driver.$('input[id="member-name"]').setValue(nombre);
  }

  async setEmailMember(email) {
    await this.driver.$('input[id="member-email"]').setValue(email);
  }

  async saveMember() {
    await this.driver.$('//span[contains(text(), "Save")]').click();
  }
  async validateMemberCreation() {
    const spanElement = await this.driver.$("span.gh-nav-member-count");
    const texto = await spanElement.getText();
    return texto;
  }

  async getIdFromMemberCreate() {
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
    return href;
  }

  async getMemberPageById(url) {
    const regex = /\/members\/(.*)\//;
    const match = url.match(regex);
    const memberId = match ? match[1] : null;
    this.driver.url(
      "https://ghost-aaej.onrender.com/ghost/#/members/" + memberId
    );
  }

  async getActions() {
    const svgElement = await this.driver
      .$(".gh-btn")
      .$('svg[viewBox="0 0 24 24"]');
    svgElement.click();
  }

  async getDeleteMember() {
    const span = await this.driver
      .$(".dropdown")
      .$(".mr2")
      .$('//span[contains(text(), "Delete member")]');
    span.click();
  }

  async confirmDeleteMember() {
    const span = this.driver.$(".gh-btn-red").click();
  }
}

module.exports = MemberObjectModel;
