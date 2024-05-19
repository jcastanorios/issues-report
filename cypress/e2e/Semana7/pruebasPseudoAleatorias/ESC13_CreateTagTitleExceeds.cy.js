import LoginGhost from "../../../support/login"; // Importar módulo de inicio de sesión
import TagTest from "../../../support/tagTest7"; // Importar el Tag Object creado
import ScreenshotPage from "../../../support/screenshot"; // Importar módulo para capturar pantallas
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos

let datosEntrada = new Object();

describe("Escenario para validar y verificar la creación y la publicación de un tag en la aplicación ghost", () => {
    //Credenciales de ghost
    const USER_GHOST = "wilderlopezm@gmail.com"; 
    const PASS_GHOST = "12345678901"; 

    const apiUrl = `https://my.api.mockaroo.com/esc13.json?key=0c85de40`;
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Hubo un problema al obtener los datos desde la API.');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const indiceAleatorio = Math.floor(Math.random() * data.length);
        datosEntrada = data[indiceAleatorio];
        console.log("Datos de entrada ----->", datosEntrada);
    })
    .catch(error => {
        console.error('Error al obtener datos desde la API:', error);
    });

    beforeEach(() => {
        //Inciar sesión en ghost antes de comenzar la prueba
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(USER_GHOST); 
        LoginGhost.diligenciarPassword(PASS_GHOST);
        LoginGhost.clickBotonSignIn(); 
    });

    it("Tercer caso: Crear tag, nombre excede limite en Ghost...", () => {
        let tituloTag = new String();
        let slug = new String();
        let descript = new String();

        tituloTag = datosEntrada.titulo_195;
        slug = datosEntrada.slug_190;
        descript = datosEntrada.descript_490;
        
        newTag(); // Llamar a la función para crear y publicar un tag
        createTag(tituloTag, slug, descript); // datos del new tag
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
function getRandom(min, max) {
    max = max - 1;
    return Math.floor(Math.random() * (max - min)) + min;
}