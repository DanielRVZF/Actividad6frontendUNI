// Variable que almacena los equipos que son registrados por el usuario 
let equipos = [];

// Poryectar el formulario de registro
function mostrarFormulario() {
  document.getElementById('opciones').style.display = 'none';
  document.getElementById('formulario').style.display = 'block';
  document.getElementById('equipos').style.display = 'none';
}

// Proyectar la lista de equipos
function mostrarEquipos() {
  document.getElementById('opciones').style.display = 'none';
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('equipos').style.display = 'block';
  mostrarTablaEquipos();
}

// Mostrar los equipos en la tabla
function mostrarTablaEquipos() {
  const tablaEquipos = document.getElementById('tablaEquipos');

  // Eliminar los equipos que se encuentran en la tabla 
  while (tablaEquipos.firstChild) {
    tablaEquipos.firstChild.remove();
  }

  // Presentar los equipos registrados en la tabla
  if (equipos.length > 0) {
    equipos.forEach((equipo) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${equipo.nombreCliente}</td>
        <td>${equipo.serial}</td>
        <td>${equipo.telefono}</td>
        <td>${equipo.servicio}</td>
        <td>${equipo.observaciones}</td>
        <td>
          <button class="btn btn-primary" onclick="editarEquipo('${equipo.id}')">Editar</button>
          <button class="btn btn-danger" onclick="eliminarEquipo('${equipo.id}')">Eliminar</button>
        </td>
      `;
      tablaEquipos.appendChild(fila);
    });
  } else {
    const fila = document.createElement('tr');
    fila.innerHTML = '<td colspan="6" class="text-center">No se encontraron equipos</td>';
    tablaEquipos.appendChild(fila);
  }
}

// Registrar un equipo
document.getElementById('formularioEquipo').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los datos del formulario que son registrados por el usuario
  const nombreCliente = document.getElementById('nombreCliente').value;
  const serial = document.getElementById('serial').value;
  const telefono = document.getElementById('telefono').value;
  const servicio = document.getElementById('servicio').value;
  const observaciones = document.getElementById('observaciones').value;

  // Crear un nuevo equipo
  const equipo = {
    id: Date.now().toString(),
    nombreCliente,
    serial,
    telefono,
    servicio,
    observaciones,
  };

  // Insertar el equipo a la lista
  equipos.push(equipo);

  // Limpiar el formulario
  document.getElementById('nombreCliente').value = '';
  document.getElementById('serial').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('servicio').value = '';
  document.getElementById('observaciones').value = '';

  // Mostrar la lista de equipos
  mostrarEquipos();
});

// Editar un equipo
function editarEquipo(id) {
  // Buscar el equipo por su ID
  const equipo = equipos.find((equipo) => equipo.id === id);

  if (equipo) {
    // Llenar el formulario con los datos del equipo
    document.getElementById('nombreCliente').value = equipo.nombreCliente;
    document.getElementById('serial').value = equipo.serial;
    document.getElementById('telefono').value = equipo.telefono;
    document.getElementById('servicio').value = equipo.servicio;
    document.getElementById('observaciones').value = equipo.observaciones;

    // Eliminar el equipo de la lista
    equipos = equipos.filter((equipo) => equipo.id !== id);

    // Mostrar la lista de equipos
    mostrarEquipos();
  }
}

// Eliminar un equipo
function eliminarEquipo(id) {
  // Confirmar la eliminación del equipo
  if (confirm('¿Estás seguro de eliminar este equipo?')) {
    // Filtrar los equipos para remover el equipo con el ID proporcionado
    equipos = equipos.filter((equipo) => equipo.id !== id);

    // Mostrar la lista de equipos
    mostrarEquipos();
  }
}

// Buscar equipos por nombre del cliente
function buscarEquipos() {
  const busquedaInput = document.getElementById('busquedaInput');
  const filtro = busquedaInput.value.toLowerCase();

  // Filtrar los equipos que coincidan con la búsqueda
  const equiposFiltrados = equipos.filter(
    (equipo) => equipo.nombreCliente.toLowerCase().includes(filtro)
  );

  // Actualizar la tabla con los equipos filtrados
  mostrarTablaEquipos(equiposFiltrados);
}
