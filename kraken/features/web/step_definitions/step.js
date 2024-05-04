const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const LoginGhost = require('../support/login.js'); // Importar la clase por defecto
const PageCreatePublish = require('../support/pageCreatePublish.js'); // Importar la clase por defecto
const MemberObjectModel = require('../support/memberObjectModel.js');
let loginGhost;
let pageCreatePublish;
let memberObjectModel
let totalMembers=0;

//Credenciales de ghost
const USER_GHOST = "wilderlopezm@gmail.com";
const PASS_GHOST = "12345678901";

Given('I am logged into the Ghost application', async function () {
    loginGhost = new LoginGhost(this.driver);
    pageCreatePublish = new PageCreatePublish(this.driver);
    memberObjectModel = new MemberObjectModel(this.driver);
    loginGhost.visit();
    await loginGhost.enterEmail(USER_GHOST);
    await loginGhost.enterPassword(PASS_GHOST);
    await loginGhost.clickSignIn();
});

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

Then('I should see the page published', async () => {
    let pageTitle = faker.commerce.productName();
    await checkPagePublished(pageTitle);
});

Then('I should see the page scheduled', async () => {
    let pageTitle = faker.commerce.productName();
    await checkPageScheduled(pageTitle);
});

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