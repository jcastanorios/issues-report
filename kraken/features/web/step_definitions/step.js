const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const LoginGhost = require('../support/login.js'); // Importar la clase por defecto
const PageCreatePublish = require('../support/pageCreatePublish.js'); // Importar la clase por defecto
const PostCreatePublish = require('../support/postCreatePublish.js'); // Importar la clase por defecto
const TagCreate = require('../support/tagCreate.js'); // Importar la clase por defecto

let loginGhost;
let pageCreatePublish;
let postCreatePublish;
let tagCreate;

//Credenciales de ghost
const USER_GHOST = "wilderlopezm@gmail.com";
const PASS_GHOST = "12345678901";

Given('I am logged into the Ghost application', async function () {
    loginGhost = new LoginGhost(this.driver);
    
    pageCreatePublish = new PageCreatePublish(this.driver);
    postCreatePublish = new PostCreatePublish(this.driver);
    tagCreate = new TagCreate(this.driver);

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

When('I create, draft, and verify a post', async () => {
    //Autor:Wilder
    let postTitle = faker.commerce.productName();
    await createPublishPost();
    await selectImageForPost(postTitle);
    await enterPostDetails(postTitle);
    await publishDraft();
    await checkPostDraft(postTitle);
});
//Page
When('I create, draft, and verify a page', async () => {
    //Autor:Wilder
    let postTitle = faker.commerce.productName();
    await createPublishPage();
    await selectImageForPage(postTitle);
    await enterPageDetails(postTitle);
    await publishPageDraft();
    await checkPageDraft(postTitle);
});

When('I create tag, page, asign tag to page, publish, and verify', async () => {
    //Autor: wilder
    console.log("Ingresando a escenario 20");
    let tagTitulo = NewTag(); //Crear el tag ->Click en new tag
    console.log("Se lleamo al nuevo tag");
    EnterNewTag(tagTitulo);//Creación del tag, con los datos titulo, color y descripción
    let pageTitulo = createPublishPage() //Crea el post -> click en post y new post
    enterPageDetails(pageTitulo); //Ingresa el titulo del post
    asignarTagPage(tagTitulo)//Asignación del tag al post
    publishPage(pageTitulo)//Publicar page
    checkPagePublished(pageTitulo); //Verificar si el post con tag estén publicados
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
async function publishPageDraft() {
    //@autor:Wilder
    await pageCreatePublish.publishPageDraft();
}
async function checkPageDraft(postTitle) {
    //@autor:Wilder
    await pageCreatePublish.verifyPageDraft(postTitle);
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
async function publishDraft() {
    //@autor:Wilder
    await postCreatePublish.publishDraft();
}
async function checkPostDraft(postTitle) {
    //@autor:Wilder
    await postCreatePublish.verifyPostDraft(postTitle);
}

//TAG
async function NewTag(){
    //@Autor: Wilder
    tagCreate.visit();
    tagCreate.clickNewTag();
    const tituloTag = faker.commerce.isbn();
    return tituloTag;
}

async function EnterNewTag(tituloTag){
    //@Autor: Wilder    
    tagCreate.CreateNewTag(tituloTag);
}

async function asignarTagPage(tagTitulo){
    //@Autor: Wilder    
    pageCreatePublish.asignarTagPage(tagTitulo);
}
