"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("../controllers/users.controllers");
const router = (0, express_1.default)();
router.get('/api/users', users_controllers_1.getUsers);
router.post('/api/users', users_controllers_1.createUser);
router.get('/api/users/:id', users_controllers_1.getUserById);
router.patch('/api/users/:id', users_controllers_1.updateUser);
router.delete('/api/users/:id', users_controllers_1.deleteUser);
router.post('/logout', users_controllers_1.logoutUser);
router.post('/api/login', users_controllers_1.loginUser);
router.get('/api/validation', users_controllers_1.userIsLogged);
exports.default = router;
