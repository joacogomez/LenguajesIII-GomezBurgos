$(document).ready(function () {

    var tabla = $('#tablaTareas').DataTable({
      language: {
        emptyTable: "No hay tareas cargadas.",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ entradas",
        info: "Mostrando _START_ a _END_ de _TOTAL_ tareas",
        paginate: { next: "Siguiente", previous: "Anterior" }
      },
      columnDefs: [{ orderable: false, targets: 2 }]
    });

    // Cambiar color del titulo al pasar el mouse
    $('#titulo').hover(
      function () { $(this).css('color', '#58a6ff'); },
      function () { $(this).css('color', '#c9d1d9'); }
    );

    // Agregar tarea
    $('#btnAgregar').click(function () {
      var nombre = $('#nombreTarea').val().trim();
      var prioridad = $('#prioridad').val();

      if (nombre === '') {
        $('#errorMsg').show();
        return;
      }

      $('#errorMsg').hide();

      var row = tabla.row.add([
        nombre,
        prioridad,
        '<button class="eliminar">Eliminar</button>'
      ]).draw(false);

      $(row.node()).hide().fadeIn(400);

      $('#nombreTarea').val('');
    });

    // Eliminar fila
    $('#tablaTareas tbody').on('click', '.eliminar', function () {
      var fila = $(this).closest('tr');
      fila.fadeOut(400, function () {
        tabla.row(fila).remove().draw(false);
      });
    });

  });