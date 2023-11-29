import Router from 'express'
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse, upload } from '../controllers/courses.controllers';

const router = Router()

router.get('/api/courses', getCourses)
router.post('/api/courses', upload.single('image'), createCourse)
router.patch('/api/courses/:id', updateCourse)
router.get('/api/courses/:id', getCourseById)
router.delete('/api/courses/:id', deleteCourse)

export default router;