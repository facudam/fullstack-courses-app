import Router from 'express'
import { createUser, deleteUser, getUserById, getUsers, updateUser, loginUser } from '../controllers/users.controllers';

const router = Router()

router.get('/api/users', getUsers)
router.post('/api/login', loginUser)
router.post('/api/users', createUser)
router.get('/api/users/:id', getUserById)
router.patch('/api/users/:id', updateUser)
router.delete('/api/users/:id', deleteUser)

export default router;