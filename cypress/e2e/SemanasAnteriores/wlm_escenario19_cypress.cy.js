
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import PageCreatePublish from '../../support/pageCreatePublish';
import LoginGhost from '../../support/login';
import { Constantes } from "../../support/constantes";
describe('Escenario #19 - Crear un page, y verificar si existe en la lista allpage', () => {
    beforeEach(()=>{
        //Iniciar sesión en ghost antes de comenzar la prueba
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(Constantes.USER_GHOST); 
        LoginGhost.diligenciarPassword(Constantes.PASS_GHOST); 
        LoginGhost.clickBotonSignIn();      
    })
    it('Crear un nuevo page y Verificar que exista en la lista allpage con estado borrador', () => {
        let tituloPage = createPublishPage(); //Abre la ventana para crear la publicación
        enterPageDetails(tituloPage); //Ingresar el texto de la página

        closeNewPage();//Cerrar el post para guardar en borrador
        verifyPageDrawft(tituloPage); //Verificar si la publicación está en borrador
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