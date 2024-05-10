const { Given, When, Then } = require('@cucumber/cucumber');
When('I enter email1 {kraken-string}', async function (email) {
    let element = await this.driver.$('input[name=identification]');
    return await element.setValue(email);
});
When('I enter password1 {kraken-string}', async function (password) {
    let element = await this.driver.$('input[name=password]'); 
    return await element.setValue(password);
});

When('I click login', async function() {
    let element = await this.driver.$('button[type=submit]');
    return await element.click();
});

When('I click post', async function() {
    let element = await this.driver.$('a[href="#/posts/"]');
    return await element.click();
});
When('I Clic en la herramienta', async function() {
    let element = await this.driver.$('a[href="#/settings/"]');
    return await element.click();
});
When('I clic en configuracion', async function() {
    let element = await this.driver.$('a[href="#/settings/"');
    return await element.click();
});
When('I clic en configuracion staff', async function() {
    let element = await this.driver.$('a[href="#/settings/staff/"');
    return await element.click();
});
When('I clic en configuracion staff wilder', async function() {
    let element = await this.driver.$('a[href="#/settings/staff/wilder/"]');
    return await element.click();
});

Then('I click new post', async function () {
    let element = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary');//a.ember-view.gh-btn.gh-btn-primary
    return await element.click();
});

Then('I click lateral', async function () {
    let element = await this.driver.$('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon');
    return await element.click();
});
Then('I enter post titulo {kraken-string}', async function (posTitulo) {
    let element = await this.driver.$('textarea.gh-editor-title'); //textarea.gh-editor-title
    return await element.setValue(posTitulo);
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
Then('I enter user name {kraken-string}', async function (username) {
    let element = await this.driver.$('#user-name');
    return await element.setValue(username);
});
//cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click(); //Click en save
Then('I click en save', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view');
    return await element.click();
});
Then('I tester change name {kraken-string}', async function (expectedText) {
    const assert = require('assert');
    let bodyText = await this.driver.$('body').getText();
    assert(bodyText.includes(expectedText), `Expected text "${expectedText}" not found in page`);
});

Then('I verificar cambio de nombre de usuario en listado de post {kraken-string}', async function(expectedText) {
    const assert = require('assert');
    let bodyText = await this.driver.$('span.midgrey-l2').getText();
    assert(bodyText.includes(expectedText), `Expected text "${expectedText}" not found in page`);
    //const bodyText = await element(by.css("span.midgrey-l2")).first().getText();
        
    // Verificar que el texto esperado está presente en la página
    //expect(bodyText.includes(expectedText)).toBe(true);    
});