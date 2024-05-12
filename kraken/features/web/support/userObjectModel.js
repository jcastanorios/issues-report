const TakeScreenshotTest = require('../support/screenshot.js'); // Importar la clase por defecto
class UserObjectModel{
    constructor(driver) {
        this.driver = driver;
        this.takeScreenshotTest = new TakeScreenshotTest(this.driver);        
    }
    async settingUser(nombreEscenario){
        await this.driver.$('a[href="#/settings/"').click();
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'settingUser1');
        await this.driver.$('a[href="#/settings/"]').click(); //Clic en la herramienta
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'settingUser2');
        await this.driver.$('a[href="#/settings/staff/"]').click(); //Clic en Staff
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'settingUser3');        
        await this.driver.$('a[href="#/settings/staff/wilder/"]').click(); //Clic en Wilder
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'settingUser4');
    }
    async enterChangeUserName(userName, nombreEscenario){
        let element = await this.driver.$('#user-name');
        await element.setValue(userName); //Cambiar el nombre
        await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click(); //Click en save
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'enterUserName');
    }

    async verifyChangeUserName(expectedText, nombreEscenario){
        const assert = require('assert');
        let bodyText = await this.driver.$('body').getText();
        assert(bodyText.includes(expectedText), `Expected text "${expectedText}" not found in page`);
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'veryfyChangeUserName');
    }
}
module.exports = UserObjectModel;