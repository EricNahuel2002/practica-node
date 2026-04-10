"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const { default: prisma } = require('../prismaClient');
// GET todos
const getUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};
exports.getUsers = getUsers;
// GET por id
const getUserById = async (req, res) => {
    try {
        const user = await prisma.users.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};
exports.getUserById = getUserById;
// POST crear
const createUser = async (req, res) => {
    try {
        const newUser = await prisma.users.create({
            data: {
                nombre: req.body.nombre
            }
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};
exports.createUser = createUser;
// PUT actualizar
const updateUser = async (req, res) => {
    try {
        const updatedUser = await prisma.users.update({
            where: { id: Number(req.params.id) },
            data: {
                nombre: req.body.nombre
            }
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
};
exports.updateUser = updateUser;
// DELETE eliminar
const deleteUser = async (req, res) => {
    try {
        await prisma.users.delete({
            where: { id: Number(req.params.id) }
        });
        res.json({ mensaje: 'Usuario eliminado' });
    }
    catch (error) {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map