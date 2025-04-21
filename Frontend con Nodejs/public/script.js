window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/productos")
    .then(response => response.json())
    .then(data => {
      console.log("Productos recibidos:", data);

      const contenedor = document.getElementById('contenedor-productos');

      // ========== FAVORITOS ==========
      const obtenerFavoritos = () => {
        return JSON.parse(localStorage.getItem('favoritos')) || [];
      };

      const guardarFavoritos = (favoritos) => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
      };

      const renderizarFavoritos = () => {
        const listaFavoritos = document.querySelector('.lista-favoritos');
        listaFavoritos.innerHTML = '';

        const favoritos = obtenerFavoritos();

        favoritos.forEach(prod => {
          const card = document.createElement('div');
          card.classList.add('producto-card', 'col-md-3');

          card.innerHTML = `
            <div class="card shadow-sm" style="width: 16rem;">
              <img src="${prod.imagen_url}" class="card-img-top" alt="${prod.nombre}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">${prod.descripcion}</p>
                <p class="card-text fw-bold">Precio: $${prod.precio}</p>
                <button class="btn btn-danger mt-auto btn-quitar">Quitar</button>
              </div>
            </div>
          `;

          // Botón para quitar
          card.querySelector('.btn-quitar').addEventListener('click', () => {
            const nuevosFavoritos = favoritos.filter(fav => fav.id !== prod.id);
            guardarFavoritos(nuevosFavoritos);
            renderizarFavoritos();
          });

          listaFavoritos.appendChild(card);
        });
      };

      // Renderizar todos los productos 
      data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto-card', 'col-md-4', 'col-lg-3', 'd-flex');

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

      // botones de "preferidos"
      const botones = document.querySelectorAll('.btn-agregar');
      botones.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          const favoritos = obtenerFavoritos();
          const productoSeleccionado = data[index];

          const yaExiste = favoritos.some(p => p.id === productoSeleccionado.id);
          if (!yaExiste) {
            favoritos.push(productoSeleccionado);
            guardarFavoritos(favoritos);
            renderizarFavoritos();
            alert(`Producto agregado: ${productoSeleccionado.nombre}`);
          } else {
            alert("Este producto ya está en favoritos 🧠");
          }
        });
      });

      // mostrar favoritos al cargar la página
      renderizarFavoritos();
    })
    .catch(error => {
      console.error("error al cargar los productos mi cuete :(", error);
    });

  // REGISTRAR USUARIOS
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
      tipo: 'cliente'
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

  // INICIAR SESIÓN
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
