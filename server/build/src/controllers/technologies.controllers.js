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
exports.getTechnologyById = exports.deleteTechnology = exports.updateTechnology = exports.createTechnology = exports.getTechnologies = void 0;
const connection_db_1 = require("../../data-base/connection_db");
const serverErrorMessage_1 = require("../error/serverErrorMessage");
const getTechnologies = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM technology');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getTechnologies = getTechnologies;
const getTechnologyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM technology WHERE tech_id = ?', [req.params.id]);
        if (result.length <= 0)
            return res.status(404).json({ 'message': 'Technology not found' });
        return res.json(result[0]);
    }
    catch (error) {
        return res.status(500).json(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getTechnologyById = getTechnologyById;
const createTechnology = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tech_name } = req.body;
        connection_db_1.pool.query('INSERT INTO technology (tech_name) VALUES (?)', [tech_name]);
        res.json({ tech_name });
    }
    catch (error) {
        res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.createTechnology = createTechnology;
const updateTechnology = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { tech_name } = req.body;
        const [result] = yield connection_db_1.pool.query('UPDATE technology SET tech_name = IFNULL(?, tech_name) WHERE tech_id = ?', [tech_name, id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ 'message': 'Technology not found' });
        return res.send('Technology successfully updated');
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.updateTechnology = updateTechnology;
const deleteTechnology = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('DELETE FROM technology WHERE tech_id = ?', [id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'Technology not found' });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.deleteTechnology = deleteTechnology;
