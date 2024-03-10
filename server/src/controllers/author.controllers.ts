import { Request, Response } from "express"
import { pool } from "../../data-base/connection_db"
import { ResultSetHeader } from "mysql2";
import { Author } from "../types";
import { serverErrorMessage } from "../error/serverErrorMessage";

const getAuthors = async(_req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query('SELECT * FROM authors');
        return res.json(result)
    }
    catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getAuthorById = async(req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query<ResultSetHeader[]>('SELECT * FROM authors WHERE author_id = ?', [req.params.id])
        
        if (result.length <= 0) return res.status(404).json({'message': 'Author not found'})
        return res.json(result[0])
    } catch (error: unknown) {
        return res.status(500).json(serverErrorMessage + error)
    }
}

const createAuthor = async(req: Request, res: Response) => {
    try {
        const { author_name, author_country }: Author = req.body;
        if (author_country.length <= 0 || author_name.length <= 0) return res.status(400).send({ error: "Incorrect request, please complete the information required for this request."})
        pool.query('INSERT INTO authors (author_name, author_country) VALUES (?,?)', [author_name, author_country]);
         return res.json({ author_name, author_country })
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const updateAuthor = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, country } = req.body;
        const [result] = await pool.query<ResultSetHeader>('UPDATE authors SET author_name = IFNULL(?, author_name), author_country = IFNULL(?,author_country) WHERE author_id = ?', [name, country, id])

        if (result.affectedRows <= 0) return res.status(404).json({ 'message': 'Author not found' })
        return res.send('Author successfully updated')
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const deleteAuthor = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM authors WHERE author_id = ?', [ id ]);
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