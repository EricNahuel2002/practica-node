jest.mock('../../prismaClient', () => ({
  __esModule: true,
  default: {
    users: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}));

import { Request, Response } from 'express';

import prisma from '../../prismaClient';

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../../controller/userController';

describe('Users Controller con Prisma mockeado', () => {

    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        jest.clearAllMocks();
    });

    // 🔹 GET ALL
    test('debería devolver usuarios', async () => {
        (prisma.users.findMany as jest.Mock).mockResolvedValue([
            { id: 1, nombre: 'Juan' }
        ]);

        await getUsers(req as Request, res as Response);

        expect(prisma.users.findMany).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([
            { id: 1, nombre: 'Juan' }
        ]);
    });

    // 🔹 GET BY ID OK
    test('debería devolver usuario por id', async () => {
        req.params = { id: '1' };

        (prisma.users.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            nombre: 'Juan'
        });

        await getUserById(req as Request, res as Response);

        expect(prisma.users.findUnique).toHaveBeenCalledWith({
            where: { id: 1 }
        });

        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            nombre: 'Juan'
        });
    });

    // 🔹 GET BY ID ERROR
    test('debería devolver 404 si no existe', async () => {
        req.params = { id: '999' };

        (prisma.users.findUnique as jest.Mock).mockResolvedValue(null);

        await getUserById(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    // 🔹 POST
    test('debería crear usuario', async () => {
        req.body = { nombre: 'Pedro' };

        (prisma.users.create as jest.Mock).mockResolvedValue({
            id: 3,
            nombre: 'Pedro'
        });

        await createUser(req as Request, res as Response);

        expect(prisma.users.create).toHaveBeenCalledWith({
            data: { nombre: 'Pedro' }
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: 3,
            nombre: 'Pedro'
        });
    });

    // 🔹 PUT OK
    test('debería actualizar usuario', async () => {
        req.params = { id: '1' };
        req.body = { nombre: 'Nuevo' };

        (prisma.users.update as jest.Mock).mockResolvedValue({
            id: 1,
            nombre: 'Nuevo'
        });

        await updateUser(req as Request, res as Response);

        expect(prisma.users.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { nombre: 'Nuevo' }
        });

        expect(res.json).toHaveBeenCalled();
    });

    // 🔹 PUT ERROR
    test('debería devolver 404 si no existe al actualizar', async () => {
        req.params = { id: '999' };
        req.body = { nombre: 'X' };

        (prisma.users.update as jest.Mock).mockRejectedValue(new Error());

        await updateUser(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    // 🔹 DELETE OK
    test('debería eliminar usuario', async () => {
        req.params = { id: '1' };

        (prisma.users.delete as jest.Mock).mockResolvedValue({});

        await deleteUser(req as Request, res as Response);

        expect(prisma.users.delete).toHaveBeenCalledWith({
            where: { id: 1 }
        });

        expect(res.json).toHaveBeenCalledWith({
            mensaje: "Usuario eliminado"
        });
    });

    // 🔹 DELETE ERROR
    test('debería devolver 404 si no existe al eliminar', async () => {
        req.params = { id: '999' };

        (prisma.users.delete as jest.Mock).mockRejectedValue(new Error());

        await deleteUser(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
    });

});