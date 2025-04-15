window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/productos")
    .then(response => response.json())
    .then(data => {
      console.log("Productos recibidos:", data);

      const contenedor = document.getElementById('contenedor-productos'); // Asegúrate que este div exista

      data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto-card'); // por si luego se usa el coso de carritos
        //esto es del carrito
        card.innerHTML = `
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p>Precio: $${producto.precio}</p>
          <img src="${producto.imagen_url}" alt="${producto.nombre}" width="200">
          <button class="btn-agregar"> Preferidos </button>
          <hr/>
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