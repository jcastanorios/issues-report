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

async function settingUser(){
    await userObjectModel.settingUser();
}
async function enterChangeUserName(userName){
    await userObjectModel.enterChangeUserName(userName);
}
async function verifyChangeUserName(userName){
    await userObjectModel.verifyChangeUserName(userName);
}
async function verifyChangeUserNamePost(userName){
    await postCreatePublish.visit();
    await postCreatePublish.verifyChangeUserNamePost(userName);
}

async function verifyChangeUserNamePage(userName){
    await pageCreatePublish.visit();
    await pageCreatePublish.verifyChangeUserNamePage(userName);
}