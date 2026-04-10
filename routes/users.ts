import express from 'express';
const router = express.Router();

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controller/userController';

// CRUD REST
router.get('/', getUsers);        // GET todos
router.get('/:id', getUserById); // GET uno
router.post('/', createUser);    // POST crear
router.put('/:id', updateUser);  // PUT actualizar
router.delete('/:id', deleteUser); // DELETE borrar

export default router;