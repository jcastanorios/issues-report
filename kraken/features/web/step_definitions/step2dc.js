const { Given, When, Then } = require('@cucumber/cucumber');



Then('I click the element inside the tag 2', async function(){
    // Encontrar el elemento de la lista desplegable
    let dropdownList = await this.driver.$('section.gh-canvas > section.view-container.content-list > ol');
    
    // Obtener todos los elementos de la lista desplegable
    let dropdownOptions = await dropdownList.$$('li');

    // Iterar sobre los elementos para encontrar el que contiene el texto "Luna llena"
    for (let option of dropdownOptions) {
        let text = await option.getText();
        if (text.includes('Asus computer')) {
            await option.click();
            break; // Salir del bucle una vez que se encuentra el elemento deseado
        }
    }
})

Then('I enter tag name 2 {string}', async function(tagName){
    let element = await this.driver.$('input#tag-name.gh-input')
    return await element.setValue(tagName)
})

Then('I click to select the tag 2', async function(){
    // Encontrar el elemento de la lista desplegable
    let dropdownList = await this.driver.$('section.gh-canvas > section.view-container.content-list > ol');
    
    // Obtener todos los elementos de la lista desplegable
    let dropdownOptions = await dropdownList.$$('li');

    // Iterar sobre los elementos para encontrar el que contiene el texto "Luna llena"
    for (let option of dropdownOptions) {
        let text = await option.getText();
        if (text.includes('Yellow')) {
            await option.click();
            break; // Salir del bucle una vez que se encuentra el elemento deseado
        }
    }
})
