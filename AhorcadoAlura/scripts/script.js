//Obteniendo los elementos necesarios del html para el funcionamiento de la página
const contenedorLetras = document.getElementById("contenedorLetras");
const pantallaTablero = document.getElementById("pantallaTablero");
const pantallaPrincipal = document.getElementById("pantallaPrincipal");
const btnIniciarJuego = document.getElementById("btnIniciarJuego");
const btnNuevoJuego = document.getElementById("btnNuevoJuego");
const btnDesistir = document.getElementById("btnDesistir");
const entrada = document.getElementById("entrada");
const btnAgregarPalabra = document.getElementById("btnAgregarPalabra");
const pantallaAgregarPalabra = document.getElementById("pantallaAgregarPalabra");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const btnEmpezar = document.getElementById("btnEmpezar");
const letrasFalladas = document.getElementById("letrasFalladas");
const teclado = document.getElementById("teclado");
const tablero = document.getElementById("myCanvas");
const pincel = tablero.getContext("2d");


let palabraSecreta = ""; //Variable que guarda la palabra que debe ser adivinada
let espacioDeCadaLetra = []; //Array que almacena una lista de elementos div (uno por cada letra de la palabra secreta)
let palabraNoAdivinada = "";

//Esta finción dibuja una linea horizontal en la pantalla del juego
function dibujarLineaCentral() {
    pincel.beginPath()
    pincel.lineWidth = 2;
    pincel.lineCap = "round";
    pincel.strokeStyle = "darkblue";

    pincel.moveTo(25, 240);
    pincel.lineTo(150, 240);
    pincel.stroke();
}
dibujarLineaCentral();

/*Esta función dependiendo del número de intento fallido
dibuja cada una de las lineas y formas que conforman el muñeco ahorcado*/
function dibujarFormas(num) {
    if (num == 1) {
        pincel.beginPath();
        pincel.lineWidth = 2;
        pincel.lineCap = "square";
        pincel.strokeStyle = "darkblue";

        pincel.moveTo(50, 240);
        pincel.lineTo(50, 50);
        pincel.stroke();
        return;
    }
    if (num == 2) {
        pincel.beginPath();
        pincel.lineWidth = 2;
        pincel.lineCap = "square";
        pincel.strokeStyle = "darkblue";

        pincel.moveTo(50, 50);
        pincel.lineTo(130, 50);
        pincel.stroke();
        return;
    }
    if (num == 3) {
        pincel.beginPath();
        pincel.lineWidth = 2;
        pincel.lineCap = "square";
        pincel.strokeStyle = "darkblue";

        pincel.moveTo(130, 50);
        pincel.lineTo(130, 75);
        pincel.stroke();
        return;
    }
    if (num == 4) {
        pincel.beginPath();
        pincel.lineWidth = 2;
        pincel.lineCap = "square";
        pincel.strokeStyle = "darkblue";

        pincel.arc(130, 100, 20, 0, 2 * 3.14);
        pincel.stroke();
        return;
    }
    if (num == 5) {
        pincel.beginPath();
        pincel.lineWidth = 2;
        pincel.lineCap = "square";
        pincel.strokeStyle = "darkblue";

        pincel.moveTo(130, 120);
        pincel.lineTo(130, 150);
        pincel.stroke();
        return;
    }
    if (num == 6) {
        pincel.beginPath();
        pincel.lineWidth = 2;
        pincel.lineCap = "square";
        pincel.strokeStyle = "darkblue";

        pincel.moveTo(130, 135);
        pincel.lineTo(100, 150);
        pincel.stroke();
        return;
    }
    if (num == 7) {
        pincel.beginPath();
        pincel.lineWidth = 2;
        pincel.lineCap = "square";
        pincel.strokeStyle = "darkblue";

        pincel.moveTo(130, 135);
        pincel.lineTo(160, 150);
        pincel.stroke();
        return;
    }
    if (num == 8) {
        pincel.beginPath();
        pincel.lineWidth = 2;
        pincel.lineCap = "square";
        pincel.strokeStyle = "darkblue";

        pincel.moveTo(130, 150);
        pincel.lineTo(100, 200);
        pincel.stroke();
        return;
    }
    if (num == 9) {
        pincel.beginPath();
        pincel.lineWidth = 2;
        pincel.lineCap = "square";
        pincel.strokeStyle = "darkblue";

        pincel.moveTo(130, 150);
        pincel.lineTo(160, 200);
        pincel.stroke();
        return;
    }
}

//Array que almacena algunas palabras que el usuario debe adivinar para poder ganar.
const arrayPalabras = ["ALURA", "ONE", "HTML", "JS", "CSS"];

