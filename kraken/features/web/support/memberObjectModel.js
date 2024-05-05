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

  async getFirsElementOnList() {
   
  }
}

module.exports = MemberObjectModel;
