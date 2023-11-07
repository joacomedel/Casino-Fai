const { log } = require('console');
const express = require('express');

const fs = require('fs');
const router = express.Router();
const linkJuegos = "/juegos"
const linkFaq = "/faq";
const pathFoldJson = "./json"
const pathJsonJuegos = pathFoldJson + "/juegos.json";
const pathJsonFaq = pathFoldJson + "/faqs.json";
//ENDPOINT JUEGOS
router.get(linkJuegos, (req, res) => {
    fs.readFile(pathJsonJuegos, 'utf8', (err, data) => {
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
//ENDPOINT JUEGOS/
router.get(linkJuegos + "/:index", (req, res) => {
    fs.readFile(pathJsonJuegos, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al leer el archivo JSON' });
            return;
        }
        try {
            const juego = JSON.parse(data)[req.params.index];
            if (juego == undefined) {
                res.status(404).json({ error: 'Error , indice invalido' });
            } else {
                res.json(juego);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al analizar el archivo JSON' });
        }
    });
});
router.post(linkJuegos, (req, res) => {
    const data = req.body
    console.log("Data del post")
    console.log(data);
    res.json(data);
});
//ENDPOINT FAQ
router.get(linkFaq, (req, res) => {
    fs.readFile(pathJsonFaq, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al leer el archivo JSON' });
            return;
        }
        try {
            console.log("200");
            const faq = JSON.parse(data);
            res.json(faq);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al analizar el archivo JSON' });
        }
    });
});
module.exports = router;