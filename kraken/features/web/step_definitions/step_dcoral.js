const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker');
const TagsCreate = require('../support/dctagCreate.js'); // Importar la clase por defecto
const PostCreatePublish = require('../support/postCreatePublish.js'); // Importar la clase por defecto

let tagCreate;
let postCreatePublish;
let tagName = faker.commerce.productName();
let postTitle = faker.commerce.productName();


//TAG
When("I create and save a tag", async function (){
    tagCreate = new TagsCreate(this.driver);
    postCreatePublish = new PostCreatePublish(this.driver);
    await tagCreate.visit();
    await tagCreate.clickNewTag();
    await tagCreate.enterTagDetails(tagName);
    await tagCreate.clickSaveTag();
});

When('I create, assign tag and publish a post', async function (){
    nombreEscenario = "Crear tag y publicar post"
    await postCreatePublish.visit(nombreEscenario);
    await postCreatePublish.clickNewPost(nombreEscenario);
    await postCreatePublish.enterPostDetails(postTitle, nombreEscenario);
    await postCreatePublish.postSettings(nombreEscenario);
    await postCreatePublish.enterTagValue(tagName, nombreEscenario);
    await postCreatePublish.postSettings(nombreEscenario);
    await postCreatePublish.publishPost(nombreEscenario);
    await postCreatePublish.visit(nombreEscenario);
});

When('I edit a tag', async function (){
    nombreEscenario = 'Edit Tag'
    //let tagName = faker.commerce.productName();
    tagCreate = new TagsCreate(this.driver);
    postCreatePublish = new PostCreatePublish(this.driver);
    await tagCreate.visit(nombreEscenario);
    await tagCreate.clickNewTag(nombreEscenario);
    await tagCreate.enterTagDetails(tagName, nombreEscenario);
    await tagCreate.clickSaveTag(nombreEscenario);
  
    let nuevoTagName = faker.commerce.productName();
    await tagCreate.editTag(tagName, nuevoTagName, nombreEscenario);
    await tagCreate.clickSaveTag(nombreEscenario);

});

Then('I validate post with tag assigned', async function (){
    nombreEscenario = 'Post screen asigned'
    await postCreatePublish.allTagFilter(nombreEscenario);
    await postCreatePublish.selectAllTagFilter(tagName, nombreEscenario);
    await postCreatePublish.postTagListed(postTitle, nombreEscenario);

});

Then('I delete a tag', async function(){
    nombreEscenario = 'Delete tag'
    await tagCreate.clickDeleteTag(nombreEscenario)
});

Then('I validate tag in Tag list', async function (){
    nombreEscenario = 'Validate Tag'
    await tagCreate.validateTagList(tagName, nombreEscenario);
});