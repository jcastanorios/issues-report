const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const LoginGhost = require('../support/login.js'); // Importar la clase por defecto
const PageCreatePublish = require('../support/pageCreatePublish.js'); // Importar la clase por defecto
const PostCreatePublish = require('../support/postCreatePublish.js'); // Importar la clase por defecto
//const TagCreate = require('../support/tagCreate.js'); // Importar la clase por defecto
const TakeScreenshotTest = require('../support/screenshot.js'); // Importar la clase por defecto
const TagCreate = require('../support/dctagCreate.js'); // Importar la clase por defecto

let loginGhost;
let pageCreatePublish;
let postCreatePublish;
let tagCreate;
let takeScreenshotTest;

//Credenciales de ghost
const USER_GHOST = "wilderlopezm@gmail.com";
const PASS_GHOST = "12345678901";

Given('I am logged into the Ghost application', async function () {
    loginGhost = new LoginGhost(this.driver);
    
    pageCreatePublish = new PageCreatePublish(this.driver);
    postCreatePublish = new PostCreatePublish(this.driver);
    tagCreate = new TagCreate(this.driver);
    takeScreenshotTest = new TakeScreenshotTest(this.driver);

    loginGhost.visit();
    await loginGhost.enterEmail(USER_GHOST);
    await loginGhost.enterPassword(PASS_GHOST);
    await takeScreenshotTest.takeScreenshotPage('Login', 'login');
    await loginGhost.clickSignIn();
});


//PAGE
When('I create, publish, and verify a page', async () => {
    nombreEscenario = "ESC4_CreatePage";
    let pageTitle = faker.commerce.productName();
    await createPublishPage(pageTitle, nombreEscenario);
    await selectImageForPage(pageTitle, nombreEscenario);
    await enterPageDetails(pageTitle, nombreEscenario);
    await publishPage(pageTitle, nombreEscenario);
    await checkPagePublished(pageTitle, nombreEscenario);
});

When('I create and schedule a page for later publication', async () => {
    nombreEscenario = "ESC5_SchedulePage";
    let pageTitle = faker.commerce.productName();
    await createPublishPage(pageTitle, nombreEscenario);
    await selectImageForPage(pageTitle, nombreEscenario);
    await enterPageDetails(pageTitle, nombreEscenario);
    await schedulePage(pageTitle, nombreEscenario);
    await checkPageScheduled(pageTitle, nombreEscenario);
});

//POST
When('I create, publish, and verify a post', async () => {
    nombreEscenario = "ESC1_CreatePost";
    let postTitle = faker.commerce.productName();
    await createPublishPost(postTitle, nombreEscenario);
    await selectImageForPost(postTitle, nombreEscenario);
    await enterPostDetails(postTitle, nombreEscenario);
    await publishPost(postTitle, nombreEscenario);
    await checkPostPublished(postTitle, nombreEscenario);
});
When('I edit a post', async () => {
    nombreEscenario = "ESC3_EditPost";
    let postTitle = faker.commerce.productName();
    await createPublishPost(postTitle, nombreEscenario);
    await enterPostDetails(postTitle, nombreEscenario);
    await publishPost(postTitle, nombreEscenario);
    await checkPostPublished(postTitle, nombreEscenario);
    
    let nuevoTituloPost = faker.commerce.productName(); // Generar un nuevo título de post aleatorio
    await postCreatePublish.editPost(postTitle, nuevoTituloPost, nombreEscenario); // Editar post
    await postCreatePublish.updatePost(nuevoTituloPost, nombreEscenario); // Publicar post editado
    await checkPostPublished(nuevoTituloPost, nombreEscenario); // Verificar que el post editado esté publicado
});
When('I create, publish, and verify a post with empty fields', async () => {
    let nombreEscenario = "ESC2_EditPostEmptyFields";
    let postTitle = faker.commerce.productName();
    await createPublishPost(postTitle, nombreEscenario);
    await enterPostDetails(postTitle, nombreEscenario);
    await clearDetailsPost(nombreEscenario);
    await publishPost(postTitle, nombreEscenario);
    await checkPostPublished(postTitle, nombreEscenario);
});

//danna
let postTitle2 = faker.commerce.productName();
When('I edit a post two', async () => {
    await createPublishPost(postTitle2);
    await enterPostDetails(postTitle2);
    await publishPost(postTitle2);
    await checkPostPublished(postTitle2);
    
    let nuevoTituloPost = faker.commerce.productName(); // Generar un nuevo título de post aleatorio
    await postCreatePublish.editPost(postTitle2, nuevoTituloPost); // Editar post
    await postCreatePublish.updatePost(nuevoTituloPost); // Publicar post editado
});
When('I unpublish a post and validate as draft', async () => {
    await postCreatePublish.unpublishPost()
    await postCreatePublish.verifyPostDraft(postTitle2)
})



