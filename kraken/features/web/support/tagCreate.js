const TakeScreenshotTest = require('../support/screenshot.js'); // Importar la clase por defecto
class tagCreate{
    constructor(driver) {
        this.driver = driver;
        this.takeScreenshotTest = new TakeScreenshotTest(this.driver);                
    }
    async visit() {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/tags");
    }
    async clickNewTag(nombreEscenario){
        await this.driver.$('a.ember-view.gh-btn.gh-btn-primary').click();//click en New tag
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'clickNewTag');
    }
    async CreateNewTag(tagTitulo, nombreEscenario){        
        console.log("Ingresando a newTag en la clase");
        console.log(`--tagTitulo "${tagTitulo}" valor que llego.--`);
        let descript = faker.lorem.paragraph(3); // Generar un título de post aleatorio
        let element = await this.driver.$('input#tag-name.gh-input')
        await element.setValue(tagTitulo);
        await this.wait(1000);
        element = await this.driver.$('textarea#tag-description.gh-input.gh-tag-details-textarea');     
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'CreateNewTag1');        
        await element.setValue(descript);        
        element =await this.driver.$('input.color-picker');
        await element.setValue('7a0000'); 
        this.wait(1000);
        await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click();//save
        await this.takeScreenshotTest.takeScreenshotPage(`${nombreEscenario}`, 'CreateNewTag2');
    }
}
module.exports = tagCreate;