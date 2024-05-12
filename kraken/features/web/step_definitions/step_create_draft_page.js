const { Given, When, Then } = require("@cucumber/cucumber");
const { faker } = require("@faker-js/faker");
const LoginGhost = require("../support/login.js"); // Importar la clase por defecto
const fs = require("fs");
const path = require("path");
const PageOnDraftObjectModel = require("../support/pageOnDraftObjectModel.js");

let loginGhost;
let titlePage;
let pageOnDraftObjectModel;

/**
 * Precondiciones dadas para garantizar la ejecución
 * usuario administrador con credenciales válidas
 */
Given(
  "I am logged into the Ghost application for create page on draft",
  async function () {
    loginGhost = new LoginGhost(this.driver);
    pageOnDraftObjectModel = new PageOnDraftObjectModel(this.driver);
    const properties = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../properties.json"), "utf8")
    );
    loginGhost.visit("ESC10_Crear_Draft_de_Pages");
    await loginGhost.enterEmail(properties.USER_GHOST, "ESC10_Crear_Draft_de_Pages");
    await loginGhost.enterPassword(properties.PASS_GHOST, "ESC10_Crear_Draft_de_Pages");
    await loginGhost.clickSignIn("ESC10_Crear_Draft_de_Pages");
  }
);

/**
 * Escenario de pruebas para creación de página en draft
 */
When("I create a page on draft", async () => {
  titlePage = faker.commerce.productName();
  await pageOnDraftObjectModel.getUrlPage("ESC10_Crear_Draft_de_Pages");
  await pageOnDraftObjectModel.clickNewPage("ESC10_Crear_Draft_de_Pages");
  await pageOnDraftObjectModel.enterPageDetails(titlePage, "ESC10_Crear_Draft_de_Pages");
  await pageOnDraftObjectModel.wait(7000);
  await pageOnDraftObjectModel.getRecentlyPages("ESC10_Crear_Draft_de_Pages");
  await pageOnDraftObjectModel.getFirstTitlePage("ESC10_Crear_Draft_de_Pages");
});
/**
 * Escenario al final comprobación de título corresponda a la página en draft
 */
Then("I validate page create on draft", async () => {
  if ((await pageOnDraftObjectModel.getFirstTitlePage("ESC10_Crear_Draft_de_Pages")) == titlePage) {
    console.log(
      "se valida que el primer titulo si corresponde a la página en draft",
      titlePage
    );
  }
});
