import LoginGhost from "../../../support/login"; // Importar módulo de inicio de sesión
import PostCreatePublish from "../../../support/postCreatePublish"; // Importar el Page Object creado
import { Constantes } from "../../../support/constantes";

describe('Escenario #18 - Crear un post, y verificar que este publicado en borrador', () => {
    beforeEach(()=>{
         //Iniciar sesión en ghost antes de comenzar la prueba
         LoginGhost.visit(); 
         LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
         LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
         LoginGhost.clickBotonSignIn(); 
     })
     it('ESC106-Crear un nuevo post con titulo largo, Verificar que este en la lista de borrador- Pseudoaleatorio', () => {
        let lista = []
        let elem = new Object()    
        let url = "https://my.api.mockaroo.com/test_schema.json?key=888364c0";        
        cy.request(url)
        .then((response) => {
            // Verifica que la solicitud fue exitosa (código de estado 200)
            expect(response.status).to.eq(200);
            lista = response.body;
            let i = Math.floor(Math.random() * lista.length)
            elem = lista[i]
            generarPost(elem.organizacion)
        });
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
