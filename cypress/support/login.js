const LoginGhost = {
    visit() {
      cy.visit("https://ghost-aaej.onrender.com/ghost/#/signin");
      cy.wait(7000);
    },
  
    diligenciarEmail(email) {
      cy.get('input[id="ember6"]').focus().type(email);
    },
  
    diligenciarPassword(password) {
      cy.get('input[id="ember8"]').focus().type(password);
    },
  
    clickBotonSignIn() {
      cy.get("button").eq(1).focus().click();
      cy.wait(8000);
    },
  
    errorLogin() {
      return cy.get("#ember10 > span").invoke("text").then((text) => text.trim());
    },
  };
  
  export default LoginGhost;