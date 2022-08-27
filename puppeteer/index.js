var websites = ["AsuraScans"];

websites.forEach(website => {
    const currWebsite = require('./websites/' + website + '.js');
    eval("var scrap = new currWebsite();")
    scrap.runJob();
});
