fetch("http://localhost:8000/api/juegos").then(response => response.json()).then(param => { postFetch(param) });

function postFetch(param) {
    //Todo lo q se hace en este js es con datos cargados , asi q esperamos q los obtenga y los cargue
    cargarDatos(param);
    emparejarUltimoDiv();
    window.addEventListener('resize', emparejarUltimoDiv);
}
function cargarDatos(arregloJuegos) {
    const divJuegos = document.querySelector('.divJuegos');
    divJuegos.stylesHeight = "400px";
    for (let index = 0; index < arregloJuegos.length; index++) {
        const juego = arregloJuegos[index];
        const div = document.createElement("div");
        divJuegos.appendChild(div);
        const link = document.createElement("a");
        div.appendChild(link);
        const img = document.createElement("img");
        link.appendChild(img);
        const titulo = document.createElement("h2");
        link.appendChild(titulo);
        const tituloSinEspacios = juego.titulo.replace(/\s/g, '');
        img.src = "../assets/" + tituloSinEspacios + ".png";
        titulo.textContent = juego.titulo;
        link.href = "../game/" + tituloSinEspacios.toLowerCase() + ".html";
    }

}
function emparejarUltimoDiv() {
    /*Soluciona el problema cuando el ultimo div queda con una row entera para el solo se hace demasiado grande
    seteando el tamaño como el del primer div
    */
    const primerDiv = document.querySelector('.divJuegos div:first-child');
    const height = primerDiv.clientHeight;
    const width = primerDiv.clientWidth;
    const ultimoDiv = document.querySelector('.divJuegos  div:last-child');
    if (height != ultimoDiv.clientHeight || width != ultimoDiv.clientWidth) {
        //Si resulta q el ultimo elemento tiene un tamaño distinto , le setamos el maximo 
        ultimoDiv.style.maxWidth = width + "px";
        ultimoDiv.style.maxHeight = height + "px";
    }

}