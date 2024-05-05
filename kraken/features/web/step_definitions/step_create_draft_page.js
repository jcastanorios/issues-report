const { Given, When, Then } = require("@cucumber/cucumber");
const { faker } = require("@faker-js/faker");
const LoginGhost = require("../support/login.js"); // Importar la clase por defecto
const PageCreatePublish = require("../support/pageCreatePublish.js"); // Importar la clase por defecto
const fs = require("fs");
const path = require("path");
const PageOnDraftObjectModel = require("../support/pageOnDraftObjectModel.js");

let loginGhost;
let pageCreatePublish;
/**
 * Precondiciones dadas para garantizar la ejecución
 * usuario administrador con credenciales válidas
 */
Given(
  "I am logged into the Ghost application for create page on draft",
  async function () {
    loginGhost = new LoginGhost(this.driver);
    pageCreatePublish = new PageCreatePublish(this.driver);
    pageOnDraftObjectModel= new PageOnDraftObjectModel(this.driver);
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
 * Escenario de pruebas para eliminación de un miembro para un blog
 */
When("I create a page on draft", async () => {
  pageOnDraftObjectModel.getUrlPage();
  pageOnDraftObjectModel.getRecentlyPages();
  //pageOnDraftObjectModel.filterPage();
});
/**
 * Escenario al final comprobación de cantidad de miembros en la lista
 */
Then("I validate page create on draft", async () => {

});
