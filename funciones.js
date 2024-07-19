// Definición de variables
let palabraEscondida = "";
let palabraPop = "";
let intentos = 7;
const letrasTeclado = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"; // Letras disponibles para el juego
let letrasSeleccionadas = []; // Letras que el jugador ya ha usado
let palabras = ['WINDOWS', 'PANTALLA', 'CELULAR', 'ISO', 'HACKER', 'PROGRAMADOR', 'ANDROID', 'IPHONE', 'PYTHON', 'JAVA', 'SCRIPT', 'INTERNET', 'MICROSOFT', 'FACEBOOK', 'FRAMEWORK'];

// Genera una pista para el jugador con la palabraEscondida
const pistas = { 
    'WINDOWS': 'Un sistema operativo de Microsoft',
    'PANTALLA': 'Parte de un dispositivo donde se muestra la información visual',
    'CELULAR': 'Un dispositivo móvil para llamadas y aplicaciones',
    'ISO': 'Un formato de archivo de imagen',
    'HACKER': 'Alguien que realiza actividades de seguridad informática',
    'PROGRAMADOR': 'Alguien que escribe código de computadora',
    'ANDROID': 'Un sistema operativo móvil de Google',
    'IPHONE': 'Un teléfono móvil de Apple',
    'PYTHON': 'Un lenguaje de programación de alto nivel',
    'JAVA': 'Un lenguaje de programación de taza de café',
    'SCRIPT': 'Un conjunto de instrucciones para realizar una tarea',
    'INTERNET': 'La red global de comunicación de datos',
    'MICROSOFT': 'Una empresa de tecnología',
    'FACEBOOK': 'Una red social en línea',
    'FRAMEWORK': 'Un conjunto de herramientas y bibliotecas para desarrolladores'
};

// Inicia el juego al cargar la página
iniciar(); // Llama a la función iniciar() para comenzar el juego
crearTeclado(); // Llama a la función crearTeclado() para generar el teclado

// Función para iniciar el juego
function iniciar() {
    palabraEscondida = elegirPalabraAleatoria().toUpperCase(); // Elige una palabra aleatoria y la convierte en mayúsculas
    actualizarTextoElemento("pista", "Tip: " + pistas[palabraEscondida]); // Muestra la pista
    palabraPop = "_ ".repeat(palabraEscondida.length); // Crea una cadena con guiones bajos para ocultar la palabra
    actualizarTextoElemento("palabra", palabraPop); // Actualiza el elemento HTML con la palabra oculta
    actualizarTextoElemento("intentos", "El número de intentos es de: " + intentos); // Muestra el número de intentos disponibles
    letrasSeleccionadas = []; // Reinicia la lista de letras utilizadas por el jugador
    console.log(palabraEscondida); // Muestra la palabra oculta en la consola (para fines de depuración)
    console.log(pistas[palabraEscondida])
}

// Función para elegir una palabra aleatoria de la lista
function elegirPalabraAleatoria() {
    return palabras[Math.floor(Math.random() * palabras.length)]; // Retorna una palabra aleatoria de la lista
}

// Función para mostrar un mensaje cuando el jugador gane
function palabraCorrecta() {
    swal('¡Felicidades, salvaste a Stick!', '', 'success') // Muestra un mensaje de éxito
        .then(() => {
            location.reload(); // Recargar la página al hacer clic en "Ok"
        });
}

// Función para mostrar un mensaje cuando el jugador pierda
function palabraIncorrecta() {
    swal('¡Perdiste!', 'La palabra era: ' + palabraEscondida, 'error') // Muestra un mensaje de error con la palabra correcta
        .then(() => {
            location.reload(); // Recargar la página al hacer clic en "Ok"
        });
}

// Función para comprobar si una letra está en la palabra oculta
function comprobar(letra) {
    letra = letra.toUpperCase(); // Convierte la letra ingresada a mayúsculas
    palabraEscondida = palabraEscondida.toUpperCase(); // Convierte la palabra oculta a mayúsculas
    let resultado = "";
    let letraIncorrecta = true;

    // Itera a través de la palabra oculta para comprobar si la letra es correcta
    for (let j = 0; j < palabraEscondida.length; j++) {
        if (letra == palabraEscondida[j]) {
            resultado += letra + " "; // Agrega la letra a la palabra descubierta
            letraIncorrecta = false; // Indica que la letra es correcta
        } else {
            resultado += palabraPop[j * 2] + " "; // Mantiene el guión bajo en su lugar
        }
    }

    palabraPop = resultado; // Actualiza la palabra visible
    actualizarTextoElemento("palabra", palabraPop); // Actualiza con la palabra visible

    if (letraIncorrecta) {
        intentos--; // Reduce el número de intentos si la letra es incorrecta
        actualizarTextoElemento("intentos", "El número de intentos es de: " + intentos); // Actualiza el número de intentos
        trazar(); // Dibuja la parte del ahorcado
    }

    if (intentos == 0) {
        palabraIncorrecta(); // El juego termina si se agotan los intentos
    }

    if(palabraPop.search("_") == -1) {
        palabraCorrecta(); // El juego termina si se adivina la palabra completa
    }
}

