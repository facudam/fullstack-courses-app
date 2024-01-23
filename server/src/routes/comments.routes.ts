import Router from "express";
import { createComment, deleteComment, getCommentsByCourseId, getComments, updateComment } from "../controllers/comments.controllers";

const route = Router()

route.get('/api/comments', getComments);
route.get('/api/comments/:id', getCommentsByCourseId);
route.post('/api/comments', createComment);
route.patch('/api/comments/:id', updateComment);
route.delete('/api/comments/:id', deleteComment);

export default route;
