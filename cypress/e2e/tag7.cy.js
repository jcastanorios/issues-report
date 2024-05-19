import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos
import TagTest from "../support/tagTest7";
import LoginGhost from '../support/login';

describe('Crear un tag', () => {

    let userName;
    const USER_GHOST = "wilderlopezm@gmail.com"; 
    const PASS_GHOST = "12345678901"; 
    
    const pageTitulo = 'Pagina de prueba WLM 00:03';
    const tagTitulo = "Tag nuevo BS 00_03";
    beforeEach(()=>{
        //Iniciar sesión en ghost antes de comenzar la prueba
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(USER_GHOST); 
        LoginGhost.diligenciarPassword(PASS_GHOST); 
        LoginGhost.clickBotonSignIn();              
    })
    it('Crear un nuevo tag',() => {
        TagTest.visit()
        TagTest.clickNewTag()
        let tituloTag = faker.commerce.productName();
        TagTest.CreateNewTag(tituloTag)
        let metatitle = faker.commerce.productName();
        TagTest.CreateMetaData(metatitle)
        let twittertitle = faker.commerce.productName();
        TagTest.CreateTwitterCard(twittertitle)
        let facebooktitle = faker.commerce.productName();
        TagTest.CreateFacebookCard(facebooktitle)
        TagTest.SaveNewTag()
    })
})