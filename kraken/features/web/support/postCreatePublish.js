const { faker } = require('@faker-js/faker');
const assert = require('assert');

class PostCreatePublish {
    constructor(driver) {
        this.driver = driver;
    }

    async visit() {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/posts");
        await this.wait(2000);
    }

    async clickNewPost() {
        await this.driver.$('//span[contains(text(), "New post")]').click();
        await this.wait(2000);
    }

    async selectImageForPost(tituloPost) {
        await this.driver.$('path[d="M83.86 54.15v34.13H38.57V54.15H0v68.26h122.43V54.15H83.86zM38.57 0h45.3v34.13h-45.3z"]').click();
        let element = await this.driver.$('input[name="searchKeyword"]');
        await element.setValue(tituloPost);
        await element.keys("Enter"); // Envía la tecla Enter
        await this.wait(8000);
        await this.driver.$('//a[contains(text(), "Insert image")]').click();
    }

    async enterPostDetails(tituloPost) {
        let element1 = await this.driver.$('textarea[placeholder="Post title"]');
        await element1.setValue(tituloPost);
        const contenidoPost = faker.lorem.paragraph(3);
        let element2 = await this.driver.$('div[data-placeholder="Begin writing your post..."]');
        await element2.setValue(contenidoPost);
        await this.wait(2000);
    }

    async publishPost(tituloPost) {
        await this.driver.$('//span[contains(text(), "Publish")]').click();
        await this.wait(2000);
        await this.driver.$('//span[contains(text(), "Continue")]').click();
        await this.wait(2000);
        await this.driver.$('//span[contains(text(), "Publish post, right now")]').click();
        await this.wait(2000);
        const tituloPublicado = await this.driver.$('//span[contains(text(), "${tituloPost}")]');

        if (tituloPublicado) {
            console.log(`**La página "${tituloPost}" ha sido publicada correctamente.**`);
        } else {
            console.log(`**La página "${tituloPost}" NO ha sido publicada correctamente.**`);
        }
        
        await this.wait(2000);
    }

    async verifyPostPublished(tituloPost) {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/posts?type=published");
        const tituloPublicado = await this.driver.$(`//h3[contains(text(),'${tituloPost}')]`);

        if (tituloPublicado) {
            console.log(`--La página "${tituloPost}" ha sido verificada en la sección de publicados.--`);
        } else {
            console.log(`--La página "${tituloPost}" NO ha sido verificada en la sección de publicados.--`);
        }

        console.log(`***** La página "${tituloPost}" ha sido verificada en la sección de publicados. *****`);
    }

    async clearDetailsPost() {
        let element1 = await this.driver.$('textarea[placeholder="Post title"]');
        await element1.setValue('');
        await this.wait(2000);
        let element2 = await this.driver.$('div[data-placeholder="Begin writing your post..."]');
        await element2.setValue(' ');
        await this.wait(2000);
    }
    

    async editPost(tituloPost, nuevoTituloPost) {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/posts?type=published");
        await this.wait(3000);

        let enlacePost = await this.driver.$(`//a[contains(., '${tituloPost}')]`);
        let nuevoContenidoPost = faker.lorem.paragraph(3); // Generar un nuevo contenido de post

        if (enlacePost) {
            await enlacePost.click();
            console.log(`--Se ha hecho clic en el enlace para el post "${tituloPost}".--`);
            let element1 = await this.driver.$('textarea[placeholder="Post title"]');
            let element2 = await this.driver.$('div[data-placeholder="Begin writing your post..."]');
            if (element1) {
                console.log(`Encuentra titulo!!!--`);
                await element1.setValue(nuevoTituloPost);
                await element2.setValue(nuevoContenidoPost);
                console.log(`--Se ha editado el post "${tituloPost}" con el nuevo título "${nuevoTituloPost}".--`);
            }	else {
                console.log(`No encuentra titulo!!!--`);
            }
        } else {
            console.log(`--No se encontró el enlace para el post "${tituloPost}".--`);
        }
    }

    async updatePost(tituloPost) {
        await this.driver.$('//span[contains(text(), "Update")]').click();
        console.log(`El post "${tituloPost}" ha sido actualizado correctamente.`);
        await this.wait(2000);
    }

    async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    } 
    async verifyChangeUserNamePost(expectedText)
    //@Autor: Wilder
    {
        const assert = require('assert');
        let bodyText = await this.driver.$('span.midgrey-l2').getText();
        assert(bodyText.includes(expectedText), `Expected text "${expectedText}" not found in page`);        
    }
    async publishDraft(){
        //@Autor: Wilder
        await this.wait(2000);
        await this.driver.$('a.ember-view.gh-btn-editor.gh-editor-back-button').click(); //Clicn boton cerrar
        await this.driver.$('a[href="#/posts/?type=draft"]').click(); //click en lista drawft
    }
    async verifyPostDraft(tituloPost){
        //@Autor: wilder
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/posts?type=draft");
        const tituloPublicado = await this.driver.$(`//h3[contains(text(),'${tituloPost}')]`);
        if (tituloPublicado) {
            console.log(`--La página "${tituloPost}" ha sido verificada en la sección de publicados.--`);
        } else {
            console.log(`--La página "${tituloPost}" NO ha sido verificada en la sección de publicados.--`);
        }
        console.log(`***** La página "${tituloPost}" ha sido verificada en la sección de publicados. *****`);
    }

    //@Autor: Danna
    async postSettings() {
        await this.driver.$('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click();
        await this.wait(1000);
    }

    async enterTagValue(tagValue) {
        await this.driver.$('div#tag-input').click();  //click tag box
        await this.wait(1000);
        let element = await this.driver.$('form > div:nth-child(3) > div > div:nth-child(1)'); //enter tag value
        await element.setValue(tagValue)
        await this.wait(1000);
        await this.driver.$('ul.ember-power-select-options:first-child').click(); // select tag value
        await this.wait(1000);
    }

    async allTagFilter(){
        await this.driver.$('section.view-actions > div > div:nth-child(4) > div:nth-child(1)').click()
        await this.wait(2000);
    }
    
    async selectAllTagFilter(tagValue){
        let dropdownList = await this.driver.$('body > div:nth-child(1) > div > ul.ember-power-select-options');
    
        // Obtener todos los elementos de la lista desplegable
        let dropdownOptions = await dropdownList.$$('li');
    
        // Iterar sobre los elementos para encontrar el que contiene el texto 
        for (let option of dropdownOptions) {
            let text = await option.getText();
            if (text.includes(tagValue)) {
                await option.click();
                break; // Salir del bucle una vez que se hace clic en el elemento deseado
            }
        }
    }

    async postTagListed(postTitle){
        let enlacePost = await this.driver.$(`//a[contains(., '${postTitle}')]`);

        if (enlacePost){
            assert.ok(true)
        }
        else {
            console.log(`No encuentra titulo!!!--`);
    }   
    }

    async unpublishPost(){
        await this.driver.$('button.gh-btn.gh-btn-editor.darkgrey.gh-unpublish-trigger').click()
        await this.wait(1000);
        await this.driver.$('button.gh-revert-to-draft').click()
        await this.wait(1000);
    }
}
module.exports = PostCreatePublish;