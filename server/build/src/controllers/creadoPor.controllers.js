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
exports.getCreadoPorDataById = exports.deleteCreadoPorData = exports.updateCreadoPorData = exports.createCreadoPorData = exports.getCreadoPorData = void 0;
const connection_db_1 = require("../../data-base/connection_db");
const serverErrorMessage_1 = require("../error/serverErrorMessage");
const getCreadoPorData = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM creado_por');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getCreadoPorData = getCreadoPorData;
const getCreadoPorDataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('SELECT * FROM creado_por WHERE creadoPor_id = ?', [id]);
        if (result.length <= 0)
            return res.status(404).json({ 'message': 'CreadoPor data not found' });
        return res.json(result[0]);
    }
    catch (error) {
        return res.status(500).json(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getCreadoPorDataById = getCreadoPorDataById;
const createCreadoPorData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author_id, course_id } = req.body;
        connection_db_1.pool.query('INSERT INTO creado_por (author_id, course_id) VALUES (?,?)', [author_id, course_id]);
        res.json({ author_id, course_id });
    }
    catch (error) {
        res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.createCreadoPorData = createCreadoPorData;
const updateCreadoPorData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { author_id, course_id } = req.body;
        const [result] = yield connection_db_1.pool.query('UPDATE creado_por SET author_id = IFNULL(?, author_id), course_id = IFNULL(?, course_id) WHERE creadoPor_id = ?', [author_id, course_id, id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ 'message': 'CreadoPor data not found' });
        return res.send('CreadoPor data successfully updated');
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.updateCreadoPorData = updateCreadoPorData;
const deleteCreadoPorData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('DELETE FROM creado_por WHERE creadoPor_id = ?', [id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'CreadoPor data not found' });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.deleteCreadoPorData = deleteCreadoPorData;
