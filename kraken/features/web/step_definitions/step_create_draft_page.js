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
    loginGhost.visit();
    await loginGhost.enterEmail(properties.USER_GHOST);
    await loginGhost.enterPassword(properties.PASS_GHOST);
    await loginGhost.clickSignIn();
  }
);

/**
 * Escenario de pruebas para creación de página en draft
 */
When("I create a page on draft", async () => {
  titlePage = faker.commerce.productName();
  await pageOnDraftObjectModel.getUrlPage();
  await pageOnDraftObjectModel.clickNewPage();
  await pageOnDraftObjectModel.enterPageDetails(titlePage);
  await pageOnDraftObjectModel.wait(7000);
  await pageOnDraftObjectModel.getRecentlyPages();
  await pageOnDraftObjectModel.getFirstTitlePage();
});
/**
 * Escenario al final comprobación de título corresponda a la página en draft
 */
Then("I validate page create on draft", async () => {
  if ((await pageOnDraftObjectModel.getFirstTitlePage()) == titlePage) {
    console.log(
      "se valida que el primer titulo si corresponde a la página en draft",
      titlePage
    );
  }
});
