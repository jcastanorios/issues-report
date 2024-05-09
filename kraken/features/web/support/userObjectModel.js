class UserObjectModel{
    constructor(driver) {
        this.driver = driver;
    }
    async settingUser(){
        await this.driver.$('a[href="#/settings/"').click();
        await this.driver.$('a[href="#/settings/"]').click(); //Clic en la herramienta
        await this.driver.$('a[href="#/settings/staff/"]').click(); //Clic en Staff
        await this.driver.$('a[href="#/settings/staff/wilder/"]').click(); //Clic en Wilder
    }
    async enterChangeUserName(userName){
        let element = await this.driver.$('#user-name');
        await element.setValue(userName); //Cambiar el nombre
        await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click(); //Click en save
    }

    async verifyChangeUserName(expectedText){
        const assert = require('assert');
        let bodyText = await this.driver.$('body').getText();
        assert(bodyText.includes(expectedText), `Expected text "${expectedText}" not found in page`);
    }
}
module.exports = UserObjectModel;