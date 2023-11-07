const express = require('express');
const fs = require('fs');
const router = express.Router();
router.get('/', function (req, res) {
    res.send("Principal");
});
router.get('/index', (req, res) => {
    console.log(__dirname + '/' + staticPath + '/index/index.html');
    res.sendFile(__dirname + '/' + staticPath + '/index/index.html');
});
router.get('/index', (req, res) => {
    res.sendFile(__dirname + '/' + staticPath + '/index/index.html');
});
//ENDPOINT JUEGOS
router.get('/juegos', (req, res) => {
    fs.readFile('./json/juegos.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al leer el archivo JSON' });
            return;
        }
        try {
            const juegos = JSON.parse(data);
            res.json(juegos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al analizar el archivo JSON' });
        }
    });
});
module.exports = router;