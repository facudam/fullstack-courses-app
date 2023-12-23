"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_controllers_1 = require("../controllers/author.controllers");
const router = (0, express_1.default)();
router.get('/api/authors', author_controllers_1.getAuthors);
router.post('/api/authors', author_controllers_1.createAuthor);
router.patch('/api/authors/:id', author_controllers_1.updateAuthor);
router.get('/api/authors/:id', author_controllers_1.getAuthorById);
router.delete('/api/authors/:id', author_controllers_1.deleteAuthor);
exports.default = router;
