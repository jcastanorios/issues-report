import LoginGhost from "../support/login";
import { faker } from "@faker-js/faker";
import { Constantes } from "../support/constantes";
import PageCreatePublish from "../support/pageCreatePublish"; // Importar el Page Object creado

describe("Escenario creación de una página para un blog y verificar su actualización en draft", () => {
  let totalMembers = 0;
  beforeEach(() => {
    LoginGhost.visit();
    LoginGhost.diligenciarEmail(Constantes.USER_GHOST);
    LoginGhost.diligenciarPassword(Constantes.PASS_GHOST);
    LoginGhost.clickBotonSignIn();
  });

  /**
   * Precondiciones: un usuario logueado en el sistema
   * Postcondiciones: una página creada en draft
   */
  it("Creación de una página para un blog y verificar su actualización en draft", () => {
    let tiutloPagina = crearPagina();
    cy.wait(9000);
    //verificar que el enlace presente el status de draft de la página
    cy.get("div.gh-editor-post-status")
      .invoke("text")
      .then((text) => {
        expect(text.replace(/\n|\s/g, "")).to.eq("Draft-Saved");
        cy.get("a.gh-btn-editor").contains("Pages").click();
      });
    cy.wait(10000);
    cy.get(
      "div.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger"
    )
      .find("span.ember-power-select-selected-item")
      .eq(4)
      .click();

    cy.get("li.ember-power-select-option").contains("Recently updated").click();

    cy.get("li.gh-list-row.gh-posts-list-item")
      .find("h3.gh-content-entry-title")
      .first()
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(tiutloPagina);
      });
  });
});

/**
 * Función que ejecuta las instrucciones para crear solo una página
 */
function crearPagina() {
  const tituloPage = faker.commerce.productName();
  PageCreatePublish.visit();
  PageCreatePublish.clickNewPage();
  PageCreatePublish.selectImageForPage(tituloPage);
  cy.wait(9000);
  PageCreatePublish.enterPageDetails(tituloPage);
  return tituloPage;
}
