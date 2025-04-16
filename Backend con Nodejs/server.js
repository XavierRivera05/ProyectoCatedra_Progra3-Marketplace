const express = require('express');
const cors = require('cors'); //pirulillo
const path = require('path');
const sql = require('mssql'); //para la base de datos wei
const config = require('./dbConfig'); //llamar al archivo js de configuración

const app = express(); //el expreso del cecot (API)
const PORT = 3000;

app.use(cors());
app.use(express.json()); //middleware para recibir el JSON

// servir archivos estáticos desde "Frontend con Nodejs/public"
app.use(express.static(path.join(__dirname, '..', 'Frontend con Nodejs', 'public')));

// ruta raíz que carga el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend con Nodejs', 'public', 'index.html'));
});

// API fantastic para PRODUCTOS de la BD
app.get('/api/productos', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Producto'); // ajusta si la tabla se llama diferente
    res.json(result.recordset); // devuelve los productos reales
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ mensaje: ' error al obtener los productos :(' });
  }
});

//API para REGISTRO DE USUARIO
app.post('/api/registro', async (req, res) => {
  const { nombre, correo, contrasena, tipo } = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('correo', sql.NVarChar, correo)
      .input('contrasena', sql.NVarChar, contrasena)
      .input('tipo', sql.Char, tipo)
      .query(`
        INSERT INTO Usuario (nombre, correo, contrasena, tipo)
        VALUES (@nombre, @correo, @contrasena, @tipo)
      `);

    res.status(201).json({ mensaje: 'Usuario registrado de forma correcta :D' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
});

//API para INICIO DE SESIÓN
app.post('/api/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('correo', sql.NVarChar, correo)
      .input('contrasena', sql.NVarChar, contrasena)
      .query(`
        SELECT * FROM Usuario
        WHERE correo = @correo AND contrasena = @contrasena
      `);

    if (result.recordset.length > 0) {
      const usuario = result.recordset[0];
      res.json({
        mensaje: 'Inicio de sesión exitoso',
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          tipo: usuario.tipo
        }
      });
    } else {
      res.status(401).json({ mensaje: 'Correo o contraseña están incorrectos' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ mensaje: 'Error en el inicio de sesión :(' });
  }
});

//levantar el servidor como un cuete
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

//conectar la base de datos del todo
sql.connect(config) 
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