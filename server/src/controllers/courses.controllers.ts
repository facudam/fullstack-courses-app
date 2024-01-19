import { Request, Response } from "express"
import { pool } from "../../data-base/connection_db"
import { ResultSetHeader } from "mysql2";
import { Course } from "../types";
import { serverErrorMessage } from "../error/serverErrorMessage";
import { uploadAndGetUrlImage } from "./helpers/uploadImg";

const SqlQuery = `
    SELECT
      c.course_id,
      c.title,
      is_free,
      c.resource_link,
      c.description,
      c.image,
      c.author_id,
      a.author_name AS author,
      t.tech_name AS technology,
      l.language_name AS language,
      ty.type_name AS type
    FROM
      course c
    INNER JOIN
      technology t ON c.tech_id = t.tech_id
    INNER JOIN
      course_language l ON c.language_id = l.language_id
    INNER JOIN 
      course_type ty ON c.type_id = ty.type_id
    INNER JOIN
      author a ON c.author_id = a.author_id
  `;

const getCourses = async(_req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query(SqlQuery);
        return res.json(result)
    }
    catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getCourseById = async(req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query<ResultSetHeader[]>( `${ SqlQuery } WHERE course_id = ?`, [req.params.id])

        if ( result.length <= 0) return res.status(404).json({'message': 'Course not found'})
    
        return res.json(result[0])
    } catch (error: unknown) {
        return res.status(500).json(serverErrorMessage + error)
    }
}

const createCourse = async (req: Request, res: Response) => {
  try {
      const {
          title,
          is_free,
          resource_link,
          description,
          language_id,
          type_id,
          tech_id,
          author_id
      }: Course = req.body;

      if (!req.files || Object.keys(req.files).length === 0) return res.status(400).send('No files were uploaded');

      const sampleFile: any = req.files.sampleFile;
    
      const imageUrl = await uploadAndGetUrlImage(sampleFile)

      await pool.query(
          'INSERT INTO course (title, is_free, resource_link, description, image, language_id, type_id, tech_id, author_id) VALUES (?,?,?,?,?,?,?,?,?)',
          [title, is_free, resource_link, description, imageUrl, language_id, type_id, tech_id, author_id]
      );

      return res.json({ message: 'Course created successfully' });

  } catch (error: unknown) {
      return res.status(500).send(serverErrorMessage + error);
  }
};

const updateCourse = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { 
          title, 
          is_free, 
          resource_link, 
          description, 
          language_id, 
          type_id, 
          tech_id,
          author_id
        }: Course = req.body;

        const sampleFile: any = req.files?.sampleFile;
        const imageUrl = req.files ? await uploadAndGetUrlImage(sampleFile) : null;
      
        const [ result ] = await pool.query<ResultSetHeader>('UPDATE course SET title = IFNULL(?, title), is_free = IFNULL(?, is_free), resource_link = IFNULL(?, resource_link), description = IFNULL(?, description), image = IFNULL(?, image), language_id = IFNULL(?, language_id), type_id = IFNULL(?, type_id), tech_id = IFNULL(?, tech_id), author_id = IFNULL(?, author_id)  WHERE course_id = ?', [title, is_free, resource_link, description, imageUrl, language_id, type_id, tech_id, author_id, id])

        if (result.affectedRows <= 0) return res.status(404).json({ 'message': 'Course not found' })
        return res.send('Course successfully updated')
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const deleteCourse = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM course WHERE course_id = ?', [ id ]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Course not found' })
       
        return res.sendStatus(204)
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
} 

export {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseById
}