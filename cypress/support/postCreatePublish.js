import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import ScreenshotPage from "../support/screenshot"; // Importar módulo para capturar pantallas

class PostCreatePublish {
    visit(nombreEscenario) {
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts");
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/pagePosts`);
    }

    clickNewPost(nombreEscenario) {
        cy.contains("New post").click();
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/newPost`);
    }

    selectImageForPost(tituloPost, nombreEscenario) {
        cy.get('path[d="M83.86 54.15v34.13H38.57V54.15H0v68.26h122.43V54.15H83.86zM38.57 0h45.3v34.13h-45.3z"]').click({ force: true });
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/addImage`);
        cy.get('input[name="searchKeyword"]').type(tituloPost);
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/imageSearch`);
        cy.get('a.gh-unsplash-button').contains('Insert image').click();
    }

    enterPostDetails(tituloPost, nombreEscenario) {
        cy.get('textarea[placeholder="Post title"]').type(tituloPost);
        const contenidoPost = faker.lorem.paragraph(3);
        cy.get('div[data-placeholder="Begin writing your post..."]').type(contenidoPost);
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/postDetails`);
    }

    publishPost(tituloPost,nombreEscenario) {
        cy.get('button.gh-btn-editor.darkgrey.gh-publish-trigger').contains('Publish').click();
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/publishPost 1`);
        cy.get('div.gh-publish-setting-trigger').contains('Right now');
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/publishPostRightNow 2`);
        cy.get('div.gh-publish-cta').contains('Continue, final review →').click();
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/publishPostFinalReview 3`);
        cy.get('div.gh-publish-title').contains('Ready, set, publish.').should('be.visible');
        cy.get('div.gh-publish-title').contains('Share it with the world.').should('be.visible');
        cy.get('button[class="gh-btn gh-btn-large gh-btn-pulse ember-view"]').contains('Publish post, right now').click();
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/publishPostFinal 4`);
        cy.contains(tituloPost).should('be.visible'); // Verificar que el post publicado esté visible
        cy.log(`El post "${tituloPost}" ha sido publicado correctamente.`);
        cy.wait(2000);
        cy.get('button[class="gh-back-to-editor"]').contains('Back to editor').click();
    }

    verifyPostPublished(tituloPost, nombreEscenario) {
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts?type=published"); // Visitar los posts publicados
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/checkPostPublication`);
        cy.get('h3.gh-content-entry-title').contains(tituloPost).should('be.visible');
        cy.log(`El post "${tituloPost}" ha sido verificado en la pagina de publicados.`);
    }

    clearDetailsPost(nombreEscenario){
        cy.get('textarea[placeholder="Post title"]').clear(); // Limpiar el título del post
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/clearPostTitle`);
        cy.log(`El título del post ha sido limpiado.`);
        cy.get('div[data-placeholder="Begin writing your post..."]').clear(); // Limpiar el contenido del post
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/clearPostDescription`);
    }

    editPost(tituloPost, nombreEscenario){
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts?type=published"); // Visitar los posts publicados
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/postPublished`);
        cy.get('h3.gh-content-entry-title').contains(tituloPost).click(); // Hacer clic en el post a editar
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/editPost`);
    }

    editPostDetails(nuevoTituloPost, nombreEscenario){
        cy.get('textarea[placeholder="Post title"]').clear(); // Limpiar el título del post
        cy.get('textarea[placeholder="Post title"]').type(nuevoTituloPost); // Ingresar un nuevo título de post
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/editPostNewTitle`);
        const nuevoContenidoPost = faker.lorem.paragraph(3); // Generar un nuevo contenido de post
        cy.get('div[data-placeholder="Begin writing your post..."]').clear(); // Limpiar el contenido del post
        cy.get('div[data-placeholder="Begin writing your post..."]').type(nuevoContenidoPost); // Ingresar un nuevo contenido de post
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/editPostNewDescription`);
    }

    updatePost(tituloPost, nombreEscenario) {
        cy.contains('Update').click();
        ScreenshotPage.takeScreenshot('Post Tests', `${nombreEscenario}/editPostUpdate`);
        cy.log(`El post "${tituloPost}" ha sido actualizado correctamente.`);
        cy.wait(2000);
    }
    verifyPostUserName(userName){
        // Obtener el texto de todos los elementos y verificar que al menos uno sea "WLM"
        cy.get('span.midgrey-l2')
        .first()
        .invoke('text')
        .should('eq', userName);        
    }
    closeNewPost(){
        cy.get('a[href="#/posts/"]').first().click(); //clic post para cerrar
        cy.wait(1000);
    }
    verifyPostDrawft(tituloPost) {
        cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts?type=draft"); // Visitar los posts publicados
        cy.get('h3.gh-content-entry-title').contains(tituloPost).should('be.visible');
        cy.log(`El post "${tituloPost}" ha sido verificado en la pagina de publicados.`);
    }

    asignarTagPost(tagTitulo){                
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //click en panel lateral de settings
        cy.get('form > div:nth-child(3) > div > div:nth-child(1)')
            .click()
            .type(tagTitulo,{delay:200})  //click en el tag y type
        cy.get('ul.ember-power-select-options').first().click()
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //clic en panel lateral de settings
    }
}


export default new PostCreatePublish();

