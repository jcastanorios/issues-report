import LoginGhost from "../../../support/login"; // Importar módulo de inicio de sesión
import PostCreatePublish from "../../../support/postCreatePublish"; // Importar el Page Object creado
import { Constantes } from "../../../support/constantes";

const dataPrueba = require("./data/titulos_largos.json");

describe('Escenario #18 - Crear un post, y verificar que este publicado en borrador', () => {
    beforeEach(()=>{
         //Iniciar sesión en ghost antes de comenzar la prueba
         LoginGhost.visit(); 
         LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
         LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
         LoginGhost.clickBotonSignIn(); 
     })
     it('ESC108-Crear un nuevo post titulo largo, Verificar que este en la lista de borrador- APiori', () => {
        let i = new Number();
        let titulo = new String(); 
        i = getRandom(0, dataPrueba.length);
        titulo = dataPrueba[i];
        titulo = JSON.stringify(dataPrueba[i].title).replace(/"/g, '');
        console.log("username:"+titulo)
        generarPost(titulo)
    })

});  
function generarPost(titulo){
    createPublishPost(); //Creación del nuevo post
    enterPostDetails(titulo);//ingrese el titulo
    cy.wait(2000);
    closeNewPost();//Cerrar el post para guardar en borrador
    verifyPostDrawft(titulo); //Verificar si la publicación está en borrador
}
function verifyPostDrawft(tituloPost){
    PostCreatePublish.verifyPostDrawft(tituloPost);
}
function closeNewPost(){
    PostCreatePublish.closeNewPost();//Cierre la edición del post
}
function enterPostDetails(tituloPost){
    PostCreatePublish.enterPostDetails(tituloPost); // Ingresar datos básicos del post
}

function createPublishPost(){
    PostCreatePublish.visit(); // Visitar la página de posts
    PostCreatePublish.clickNewPost(); // Hacer clic en el botón "New post"
}
function getRandom(min, max) {
    max = max - 1;
    return Math.floor(Math.random() * (max - min)) + min;
}