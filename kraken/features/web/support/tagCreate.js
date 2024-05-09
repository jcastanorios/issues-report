class tagCreate{
    constructor(driver) {
        this.driver = driver;
    }
    async visit() {
        await this.driver.url("https://ghost-aaej.onrender.com/ghost/#/tags");
    }
    async clickNewTag(){
        await this.driver.$('a.ember-view.gh-btn.gh-btn-primary').click();//click en New tag
    }
    async CreateNewTag(tagTitulo){        
        console.log("Ingresando a newTag en la clase");
        console.log(`--tagTitulo "${tagTitulo}" valor que llego.--`);
        let descript = faker.lorem.paragraph(3); // Generar un título de post aleatorio
        let element = await this.driver.$('input#tag-name.gh-input')
        await element.setValue(tagTitulo);
        element = await this.driver.$('textarea#tag-description.gh-input.gh-tag-details-textarea');     
        await element.setValue(descript);        
        element =await this.driver.$('input.color-picker');
        await element.setValue('7a0000'); 
        await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click();//save
    }
}
module.exports = tagCreate;