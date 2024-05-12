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
    loginGhost.visit("ESC12_Eliminar_miembro_de_un_blog");
    await loginGhost.enterEmail(properties.USER_GHOST,"ESC12_Eliminar_miembro_de_un_blog");
    await loginGhost.enterPassword(properties.PASS_GHOST,"ESC12_Eliminar_miembro_de_un_blog");
    await loginGhost.clickSignIn("ESC12_Eliminar_miembro_de_un_blog");
  }
);

/**
 * Escenario de pruebas para eliminación de un miembro para un blog
 */
When("I delete a member", async () => {

  await memberObjectModel.getMembersPage("ESC12_Eliminar_miembro_de_un_blog");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await memberObjectModel.clickOnMembers("ESC12_Eliminar_miembro_de_un_blog");
  await memberObjectModel.setNameMember(faker.person.fullName(), "ESC12_Eliminar_miembro_de_un_blog");
  let emailFake = faker.internet.email();
  await memberObjectModel.setEmailMember(emailFake, "ESC12_Eliminar_miembro_de_un_blog");
  await memberObjectModel.saveMember("ESC12_Eliminar_miembro_de_un_blog");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await memberObjectModel.getMembersPage("ESC12_Eliminar_miembro_de_un_blog");
  totalMembers = Number(await memberObjectModel.validateMemberCreation("ESC12_Eliminar_miembro_de_un_blog"));

  //clic en el miembro de la lista
  let url = await memberObjectModel.getIdFromMemberCreate("ESC12_Eliminar_miembro_de_un_blog");
  //dirigir a la sección de eliminación por el id del miembro creado
  await memberObjectModel.getMemberPageById(url, "ESC12_Eliminar_miembro_de_un_blog");
  //dar clic elemento piñon en la sección
  await memberObjectModel.getActions("ESC12_Eliminar_miembro_de_un_blog");
  //eliminar el miembro del blog
  await memberObjectModel.getDeleteMember("ESC12_Eliminar_miembro_de_un_blog");
  //confimar eliminación
  await memberObjectModel.confirmDeleteMember("ESC12_Eliminar_miembro_de_un_blog");
});
/**
 * Escenario al final comprobación de cantidad de miembros en la lista
 */
Then("I validate member elimination", async () => {
  if ((await memberObjectModel.validateMemberCreation("ESC12_Eliminar_miembro_de_un_blog")) < totalMembers) {
    console.log(
      "Total miembros después de eliminación:",
      await memberObjectModel.validateMemberCreation("ESC12_Eliminar_miembro_de_un_blog")
    );
  }
});
