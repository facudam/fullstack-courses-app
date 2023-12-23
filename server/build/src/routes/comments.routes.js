"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controllers_1 = require("../controllers/comments.controllers");
const route = (0, express_1.default)();
route.get('/api/comments', comments_controllers_1.getComments);
route.get('/api/comments/:id', comments_controllers_1.getCommentById);
route.post('/api/comments', comments_controllers_1.createComment);
route.patch('/api/comments/:id', comments_controllers_1.updateComment);
route.delete('/api/comments/:id', comments_controllers_1.deleteComment);
exports.default = route;
