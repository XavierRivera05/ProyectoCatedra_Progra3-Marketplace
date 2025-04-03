const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); // habilita JSON en el servidor
app.use(cors()); // habilita CORS para permitir peticiones del frontend

// ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente en expresso");
});

// iniciar servidor en el puerto a la 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Se está ejecutando en http://localhost:${PORT}`);
});