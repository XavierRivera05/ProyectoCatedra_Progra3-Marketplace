//texto animacao
document.addEventListener("DOMContentLoaded", function () {
    const textoElemento = document.querySelector(".texto-animado");
    const texto = textoElemento.textContent;
    textoElemento.textContent = ""; // borra el texto para empezar desde 0
    let index = 0;

    function escribirTexto() {
        if (index < texto.length) {
            textoElemento.textContent += texto[index];
            index++;
            setTimeout(escribirTexto, 100); // velocidad de la animación
        }
    }

    escribirTexto(); // Iniciar la animación xd
});