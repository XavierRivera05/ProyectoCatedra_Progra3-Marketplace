window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/productos")
    .then(response => response.json())
    .then(data => {
      console.log("Productos recibidos:", data);

      const contenedor = document.getElementById('contenedor-productos'); // Asegúrate que este div exista

      data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto-card'); // por si luego se usa el coso de carritos
       
        //esto es del carrito XD
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
      console.error("Error al cargar los productos :(", error);
    });
});