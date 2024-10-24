// Seleccionamos los elementos del DOM
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');

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
      await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
        method: 'DELETE',
      });
      getTodos(); // Recargamos las tareas
    });

    // Botón para cambiar el estado de la tarea
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: true }) // O false para activar
            });
            getTodos(); // Recargamos las tareas
        } catch (error) {
            console.error("Error al completar la tarea:", error);
        }
      });
    } else {
      toggleButton.textContent = 'Completar';
      toggleButton.addEventListener('click', async () => {
        await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
          method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed: false })
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
