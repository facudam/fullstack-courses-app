import { Request, Response } from "express";
import { pool } from "../../data-base/connection_db";
import { serverErrorMessage } from "../error/serverErrorMessage";
import { CourseLanguage } from "../types";
import { ResultSetHeader } from "mysql2";

const getCourseLanguages = async (_req: Request, res: Response) => {
    try {
        const [result] = await pool.query('SELECT * FROM course_languages');
        return res.json(result)
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const createCourseLanguage =  async (req: Request, res: Response) => {
    try {
        const { language_name }: CourseLanguage = req.body;

        if (language_name.length <= 0) return res.status(400).send({ error: "Incorrect request, please complete the information required for this request."})

        pool.query('INSERT INTO course_languages (language_name) VALUES (?)', [language_name])
        return res.json({ language_name })
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getCourseLanguageById = async(req: Request, res: Response) => {
    try {
        const [ result ] = await pool.query<ResultSetHeader[]>('SELECT * FROM course_languages WHERE language_id = ?', [req.params.id])

        if(result.length <= 0) return res.status(404).json({'message': 'Language not found'})

        return res.json(result[0])
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const updateCourseLanguage = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { language_name } = req.body
        const [result] = await pool.query<ResultSetHeader>('UPDATE course_languages SET language_name = IFNULL(?, language_name) WHERE language_id = ?', [language_name, id])

        if (result.affectedRows <= 0) return res.status(404).json({'message': 'Language not found'})
        return res.send('Language succesfully updated')
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
    
}

const deleteCourseLanguage = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM course_languages WHERE language_id = ?', [ id ]);

        if (result.affectedRows <= 0) return res.status(404).json({'message': 'Language not found'})
        
        return res.sendStatus(204)
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

export {
    getCourseLanguages,
    createCourseLanguage,
    getCourseLanguageById,
    updateCourseLanguage,
    deleteCourseLanguage
}