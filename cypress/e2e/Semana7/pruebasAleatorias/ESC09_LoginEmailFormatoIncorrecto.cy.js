import LoginGhost from "../../../support/login";
import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos


describe("Escenario para validar y verificar login de la aplicación ghost", () => {
  const USER_GHOST = "wilderlopezm@gmail.com";
  const PASS_GHOST = "12345678901";

  beforeEach(() => {
    LoginGhost.visit();
    //ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "login-visit");
  });

  it("Email Formato Incorrecto", () => {
    let email = faker.string.alphanumeric(100);
    
    LoginGhost.diligenciarEmail(email);
    LoginGhost.diligenciarPassword(PASS_GHOST);
    //ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "no-diligencia-password");
    LoginGhost.clickBotonSignIn();
    //ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "clic-btn-sign-in-no-diligencia-password");
    LoginGhost.errorLogin().then((errorMessage) => {
      expect(errorMessage).to.equal("Retry");
    });
    //ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "error-validar-btn-retry-sin-password");
  });
});

function getRandom(min, max) {
    max = max - 1;
    return Math.floor(Math.random() * (max - min)) + min;
}