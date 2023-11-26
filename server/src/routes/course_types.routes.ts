import Router from 'express'
import { createType, deleteType, getTypeById, getTypes, updateType } from '../controllers/types.controllers';

const router = Router()

router.get('/api/course-types', getTypes)
router.post('/api/course-types', createType)
router.patch('/api/course-types/:id', updateType)
router.get('/api/course-types/:id', getTypeById)
router.delete('/api/course-types/:id', deleteType)

export default router;