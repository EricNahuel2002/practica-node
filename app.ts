import express from 'express';
const app = express();

import indexRoutes from './routes/users';

// Middleware
app.use(express.json());

// Rutas
app.use('/api/users', indexRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;