//Esta función prepara la interfaz principal del juego
function nuevoJuego() {
    document.addEventListener("keydown", leerLetras);
    teclado.addEventListener("click", leerLetras);
    contenedorLetras.innerHTML = "";
    let indice = Math.round(Math.random() * (arrayPalabras.length - 1));
    palabraSecreta = arrayPalabras[indice];
    palabraNoAdivinada = palabraSecreta;
    let elementoDiv;
    for (let i = 0; i < palabraSecreta.length; i++) {
        elementoDiv = document.createElement("div");
        elementoDiv.setAttribute("class", "unDiv");
        contenedorLetras.appendChild(elementoDiv);
    }
    if (pantallaTablero.hasAttribute("hidden")) {
        pantallaPrincipal.setAttribute("hidden", "true");
        pantallaTablero.removeAttribute("hidden");
    }
    pincel.clearRect(0, 0, tablero.width, tablero.height);
    dibujarLineaCentral();
    conteoLetrasFalladas = 0;
    conteoLetrasAsertadas = 0;
    espacioDeCadaLetra = contenedorLetras.children;
    letrasFalladas.innerHTML = "";
    letrasFalladasArr = [];
    btnNuevoJuego.focus();
}

//Esta función se encarga de almacenar nuevas palabras en el array de palabras para adivinar.
function guardarPalabra() {
    if (entrada.value == "") {
        alert("¡Debes escribir una palabra!");
        entrada.focus();
        return;
    }
    if (/[^a-zñ]/ig.test(entrada.value)) {
        alert("¡El texto NO puede contener lo siguiente: (números, letras con acentos, espacios, guiones)");
        entrada.value = "";
        entrada.focus();
        return;
    }
    if (!arrayPalabras.includes(entrada.value)) {
        arrayPalabras.push(entrada.value.toUpperCase());
    }
    entrada.value = "";
    entrada.focus();
}

let letrasFalladasArr = []; //Array que almacena las letras de las teclas pulsadas que no forman parte de la palabra que se esta adivinando.
let conteoLetrasFalladas = 0; //Variable que va contando las letras falladas. Es el parámetro que usa la función dibujarFormas.
let conteoLetrasAsertadas = 0;//Variable que almacena la cuenta de las letras que sí forman parte de la palabra que se está adivinando.

//Esta es la función que se ejecuta cuando el usuario pulsa una tecla.
function leerLetras(ev) {
    let key;
    if (ev.type != 'click') {
        key = ev.key;
        if (/[^a-z]/ig.test(key)) return;
        if (ev.keyCode > 90 || ev.keyCode < 65) return;
        key = key.toUpperCase();
    } else if (ev.target.localName == 'button') {
        key = ev.target.innerText;
    } else {
        return;
    }

    if (palabraSecreta.includes(key)) {
        conteoLetrasAsertadas += 1;
        let indice = palabraSecreta.indexOf(key);
        espacioDeCadaLetra[indice].innerText = key;
        letrasFalladasArr.push(key);
        palabraSecreta = palabraSecreta.replace(key, ".");
        if (conteoLetrasAsertadas == palabraSecreta.length) {
            pincel.fillStyle = "green";
            pincel.font = "18px Georgia";
            pincel.fillText("Ganaste,", 180, 50);
            pincel.fillText("Felicidades!", 180, 80);
            document.removeEventListener("keydown", leerLetras);
            teclado.removeEventListener("click", leerLetras);
        }
    } else {
        conteoLetrasFalladas += 1;
        if (!letrasFalladasArr.includes(key)) {
            const elmP = document.createElement("p");
            elmP.innerText = key;
            letrasFalladasArr.push(key);
            letrasFalladas.appendChild(elmP);
        }
        dibujarFormas(conteoLetrasFalladas);
        if (conteoLetrasFalladas == 9) {
            pincel.fillStyle = "red";
            pincel.font = "18px Georgia";
            pincel.fillText("Perdiste!", 180, 50);
            pincel.fillText("Fin del juego", 180, 80);
            document.removeEventListener("keydown", leerLetras);
            teclado.removeEventListener("click", leerLetras);
            letrasFalladas.innerHTML = "";
            const palabraS = document.createElement("p");
            palabraS.innerText = "La palabra era " + palabraNoAdivinada;
            letrasFalladas.appendChild(palabraS);
        }
    }
}

//En esta parte se le agrega a cada botón su evento correspondiente
btnIniciarJuego.addEventListener("click", nuevoJuego);
btnNuevoJuego.addEventListener("click", nuevoJuego);
btnDesistir.addEventListener("click", () => {
    if (pantallaPrincipal.hasAttribute("hidden")) {
        pantallaTablero.setAttribute("hidden", "true");
        pantallaPrincipal.removeAttribute("hidden");
    }
});
btnAgregarPalabra.addEventListener("click", () => {
    pantallaPrincipal.setAttribute("hidden", "true");
    pantallaAgregarPalabra.removeAttribute("hidden");
    entrada.value = "";
    entrada.focus();
});
btnGuardar.addEventListener("click", guardarPalabra);
btnCancelar.addEventListener("click", () => {
    pantallaAgregarPalabra.setAttribute("hidden", "true");
    pantallaPrincipal.removeAttribute("hidden");
});
btnEmpezar.addEventListener("click", () => {
    pantallaAgregarPalabra.setAttribute("hidden", "true");
    pantallaTablero.removeAttribute("hidden");
    nuevoJuego();
});


