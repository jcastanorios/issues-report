import LoginGhost from "../support/login"; // Importar módulo de inicio de sesión
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import PageCreatePublish from "../support/pageCreatePublish"; // Importar el Page Object creado
import ScreenshotPage from "../support/screenshot"; // Importar módulo para capturar pantallas

describe("Escenario para validar y verificar la creación y la publicación de un page en la aplicación ghost", () => {
    //Credenciales de ghost
    const USER_GHOST = "wilderlopezm@gmail.com"; 
    const PASS_GHOST = "12345678901"; 

    beforeEach(() => {
        //Inciar sesión en ghost antes de comenzar la prueba
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(USER_GHOST); 
        LoginGhost.diligenciarPassword(PASS_GHOST);
        ScreenshotPage.takeScreenshot('Login', 'login'); 
        LoginGhost.clickBotonSignIn(); 
        ScreenshotPage.takeScreenshot('Login', 'dashboard');
    });

    it("Primer caso: Crear, publicar y verificar PAGE en Ghost ...", () => {
        let nombreEscenario = "ESC4_CreatePage";
        let tituloPage; // Declarar variable para almacenar el título del page
        tituloPage = createPublishPage(nombreEscenario); // Llamar a la función para crear y publicar un page
        selectImageForPage(tituloPage, nombreEscenario); // Llamar a la función para seleccionar una imagen para el page
        enterPageDetails(tituloPage, nombreEscenario); // Llamar a la función para ingresar los detalles del page
        publishPage(tituloPage, nombreEscenario); // Llamar a la función para publicar un page
        checkPagePublished(tituloPage, nombreEscenario); // Llamar a la función para verificar que el page esté publicado
        cy.wait(2000); // Esperar 2 segundos
    });

    it("Segundo caso: Crear página y programar su publicación ...", () => {
        let tituloPage; // Declarar variable para almacenar el título del page
        let nombreEscenario = "ESC5_SchedulePage";
        tituloPage = createPublishPage(nombreEscenario); // Llamar a la función para crear y publicar un page
        selectImageForPage(tituloPage, nombreEscenario); // Llamar a la función para seleccionar una imagen para el page
        enterPageDetails(tituloPage, nombreEscenario); // Llamar a la función para ingresar los detalles del page
        schedulePage(tituloPage, nombreEscenario); // Llamar a la función para programar la publicación de un page
        checkPageScheduled(tituloPage, nombreEscenario); // Llamar a la función para verificar que el page esté publicado
        cy.wait(2000); // Esperar 2 segundos
    });

});

function schedulePage(tituloPage, nombreEscenario){
    PageCreatePublish.schedulePage(tituloPage, nombreEscenario); // Publicar page
    cy.wait(2000); // Esperar 2 segundos
}

function createPublishPage(nombreEscenario){
    const tituloPage = faker.commerce.productName(); // Generar un título de page aleatorio

    PageCreatePublish.visit(nombreEscenario); // Visitar la página de page
    PageCreatePublish.clickNewPage(nombreEscenario); // Hacer clic en el botón "New page"

    return tituloPage; 
}

function selectImageForPage(tituloPage, nombreEscenario){
    PageCreatePublish.selectImageForPage(tituloPage, nombreEscenario); // Seleccionar imagen para el page
}

function enterPageDetails(tituloPage, nombreEscenario){
    PageCreatePublish.enterPageDetails(tituloPage, nombreEscenario); // Ingresar datos básicos del page
}

function publishPage(tituloPage, nombreEscenario){
    //Publicar page
    PageCreatePublish.publishPage(tituloPage, nombreEscenario); // Publicar page
    cy.wait(2000); // Esperar 2 segundos
}

function checkPagePublished(tituloPage, nombreEscenario){
    PageCreatePublish.verifyPagePublished(tituloPage, nombreEscenario); // Verificar que la página esté publicada
}

function checkPageScheduled(tituloPage, nombreEscenario){
    PageCreatePublish.verifyPageScheduled(tituloPage, nombreEscenario); // Verificar que la página esté publicada
}