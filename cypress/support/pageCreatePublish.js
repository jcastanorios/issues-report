import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import ScreenshotPage from "../support/screenshot"; // Importar módulo para capturar pantallas

class PageCreatePublish {
    visit(nombreEscenario) {
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/pages");
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/pagePages`);
    }

    clickNewPage(nombreEscenario) {
         cy.contains("New page").click();
         ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/newPage`);
    }

    selectImageForPage(tituloPage, nombreEscenario) {
        cy.get('path[d="M83.86 54.15v34.13H38.57V54.15H0v68.26h122.43V54.15H83.86zM38.57 0h45.3v34.13h-45.3z"]').click({ force: true });
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/addImage`);
        cy.get('input[name="searchKeyword"]').type(tituloPage);
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/imageSearch`);
        cy.get('a.gh-unsplash-button').contains('Insert image').click();
    }

    enterPageDetails(tituloPage, nombreEscenario) {
        cy.get('textarea[placeholder="Page title"]').type(tituloPage);
        const contenidoPage = faker.lorem.paragraph(3);
        cy.get('div[data-placeholder="Begin writing your page..."]').type(contenidoPage);
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/pageDetails`);
    }

    publishPage(tituloPage, nombreEscenario) {
        cy.get('button.gh-btn-editor.darkgrey.gh-publish-trigger').contains('Publish').click();
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/publishPage 1`);
        cy.get('div.gh-publish-setting-trigger').contains('Right now').should('be.visible');
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/publishPageRightNow 2`);
        cy.get('div.gh-publish-cta').contains('Continue, final review →').click();
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/publishPageFinalReview 3`);
        cy.get('div.gh-publish-title').contains('Ready, set, publish.').should('be.visible');
        cy.get('div.gh-publish-title').contains('Share it with the world.').should('be.visible');
        cy.get('button[class="gh-btn gh-btn-large gh-btn-pulse ember-view"]').contains('Publish page, right now').click();
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/publishPageFinal 4`);
        cy.contains(tituloPage).should('be.visible'); // Verificar que el page publicado esté visible
        cy.log(`La página "${tituloPage}" ha sido publicada correctamente.`);
        cy.wait(2000);
        cy.get('button[class="gh-back-to-editor"]').contains('Back to editor').click();
    }

    verifyPagePublished(tituloPage, nombreEscenario) {
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/pages?type=published"); // Visitar pages publicadas
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/checkPagePublication`);
        cy.get('h3.gh-content-entry-title').contains(tituloPage).should('be.visible');
        cy.log(`La página "${tituloPage}" ha sido verificado en la sección de publicados.`);
    }

    schedulePage(tituloPage, nombreEscenario) {
        cy.get('button.gh-btn-editor.darkgrey.gh-publish-trigger').contains('Publish').click();
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/schedulePublishPage 1`);
        cy.get('div.gh-publish-setting-trigger').contains('Right now').click();
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/schedulePublishPage 2`);
        cy.contains('Schedule for later').click();
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/schedulePublishPage 3`);
        cy.get('.gh-date-time-picker-date input').clear().type('2999-12-31'); // Escribir la fecha en el campo
        cy.get('div.gh-publish-cta').contains('Continue, final review →').click();
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/schedulePublishPage 4`);
        cy.get('div.gh-publish-title').contains('Ready, set, publish.').should('be.visible');
        cy.get('div.gh-publish-title').contains('Share it with the world.').should('be.visible');
        cy.get('button[class="gh-btn gh-btn-large gh-btn-pulse ember-view"]').click();
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/schedulePublishPage 5`);
        cy.contains(tituloPage).should('be.visible'); // Verificar que el page publicado esté visible
        cy.log(`La página "${tituloPage}" ha sido programada correctamente.`);
        cy.wait(2000);
    }

    verifyPageScheduled(tituloPage, nombreEscenario) {
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/pages?type=scheduled"); // Visitar pages programadas
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/checkSchedulePublishPage`);
        cy.get('h3.gh-content-entry-title').contains(tituloPage);
        cy.log(`La página "${tituloPage}" ha sido verificado en la sección de programados.`);
    }

    editPage(tituloPage, nombreEscenario){
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/pages?type=published"); // Visitar las pages publicados
        cy.get('h3.gh-content-entry-title').contains(tituloPage).click(); // Hacer clic en la page a editar
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/editPage`);
    }

    editPageDetails(nuevoTituloPage, nombreEscenario){
        cy.get('textarea[placeholder="Page title"]').clear(); // Limpiar el título de la page
        cy.get('textarea[placeholder="Page title"]').type(nuevoTituloPage); // Ingresar un nuevo título de la page
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/editPageNewTitle`);
        const nuevoContenidoPage = faker.lorem.paragraph(3); // Generar un nuevo contenido de la page
        cy.get('div[data-placeholder="Begin writing your page..."]').clear(); // Limpiar el contenido de la page
        cy.get('div[data-placeholder="Begin writing your page..."]').type(nuevoContenidoPage); // Ingresar un nuevo contenido de la page
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/editPageNewDescription`);
    }

    updatePage(tituloPage, nombreEscenario) {
        cy.contains('Update').click();
        cy.log(`La página "${tituloPage}" ha sido actualizado correctamente.`);
        ScreenshotPage.takeScreenshot('Page Tests', `${nombreEscenario}/editPageUpdate`);
        cy.wait(2000);
    }
    verifyPageUserName(userName){
        // Obtener el texto de todos los elementos y verificar que al menos uno este modificado
        cy.get('span.midgrey-l2')
        .first()
        .invoke('text')
        .should('eq', userName);        
    }
    closeNewPage(){
        cy.get('a[href="#/pages/"]').first().click(); //clic post para cerrar
        cy.wait(1000);
    }
    verifyPageDrawft(tituloPost) {
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/pages"); // Visitar los posts publicados
        cy.get('section.view-actions > div > div:nth-child(1) > div:nth-child(1)').click({force:true})  //selección de All pages        
        cy.contains('h3.gh-content-entry-title',tituloPost).should('exist');    
    }
    asignarTagPage(tagTitulo){                
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //click en panel lateral de settings
        cy.get('form > div:nth-child(3) > div > div:nth-child(1)')
            .click()
            .type(tagTitulo,{delay:200})  //click en el tag y type
        cy.get('ul.ember-power-select-options').first().click()
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //clic en panel lateral de settings
    }



}



export default new PageCreatePublish();