When('I create, draft, and verify a post', async () => {
    //Autor:Wilder
    nombreEscenario = "ESC18_CreatePostDraft";
    let postTitle = faker.commerce.productName();
    await createPublishPost(nombreEscenario);
    await selectImageForPost(postTitle, nombreEscenario);
    await enterPostDetails(postTitle, nombreEscenario);
    await publishDraft(nombreEscenario);
    await checkPostDraft(postTitle), nombreEscenario;
});
//Page
When('I create, draft, and verify a page', async () => {
    //Autor:Wilder
    nombreEscenario = "ESC19_CreatePageDraft";
    let postTitle = faker.commerce.productName();
    await createPublishPage(nombreEscenario);
    await selectImageForPage(postTitle, nombreEscenario);
    await enterPageDetails(postTitle), nombreEscenario;
    await publishPageDraft(nombreEscenario);
    await checkPageDraft(postTitle, nombreEscenario);
});


When('I create, assign tag and publish a page', async function (){
    //@Autor: wilder
    nombreEscenario = "Crear tag y publicar post"
    //tagCreate = new TagsCreate(this.driver);
    let tagName = faker.commerce.isbn();
    let pageTitle = faker.commerce.productName();
    //postCreatePublish = new PostCreatePublish(this.driver);
    await tagCreate.visit();
    await tagCreate.clickNewTag();
    await tagCreate.enterTagDetails(tagName);
    await tagCreate.clickSaveTag();

    await pageCreatePublish.visit(nombreEscenario);

    await pageCreatePublish.clickNewPage(nombreEscenario);
    await pageCreatePublish.enterPageDetails(pageTitle, nombreEscenario);
    await pageCreatePublish.pageSettings(nombreEscenario);
    await pageCreatePublish.enterTagValue(tagName, nombreEscenario);
    await pageCreatePublish.pageSettings(nombreEscenario);
    await pageCreatePublish.publishPage(nombreEscenario);
    await pageCreatePublish.visit(nombreEscenario);
});


//PAGE
async function checkPagePublished(pageTitle, nombreEscenario) {
    await pageCreatePublish.verifyPagePublished(pageTitle, nombreEscenario);
}
async function createPublishPage(pageTitle, nombreEscenario) {
    await pageCreatePublish.visit(nombreEscenario);
    await pageCreatePublish.clickNewPage(nombreEscenario);
}
async function selectImageForPage(pageTitle, nombreEscenario) {
    await pageCreatePublish.selectImageForPage(pageTitle, nombreEscenario);
}
async function enterPageDetails(pageTitle, nombreEscenario) {
    await pageCreatePublish.enterPageDetails(pageTitle, nombreEscenario);
}
async function publishPage(pageTitle, nombreEscenario) {
    await pageCreatePublish.publishPage(pageTitle, nombreEscenario);
}
async function schedulePage(pageTitle, nombreEscenario) {
    await pageCreatePublish.schedulePage(pageTitle, nombreEscenario);
}
async function checkPageScheduled(pageTitle, nombreEscenario) {
    await pageCreatePublish.verifyPageScheduled(pageTitle, nombreEscenario);
}
async function publishPageDraft(nombreEscenario) {
    //@autor:Wilder
    await pageCreatePublish.publishPageDraft(nombreEscenario);
}
async function checkPageDraft(postTitle, nombreEscenario) {
    //@autor:Wilder
    await pageCreatePublish.verifyPageDraft(postTitle, nombreEscenario);
}
//POST
async function createPublishPost(postTitle, nombreEscenario) {
    await postCreatePublish.visit(nombreEscenario);
    await postCreatePublish.clickNewPost(nombreEscenario);
}
async function selectImageForPost(postTitle, nombreEscenario) {
    await postCreatePublish.selectImageForPost(postTitle, nombreEscenario);
}
async function enterPostDetails(postTitle, nombreEscenario) {
    await postCreatePublish.enterPostDetails(postTitle, nombreEscenario);
}
async function publishPost(postTitle, nombreEscenario) {
    await postCreatePublish.publishPost(postTitle, nombreEscenario);
}
async function checkPostPublished(postTitle, nombreEscenario) {
    await postCreatePublish.verifyPostPublished(postTitle, nombreEscenario);
}
async function clearDetailsPost(nombreEscenario){
   await postCreatePublish.clearDetailsPost(nombreEscenario); // Limpiar el título del post
}
async function publishDraft(nombreEscenario) {
    //@autor:Wilder
    await postCreatePublish.publishDraft(nombreEscenario);
}
async function checkPostDraft(postTitle, nombreEscenario) {
    //@autor:Wilder
    await postCreatePublish.verifyPostDraft(postTitle, nombreEscenario);
}

//TAG
async function NewTag(nombreEscenario){
    //@Autor: Wilder
    tagCreate.visit();
    tagCreate.clickNewTag(nombreEscenario);
    const tituloTag = faker.commerce.isbn();
    return tituloTag;
}

async function EnterNewTag(tituloTag, nombreEscenario){
    //@Autor: Wilder    
    tagCreate.CreateNewTag(tituloTag, nombreEscenario);
}

async function asignarTagPage(tagTitulo, nombreEscenario){
    //@Autor: Wilder    
    pageCreatePublish.asignarTagPage(tagTitulo, nombreEscenario);
}
