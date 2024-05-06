import LoginGhost from "../support/login"; // Importar módulo de inicio de sesión
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import PageCreatePublish from "../support/pageCreatePublish"; // Importar el Page Object creado

describe("Escenario para validar y verificar la creación y la publicación de un page en la aplicación ghost", () => {
    //Credenciales de ghost
    const USER_GHOST = "wilderlopezm@gmail.com"; 
    const PASS_GHOST = "12345678901"; 

    beforeEach(() => {
        //Inciar sesión en ghost antes de comenzar la prueba
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(USER_GHOST); 
        LoginGhost.diligenciarPassword(PASS_GHOST); 
        LoginGhost.clickBotonSignIn(); 
    });

    it("Primer caso: Crear, publicar y verificar PAGE en Ghost ...", () => {
        let tituloPage; // Declarar variable para almacenar el título del page
        tituloPage = createPublishPage(); // Llamar a la función para crear y publicar un page
        selectImageForPage(tituloPage); // Llamar a la función para seleccionar una imagen para el page
        enterPageDetails(tituloPage); // Llamar a la función para ingresar los detalles del page
        publishPage(tituloPage); // Llamar a la función para publicar un page
        checkPagePublished(tituloPage); // Llamar a la función para verificar que el page esté publicado
        cy.wait(2000); // Esperar 2 segundos
    });

    it("Segundo caso: Crear página y programar su publicación ...", () => {
        let tituloPage; // Declarar variable para almacenar el título del page
        tituloPage = createPublishPage(); // Llamar a la función para crear y publicar un page
        selectImageForPage(tituloPage); // Llamar a la función para seleccionar una imagen para el page
        enterPageDetails(tituloPage); // Llamar a la función para ingresar los detalles del page
        schedulePage(tituloPage); // Llamar a la función para programar la publicación de un page
        checkPageScheduled(tituloPage); // Llamar a la función para verificar que el page esté publicado
        cy.wait(2000); // Esperar 2 segundos
    });

});

function schedulePage(tituloPage){
    PageCreatePublish.schedulePage(tituloPage); // Publicar page
    cy.wait(2000); // Esperar 2 segundos
}

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

function checkPageScheduled(tituloPage){
    PageCreatePublish.verifyPageScheduled(tituloPage); // Verificar que la página esté publicada
}