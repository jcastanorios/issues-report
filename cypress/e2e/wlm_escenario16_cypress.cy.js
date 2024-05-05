describe('Escenario #16 - Crear un post, Modificar staff y validar los cambios en Post', () => {
    const postTitulo = 'Prueba wlm 15:22';
    const UserNombre='Wilder LM';
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
        cy.get('button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger').click(); //Click en botón pubish
        cy.get('button.gh-btn.gh-btn-black.gh-btn-large').click(); //Click en continue, final review
        cy.get('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click(); //click en publish post, right now
        cy.wait(1000);
        cy.contains(postTitulo).should('exist'); //Verificaer si existe lo creado
    })
    it('Modificar el nombre del usuario', () => {
        cy.get('a[href="#/settings/"]').click(); //Clic en la herramienta
        cy.get('a[href="#/settings/staff/"]').click(); //Clic en Staff
        cy.get('a[href="#/settings/staff/wilder/"]').click(); //Clic en Wilder
        cy.get('#user-name').clear().type(UserNombre, { force: true }); //Cambiar el nombre
        cy.wait(1000);
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click(); //Click en save
        cy.wait(1000);
        cy.get('#user-name').should('have.value', UserNombre); //Verificar Lo cambiado
        
    })
    it('Verificar cambio de nombre de usuario en listado de post', () => {
        cy.get('a[href="#/posts/"]').first().click(); //clic en la lista de post
        // Obtener el texto de todos los elementos y verificar que al menos uno sea "WLM"
        cy.get('span.midgrey-l2')
        .first()
        .invoke('text')
        .should('eq', UserNombre);
    })

});   


 