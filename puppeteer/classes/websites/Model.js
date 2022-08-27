const fs = require('fs');

class Model {
    constructor() {
        this.puppeteer = require("puppeteer");
        this.browser = null;
        this.page = null;
    }

    async getImagesFromUrl() {
        try {
            let imagesHref = await this.page.evaluate((sel) => {
                listUrl = [];
                document.querySelectorAll(sel).forEach(element => {
                    listUrl.push(element.getAttribute('src').replace('/', ''));
                });
                return listUrl;
            }, this.selector);

            for (let i = 0; i < imagesHref.length; i++) {
                try {
                    var domain = `https://${this.getDomainUrl()}/`;
                    await this.saveImage(imagesHref[i], i);
                } catch (error) {
                    console.log("Error getImagesFromUrl():: " + error);
                    console.log("Error getImagesFromUrl() in saving image URL :: " + imageHref);
                } finally {
                    await this.sleep(2000);
                }
            }
        } catch (error) {
            console.log("Can't get images from url : " + error);
        }
    }


    async buildBrowser() {
        const browser = await this.puppeteer.launch({
            headless: true,
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
            ]
        });
        this.browser = browser;
        const page = await browser.newPage();
        this.page = page;
        await this.page.setViewport({ width: 1280, height: 800 });
    }

    async saveImage(imageHref, counter) {
        counter += 1;
        var domain = `https://${this.getDomainUrl()}/`;
        const localPage = this.page;
        console.log("Pic URL :: " + domain + imageHref);
        var viewSource = await localPage.goto(domain + imageHref);

        await fs.writeFile(`img/test/TEST-FILE-${counter}.png`, await viewSource.buffer(), function (err) {
            if (err) {
                return console.log("saveImage() : Error in writting file :: " + err);
            }

            console.log("The file was saved!");
        });
    }

    async goToUrl(url) {
        this.currentUrl = url;
        await this.page.goto(url);
    }

    getDomainUrl() {
        const url = (new URL(this.url)).hostname;
        return url;
    }

    async closeBrowser() {
        await this.page.close();
        await this.browser.close();
    }

    async runJob() {
        try {
            await this.buildBrowser()
            await this.goToUrl(this.url);
            await this.getImagesFromUrl();
            console.log("Done");
        } catch (error) {
            console.log("Can't run job : " + error);
        } finally {
            console.log("Closing browser...");
            await this.closeBrowser();
        }
    }

    async sleep(ms) {
        return await new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = Model