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
exports.deleteCourseLanguage = exports.updateCourseLanguage = exports.getCourseLanguageById = exports.createCourseLanguage = exports.getCourseLanguages = void 0;
const connection_db_1 = require("../../data-base/connection_db");
const serverErrorMessage_1 = require("../error/serverErrorMessage");
const getCourseLanguages = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM course_language');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getCourseLanguages = getCourseLanguages;
const createCourseLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { language_name } = req.body;
        connection_db_1.pool.query('INSERT INTO course_language (language_name) VALUES (?)', [language_name]);
        res.json({ language_name });
    }
    catch (error) {
        res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.createCourseLanguage = createCourseLanguage;
const getCourseLanguageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM course_language WHERE language_id = ?', [req.params.id]);
        if (result.length <= 0)
            return res.status(404).json({ 'message': 'Language not found' });
        return res.json(result[0]);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getCourseLanguageById = getCourseLanguageById;
const updateCourseLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { language_name } = req.body;
        const [result] = yield connection_db_1.pool.query('UPDATE course_language SET language_name = IFNULL(?, language_name) WHERE language_id = ?', [language_name, id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ 'message': 'Language not found' });
        return res.send('Language succesfully updated');
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.updateCourseLanguage = updateCourseLanguage;
const deleteCourseLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('DELETE FROM course_language WHERE language_id = ?', [id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ 'message': 'Language not found' });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.deleteCourseLanguage = deleteCourseLanguage;
