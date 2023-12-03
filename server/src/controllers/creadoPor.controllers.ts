import { Request, Response } from "express"
import { pool } from "../../data-base/connection_db"
import { ResultSetHeader } from "mysql2";
import { CreadoPor } from "../types";
import { serverErrorMessage } from "../error/serverErrorMessage";

const getCreadoPorData = async(_req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query('SELECT * FROM creado_por');
        return res.json(result)
    }
    catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getCreadoPorDataById = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        const [ result ]  = await pool.query<ResultSetHeader[]>('SELECT * FROM creado_por WHERE creadoPor_id = ?', [ id ])

        if (result.length <= 0) return res.status(404).json({'message': 'CreadoPor data not found'})
        return res.json(result[0])
    } catch (error: unknown) {
        return res.status(500).json(serverErrorMessage + error)
    }
}

const createCreadoPorData = async(req: Request, res: Response) => {
    try {
        const { author_id, course_id }: CreadoPor = req.body;
        pool.query('INSERT INTO creado_por (author_id, course_id) VALUES (?,?)', [ author_id, course_id ]);
        res.json({ author_id, course_id })
    } catch(error: unknown) {
        res.status(500).send(serverErrorMessage + error)
    }
}

const updateCreadoPorData = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { author_id, course_id  }: CreadoPor = req.body;
        const [ result ] = await pool.query<ResultSetHeader>('UPDATE creado_por SET author_id = IFNULL(?, author_id), course_id = IFNULL(?, course_id) WHERE creadoPor_id = ?', [ author_id, course_id, id ])

        if (result.affectedRows <= 0) return res.status(404).json({ 'message': 'CreadoPor data not found' })
        return res.send('CreadoPor data successfully updated')
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const deleteCreadoPorData = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM creado_por WHERE creadoPor_id = ?', [ id ]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'CreadoPor data not found' })
       
        return res.sendStatus(204)
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
} 

export {
    getCreadoPorData,
    createCreadoPorData,
    updateCreadoPorData,
    deleteCreadoPorData,
    getCreadoPorDataById
}