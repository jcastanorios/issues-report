import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import { Constantes } from "../support/constantes";
import ScreenshotPage from "../support/screenshot"; // Importar módulo para capturar pantallas

class TagCreate{

    visit() {
        if(Constantes.VERSION_GHOST==5){
            cy.visit("https://ghost-aaej.onrender.com/ghost/#/tags");
        }else if (Constantes.VERSION_GHOST==4){
            cy.visit("https://ghost-t6x4.onrender.com/ghost/#/tags");
        }
    }
    clickNewTag(nombreEscenario){
        cy.get('a.ember-view.gh-btn.gh-btn-primary').click()  //click en New tag
        ScreenshotPage.takeScreenshot(nombreEscenario, 'clickNewTag'); 
    }
    CreateNewTag(tagTitulo, nombreEscenario){
        let descript = faker.lorem.paragraph(3); // Generar un título de post aleatorio
        cy.get('input#tag-name.gh-input').type(tagTitulo) //nombre
        cy.get('input[placeholder=15171A]').type('7a0000') //color rojo
        cy.get('textarea#tag-description.gh-input.gh-tag-details-textarea').type(descript) //description
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click()//save
        ScreenshotPage.takeScreenshot(nombreEscenario, 'CreateNewTag'); 
    }
}
export default new TagCreate();