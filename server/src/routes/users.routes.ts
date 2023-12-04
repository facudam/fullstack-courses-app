import Router from 'express'
import { deleteUser, getUserById, getUsers, updateUser } from '../controllers/users.controllers';

const router = Router()

router.get('/api/users', getUsers)
// router.post('/api/users', createUser)
router.get('/api/users/:id', getUserById)
router.patch('/api/users/:id', updateUser)
router.delete('/api/users/:id', deleteUser)

export default router;