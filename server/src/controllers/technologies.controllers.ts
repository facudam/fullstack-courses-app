import { Request, Response } from "express"
import { pool } from "../../data-base/connection_db"
import { ResultSetHeader } from "mysql2";
import { Technology } from "../types";
import { serverErrorMessage } from "../error/serverErrorMessage";

const getTechnologies = async(_req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query('SELECT * FROM technology');
        return res.json(result)
    }
    catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getTechnologyById = async(req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query<ResultSetHeader[]>('SELECT * FROM technology WHERE tech_id = ?', [req.params.id])

        if (result.length <= 0) return res.status(404).json({'message': 'Technology not found'})
    
        return res.json(result[0])
    } catch (error: unknown) {
        return res.status(500).json(serverErrorMessage + error)
    }
}

const createTechnology = async(req: Request, res: Response) => {
    try {
        const { tech_name }: Technology = req.body;

        if (tech_name.length <= 0) return res.status(400).send({ error: "Incorrect request, please complete the information required for this request."})

        pool.query('INSERT INTO technology (tech_name) VALUES (?)', [tech_name]);
        return res.json({ tech_name })
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const updateTechnology = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { tech_name} = req.body;
        const [result] = await pool.query<ResultSetHeader>('UPDATE technology SET tech_name = IFNULL(?, tech_name) WHERE tech_id = ?', [tech_name, id])

        if (result.affectedRows <= 0) return res.status(404).json({ 'message': 'Technology not found' })
        return res.send('Technology successfully updated')
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const deleteTechnology = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM technology WHERE tech_id = ?', [ id ]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Technology not found' })
       
        return res.sendStatus(204)
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
} 

export {
    getTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology,
    getTechnologyById
}