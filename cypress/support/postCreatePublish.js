import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import { Constantes } from "../support/constantes";

class PostCreatePublish {
    visit() {

        this.visitPost("");
        //cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts");
    }

    clickNewPost() {
        if(Constantes.VERSION_GHOST==5){
            cy.contains("New post").click();
        }
        else if(Constantes.VERSION_GHOST==4){
            cy.get('section > div > ul:nth-child(2) > li:nth-child(1)').click() //click en post
            cy.get('a.ember-view.gh-btn.gh-btn-primary').click()  //click en New Post    
        }
    }

    selectImageForPost(tituloPost) {
        cy.get('path[d="M83.86 54.15v34.13H38.57V54.15H0v68.26h122.43V54.15H83.86zM38.57 0h45.3v34.13h-45.3z"]').click({ force: true });
        cy.get('input[name="searchKeyword"]').type(tituloPost);
        if (Constantes.VERSION_GHOST ==5){
            cy.get('a.gh-unsplash-button').contains('Insert image').click();
        }
        else if(Constantes.VERSION_GHOST==4){
            cy.get('a.gh-unsplash-button').contains('Insert image').click();
        }
    }

    enterPostDetails(tituloPost) {
        cy.get('textarea[placeholder="Post title"]').type(tituloPost);
        const contenidoPost = faker.lorem.paragraph(3);
        cy.get('div[data-placeholder="Begin writing your post..."]').type(contenidoPost);
    }

    publishPost(tituloPost) {
        //ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.gh-publishmenu-trigger
        if(Constantes.VERSION_GHOST==5){
            cy.get('button.gh-btn-editor.darkgrey.gh-publish-trigger').contains('Publish').click();
            cy.get('div.gh-publish-setting-trigger').contains('Right now').should('be.visible');
            cy.get('div.gh-publish-cta').contains('Continue, final review →').click();
            cy.get('div.gh-publish-title').contains('Ready, set, publish.').should('be.visible');
            cy.get('div.gh-publish-title').contains('Share it with the world.').should('be.visible');
            cy.get('button[class="gh-btn gh-btn-large gh-btn-pulse ember-view"]').contains('Publish post, right now').click();
            cy.contains(tituloPost).should('be.visible'); // Verificar que el post publicado esté visible
            cy.log(`El post "${tituloPost}" ha sido publicado correctamente.`);
            cy.wait(2000);
            cy.get('button[class="gh-back-to-editor"]').contains('Back to editor').click();
    
        }
        else if(Constantes.VERSION_GHOST==4){
            cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.gh-publishmenu-trigger').click();
            cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click();
            cy.get('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view').click();            
        }
    }

    verifyPostPublished(tituloPost) {
        this.visitPost("?type=published");
        //cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts?type=published"); // Visitar los posts publicados        
        cy.get('h3.gh-content-entry-title').contains(tituloPost).should('be.visible');
        cy.log(`El post "${tituloPost}" ha sido verificado en la pagina de publicados.`);
    }

    clearDetailsPost(){
        cy.get('textarea[placeholder="Post title"]').clear(); // Limpiar el título del post
        cy.log(`El título del post ha sido limpiado.`);
        cy.get('div[data-placeholder="Begin writing your post..."]').clear(); // Limpiar el contenido del post
    }

    editPost(tituloPost){
        this.visitPost("?type=published");
        //cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts?type=published"); // Visitar los posts publicados
        cy.get('h3.gh-content-entry-title').contains(tituloPost).click(); // Hacer clic en el post a editar
    }

    editPostDetails(nuevoTituloPost){
        cy.get('textarea[placeholder="Post title"]').clear(); // Limpiar el título del post
        cy.get('textarea[placeholder="Post title"]').type(nuevoTituloPost); // Ingresar un nuevo título de post
        const nuevoContenidoPost = faker.lorem.paragraph(3); // Generar un nuevo contenido de post
        cy.get('div[data-placeholder="Begin writing your post..."]').clear(); // Limpiar el contenido del post
        cy.get('div[data-placeholder="Begin writing your post..."]').type(nuevoContenidoPost); // Ingresar un nuevo contenido de post
    }

    updatePost(tituloPost) {
        cy.contains('Update').click();
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
        this.visitPost("?type=draft");
        //cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts?type=draft"); // Visitar los posts publicados
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
    visitPost(tipo){
        if (Constantes.VERSION_GHOST==5){cy.visit("https://ghost-aaej.onrender.com/ghost/#/posts"+tipo);}
        else if(Constantes.VERSION_GHOST==4){cy.visit("https://ghost-t6x4.onrender.com/ghost/#/posts"+tipo)}
    }
}
export default new PostCreatePublish();

