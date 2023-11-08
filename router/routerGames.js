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
    //Verifico si dos arreglos son iguales , con cortocircuito
    let equals = true;
    let i = 0;
    const n = arr1.length;
    if (n == arr2.length) {
        do {
            equals = arr1[i] == arr2[i];
            i++;
        } while (equals && i < n);
    } else {
        equals = false;
    }
    return equals;
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
        //solo entro si es array
        let i = 0;
        const n = arrJson.length;
        do {
            //Para cada elemento del array de entrada
            propNameRight = arrayEquals(Object.getOwnPropertyNames(arrJson[i]), attrJson);
            //verifico q el elemento tenga los nombres de propiedades correctos
            if (propNameRight) {
                propTypeRight = checkTypeString(arrJson[i]);
                //Si es q el nombre de propiedad este bien , verifico q el tipo de atributo este bien
            }
            i++;
        } while (propNameRight && propTypeRight && i < n);
        if (!propNameRight) {
            res.status(500).json({ status: "name prop is wrong" })
        } else {
            if (!propTypeRight) {
                res.status(500).json({ status: "type prop is wrong" })
            } else {
                if (fs.existsSync(pathFile)) {
                    fs.unlinkSync(pathFile);
                }
                fs.writeFileSync(pathFile, JSON.stringify(arrJson));
                res.status(200).json({ status: "success" });
            }
        }
    } else {
        res.status(500).json({ status: "post item is not a array" });
    }
});

router.put(link, (req, res) => {
    let input = req.body;
    let propNameRight = true;
    let propTypeRight = true;
    if (!Array.isArray(input)) {
        //Convierto en array
        input = [input];
    }
    let i = 0;
    const n = input.length;
    do {
        //Para cada elemento del array de entrada
        propNameRight = arrayEquals(Object.getOwnPropertyNames(input[i]), attrJson);
        //verifico q el elemento tenga los nombres de propiedades correctos
        if (propNameRight) {
            propTypeRight = checkTypeString(input[i]);
            //Si es q el nombre de propiedad este bien , verifico q el tipo de atributo este bien
        }
        i++;
    } while (propNameRight && propTypeRight && i < n);
    if (!propNameRight) {
        res.status(500).json({ status: "name prop is wrong" })
    } else {
        if (!propTypeRight) {
            res.status(500).json({ status: "type prop is wrong" })
        } else {
            if (!fs.existsSync(pathFile)) {
                //si el elemento no existe , lo creo
                fs.writeFileSync(pathFile, JSON.stringify(input));
            } else {
                //leo el actual
                fs.readFile(pathFile, 'utf8', (err, data) => {
                    if (!err) {
                        //elimino el actual
                        fs.unlinkSync(pathFile);
                        //Creo el nuevo concatenando los el ya creado con el input 
                        fs.writeFileSync(pathFile, JSON.stringify(JSON.parse(data).concat(input)), null, 2);
                        res.status(200).json({ status: "success" });
                    } else {
                        res.status(500).json({ status: "error" });
                    }
                })
            }

        }
    }


})
module.exports = router;