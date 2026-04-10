"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
// CRUD REST
router.get('/', userController_1.getUsers); // GET todos
router.get('/:id', userController_1.getUserById); // GET uno
router.post('/', userController_1.createUser); // POST crear
router.put('/:id', userController_1.updateUser); // PUT actualizar
router.delete('/:id', userController_1.deleteUser); // DELETE borrar
exports.default = router;
//# sourceMappingURL=users.js.map