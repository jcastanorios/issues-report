import LoginGhost from "../support/login";
import MemberObjectModel from "../support/memberObjectModel";
import { faker } from "@faker-js/faker";
import { Constantes } from "../support/constantes";
import ScreenshotPage from "../support/screenshot";

describe("Escenario de pruebas para eliminación de un miembro de un blog", () => {
  let totalMembers = 0;
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
   * Precondiciones: un usuario logueado en el sistema y un miembro creado en el sistema
   * Postcondiciones: un miembro eliminado del sistema
   */
  it("Eliminación nuevo miembro del blog", () => {
    //Given
    //verificar que navegamos hasta la pantalla de la lista de miembros
    MemberObjectModel.clicOpcionMenuMiembros();
    MemberObjectModel.validarAccesoPaginaMiembros().then((response) => {
      expect(response.status).to.eq(200);
    });
    ScreenshotPage.takeScreenshot(
      Constantes.FOLDER_ESC_DELETE_MEMBER,
      "validar-acceso-pagina-miembros"
    );

    //verificar que si nos encontremos en la pantalla, revisar titulo de la sección
    MemberObjectModel.validarTituloSeccionMiembros().then((text) => {
      expect(text.trim()).to.eq(Constantes.TITULO_PAGINA_MIEMBROS);
    });
    ScreenshotPage.takeScreenshot(
      Constantes.FOLDER_ESC_DELETE_MEMBER,
      "validar-titulo-pagina-miembros"
    );

    //When
    //validar que exista al menos un miembro de lo contrario crear el miembro en el blog
    MemberObjectModel.obtenerBaggedMiembros()
      .invoke("text")
      .then((text) => {
        totalMembers = text;
        console.log(Constantes.LBL_TOTAL_MIEMBROS, totalMembers);
        if (parseInt(text) === 0) {
          cy.wait(7000);
          crearUnMiembroEnBlog();
        }
      });
    ScreenshotPage.takeScreenshot(
      Constantes.FOLDER_ESC_DELETE_MEMBER,
      "validar-que exista-al-menos-un-miembro"
    );

    //Pulsar en alguno de los miembros de la lista
    MemberObjectModel.obtenerPrimerElementoDeListaMiembros().click();

    //Dar clic en el botón del piñon
    MemberObjectModel.obtenerElementoDomPinon().click();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_DELETE_MEMBER, "ubicar-btn-pinon");
    MemberObjectModel.obtenerElementoDomDelete().click();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_DELETE_MEMBER, "clic-btn-delete");
    MemberObjectModel.obtenerElementoDomModal("Delete member").click();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_DELETE_MEMBER, "delete-member-on-modal");


    //Then
    //validar que el miembro se haya eliminado según total en la lista
    cy.wait(2000);
    MemberObjectModel.obtenerBaggedMiembros()
      .invoke("text")
      .then((text) => {
        expect(Number(totalMembers) - 1).to.eq(Number(text));
      });
      ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_DELETE_MEMBER, "validar-eliminacion-miembro");  
  });
});

function crearUnMiembroEnBlog() {
  //Pulsar en botón para añadir nuevo miembro
  MemberObjectModel.adicionarNuevoMiebro();

  //nuevo nombre para un miembro
  MemberObjectModel.adicionarNombreMiembro(faker.person.fullName());

  //pulsar Save para adicionar un miembro sin email
  MemberObjectModel.almacenarMiembroBlog();

  //validar que el Save al detectar un error se convierta en un Retry
  MemberObjectModel.obtenerBotonRetry()
    .invoke("text")
    .then((text) => {
      expect(text.trim()).to.eq("Retry");
    });
    
  ScreenshotPage.takeScreenshot(
    Constantes.FOLDER_ESC_DELETE_MEMBER,
    "obtener-btn-retry"
  );

  //nuevo nombre para un miembro
  MemberObjectModel.adicionarEmailMiembro(faker.internet.email());

  //pulsar btn Retry
  MemberObjectModel.obtenerBotonRetry().click();

  ScreenshotPage.takeScreenshot(
    Constantes.FOLDER_ESC_DELETE_MEMBER,
    "obtener-btn-retry-2"
  );

  cy.wait(2000);
  //retornar al menú de la lista de miembros
  MemberObjectModel.clicOpcionMenuMiembros();
}
