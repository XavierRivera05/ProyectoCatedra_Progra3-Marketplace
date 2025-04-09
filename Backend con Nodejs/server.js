const express = require('express');
const cors = require('cors'); //pirulillo
const path = require('path');
const sql = require('mssql'); //para la base de datos wei
const config = require('./dbConfig'); //llamar al archivo js de configuración

const app = express(); //el expreso del cecot (API)
const PORT = 3000;

app.use(cors());

// servir archivos estáticos desde "Frontend con Nodejs/public"
app.use(express.static(path.join(__dirname, '..', 'Frontend con Nodejs', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend con Nodejs', 'public', 'index.html'));
});

// ruta raíz que carga el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend con Nodejs', 'public', 'index.html'));
});

// ruta de la API fantastic
app.get('/api/productos', (req, res) => {
  const productos = [
    { id: 1, nombre: 'Café', precio: 5 },
    { id: 2, nombre: 'Pan dulce', precio: 2 },
    { id: 3, nombre: 'Marquesote', precio: 3 }
  ];
  res.json(productos);
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

sql.connect(config) //conectar la base de datos del todo
    .then(pool => {
        console.log('La conexión ha sido perfecta :)');
        return pool.request().query('SELECT GETDATE() AS fecha_actual');
    })
    .then(result => {
        console.log('Fecha y hora del servidor SQL:', result.recordset[0].fecha_actual);
    })
    .catch(err => {
        console.error('Hay un error en la conexión :(', err);
    });