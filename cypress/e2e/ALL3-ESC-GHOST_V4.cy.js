import LoginGhost from "../support/login"; // Importar módulo de inicio de sesión
import PostCreatePublish from "../support/postCreatePublish"; // Importar el Page Object creado
import PageCreatePublish from "../support/pageCreatePublish";
import userObjectModel from "../support/userObjectModel";
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import { Constantes } from "../support/constantes";
import ScreenshotPage from "../support/screenshot"; // Importar módulo para capturar pantallas
import postCreatePublish from "../support/postCreatePublish";
import tagCreate from "../support/tagCreate";

describe('Escenario #16 - Crear un post, Modificar staff y validar los cambios en Post', () => {
    let userName;
    beforeEach(()=>{
         //Iniciar sesión en ghost antes de comenzar la prueba
         Constantes.VERSION_GHOST = 4;
         LoginGhost.visit(); 
         LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
         LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
         ScreenshotPage.takeScreenshot('Login_V4', 'login'); 
         LoginGhost.clickBotonSignIn(); 
         ScreenshotPage.takeScreenshot('Login_V4', 'dashboard');
 
     })
    it('Crear un nuevo post, Modificar el nombre del usuario y verificar el cambio', () => {
        let postTitulo = createPublishPost() //Crea el post -> click en post y new post
        let nombreEscenario = "V4_ESC1_CreatePostChangeUser"; 
        enterPostDetails(postTitulo, nombreEscenario); //Ingresa el titulo del post
        publishPost(postTitulo, nombreEscenario)//Publicar post
        checkPostPublished(postTitulo, nombreEscenario)//Verificar que el post este publicado

        userName = settingUser(nombreEscenario); //Ingresar a cambiar nombre de usuario
        enterChangeUser(userName, nombreEscenario); //Cambiar el nombre de usuario
        verifyChangeUserName(userName, nombreEscenario); //verificar Cambio de Nombre
        verifyPostUserName(userName, nombreEscenario);//Verificar cambio de nombre de usuario en listado de post
    })
}); 


describe('Escenario #17 - Crear un page, Modificar staff y validar los cambios en page', () => {
    let userName;

    beforeEach(()=>{
         //Iniciar sesión en ghost antes de comenzar la prueba
         Constantes.VERSION_GHOST = 4;
         LoginGhost.visit(); 
         LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
         LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
         ScreenshotPage.takeScreenshot('Login_V4', 'login'); 
         LoginGhost.clickBotonSignIn(); 
         ScreenshotPage.takeScreenshot('Login_V4', 'dashboard');
 
     })
    it('Crear un nuevo page, modificar el nombre del usuario y verificar', () => {
        let tituloPage; // Declarar variable para almacenar el título del page
        let nombreEscenario = "V4_ESC1_CreatePageChangeUser"; 
        tituloPage = createPublishPage(nombreEscenario); // Llamar a la función para crear y publicar un page
        enterPageDetails(tituloPage, nombreEscenario); // Llamar a la función para ingresar los detalles del page
        publishPage(tituloPage, nombreEscenario); // Llamar a la función para publicar un page
        checkPagePublished(tituloPage, nombreEscenario); // Llamar a la función para verificar que el page esté publicado
        cy.wait(2000); // Esperar 2 segundos

        userName = settingUser(nombreEscenario); //Ingresar a cambiar nombre de usuario
        enterChangeUser(userName, nombreEscenario); //Cambiar el nombre de usuario
        verifyChangeUserName(userName, nombreEscenario); //verificar Cambio de Nombre

        verifyPageUserName(userName, nombreEscenario);//Verificar cambio de nombre de usuario en listado de post
    })        

});   
describe('Escenario #18 - Crear un post, y verificar que este publicado en borrador', () => {
    let userName;
    beforeEach(()=>{
        Constantes.VERSION_GHOST = 4;
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
        LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
        ScreenshotPage.takeScreenshot('Login_V4', 'login'); 
        LoginGhost.clickBotonSignIn(); 
        ScreenshotPage.takeScreenshot('Login_V4', 'dashboard');

    })
     it('Crear un nuevo post, Verificar que este en la lista de borrador', () => {
        let tituloPost = createPublishPost(); //Creación del nuevo post
        let nombreEscenario = "V4_ESC1_CreatePostDrawft"; 
        enterPostDetails(tituloPost, nombreEscenario);//ingrese el titulo
        cy.wait(2000);
        closeNewPost(nombreEscenario);//Cerrar el post para guardar en borrador
        verifyPostDrawft(tituloPost, nombreEscenario); //Verificar si la publicación está en borrador
    })

});  
describe('Escenario #19 - Crear un page, y verificar si existe en la lista allpage', () => {
    beforeEach(()=>{
        Constantes.VERSION_GHOST = 4;
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
        LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
        ScreenshotPage.takeScreenshot('Login_V4', 'login'); 
        LoginGhost.clickBotonSignIn(); 
        ScreenshotPage.takeScreenshot('Login_V4', 'dashboard');
    })
    it('Crear un nuevo page en drawft y Verificar que exista en la lista allpage con estado borrador', () => {
        let nombreEscenario = "V4_ESC1_CreatePagetDrawft"; 
        let tituloPage = createPublishPage(nombreEscenario); //Abre la ventana para crear la publicación
        enterPageDetails(tituloPage,nombreEscenario); //Ingresar el texto de la página

        closeNewPage(nombreEscenario);//Cerrar el post para guardar en borrador
        verifyPageDrawft(tituloPage, nombreEscenario); //Verificar si la publicación está en borrador
    })

});   

