const express = require('express');
const app = express();

const indexRoutes = require('./routes/users');

// Middleware
app.use(express.json());

// Rutas
app.use('/api/users', indexRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});