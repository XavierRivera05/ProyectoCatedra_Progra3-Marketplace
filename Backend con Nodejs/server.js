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
app.get('/api/productos', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Producto'); // ajusta si la tabla se llama diferente
    res.json(result.recordset); // devuelve los productos reales
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los productos' });
  }
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