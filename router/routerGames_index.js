const express = require('express');
const router = express.Router();
const fs = require('fs');
//
const link = "/games";
const pathFile = "./json/games.json";

router.get(link + "/:index", (req, res) => {
    fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al leer el archivo JSON' });
            return;
        }
        try {
            const game = JSON.parse(data)[req.params.index];
            if (game == undefined) {
                res.status(404).json({ error: 'Error , index invalid' });
            } else {
                res.json(game);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al analizar el archivo JSON' });
        }
    });
});


module.exports = router;