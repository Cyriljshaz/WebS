const { timeStamp } = require("console");
const fs = require('fs');

// async function TEST() {
//     console.log("Starting puppeteer...");
//     const browser = await puppeteer.launch({
//         headless: true,
//         args: [
//             "--disable-setuid-sandbox",
//             "--no-sandbox",
//         ]
//     });
//     const page = await browser.newPage();
//     await page.setViewport({ width: 1280, height: 800 });
//     await page.goto("https://google.com");
//     const ss = await page.screenshot({ path: "./screenshot.jpg" });
//     await page.click("#W0wltc");
//     const ss1 = await page.screenshot({ path: "./screenshotCLick.jpg" });
//     var a = await page.$eval(".lnXdpd", element => element.getAttribute("src"));


//     const svgImage = await page.$('.lnXdpd');
//     await svgImage.screenshot({
//         path: 'test2.png',
//         omitBackground: true,
//     });
//     console.log(a);
//     await page.close();
//     await browser.close();

// }


async function saveImage(page) {
    const svgImage = await page.$('.lnXdpd');
    await svgImage.screenshot({
        path: 'test2.png',
        omitBackground: true,
    });
}


class ScrapWebsite {

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

            var counter = 1;
            imagesHref.forEach(async imageHref => {
                try {
                    await this.saveImage(imageHref);

                } catch (error) {
                    console.log("Error in saving image :: " + error);
                    console.log("Error in saving image URL :: " + imageHref);
                } finally {
                    counter++;
                }
            });
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
        var domain = `https://${this.getDomainUrl()}/`;
        console.log("Pic URL :: " + domain + imageHref);
        var viewSource = await this.page.goto(domain + imageHref);
        fs.writeFile(`img/test/TEST-FILE-${counter}.png`, await viewSource.buffer(), function (err) {
            if (err) {
                return console.log("Error in writting file :: " + err);
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
            await scrap.closeBrowser();
        }
    }
}


const scrap = new ScrapWebsite();
scrap.domain = "https://www.tutorialspoint.com/puppeteer/puppeteer_id_selector.htm";
scrap.url = "https://www.tutorialspoint.com/puppeteer/puppeteer_id_selector.htm";
scrap.selector = "img";
scrap.runJob();