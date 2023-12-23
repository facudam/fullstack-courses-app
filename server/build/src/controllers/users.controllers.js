"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsLogged = exports.logoutUser = exports.loginUser = exports.createUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const connection_db_1 = require("../../data-base/connection_db");
const serverErrorMessage_1 = require("../error/serverErrorMessage");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM user');
        res.json(result);
    }
    catch (error) {
        res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('SELECT * FROM user WHERE user_id = ?', [id]);
        if (result.length <= 0)
            return res.status(404).json({ message: 'User not found' });
        return res.json(result[0]);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Verificamos que el email no exista en la base de datos:
        const [result] = yield connection_db_1.pool.query('SELECT * FROM user WHERE user_email = ?', [email]);
        // Si ya existe retornamos un codigo 409 de conflicto:
        if (result.length > 0)
            return res.status(409).json({ message: 'User already exists' });
        let encryptedPass = yield bcryptjs_1.default.hash(password, 8);
        yield connection_db_1.pool.query('INSERT INTO user (user_name, user_email, user_password) VALUES(?,?,?)', [name, email, encryptedPass]);
        return res.json({ name, email, encryptedPass });
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // 1. Obtenemos el usuario por correo electrónico:
        const [result] = yield connection_db_1.pool.query('SELECT * FROM user WHERE user_email = ?', [email]);
        // 2. Verificamos si el usuario existe:
        if (result.length === 0)
            return res.status(404).send({ message: 'Invalid email or password', login: false });
        // 3. Verificamos la contraseña utilizando bcryptjs:
        const user = result[0];
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.user_password);
        if (!passwordMatch)
            return res.status(401).json({ message: 'Invalid email or password' });
        req.session.username = user.user_name;
        return res.json({ login: true, user });
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err)
                return console.log('Error al destruir la sesión: ', err);
        });
        res.status(200).send('Logout exitoso');
    }
    catch (error) {
        res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
};
exports.logoutUser = logoutUser;
const userIsLogged = (req, res) => {
    try {
        if (req.session.username) {
            return res.json({ valid: true, username: req.session.username });
        }
        else {
            return res.json({ valid: false });
        }
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
};
exports.userIsLogged = userIsLogged;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user_name, user_email } = req.body;
        const [result] = yield connection_db_1.pool.query('UPDATE user SET user_name = IFNULL (?, user_name), user_email = IFNULL (?, user_email) WHERE user_id = ?', [user_name, user_email, id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'User not found' });
        return res.send('User successfully updated');
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('DELETE FROM user WHERE user_id = ?', [id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'User not found' });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.deleteUser = deleteUser;
