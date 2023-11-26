import { Request, Response } from "express"
import { pool } from "../../data-base/connection_db"
import { ResultSetHeader } from "mysql2";
import { Author } from "../types";
import { serverErrorMessage } from "../error/serverErrorMessage";

const getAuthors = async(_req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query('SELECT * FROM author');
        return res.json(result)
    }
    catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getAuthorById = async(req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query('SELECT * FROM author WHERE author_id = ?', [req.params.id])

        if (Array.isArray(result) &&  result.length <= 0) return res.status(404).json({'message': 'Author not found'})
    
        return res.json(result)
    } catch (error: unknown) {
        return res.status(500).json(serverErrorMessage + error)
    }
}

const createAuthor = async(req: Request, res: Response) => {
    try {
        const { author_name, author_country }: Author = req.body;
        pool.query('INSERT INTO author (author_name, author_country) VALUES (?,?)', [author_name, author_country]);
        res.json({ author_name, author_country })
    } catch(error: unknown) {
        res.status(500).send(serverErrorMessage + error)
    }
}

const updateAuthor = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, country } = req.body;
        const [result] = await pool.query<ResultSetHeader>('UPDATE author SET author_name = IFNULL(?, author_name), author_country = IFNULL(?,author_country) WHERE author_id = ?', [name, country, id])

        if (result.affectedRows <= 0) return res.status(404).json({ 'message': 'Author not found' })
        return res.send('Author successfully updated')
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const deleteAuthor = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM author WHERE author_id = ?', [ id ]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Employee not found' })
       
        return res.sendStatus(204)
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
} 

export {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthorById
}