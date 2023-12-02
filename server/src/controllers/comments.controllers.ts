import { Request, Response } from "express"
import { pool } from "../../data-base/connection_db"
import { ResultSetHeader } from "mysql2";
import { Comment } from "../types";
import { serverErrorMessage } from "../error/serverErrorMessage";

const getComments = async(_req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query('SELECT * FROM comments');
        return res.json(result)
    }
    catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getCommentById = async(req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query<ResultSetHeader[]>('SELECT * FROM comments WHERE comment_id = ?', [req.params.id])

        if (result.length <= 0) return res.status(404).json({'message': 'Comment not found'})
        return res.json(result[0])
    } catch (error: unknown) {
        return res.status(500).json(serverErrorMessage + error)
    }
}

const createComment = async(req: Request, res: Response) => {
    try {
        const { comment_description, course_id, user_id }: Comment = req.body;
        pool.query('INSERT INTO comments (comment_description, course_id, user_id) VALUES (?,?,?)', [ comment_description, course_id, user_id ]);
        res.json({ comment_description, course_id, user_id})
    } catch(error: unknown) {
        res.status(500).send(serverErrorMessage + error)
    }
}

const updateComment = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { comment_description, course_id, user_id }: Comment = req.body;
        const [ result ] = await pool.query<ResultSetHeader>('UPDATE comments SET comment_description = IFNULL(?, comment_description), course_id = IFNULL(?, course_id), user_id = IFNULL(?, user_id) WHERE comment_id = ?', [ comment_description, course_id, user_id, id ])

        if (result.affectedRows <= 0) return res.status(404).json({ 'message': 'Comment not found' })
        return res.send('Comment successfully updated')
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const deleteComment = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM comments WHERE comment_id = ?', [ id ]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Comment not found' })
       
        return res.sendStatus(204)
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
} 

export {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    getCommentById
}