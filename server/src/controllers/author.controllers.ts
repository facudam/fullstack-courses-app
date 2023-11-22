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

export const createAuthor = async(req: Request, res: Response) => {
    try {
        const { name, country } = req.body;
        pool.query('INSERT INTO author (author_name, author_country) VALUES (?,?)', [name, country]);
        res.json({ author_name: name, author_country: country })
    } catch(error) {
        res.status(500).send(`Sorry, there's been an error: ${error}`)
    }
}

export const updateAuthor = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, country } = req.body;
        const [result] = await pool.query('UPDATE author SET author_name = IFNULL(?, author_name), author_country = IFNULL(?,author_country) WHERE author_id = ?', [name, country, id])

        console.log(result)
        res.send('Author successfully updated')
    } catch(error) {
        res.status(500).send(`Sorry, there's been an error: ${error}`)
    }
}