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
exports.upload = exports.getCourseById = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourses = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const connection_db_1 = require("../../data-base/connection_db");
const serverErrorMessage_1 = require("../error/serverErrorMessage");
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', 'svg', '.AVIF'];
// Configuración de multer para manejar la carga de archivos:
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, 'uploads'); // La carpeta donde se guardarán las imágenes
    },
    filename: function (_req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const fileFilter = function (_req, file, cb) {
    const extname = path_1.default.extname(file.originalname).toLowerCase();
    if (imageExtensions.includes(extname)) {
        cb(null, true);
    }
    else {
        cb(new Error('Solo se permiten archivos de imagen.'));
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter
});
exports.upload = upload;
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
        // Obtenemos la ruta de la imagen cargada:
        const image = req.file ? req.file.path : null;
        // Este sería la url de la imagen para la api si estuviera alojada en mi sitio web personal:
        // const image = req.file ? `https://facundocaceres.dev/${ req.file.filename }` : null;
        connection_db_1.pool.query('INSERT INTO course (title, is_free, resource_link, description, image, language_id, type_id, tech_id, author_id) VALUES (?,?,?,?,?,?,?,?,?)', [title, is_free, resource_link, description, image, language_id, type_id, tech_id, author_id]);
        res.json({
            title,
            is_free,
            resource_link,
            description,
            image,
            language_id,
            type_id,
            tech_id,
            author_id
        });
    }
    catch (error) {
        res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.createCourse = createCourse;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, is_free, resource_link, description, language_id, type_id, tech_id, author_id } = req.body;
        const image = req.file ? req.file.path : null;
        const [result] = yield connection_db_1.pool.query('UPDATE course SET title = IFNULL(?, title), is_free = IFNULL(?, is_free), resource_link = IFNULL(?, resource_link), description = IFNULL(?, description), image = IFNULL(?, image), language_id = IFNULL(?, language_id), type_id = IFNULL(?, type_id), tech_id = IFNULL(?, tech_id), author_id = IFNULL(?, author_id)  WHERE course_id = ?', [title, is_free, resource_link, description, image, language_id, type_id, tech_id, author_id, id]);
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
