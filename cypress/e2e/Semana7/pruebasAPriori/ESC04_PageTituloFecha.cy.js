import LoginGhost from "../../../support/login"; // Importar módulo de inicio de sesión
import PageCreatePublish from "../../../support/pageCreatePublish"; // Importar el Page Object creado
import ScreenshotPage from "../../../support/screenshot"; // Importar módulo para capturar pantallas

const dataPrueba = require("./data/fechas.json");
const dataPrueba2 = require("./data/titulos_largos.json");


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
        //ScreenshotPage.takeScreenshot('Login', 'dashboard');
    });

    it("Primer caso: Crear, publicar y verificar PAGE en Ghost con titulo fecha ...", () => {
        let indice = new Number();
        let indice2 = new Number();
        let tituloPage = new String(); // Declarar variable para almacenar el título del post
        let contenidoPage = new String(); // Declarar variable para almacenar el contenido del post 
        
        //titulo
        indice = getRandom(0, dataPrueba.length);
        tituloPage = dataPrueba[indice];
        tituloPage = JSON.stringify(dataPrueba[indice].title).replace(/"/g, '');
        //contenido
        indice2 = getRandom(0, dataPrueba2.length);
        contenidoPage = dataPrueba2[indice2];
        contenidoPage = JSON.stringify(dataPrueba2[indice].title).replace(/"/g, '');
        
        let nombreEscenario = "ESC4_CreatePage";
        createPublishPage(nombreEscenario); // Llamar a la función para crear y publicar un page
        selectImageForPage(tituloPage, nombreEscenario); // Llamar a la función para seleccionar una imagen para el page
        enterPageDetails(tituloPage, nombreEscenario,contenidoPage); // Llamar a la función para ingresar los detalles del page
        publishPage(tituloPage, nombreEscenario); // Llamar a la función para publicar un page
        checkPagePublished(tituloPage, nombreEscenario); // Llamar a la función para verificar que el page esté publicado
        cy.wait(2000); // Esperar 2 segundos
    });

});

function schedulePage(tituloPage, nombreEscenario){
    PageCreatePublish.schedulePage(tituloPage, nombreEscenario); // Publicar page
    cy.wait(2000); // Esperar 2 segundos
}

function createPublishPage(nombreEscenario){

    PageCreatePublish.visit(nombreEscenario); // Visitar la página de page
    PageCreatePublish.clickNewPage(nombreEscenario); // Hacer clic en el botón "New page"
}

function selectImageForPage(tituloPage, nombreEscenario){
    PageCreatePublish.selectImageForPage(tituloPage, nombreEscenario); // Seleccionar imagen para el page
}

function enterPageDetails(tituloPage, nombreEscenario, contenidoPage){
    PageCreatePublish.enterPageDetails(tituloPage, nombreEscenario, contenidoPage); // Ingresar datos básicos del page
}

function publishPage(tituloPage, nombreEscenario){
    //Publicar page
    PageCreatePublish.publishPage(tituloPage, nombreEscenario); // Publicar page
    cy.wait(2000); // Esperar 2 segundos
}

function checkPagePublished(tituloPage, nombreEscenario){
    PageCreatePublish.verifyPagePublished(tituloPage, nombreEscenario); // Verificar que la página esté publicada
}

function getRandom(min, max) {
    max = max - 1;
    return Math.floor(Math.random() * (max - min)) + min;
}