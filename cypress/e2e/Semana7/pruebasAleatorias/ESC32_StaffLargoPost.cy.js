import LoginGhost from "../../../support/login"; // Importar módulo de inicio de sesión
import postCreatePublish from "../../../support/postCreatePublish";
import PostCreatePublish from "../../../support/postCreatePublish"; // Importar el Page Object creado
import userObjectModel from "../../../support/userObjectModel";
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import { Constantes } from "../../../support/constantes";

describe('Escenario #16 - Crear un post, Modificar staff y validar los cambios en Post', () => {
    let userName;
    beforeEach(()=>{
         //Iniciar sesión en ghost antes de comenzar la prueba
         LoginGhost.visit(); 
         LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
         LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
         LoginGhost.clickBotonSignIn(); 
    })

    //Aleatorio
    it('ESC092-Crear un nuevo post con titulo largo, Modificar el nombre del usuario y verificar el cambio - Aletaorio', () => {
        let tituloPost = faker.commerce.productName(); // Generar un título de post aleatorio
        userName = faker.company.name() //Generando el nombre con datos aleatorios de una organización
        generarPost(tituloPost, userName)
    })
});   
function generarPost(postTitulo, userName){
    createPublishPost() //Crea el post -> click en post y new post
    enterPostDetails(postTitulo); //Ingresa el titulo del post
    publishPost(postTitulo)//Publicar post
    checkPostPublished(postTitulo)//Verificar que el post este publicado
    settingUser(); //Ingresar a cambiar nombre de usuario
    enterChangeUser(userName); //Cambiar el nombre de usuario
    verifyChangeUserName(userName); //verificar Cambio de Nombre
    verifyPostUserName(userName);//Verificar cambio de nombre de usuario en listado de post
}

function verifyPostUserName(userName){
    postCreatePublish.visit();
    postCreatePublish.verifyPostUserName(userName)
}
function settingUser(){
    userObjectModel.settingUser(); //Ingresar a cambiar nombre de usuario
}
function enterChangeUser(userName){
    userObjectModel.enterChangeUser(userName);
}
function verifyChangeUserName(userName){
    userObjectModel.verifyChangeUserName(userName);
}
function enterPostDetails(tituloPost){
    PostCreatePublish.enterPostDetails(tituloPost); // Ingresar datos básicos del post
}

function createPublishPost(){
    PostCreatePublish.visit(); // Visitar la página de posts
    PostCreatePublish.clickNewPost(); // Hacer clic en el botón "New post"
}

function publishPost(tituloPost){
    //Publicar post
    PostCreatePublish.publishPost(tituloPost); // Publicar post
    cy.wait(2000); // Esperar 2 segundos
}

function checkPostPublished(tituloPost){
    PostCreatePublish.verifyPostPublished(tituloPost); // Verificar que el post esté publicado
}

 