"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courses_controllers_1 = require("../controllers/courses.controllers");
const router = (0, express_1.default)();
router.get('/api/courses', courses_controllers_1.getCourses);
router.post('/api/courses', courses_controllers_1.createCourse);
router.patch('/api/courses/:id', courses_controllers_1.updateCourse);
router.get('/api/courses/:id', courses_controllers_1.getCourseById);
router.delete('/api/courses/:id', courses_controllers_1.deleteCourse);
exports.default = router;
