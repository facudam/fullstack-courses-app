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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorById = exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.getAuthors = void 0;
const connection_db_1 = require("../../data-base/connection_db");
const serverErrorMessage_1 = require("../error/serverErrorMessage");
const getAuthors = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM author');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getAuthors = getAuthors;
const getAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM author WHERE author_id = ?', [req.params.id]);
        if (result.length <= 0)
            return res.status(404).json({ 'message': 'Author not found' });
        return res.json(result[0]);
    }
    catch (error) {
        return res.status(500).json(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getAuthorById = getAuthorById;
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author_name, author_country } = req.body;
        connection_db_1.pool.query('INSERT INTO author (author_name, author_country) VALUES (?,?)', [author_name, author_country]);
        res.json({ author_name, author_country });
    }
    catch (error) {
        res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.createAuthor = createAuthor;
const updateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, country } = req.body;
        const [result] = yield connection_db_1.pool.query('UPDATE author SET author_name = IFNULL(?, author_name), author_country = IFNULL(?,author_country) WHERE author_id = ?', [name, country, id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ 'message': 'Author not found' });
        return res.send('Author successfully updated');
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.updateAuthor = updateAuthor;
const deleteAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('DELETE FROM author WHERE author_id = ?', [id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'Employee not found' });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.deleteAuthor = deleteAuthor;
