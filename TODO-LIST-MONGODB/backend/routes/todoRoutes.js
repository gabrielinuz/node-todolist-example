// Importamos express y el modelo de la tarea
const express = require('express');
const todoController = require('../controllers/todoController.js');
//const Todo = require('../models/todo');

// Creamos el enrutador de express
const router = express.Router();

// Ruta para obtener todas las tareas
router.get('/todos', todoController.getTasks);

// Ruta para crear una nueva tarea
router.post('/todos', todoController.createTask);


// Ruta para marcar una tarea como completada
router.put('/todos/:id',todoController.completeTask);

// Ruta para eliminar una tarea
router.delete('/todos/:id', todoController.deleteTask);

// Ruta para volver a poner una tarea en estado activo
router.put('/todos/activate/:id', todoController.activateTask); 


// Exportamos el enrutador
module.exports = router;
