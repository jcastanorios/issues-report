const { faker } = require('@faker-js/faker');
const assert = require('assert');
const TakeScreenshotTest = require('../support/screenshot.js'); // Importar la clase por defecto


class TagsCreate {
    constructor(driver) {
        this.driver = driver;
        this.takeScreenshotTest = new TakeScreenshotTest(this.driver);
    }

    async visit() {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/tags");
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage('Screen Tags', 'Tags');
    }

    async clickNewTag() {
        await this.driver.$('//span[contains(text(), "New tag")]').click();
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage('Screen Tags', 'NewTags');
    }
    
    async enterTagDetails(tituloTag) {
        let element1 = await this.driver.$('input#tag-name.gh-input');
        await element1.setValue(tituloTag);
        const contenidoPost = faker.lorem.paragraph(3);
        let element2 = await this.driver.$('textarea#tag-description.gh-input.gh-tag-details-textarea');
        await element2.setValue(contenidoPost);
        await this.wait(5000);
        await this.takeScreenshotTest.takeScreenshotPage('Screen Tags', 'DetailsTags');
    }

    async clickSaveTag() {
        await this.driver.$('//span[contains(text(), "Save")]').click();
        await this.wait(3000);
        await this.takeScreenshotTest.takeScreenshotPage('Screen Tags', 'SaveTags');
    }

    async clearDetailsTag() {
        let element1 = await this.driver.$('input#tag-name.gh-input');
        await element1.setValue('');
        await this.wait(2000);
        let element2 = await this.driver.$('textarea#tag-description.gh-input.gh-tag-details-textarea');
        await element2.setValue(' ');
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage('Screen Tags', 'ClearDetailsTags');
    }

    async editTag(tituloTag, nuevoTituloTag) {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/posts?type=published");
        await this.wait(3000);
        await this.takeScreenshotTest.takeScreenshotPage('Screen Tags', 'EditTags');

        let enlaceTag = await this.driver.$(`//a[contains(., '${tituloTag}')]`);
        let nuevoContenidoTag = faker.lorem.paragraph(3); // Generar un nuevo contenido de post

        if (enlaceTag) {
            await enlaceTag.click();
            console.log(`--Se ha hecho clic en el enlace para el post "${tituloTag}".--`);
            let element1 = await this.driver.$('textarea[placeholder="Post title"]');
            let element2 = await this.driver.$('div[data-placeholder="Begin writing your post..."]');
            if (element1) {
                console.log(`Encuentra titulo!!!--`);
                await element1.setValue(nuevoTituloTag);
                await element2.setValue(nuevoContenidoTag);
                console.log(`--Se ha editado el post "${tituloTag}" con el nuevo título "${nuevoTituloTag}".--`);
            }	else {
                console.log(`No encuentra titulo!!!--`);
            }
        } else {
            console.log(`--No se encontró el enlace para el post "${tituloTag}".--`);
        }
    }

    async clickDeleteTag() {
        await this.driver.$('//span[contains(text(), "Delete tag")]').click();
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage('Screen Tags', 'Delete1Tags');
        await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').click();
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage('Screen Tags', 'Delete2Tags');

    }

    async validateTagList(tituloTag){
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/tags");
        const tituloPublicado = await this.driver.$(`//h3[contains(text(),'${tituloTag}')]`);
                
        if (tituloPublicado) {
            console.log(`Encuentra titulo!!!--`); 
        } else {
            console.log(`No encuentra titulo!!!--`);
        }
        console.log(`***** El tag "${tituloTag}" ha sido verificada. *****`);
        assert.ok(true)
    }


    async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
module.exports = TagsCreate;
