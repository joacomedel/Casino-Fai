const express = require('express');
const app = express();
const port = 8000
const staticPath = "frontend";
const confgRouters = require('./router/controllerRouters'); // Importa el módulo adecuadamente


//Defino la carpeta de estaticas
app.use(express.static("frontend"));
//Permito imprimir jsons
app.use(express.json());
// Luego puedes usar el enrutador en tu aplicación de Express
const router = confgRouters();
app.use('/', router); // Aquí se utiliza el enrutador
app.use((err, req, res, next) => {
    console.error(err.stack); // Registra el error en la consola
    res.status(500).json({ mensaje: 'Error interno del servidor' });
});
app.use((req, res, next) => {
    res.status(404).json({ mensaje: 'Página no encontrada' });
});
app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
    console.log(`Servidor Express escuchando en http://localhost:${port}/index`);
})