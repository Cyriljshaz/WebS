var websites = {
    "AsuraScans": [
        {
            "scs_id": "",
            "scs_last_chapter": "",
            // check new chapter
            "tls_target_chap_list": "",
            "scs_mainpage_url": "",


            // Scrap scan if new
            "tls_url_scrap": "",
            "scs_name": "",
            'tls_target_chapter_nbr': "",
            'tls_target_next_btn': "",
        }
    ]
};

websites.forEach(website => {
    try {
        const currWebsite = require('./classes/websites/' + website["tls_name"] + '.js');
    } catch (error) {
        const currWebsite = require('./classes/websites/Model.js');
        console.log("No class for web site :: " + website["tls_name"]);
    }
    eval("var scrap = new currWebsite();")
    scrap.runJob();
});
