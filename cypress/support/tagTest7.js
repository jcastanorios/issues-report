import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import { Constantes } from "./constantes";
import ScreenshotPage from "./screenshot"; // Importar módulo para capturar pantallas

class TagTest{

    visit() {
        if(Constantes.VERSION_GHOST==5){
            cy.visit("https://ghost-aaej.onrender.com/ghost/#/tags");
        }else if (Constantes.VERSION_GHOST==4){
            cy.visit("https://ghost-t6x4.onrender.com/ghost/#/tags");
        }
    }
    clickNewTag(nombreEscenario){
        cy.get('a.ember-view.gh-btn.gh-btn-primary').click()  //click en New tag
        //ScreenshotPage.takeScreenshot(nombreEscenario, 'clickNewTag'); 
    }
    CreateNewTag(tituloTag){
        cy.get('input#tag-name.gh-input').type(tituloTag) //nombre
        const slug = faker.commerce.isbn();
        cy.get('input#tag-slug.gh-input').type(slug) // slug
        const descript = faker.lorem.paragraph(3); // Generar descripcion aleatorio
        cy.get('textarea#tag-description.gh-input.gh-tag-details-textarea').type(descript) //description
    }

    SaveNewTag(){
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click()//save
    }

    CreateMetaData(metatitle){
        const metadescript = faker.lorem.paragraph(3);
        cy.get('section.gh-expandable > div:nth-child(1) > div >button.gh-btn.gh-btn-expand').click() // expand metadata
        cy.get('input#meta-title.gh-input').type(metatitle)
        cy.get('textarea#meta-description.gh-input.gh-tag-details-textarea').type(metadescript) // description
        cy.get('section.gh-expandable > div:nth-child(1) > div >button.gh-btn.gh-btn-expand').click() // expand metadata') // close
    }

    CreateTwitterCard(twittertitle){
        const twitterdescript = faker.lorem.paragraph(3);
        cy.get('section.gh-expandable > div:nth-child(2) > div >button.gh-btn.gh-btn-expand').click() // expand metadata
        cy.get('input#twitter-title.gh-input').type(twittertitle)
        cy.get('textarea#twitter-description.gh-input.gh-tag-details-textarea').type(twitterdescript) // description
        cy.get('div.gh-twitter-settings > div > div:nth-child(1) > div > section > div > div.gh-image-uploader-unsplash').click({ force: true })  //unplash button
        cy.get('input[name="searchKeyword"]').type(twittertitle);
        cy.get('a.gh-unsplash-button').contains('Insert image').click()//seleccionar imagen
        cy.wait(2000)
        cy.get('section.gh-expandable > div:nth-child(2) > div >button.gh-btn.gh-btn-expand').click() // expand metadata
    }

    CreateFacebookCard(facebooktitle){
        const facebookdescript = faker.lorem.paragraph(3);
        cy.get('section.gh-expandable > div:nth-child(3) > div >button.gh-btn.gh-btn-expand').click() // expand metadata
        cy.get('input#og-title.gh-input').type(facebooktitle)
        cy.get('textarea#og-description.gh-input.gh-tag-details-textarea').type(facebookdescript) // description
        cy.get('.gh-og-settings .gh-tag-image-uploader .gh-image-uploader .gh-image-uploader-unsplash[data-ember-action="1558"]').click({ force: true })  //unplash button
        cy.get('input[name="searchKeyword"]').type(facebooktitle);
        cy.get('a.gh-unsplash-button').contains('Insert image').click()//seleccionar imagen
        cy.wait(2000)
        cy.get('section.gh-expandable > div:nth-child(3) > div >button.gh-btn.gh-btn-expand').click() // expand metadata
    }

}
export default new TagTest();