const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const LoginGhost = require('../support/login.js'); // Importar la clase por defecto
const PageCreatePublish = require('../support/pageCreatePublish.js'); // Importar la clase por defecto
<<<<<<< HEAD
const MemberObjectModel = require('../support/memberObjectModel.js');
let loginGhost;
let pageCreatePublish;
let memberObjectModel
let totalMembers=0;
=======
const PostCreatePublish = require('../support/postCreatePublish.js'); // Importar la clase por defecto

let loginGhost;
let pageCreatePublish;
let postCreatePublish;
>>>>>>> main

//Credenciales de ghost
const USER_GHOST = "wilderlopezm@gmail.com";
const PASS_GHOST = "12345678901";

Given('I am logged into the Ghost application', async function () {
    loginGhost = new LoginGhost(this.driver);
    
    pageCreatePublish = new PageCreatePublish(this.driver);
<<<<<<< HEAD
    memberObjectModel = new MemberObjectModel(this.driver);
=======
    postCreatePublish = new PostCreatePublish(this.driver);

>>>>>>> main
    loginGhost.visit();
    await loginGhost.enterEmail(USER_GHOST);
    await loginGhost.enterPassword(PASS_GHOST);
    await loginGhost.clickSignIn();
});


//PAGE
When('I create, publish, and verify a page', async () => {
    let pageTitle = faker.commerce.productName();
    await createPublishPage(pageTitle);
    await selectImageForPage(pageTitle);
    await enterPageDetails(pageTitle);
    await publishPage(pageTitle);
    await checkPagePublished(pageTitle);
});

When('I create and schedule a page for later publication', async () => {
    let pageTitle = faker.commerce.productName();
    await createPublishPage(pageTitle);
    await selectImageForPage(pageTitle);
    await enterPageDetails(pageTitle);
    await schedulePage(pageTitle);
    await checkPageScheduled(pageTitle);
});

//POST
When('I create, publish, and verify a post', async () => {
    let postTitle = faker.commerce.productName();
    await createPublishPost(postTitle);
    await selectImageForPost(postTitle);
    await enterPostDetails(postTitle);
    await publishPost(postTitle);
    await checkPostPublished(postTitle);
});
When('I edit a post', async () => {
    let postTitle = faker.commerce.productName();
    await createPublishPost(postTitle);
    await enterPostDetails(postTitle);
    await publishPost(postTitle);
    await checkPostPublished(postTitle);
    
    let nuevoTituloPost = faker.commerce.productName(); // Generar un nuevo título de post aleatorio
    await postCreatePublish.editPost(postTitle, nuevoTituloPost); // Editar post
    await postCreatePublish.updatePost(nuevoTituloPost); // Publicar post editado
    await checkPostPublished(nuevoTituloPost); // Verificar que el post editado esté publicado
});
When('I create, publish, and verify a post with empty fields', async () => {
    let postTitle = faker.commerce.productName();
    await createPublishPost(postTitle);
    await enterPostDetails(postTitle);
    await clearDetailsPost();
    await publishPost(postTitle);
    await checkPostPublished(postTitle);
});


//PAGE
async function checkPagePublished(pageTitle) {
    await pageCreatePublish.verifyPagePublished(pageTitle);
}
async function createPublishPage(pageTitle) {
    await pageCreatePublish.visit();
    await pageCreatePublish.clickNewPage();
}
async function selectImageForPage(pageTitle) {
    await pageCreatePublish.selectImageForPage(pageTitle);
}
async function enterPageDetails(pageTitle) {
    await pageCreatePublish.enterPageDetails(pageTitle);
}
async function publishPage(pageTitle) {
    await pageCreatePublish.publishPage(pageTitle);
}
async function schedulePage(pageTitle) {
    await pageCreatePublish.schedulePage(pageTitle);
}
async function checkPageScheduled(pageTitle) {
    await pageCreatePublish.verifyPageScheduled(pageTitle);
}

//POST
async function createPublishPost(postTitle) {
    await postCreatePublish.visit();
    await postCreatePublish.clickNewPost();
}
async function selectImageForPost(postTitle) {
    await postCreatePublish.selectImageForPost(postTitle);
}
async function enterPostDetails(postTitle) {
    await postCreatePublish.enterPostDetails(postTitle);
}
async function publishPost(postTitle) {
    await postCreatePublish.publishPost(postTitle);
}
async function checkPostPublished(postTitle) {
    await postCreatePublish.verifyPostPublished(postTitle);
}
async function clearDetailsPost(){
   await postCreatePublish.clearDetailsPost(); // Limpiar el título del post
}