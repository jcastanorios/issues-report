const { faker } = require('@faker-js/faker');

class PageCreatePublish {
    constructor(driver) {
        this.driver = driver;
    }

    async visit() {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/pages");
        await this.wait(2000);
    }

    async clickNewPage() {
        await this.driver.$('//span[contains(text(), "New page")]').click();
        await this.wait(2000);
    }

    async selectImageForPage(tituloPage) {
        await this.driver.$('path[d="M83.86 54.15v34.13H38.57V54.15H0v68.26h122.43V54.15H83.86zM38.57 0h45.3v34.13h-45.3z"]').click();
        let element = await this.driver.$('input[name="searchKeyword"]');
        await element.setValue(tituloPage);
        await element.keys("Enter"); // Envía la tecla Enter
        await this.wait(8000);
        await this.driver.$('//a[contains(text(), "Insert image")]').click();
    }

    async enterPageDetails(tituloPage) {
        let element1 = await this.driver.$('textarea[placeholder="Page title"]');
        await element1.setValue(tituloPage);
        const contenidoPage = faker.lorem.paragraph(3);
        let element2 = await this.driver.$('div[data-placeholder="Begin writing your page..."]');
        await element2.setValue(contenidoPage);
        await this.wait(5000);
    }

    async publishPage(tituloPage) {
        await this.driver.$('//span[contains(text(), "Publish")]').click();
        await this.wait(2000);
        await this.driver.$('//span[contains(text(), "Continue")]').click();
        await this.wait(2000);
        //await this.driver.$('button[class="gh-btn gh-btn-black gh-btn-large"]').click();
        await this.driver.$('//span[contains(text(), "Publish page, right now")]').click();
        await this.wait(2000);
        const tituloPublicado = await this.driver.$('//span[contains(text(), "${tituloPage}")]');

        if (tituloPublicado) {
            console.log(`**La página "${tituloPage}" ha sido publicada correctamente.**`);
        } else {
            console.log(`**La página "${tituloPage}" NO ha sido publicada correctamente.**`);
        }
        
        await this.wait(2000);
    }



    async verifyPagePublished(tituloPage) {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/pages?type=published");
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
        //await this.driver.$('//span[contains(text(), "Right now")]').click();
        const button = await this.driver.$('svg.icon-expand');
        await button.click();
        await this.wait(1000);
        await this.driver.$('//label[contains(text(), "Schedule for later")]').click(); 
        await this.wait(1000);
        let element = await this.driver.$('.gh-date-time-picker-date input');
        await element.setValue('2999-12-31');
        await this.driver.$('//span[contains(text(), "Continue")]').click();
        await this.wait(1000);
        await this.driver.$('//span[contains(text(), "Publish page")]').click();
        await this.wait(2000);
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
        
        const tituloPublicado = await this.driver.$(`//h3[contains(text(),'${tituloPage}')]`);

        if (tituloPublicado) {
            console.log(`--La página "${tituloPage}" ha sido verificada en la sección de programados.--`);
        } else {
            console.log(`--La página "${tituloPage}" NO ha sido verificada en la sección de programados.--`);
        }

        console.log(`***** La página "${tituloPage}" ha sido verificada en la sección de programados. *****`);
    }
    
}

module.exports = PageCreatePublish;