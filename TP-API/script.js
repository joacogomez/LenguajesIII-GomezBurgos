/*
 * ============================================================
 *  script.js — Lógica del Buscador de Personajes
 *  Rick and Morty API  |  Cátedra Lenguajes III - 2026
 * ============================================================
 *
 *  Este archivo maneja toda la interacción del usuario:
 *   1. Escucha de eventos (clic en botón / Enter en input)
 *   2. Validación del campo de búsqueda
 *   3. Lógica para determinar el tipo de búsqueda (ID o nombre)
 *   4. Petición a la API con fetch()
 *   5. Renderizado dinámico del resultado con innerHTML
 *   6. Manejo de errores
 * ============================================================
 */


/*
 * BASE_URL: constante con la URL raíz de la API.
 * Al centralizarla acá, si algún día cambia la URL solo hay que
 * modificarla en un lugar (principio DRY: Don't Repeat Yourself).
 */
const BASE_URL = 'https://rickandmortyapi.com/api/character';


/*
 * getElementById: busca en el DOM el elemento con el id indicado
 * y devuelve una referencia a ese nodo HTML.
 * Lo guardamos en variables para no repetir la búsqueda en el DOM
 * cada vez que necesitamos acceder al elemento (optimización).
 */
const inputBusqueda = document.getElementById('busqueda');
const btnBuscar     = document.getElementById('btnBuscar');
const divResultado  = document.getElementById('resultado');


/* ─── EVENTOS ────────────────────────────────────────────────── */

/*
 * addEventListener: "escucha" un evento sobre un elemento.
 * Formato: elemento.addEventListener('tipo-de-evento', función-a-ejecutar)
 *
 * El evento 'click' se dispara cuando el usuario hace clic en el botón.
 * La función flecha (=>) se ejecuta cada vez que ocurre ese evento.
 */
btnBuscar.addEventListener('click', () => {
    buscarPersonaje();
});

/*
 * También escuchamos el evento 'keydown' (tecla presionada) en el input.
 * Si la tecla presionada es 'Enter', ejecutamos la misma búsqueda.
 * Esto mejora la experiencia del usuario: no necesita usar el mouse.
 *
 * El parámetro 'e' (evento) contiene información sobre qué tecla se pulsó,
 * accesible a través de la propiedad e.key.
 */
inputBusqueda.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        buscarPersonaje();
    }
});


/* ─── FUNCIÓN PRINCIPAL ─────────────────────────────────────── */

/*
 * buscarPersonaje: función principal que orquesta toda la búsqueda.
 * Se ejecuta tanto al hacer clic en el botón como al presionar Enter.
 *
 * .trim() elimina los espacios en blanco al inicio y al final del texto.
 * Evita búsquedas accidentales con solo espacios.
 */