// Función para crear el teclado
function crearTeclado() {
    const teclado = document.getElementById('teclado'); // Obtiene el elemento contenedor del teclado
    letrasTeclado.split('').forEach(letra => {
        const tecla = document.createElement('div'); // Crea un elemento div para cada letra del teclado
        tecla.textContent = letra; // Asigna la letra al contenido del div
        tecla.classList.add('tecla'); // Agrega la clase 'tecla' para dar estilo
        if (letrasSeleccionadas.includes(letra)) {
            tecla.classList.add('tecla-deshabilitada'); // Deshabilita letras ya utilizadas
        } else {
            tecla.addEventListener('click', () => teclaPulsada(letra)); // Agrega un evento clic para manejar la selección de letras
        }
        teclado.appendChild(tecla); // Agrega el div al contenedor del teclado
    });
}

// Función para manejar el clic en una letra del teclado
function teclaPulsada(letra) {
    if (!letrasSeleccionadas.includes(letra)) {
        letrasSeleccionadas.push(letra); // Agrega la letra a la lista de letras utilizadas
        actualizarLetrasIngresadas(); // Actualiza la lista de letras utilizadas
        comprobar(letra); // Comprueba si la letra está en la palabra
    }
}

// Función para actualizar la lista de letras utilizadas
function actualizarLetrasIngresadas() {
    const letrasUsadas = document.getElementById('letrasIngresadas'); // Obtiene el elemento donde se muestra la lista de letras utilizadas
    letrasUsadas.textContent = letrasSeleccionadas.join(', '); // Actualiza el contenido con las letras utilizadas separadas por comas
}


// Función para dibujar el muñeco ahorcado
function trazar() {
    const canvas = document.getElementById('lienzo'); // Obtiene el elemento canvas para dibujar
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d'); // Obtiene el contexto de dibujo en 2D
        ctx.strokeStyle = '#0a0a0a'; // Color de la línea
        ctx.lineWidth = 2.5; // Grosor de la línea

        // Dibuja la base del muñeco ahorcado
        ctx.beginPath();
        ctx.moveTo(30, 200);
        ctx.lineTo(30, 10); 
        ctx.lineTo(150, 10); 
        ctx.lineTo(150, 20); 
        ctx.stroke(); 

        const ojosTamano = 4; // Tamaño de los ojos
        const ojosEnX = 6; // Desplazamiento horizontal de los ojos
        const ojosEnY = 6; // Desplazamiento vertical de los ojos

        if (intentos <= 5) {
            ctx.beginPath();
            ctx.arc(150, 40, 20, 0, Math.PI * 2); // Dibuja la cabeza
            // Eje X, Eje Y, radio del arco, angulo
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(150 - ojosEnX - ojosTamano, 40 - ojosEnY - ojosTamano);
            ctx.lineTo(150 - ojosEnX + ojosTamano, 40 - ojosEnY + ojosTamano); // Dibuja el ojo izquierdo
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(150 - ojosEnX + ojosTamano, 40 - ojosEnY - ojosTamano);
            ctx.lineTo(150 - ojosEnX - ojosTamano, 40 - ojosEnY + ojosTamano); // Dibuja el ojo derecho
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(150 + ojosEnX - ojosTamano, 40 - ojosEnY - ojosTamano);
            ctx.lineTo(150 + ojosEnX + ojosTamano, 40 - ojosEnY + ojosTamano); // Dibuja el ojo izquierdo
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(150 + ojosEnX + ojosTamano, 40 - ojosEnY - ojosTamano);
            ctx.lineTo(150 + ojosEnX - ojosTamano, 40 - ojosEnY + ojosTamano); // Dibuja el ojo derecho
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(150, 50, 8, 0, Math.PI, true); // Dibuja la boca
            // Eje X, Eje Y, radio del arco, angulo
            ctx.stroke();
        }

        if (intentos <= 4) {
            ctx.beginPath();
            ctx.moveTo(150, 60);
            // moveTo se mueve en los ejes X y Y
            ctx.lineTo(150, 100); // Dibuja el torso
            // lineTo se mueve desde la posición que dejó moveTo
            ctx.stroke();
        }

        if (intentos <= 3) {
            ctx.beginPath();
            ctx.moveTo(150, 60);
            ctx.lineTo(130, 100); // Dibuja el brazo izquierdo
            ctx.stroke();
        }

        if (intentos <= 2) {
            ctx.beginPath();
            ctx.moveTo(150, 60);
            ctx.lineTo(170, 100); // Dibuja el brazo derecho
            ctx.stroke();
        }

        if (intentos <= 1) {
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(130, 130); // Dibuja la pierna izquierda
            ctx.stroke();
        }

        if (intentos == 0) {
            ctx.beginPath();
            ctx.moveTo(150, 100);
            ctx.lineTo(170, 130); // Dibuja la pierna derecha
            ctx.stroke();
        }
    }
}

// Función para actualizar el contenido de un elemento HTML
function actualizarTextoElemento(id, texto) {
    document.getElementById(id).textContent = texto; // Actualiza un elemento y lo hace por su id
}
