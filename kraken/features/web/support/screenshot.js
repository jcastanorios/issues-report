const fs = require('fs');

class TakeScreenshotTest {
    constructor(driver) {
        this.driver = driver;
    }

    async takeScreenshotPage(folderName, name) {
        folderName = 'screenshots/' + folderName;

        if (!fs.existsSync(folderName)){
            fs.mkdirSync(folderName, { recursive: true });
        }

        let encodedString = await this.driver.takeScreenshot();
        fs.writeFileSync(`${folderName}/${name}.png`, encodedString, 'base64');
    }
}

module.exports = TakeScreenshotTest;
