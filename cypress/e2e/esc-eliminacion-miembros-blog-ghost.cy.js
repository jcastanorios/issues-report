import LoginGhost from "../support/login";
import MemberObjectModel from "../support/memberObjectModel";
import { faker } from "@faker-js/faker";
import { Constantes } from "../support/constantes";

describe("Escenario de pruebas para eliminación de un miembro de un blog", () => {
  let totalMembers = 0;
  beforeEach(() => {
    LoginGhost.visit();
    LoginGhost.diligenciarEmail(Constantes.USER_GHOST);
    LoginGhost.diligenciarPassword(Constantes.PASS_GHOST);
    LoginGhost.clickBotonSignIn();
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

    //verificar que si nos encontremos en la pantalla, revisar titulo de la sección
    MemberObjectModel.validarTituloSeccionMiembros().then((text) => {
      expect(text.trim()).to.eq(Constantes.TITULO_PAGINA_MIEMBROS);
    });

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
    //Pulsar en alguno de los miembros de la lista
    MemberObjectModel.obtenerPrimerElementoDeListaMiembros().click();

    //Dar clic en el botón del piñon
    MemberObjectModel.obtenerElementoDomPinon().click();
    MemberObjectModel.obtenerElementoDomDelete().click();
    MemberObjectModel.obtenerElementoDomModal("Delete member").click();


    //Then
    //validar que el miembro se haya eliminado según total en la lista
    cy.wait(2000);
    MemberObjectModel.obtenerBaggedMiembros()
      .invoke("text")
      .then((text) => {
        expect(Number(totalMembers) - 1).to.eq(Number(text));
      });
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
  //nuevo nombre para un miembro
  MemberObjectModel.adicionarEmailMiembro(faker.internet.email());

  //pulsar btn Retry
  MemberObjectModel.obtenerBotonRetry().click();
  cy.wait(2000);
  //retornar al menú de la lista de miembros
  MemberObjectModel.clicOpcionMenuMiembros();
}
