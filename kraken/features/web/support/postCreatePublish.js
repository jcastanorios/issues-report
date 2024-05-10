const { faker } = require('@faker-js/faker');
const TakeScreenshotTest = require('../support/screenshot.js'); // Importar la clase por defecto


class PostCreatePublish {
    constructor(driver) {
        this.driver = driver;
        this.takeScreenshotTest = new TakeScreenshotTest(this.driver);
    }

    async visit(nombreEscenario) {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/posts");
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'pagePosts');
    }

    async clickNewPost(nombreEscenario) {
        await this.driver.$('//span[contains(text(), "New post")]').click();
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'newPost');
    }

    async selectImageForPost(tituloPost, nombreEscenario) {
        await this.driver.$('path[d="M83.86 54.15v34.13H38.57V54.15H0v68.26h122.43V54.15H83.86zM38.57 0h45.3v34.13h-45.3z"]').click();
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'addImage');
        let element = await this.driver.$('input[name="searchKeyword"]');
        await element.setValue(tituloPost);
        await element.keys("Enter"); // Envía la tecla Enter
        await this.wait(8000);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'imageSearch');
        await this.driver.$('//a[contains(text(), "Insert image")]').click();
    }

    async enterPostDetails(tituloPost, nombreEscenario) {
        let element1 = await this.driver.$('textarea[placeholder="Post title"]');
        await element1.setValue(tituloPost);
        const contenidoPost = faker.lorem.paragraph(3);
        let element2 = await this.driver.$('div[data-placeholder="Begin writing your post..."]');
        await element2.setValue(contenidoPost);
        await this.wait(5000);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'postDetails');
    }

    async publishPost(tituloPost, nombreEscenario) {
        await this.driver.$('//span[contains(text(), "Publish")]').click();
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'publishPost 1');
        await this.driver.$('//span[contains(text(), "Continue")]').click();
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'publishPostRightNow 2');
        await this.driver.$('//span[contains(text(), "Publish post, right now")]').click();
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'publishPostFinal 4');
        const tituloPublicado = await this.driver.$('//span[contains(text(), "${tituloPost}")]');

        if (tituloPublicado) {
            console.log(`**La página "${tituloPost}" ha sido publicada correctamente.**`);
        } else {
            console.log(`**La página "${tituloPost}" NO ha sido publicada correctamente.**`);
        }
        
        await this.wait(2000);
    }

    async verifyPostPublished(tituloPost, nombreEscenario) {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/posts?type=published");
        const tituloPublicado = await this.driver.$(`//h3[contains(text(),'${tituloPost}')]`);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'checkPostPublication');
        if (tituloPublicado) {
            console.log(`--La página "${tituloPost}" ha sido verificada en la sección de publicados.--`);
        } else {
            console.log(`--La página "${tituloPost}" NO ha sido verificada en la sección de publicados.--`);
        }

        console.log(`***** La página "${tituloPost}" ha sido verificada en la sección de publicados. *****`);
    }

    async clearDetailsPost(nombreEscenario) {
        let element1 = await this.driver.$('textarea[placeholder="Post title"]');
        await element1.setValue('');
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'clearPostTitle');
        let element2 = await this.driver.$('div[data-placeholder="Begin writing your post..."]');
        await element2.setValue(' ');
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'clearPostDetails');
    }
    

    async editPost(tituloPost, nuevoTituloPost, nombreEscenario) {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/posts?type=published");
        await this.wait(3000);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'postPubluihed');
        let enlacePost = await this.driver.$(`//a[contains(., '${tituloPost}')]`);
        let nuevoContenidoPost = faker.lorem.paragraph(3); // Generar un nuevo contenido de post
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'editPost');
        if (enlacePost) {
            await enlacePost.click();
            console.log(`--Se ha hecho clic en el enlace para el post "${tituloPost}".--`);
            let element1 = await this.driver.$('textarea[placeholder="Post title"]');
            let element2 = await this.driver.$('div[data-placeholder="Begin writing your post..."]');
            if (element1) {
                console.log(`Encuentra titulo!!!--`);
                await element1.setValue(nuevoTituloPost);
                await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'editPostNewTitle');
                await element2.setValue(nuevoContenidoPost);
                await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'editPostNewDescription');
                console.log(`--Se ha editado el post "${tituloPost}" con el nuevo título "${nuevoTituloPost}".--`);
            }	else {
                console.log(`No encuentra titulo!!!--`);
            }
        } else {
            console.log(`--No se encontró el enlace para el post "${tituloPost}".--`);
        }
    }

    async updatePost(tituloPost, nombreEscenario) {
        await this.driver.$('//span[contains(text(), "Update")]').click();
        console.log(`El post "${tituloPost}" ha sido actualizado correctamente.`);
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage(`Post Tests/${nombreEscenario}`, 'editPostUpdated');
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
    
}
module.exports = PostCreatePublish;