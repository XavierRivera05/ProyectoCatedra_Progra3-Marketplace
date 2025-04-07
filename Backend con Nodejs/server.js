const express = require('express');
const cors = require('cors'); //pirulillo
const path = require('path');

const app = express(); //el expreso del cecot
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