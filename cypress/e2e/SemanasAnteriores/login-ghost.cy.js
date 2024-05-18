import LoginGhost from "../../support/login";
import { Constantes } from "../../support/constantes";
import ScreenshotPage from "../../support/screenshot";

describe("Escenario para validar y verificar login de la aplicación ghost", () => {
  const USER_GHOST = "wilderlopezm@gmail.com";
  const PASS_GHOST = "12345678901";

  beforeEach(() => {
    LoginGhost.visit();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "login-visit");
  });

  it("Test primer caso no se diligencian los campos de email y password -> error", () => {
    LoginGhost.clickBotonSignIn();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "clic-btn-sign-in");
    LoginGhost.errorLogin().then((errorMessage) => {
      expect(errorMessage).to.equal("Retry");
    });
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "error-validar-btn-retry");
  });

  it("Test segundo caso no se diligencia password -> error", () => {
    LoginGhost.diligenciarEmail(USER_GHOST);
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "no-diligencia-password");
    LoginGhost.clickBotonSignIn();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "clic-btn-sign-in-no-diligencia-password");
    LoginGhost.errorLogin().then((errorMessage) => {
      expect(errorMessage).to.equal("Retry");
    });
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "error-validar-btn-retry-sin-password");
  });

  it("Test tercer caso no se diligencia email -> error", () => {
    LoginGhost.diligenciarPassword(PASS_GHOST);
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "no-diligencia-email");
    LoginGhost.clickBotonSignIn();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "clic-btn-sign-in-no-diligencia-email");
    LoginGhost.errorLogin().then((errorMessage) => {
      expect(errorMessage).to.equal("Retry");
    });
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "error-validar-btn-retry-sin-email");
  });

  it("Cuarto caso diligencia email y password correctos -> get dashboard success", () => {
    LoginGhost.diligenciarEmail(USER_GHOST);
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "diligencia-email");
    LoginGhost.diligenciarPassword(PASS_GHOST);
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "diligencia-password");
    LoginGhost.clickBotonSignIn();
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "clic-btn-sign-in-diligencia-email-y-password");

    cy.request("https://ghost-aaej.onrender.com/ghost/#/dashboard").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
    ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "inicia-dashboad-posterior-login");
  });
});