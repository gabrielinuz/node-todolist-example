// Seleccionamos los elementos del DOM
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');

// Función para mostrar las tareas en la lista
function displayTodos(todos) {
  // Limpiamos la lista de tareas antes de agregar las nuevas
  todoList.innerHTML = '';

  // Recorremos las tareas y las mostramos en la lista
  todos.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.textContent = todo.task;

    // Agregamos clase "completed" si la tarea está completada
    if (todo.completed) {
      listItem.classList.add('completed');
    }

    // Agregamos los botones completar/activar y para eliminar
    listItem.appendChild(createToggleButton(todo, listItem));
    listItem.appendChild(createDeleteButton(todo.id));

    // Agregamos la tarea a la lista
    todoList.appendChild(listItem);
  });
}

// Función para obtener y mostrar las tareas
async function getTodos() {
  try {
    const response = await fetch('http://localhost:3000/api/todos');
    if (!response.ok) throw new Error('Error al obtener las tareas');

    const todos = await response.json();
    displayTodos(todos);
  } catch (error) {
    console.error("Error al obtener las tareas desde el servidor:", error);
  }
}

// Función para crear el botón de completar/activar
function createToggleButton(todo, listItem) {
  const toggleButton = document.createElement('button');
  toggleButton.classList.add('w3-button', 'w3-blue', 'w3-margin-left');

  // Si la tarea está completada, aplicamos el estilo de "completado" y mostramos "Activar"
  //Al hacer PUT en tu frontend, es una buena práctica enviar un JSON en el cuerpo de la 
  //solicitud para hacer las modificaciones claras.
  if (todo.completed) {
    listItem.classList.add('completed');
    toggleButton.textContent = 'Activar';
    toggleButton.addEventListener('click', async () => {
      try {
        await fetch(`http://localhost:3000/api/todos/activate/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: true }) // Activar
        });
        getTodos();
      } catch (error) {
        console.error("Error al activar la tarea:", error);
      }
    });
  } else {
    toggleButton.textContent = 'Completar';
    toggleButton.addEventListener('click', async () => {
      try {
        await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: false }) // Completar
        });
        getTodos(); // Recargamos las tareas
      } catch (error) {
        console.error("Error al completar la tarea:", error);
      }
    });
  }

  return toggleButton;
}

// Función para crear el botón de eliminar
function createDeleteButton(id) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.classList.add('w3-button', 'w3-red', 'w3-margin-left');

  deleteButton.addEventListener('click', async () => {
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'DELETE',
      });
      getTodos(); // Recargamos las tareas
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  });

  return deleteButton;
}

// Evento para agregar una nueva tarea al enviar el input del formulario
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const task = taskInput.value.trim();
  if (!task) return; // Evitar agregar tareas vacías

  try {
    await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    });

    taskInput.value = ''; // Limpiamos el campo de entrada
    getTodos(); // Recargamos la lista de tareas
  } catch (error) {
    console.error("Error al agregar la tarea:", error);
  }
});
