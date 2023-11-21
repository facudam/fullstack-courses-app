import { Request, Response } from "express"
import { pool } from "../../data-base/connection_db"
import { serverErrorMessage } from "../error/serverErrorMessage";

export const getAuthors = async(_req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query('SELECT * FROM author');
        return res.json(result)
    }
    catch (error) {
        return res.status(500).json(serverErrorMessage)
    }
}

export const getAuthorById = async(req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query('SELECT * FROM author WHERE author_id = ?', [req.params.id])

        if (Array.isArray(result) &&  result.length <= 0) return res.status(404).json({'message': 'Author not found'})

        return res.json(result)
    } catch (error) {
        return res.status(500).json(serverErrorMessage)
    }
}