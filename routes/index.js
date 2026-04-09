const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
    res.send('Hola mundo desde Express 👋');
});

// Otra ruta
router.get('/saludo', (req, res) => {
    res.json({ mensaje: 'Hola desde una API' });
});

module.exports = router;