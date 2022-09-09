const fs = require('fs');

class Model {
    constructor() {
        this.puppeteer = require("puppeteer");
        this.browser = null;
        this.page = null;
        console.log("BUILDING...")
    }
    dynamicBuildVar(datas) {
        // console.log("passhere :: ", datas)
        for (var data in datas) {
            var value = datas[data];
            eval(`this.${data} = '${value}'`);
        }
    }

    async buildBrowser() {
        const browser = await this.puppeteer.launch({
            headless: true,
            slowMo: 200,
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
            ]
        });
        this.browser = browser;
        const page = await browser.newPage();
        this.page = page;
        await this.page.setViewport({ width: 1280, height: 800 });
    }

    async getImagesFromUrl() {
        try {
            let imagesHref = await this.page.evaluate((sel) => {
                listUrl = [];
                document.querySelectorAll(sel).forEach(element => {
                    listUrl.push(element.getAttribute('src').replace('/', ''));
                });
                return listUrl;
            }, this.tls_scrap_img);

            for (let i = 0; i < imagesHref.length; i++) {
                try {
                    console.log("writting pic :: ",)
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

    async saveImage(imageHref, counter) {
        counter += 1;
        var domain = `https://${this.getDomainUrl(url)}`;
        const localPage = this.page;
        var viewSource = await localPage.goto(imageHref);
        var scanName = this.tls_url_scrap.replace(" ", "_");
        await fs.writeFile(`img/test/${scanName}_${counter}.png`, await viewSource.buffer(), function (err) {
            if (err) {
                return console.log("saveImage() : Error in writting file :: " + err);
            }

            console.log("The file was saved!");
        });
    }

    async goToUrl(url) {
        try {
            this.currentUrl = `https://${url}`;
            await this.page.goto(this.currentUrl);
            await this.page.screenshot({ path: `./debug/debugpic.jpg` });
            console.log("startwait");
            await this.sleep(10000);
            console.log("endwait");
            await this.page.screenshot({ path: `./debug/debugpic2.jpg` });
        } catch (error) {
            console.log("Error when navigate to :: ", this.currentUrl);
            console.log("ERROR:: ", error);
            await this.page.screenshot({ path: `./debug/errorpic.jpg` });
        }
    }

    getDomainUrl(url) {
        var url = (new URL(url)).hostname;
        return url;
    }

    async closeBrowser() {
        await this.page.close();
        await this.browser.close();
    }

    async runJob() {
        try {
            await this.buildBrowser()
            await this.goToUrl(this.tls_url_scrap);
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