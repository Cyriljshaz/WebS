const puppeteer = require("puppeteer");

async function TEST() {
    console.log("Starting puppeteer...");
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            // "--disable-gpu",
            // "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-sandbox",
        ]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto("https://google.com");
    const ss = await page.screenshot({ path: "./screenshot.jpg" });
    console.log(ss);
    await page.close();
    await browser.close();

}

TEST();