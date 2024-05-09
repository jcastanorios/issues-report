import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import tagCreate from "../support/tagCreate";
import PageCreatePublish from '../support/pageCreatePublish';
import LoginGhost from '../support/login';

describe('Escenario #20 - Crear un tag, y asignarle a un page', () => {

    let userName;
    const USER_GHOST = "wilderlopezm@gmail.com"; 
    const PASS_GHOST = "12345678901"; 
    
    const pageTitulo = 'Pagina de prueba WLM 00:03';
    const tagTitulo = "Tag nuevo BS 00_03";
    beforeEach(()=>{
        //Iniciar sesión en ghost antes de comenzar la prueba
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(USER_GHOST); 
        LoginGhost.diligenciarPassword(PASS_GHOST); 
        LoginGhost.clickBotonSignIn();              
    })
    it('Crear un nuevo tag, Crear un nuevo page y asignarle el tag creado',() => {
        let tagTitulo = CreateNewTag(); //Crear el tag ->Click en new tag
        EnterNewTag(tagTitulo);//Creación del tag, con los datos titulo, color y descripción

        let pageTitulo = createPublishPage() //Crea el post -> click en post y new post
        enterPageDetails(pageTitulo); //Ingresa el titulo del post
        asignarTagPage(tagTitulo)//Asignación del tag al post
        publishPage(pageTitulo)//Publicar page
        checkPagePublished(pageTitulo); //Verificar si el post con tag estén publicados
    })
});   
function asignarTagPage(tagTitulo){
    PageCreatePublish.asignarTagPage(tagTitulo);
}
function CreateNewTag(){
    tagCreate.visit();
    tagCreate.clickNewTag();
    const tituloTag = faker.commerce.isbn();
    return tituloTag;
}
function EnterNewTag(tituloTag){
    tagCreate.CreateNewTag(tituloTag);
}
 
function createPublishPage(){
    const tituloPage = faker.commerce.productName(); // Generar un título de page aleatorio

    PageCreatePublish.visit(); // Visitar la página de page
    PageCreatePublish.clickNewPage(); // Hacer clic en el botón "New page"

    return tituloPage; 
}

function enterPageDetails(tituloPage){
    PageCreatePublish.enterPageDetails(tituloPage);// Ingresar datos básicos del page
}

function publishPage(tituloPage){
    //Publicar page
    PageCreatePublish.publishPage(tituloPage); // Publicar page
    cy.wait(2000); // Esperar 2 segundos
}

function checkPagePublished(tituloPage){
    PageCreatePublish.verifyPagePublished(tituloPage); // Verificar que la página esté publicada
}