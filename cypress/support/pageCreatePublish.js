import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import { Constantes } from "../support/constantes";
import ScreenshotPage from "../support/screenshot"; // Importar módulo para capturar pantallas

class PageCreatePublish {
    visit(nombreEscenario) {
        this.visitPages("");
        ScreenshotPage.takeScreenshot(nombreEscenario, 'pagePages');
    }

    clickNewPage(nombreEscenario) {
         cy.contains("New page").click();
         ScreenshotPage.takeScreenshot(nombreEscenario, 'newPage');
    }

    selectImageForPage(tituloPage, nombreEscenario) {
        cy.get('path[d="M83.86 54.15v34.13H38.57V54.15H0v68.26h122.43V54.15H83.86zM38.57 0h45.3v34.13h-45.3z"]').click({ force: true });
        ScreenshotPage.takeScreenshot(nombreEscenario, 'addImage');
        cy.get('input[name="searchKeyword"]').type(tituloPage);
        ScreenshotPage.takeScreenshot(nombreEscenario, 'imageSearch');
        cy.get('a.gh-unsplash-button').contains('Insert image').click();
    }

    enterPageDetails(tituloPage, nombreEscenario, contenidoPage) {
        cy.get('textarea[placeholder="Page title"]').type(tituloPage);
        if (contenidoPage == null){
            contenidoPage = faker.lorem.paragraph(3);
        }
        //const contenidoPage = faker.lorem.paragraph(3);
        cy.get('div[data-placeholder="Begin writing your page..."]').type(contenidoPage);
        ScreenshotPage.takeScreenshot(nombreEscenario, 'pageDetails');
    }

