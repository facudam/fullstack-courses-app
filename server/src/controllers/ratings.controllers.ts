import { Request, Response } from "express";
import { pool } from "../../data-base/connection_db";
import { serverErrorMessage } from "../error/serverErrorMessage";
import { Rating } from "../types";
import { ResultSetHeader } from "mysql2";


const getRatings = async(_req:Request, res: Response) => {
    try {
        const [ result ] = await pool.query('SELECT * FROM star_rating_per_course')
        return res.json(result)
    } catch (error: unknown) {
        return res.status(500).json(serverErrorMessage + error)
    }
}

const createRating = async(req: Request, res: Response) => {
    try {
        const { rate, course_id, user_id }: Rating = req.body
        await pool.query('INSERT INTO star_rating_per_course (rate, course_id, user_id) VALUES(?,?,?)', [rate, course_id, user_id])
        return res.json({ 'rate': rate, 'course_id': course_id , 'user_id': user_id})
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getRatingById = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader[]>('SELECT * FROM star_rating_per_course WHERE rate_id = ?', [ id ])
        if (result.length <= 0) return res.status(404).json({'message': 'Rating not found'})
        return res.json(result[0])
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }

}

const updateRating = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            rate,
            course_id,
            user_id
        }: Rating = req.body
        await pool.query('UPDATE star_rating_per_course SET rate = IFNULL(?, rate), course_id = IFNULL(?, course_id), user_id = IFNULL (?, user_id) WHERE rate_id = ?', [ rate, course_id, user_id, id ])

        return res.send('rating succesfully updated')
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const deleteRating = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM star_rating_per_course WHERE rate_id = ?', [ id ])
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Rating not found' })
        return res.sendStatus(204)
    } catch (error: unknown) {
        return res.status(500).json(serverErrorMessage + error)
    }


}

export {
    getRatings,
    createRating,
    getRatingById,
    updateRating,
    deleteRating
}