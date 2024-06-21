import Router from 'express'
import { createUser, deleteUser, getUserById, getUsers, updateUser, loginUser, verification, confirmAccount, logout } from '../controllers/users.controllers';

const router = Router()

router.get('/api/users', getUsers)
router.post('/api/users', createUser)
router.get('/api/users/:id', getUserById)
router.patch('/api/users/:id', updateUser)
router.delete('/api/users/:id', deleteUser)
router.get('/api/confirmar/:token', confirmAccount)
router.post('/api/login', loginUser);
router.get('/api/validation', verification)
router.post('/api/logout', logout)

export default router;