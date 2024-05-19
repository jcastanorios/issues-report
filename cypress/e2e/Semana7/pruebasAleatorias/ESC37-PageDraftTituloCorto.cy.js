import LoginGhost from "../../../support/login"; // Importar módulo de inicio de sesión
import PageCreatePublish from "../../../support/pageCreatePublish"; // Importar el Page Object creado
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import { Constantes } from "../../../support/constantes";

describe('Escenario #18 - Crear un post, y verificar que este publicado en borrador', () => {
    beforeEach(()=>{
         //Iniciar sesión en ghost antes de comenzar la prueba
         LoginGhost.visit(); 
         LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
         LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
         LoginGhost.clickBotonSignIn(); 
     })
     it('ESC109-Crear un nuevo page con nombre corto, Verificar que este en la lista de borrador- Aleatorio', () => {
        let titulo = faker.lorem.word(); // Generar un título aletorio
        createPublishPage(); //Abre la ventana para crear la publicación
        enterPageDetails(titulo); //Ingresar el texto de la página
        closeNewPage();//Cerrar el post para guardar en borrador
        verifyPageDrawft(titulo); //Verificar si la publicación está en borrador    
    })

});  

function verifyPageDrawft(tituloPage){
    PageCreatePublish.verifyPageDrawft(tituloPage);
}
function closeNewPage(){
    PageCreatePublish.closeNewPage();//Cierre la edición del post
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