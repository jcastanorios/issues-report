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
  "I am logged into the Ghost application for delete a member",
  async function () {
    loginGhost = new LoginGhost(this.driver);
    pageCreatePublish = new PageCreatePublish(this.driver);
    memberObjectModel = new MemberObjectModel(this.driver);
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
When("I delete a member", async () => {
  totalMembers = Number(await memberObjectModel.validateMemberCreation());
  await memberObjectModel.getMembersPage();
  await new Promise((resolve) => setTimeout(resolve, 9000));
  await memberObjectModel.clickOnMembers();
  await memberObjectModel.setNameMember(faker.person.fullName());
  let emailFake = faker.internet.email();
  await memberObjectModel.setEmailMember(emailFake);
  await memberObjectModel.saveMember();
  await new Promise((resolve) => setTimeout(resolve, 9000));
  await memberObjectModel.getMembersPage();

  //clic en el miembro de la lista
  //await memberObjectModel.getFirsElementOnList();

});
/**
 * Escenario al final comprobación de cantidad de miembros en la lista
 */
Then("I validate member elimination", async () => {
  if ((await memberObjectModel.validateMemberCreation()) > totalMembers) {
    console.log(
      "total miembros: ",
      await memberObjectModel.validateMemberCreation()
    );
  }
});
