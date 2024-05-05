const { Given, When, Then } = require('@cucumber/cucumber');

When('I enter email {string}', async function (email) {
    let element = await this.driver.$('input[name=identification');
    return await element.setValue(email);
});

When('I enter password {string}', async function (password) {
    let element = await this.driver.$('input[name=password]');
    return await element.setValue(password);
});

When('I click next', async function() {
    let element = await this.driver.$('button[type=submit]');
    return await element.click();
})

When('I click tag', async function(){
    let element = await this.driver.$('section > div > ul:nth-child(2) > li:nth-child(3)')
    return await element.click();
})

When('I click new tag', async function(){
    let element = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary')
    return await element.click()
})

When('I enter tag name {string}', async function(tagName){
    let element = await this.driver.$('input#tag-name.gh-input')
    return await element.setValue(tagName)
})

When('I enter tag description {string}', async function(tagdescription){
    let element = await this.driver.$('textarea#tag-description.gh-input.gh-tag-details-textarea')
    return await element.setValue(tagdescription)
})

When('I click tag save', async function(){
    let element = await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view')
    return await element.click()
})

Then('I click post plus', async function(){
    let element = await this.driver.$('a.ember-view.gh-secondary-action.gh-nav-new-post')
    return await element.click()
})
 
Then ('I enter post title {string}', async function(posttitle){
    let element = await this.driver.$('textarea.gh-editor-title.ember-text-area.gh-input.ember-view')
    return await element.setValue(posttitle)
})

Then ('I enter post textarea {string}', async function(posttextarea){
    let element = await this.driver.$('div.koenig-editor__editor.__mobiledoc-editor.__has-no-content')
    return await element.setValue(posttextarea)
})

Then('I click post settings', async function(){
    let element = await this.driver.$('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon')
    return await element.click()
})

Then ('I click tag box', async function(){
    let element = await this.driver.$('form > div:nth-child(3) > div > div:nth-child(1)')
    return await element.click();
})
    
    Then ('I enter tag value {string}', async function(tagvalue){
    let element = await this.driver.$('form > div:nth-child(3) > div > div:nth-child(1)')
    return await element.setValue(tagvalue)
})
    
    Then ('I click tag selected', async function(){
    let option = await this.driver.$('ul.ember-power-select-options:first-child')
    return await option.click()
})
    
    Then ('I click publish button', async function(){
        let element = await this.driver.$('button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger')
        return await element.click()
})
    
    Then ('I click continue publishing button', async function(){
        let element = await this.driver.$('button.gh-btn.gh-btn-black.gh-btn-large')
        return await element.click()
})
    
    Then ('I click publish right now button', async function(){
        let element = await this.driver.$('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view')
        return await element.click()
})
    
    Then ('I click back to editor button', async function(){
        let element = await this.driver.$('button.gh-back-to-editor')
        return await element.click()
})
    
    Then ('I click post button to return to dashboard', async function(){
    let element = await this.driver.$('a.ember-view.gh-btn-editor.gh-editor-back-button')
    return await element.click()
})   

Then('I click all tags select', async function(){
    let element = await this.driver.$('section.view-actions > div > div:nth-child(4) > div:nth-child(1)')
    return await element.click()

})

Then('I click to select the tag', async function(){
    // Encontrar el elemento de la lista desplegable
    let dropdownList = await this.driver.$('body > div:nth-child(1) > div > ul.ember-power-select-options');
    
    // Obtener todos los elementos de la lista desplegable
    let dropdownOptions = await dropdownList.$$('li');

    // Iterar sobre los elementos para encontrar el que contiene el texto "Luna llena"
    for (let option of dropdownOptions) {
        let text = await option.getText();
        if (text.includes('Luna llena2345')) {
            await option.click();
            break; // Salir del bucle una vez que se hace clic en el elemento deseado
        }
    }
})

Then('I find the element inside the post', async function(){
    // Encontrar el elemento de la lista desplegable
    let dropdownList = await this.driver.$('body > div:nth-child(1) > div > ul.ember-power-select-options');
    
    // Obtener todos los elementos de la lista desplegable
    let dropdownOptions = await dropdownList.$$('li');

    // Bandera para indicar si se encontró el elemento deseado
    let elementoEncontrado = false;

    // Iterar sobre los elementos para encontrar el que contiene el texto "Luna llena"
    for (let option of dropdownOptions) {
        let text = await option.getText();
        if (text.includes('Luna llena2345')) {
            elementoEncontrado = true;
            return elementoEncontrado
            break; // Salir del bucle una vez que se encuentra el elemento deseado
        }
    }

})