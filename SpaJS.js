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
            const urlAtual = req.protocol + '://' + req.get('host')
            if(!req.headers.referer.startsWith(urlAtual)) {
                res.send("Não pode acessar esse arquivo diretamente.")
                return
            }
            res.sendFile(p.join(__dirname, `public/handler.js`));
        })
    }


    get(path, callback, page) {
        this.app.get(path, (req, res) => {
            if (req.query["javascript"] === undefined && req.headers["javascript"] === undefined) {
                res.sendFile(p.join(__dirname, `public/index.html`));
            } else {
                /**
                 * @param {import('express').Request} req - O objeto Request do Express
                 * @param {import('express').Response} res - O objeto Response do Express
                 */
                callback(req, res);
            }
        });
    }
}

module.exports = SpaJS;
