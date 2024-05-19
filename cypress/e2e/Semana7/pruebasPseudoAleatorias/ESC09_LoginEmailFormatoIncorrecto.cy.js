import LoginGhost from "../../../support/login";

let datosEntrada = new Object();

describe("Escenario para validar y verificar login de la aplicación ghost", () => {
  const USER_GHOST = "wilderlopezm@gmail.com";
  const PASS_GHOST = "12345678901";

  const jsonFile = 'caracteres_especiales'; 
  const apiKey = '7df48700';

  const apiUrl = `https://my.api.mockaroo.com/${jsonFile}.json?key=${apiKey}`;
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
    LoginGhost.visit();
    //ScreenshotPage.takeScreenshot(Constantes.FOLDER_ESC_LOGIN, "login-visit");
  });

  it("Email Formato Incorrecto", () => {
    let email = new String(); // Declarar variable para almacenar el título del post
    
    email = datosEntrada.title;
    
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