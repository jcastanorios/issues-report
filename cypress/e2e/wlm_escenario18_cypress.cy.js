import LoginGhost from "../support/login";
import PostCreatePublish from "../support/postCreatePublish";
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import { Constantes } from "../support/constantes";

describe('Escenario #18 - Crear un post, y verificar que este publicado en borrador', () => {
    let userName;
    beforeEach(()=>{
         //Iniciar sesión en ghost antes de comenzar la prueba
         LoginGhost.visit(); 
         LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
         LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
         LoginGhost.clickBotonSignIn(); 
     })
     it('Crear un nuevo post, Verificar que este en la lista de borrador', () => {
        let tituloPost = createPublishPost(); //Creación del nuevo post
        enterPostDetails(tituloPost);//ingrese el titulo
        cy.wait(2000);
        closeNewPost();//Cerrar el post para guardar en borrador
        verifyPostDrawft(tituloPost); //Verificar si la publicación está en borrador
    })

});  

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
    const tituloPost = faker.commerce.productName(); // Generar un título de post aleatorio

    PostCreatePublish.visit(); // Visitar la página de posts
    PostCreatePublish.clickNewPost(); // Hacer clic en el botón "New post"

    return tituloPost;
}
