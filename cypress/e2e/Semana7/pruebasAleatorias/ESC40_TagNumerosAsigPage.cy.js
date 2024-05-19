import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import tagCreate from "../../../support/tagCreate";
import PageCreatePublish from '../../../support/pageCreatePublish';
import LoginGhost from '../../../support/login';

import { Constantes } from "../../../support/constantes";

describe('Escenario #20 - Crear un tag, y asignarle a un page', () => {
    beforeEach(()=>{
        //Iniciar sesión en ghost antes de comenzar la prueba
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
        LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
        LoginGhost.clickBotonSignIn(); 
   })
    it('ESC116 - Crear un nuevo tag con numero, Crear un nuevo page y asignarle el tag creado Aleatorio',() => {
        let tagTitulo = faker.number.int();
        let pageTitulo = faker.commerce.productName();
        generarTagAsigPage(tagTitulo, pageTitulo)
    })
});   
function generarTagAsigPage(tagTitulo, pageTitulo){
    CreateNewTag(); //Crear el tag ->Click en new tag
    EnterNewTag(tagTitulo);//Creación del tag, con los datos titulo, color y descripción
    createPublishPage() //Crea el post -> click en post y new post
    enterPageDetails(pageTitulo); //Ingresa el titulo del post
    asignarTagPage(tagTitulo)//Asignación del tag al post
    publishPage(pageTitulo)//Publicar page
    checkPagePublished(pageTitulo); //Verificar si el post con tag estén publicados

}
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