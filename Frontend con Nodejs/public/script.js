// Animación de botón al pasar el mouse
const botonAnimado = document.querySelector("button");
if (botonAnimado) {
    botonAnimado.addEventListener("mouseenter", () => {
        botonAnimado.style.transform = "scale(1.1)";
        botonAnimado.style.transition = "transform 0.3s ease";
    });

    botonAnimado.addEventListener("mouseleave", () => {
        botonAnimado.style.transform = "scale(1)";
    });
}