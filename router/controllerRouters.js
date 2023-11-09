const express = require("express");

const routerFaq = require("./routerFaq");
const routerGames = require("./routerGames");

const mainPath = "/api";
const confgRouters = () => {
    const router = express.Router();
    router.use(mainPath, routerFaq);
    router.use(mainPath, routerGames);

    return router;
}

module.exports = confgRouters;