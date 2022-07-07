const { timeStamp } = require("console");
const puppeteer = require("puppeteer");

async function TEST() {
    console.log("Starting puppeteer...");
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
        ]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto("https://google.com");
    const ss = await page.screenshot({ path: "./screenshot.jpg" });
    await page.click("#W0wltc");
    const ss1 = await page.screenshot({ path: "./screenshotCLick.jpg" });
    var a = await page.$eval(".lnXdpd", element => element.getAttribute("src"));


    const svgImage = await page.$('.lnXdpd');
    await svgImage.screenshot({
        path: 'test2.png',
        omitBackground: true,
    });
    console.log(a);
    await page.close();
    await browser.close();

}


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
            await this.page.waitForNavigation()
            const p = this.page;
            const images = await p.$(this.selector);
            var a = await this.page.$eval(images, element => element.getAttribute("src"));
            console.log(a)
            var counter = 1;
            // images.forEach(async image => {
            //     // await saveImage(image, counter);
            //     // counter++;
            // });

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

    async saveImage(img, counter) {
        // const img = await page.$(this.selector);
        await img.screenshot({
            path: './img/test' + counter + '.png',
            omitBackground: true,
        });
    }

    async goToUrl(url) {
        this.currentUrl = url;
        await this.page.goto(url);
    }

    async closeBrowser() {
        await this.page.close();
        await this.browser.close();
    }
}


const scrap = new ScrapWebsite();
scrap.buildBrowser()
    .then(() => {
        scrap.goToUrl("https://www.tutorialspoint.com/puppeteer/puppeteer_id_selector.htm");
        scrap.selector = "#mainContent img";
    })
    .then(() => {
        scrap.getImagesFromUrl();
    })
    .then(() => {
        console.log("Closing browser...");
        // scrap.closeBrowser();
    });