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
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
            ]
        });
        this.browser = browser;
        const page = await browser.newPage();
        this.page = page;

        // Add user agent to bypass recaptcha
        var userAgent = require('user-agents');
        await this.page.setUserAgent(userAgent.toString());

        await this.page.setViewport({ width: 1280, height: 800 });
    }
    async setCurrentChapterNumber() {
        let chapterHtml = await this.page.evaluate((sel) => {
            var chapNbr = document.querySelector(sel).innerHTML;
            return chapNbr;
        }, this.tls_target_chapter_nbr);

        var chapterToList = chapterHtml.toLowerCase().split(/(chapter|chapitre)/);
        var chapNbr = parseInt(chapterToList[chapterToList.indexOf("chapter") + 1]);

        this.currentChapterNbr = chapNbr;
    }

    async getImagesFromUrl() {
        try {
            await this.setCurrentChapterNumber();
            let imagesHref = await this.page.evaluate((sel) => {
                listUrl = [];
                document.querySelectorAll(sel).forEach(element => {
                    listUrl.push(element.getAttribute('src').replace('/', ''));
                });
                return listUrl;
            }, this.tls_scrap_img);

            for (let i = 0; i < imagesHref.length; i++) {
                try {
                    await this.saveImage(imagesHref[i], i);
                } catch (error) {
                    console.log("Error getImagesFromUrl():: " + error);
                    console.log("Error getImagesFromUrl() in saving image URL :: " + imagesHref[i]);
                } finally {
                    await this.sleep();
                }
            }
        } catch (error) {
            console.log("Can't get images from url : " + error);
        }
    }

    async saveImage(imageHref, counter) {
        counter += 1; // I want it to start at 1
        const localPage = this.page;
        var viewSource = await localPage.goto(imageHref);
        var scanName = this.scs_name.replace(/(-| )/g, "_");

        var directory = `img/${scanName}/chap_${this.currentChapterNbr}`;
        // Create Dir if not exist 
        if (!fs.existsSync(directory)) {
            await fs.mkdirSync(directory, { "recursive": true });
        }
        await fs.writeFile(`${directory}/${scanName}_${counter}.png`, await viewSource.buffer(), function (err) {
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

    async sleep(min = 1, max = 3) {
        var ms = (Math.random() * (max - min) + min) * 1000;
        return await new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = Model