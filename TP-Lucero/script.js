// Toggle tarjetas
function toggle(header) {
    const body = header.nextElementSibling;
    const chev = header.querySelector('.chevron');
    body.classList.toggle('open');
    chev.classList.toggle('open');
  }

  // Ejercicio 1 — Filtrar pares
  function filtrarPares(arr) {
    return arr.filter(n => n % 2 === 0);
  }
  function ejercicio1() {
    const nums = document.getElementById('e1-input').value
      .split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    const pares = filtrarPares(nums);
    document.getElementById('e1-res').textContent =
      pares.length ? pares.join(', ') : 'No hay números pares';
  }

  // Ejercicio 2 — Eliminar duplicados
  function eliminarDuplicados(arr) {
    return [...new Set(arr)];
  }
  function ejercicio2() {
    const vals = document.getElementById('e2-input').value
      .split(',').map(v => v.trim()).filter(v => v);
    document.getElementById('e2-res').textContent = eliminarDuplicados(vals).join(', ');
  }

  // Ejercicio 3 — Ordenar alfabéticamente
  function ordenarNombres(arr) {
    return arr.sort((a, b) => a.localeCompare(b, 'es'));
  }
  function ejercicio3() {
    const nombres = document.getElementById('e3-input').value
      .split(',').map(n => n.trim()).filter(n => n);
    document.getElementById('e3-res').textContent = ordenarNombres(nombres).join(', ');
  }

  // Ejercicio 4 — Suma
  function sumarArray(arr) {
    return arr.reduce((acc, n) => acc + n, 0);
  }
  function ejercicio4() {
    const nums = document.getElementById('e4-input').value
      .split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    document.getElementById('e4-res').textContent = 'Suma total: ' + sumarArray(nums);
  }

  // Ejercicio 5 — Buscar elemento
  function buscarEnArray(arr, nombre) {
    return arr.findIndex(n => n.toLowerCase() === nombre.toLowerCase());
  }
  function ejercicio5() {
    const arr = document.getElementById('e5-array').value
      .split(',').map(n => n.trim());
    const buscar = document.getElementById('e5-buscar').value.trim();
    const idx = buscarEnArray(arr, buscar);
    document.getElementById('e5-res').textContent =
      idx !== -1 ? '✓ Encontrado en índice ' + idx : '✗ No encontrado (retorna -1)';
  }

  // Ejercicio 6 — Lista dinámica
  function crearLista(nombres) {
    return nombres.map(n => '• ' + n).join('\n');
  }
  function ejercicio6() {
    const nombres = document.getElementById('e6-input').value
      .split(',').map(n => n.trim()).filter(n => n);
    document.getElementById('e6-res').textContent = crearLista(nombres);
  }

  // Ejercicio 7 — Modificar por ID
  function modificarPorId(id, texto) {
    const el = document.getElementById(id);
    if (el) { el.textContent = texto; return true; }
    return false;
  }
  function ejercicio7() {
    const id = document.getElementById('e7-id').value.trim();
    const texto = document.getElementById('e7-texto').value.trim();
    const ok = modificarPorId(id, texto);
    document.getElementById('e7-res').textContent =
      ok ? 'Elemento #' + id + ' actualizado.' : 'No se encontró ningún elemento con id="' + id + '"';
  }

  // Ejercicio 8 — Toggle clase
  function toggleClase(elemento, clase) {
    elemento.classList.toggle(clase);
  }
  function ejercicio8() {
    const box = document.getElementById('e8-box');
    toggleClase(box, 'activo');
    document.getElementById('e8-res').textContent =
      box.classList.contains('activo') ? 'Clase agregada: .activo' : 'Clase removida: .activo';
  }

  // Ejercicio 9 — Formulario dinámico
  const e9Array = [];
  function ejercicio9Agregar() {
    const val = document.getElementById('e9-input').value.trim();
    if (!val) return;
    e9Array.push(val);
    document.getElementById('e9-input').value = '';
    document.getElementById('e9-res').textContent =
      '[' + e9Array.map(v => '"' + v + '"').join(', ') + ']';
  }
  function ejercicio9Limpiar() {
    e9Array.length = 0;
    document.getElementById('e9-res').textContent = '';
  }

  // Ejercicio 10 — Generar tarjetas
  function generarTarjetas(usuarios) {
    const contenedor = document.getElementById('e10-res');
    contenedor.innerHTML = '';
    usuarios.forEach(u => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML =
        '<div class="user-avatar">' + u.inicial + '</div>' +
        '<div>' +
          '<p class="user-name">' + u.nombre + '</p>' +
          '<p class="user-rol">' + u.rol + '</p>' +
        '</div>';
      contenedor.appendChild(card);
    });
  }
  function ejercicio10() {
    const usuarios = [
      { nombre: 'Ana García',   rol: 'Frontend Dev',   inicial: 'AG' },
      { nombre: 'Luis Pérez',   rol: 'Backend Dev',    inicial: 'LP' },
      { nombre: 'María López',  rol: 'Diseñadora UX',  inicial: 'ML' },
    ];
    generarTarjetas(usuarios);
  }