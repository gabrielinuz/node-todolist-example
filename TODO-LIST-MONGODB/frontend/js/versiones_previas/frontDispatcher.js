// Seleccionamos los elementos del DOM
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');

//Explicación de las modificaciones:
//Backend (todoRoutes.js):

//DELETE /todos/:id: Esta ruta elimina una tarea de la base de datos según su ID.
//PUT /todos/activate/:id: Esta ruta permite volver a poner una tarea en estado activo, cambiando el valor de completed a false.
//Frontend (app.js):

//Para cada tarea, agregamos dos botones:
//Eliminar: Un botón rojo que, al hacer clic, envía una solicitud DELETE al backend y elimina la tarea.
//Completar/Activar: Dependiendo del estado de la tarea (si está completada o no), este botón mostrará "Completar" o "Activar", y cambiará el estado de la tarea de false a true (o viceversa).
//El botón de completar marcará la tarea como completada y aplicará el estilo tachado, mientras que el de activar quitará el estilo tachado.
// Función para obtener y mostrar las tareas
async function getTodos() {
  const response = await fetch('http://localhost:3000/api/todos');
  const todos = await response.json();

  // Limpiamos la lista de tareas antes de agregar las nuevas
  todoList.innerHTML = '';

  // Recorremos las tareas y las mostramos en la lista
  todos.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.textContent = todo.task;

    // Botón para eliminar la tarea
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('w3-button', 'w3-red', 'w3-margin-left');
    deleteButton.addEventListener('click', async () => {
      await fetch(`http://localhost:3000/api/todos/${todo._id}`, {
        method: 'DELETE',
      });
      getTodos(); // Recargamos las tareas
    });

    // Botón para cambiar el estado de la tarea
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('w3-button', 'w3-blue', 'w3-margin-left');
    
    // Si la tarea está completada, aplicamos el estilo de "completado" y mostramos "Activar"
    if (todo.completed) {
      listItem.classList.add('completed');
      toggleButton.textContent = 'Activar';
      toggleButton.addEventListener('click', async () => {
        await fetch(`http://localhost:3000/api/todos/activate/${todo._id}`, {
          method: 'PUT',
        });
        getTodos(); // Recargamos las tareas
      });
    } else {
      toggleButton.textContent = 'Completar';
      toggleButton.addEventListener('click', async () => {
        await fetch(`http://localhost:3000/api/todos/${todo._id}`, {
          method: 'PUT',
        });
        getTodos(); // Recargamos las tareas
      });
    }

    // Agregamos los botones a la tarea
    listItem.appendChild(toggleButton);
    listItem.appendChild(deleteButton);

    // Agregamos la tarea a la lista
    todoList.appendChild(listItem);
  });
}

// Evento para agregar una nueva tarea
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const task = taskInput.value;
  
  await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task })
  });

  taskInput.value = ''; // Limpiamos el campo de entrada
  getTodos(); // Recargamos la lista de tareas
});

// Inicializamos la lista de tareas al cargar la página
getTodos();
