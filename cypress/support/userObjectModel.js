class UserObjectModel{
    settingUser(){
        cy.get('a[href="#/settings/"]').click(); //Clic en la herramienta
        cy.get('a[href="#/settings/staff/"]').click(); //Clic en Staff
        cy.get('a[href="#/settings/staff/wilder/"]').click(); //Clic en Wilder
    }
    enterChangeUser(UserName){
        cy.get('#user-name').clear().type(UserName, { force: true }); //Cambiar el nombre
        cy.wait(1000);
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click(); //Click en save
    }
    verifyChangeUserName(UserName){
        cy.get('#user-name').should('have.value', UserName); //Verificar Lo cambiado
        cy.wait(1000);
    }
}
export default new UserObjectModel();