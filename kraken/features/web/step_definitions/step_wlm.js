const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const UserObjectModel = require('../support/userObjectModel');
const PostCreatePublish = require('../support/postCreatePublish.js'); // Importar la clase por defecto
const PageCreatePublish = require('../support/pageCreatePublish.js'); // Importar la clase por defecto

let userObjectModel;
let postCreatePublish;
let pageCreatePublish;


Then('I change user name staff and verify post', async function () {
    userObjectModel = new UserObjectModel(this.driver);
    postCreatePublish = new PostCreatePublish(this.driver);    
    let username = faker.commerce.isbn();//Nombre aleatorio
    await settingUser();//Ingresar a cambiar username de staff
    await enterChangeUserName(username);//Cambiar username y grabar
    await verifyChangeUserName(username);//verificar el cambio
    await verifyChangeUserNamePost(username);//Verificar cambio en lista de page
});

Then('I change user name staff and verify page', async function () {
    userObjectModel = new UserObjectModel(this.driver);
    pageCreatePublish = new PageCreatePublish(this.driver);    
    let username = faker.commerce.isbn();//Nombre aleatorio
    await settingUser();//Ingresar a cambiar username de staff
    await enterChangeUserName(username);//Cambiar username y grabar
    await verifyChangeUserName(username);//verificar el cambio
    await verifyChangeUserNamePage(username);//Verificar cambio en lista de page
});

async function settingUser(nombreEscenario){
    await userObjectModel.settingUser(nombreEscenario);
}
async function enterChangeUserName(userName, nombreEscenario){
    await userObjectModel.enterChangeUserName(userName, nombreEscenario);
}
async function verifyChangeUserName(userName, nombreEscenario){
    await userObjectModel.verifyChangeUserName(userName, nombreEscenario);
}
async function verifyChangeUserNamePost(userName, nombreEscenario){
    await postCreatePublish.visit();
    await postCreatePublish.verifyChangeUserNamePost(userName, nombreEscenario);
}

async function verifyChangeUserNamePage(userName, nombreEscenario){
    await pageCreatePublish.visit();
    await pageCreatePublish.verifyChangeUserNamePage(userName, nombreEscenario);
}