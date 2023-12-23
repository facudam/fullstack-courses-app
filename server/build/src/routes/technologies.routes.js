"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const technologies_controllers_1 = require("../controllers/technologies.controllers");
const router = (0, express_1.default)();
router.get('/api/technologies', technologies_controllers_1.getTechnologies);
router.post('/api/technologies', technologies_controllers_1.createTechnology);
router.patch('/api/technologies/:id', technologies_controllers_1.updateTechnology);
router.get('/api/technologies/:id', technologies_controllers_1.getTechnologyById);
router.delete('/api/technologies/:id', technologies_controllers_1.deleteTechnology);
exports.default = router;
