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

When('I click lista tag', async function() {
    let element = await this.driver.$('section > div > ul:nth-child(2) > li:nth-child(3)');
    return await element.click();
});
When('I click post', async function() {
    let element = await this.driver.$('section > div > ul:nth-child(2) > li:nth-child(1)');
    return await element.click();
});
When('I click new post', async function () {
    let element = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary');
    return await element.click();
});

Then('I click new tag', async function () {
    let element = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary');
    return await element.click();
});
Then('I enter tag titulo {kraken-string}', async function (tagTitulo) {
    let element = await this.driver.$('input#tag-name.gh-input');
    return await element.setValue(tagTitulo);
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

//Creación Post
Then('I enter post titulo {kraken-string}', async function (posTitulo) {
    let element = await this.driver.$('textarea.gh-editor-title'); //textarea.gh-editor-title
    return await element.setValue(posTitulo);
});

Then('I click lateral', async function () {
    let element = await this.driver.$('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon');
    return await element.click();
});

Then('I asignar tag post {kraken-string}', async function (tag) {
    let element = await this.driver.$('form > div:nth-child(3) > div > div:nth-child(1)')
    return await element.setValue(tag);
});


Then('I click publish', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger');
    return await element.click();
});

Then('I click final review', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-black.gh-btn-large');
    return await element.click();
});

Then('I click final publish post, right now', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view');
    return await element.click();
});

Then('I tester new post {kraken-string}', async function (expectedText) {
    const assert = require('assert');
    let bodyText = await this.driver.$('body').getText();
    assert(bodyText.includes(expectedText), `Expected text "${expectedText}" not found in page`);
});