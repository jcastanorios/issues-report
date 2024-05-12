const TakeScreenshotTest = require('../support/screenshot.js');

class LoginGhost {
  constructor(driver) {
    this.driver = driver;
    this.takeScreenshotTest = new TakeScreenshotTest(this.driver);
  }

  async visit(nombreEscenario) {
    await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/signin");
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'login-visit');
  }

  async enterEmail(email, nombreEscenario) {
    let element = await this.driver.$("#ember6");
    await element.setValue(email);
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'login-diligencia-email');
  }

  async enterPassword(password, nombreEscenario) {
    let element = await this.driver.$("#ember8");
    await element.setValue(password);
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'login-diligencia-password');
  }

  async clickSignIn(nombreEscenario) {
    let element = await this.driver.$("#ember10");
    await element.click();
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'login-clic-sign-in');
  }

  async errorLogin(nombreEscenario) {
    let element = await this.driver.$("#ember10");
    let buttonText = await element.getText();
    await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'login-error-sign-in');
    return buttonText;
  }
}

module.exports = LoginGhost;
