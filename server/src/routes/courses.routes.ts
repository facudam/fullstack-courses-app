import Router from 'express'
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from '../controllers/courses.controllers';

const router = Router()

router.get('/api/courses', getCourses)
router.post('/api/courses', createCourse)
router.patch('/api/courses/:id', updateCourse)
router.get('/api/courses/:id', getCourseById)
router.delete('/api/courses/:id', deleteCourse)

export default router;