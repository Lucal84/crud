const nombreInput = document.getElementById('nombre');
const idInput = document.getElementById('id');
const tablaBody = document.getElementById('tabla-body');

// Función para agregar un registro
function agregar() {
    const nombre = nombreInput.value;
    const id = idInput.value;
    const fecha = new Date().toLocaleString(); // Fecha actual

    // Crear un objeto con los datos del registro
    const nuevoRegistro = { nombre, id, fecha };

    // Obtener los registros existentes de Local Storage
    const registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Agregar el nuevo registro al array
    registros.push(nuevoRegistro);

    // Guardar el array actualizado en Local Storage
    localStorage.setItem('registros', JSON.stringify(registros));

    // Actualizar la tabla
    actualizarTabla();
}

// Función para actualizar la tabla con los registros
function actualizarTabla() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Limpiar la tabla
    tablaBody.innerHTML = '';

    // Agregar cada registro a la tabla
    registros.forEach(registro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
      <td>${registro.nombre}</td>
      <td>${registro.id}</td>
      <td>${registro.fecha}</td>
      <td>
        <button class='btn-editar' onclick="editar('${registro.id}')">Editar</button>
        <button class='btn-eliminar' onclick="eliminar('${registro.id}')">Eliminar</button>
      </td>
    `;
        tablaBody.appendChild(fila);
    });
}


 function editar(id) {
    // Obtener los registros existentes de Local Storage
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
  
    // Encontrar el índice del registro con el ID proporcionado
    const indice = registros.findIndex(registro => registro.id === id);
  
    // Si el registro existe, actualizarlo
    if (indice !== -1) {
      // Puedes obtener los nuevos valores de los inputs o de cualquier otra forma
      const nombreActualizado = prompt('Ingrese el nuevo nombre:', registros[indice].nombre);
      //const fechaActualizada = new Date().toLocaleString(); // O usar un input para la fecha
  
      // Actualizar el registro
      registros[indice].nombre = nombreActualizado;
      //registros[indice].fecha = fechaActualizada;
  
      // Guardar el array actualizado en Local Storage
      localStorage.setItem('registros', JSON.stringify(registros));
  
      // Actualizar la tabla o la interfaz de usuario
      actualizarTabla(); // Asegúrate de tener esta función definida para refrescar la tabla
    } else {
      console.log('Registro no encontrado');
    }
  }

// Función para eliminar un registro por ID
function eliminar(id) {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const registrosActualizados = registros.filter(registro => registro.id !== id);
  localStorage.setItem('registros', JSON.stringify(registrosActualizados));
  actualizarTabla();
}

// Función para cargar los registros al cargar la página
window.addEventListener('load', () => {
    actualizarTabla();
});