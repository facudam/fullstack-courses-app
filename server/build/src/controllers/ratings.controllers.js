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
exports.deleteRating = exports.updateRating = exports.getRatingById = exports.createRating = exports.getRatings = void 0;
const connection_db_1 = require("../../data-base/connection_db");
const serverErrorMessage_1 = require("../error/serverErrorMessage");
const getRatings = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM star_rating_per_course');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getRatings = getRatings;
const createRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rate, course_id, user_id } = req.body;
        yield connection_db_1.pool.query('INSERT INTO star_rating_per_course (rate, course_id, user_id) VALUES(?,?,?)', [rate, course_id, user_id]);
        return res.json({ 'rate': rate, 'course_id': course_id, 'user_id': user_id });
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.createRating = createRating;
const getRatingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('SELECT * FROM star_rating_per_course WHERE rate_id = ?', [id]);
        if (result.length <= 0)
            return res.status(404).json({ 'message': 'Rating not found' });
        return res.json(result[0]);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getRatingById = getRatingById;
const updateRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rate, course_id, user_id } = req.body;
        yield connection_db_1.pool.query('UPDATE star_rating_per_course SET rate = IFNULL(?, rate), course_id = IFNULL(?, course_id), user_id = IFNULL (?, user_id) WHERE rate_id = ?', [rate, course_id, user_id, id]);
        return res.send('rating succesfully updated');
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.updateRating = updateRating;
const deleteRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('DELETE FROM star_rating_per_course WHERE rate_id = ?', [id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'Rating not found' });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).json(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.deleteRating = deleteRating;
