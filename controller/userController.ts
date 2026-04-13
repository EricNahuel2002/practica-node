import prisma from '../prismaClient';
import { Request, Response } from 'express';

// GET todos
const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.users.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// GET por id
const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.users.findUnique({
            where: { id: Number(req.params.id) }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// POST crear
const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await prisma.users.create({
            data: {
                nombre: req.body.nombre
            }
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// PUT actualizar
const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await prisma.users.update({
            where: { id: Number(req.params.id) },
            data: {
                nombre: req.body.nombre
            }
        });

        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
};

// DELETE eliminar
const deleteUser = async (req: Request, res: Response) => {
    try {
        await prisma.users.delete({
            where: { id: Number(req.params.id) }
        });

        res.json({ mensaje: 'Usuario eliminado' });
    } catch (error) {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
};

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};