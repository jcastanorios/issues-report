const { Given, When, Then } = require('@cucumber/cucumber');

Then('I click page para cerrar', async function () {
    let element = await this.driver.$('a.ember-view.gh-btn-editor.gh-editor-back-button');
    return await element.click();
});