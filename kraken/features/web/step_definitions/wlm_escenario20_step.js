const { Given, When, Then } = require('@cucumber/cucumber');
When('I click lista tag', async function() {
    let element = await this.driver.$('section > div > ul:nth-child(2) > li:nth-child(3)');
    return await element.click();
});
Then('I click new tag', async function () {
    let element = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary');
    return await element.click();
});
Then('I enter tag color {kraken-string}', async function (tagColor) {
    let element = await this.driver.$('input.color-picker');
    return await element.setValue(tagColor);
});
Then('I enter tag descripcion {kraken-string}', async function (tagDescripcion) {
    let element = await this.driver.$('textarea#tag-description.gh-input.gh-tag-details-textarea');
    return await element.setValue(tagDescripcion);
});

Then('I click save', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view');
    return await element.click();
});

Then('I asignar tag post {kraken-string}', async function (tag) {
    let element = await this.driver.$('form > div:nth-child(3) > div > div:nth-child(1)')
    return await element.setValue(tag);
});
