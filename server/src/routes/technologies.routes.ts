import Router from 'express'
import { createTechnology, deleteTechnology, getTechnologies, getTechnologyById, updateTechnology } from '../controllers/technologies.controllers'

const router = Router()

router.get('/api/technologies', getTechnologies)
router.post('/api/technologies', createTechnology)
router.patch('/api/technologies/:id', updateTechnology)
router.get('/api/technologies/:id', getTechnologyById)
router.delete('/api/technologies/:id', deleteTechnology)

export default router;