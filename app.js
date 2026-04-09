const express = require('express');
const app = express();

const indexRoutes = require('./routes/index');

// Middleware
app.use(express.json());

// Rutas
app.use('/', indexRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});