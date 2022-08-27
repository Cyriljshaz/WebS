var websites = ["AsuraScans", "Non existing"];

websites.forEach(website => {
    try {
        const currWebsite = require('./classes/websites/' + website + '.js');
        eval("var scrap = new currWebsite();")
        scrap.runJob();
    } catch (error) {
        console.log("No class for web site :: " + website);
    }
});
