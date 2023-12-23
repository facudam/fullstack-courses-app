"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const types_controllers_1 = require("../controllers/types.controllers");
const router = (0, express_1.default)();
router.get('/api/course-types', types_controllers_1.getTypes);
router.post('/api/course-types', types_controllers_1.createType);
router.patch('/api/course-types/:id', types_controllers_1.updateType);
router.get('/api/course-types/:id', types_controllers_1.getTypeById);
router.delete('/api/course-types/:id', types_controllers_1.deleteType);
exports.default = router;
