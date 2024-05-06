class LoginGhost {
  constructor(driver) {
    this.driver = driver;
  }

  async visit() {
    await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/signin");
  }

  async enterEmail(email) {
    let element = await this.driver.$("#ember6");
    await element.setValue(email);
  }

  async enterPassword(password) {
    let element = await this.driver.$("#ember8");
    await element.setValue(password);
  }

  async clickSignIn() {
    let element = await this.driver.$("#ember10");
    await element.click();
  }

  async errorLogin() {
    let element = await this.driver.$("#ember10");
    let buttonText = await element.getText();
    return buttonText;
  }
}

module.exports = LoginGhost;
