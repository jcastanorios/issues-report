const { Given, When, Then } = require('@cucumber/cucumber');

When('I click lista post', async function() {
    let element = await this.driver.$('section > div > ul:nth-child(2) > li:nth-child(1)');
    return await element.click();
});

Then('I click post para cerrar', async function () {
    let element = await this.driver.$('a.ember-view.gh-btn-editor.gh-editor-back-button');
    return await element.click();
});
When('I click lista post borrador', async function() {
    let element = await this.driver.$('a[href="#/posts/?type=draft"]');
    return await element.click();
});
