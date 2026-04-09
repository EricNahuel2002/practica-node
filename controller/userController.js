let users = [
    { id: 1, nombre: "Juan" },
    { id: 2, nombre: "Maria" }
];

// GET todos
const getUsers = (req, res) => {
    res.json(users);
};

// GET por id
const getUserById = (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
};

// POST crear
const createUser = (req, res) => {
    const newUser = {
        id: users.length + 1,
        nombre: req.body.nombre
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

// PUT actualizar
const updateUser = (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.nombre = req.body.nombre;
    res.json(user);
};

// DELETE eliminar
const deleteUser = (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    users.splice(index, 1);
    res.json({ mensaje: "Usuario eliminado" });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};