    publishPage(tituloPage, nombreEscenario) {
        if(Constantes.VERSION_GHOST==5){
            cy.get('button.gh-btn-editor.darkgrey.gh-publish-trigger').contains('Publish').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'publishPage 1');
            cy.get('div.gh-publish-setting-trigger').contains('Right now').should('be.visible');
            ScreenshotPage.takeScreenshot(nombreEscenario, 'publishPageRightNow 2');
            cy.get('div.gh-publish-cta').contains('Continue, final review →').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'publishPageFinalReview 3');
            cy.get('div.gh-publish-title').contains('Ready, set, publish.').should('be.visible');
            cy.get('div.gh-publish-title').contains('Share it with the world.').should('be.visible');
            cy.get('button[class="gh-btn gh-btn-large gh-btn-pulse ember-view"]').contains('Publish page, right now').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'publishPageFinal 4');
            //cy.contains(tituloPage).should('be.visible'); // Verificar que el page publicado esté visible
            cy.log(`La página "${tituloPage}" ha sido publicada correctamente.`);
            cy.wait(2000);
            cy.get('button[class="gh-back-to-editor"]').contains('Back to editor').click();
        }
        else if(Constantes.VERSION_GHOST==4){
            cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.gh-publishmenu-trigger').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'publishPage 1');
            ScreenshotPage.takeScreenshot(nombreEscenario, 'publishPageRightNow 2');
            cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'publishPageFinalReview 3');
            cy.get('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'publishPageFinal 4');            
        }
    }

    verifyPagePublished(tituloPage, nombreEscenario) {
        this.visitPages("?type=published");
        //cy.visit("https://ghost-aaej.onrender.com/ghost/#/pages?type=published"); // Visitar pages publicadas
        ScreenshotPage.takeScreenshot(nombreEscenario, 'checkPagePublication');
        cy.get('h3.gh-content-entry-title').contains(tituloPage).should('be.visible');
        cy.log(`La página "${tituloPage}" ha sido verificado en la sección de publicados.`);
    }

    schedulePage(tituloPage, nombreEscenario) {
        if(Constantes.VERSION_GHOST==5){
            cy.get('button.gh-btn-editor.darkgrey.gh-publish-trigger').contains('Publish').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'schedulePublishPage 1');
            cy.get('div.gh-publish-setting-trigger').contains('Right now').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'schedulePublishPage 2');
            cy.contains('Schedule for later').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'schedulePublishPage 3');
            cy.get('.gh-date-time-picker-date input').clear().type('2999-12-31'); // Escribir la fecha en el campo
            cy.get('div.gh-publish-cta').contains('Continue, final review →').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'schedulePublishPage 4');
            cy.get('div.gh-publish-title').contains('Ready, set, publish.').should('be.visible');
            cy.get('div.gh-publish-title').contains('Share it with the world.').should('be.visible');
            cy.get('button[class="gh-btn gh-btn-large gh-btn-pulse ember-view"]').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'schedulePublishPage 5');
            cy.contains(tituloPage).should('be.visible'); // Verificar que el page publicado esté visible
            cy.log(`La página "${tituloPage}" ha sido programada correctamente.`);
            cy.wait(2000);
        }
        else if(Constantes.VERSION_GHOST==4){
            cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.gh-publishmenu-trigger').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'schedulePublishPage 1');
            cy.contains('Schedule it for later').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'schedulePublishPage 2');
            cy.get('.gh-date-time-picker-date input').clear().type('2999-12-31');
            ScreenshotPage.takeScreenshot(nombreEscenario, 'schedulePublishPage 3');
            cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'schedulePublishPage 4');
            cy.get('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view').click();
            ScreenshotPage.takeScreenshot(nombreEscenario, 'schedulePublishPage 5');    
        }
    }

    verifyPageScheduled(tituloPage, nombreEscenario) {
        this.visitPages("?type=scheduled");
        //cy.visit("https://ghost-aaej.onrender.com/ghost/#/pages?type=scheduled"); // Visitar pages programadas
        ScreenshotPage.takeScreenshot(nombreEscenario, 'checkSchedulePublishPage');
        cy.get('h3.gh-content-entry-title');
        cy.log(`La página "${tituloPage}" ha sido verificado en la sección de programados.`);
    }

    editPage(tituloPage, nombreEscenario){
        this.visitPages("?type=published");
        //cy.visit("https://ghost-aaej.onrender.com/ghost/#/pages?type=published"); // Visitar las pages publicados
        cy.get('h3.gh-content-entry-title').contains(tituloPage).click(); // Hacer clic en la page a editar
        ScreenshotPage.takeScreenshot(nombreEscenario, 'editPage');
    }

    editPageDetails(nuevoTituloPage, nombreEscenario){
        cy.get('textarea[placeholder="Page title"]').clear(); // Limpiar el título de la page
        cy.get('textarea[placeholder="Page title"]').type(nuevoTituloPage); // Ingresar un nuevo título de la page
        ScreenshotPage.takeScreenshot(nombreEscenario, 'editPageNewTitle');
        const nuevoContenidoPage = faker.lorem.paragraph(3); // Generar un nuevo contenido de la page
        cy.get('div[data-placeholder="Begin writing your page..."]').clear(); // Limpiar el contenido de la page
        cy.get('div[data-placeholder="Begin writing your page..."]').type(nuevoContenidoPage); // Ingresar un nuevo contenido de la page
        ScreenshotPage.takeScreenshot(nombreEscenario, 'editPageNewDescription');
    }

    updatePage(tituloPage, nombreEscenario) {
        cy.contains('Update').click();
        cy.log(`La página "${tituloPage}" ha sido actualizado correctamente.`);
        ScreenshotPage.takeScreenshot(nombreEscenario, 'editPageUpdate');
        cy.wait(2000);
    }
    verifyPageUserName(userName, nombreEscenario){
        // Obtener el texto de todos los elementos y verificar que al menos uno este modificado
        cy.get('span.midgrey-l2')
        .first()
        .invoke('text')
        .should('eq', userName);        
        ScreenshotPage.takeScreenshot(nombreEscenario, 'verfyPageUserName');
    }
    closeNewPage(nombreEscenario){
        cy.get('a[href="#/pages/"]').first().click(); //clic post para cerrar
        cy.wait(1000);
        ScreenshotPage.takeScreenshot(nombreEscenario, 'closeNewPage');
    }
    verifyPageDrawft(tituloPost, nombreEscenario) {
        this.visitPages("");
        ScreenshotPage.takeScreenshot(nombreEscenario, 'verfyPageDrawf 1');
        //cy.visit("https://ghost-aaej.onrender.com/ghost/#/pages"); // Visitar los posts publicados
        cy.get('section.view-actions > div > div:nth-child(1) > div:nth-child(1)').click({force:true})  //selección de All pages        
        cy.contains('h3.gh-content-entry-title',tituloPost).should('exist');    
        ScreenshotPage.takeScreenshot(nombreEscenario, 'verfyPageDrawf 2');
    }
    asignarTagPage(tagTitulo, nombreEscenario){                
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //click en panel lateral de settings
        ScreenshotPage.takeScreenshot(nombreEscenario, 'asignafrTagPage 1');
        cy.get('form > div:nth-child(3) > div > div:nth-child(1)')
            .click()
            .type(tagTitulo,{delay:200})  //click en el tag y type
        cy.get('ul.ember-power-select-options').first().click()
        ScreenshotPage.takeScreenshot(nombreEscenario, 'verfyPageDrawf 2');
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //clic en panel lateral de settings
        ScreenshotPage.takeScreenshot(nombreEscenario, 'verfyPageDrawf 3');
    }

    visitPages(tipo){
        if (Constantes.VERSION_GHOST==5){cy.visit("https://ghost-aaej.onrender.com/ghost/#/pages"+tipo);}
        else if(Constantes.VERSION_GHOST==4){cy.visit("https://ghost-t6x4.onrender.com/ghost/#/pages"+tipo)}
    }

}



export default new PageCreatePublish();

