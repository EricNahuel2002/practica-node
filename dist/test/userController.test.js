"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('../prismaClient', () => ({
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
const { default: prisma } = require('../prismaClient');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controller/userController');
describe('Users Controller con Prisma mockeado', () => {
    let req;
    let res;
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
        prisma.users.findMany.mockResolvedValue([
            { id: 1, nombre: 'Juan' }
        ]);
        await getUsers(req, res);
        expect(prisma.users.findMany).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([
            { id: 1, nombre: 'Juan' }
        ]);
    });
    // 🔹 GET BY ID OK
    test('debería devolver usuario por id', async () => {
        req.params = { id: '1' };
        prisma.users.findUnique.mockResolvedValue({
            id: 1,
            nombre: 'Juan'
        });
        await getUserById(req, res);
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
        prisma.users.findUnique.mockResolvedValue(null);
        await getUserById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });
    // 🔹 POST
    test('debería crear usuario', async () => {
        req.body = { nombre: 'Pedro' };
        prisma.users.create.mockResolvedValue({
            id: 3,
            nombre: 'Pedro'
        });
        await createUser(req, res);
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
        prisma.users.update.mockResolvedValue({
            id: 1,
            nombre: 'Nuevo'
        });
        await updateUser(req, res);
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
        prisma.users.update.mockRejectedValue(new Error());
        await updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });
    // 🔹 DELETE OK
    test('debería eliminar usuario', async () => {
        req.params = { id: '1' };
        prisma.users.delete.mockResolvedValue({});
        await deleteUser(req, res);
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
        prisma.users.delete.mockRejectedValue(new Error());
        await deleteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
    });
});
//# sourceMappingURL=userController.test.js.map