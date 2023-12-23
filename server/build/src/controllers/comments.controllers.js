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
exports.getCommentById = exports.deleteComment = exports.updateComment = exports.createComment = exports.getComments = void 0;
const connection_db_1 = require("../../data-base/connection_db");
const serverErrorMessage_1 = require("../error/serverErrorMessage");
const getComments = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM comments');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getComments = getComments;
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_db_1.pool.query('SELECT * FROM comments WHERE comment_id = ?', [req.params.id]);
        if (result.length <= 0)
            return res.status(404).json({ 'message': 'Comment not found' });
        return res.json(result[0]);
    }
    catch (error) {
        return res.status(500).json(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.getCommentById = getCommentById;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment_description, course_id, user_id } = req.body;
        connection_db_1.pool.query('INSERT INTO comments (comment_description, course_id, user_id) VALUES (?,?,?)', [comment_description, course_id, user_id]);
        res.json({ comment_description, course_id, user_id });
    }
    catch (error) {
        res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.createComment = createComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { comment_description, course_id, user_id } = req.body;
        const [result] = yield connection_db_1.pool.query('UPDATE comments SET comment_description = IFNULL(?, comment_description), course_id = IFNULL(?, course_id), user_id = IFNULL(?, user_id) WHERE comment_id = ?', [comment_description, course_id, user_id, id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ 'message': 'Comment not found' });
        return res.send('Comment successfully updated');
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield connection_db_1.pool.query('DELETE FROM comments WHERE comment_id = ?', [id]);
        if (result.affectedRows <= 0)
            return res.status(404).json({ message: 'Comment not found' });
        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).send(serverErrorMessage_1.serverErrorMessage + error);
    }
});
exports.deleteComment = deleteComment;
