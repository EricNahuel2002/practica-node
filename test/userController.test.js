const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controller/userController');

describe('Users Controller', () => {

    let req;
    let res;

    beforeEach(() => {
        // Mock de req y res antes de cada test
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    // 🔹 GET ALL
    test('debería devolver todos los usuarios', () => {
        getUsers(req, res);

        expect(res.json).toHaveBeenCalled();
    });

    // 🔹 GET BY ID - OK
    test('debería devolver un usuario existente', () => {
        req.params = { id: 1 };

        getUserById(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ id: 1 })
        );
    });

    // 🔹 GET BY ID - ERROR
    test('debería devolver 404 si el usuario no existe', () => {
        req.params = { id: 999 };

        getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: "Usuario no encontrado"
        });
    });

    // 🔹 POST
    test('debería crear un usuario', () => {
        req.body = { nombre: 'Pedro' };

        createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ nombre: 'Pedro' })
        );
    });

    // 🔹 PUT - OK
    test('debería actualizar un usuario existente', () => {
        req.params = { id: 1 };
        req.body = { nombre: 'Nuevo Nombre' };

        updateUser(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ nombre: 'Nuevo Nombre' })
        );
    });

    // 🔹 PUT - ERROR
    test('debería devolver 404 al actualizar usuario inexistente', () => {
        req.params = { id: 999 };
        req.body = { nombre: 'X' };

        updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    // 🔹 DELETE - OK
    test('debería eliminar un usuario existente', () => {
        req.params = { id: 1 };

        deleteUser(req, res);

        expect(res.json).toHaveBeenCalledWith({
            mensaje: "Usuario eliminado"
        });
    });

    // 🔹 DELETE - ERROR
    test('debería devolver 404 al eliminar usuario inexistente', () => {
        req.params = { id: 999 };

        deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

});