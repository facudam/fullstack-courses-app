import { Router } from "express";
import { getAuthorById, getAuthors } from '../controllers/author.controllers';

const router = Router()

router.get('/api/authors', getAuthors)

router.get('/api/authors/:id', getAuthorById)

export default router;