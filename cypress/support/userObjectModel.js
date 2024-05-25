import { Constantes } from "./constantes";
import ScreenshotPage from "../support/screenshot"; // Importar módulo para capturar pantallas

class UserObjectModel{
    settingUser(nombreEscenario, dispositivo){
        console.log("dispositivo movil"+dispositivo)
        if (dispositivo=="Movil"){
            console.log("dispositivo movil")
            cy.get('div.gh-mobile-nav-bar-more').click({force: true})
        }
        cy.get('a[href="#/settings/"]').click(); //Clic en la herramienta
        ScreenshotPage.takeScreenshot(nombreEscenario, 'SettingUser 1'); 
        cy.get('a[href="#/settings/staff/"]').click(); //Clic en Staff
        ScreenshotPage.takeScreenshot(nombreEscenario, 'SettingUser 2'); 
        if(Constantes.VERSION_GHOST ==5){
            cy.get('a[href="#/settings/staff/wilder/"]').click(); //Clic en Wilder
        }else if(Constantes.VERSION_GHOST==4){
            cy.get('h3.apps-card-app-title').click(); //Clic en Wilder
        }
        ScreenshotPage.takeScreenshot(nombreEscenario, 'SettingUser 3'); 
    }
    enterChangeUser(UserName, nombreEscenario){
        cy.get('#user-name').clear().type(UserName, { force: true }); //Cambiar el nombre
        cy.wait(1000);
        cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').click(); //Click en save
        ScreenshotPage.takeScreenshot(nombreEscenario, 'enterChangeUser'); 
    }
    verifyChangeUserName(UserName, nombreEscenario){
        cy.get('#user-name').should('have.value', UserName); //Verificar Lo cambiado
        ScreenshotPage.takeScreenshot(nombreEscenario, 'VerifyChangeUserName'); 
        cy.wait(1000);

    }
}
export default new UserObjectModel();