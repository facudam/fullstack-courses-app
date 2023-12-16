import Router from 'express'
import { createUser, deleteUser, getUserById, getUsers, updateUser, loginUser, logoutUser } from '../controllers/users.controllers';

const router = Router()

router.get('/api/users', getUsers)
router.post('/api/login', loginUser)
router.post('/api/users', createUser)
router.get('/api/users/:id', getUserById)
router.patch('/api/users/:id', updateUser)
router.delete('/api/users/:id', deleteUser)
router.get('/logout', logoutUser)

export default router;