function buscarPersonaje() {
    const query = inputBusqueda.value.trim();

    /*
     * VALIDACIÓN: si el campo está vacío, mostramos un mensaje y
     * cortamos la ejecución con 'return' (no seguimos con la búsqueda).
     */
    if (query === '') {
        mostrarMensaje('🔍', 'Ingresá un nombre o un ID', 'Por favor, completá el campo de búsqueda');
        return;
    }

    /*
     * Mostramos un spinner de Bootstrap mientras esperamos la respuesta.
     * innerHTML reemplaza TODO el contenido del div resultado.
     * El spinner es un componente de Bootstrap: la clase 'spinner-border'
     * genera la animación de carga con solo CSS.
     */
    divResultado.innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border" style="color: var(--rm-green); width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3" style="color: var(--rm-blue); font-weight: 700;">Buscando personaje...</p>
        </div>
    `;

    /*
     * isNaN() (is Not a Number): devuelve true si el valor NO es un número.
     * Number(query) convierte el string a número; si no es convertible, da NaN.
     * Con el operador ! invertimos el resultado:
     *   !isNaN('42')   → true  → es un número → buscamos por ID
     *   !isNaN('Rick') → false → no es número  → buscamos por nombre
     */
    if (!isNaN(Number(query))) {
        buscarPorID(query);
    } else {
        buscarPorNombre(query);
    }
}


/* ─── PETICIONES A LA API ────────────────────────────────────── */

/*
 * buscarPorID: realiza la petición a la API usando el ID numérico.
 * La URL resultante tiene la forma: https://rickandmortyapi.com/api/character/1
 *
 * fetch() devuelve una Promise: una promesa de que en el futuro habrá
 * una respuesta. No bloquea la ejecución del resto del código mientras espera.
 *
 * .then() encadena acciones que se ejecutan CUANDO la promesa se resuelve:
 *   1er .then: recibe el objeto Response y lo convierte a JSON.
 *              .json() también devuelve una Promise, por eso necesitamos otro .then.
 *   2do .then: recibe el objeto JavaScript ya parseado (el personaje).
 *
 * .catch() captura cualquier error que ocurra en la cadena de promesas
 * (error de red, timeout, etc.).
 */
function buscarPorID(id) {
    fetch(`${BASE_URL}/${id}`)
        .then(response => manejarRespuesta(response))
        .then(personaje => renderizarCard(personaje))
        .catch(() => mostrarError());
}

/*
 * buscarPorNombre: realiza la búsqueda usando el nombre del personaje.
 * La URL usa un query string: ?name=Rick
 * La API devuelve un objeto con la forma: { info: {...}, results: [...] }
 * Tomamos únicamente el primer resultado: data.results[0]
 */
function buscarPorNombre(nombre) {
    fetch(`${BASE_URL}/?name=${encodeURIComponent(nombre)}`)
        .then(response => manejarRespuesta(response))
        .then(data => renderizarCard(data.results[0]))
        .catch(() => mostrarError());
}

/*
 * encodeURIComponent: convierte caracteres especiales a formato URL.
 * Ejemplo: "Rick Sanchez" → "Rick%20Sanchez"
 * Evita que los espacios o tildes rompan la URL.
 */


/* ─── MANEJO DE RESPUESTA HTTP ───────────────────────────────── */

/*
 * manejarRespuesta: verifica si la respuesta HTTP fue exitosa.
 *
 * fetch() NO lanza un error automáticamente cuando el servidor devuelve
 * un código de error (como 404 Not Found). Solo lanza error ante fallos de red.
 * Por eso debemos verificar manualmente con response.ok (true si el código es 2xx).
 *
 * Si la respuesta no es OK (ej: 404), lanzamos un error manualmente con 'throw'.
 * Ese error es capturado por el .catch() en la cadena de promesas.
 */
function manejarRespuesta(response) {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
}


/* ─── RENDERIZADO DE LA CARD ─────────────────────────────────── */

/*
 * renderizarCard: recibe el objeto personaje y construye el HTML de la card.
 *
 * Usamos destructuring assignment para extraer las propiedades que necesitamos
 * del objeto personaje en una sola línea, en lugar de escribir:
 *   personaje.name, personaje.status, personaje.species, etc.
 */
function renderizarCard(personaje) {

    /*
     * Destructuring: extraemos las propiedades del objeto en variables locales.
     * location.name requiere acceso anidado; lo extraemos con alias 'ubicacion'.
     * Equivale a escribir: const name = personaje.name; const status = personaje.status; etc.
     */
    const {
        name,
        status,
        species,
        image,
        location: { name: ubicacion }
    } = personaje;

    /*
     * statusClass: clase CSS que determina el color del borde de la card y del badge.
     * Convertimos el status a minúsculas con .toLowerCase() para que coincida
     * con los nombres de las clases CSS definidas en styles.css:
     * .alive, .dead, .unknown
     */
    const statusClass = status.toLowerCase();

    /*
     * Template literals (template strings): permiten construir strings multilínea
     * e incrustar expresiones JavaScript con la sintaxis ${expresion}.
     * Se delimitan con backticks (`) en lugar de comillas.
     *
     * Aquí construimos el HTML completo de la card como un string,
     * usando las clases ya definidas en styles.css.
     */
    divResultado.innerHTML = `
        <div class="personaje-card ${statusClass}">
            <img
                src="${image}"
                alt="Imagen de ${name}"
                class="card-img-personaje"
            >
            <div class="card-body-rm">
                <h2 class="card-nombre">${name}</h2>

                <!--
                    Badge de estado: clase base + clase dinámica según el status.
                    Patrón: badge-estado badge-{alive|dead|unknown}
                -->
                <span class="badge-estado badge-${statusClass} mb-3">${status}</span>

                <div class="info-row">
                    <div class="info-label">Especie</div>
                    <div class="info-value">${species}</div>
                </div>

                <div class="info-row">
                    <div class="info-label">Última ubicación</div>
                    <div class="info-value">${ubicacion}</div>
                </div>
            </div>
        </div>
    `;
}


/* ─── MENSAJES DE ESTADO ─────────────────────────────────────── */

/*
 * mostrarMensaje: función genérica para mostrar mensajes en el div resultado.
 * Recibe: ícono (emoji), texto principal y subtexto.
 * Usa la clase .msg-box definida en styles.css para el centrado con flexbox.
 */
function mostrarMensaje(icono, texto, sub) {
    divResultado.innerHTML = `
        <div class="msg-box">
            <span class="msg-icon">${icono}</span>
            <span class="msg-texto">${texto}</span>
            <span class="msg-sub">${sub}</span>
        </div>
    `;
}

/*
 * mostrarError: caso específico cuando la API no encuentra el personaje
 * o hay un error de red. Llama a mostrarMensaje con valores fijos.
 */
function mostrarError() {
    mostrarMensaje('🛸', 'Personaje no encontrado', 'Probá con otro nombre o un ID diferente');
}