import LoginGhost from "../support/login";
import { faker } from "@faker-js/faker";
import { Constantes } from "../support/constantes";
import ScreenshotPage from "../support/screenshot";
import PageCreatePublish from "../support/pageCreatePublish";
import PageObjectModel from "../support/pageObjectModel";

describe("Escenario creación de una página para un blog y verificar su actualización en draft", () => {
  beforeEach(() => {
    LoginGhost.visit();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_LOGIN, "login-visit-url");
    LoginGhost.diligenciarEmail(Constantes.USER_GHOST);
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_LOGIN, "login-input-email");
    LoginGhost.diligenciarPassword(Constantes.PASS_GHOST);
    ScreenshotPage.takeScreenshot(
      Constantes.FOLDER_LOGIN,
      "login-input-password"
    );
    LoginGhost.clickBotonSignIn();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_LOGIN, "login-clic-button");
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
    ScreenshotPage.takeScreenshot(
      Constantes.FOLDER_ESC_ADD_PAGE_DRAFT,
      "validar-creacion-pagina"
    );
  });
});

/**
 * Función que ejecuta las instrucciones para crear solo una página
 */
function crearPagina() {
  const tituloPage = faker.commerce.productName();
  PageCreatePublish.visit(Constantes.FOLDER_ESC_ADD_PAGE_DRAFT);
  PageCreatePublish.clickNewPage(Constantes.FOLDER_ESC_ADD_PAGE_DRAFT);
  PageCreatePublish.selectImageForPage(
    tituloPage,
    Constantes.FOLDER_ESC_ADD_PAGE_DRAFT
  );
  cy.wait(9000);
  PageCreatePublish.enterPageDetails(
    tituloPage,
    Constantes.FOLDER_ESC_ADD_PAGE_DRAFT
  );
  return tituloPage;
}
