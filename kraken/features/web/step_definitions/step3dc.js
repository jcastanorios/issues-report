const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');



Then('I enter tag description 3 {string}', async function(tagdescription){
    let element = await this.driver.$('textarea#tag-description.gh-input.gh-tag-details-textarea')
    return await element.setValue(tagdescription)
})

Then('I click tag save 3', async function(){
    let element = await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view')
    return await element.click()
})

Then('I click to select the tag 3', async function(){
    // Encontrar el elemento de la lista desplegable
    let dropdownList = await this.driver.$('section.gh-canvas > section.view-container.content-list > ol');
    
    // Obtener todos los elementos de la lista desplegable
    let dropdownOptions = await dropdownList.$$('li');

    // Iterar sobre los elementos para encontrar el que contiene el texto "Luna llena"
    for (let option of dropdownOptions) {
        let text = await option.getText();
        if (text.includes('Carroza223')) {
            await option.click();
            break; // Salir del bucle una vez que se encuentra el elemento deseado
        }
    }
})

Then('I click delete tag button', async function(){
    let element = await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon')
    return await element.click();
})

Then('I click confirm delete tag button', async function(){
    let element = await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view')
    return await element.click();
})

Then('I validate tag was deleted', async function(){
    // Encontrar el elemento de la lista desplegable
    let dropdownList = await this.driver.$('section.gh-canvas > section.view-container.content-list > ol');
    
    // Obtener todos los elementos de la lista desplegable
    let dropdownOptions = await dropdownList.$$('li');

    // Iterar sobre los elementos para encontrar el que contiene el texto "Luna llena"
    for (let option of dropdownOptions) {
        let text = await option.getText();
        if (text.includes('Carroza223')) {
            assert.fail('El elemento <li> no se borró.')
            break; // Salir del bucle una vez que se encuentra el elemento deseado

        }
    }
})

Then ('I click post', async function(){
    let element = await this.driver.$('a[href="#/posts/"]')
    return await element.click()
})   

Then('I find the deleted tag', async function(){
    // Encontrar el elemento de la lista desplegable
    let dropdownList = await this.driver.$('body > div:nth-child(1) > div > ul.ember-power-select-options');
    
    // Obtener todos los elementos de la lista desplegable
    let dropdownOptions = await dropdownList.$$('li');

    // Iterar sobre los elementos para encontrar el que contiene el texto "Luna llena"
    for (let option of dropdownOptions) {
        let text = await option.getText();
        if (text.includes('Carroza223')) {
            assert.fail('El elemento <li> no se borró.')
            break; // Salir del bucle una vez que se hace clic en el elemento deseado
        }
    }
})

Then('I enter tag name 3 {string}', async function(tagName){
    let element = await this.driver.$('input#tag-name.gh-input')
    return await element.setValue(tagName)
})
