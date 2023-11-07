let express = require('express');
let app = express();
const port = 8000
const staticPath = "frontend";
const pathsRouter = require('./router/paths'); // Importa el módulo adecuadamente


//express.static(path.join(__dirname, "frontend"));
app.use(express.static("frontend"));
// Luego puedes usar el enrutador en tu aplicación de Express
app.use('/', pathsRouter); // Aquí se utiliza el enrutador
app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
})