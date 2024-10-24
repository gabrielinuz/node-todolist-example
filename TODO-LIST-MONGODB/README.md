##INSTALL NODE:
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
# download and install Node.js (you may need to restart the terminal)
nvm install 20
# verifies the right Node.js version is in the environment
node -v # should print `v20.17.0`
# verifies the right npm version is in the environment
npm -v # should print `10.8.2`

## Ver por versiones más nuevas:
https://nodejs.org/en/download/package-manage

##CONFIGURE INSTALL
npm init -y
npm install express mongoose cors

##MONGO SERVER UP, AS ROOT USER:
service mongod start

##SERVER UP
node server.js

Me gustaría que me facilites un código en inglés, comentado línea por línea en español y con resultados en pantalla en español: un todolist, donde puedan crearse notas, marcarlas como concluídas y que se vean desactivadas desde el estilo. Las tecnologías involucradas son node, express, mongodb y mongoose (para guardar las notas) para backend. Para frontend, quiero usar código vainilla pero con el estilo CSS de la W3Schools, Fetch API y lo más modular y prolijo separado en directorios backend y frontend, con archivos separados tanto en la vista como en el backend y con las rutas separadas en el backend para mayor modularidad y extensibilidad a futuro.

Comentarios línea por línea en español:
Backend (Node, Express, MongoDB, Mongoose):

todo.js: define el esquema de la tarea con los campos task y completed.
todoRoutes.js: maneja las rutas para crear, obtener y marcar tareas como completadas.
app.js: inicializa el servidor Express, conecta a MongoDB, y configura las rutas.
Frontend (vanilla JS, Fetch API):

index.html: formulario para agregar tareas y lista donde se mostrarán.
styles.css: estilo para marcar las tareas completadas con línea tachada y fondo gris.
app.js: maneja el envío del formulario, obtiene las tareas del backend y actualiza la lista visual.
