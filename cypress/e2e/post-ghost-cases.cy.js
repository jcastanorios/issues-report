import LoginGhost from "../support/login"; // Importar módulo de inicio de sesión
import PostCreatePublish from "../support/postCreatePublish"; // Importar el Page Object creado
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos

describe("Escenario para validar y verificar la creación y la publicación de un post en la aplicación ghost", () => {
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
    
    it("Primer caso: Crear, publicar y verificar post en Ghost ...", () => {
        let tituloPost; // Declarar variable para almacenar el título del post
        tituloPost = createPublishPost(); // Llamar a la función para crear y publicar un post
        selectImageForPost(tituloPost); // Llamar a la función para seleccionar una imagen para el post
        enterPostDetails(tituloPost); // Llamar a la función para ingresar los detalles del post
        publishPost(tituloPost); // Llamar a la función para publicar un post
        checkPostPublished(tituloPost); // Llamar a la función para verificar que el post esté publicado
        cy.wait(2000); // Esperar 2 segundos
    });

    it("Segundo caso: Publicar post con campos vacíos ...", () => {
        let tituloPost; // Declarar variable para almacenar el título del post
        tituloPost = createPublishPost(); // Llamar a la función para crear un post
        enterPostDetails(tituloPost); // Llamar a la función para ingresar los detalles del post
        clearDetailsPost(); // Llamar a la función para limpiar el título del post
        publishPost("(Untitled)"); // Llamar a la función para publicar un post
        checkPostPublished("(Untitled)"); // Llamar a la función para verificar que el post esté publicado
        cy.wait(2000); // Esperar 2 segundos
    });

    it("Tercer caso: Editar Post...", () => {
        let tituloPost; // Declarar variable para almacenar el título del post
        tituloPost = createPublishPost(); // Llamar a la función para crear un post
        selectImageForPost(tituloPost); // Llamar a la función para seleccionar una imagen para el post
        enterPostDetails(tituloPost); // Llamar a la función para ingresar los detalles del post
        publishPost(tituloPost); // Llamar a la función para publicar un post
        checkPostPublished(tituloPost); // Llamar a la función para verificar que el post esté publicado

        //Editar post
        PostCreatePublish.editPost(tituloPost); // Editar post
        const nuevoTituloPost = faker.commerce.productName(); // Generar un nuevo título de post aleatorio
        PostCreatePublish.editPostDetails(nuevoTituloPost); // Editar los detalles del post
        PostCreatePublish.updatePost(nuevoTituloPost); // Publicar post editado
        checkPostPublished(nuevoTituloPost); // Verificar que el post editado esté publicado
        cy.log(`El post cambió de título de: "${tituloPost}"  a  "${nuevoTituloPost}" .`);
        cy.wait(2000); // Esperar 2 segundos
    });
});


function selectImageForPost(tituloPost){
    PostCreatePublish.selectImageForPost(tituloPost); // Seleccionar imagen para el post
}
function enterPostDetails(tituloPost){
    PostCreatePublish.enterPostDetails(tituloPost); // Ingresar datos básicos del post
}

function createPublishPost(){
    const tituloPost = faker.commerce.productName(); // Generar un título de post aleatorio

    PostCreatePublish.visit(); // Visitar la página de posts
    PostCreatePublish.clickNewPost(); // Hacer clic en el botón "New post"

    return tituloPost;
}

function publishPost(tituloPost){
    //Publicar post
    PostCreatePublish.publishPost(tituloPost); // Publicar post
    cy.wait(2000); // Esperar 2 segundos
}

function checkPostPublished(tituloPost){
    PostCreatePublish.verifyPostPublished(tituloPost); // Verificar que el post esté publicado
}

function clearDetailsPost(){
    PostCreatePublish.clearDetailsPost(); // Limpiar el título del post
}
