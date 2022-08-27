const Model = require('./Model.js')

class AsuraScans extends Model {
    constructor() {
        super()
        this.url = "https://www.tutorialspoint.com/puppeteer/puppeteer_id_selector.htm";
        this.selector = "img";

    }
}

module.exports = AsuraScans