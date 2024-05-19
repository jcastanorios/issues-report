import LoginGhost from "../../../support/login"; // Importar módulo de inicio de sesión
import PostCreatePublish from "../../../support/postCreatePublish"; // Importar el Page Object creado
import ScreenshotPage from "../../../support/screenshot"; // Importar módulo para capturar pantallas

let datosEntrada = new Object();


describe("Escenario para validar y verificar la creación y la publicación de un post en la aplicación ghost", () => {
    //Credenciales de ghost
    const USER_GHOST = "wilderlopezm@gmail.com"; 
    const PASS_GHOST = "12345678901"; 

    const jsonFile = 'titulo_largo'; 
    const apiKey = '7df48700';

    const apiUrl = `https://my.api.mockaroo.com/${jsonFile}.json?key=${apiKey}`;
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Hubo un problema al obtener los datos desde la API.');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const indiceAleatorio = Math.floor(Math.random() * data.length);
        datosEntrada = data[indiceAleatorio];
        console.log("Datos de entrada ----->", datosEntrada);
    })
    .catch(error => {
        console.error('Error al obtener datos desde la API:', error);
    });

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
        let tituloPost = new String(); // Declarar variable para almacenar el título del post
        let contenidoPost = new String(); // Declarar variable para almacenar el contenido del post

        tituloPost = datosEntrada.title;
        contenidoPost = datosEntrada.description;
        
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
