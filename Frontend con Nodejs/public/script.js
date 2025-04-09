window.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/productos")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // talvez funcione esta cosa
      })
      .catch(error => console.error("Error:", error));
  });

//petición a la API cocacolastic
fetch('http://localhost:3000/api/productos')
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById('contenedor-productos'); // un div donde se mostrarán los productos productosos

    data.forEach(producto => {
      const card = document.createElement('div');
      card.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p>Precio: $${producto.precio}</p>
        <img src="${producto.imagen_url}" alt="${producto.nombre}" width="200">
        <hr/>
      `;
      contenedor.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Ha ocurrido un error a la hora de mostrar los productos :(', error);
  });