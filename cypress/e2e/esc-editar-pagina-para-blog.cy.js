import LoginGhost from "../support/login"; // Importar módulo de inicio de sesión
import { faker } from "@faker-js/faker"; // Importar faker para generar datos falsos
import PageCreatePublish from "../support/pageCreatePublish"; // Importar el Page Object creado
import { Constantes } from "../support/constantes";


describe("Escenario para verificar la edición de una pagina en la aplicación ghost", () => {
  beforeEach(() => {
    LoginGhost.visit();
    LoginGhost.diligenciarEmail(Constantes.USER_GHOST);
    LoginGhost.diligenciarPassword(Constantes.PASS_GHOST);
    LoginGhost.clickBotonSignIn();
  });
  it("Tercer caso: Editar Page...", () => {
    let tituloPage; // Declarar variable para almacenar el título del page
    tituloPage = createPublishPage(); // Llamar a la función para crear una page
    selectImageForPage(tituloPage); // Llamar a la función para seleccionar una imagen para el page
    enterPageDetails(tituloPage); // Llamar a la función para ingresar los detalles del page
    publishPage(tituloPage); // Llamar a la función para publicar un page
    checkPagePublished(tituloPage); // Llamar a la función para verificar que el page esté publicado

    //Editar page
    PageCreatePublish.editPage(tituloPage); // Editar page
    const nuevoTituloPage = faker.commerce.productName(); // Generar un nuevo título de page aleatorio
    PageCreatePublish.editPageDetails(nuevoTituloPage); // Editar los detalles del page
    PageCreatePublish.updatePage(nuevoTituloPage); // Publicar page editado
    checkPagePublished(nuevoTituloPage); // Verificar que el page editado esté publicado
    cy.log(
      `El page cambió de título de: "${tituloPage}"  a  "${nuevoTituloPage}" .`
    );
    cy.wait(2000); // Esperar 2 segundos
  });
});

function createPublishPage(){
    const tituloPage = faker.commerce.productName(); // Generar un título de page aleatorio

    PageCreatePublish.visit(); // Visitar la página de page
    PageCreatePublish.clickNewPage(); // Hacer clic en el botón "New page"

    return tituloPage; 
}


function selectImageForPage(tituloPage){
    PageCreatePublish.selectImageForPage(tituloPage); // Seleccionar imagen para el page
}

function enterPageDetails(tituloPage){
    PageCreatePublish.enterPageDetails(tituloPage); // Ingresar datos básicos del page
}

function publishPage(tituloPage){
    //Publicar page
    PageCreatePublish.publishPage(tituloPage); // Publicar page
    cy.wait(2000); // Esperar 2 segundos
}

function checkPagePublished(tituloPage){
    PageCreatePublish.verifyPagePublished(tituloPage); // Verificar que la página esté publicada
}
