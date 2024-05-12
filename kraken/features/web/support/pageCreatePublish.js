const { faker } = require('@faker-js/faker');
const TakeScreenshotTest = require('../support/screenshot.js'); // Importar la clase por defecto


class PageCreatePublish {
    constructor(driver) {
        this.driver = driver;
        this.takeScreenshotTest = new TakeScreenshotTest(this.driver);

    }

    async visit(nombreEscenario) {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/pages");
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'pagePages');
        await this.wait(2000);
    }

    async clickNewPage(nombreEscenario) {
        await this.driver.$('//span[contains(text(), "New page")]').click();
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'newPage');
        await this.wait(2000);
    }

    async selectImageForPage(tituloPage, nombreEscenario) {
        await this.driver.$('path[d="M83.86 54.15v34.13H38.57V54.15H0v68.26h122.43V54.15H83.86zM38.57 0h45.3v34.13h-45.3z"]').click();
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'addImage');
        let element = await this.driver.$('input[name="searchKeyword"]');
        await element.setValue(tituloPage);
        await element.keys("Enter"); // Envía la tecla Enter
        await this.wait(3000);
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'imageSearch');
        await this.driver.$('//a[contains(text(), "Insert image")]').click();
    }

    async enterPageDetails(tituloPage, nombreEscenario) {
        let element1 = await this.driver.$('textarea[placeholder="Page title"]');
        await element1.setValue(tituloPage);
        const contenidoPage = faker.lorem.paragraph(3);
        let element2 = await this.driver.$('div[data-placeholder="Begin writing your page..."]');
        await element2.setValue(contenidoPage);
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'pageDetails');
        await this.wait(2000);
    }

    async publishPage(tituloPage, nombreEscenario) {
        await this.driver.$('//span[contains(text(), "Publish")]').click();
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'publishPage1');
        await this.wait(2000);
        await this.driver.$('//span[contains(text(), "Continue")]').click();
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'publishPageFinalReview3');
        await this.wait(2000);
        //await this.driver.$('button[class="gh-btn gh-btn-black gh-btn-large"]').click();
        await this.driver.$('//span[contains(text(), "Publish page, right now")]').click();
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'publishPageFinal4');
        const tituloPublicado = await this.driver.$('//span[contains(text(), "${tituloPage}")]');

        if (tituloPublicado) {
            console.log(`**La página "${tituloPage}" ha sido publicada correctamente.**`);
        } else {
            console.log(`**La página "${tituloPage}" NO ha sido publicada correctamente.**`);
        }
        
        await this.wait(2000);
    }



    async verifyPagePublished(tituloPage, nombreEscenario) {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/pages?type=published");
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'checkPagePublication');
        const tituloPublicado = await this.driver.$(`//h3[contains(text(),'${tituloPage}')]`);

        if (tituloPublicado) {
            console.log(`--La página "${tituloPage}" ha sido verificada en la sección de publicados.--`);
        } else {
            console.log(`--La página "${tituloPage}" NO ha sido verificada en la sección de publicados.--`);
        }

        console.log(`***** La página "${tituloPage}" ha sido verificada en la sección de publicados. *****`);
    }

    async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    } 

    async schedulePage(tituloPage) {
        await this.driver.$('//span[contains(text(), "Publish")]').click();
        await this.wait(1000);
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'schedulePublishPage 1');
        //await this.driver.$('//span[contains(text(), "Right now")]').click();
        const button = await this.driver.$('svg.icon-expand');
        await button.click();
        await this.wait(1000);
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'schedulePublishPage 2');
        await this.driver.$('//label[contains(text(), "Schedule for later")]').click(); 
        await this.wait(1000);
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'schedulePublishPage 3');
        let element = await this.driver.$('.gh-date-time-picker-date input');
        await element.setValue('2999-12-31');
        await this.driver.$('//span[contains(text(), "Continue")]').click();
        await this.wait(1000);
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'schedulePublishPage 4');
        await this.driver.$('//span[contains(text(), "Publish page")]').click();
        await this.wait(2000);
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'schedulePublishPage 5');
        const tituloPublicado = await this.driver.$('//span[contains(text(), "${tituloPage}")]');

        if (tituloPublicado) {
            console.log(`**La página "${tituloPage}" ha sido programada correctamente.**`);
        } else {
            console.log(`**La página "${tituloPage}" NO ha sido programada correctamente.**`);
        }
        
        await this.wait(2000);
        
    }

    async verifyPageScheduled(tituloPage) {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/pages?type=scheduled");
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'checkSchedulePublishPage');
        const tituloPublicado = await this.driver.$(`//h3[contains(text(),'${tituloPage}')]`);

        if (tituloPublicado) {
            console.log(`--La página "${tituloPage}" ha sido verificada en la sección de programados.--`);
        } else {
            console.log(`--La página "${tituloPage}" NO ha sido verificada en la sección de programados.--`);
        }

        console.log(`***** La página "${tituloPage}" ha sido verificada en la sección de programados. *****`);
    }
    async verifyChangeUserNameP(expectedText){
        //autor:Wilder
        const assert = require('assert');
        let bodyText = await this.driver.$('span.midgrey-l2').getText();
        assert(bodyText.includes(expectedText), `Expected text "${expectedText}" not found in page`);        
    }
    async publishPageDraft(){
        //@Autor: Wilder
        await this.wait(2000);
        await this.driver.$('a.ember-view.gh-btn-editor.gh-editor-back-button').click(); //Clicn boton cerrar
    }
    async verifyPageDraft(tituloPost){
        //@Autor: wilder
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/pages?type=draft");
        const tituloPublicado = await this.driver.$(`//h3[contains(text(),'${tituloPost}')]`);
        if (tituloPublicado) {
            console.log(`--La página "${tituloPost}" ha sido verificada en la sección de publicados.--`);
        } else {
            console.log(`--La página "${tituloPost}" NO ha sido verificada en la sección de publicados.--`);
        }
        console.log(`***** La página "${tituloPost}" ha sido verificada en la sección de publicados. *****`);
    }
    async asignarTagPage(tagTitulo){                
        //@Autor: Wilder
        await this.driver.$('form > div:nth-child(3) > div > div:nth-child(1)').setValue(tagTitulo);
    }
}

module.exports = PageCreatePublish;