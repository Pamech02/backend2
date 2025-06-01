const express = require('express');
const app = express();
const cors = require('cors');
require('./db'); 
const mainRoutes = require('./routes/index');

const PORT = 3003;
app.use(cors())
app.use(express.json());

// Usar las rutas definidas en routes/saludo.js
app.use('/', mainRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
