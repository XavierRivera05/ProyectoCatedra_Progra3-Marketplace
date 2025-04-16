window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/productos")
    .then(response => response.json())
    .then(data => {
      console.log("Productos recibidos:", data);

      const contenedor = document.getElementById('contenedor-productos'); //efectivamente el div existe

      data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto-card','col-md-4', 'col-lg-3', 'd-flex'); // para que convivan Bootstrap y CSS XD
       
        //diseño de productos en Bootstrap carechimba
        card.innerHTML = `
        <div class="card shadow-sm" style="width: 18rem;">
          <img src="${producto.imagen_url}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text fw-bold">Precio: $${producto.precio}</p>
            <button class="btn btn-outline-primary mt-auto btn-agregar"> Añadir a preferidos </button>
          </div>
        </div>
      `;

        contenedor.appendChild(card);
      });

      // Esto va a servir para después cabeza de bolillo viejo
      const botones = document.querySelectorAll('.btn-agregar');
      botones.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          alert(`Producto agregado: ${data[index].nombre}`);
          // todo esto es para el carrito del fierro viejo
        });
      });
    })
    .catch(error => {
      console.error("error al cargar los productos mi cuete :(", error);
    });


//para REGISTRO DE USUARIO
const formRegistro = document.querySelector('#nuevo-usuario form');

formRegistro.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = formRegistro.querySelector('input[placeholder="Nombre"]').value;
  const correo = formRegistro.querySelector('input[placeholder="Correo"]').value;
  const contrasena = formRegistro.querySelector('input[placeholder="Contraseña"]').value;

  const nuevoUsuario = {
    nombre,
    correo,
    contrasena,
    tipo: 'cliente' //se puede cambiar por comprador si uno gusta
  };

  try {
    const response = await fetch('http://localhost:3000/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    });

    const result = await response.json();
    alert(result.mensaje || 'Usuario registrado correctamente');
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    alert('Hubo un error al registrar el usuario.');
  }
});


//para INICIO DE SESIÓN
const formLogin = document.querySelector('#usuario-registrado form');

  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = formLogin.querySelector('input[placeholder="Correo"]').value;
    const contrasena = formLogin.querySelector('input[placeholder="Contraseña"]').value;

    const datosLogin = {
      correo,
      contrasena
    };

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosLogin)
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Bienvenido, ${result.usuario.nombre}!`);
        localStorage.setItem('usuario', JSON.stringify(result.usuario));
      } else {
        alert(result.mensaje);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un error al iniciar sesión.');
    }
  });
});