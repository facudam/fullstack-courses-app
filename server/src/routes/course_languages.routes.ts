import Router from "express";
import { createCourseLanguage, getCourseLanguages } from "../controllers/courseLanguages.controllers";

const router = Router();

router.get('/api/course-languages', getCourseLanguages);
router.post('/api/course-languages', createCourseLanguage);
// router.get('api/course-languages/:id', getCourseLanguage);
// router.patch('api/course-languages/:id', updateCourseLanguage);
// router.delete('api/course-languages/:id', deleteCourseLanguage);

export default router;