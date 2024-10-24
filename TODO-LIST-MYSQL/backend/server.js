// Importamos módulos necesarios
const express = require('express');
const mysql = require('mysql2/promise'); // Usamos mysql2 para soporte de Promises
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const { createTodosTable } = require('./models/todo'); // Importamos la función para crear la tabla todos si no existiera

// Inicializamos la aplicación de Express
const app = express();

// Middleware para habilitar CORS y manejo de JSON
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'todolist', // tu usuario de MySQL
  password: 'todolist', // tu contraseña de MySQL
  database: 'todolist', // tu base de datos
});

// Crear la tabla si no existe
(async () => {
  try {
    await createTodosTable(db);
    console.log('OK: Tabla "todos" creada o ya existente.');
  } catch (err) {
    console.error('Error al crear la tabla todos:', err);
  }
})();

// Hacemos la conexión a la base de datos accesible en las rutas
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Usamos las rutas para las tareas
app.use('/api', todoRoutes);

// Escuchamos en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