describe('Escenario #20 - Crear un tag, y asignarle a un page', () => {
    beforeEach(()=>{
        //Iniciar sesión en ghost antes de comenzar la prueba
        Constantes.VERSION_GHOST = 4;
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
        LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
        ScreenshotPage.takeScreenshot('Login_V4', 'login'); 
        LoginGhost.clickBotonSignIn(); 
        ScreenshotPage.takeScreenshot('Login_V4', 'dashboard');
    })
    it('Crear un nuevo tag, Crear un nuevo page y asignarle el tag creado',() => {
        let nombreEscenario = "V4_ESC1_CreateNewTagAsignPage"; 
        let tagTitulo = CreateNewTag(nombreEscenario); //Crear el tag ->Click en new tag
        EnterNewTag(tagTitulo);//Creación del tag, con los datos titulo, color y descripción
        let pageTitulo = createPublishPage(nombreEscenario) //Crea el post -> click en post y new post
        enterPageDetails(pageTitulo,nombreEscenario); //Ingresa el titulo del post
        asignarTagPage(tagTitulo, nombreEscenario)//Asignación del tag al post
        publishPage(pageTitulo, nombreEscenario)//Publicar page
        checkPagePublished(pageTitulo, nombreEscenario); //Verificar si el post con tag estén publicados
    })
});   

//Tag
function asignarTagPage(tagTitulo, nombreEscenario){
    PageCreatePublish.asignarTagPage(tagTitulo, nombreEscenario);
}
function CreateNewTag(nombreEscenario){
    tagCreate.visit();
    tagCreate.clickNewTag(nombreEscenario);
    const tituloTag = faker.commerce.isbn();
    return tituloTag;
}
function EnterNewTag(tituloTag, nombreEscenario){
    tagCreate.CreateNewTag(tituloTag, nombreEscenario);
}

//PageDrawft
function verifyPageDrawft(tituloPage, nombreEscenario){
    PageCreatePublish.verifyPageDrawft(tituloPage, nombreEscenario);
}
function closeNewPage(nombreEscenario){
    PageCreatePublish.closeNewPage(nombreEscenario);//Cierre la edición del post
}

//PostDraft
function verifyPostDrawft(tituloPost, nombreEscenario){
    PostCreatePublish.verifyPostDrawft(tituloPost, nombreEscenario);
}
function closeNewPost(nombreEscenario){
    PostCreatePublish.closeNewPost(nombreEscenario);//Cierre la edición del post
}

//Post chageUserName
function verifyPostUserName(userName, nombreEscenario){
    postCreatePublish.visit();
    postCreatePublish.verifyPostUserName(userName, nombreEscenario)
}
function settingUser(nombreEscenario){
    userObjectModel.settingUser(nombreEscenario); //Ingresar a cambiar nombre de usuario
    const username = faker.commerce.productName();
    return username;
}
function enterChangeUser(userName, nombreEscenario){
    userObjectModel.enterChangeUser(userName, nombreEscenario);
}
function verifyChangeUserName(userName, nombreEscenario){
    userObjectModel.verifyChangeUserName(userName, nombreEscenario);
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

//Page
function verifyPageUserName(userName, nombreEscenario){
    PageCreatePublish.visit();
    PageCreatePublish.verifyPageUserName(userName,nombreEscenario);
}
function createPublishPage(nombreEscenario){
    const tituloPage = faker.commerce.productName(); // Generar un título de page aleatorio
    PageCreatePublish.visit(); // Visitar la página de page
    PageCreatePublish.clickNewPage(nombreEscenario); // Hacer clic en el botón "New page"
    return tituloPage; 
}

function enterPageDetails(tituloPage, nombreEscenario){
    PageCreatePublish.enterPageDetails(tituloPage, nombreEscenario);// Ingresar datos básicos del page
}

function publishPage(tituloPage, nombreEscenario){
    //Publicar page
    PageCreatePublish.publishPage(tituloPage, nombreEscenario); // Publicar page
    cy.wait(2000); // Esperar 2 segundos
}

function checkPagePublished(tituloPage, nombreEscenario){
    PageCreatePublish.verifyPagePublished(tituloPage, nombreEscenario); // Verificar que la página esté publicada
}
 