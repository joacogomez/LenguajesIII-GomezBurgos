var pasoActual = 1;
var totalPasos = 10;

var campos = ["nombre", "raza", "clase", "reino", "arma", "registro", "vida", "batallas", "nacimiento", "aventura"];

function validarTextoLetras(valor) {
  var regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  return regex.test(valor);
}

function validarNombre(valor) {
  if (valor.trim() === "") {
    mostrarError(1, "El nombre no puede estar vacío.");
    setBorde(1, "vacio");
    return false;
  }
  if (!validarTextoLetras(valor)) {
    mostrarError(1, "Solo se permiten letras, acentos y ñ.");
    setBorde(1, "invalido");
    return false;
  }
  if (valor.trim().length < 3) {
    mostrarError(1, "El nombre debe tener al menos 3 caracteres.");
    setBorde(1, "invalido");
    return false;
  }
  return true;
}

function validarRaza(valor) {
  if (valor === "" || valor === null) {
    mostrarError(2, "Debés seleccionar una raza.");
    setBorde(2, "vacio");
    return false;
  }
  return true;
}

function validarClase(valor) {
  if (valor === "" || valor === null) {
    mostrarError(3, "Debés seleccionar una clase.");
    setBorde(3, "vacio");
    return false;
  }
  return true;
}

function validarReino(valor) {
  if (valor.trim() === "") {
    mostrarError(4, "El nombre del reino no puede estar vacío.");
    setBorde(4, "vacio");
    return false;
  }
  if (!validarTextoLetras(valor)) {
    mostrarError(4, "Solo se permiten letras, acentos y ñ.");
    setBorde(4, "invalido");
    return false;
  }
  if (valor.trim().length < 3) {
    mostrarError(4, "El nombre debe tener al menos 3 caracteres.");
    setBorde(4, "invalido");
    return false;
  }
  return true;
}

function validarArma(valor) {
  if (valor.trim() === "") {
    mostrarError(5, "El nombre del arma no puede estar vacío.");
    setBorde(5, "vacio");
    return false;
  }
  if (!validarTextoLetras(valor)) {
    mostrarError(5, "Solo se permiten letras, acentos y ñ.");
    setBorde(5, "invalido");
    return false;
  }
  if (valor.trim().length < 3) {
    mostrarError(5, "El nombre debe tener al menos 3 caracteres.");
    setBorde(5, "invalido");
    return false;
  }
  return true;
}

function validarRegistro(valor) {
  if (valor.trim() === "") {
    mostrarError(6, "El número de registro no puede estar vacío.");
    setBorde(6, "vacio");
    return false;
  }
  if (isNaN(valor)) {
    mostrarError(6, "Debe ser un número.");
    setBorde(6, "invalido");
    return false;
  }
  if (valor.trim().length !== 6) {
    mostrarError(6, "Debe tener exactamente 6 dígitos.");
    setBorde(6, "invalido");
    return false;
  }
  return true;
}

function validarVida(valor) {
  if (valor.trim() === "") {
    mostrarError(7, "Los puntos de vida no pueden estar vacíos.");
    setBorde(7, "vacio");
    return false;
  }
  if (isNaN(valor)) {
    mostrarError(7, "Debe ser un número.");
    setBorde(7, "invalido");
    return false;
  }
  var num = Number(valor);
  if (num < 1 || num > 999) {
    mostrarError(7, "Debe estar entre 1 y 999.");
    setBorde(7, "invalido");
    return false;
  }
  return true;
}

function validarBatallas(valor) {
  if (valor.trim() === "") {
    mostrarError(8, "Las batallas no pueden estar vacías.");
    setBorde(8, "vacio");
    return false;
  }
  if (isNaN(valor)) {
    mostrarError(8, "Debe ser un número.");
    setBorde(8, "invalido");
    return false;
  }
  var num = Number(valor);
  if (num < 0) {
    mostrarError(8, "No puede ser negativo.");
    setBorde(8, "invalido");
    return false;
  }
  return true;
}

function validarNacimiento(valor) {
  if (valor === "") {
    mostrarError(9, "La fecha de nacimiento no puede estar vacía.");
    setBorde(9, "vacio");
    return false;
  }
  var hoy = new Date();
  var nacimiento = new Date(valor + "T00:00:00");

  if (nacimiento > hoy) {
    mostrarError(9, "La fecha no puede ser futura.");
    setBorde(9, "invalido");
    return false;
  }

  var edad = hoy.getFullYear() - nacimiento.getFullYear();
  var mesHoy = hoy.getMonth();
  var diaHoy = hoy.getDate();
  var mesNac = nacimiento.getMonth();
  var diaNac = nacimiento.getDate();

  if (mesHoy < mesNac || (mesHoy === mesNac && diaHoy < diaNac)) {
    edad--;
  }

  if (edad < 18) {
    mostrarError(9, "El personaje debe ser mayor de 18 años (edad actual: " + edad + " años).");
    setBorde(9, "invalido");
    return false;
  }

  return true;
}

