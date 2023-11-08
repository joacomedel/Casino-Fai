const express = require('express');
const router = express.Router();
const fs = require('fs');
//
const link = "/faq";
const pathFile = "../json/faq.json"


router.get(link, (req, res) => {
    fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) {
            console.log(pathFile);
            res.status(500).json({ error: 'Error al leer el archivo JSON' });
            return;
        }
        try {
            const faq = JSON.parse(data);
            res.json(faq);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al analizar el archivo JSON' });
        }
    });
});

module.exports = router;