const { Given, When, Then } = require('@cucumber/cucumber');
When('I click lista page', async function() {
    let element = await this.driver.$('a[href="#/pages/"]');
    return await element.click();
});

When('I Click en la herramienta', async function() {
    let element = await this.driver.$('a[href="#/settings/"]');
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
Then('I tester new page {kraken-string}', async function (expectedText) {
    const assert = require('assert');
    let bodyText = await this.driver.$('body').getText();
    assert(bodyText.includes(expectedText), `Expected text "${expectedText}" not found in page`);
});

Then('I verificar cambio de nombre de usuario en listado de page {kraken-string}', async function(expectedText) {
    const assert = require('assert');
    let bodyText = await this.driver.$('span.midgrey-l2').getText();
    assert(bodyText.includes(expectedText), `Expected text "${expectedText}" not found in page`);
});

