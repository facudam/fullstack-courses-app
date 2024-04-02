import Router from 'express'
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse, getCoursesByUser } from '../controllers/courses.controllers';

const router = Router()

router.get('/api/courses', getCourses)
router.post('/api/courses', createCourse)
router.get('/api/courses-by-user/:id', getCoursesByUser)
router.patch('/api/courses/:id', updateCourse)
router.get('/api/courses/:id', getCourseById)
router.delete('/api/courses/:id', deleteCourse)

export default router;