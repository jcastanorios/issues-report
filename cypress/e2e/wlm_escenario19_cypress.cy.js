describe('Escenario #19 - Crear un page, y verificar si existe en la lista allpage', () => {
    const pageTitulo = 'Pagina de prueba WLM 20:23';
    beforeEach(()=>{
        cy.visit('https://ghost-aaej.onrender.com/ghost/#signin')
         cy.wait(3000)
         cy.get('input[name=identification]').type('wilderlopezm@gmail.com')
         cy.get('input[name=password]').type('12345678901')
         cy.get('button[type=submit]').click()
         cy.wait(2000)
     })
    it('Crear un nuevo page', () => {
        cy.get('a[href="#/pages/"]').first().click(); //clic en la lista de page
        cy.get('a[href="#/editor/page/"]').click()  //click en New page
        cy.get('textarea.gh-editor-title').type(pageTitulo)
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //click en panel lateral de settings
        cy.wait(2000);
        cy.get('a[href="#/pages/"]').first().click(); //clic pages para cerrar
        cy.wait(1000);
        cy.get('section.view-container.content-list > div:nth-child(1) > ol > li')
        .find('h3.gh-content-entry-title')
        .contains(pageTitulo)
        .should('exist')
    })
    it('Verificar que exista en la lista allpage', () => {
        cy.get('a[href="#/pages/"]').first().click(); //clic en la lista de pages
        cy.get('section.view-actions > div > div:nth-child(1) > div:nth-child(1)').click({force:true})  //selección de All pages        
        cy.contains('h3.gh-content-entry-title', pageTitulo).should('exist');
    })

});   


 