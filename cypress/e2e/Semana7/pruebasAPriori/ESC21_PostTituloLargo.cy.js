import LoginGhost from "../../../support/login"; // Importar módulo de inicio de sesión
import PostCreatePublish from "../../../support/postCreatePublish"; // Importar el Page Object creado
import ScreenshotPage from "../../../support/screenshot"; // Importar módulo para capturar pantallas

const dataPrueba = require("./data/titulos_largos.json");


describe("Escenario para validar y verificar la creación y la publicación de un post en la aplicación ghost", () => {
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
        // ScreenshotPage.takeScreenshot('Login', 'dashboard');
    });
    
    it("Primer caso: Crear, publicar y verificar post en Ghost Titulo largo ...", () => {
        let indice = new Number();
        let indice2 = new Number(); 
        let tituloPost = new String(); // Declarar variable para almacenar el título del post
        let contenidoPost = new String(); // Declarar variable para almacenar el contenido del post
        
        //titulo
        indice = getRandom(0, dataPrueba.length);
        tituloPost = dataPrueba[indice];
        tituloPost = JSON.stringify(dataPrueba[indice].title).replace(/"/g, '');
        //contenido
        indice2 = getRandom(0, dataPrueba.length);
        contenidoPost = dataPrueba[indice2];
        contenidoPost = JSON.stringify(dataPrueba[indice].title).replace(/"/g, '');

        
        let nombreEscenario = "ESC1_CreatePost"; 
        createPublishPost(nombreEscenario); // Llamar a la función para crear y publicar un post
        selectImageForPost(tituloPost, nombreEscenario); // Llamar a la función para seleccionar una imagen para el post
        enterPostDetails(tituloPost, nombreEscenario, contenidoPost); // Llamar a la función para ingresar los detalles del post
        publishPost(tituloPost, nombreEscenario); // Llamar a la función para publicar un post
        checkPostPublished(tituloPost, nombreEscenario); // Llamar a la función para verificar que el post esté publicado
        cy.wait(2000); // Esperar 2 segundos

    });

});


function selectImageForPost(tituloPost, nombreEscenario){
    PostCreatePublish.selectImageForPost(tituloPost, nombreEscenario); // Seleccionar imagen para el post
    //ScreenshotPage.takeScreenshot('Pruebas Post', `${nombreEscenario}/selectImagePost`);
}
function enterPostDetails(tituloPost, nombreEscenario, contenidoPost){
    PostCreatePublish.enterPostDetails(tituloPost, nombreEscenario, contenidoPost); // Ingresar datos básicos del post
}

function createPublishPost(nombreEscenario){
    PostCreatePublish.visit(nombreEscenario); // Visitar la página de posts
    PostCreatePublish.clickNewPost(nombreEscenario); // Hacer clic en el botón "New post"
}

function publishPost(tituloPost, nombreEscenario){
    //Publicar post
    PostCreatePublish.publishPost(tituloPost, nombreEscenario); // Publicar post
    cy.wait(2000); // Esperar 2 segundos
}

function checkPostPublished(tituloPost, nombreEscenario){
    PostCreatePublish.verifyPostPublished(tituloPost, nombreEscenario); // Verificar que el post esté publicado
}

function getRandom(min, max) {
    max = max - 1;
    return Math.floor(Math.random() * (max - min)) + min;
}
