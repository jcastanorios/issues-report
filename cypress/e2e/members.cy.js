import LoginGhost from "../support/login";

describe("Escenario para creación de un miembro de un blog", () => {
  const USER_GHOST = "wilderlopezm@gmail.com";
  const PASS_GHOST = "12345678901";
  let totalMembers=0;

  beforeEach(() => {
    
  });

  it("Primer caso diligenciar las credenciales correctas para poder acceder al dashboard de la aplicación", () => {
    LoginGhost.visit();
    LoginGhost.diligenciarEmail(USER_GHOST);
    LoginGhost.diligenciarPassword(PASS_GHOST);
    LoginGhost.clickBotonSignIn();

    cy.request("https://ghost-aaej.onrender.com/ghost/#/dashboard").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
    cy.wait(2000);
    cy.get('a[id="ember28"]').click();
    cy.request("https://ghost-aaej.onrender.com/ghost/#/members").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );

    cy.get("h2.gh-canvas-title")
      .invoke("text")
      .then((text) => {
        cy.get("h2.gh-canvas-title")
          .invoke("attr", "class")
          .then((clase) => {
            expect(text.trim()).to.eq("Members");
          });
      });

    cy.wait(1000);
    cy.get("div.gh-nav-top")
      .find("a.active.ember-view")
      .find("span.gh-nav-member-count")
      .invoke("text")
      .then((text) => {
        totalMembers=text
        console.log('total miembros al inicio', totalMembers)
      });

    cy.get("div.view-actions-top-row")
      .find("a.ember-view.gh-btn.gh-btn-primary")
      .contains("span", "New member")
      .click();

    cy.get('input[id="member-name"]').blur().type("Juan Gonzalo Castaño");

    cy.get("div.gh-canvas-header")
      .find("header.gh-canvas-header-content")
      .find("section.view-actions")
      .find("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view")
      .find("span")
      .contains("Save")
      .click();

    cy.get("div.gh-canvas-header")
      .find("header.gh-canvas-header-content")
      .find("section.view-actions")
      .find("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view")
      .find("span")
      .contains("Retry")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("Retry");
      });

    cy.wait(3000);
    cy.get("div.form-group.max-width.error.ember-view")
      .find("input.ember-text-field.gh-input.ember-view")
      .type("estudiante"+totalMembers+"@email.edu.co");

    cy.get("div.gh-canvas-header")
      .find("header.gh-canvas-header-content")
      .find("section.view-actions")
      .find("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view")
      .find("span")
      .contains("Retry")
      .click();

    cy.wait(3000);
    cy.get("div.gh-nav-top")
      .find("a.active.ember-view")
      .find("span.gh-nav-member-count")
      .invoke("text")
      .then((text) => {
        expect(Number(totalMembers)+1).to.eq(Number(text));
      });
  });
});
