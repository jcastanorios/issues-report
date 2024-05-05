describe('Escenario #17 - Crear un page, Modificar staff y validar los cambios en page', () => {
    const postTitulo = 'Pagina de prueba WLM 19:05';
    const UserNombre='Wilder Page';
    beforeEach(()=>{
        cy.visit('https://ghost-aaej.onrender.com/ghost/#signin')
         cy.wait(3000)
         cy.get('input[name=identification]').type('wilderlopezm@gmail.com')
         cy.get('input[name=password]').type('12345678901')
         cy.get('button[type=submit]').click()
         cy.wait(2000)
     })
    it('Crear un nuevo page', () => {
        //cy.get('section > div > ul:nth-child(3) > li:nth-child(1)').click() //click en page
        cy.get('a[href="#/pages/"]').first().click(); //clic en la lista de page
        cy.get('a[href="#/editor/page/"]').click()  //click en New page
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
        cy.get('a[href="#/pages/"]').first().click(); //clic en la lista de pages
        // Obtener el texto de todos los elementos y verificar que al menos uno sea "WLM"
        cy.get('span.midgrey-l2')
        .first()
        .invoke('text')
        .should('eq', UserNombre);
    })

});   


 