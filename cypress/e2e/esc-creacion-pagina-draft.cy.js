import LoginGhost from "../support/login";
import { faker } from "@faker-js/faker";
import { Constantes } from "../support/constantes";
import PageCreatePublish from "../support/pageCreatePublish";
import PageObjectModel from "../support/pageObjectModel";

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
    PageObjectModel.validarEnlace();

    PageObjectModel.filtrarInformacionPaginas();

    PageObjectModel.filtrarPorReciente();

    PageObjectModel.vaidarCreacionPagina().then((text) => {
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
