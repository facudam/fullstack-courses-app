import Router from "express";
import { createRating, deleteRating, getRatingById, getRatings, updateRating } from "../controllers/ratings.controllers";


const router = Router();

router.get('/api/ratings', getRatings);
router.post('/api/ratings', createRating);
router.get('/api/ratings/:id', getRatingById);
router.patch('/api/ratings/:id', updateRating);
router.delete('/api/ratings/:id', deleteRating);


export default router;