import LoginGhost from "../../support/login"; // Importar módulo de inicio de sesión
import PostCreatePublish from "../../support/postCreatePublish"; // Importar el Page Object creado
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import ScreenshotPage from "../../support/screenshot"; // Importar módulo para capturar pantallas

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
        ScreenshotPage.takeScreenshot('Login', 'dashboard');
    });
    
    it("Primer caso: Crear, publicar y verificar post en Ghost ...", () => {
        let tituloPost; // Declarar variable para almacenar el título del post
        let nombreEscenario = "ESC1_CreatePost"; 
        tituloPost = createPublishPost(nombreEscenario); // Llamar a la función para crear y publicar un post
        selectImageForPost(tituloPost, nombreEscenario); // Llamar a la función para seleccionar una imagen para el post
        enterPostDetails(tituloPost, nombreEscenario); // Llamar a la función para ingresar los detalles del post
        publishPost(tituloPost, nombreEscenario); // Llamar a la función para publicar un post
        checkPostPublished(tituloPost, nombreEscenario); // Llamar a la función para verificar que el post esté publicado
        cy.wait(2000); // Esperar 2 segundos
    });

    it("Segundo caso: Publicar post con campos vacíos ...", () => {
        let tituloPost; // Declarar variable para almacenar el título del post
        let nombreEscenario = "ESC2_EditPostEmptyFields"; 
        tituloPost = createPublishPost(nombreEscenario); // Llamar a la función para crear un post
        enterPostDetails(tituloPost, nombreEscenario); // Llamar a la función para ingresar los detalles del post
        clearDetailsPost(nombreEscenario); // Llamar a la función para limpiar el título del post
        publishPost("(Untitled)", nombreEscenario); // Llamar a la función para publicar un post
        checkPostPublished("(Untitled)", nombreEscenario); // Llamar a la función para verificar que el post esté publicado
        cy.wait(2000); // Esperar 2 segundos
    });

    it("Tercer caso: Editar Post...", () => {
        let tituloPost; // Declarar variable para almacenar el título del post
        let nombreEscenario = "ESC3_EditPost";
        tituloPost = createPublishPost(nombreEscenario); // Llamar a la función para crear un post
        selectImageForPost(tituloPost, nombreEscenario); // Llamar a la función para seleccionar una imagen para el post
        enterPostDetails(tituloPost, nombreEscenario); // Llamar a la función para ingresar los detalles del post
        publishPost(tituloPost, nombreEscenario); // Llamar a la función para publicar un post
        checkPostPublished(tituloPost, nombreEscenario); // Llamar a la función para verificar que el post esté publicado

        //Editar post
        PostCreatePublish.editPost(tituloPost, nombreEscenario); // Editar post
        const nuevoTituloPost = faker.commerce.productName(); // Generar un nuevo título de post aleatorio
        PostCreatePublish.editPostDetails(nuevoTituloPost, nombreEscenario); // Editar los detalles del post
        PostCreatePublish.updatePost(nuevoTituloPost, nombreEscenario); // Publicar post editado
        checkPostPublished(nuevoTituloPost, nombreEscenario); // Verificar que el post editado esté publicado
        cy.log(`El post cambió de título de: "${tituloPost}"  a  "${nuevoTituloPost}" .`);
        cy.wait(2000); // Esperar 2 segundos
    });
});


function selectImageForPost(tituloPost, nombreEscenario){
    PostCreatePublish.selectImageForPost(tituloPost, nombreEscenario); // Seleccionar imagen para el post
    //ScreenshotPage.takeScreenshot('Pruebas Post', `${nombreEscenario}/selectImagePost`);
}
function enterPostDetails(tituloPost, nombreEscenario){
    PostCreatePublish.enterPostDetails(tituloPost, nombreEscenario); // Ingresar datos básicos del post
}

function createPublishPost(nombreEscenario){
    const tituloPost = faker.commerce.productName(); // Generar un título de post aleatorio

    PostCreatePublish.visit(nombreEscenario); // Visitar la página de posts
    PostCreatePublish.clickNewPost(nombreEscenario); // Hacer clic en el botón "New post"

    return tituloPost;
}

function publishPost(tituloPost, nombreEscenario){
    //Publicar post
    PostCreatePublish.publishPost(tituloPost, nombreEscenario); // Publicar post
    cy.wait(2000); // Esperar 2 segundos
}

function checkPostPublished(tituloPost, nombreEscenario){
    PostCreatePublish.verifyPostPublished(tituloPost, nombreEscenario); // Verificar que el post esté publicado
}

function clearDetailsPost(nombreEscenario){
    PostCreatePublish.clearDetailsPost(nombreEscenario); // Limpiar el título del post
}
