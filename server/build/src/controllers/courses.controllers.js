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
exports.getCourseById = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourses = void 0;
const connection_db_1 = require("../../data-base/connection_db");
const serverErrorMessage_1 = require("../error/serverErrorMessage");
const uploadImg_1 = require("./helpers/uploadImg");
const SqlQuery = `
    SELECT
      c.course_id,
      c.title,
      is_free,
      c.resource_link,
      c.description,
      c.image,
      t.tech_name AS technology,
      l.language_name AS language,
      ty.type_name AS type,
      a.author_name AS author
    FROM
      course c
    INNER JOIN
      technology t ON c.tech_id = t.tech_id
    INNER JOIN
      course_language l ON c.language_id = l.language_id
    INNER JOIN 
      course_type ty ON c.type_id = ty.type_id
    INNER JOIN
      author a ON c.author_id = a.author_id
  `;
const getCourses = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query(SqlQuery);
        return res.json(result);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getCourses = getCourses;
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query(`${SqlQuery} WHERE course_id = ?`, [req.params.id]);
        if (result.length <= 0)
            return res.status(404).json({ 'message': 'Course not found' });
        return res.json(result[0]);
    }
    catch (error) {
        return res.status(500).json(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getCourseById = getCourseById;
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, is_free, resource_link, description, language_id, type_id, tech_id, author_id } = req.body;
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send('No files were uploaded');
        const sampleFile = req.files.sampleFile;
        const imageUrl = yield (0, uploadImg_1.uploadAndGetUrlImage)(sampleFile);
        yield connection_db_1.pool.query('INSERT INTO course (title, is_free, resource_link, description, image, language_id, type_id, tech_id, author_id) VALUES (?,?,?,?,?,?,?,?,?)', [title, is_free, resource_link, description, imageUrl, language_id, type_id, tech_id, author_id]);
        return res.json({ message: 'Course created successfully' });
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.createCourse = createCourse;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { title, is_free, resource_link, description, language_id, type_id, tech_id, author_id } = req.body;
        const sampleFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.sampleFile;
        const imageUrl = req.files ? yield (0, uploadImg_1.uploadAndGetUrlImage)(sampleFile) : null;
        const [result] = yield connection_db_1.pool.query('UPDATE course SET title = IFNULL(?, title), is_free = IFNULL(?, is_free), resource_link = IFNULL(?, resource_link), description = IFNULL(?, description), image = IFNULL(?, image), language_id = IFNULL(?, language_id), type_id = IFNULL(?, type_id), tech_id = IFNULL(?, tech_id), author_id = IFNULL(?, author_id)  WHERE course_id = ?', [title, is_free, resource_link, description, imageUrl, language_id, type_id, tech_id, author_id, id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ 'message': 'Course not found' });
        return res.send('Course successfully updated');
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.updateCourse = updateCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('DELETE FROM course WHERE course_id = ?', [id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'Course not found' });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.deleteCourse = deleteCourse;
