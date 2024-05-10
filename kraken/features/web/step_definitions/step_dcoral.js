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
    
    await postCreatePublish.visit();
    await postCreatePublish.clickNewPost();
    await postCreatePublish.enterPostDetails(postTitle);
    await postCreatePublish.postSettings();
    await postCreatePublish.enterTagValue(tagName);
    await postCreatePublish.postSettings();
    await postCreatePublish.publishPost();
    await postCreatePublish.visit();
});

When('I edit a tag', async function (){
    //let tagName = faker.commerce.productName();
    tagCreate = new TagsCreate(this.driver);
    postCreatePublish = new PostCreatePublish(this.driver);
    await tagCreate.visit();
    await tagCreate.clickNewTag();
    await tagCreate.enterTagDetails(tagName);
    await tagCreate.clickSaveTag();
  
    let nuevoTagName = faker.commerce.productName();
    await tagCreate.editTag(tagName, nuevoTagName);
    await tagCreate.clickSaveTag();

});

Then('I validate post with tag assigned', async function (){
    await postCreatePublish.allTagFilter();
    await postCreatePublish.selectAllTagFilter(tagName);
    await postCreatePublish.postTagListed(postTitle);

});

Then('I delete a tag', async function(){
    await tagCreate.clickDeleteTag()
});

Then('I validate tag in Tag list', async function (){
    await tagCreate.validateTagList(tagName);
});