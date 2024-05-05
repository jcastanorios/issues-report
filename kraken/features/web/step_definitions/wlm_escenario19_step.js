const { Given, When, Then } = require('@cucumber/cucumber');
When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('input[name=identification]');
    return await element.setValue(email);
});
When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('input[name=password]'); 
    return await element.setValue(password);
});

When('I click login', async function() {
    let element = await this.driver.$('button[type=submit]');
    return await element.click();
});

When('I click lista page', async function() {
    let element = await this.driver.$('a[href="#/pages/"]');
    return await element.click();
});

Then('I click new page', async function () {
    let element = await this.driver.$('a[href="#/editor/page/"]');
    return await element.click();
});
Then('I enter page titulo {kraken-string}', async function (posTitulo) {
    let element = await this.driver.$('textarea.gh-editor-title');
    return await element.setValue(posTitulo);
});

Then('I click lateral', async function () {
    let element = await this.driver.$('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon');
    return await element.click();
});

Then('I click page para cerrar', async function () {
    let element = await this.driver.$('a.ember-view.gh-btn-editor.gh-editor-back-button');
    return await element.click();
});

Then('I tester new page {kraken-string}', async function (expectedText) {
    const assert = require('assert');
    let bodyText = await this.driver.$('body').getText();
    assert(bodyText.includes(expectedText), `Expected text "${expectedText}" not found in page`);
});

