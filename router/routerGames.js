const { log } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');
//
const link = "/games";
const pathFile = "./json/games.json";
const attrJson = ["title", "paragraph"];
//Owns Methods  
const arrayEquals = (arr1, arr2) => {
    let propRight = true;
    let i = 0;
    const n = arr1.length;
    if (n == arr2.length) {
        do {
            propRight = arr1[i] == arr2[i];
            i++;
        } while (propRight && i < n);
    } else {
        propRight = false;
    }
    return propRight;
}
const checkTypeString = (myJson) => {
    return (typeof myJson.title === "string") && ((typeof myJson.paragraph === "string"));
}
//https
router.get(link, (req, res) => {
    fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al leer el archivo JSON' });
            return;
        }
        try {
            const game = JSON.parse(data);
            res.json(game);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al analizar el archivo JSON' });
        }
    });
});
router.post(link, (req, res) => {
    const arrJson = req.body;
    let propNameRight = true;
    let propTypeRight = true;
    if (Array.isArray(arrJson)) {
        let i = 0;
        const n = arrJson.length;
        do {
            propNameRight = arrayEquals(Object.getOwnPropertyNames(arrJson[i]), attrJson);
            if (propNameRight) {
                propTypeRight = checkTypeString(arrJson[i]);
            }
            i++;
        } while (propNameRight && propTypeRight && i < n);
        if (!propNameRight) {
            res.status(500).json({ status: "name prop is wrong" })
        } else {
            if (!propTypeRight) {
                res.status(500).json({ status: "prop type is wrong" })
            } else {
                res.status(200).json({ status: "success" });
            }
        }
    } else {
        res.status(500).json({ status: "post item is not a array" });
    }
});
module.exports = router;