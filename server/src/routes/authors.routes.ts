import { Router } from "express";
import { createAuthor, deleteAuthor, getAuthorById, getAuthors, updateAuthor } from '../controllers/author.controllers';

const router = Router()

router.get('/api/authors', getAuthors)
router.post('/api/authors', createAuthor)
router.patch('/api/authors/:id', updateAuthor)
router.get('/api/authors/:id', getAuthorById)
router.delete('/api/authors/:id', deleteAuthor)

export default router;