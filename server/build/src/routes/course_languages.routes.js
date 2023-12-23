"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseLanguages_controllers_1 = require("../controllers/courseLanguages.controllers");
const router = (0, express_1.default)();
router.get('/api/course-languages', courseLanguages_controllers_1.getCourseLanguages);
router.post('/api/course-languages', courseLanguages_controllers_1.createCourseLanguage);
router.get('/api/course-languages/:id', courseLanguages_controllers_1.getCourseLanguageById);
router.patch('/api/course-languages/:id', courseLanguages_controllers_1.updateCourseLanguage);
router.delete('/api/course-languages/:id', courseLanguages_controllers_1.deleteCourseLanguage);
exports.default = router;
