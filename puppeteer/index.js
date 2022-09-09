var websites = [
    {
        "tls_name": "AsuraScans",
        "tls_target_chap_list": "",
        "scs_mainpage_url": "",
        'tls_target_next_btn': "",
        'tls_scrap_img': "#readerarea p img",
        "scans": [
            {
                "scs_last_chapter": "1",
                "scs_id": "1",
                // Scrap scan if new
                "tls_url_scrap": "www.asurascans.com/return-of-the-sss-class-ranker-chapter-1",
                "scs_name": "SSS ranker",
                'tls_target_chapter_nbr': "",
            }
        ]
    }
];

for (var website in websites) {
    var dataWeb = websites[website]
    try {
        currWebsite = require('./classes/websites/' + dataWeb["tls_name"] + '.js');
    } catch (error) {
        currWebsite = require('./classes/websites/Model.js');
        console.log("No class for web site :: " + dataWeb["tls_name"]);
        console.log("Getting default class Model");
    }
    eval("var scrap = new currWebsite();")
    var dataScans = dataWeb["scans"]; // TODO AUTO BUILD VAR LATER
    delete dataWeb.scans;
    scrap.dynamicBuildVar(dataWeb);

    var dataScan = [];
    for (var scan in dataScans) {
        dataScan = dataScans[scan]
        scrap.dynamicBuildVar(dataScan);
        scrap.runJob();
    }
}