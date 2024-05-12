import LoginGhost from "../support/login";
import MemberObjectModel from "../support/memberObjectModel";
import { faker } from "@faker-js/faker";
import { Constantes } from "../support/constantes";
import ScreenshotPage from "../support/screenshot";

describe("Escenario de pruebas para creación de un miembro para un blog", () => {
  let totalMembers = 0;
  beforeEach(() => {
    LoginGhost.visit();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_LOGIN, "login-visit-url");
    LoginGhost.diligenciarEmail(Constantes.USER_GHOST);
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_LOGIN, "login-input-email");
    LoginGhost.diligenciarPassword(Constantes.PASS_GHOST);
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_LOGIN, "login-input-password");
    LoginGhost.clickBotonSignIn();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_LOGIN, "login-clic-button");
  });

  /**
   * Precondiciones: un usuario logueado en el sistema
   * Postcondiciones: un miembro creado en el sistema
   */
  it("Creación nuevo miembro del blog", () => {

    //Given
    //verificar que navegamos hasta la pantalla de la lista de miembros
    cy.wait(2000);
    MemberObjectModel.clicOpcionMenuMiembros();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_ADD_MEMBER, "miembros-clic-menu");
    MemberObjectModel.validarAccesoPaginaMiembros().then((response) => {
      expect(response.status).to.eq(200);
    });
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_ADD_MEMBER, "miembros-validar-acceso");
    //verificar que si nos encontremos en la pantalla, revisar titulo de la sección
    MemberObjectModel.validarTituloSeccionMiembros().then((text) => {
      expect(text.trim()).to.eq(Constantes.TITULO_PAGINA_MIEMBROS);
    });
    ScreenshotPage.takeScreenshot(
      Constantes.FOLDER_ESC_ADD_MEMBER,
      "miembros-validar-titulo-seccion"
    );
    //obtener el total de miembros en el blog - el método recibe un tiempo de espera
    MemberObjectModel.obtenerTotalMiembrosBlog()
      .invoke("text")
      .then((text) => {
        totalMembers = text;
        console.log(Constantes.LBL_TOTAL_MIEMBROS, totalMembers);
      });
    ScreenshotPage.takeScreenshot(
      Constantes.FOLDER_ESC_ADD_MEMBER,
      "miembros-validar-total-miembros"
    );
    //When
    //Pulsar en botón para añadir nuevo miembro
    MemberObjectModel.adicionarNuevoMiebro();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_ADD_MEMBER, "miembros-pulsar-nuevo");
    //nuevo nombre para un miembro
    MemberObjectModel.adicionarNombreMiembro(faker.person.fullName());
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_ADD_MEMBER, "miembros-ingresar-nombre");
    //pulsar Save para adicionar un miembro sin email
    MemberObjectModel.almacenarMiembroBlog();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_ADD_MEMBER, "miembros-clic-btn-save");

    //validar que el Save al detectar un error se convierta en un Retry
    MemberObjectModel.obtenerBotonRetry()
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("Retry");
      });
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_ADD_MEMBER, "miembros-clic-btn-retry");
    //nuevo nombre para un miembro
    cy.wait(2000);
    MemberObjectModel.adicionarEmailMiembro(faker.internet.email());
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_ADD_MEMBER, "miembros-input-email");
    //pulsar btn Retry
    MemberObjectModel.obtenerBotonRetry().click();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_ADD_MEMBER, "miembros-clic-retry");
    //Then
    //validar que el miembro se haya añadido según total en la lista
    cy.wait(2000);
    MemberObjectModel.obtenerBaggedMiembros()
      .invoke("text")
      .then((text) => {
        expect(Number(totalMembers) + 1).to.eq(Number(text));
      });
      ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_ADD_MEMBER, "miembros-validar-creacion-miembro");  
    //retornar al menú de la lista de miembros
    MemberObjectModel.clicOpcionMenuMiembros();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_ADD_MEMBER, "miembros-regresar-lista-miembros");
  });
});