function validarAventura(valor) {
  if (valor === "") {
    mostrarError(10, "La fecha de inicio de aventura no puede estar vacía.");
    setBorde(10, "vacio");
    return false;
  }
  var hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  var aventura = new Date(valor + "T00:00:00");

  if (aventura > hoy) {
    mostrarError(10, "La fecha no puede ser posterior a hoy.");
    setBorde(10, "invalido");
    return false;
  }

  return true;
}

function validarPaso(paso) {
  var campo = document.getElementById(campos[paso - 1]);
  var valor = campo.value;
  limpiarError(paso);

  if (paso === 1) return validarNombre(valor);
  if (paso === 2) return validarRaza(valor);
  if (paso === 3) return validarClase(valor);
  if (paso === 4) return validarReino(valor);
  if (paso === 5) return validarArma(valor);
  if (paso === 6) return validarRegistro(valor);
  if (paso === 7) return validarVida(valor);
  if (paso === 8) return validarBatallas(valor);
  if (paso === 9) return validarNacimiento(valor);
  if (paso === 10) return validarAventura(valor);
  return false;
}

function mostrarError(paso, msg) {
  var el = document.getElementById("err" + paso);
  el.innerHTML = "⚠ " + msg;
}

function limpiarError(paso) {
  var el = document.getElementById("err" + paso);
  el.innerHTML = "";
}

function setBorde(paso, estado) {
  var campo = document.getElementById(campos[paso - 1]);
  campo.classList.remove("borde-verde", "borde-rojo", "borde-gris");
  if (estado === "valido") campo.classList.add("borde-verde");
  if (estado === "invalido") campo.classList.add("borde-rojo");
  if (estado === "vacio") campo.classList.add("borde-gris");
}

function resetBorde(paso) {
  var campo = document.getElementById(campos[paso - 1]);
  campo.classList.remove("borde-verde", "borde-rojo", "borde-gris");
}

function siguiente() {
  var esValido = validarPaso(pasoActual);

  if (!esValido) return;

  setBorde(pasoActual, "valido");
  document.getElementById(campos[pasoActual - 1]).disabled = true;
  limpiarError(pasoActual);

  if (pasoActual === totalPasos) {
    finalizarRegistro();
    return;
  }

  document.getElementById("q" + pasoActual).classList.add("hidden");
  pasoActual++;
  document.getElementById("q" + pasoActual).classList.remove("hidden");

  actualizarBotones();
  actualizarProgreso();
}

function retroceder() {
  if (pasoActual === 1) return;

  document.getElementById("q" + pasoActual).classList.add("hidden");
  limpiarError(pasoActual);

  pasoActual--;
  document.getElementById("q" + pasoActual).classList.remove("hidden");
  var campo = document.getElementById(campos[pasoActual - 1]);
  campo.disabled = false;
  resetBorde(pasoActual);
  limpiarError(pasoActual);

  actualizarBotones();
  actualizarProgreso();
}

function reiniciar() {
  for (var i = 1; i <= totalPasos; i++) {
    var campo = document.getElementById(campos[i - 1]);
    campo.value = "";
    campo.disabled = false;
    resetBorde(i);
    limpiarError(i);
    if (i > 1) {
      document.getElementById("q" + i).classList.add("hidden");
    }
  }

  document.getElementById("q1").classList.remove("hidden");
  document.getElementById("success").classList.add("hidden");
  document.getElementById("btn-group").classList.remove("hidden");
  pasoActual = 1;
  actualizarBotones();
}

function finalizarRegistro() {
  document.getElementById("q" + pasoActual).classList.add("hidden");
  document.getElementById("btn-group").classList.add("hidden");

  var nombre = document.getElementById("nombre").value;
  var raza = document.getElementById("raza").value;
  var clase = document.getElementById("clase").value;

  var msg = "¡Registro exitoso, <strong>" + nombre + "</strong>!<br>Tu leyenda comienza hoy.<br>¡Que la Gran Alianza guíe tus pasos, <strong>" + clase + "</strong> de los <strong>" + raza + "</strong>!";
  document.getElementById("success-msg").innerHTML = msg;
  document.getElementById("success").classList.remove("hidden");
}

function actualizarBotones() {
  var btnBack = document.getElementById("btn-back");
  btnBack.disabled = pasoActual === 1;
}

