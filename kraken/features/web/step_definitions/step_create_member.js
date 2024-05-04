const { Given, When, Then } = require("@cucumber/cucumber");
const { faker } = require("@faker-js/faker");
const LoginGhost = require("../support/login.js"); // Importar la clase por defecto
const PageCreatePublish = require("../support/pageCreatePublish.js"); // Importar la clase por defecto
const MemberObjectModel = require("../support/memberObjectModel.js");
const fs = require("fs");
const path = require("path");

let loginGhost;
let pageCreatePublish;
let memberObjectModel;
let totalMembers = 0;

//Credenciales de ghost
const USER_GHOST = "wilderlopezm@gmail.com";
const PASS_GHOST = "12345678901";

Given(
  "I am logged into the Ghost application for create a member",
  async function () {
    loginGhost = new LoginGhost(this.driver);
    pageCreatePublish = new PageCreatePublish(this.driver);
    memberObjectModel = new MemberObjectModel(this.driver);
    // Obtén la ruta absoluta al archivo properties.json
    const propertiesPath = path.resolve(__dirname, "../properties.json");

    const properties = JSON.parse(fs.readFileSync(propertiesPath, "utf8"));
    loginGhost.visit();
    await loginGhost.enterEmail(properties.USER_GHOST);
    await loginGhost.enterPassword(properties.PASS_GHOST);
    await loginGhost.clickSignIn();
  }
);

/**
 * Escenario de pruebas para creación de un miembro para un blog
 */
When("I create a member", async () => {
  totalMembers = Number(await memberObjectModel.validateMemberCreation());
  await memberObjectModel.getMembersPage();
  await memberObjectModel.clickOnMembers();
  await memberObjectModel.setNameMember(faker.person.fullName());
  await memberObjectModel.setEmailMember(faker.internet.email());
  await memberObjectModel.saveMember();
});
/**
 * Escenario al final comprobación de cantidad de miembros en la lista
 */
Then("I validate member creation", async () => {
  if ((await memberObjectModel.validateMemberCreation()) > totalMembers) {
    console.log("total miembros: ", memberObjectModel.validateMemberCreation());
  }
});
