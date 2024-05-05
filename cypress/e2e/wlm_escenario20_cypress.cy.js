describe('Escenario #20 - Crear un tag, y asignarle a un page', () => {
    const pageTitulo = 'Pagina de prueba WLM 00:03';
    const tagTitulo = "Tag nuevo BS 00_03";
    beforeEach(()=>{
        cy.visit('https://ghost-aaej.onrender.com/ghost/#signin')
         cy.wait(3000)
         cy.get('input[name=identification]').type('wilderlopezm@gmail.com')
         cy.get('input[name=password]').type('12345678901')
         cy.get('button[type=submit]').click()
         cy.wait(2000)
     })
     it('Crear un nuevo tag',() => {
        cy.get('section > div > ul:nth-child(2) > li:nth-child(3)').click() //click en Tag
        cy.get('a.ember-view.gh-btn.gh-btn-primary').click()  //click en New tag
        cy.get('input#tag-name.gh-input').type(tagTitulo) //nombre
        cy.get('input[placeholder=15171A]').type('7a0000') //color rojo
        cy.get('textarea#tag-description.gh-input.gh-tag-details-textarea').type(tagTitulo+' Prueba') //description
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click()//save
     })
     it('Crear un nuevo page', () => {
        cy.get('a[href="#/pages/"]').first().click(); //clic en la lista de page
        cy.get('a[href="#/editor/page/"]').click()  //click en New page
        cy.get('textarea.gh-editor-title').type(pageTitulo)
        //Asignado tag
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //click en panel lateral de settings
        cy.get('form > div:nth-child(3) > div > div:nth-child(1)')
            .click()
            .type(tagTitulo,{delay:200})  //click en el tag y type
        cy.get('ul.ember-power-select-options').first().click()
        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon').click() //clic en panel lateral de settings
        cy.wait(2000);
        cy.get('button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger').click(); //Click en botón pubish
        cy.get('button.gh-btn.gh-btn-black.gh-btn-large').click(); //Click en continue, final review
        cy.get('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view').click(); //click en publish post, right now
        cy.wait(1000);
        cy.contains(pageTitulo).should('exist'); //Verificar si existe lo creado
    })
});   


 