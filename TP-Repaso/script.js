        // Variable global para guardar el juego seleccionado
        var juegoSeleccionado = '';

        // Variable global para saber si el registro fue exitoso
        var registroValido = false;

        // ─── Ejercicio 2: Selección de juego ──────────────────────────
        function seleccionarJuego(tarjeta, nombre) {
            // Remover clase seleccionado de todas las tarjetas
            var tarjetas = document.getElementsByClassName('tarjeta');
            for (var i = 0; i < tarjetas.length; i++) {
                tarjetas[i].classList.remove('seleccionado');
            }

            // Marcar la tarjeta clickeada
            tarjeta.classList.add('seleccionado');

            // Guardar el juego en la variable global
            juegoSeleccionado = nombre;

            // Limpiar error de juego si lo había
            document.getElementById('errorJuego').innerHTML = '';
        }

        // ─── Ejercicio 1: Funciones de validación ─────────────────────

        function validarNickname() {
            var input = document.getElementById('nickname');
            var valor = input.value.trim();
            var soloLetrasYNumeros = /^[A-Za-z0-9]+$/;

            if (valor === '') {
                input.className = 'invalido';
                document.getElementById('errorNickname').innerHTML = 'El nickname es obligatorio.';
                return false;
            }
            if (valor.length < 3) {
                input.className = 'invalido';
                document.getElementById('errorNickname').innerHTML = 'El nickname debe tener al menos 3 caracteres.';
                return false;
            }
            if (!soloLetrasYNumeros.test(valor)) {
                input.className = 'invalido';
                document.getElementById('errorNickname').innerHTML = 'Solo se permiten letras y números, sin espacios ni caracteres especiales.';
                return false;
            }

            input.className = 'valido';
            document.getElementById('errorNickname').innerHTML = '';
            return true;
        }

        function validarEdad() {
            var input = document.getElementById('edad');
            var valor = input.value.trim();

            if (valor === '') {
                input.className = 'invalido';
                document.getElementById('errorEdad').innerHTML = 'La edad es obligatoria.';
                return false;
            }
            if (isNaN(valor)) {
                input.className = 'invalido';
                document.getElementById('errorEdad').innerHTML = 'La edad solo debe contener números.';
                return false;
            }
            if (Number(valor) <= 16) {
                input.className = 'invalido';
                document.getElementById('errorEdad').innerHTML = 'Debes ser mayor de 16 años para participar.';
                return false;
            }

            input.className = 'valido';
            document.getElementById('errorEdad').innerHTML = '';
            return true;
        }

        function validarCodigo() {
            var input = document.getElementById('codigo');
            var valor = input.value.trim();

            if (valor === '') {
                input.className = 'invalido';
                document.getElementById('errorCodigo').innerHTML = 'El código de equipo es obligatorio.';
                return false;
            }
            if (isNaN(valor)) {
                input.className = 'invalido';
                document.getElementById('errorCodigo').innerHTML = 'El código solo debe contener números.';
                return false;
            }
            if (valor.length !== 4) {
                input.className = 'invalido';
                document.getElementById('errorCodigo').innerHTML = 'El código debe tener exactamente 4 dígitos.';
                return false;
            }

            input.className = 'valido';
            document.getElementById('errorCodigo').innerHTML = '';
            return true;
        }

        function validarJuego() {
            if (juegoSeleccionado === '') {
                document.getElementById('errorJuego').innerHTML = 'Debes seleccionar un juego de la grilla.';
                return false;
            }

            document.getElementById('errorJuego').innerHTML = '';
            return true;
        }

        // ─── Función principal de registro ────────────────────────────
        function registrar() {
            var nicknameValido = validarNickname();
            var edadValida     = validarEdad();
            var codigoValido   = validarCodigo();
            var juegoValido    = validarJuego();

            var mensaje = document.getElementById('mensajeRegistro');
            mensaje.style.display = 'block';

            if (nicknameValido && edadValida && codigoValido && juegoValido) {
                registroValido = true;
                mensaje.className = 'exito';
                mensaje.innerHTML = 'Registro exitoso!';

                // Mostrar sección de preguntas
                document.getElementById('seccionPreguntas').style.display = 'block';
            } else {
                registroValido = false;
                mensaje.className = 'fracaso';
                mensaje.innerHTML = 'Hay errores en el formulario. Por favor, corrígelos antes de continuar.';
            }
        }

        // ─── Ejercicio 3: Preguntas de preparación ────────────────────
        function hacerPreguntas() {
            if (!registroValido) {
                return;
            }

            var preguntas = [
                '¿Cuántas horas por semana dedicás a jugar?',
                '¿Preferís jugar solo o en equipo?',
                '¿Qué rol ocupás en tu equipo? (Atacante, Defensa, Soporte, etc.)'
            ];

            var etiquetas = [
                'Horas de juego por semana',
                'Modalidad preferida',
                'Rol en el equipo'
            ];

            var respuestas = [];

            for (var i = 0; i < preguntas.length; i++) {
                var respuesta = prompt(preguntas[i]);

                if (respuesta === null) {
                    respuestas.push('No respondió esta pregunta.');
                } else if (respuesta.trim() === '') {
                    respuestas.push('No respondió esta pregunta.');
                } else {
                    respuestas.push(respuesta.trim());
                }
            }

            // Mostrar respuestas en el DOM
            var respuestasTexto = document.getElementById('respuestasTexto');
            respuestasTexto.innerHTML = '';

            for (var i = 0; i < preguntas.length; i++) {
                respuestasTexto.innerHTML += etiquetas[i] + ': ' + respuestas[i] + '<br>';
            }

            document.getElementById('respuestasContainer').style.display = 'block';
        }