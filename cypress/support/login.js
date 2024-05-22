
const LoginGhost = {
    visit() {
      let url = "https://ghost-aaej.onrender.com/ghost/#/signin";
      if (!!Cypress.env('VERSION_GHOST')){
        url ="https://ghost-t6x4.onrender.com/ghost/#/signin"
      } 
      cy.visit(url);
      cy.wait(5000);
    },
  
    diligenciarEmail(email) {
      //cy.get('input[id="ember6"]').focus().type(email);
      cy.get('input[name=identification]').type(email);
    },
  
    diligenciarPassword(password) {
      //cy.get('input[id="ember8"]').focus().type(password);
      cy.get('input[name=password]').type(password);
    },
  
    clickBotonSignIn() {
      cy.get("button").eq(1).focus().click();
      cy.wait(8000);
      //cy.get('button[type=submit]').click()
    },
  
    errorLogin() {
      return cy.get("#ember10 > span").invoke("text").then((text) => text.trim());
    },

    setViewPort(){
      if(!!Cypress.env('PRESET_DEVICE')){
        cy.viewport(Cypress.env('PRESET_DEVICE'));
      }
    }
  };
  
  export default LoginGhost;