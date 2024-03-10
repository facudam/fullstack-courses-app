import { Request, Response } from "express"
import { pool } from "../../data-base/connection_db"
import { ResultSetHeader } from "mysql2";
import { Type } from "../types";
import { serverErrorMessage } from "../error/serverErrorMessage";

const getTypes = async(_req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query('SELECT * FROM course_types');
        return res.json(result)
    }
    catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getTypeById = async(req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query<ResultSetHeader[]>('SELECT * FROM course_types WHERE type_id = ?', [req.params.id])

        if (result.length <= 0) return res.status(404).json({'message': 'Type not found'})
        return res.json(result[0])
    } catch (error: unknown) {
        return res.status(500).json(serverErrorMessage + error)
    }
}

const createType = async(req: Request, res: Response) => {
    try {
        const { type_name }: Type = req.body;

        if (type_name.length <= 0) return res.status(400).send({ error: "Incorrect request, please complete the information required for this request."})

        pool.query('INSERT INTO course_types (type_name) VALUES (?)', [type_name]);
        return res.json({ type_name })
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const updateType = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { type_name} = req.body;
        const [result] = await pool.query<ResultSetHeader>('UPDATE course_types SET type_name = IFNULL(?, type_name) WHERE type_id = ?', [type_name, id])

        if (result.affectedRows <= 0) return res.status(404).json({ 'message': 'Type not found' })
        return res.send('Type successfully updated')
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const deleteType = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM course_types WHERE type_id = ?', [ id ]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Type not found' })
       
        return res.sendStatus(204)
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
} 

export {
    getTypes,
    createType,
    updateType,
    deleteType,
    getTypeById
}