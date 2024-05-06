describe('Escenario #18 - Crear un post, y verificar que este publicado en borrador', () => {
    const postTitulo = 'Post de prueba WLM 00:36';
    beforeEach(()=>{
        cy.visit('https://ghost-aaej.onrender.com/ghost/#signin')
         cy.wait(3000)
         cy.get('input[name=identification]').type('wilderlopezm@gmail.com')
         cy.get('input[name=password]').type('12345678901')
         cy.get('button[type=submit]').click()
         cy.wait(2000)
     })
     it('Crear un nuevo post', () => {
        cy.get('section > div > ul:nth-child(2) > li:nth-child(1)').click() //click en post
        cy.get('a.ember-view.gh-btn.gh-btn-primary').click()  //click en New Post
        cy.get('textarea.gh-editor-title').type(postTitulo)
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //click en panel lateral de settings
        cy.wait(2000);
        cy.get('a[href="#/posts/"]').first().click(); //clic post para cerrar
        cy.wait(1000);
        cy.get('section.view-container.content-list > div:nth-child(1) > ol > li')
        .find('h3.gh-content-entry-title')
        .contains(postTitulo)
        .should('exist')

    })
    it('Verificar que este en la lista de publicados', () => {
        cy.get('a[href="#/posts/?type=draft"]').first().click(); //clic en la lista de post
        cy.get('section.view-actions > div > div:nth-child(1) > div:nth-child(1)').click({force:true})  //selección de All post        
        cy.get('section.view-container.content-list > div:nth-child(1) > ol > li')
            .find('h3.gh-content-entry-title')
            .contains(postTitulo)
            .should('exist')
    })

});   


 