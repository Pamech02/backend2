const express = require('express');
const app = express();
require('./db'); 
const mainRoutes = require('./routes/index');

const PORT = 3000;

app.use(express.json());

// Usar las rutas definidas en routes/saludo.js
app.use('/', mainRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
