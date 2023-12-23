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
exports.getTypeById = exports.deleteType = exports.updateType = exports.createType = exports.getTypes = void 0;
const connection_db_1 = require("../../data-base/connection_db");
const serverErrorMessage_1 = require("../error/serverErrorMessage");
const getTypes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM course_type');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getTypes = getTypes;
const getTypeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM course_type WHERE type_id = ?', [req.params.id]);
        if (result.length <= 0)
            return res.status(404).json({ 'message': 'Type not found' });
        return res.json(result[0]);
    }
    catch (error) {
        return res.status(500).json(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getTypeById = getTypeById;
const createType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type_name } = req.body;
        connection_db_1.pool.query('INSERT INTO course_type (type_name) VALUES (?)', [type_name]);
        res.json({ type_name });
    }
    catch (error) {
        res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.createType = createType;
const updateType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { type_name } = req.body;
        const [result] = yield connection_db_1.pool.query('UPDATE course_type SET type_name = IFNULL(?, type_name) WHERE type_id = ?', [type_name, id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ 'message': 'Type not found' });
        return res.send('Type successfully updated');
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.updateType = updateType;
const deleteType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('DELETE FROM course_type WHERE type_id = ?', [id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'Type not found' });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.deleteType = deleteType;
