const head = document.querySelector('head');
const body = document.querySelector('body');
//Los buscamos para no tener q buscar cada vez q se crea un componenT
class componenT extends HTMLElement {
    constructor() {
        super();
        insertComponentBefore(this.id, document.querySelector('#' + this.id));
    }
}
customElements.define("componen-t", componenT);

function insertComponentBefore(nameComp, nodeTemp) {
    //Buscamos el elemento dentro de nuestros componentes
    //Lo insertamos luego de nodeTemp y luego borramos nodeTemp
    fetch('../' + nameComp + '/' + nameComp + '.html')
        .then(res => res.text())
        .then(
            function (htmlStr) {
                loadDependencies(nameComp);
                const div = document.createElement('div');
                div.innerHTML = htmlStr;
                nodeTemp.parentNode.insertBefore(div.firstChild, nodeTemp);
                nodeTemp.remove();
            }
        );
}

function loadDependencies(nameComp) {
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '../' + nameComp + '/' + nameComp + '.css';
    head.appendChild(cssLink);
    const jsScript = document.createElement('script');
    jsScript.src = '../' + nameComp + '/' + nameComp + '.js'
    body.appendChild(jsScript);
}
/*function insertComponent(nameComp, fath) {

    fetch('../' + nameComp + '/' + nameComp + '.html')
        .then(res => res.text())
        .then(
            function (htmlStr) {
                loadDependencies(nameComp);
                const div = document.createElement('div');
                div.innerHTML = htmlStr;
                fath.appendChild(div);
            }
        );
}*/
/*function insertComponentFirst(nameComp, fath) {

    fetch('../' + nameComp + '/' + nameComp + '.html')
        .then(res => res.text())
        .then(
            function (htmlStr) {
                loadDependencies(nameComp);
                const div = document.createElement('div');
                div.innerHTML = htmlStr;
                fath.insertBefore(div.firstChild, fath.firstChild);
            }
        );
}*/
