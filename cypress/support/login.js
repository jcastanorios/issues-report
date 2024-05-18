import { Constantes } from "../support/constantes";
const LoginGhost = {
    visit() {
      let url;
      if (Constantes.VERSION_GHOST==4){
        url ="https://ghost-t6x4.onrender.com/ghost/#/signin"
      }else if(Constantes.VERSION_GHOST==5){
        url ="https://ghost-aaej.onrender.com/ghost/#/signin";
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
  };
  
  export default LoginGhost;