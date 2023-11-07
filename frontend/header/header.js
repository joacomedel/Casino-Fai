
fetch("../json/juegos.json").then(response => response.json()).then(param => cargarHeader(param));
function cargarHeader(arregloJuegos) {
    const lista = document.querySelector('.divJuegosHeader ul');
    arregloJuegos.forEach(juego => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        lista.appendChild(li);
        li.appendChild(a);
        a.textContent = juego.titulo;
        const tituloSinEspacios = juego.titulo.replace(/\s/g, '');
        a.href = "../game/" + tituloSinEspacios.toLowerCase() + ".html";
    }
    )
}
