import { Request, Response } from "express";
import { pool } from "../../data-base/connection_db";
import { serverErrorMessage } from "../error/serverErrorMessage";
import { CourseLanguage } from "../types";


const getCourseLanguages = async (_req: Request, res: Response) => {
    try {
        const [result] = await pool.query('SELECT * FROM course_language');
        return res.json(result)
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const createCourseLanguage =  async (req: Request, res: Response) => {
    try {
        const { language_name }: CourseLanguage = req.body;
        pool.query('INSERT INTO course_language (language_name) VALUES (?)', [language_name])
        res.json({ language_name })
    } catch (error: unknown) {
        res.status(500).send(serverErrorMessage + error)
    }
}

export {
    getCourseLanguages,
    createCourseLanguage
}