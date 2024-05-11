import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import { Constantes } from "../support/constantes";
import ScreenshotPage from "../support/screenshot"; // Importar módulo para capturar pantallas

describe('Testing Ghost', () => {
    let tituloTag;
    beforeEach(()=>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Uncaught exception', err);
            return false;
        });
        visitGhost("#signin")
        cy.wait(3000)
        cy.get('input[name=identification]').type('wilderlopezm@gmail.com')
        cy.get('input[name=password]').type('12345678901')
        ScreenshotPage.takeScreenshot('Login', `Login/Login`)
        cy.get('button[type=submit]').click()
                
    })
    
    it('Crear y validar nuevo tag', () => {
        let nombreEscenario = "ESC6_CreateTag"
        visitGhost("#/tags")
        cy.wait(2000)
        ScreenshotPage.takeScreenshot('Tags Test', `${nombreEscenario}/Tags`)
        cy.get('a.ember-view.gh-btn.gh-btn-primary').click()  //click en New tag
        cy.wait(1000)
        ScreenshotPage.takeScreenshot('Tags Test', `${nombreEscenario}/NewTags`)
        tituloTag = faker.commerce.isbn();
        cy.get('input#tag-name.gh-input').type(tituloTag) //nombre
        const textareaTag = faker.lorem.paragraph(3);
        cy.get('textarea#tag-description.gh-input.gh-tag-details-textarea').type(textareaTag) //description
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click() //save
        cy.get('a.ember-view.gh-secondary-action.gh-nav-new-post')
            .should('exist')
            .click() //click en + post
        cy.wait(1000)
        ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/NewPost`)
        const tituloPost = faker.commerce.productName();
        cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view').type(tituloPost) //agregar título
        const textareaPost = faker.lorem.paragraph(3);
        cy.get('div.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(textareaPost)  //agregar parrafo a post
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //click en panel lateral de settings
        cy.wait(1000)
        ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/SettingsPost`)
        cy.get('form > div:nth-child(3) > div > div:nth-child(1)')
                .click()
                .type(tituloTag,{delay:200})  //click en el tag y type
        cy.get('ul.ember-power-select-options').first().click()
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //clic en panel lateral de settings
        if(Constantes.VERSION_GHOST==5){
            cy.get('button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger')
                .should('exist')
                .click()  //botón publish
                cy.wait(1000)
                ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/PublishButton`)
            cy.get('button.gh-btn.gh-btn-black.gh-btn-large')
                .should('exist')
                .click() //botón "continue"
                cy.wait(1000)
                ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/ContinuePublishButton`)
            cy.get('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view')
                .should('exist')
                .click()  //click en publicar de una vez
                cy.wait(1000)
                ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/PublishRightNowButton`)
        }
        else if(Constantes.VERSION_GHOST==4){
            cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.gh-publishmenu-trigger').click();//botón publish
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/PublishButton`)
            cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click(); //botón "continue"
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/ContinuePublishButton`)
            cy.get('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view').click();//click en publicar de una vez 
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/PublishRightNowButton`)               
        }
        if(Constantes.VERSION_GHOST==5){
            cy.get('button.gh-back-to-editor')
                .should('exist')
                .click()  //back to editor
            cy.get('a.ember-view.gh-btn-editor.gh-editor-back-button').click()  //click en post regresar a dashboard
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/BackToPost`) 
        }
        else if(Constantes.VERSION_GHOST==4){
            visitGhost("#/posts");
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/BackToPost`) 
        }
    })
 
    it('Editar tag y validar', () =>{
        let nombreEscenario = "ESC7_EditTag"
        let tituloTag2=faker.commerce.productName();
        //cy.get('section > div > ul:nth-child(2) > li:nth-child(3)').click() //click en Tag
        visitGhost("#/tags")
        cy.wait(2000)
        ScreenshotPage.takeScreenshot('Tags Test', `${nombreEscenario}/Tags`) 
        //if(Constantes.VERSION_GHOST==4){
        cy.get('section.gh-canvas > section.view-container.content-list > ol > li')
            .find('h3.gh-tag-list-name')
            .contains(tituloTag)
            .click() // encontrar el tag
        // }
        // else if(Constantes.VERSION_GHOST==5){
        //}
        //cy.wait(2000)
        //cy.get('input#tag-name.gh-input')
        cy.wait(1000)
        ScreenshotPage.takeScreenshot('Tags Test', `${nombreEscenario}/NewTags`) 
        cy.get('input#tag-name.gh-input').type(tituloTag2) //nombre
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click() //save
        cy.get('section > div > ul:nth-child(2) > li:nth-child(3)').click() //click en Tag
        cy.wait(2000)
        cy.get('section.gh-canvas > section.view-container.content-list > ol > li')
             .find('h3.gh-tag-list-name')
             .should('exist', tituloTag2) // Verificar que el tag exista en la lista           
    })


    it('Crear, borrar tag y validar', () =>{
        let nombreEscenario = "ESC8_DeleteTag"
        visitGhost("#/tags")
        cy.wait(3000)
        ScreenshotPage.takeScreenshot('Tags Test', `${nombreEscenario}/Tags`) 
        cy.get('a.ember-view.gh-btn.gh-btn-primary').click()  //click en New tag
        cy.wait(1000)
        ScreenshotPage.takeScreenshot('Tags Test', `${nombreEscenario}/NewTags`) 
        cy.get('input#tag-name.gh-input').type('Abacol') //nombre
        cy.get('input[placeholder=15171A]').type('1bde28') //color verde
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click() //save
        cy.get('section > div > ul:nth-child(2) > li:nth-child(3)').click() //click en Tag
        if(Constantes.VERSION_GHOST==5){
            cy.get('section.gh-canvas > section.view-container.content-list > ol > li')
                .find('h3.gh-tag-list-name')
                .contains('Abacol')
                .click() // encontrar el tag
        }
        else if(Constantes.VERSION_GHOST==4){
            cy.get('h3.gh-tag-list-name').contains('Abacol').should('be.visible').click();
        }
        cy.wait(1000)  // esperar
        ScreenshotPage.takeScreenshot('Tags Test', `${nombreEscenario}/DeleteTags`)
        cy.get('button.gh-btn.gh-btn-red.gh-btn-icon').click()  // borrar tag
        cy.wait(1000)  // esperar
        ScreenshotPage.takeScreenshot('Tags Test', `${nombreEscenario}/ConfirmDeleteTags`)
        cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').click() //confirmar que borra
        cy.contains('h3.gh-tag-list-name','Abacol').should('not.exist');        
        cy.get('a[href="#/posts/"]').first().click() // clic en post en la barra lateral de navegacion
        cy.get('section.view-actions > div > div:nth-child(4) > div:nth-child(1)').click({force:true})  //selección de All tag
        cy.wait(1000)  // esperar
        ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/SelectAllTags`)
        if(Constantes.VERSION_GHOST==5){
            cy.get('body > div:nth-child(1) > div > ul.ember-power-select-options').should('not.exist', 'Abacol')  //seleccionar de la lista de all tag
        }
        else if(Constantes.VERSION_GHOST==4){
            cy.get('body > div:nth-child(1) > div > ul.ember-power-select-options').should('not.exist', 'Abacol')  //seleccionar de la lista de all tag                
        }
    })
    
    it('Unpublish un post', () =>{
        let nombreEscenario = "ESC9_UnpublishPost"
        cy.get('section > div > ul:nth-child(2) > li:nth-child(1)').click() //click en post
        cy.wait(2000)
        ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/Posts`)
        cy.get('a.ember-view.gh-btn.gh-btn-primary').click()  //click en New Post
        cy.wait(1000)
        ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/NewPosts`)
        const tituloPost = faker.commerce.productName();
        cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view').type(tituloPost) //agregar título
        const textareaPost = faker.lorem.paragraph(3);
        cy.get('div.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type(textareaPost)  //agregar parrafo a post
        if(Constantes.VERSION_GHOST==5){
            cy.get('button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger').click()  //botón publish
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/PublishButton`)
            cy.get('button.gh-btn.gh-btn-black.gh-btn-large').click() //botón "continue"
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/ContinuePublishButton`)
            cy.get('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click()  //click en publicar de una vez
            cy.wait(2000)
            cy.get('div.gh-publish-title').contains('Boom. It’s out there.').should('be.visible'); // validar que existe mensaje de publicación
            //ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/PublishRightNowButton`)
            cy.wait(2000)
            cy.get('button.gh-btn-editor.gh-publish-back-button').click()  //back to editor
        }
        else if(Constantes.VERSION_GHOST==4){
            cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.gh-publishmenu-trigger').click();//botón publish
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/PublishButton`)
            cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click(); //botón "continue"
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/ContinuePublishButton`)
            cy.get('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view').click();//click en publicar de una vez
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/PublishRightNowButton`)                            
        }
        if(Constantes.VERSION_GHOST==5){        
            cy.get('button.gh-btn.gh-btn-editor.darkgrey.gh-unpublish-trigger').click() // Unpublish un post
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/UnpublishButton`)
            cy.get('button.gh-revert-to-draft').click() // unpublish an revert to private draft
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/RevertToDraftPost`)
            cy.get('div.gh-editor-post-status')
                .contains('Draft')
                .contains('- Saved')
                //.should('exist')
                cy.get('a.ember-view.gh-btn-editor.gh-editor-back-button').click()  //click en post regresar a dashboard
        }
        else if(Constantes.VERSION_GHOST==4){
            cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.green.gh-publishmenu-trigger').click() // Unpublish un post
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/UnpublishButton`)
            cy.get('div.gh-publishmenu-radio-label').contains('Unpublished').click() // unpublish an revert to private draft
            cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click()
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Posts Test', `${nombreEscenario}/RevertToDraftPost`)
            cy.get('div.gh-editor-post-status')    
                .contains('Draft')
                .contains('- Saved')
            visitGhost("")
        }
        cy.get('a[href="#/posts/?type=draft"]').click()  // click en Drafts
        cy.wait(1000)
        ScreenshotPage.takeScreenshot('Drafts Test', `${nombreEscenario}/Drafts`)  
        if(Constantes.VERSION_GHOST==5){
            cy.get('section.view-container.content-list > div:nth-child(1) > ol > li')
             .find('h3.gh-content-entry-title')
             .contains(tituloPost)
             .should('exist') // Verificar que el post-draft exista en la lista*/
        }
        else if(Constantes.VERSION_GHOST==4){
            cy.contains('h3.gh-content-entry-title',tituloPost).should('exist');
        }
    })

    it('Crear draft de pages y publicarlo', () =>{
        let nombreEscenario = "ESC10_CreateTag"
        cy.get('a[href="#/pages/"]').click()  // hacer click sobre pages
        cy.wait(1000)
        ScreenshotPage.takeScreenshot('Pages Test', `${nombreEscenario}/Pages`)
        cy.get('a[href="#/editor/page/"]').click()  //crear nuevo page
        cy.wait(1000)
        ScreenshotPage.takeScreenshot('Pages Test', `${nombreEscenario}/NewPages`)
        const tituloPage = faker.commerce.isbn();
        cy.get('textarea[placeholder="Page title"]').type(tituloPage)  //título del page
        const textareaPage = faker.lorem.paragraph(3);
        cy.get('div.koenig-editor__editor-wrapper').type(textareaPage)  //parrafo del page
        cy.wait(2000)
        cy.get('a[href="#/pages/"]').click()  // click en Pages
        cy.wait(3000)
        cy.contains('h3.gh-content-entry-title',tituloPage).click();
        if(Constantes.VERSION_GHOST==5){ 
            cy.get('button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger').click()  //publicar la pagina
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Pages Test', `${nombreEscenario}/PublishButton`)
            cy.get('button.gh-btn.gh-btn-black.gh-btn-large').click() //Continuar con la publicación
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Pages Test', `${nombreEscenario}/ContinuePublishButton`)
            cy.get('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click() // publicar de una vez
            cy.get('div.gh-publish-title').contains('Boom. It’s out there.')
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Pages Test', `${nombreEscenario}/PublishRightNowButton`)
            cy.get('button.gh-back-to-editor').click() // volver a la pagina
            cy.get('a[href="#/pages/"]').click() // click en Pages para retornar a dashborad
        } 
        else if(Constantes.VERSION_GHOST==4){
            cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.gh-publishmenu-trigger').click();//botón publish
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Pages Test', `${nombreEscenario}/PublishButton`)
            cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click(); //botón "continue"
            cy.wait(1000)
            ScreenshotPage.takeScreenshot('Pages Test', `${nombreEscenario}/ContinuePublishButton`)
            cy.get('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view').click();//click en publicar de una vez
            visitGhost('#/pages')
        }
        cy.wait(2000)
        cy.get('section.view-actions > div > div:nth-child(1) > div:nth-child(1)').click({force:true})  //selección de All pages
        cy.wait(1000)
        ScreenshotPage.takeScreenshot('Pages Test', `${nombreEscenario}/SelectAllPages`)
        cy.get('body > div:nth-child(1) > div > ul.ember-power-select-options').contains('Published pages').click({force:true})  //seleccionar de la lista de all tag 
        cy.wait(2000)
        cy.contains('h3.gh-content-entry-title',tituloPage).should('exist');
    })
});
function visitGhost(tipo){
    if (Constantes.VERSION_GHOST==5){cy.visit("https://ghost-aaej.onrender.com/ghost/"+tipo)}
    else if(Constantes.VERSION_GHOST==4){cy.visit("https://ghost-t6x4.onrender.com/ghost/"+tipo)}
}
