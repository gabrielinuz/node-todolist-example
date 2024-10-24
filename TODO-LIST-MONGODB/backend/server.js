// Importamos módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

// Inicializamos la aplicación de Express
const app = express();

// Middleware para habilitar CORS y manejo de JSON
app.use(cors());
app.use(express.json());

// Usamos las rutas para las tareas
app.use('/api', todoRoutes);

// Configurar strictQuery según el comportamiento deseado
//mongoose.set('strictQuery', true); // Opción recomendada si deseas mantener el comportamiento actual
mongoose.set('strictQuery', false); // Opción recomendada si deseas prepararte para el cambio

// Conectamos a la base de datos MongoDB
mongoose.connect('mongodb://localhost/todolist')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Escuchamos en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
