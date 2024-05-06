import LoginGhost from "../support/login";

describe("Escenario para validar y verificar login de la aplicación ghost", () => {
  const USER_GHOST = "wilderlopezm@gmail.com";
  const PASS_GHOST = "12345678901";

  beforeEach(() => {
    LoginGhost.visit();
    
  });

  it("Test primer caso no se diligencian los campos de email y password -> error", () => {
    LoginGhost.clickBotonSignIn();
    LoginGhost.errorLogin().then((errorMessage) => {
      expect(errorMessage).to.equal("Retry");
    });
  });

  it("Test segundo caso no se diligencia password -> error", () => {
    LoginGhost.diligenciarEmail(USER_GHOST);
    LoginGhost.clickBotonSignIn();
    LoginGhost.errorLogin().then((errorMessage) => {
      expect(errorMessage).to.equal("Retry");
    });
  });

  it("Test tercer caso no se diligencia email -> error", () => {
    LoginGhost.diligenciarPassword(PASS_GHOST);
    LoginGhost.clickBotonSignIn();
    LoginGhost.errorLogin().then((errorMessage) => {
      expect(errorMessage).to.equal("Retry");
    });
  });

  it("Cuarto caso diligencia email y password correctos -> get dashboard success", () => {
    LoginGhost.diligenciarEmail(USER_GHOST);
    LoginGhost.diligenciarPassword(PASS_GHOST);
    LoginGhost.clickBotonSignIn();

    cy.request("https://ghost-aaej.onrender.com/ghost/#/dashboard").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });
});