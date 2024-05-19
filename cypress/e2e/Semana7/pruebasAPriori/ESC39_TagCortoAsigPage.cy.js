import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import tagCreate from "../../../support/tagCreate";
import PageCreatePublish from '../../../support/pageCreatePublish';
import LoginGhost from '../../../support/login';

import { Constantes } from "../../../support/constantes";

const dataPrueba = require("./data/titulo_corto.json");

describe('Escenario #20 - Crear un tag, y asignarle a un page', () => {
    beforeEach(()=>{
        //Iniciar sesión en ghost antes de comenzar la prueba
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
        LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
        LoginGhost.clickBotonSignIn(); 
   })
    it('ESC119 - Crear un nuevo tag corto, Crear un nuevo page y asignarle el tag creado -APiori',() => {
        let i = new Number();
        let pageTitulo = faker.commerce.productName();
        let tag = new String();
        i = getRandom(0, dataPrueba.length);
        tag = dataPrueba[i];
        tag = JSON.stringify(dataPrueba[i].title).replace(/"/g, '');
        console.log("tag:"+tag)
        generarTagAsigPage(tag, pageTitulo)
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
function getRandom(min, max) {
    max = max - 1;
    return Math.floor(Math.random() * (max - min)) + min;
}