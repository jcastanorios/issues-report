const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');



Then ('I validate publish message confirmation', async function(){
    let element = await this.driver.$('div.gh-publish-title');
    let text = await element.getText();
    if (text.includes('Boom. It’s out there.')) {
        assert.ok(true);
    } else {
        assert.fail('No se encontró el texto esperado en el elemento.');
    }
})


Then ('I click unpublish post', async function(){
    let element = await this.driver.$('button.gh-btn.gh-btn-editor.darkgrey.gh-unpublish-trigger')
    return await element.click()
})

Then ('I click unpublish and revert button', async function(){
    let element = await this.driver.$('button.gh-revert-to-draft')
    return await element.click()
})

Then ('I validate draft message', async function(){
    let element = await this.driver.$('div.gh-editor-post-status');
    let text = await element.getText();
    if (text.includes('Draft')) {
        assert.ok(true);
    } else {
        assert.fail('No se encontró el texto esperado en el elemento.');
    }
})


Then ('I click draft', async function(){
    let element = await this.driver.$('a[href="#/posts/?type=draft"]')
    return await element.click()
})  

Then('I find the element inside the draft', async function(){
    // Encontrar el elemento de la lista desplegable
    let dropdownList = await this.driver.$('section.view-container.content-list > div:nth-child(1) > ol');
    
    // Obtener todos los elementos de la lista desplegable
    let dropdownOptions = await dropdownList.$$('li');

    // Iterar sobre los elementos para encontrar el que contiene el texto "Luna llena"
    for (let option of dropdownOptions) {
        let text = await option.getText();
        if (text.includes('Equipo99')) {
            assert.ok(true);
            break; // Salir del bucle una vez que se encuentra el elemento deseado
        }
    }

})