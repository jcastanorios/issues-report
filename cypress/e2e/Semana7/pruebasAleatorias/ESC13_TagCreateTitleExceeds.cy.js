import LoginGhost from "../../../support/login"; // Importar módulo de inicio de sesión
import TagTest from "../../../support/tagTest7"; // Importar el Tag Object creado
import ScreenshotPage from "../../../support/screenshot"; // Importar módulo para capturar pantallas
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos


describe("Escenario para validar y verificar la creación y la publicación de un tag en la aplicación ghost", () => {
    //Credenciales de ghost
    const USER_GHOST = "wilderlopezm@gmail.com"; 
    const PASS_GHOST = "12345678901"; 

    beforeEach(() => {
        //Inciar sesión en ghost antes de comenzar la prueba
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(USER_GHOST); 
        LoginGhost.diligenciarPassword(PASS_GHOST);
        LoginGhost.clickBotonSignIn(); 
    });

    it("Tercer caso: Crear tag, nombre excede limite en Ghost...", () => {
        let tituloTag = faker.random.alphaNumeric(195);
        let slug = faker.random.alphaNumeric(190);
        let descript = faker.random.alphaNumeric(490);
        
        newTag(); // Llamar a la función para crear y publicar un tag
        createTag(tituloTag, slug, descript); // Llamar a la función para seleccionar una imagen para el page
        saveTag(); // guardar new tag
        errorSaving(); 
        cy.wait(2000); // Esperar 2 segundos
    });

});


function newTag(){

    TagTest.visit(); // Visitar la página de tags
    TagTest.clickNewTag(); // Hacer clic en el botón "New tag"
}

function createTag(tituloTag, slug, descript){
    TagTest.CreateNewTag(tituloTag, slug, descript); // Crear datos de tags
}
function saveTag(){
    TagTest.SaveNewTag(); // Crear datos de tags
}
function errorSaving(){
    TagTest.errorSave(); // Error guardar
}