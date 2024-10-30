// Importamos Mongoose
const mongoose = require('mongoose');

// Definimos el esquema de las tareas
const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

// Exportamos el modelo de la tarea
module.exports = mongoose.model('Todo', todoSchema);
