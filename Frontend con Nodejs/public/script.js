window.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/productos")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // talvez funcione esta cosa
      })
      .catch(error => console.error("Error:", error));
  });