const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controller/userController');

// CRUD REST
router.get('/', getUsers);        // GET todos
router.get('/:id', getUserById); // GET uno
router.post('/', createUser);    // POST crear
router.put('/:id', updateUser);  // PUT actualizar
router.delete('/:id', deleteUser); // DELETE borrar

module.exports = router;