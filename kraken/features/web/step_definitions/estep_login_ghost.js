const { Given, When, Then } = require('@cucumber/cucumber');
const LoginGhost = require('../support/login.js'); // Importar la clase por defecto

let loginGhost;

//Credenciales de ghost
const USER_GHOST = "wilderlopezm@gmail.com";
const PASS_GHOST = "12345678901";

Given('I am logged into the Ghost application sign in', async function () {
    loginGhost = new LoginGhost(this.driver);
    
    loginGhost.visit();
    //await loginGhost.enterEmail(USER_GHOST);
    //await loginGhost.enterPassword(PASS_GHOST);
    //await loginGhost.clickSignIn();
});

When("email and password fields are not filled in", async function () {
    await loginGhost.clickSignIn();
});

When("password fields are not filled in", async function () {
    await loginGhost.enterEmail(USER_GHOST);
    await loginGhost.clickSignIn();
});

When("email fields are not filled in", async function () {
    await loginGhost.enterPassword(PASS_GHOST);
    await loginGhost.clickSignIn();
});

Then("error message is displayed", async function () {
    let errorMessage = await loginGhost.errorLogin();
    if (errorMessage === "Retry") {
        console.log("Error message: " + errorMessage);
    } else {
        console.log("Error message: " + errorMessage);
    }

});

