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
/**
 * Precondiciones dadas para garantizar la ejecución
 * usuario administrador con credenciales válidas
 */
Given(
  "I am logged into the Ghost application for create a member",
  async function () {
    loginGhost = new LoginGhost(this.driver);
    pageCreatePublish = new PageCreatePublish(this.driver);
    memberObjectModel = new MemberObjectModel(this.driver);
    const properties = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../properties.json"), "utf8")
    );
    loginGhost.visit("ESC11_Adicionar_miembro_a_un_blog");
    await loginGhost.enterEmail(properties.USER_GHOST, "ESC11_Adicionar_miembro_a_un_blog");
    await loginGhost.enterPassword(properties.PASS_GHOST, "ESC11_Adicionar_miembro_a_un_blog");
    await loginGhost.clickSignIn("ESC11_Adicionar_miembro_a_un_blog");
  }
);

/**
 * Escenario de pruebas para creación de un miembro para un blog
 */
When("I create a member", async () => {
  totalMembers = Number(await memberObjectModel.validateMemberCreation("ESC11_Adicionar_miembro_a_un_blog"));
  await memberObjectModel.getMembersPage("ESC11_Adicionar_miembro_a_un_blog");
  await memberObjectModel.clickOnMembers("ESC11_Adicionar_miembro_a_un_blog");
  await memberObjectModel.setNameMember(faker.person.fullName(), "ESC11_Adicionar_miembro_a_un_blog");
  await memberObjectModel.setEmailMember(faker.internet.email(), "ESC11_Adicionar_miembro_a_un_blog");
  await memberObjectModel.saveMember("ESC11_Adicionar_miembro_a_un_blog");
});
/**
 * Escenario al final comprobación de cantidad de miembros en la lista
 */
Then("I validate member creation", async () => {
  if ((await memberObjectModel.validateMemberCreation("ESC11_Adicionar_miembro_a_un_blog")) > totalMembers) {
    console.log("Total miembros después de creación: ", await memberObjectModel.validateMemberCreation("ESC11_Adicionar_miembro_a_un_blog"));
  }
});
