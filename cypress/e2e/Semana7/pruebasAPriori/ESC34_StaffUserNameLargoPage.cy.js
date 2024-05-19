import LoginGhost from "../../../support/login"; // Importar módulo de inicio de sesión
import PageCreatePublish from "../../../support/pageCreatePublish"; // Importar el Page Object creado
import userObjectModel from "../../../support/userObjectModel";
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import { Constantes } from "../../../support/constantes";

const dataPrueba = require("./data/titulos_largos.json");

describe('Escenario #17 - Crear un page, Modificar staff y validar los cambios en Post', () => {
    beforeEach(()=>{
         //Iniciar sesión en ghost antes de comenzar la prueba
         LoginGhost.visit(); 
         LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
         LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
         LoginGhost.clickBotonSignIn(); 
    })

    //Aleatorio
    it('ESC102-Crear un nuevo page, Modificar el nombre del usuario con nombre largo y verificar el cambio -Apiori', () => {
        let titulo = faker.commerce.productName(); // Generar un título de post aleatorio
        let i = new Number();
        let userName = new String(); 
        i = getRandom(0, dataPrueba.length);
        userName = dataPrueba[i];
        userName = JSON.stringify(dataPrueba[i].title).replace(/"/g, '');
        console.log("username:"+userName)
        generarPage(titulo, userName)
    })
});   
function generarPage(tituloPage, userName){
    createPublishPage(); // Llamar a la función para crear y publicar un page
    enterPageDetails(tituloPage); // Llamar a la función para ingresar los detalles del page
    publishPage(tituloPage); // Llamar a la función para publicar un page
    checkPagePublished(tituloPage); // Llamar a la función para verificar que el page esté publicado
    cy.wait(2000); // Esperar 2 segundos
    userName = settingUser(); //Ingresar a cambiar nombre de usuario
    enterChangeUser(userName); //Cambiar el nombre de usuario
    verifyChangeUserName(userName); //verificar Cambio de Nombre
    verifyPageUserName(userName);//Verificar cambio de nombre de usuario en listado de post
}

function verifyPageUserName(userName){
    PageCreatePublish.visit();
    PageCreatePublish.verifyPageUserName(userName);
}
function settingUser(){
    userObjectModel.settingUser(); //Ingresar a cambiar nombre de usuario
    const username = faker.commerce.productName();
    return username;
}
function enterChangeUser(userName){
    userObjectModel.enterChangeUser(userName);
}
function verifyChangeUserName(userName){
    userObjectModel.verifyChangeUserName(userName);
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