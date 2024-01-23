const p = require("path");
const ex = require("express");

class SpaJS {
    app;
    static spaApi;
    spaApi;

    constructor(express) {
        this.app = express;
        SpaJS.spaApi = this;
        this.spaApi = this;
        express.get("/assets/js/handler.js", (req,res) => {
            res.sendFile(p.join(__dirname, `public/handler.js`));
        })
    }

    get(path, callback, page) {
        this.app.get(path, (req, res) => {
            if (req.query["javascript"] === undefined && req.headers["javascript"] === undefined) {
                res.sendFile(p.join(__dirname, `public/index.html`));
            } else {
                callback(req, res);
            }
        });
    }
}

module.exports = SpaJS;
