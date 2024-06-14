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
      c.is_free,
      c.resource_link,
      c.description,
      c.image,
      c.with_certification,
      c.author_id,
      a.author_name AS author,
      a.author_country,
      t.tech_name AS technology,
      l.language_name AS language,
      ty.type_name AS type,
      AVG(r.rate) AS rating,
      COUNT(r.rate_id) AS rates_quantity
    FROM
      courses c
    INNER JOIN
      technologies t ON c.tech_id = t.tech_id
    INNER JOIN
      course_languages l ON c.language_id = l.language_id
    INNER JOIN 
      course_types ty ON c.type_id = ty.type_id
    INNER JOIN
      authors a ON c.author_id = a.author_id
    LEFT JOIN
      ratings r ON c.course_id = r.course_id
  `;

const getCourses = async(_req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query(`${SqlQuery} GROUP BY
        c.course_id`);
        return res.json(result)
    }
    catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getCoursesByUser = async(req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query<ResultSetHeader[]>( `${ SqlQuery } WHERE user_id = ?`, [req.params.id]);
        return res.json(result)

    } catch (error) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getCourseById = async(req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query<ResultSetHeader[]>( `${ SqlQuery } WHERE c.course_id = ? GROUP BY c.course_id`, [req.params.id]);

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
          author_id,
          with_certification,
          user_id
      }: Course = req.body;

      if (!req.files || Object.keys(req.files).length === 0) return res.status(422).send('No files were uploaded');

      if (title.length <= 0 || title.length > 100 || resource_link.length <= 0 || resource_link.length > 250 || description.length <= 0 || description.length > 600) return res.status(422).send({ error: "Incorrect request, please complete the information required for this request."})

      if (isNaN(Number(language_id)) || isNaN(Number(type_id)) || isNaN(Number(tech_id)) || isNaN(Number(author_id)) || isNaN(Number(with_certification)) || isNaN(Number(user_id))) return res.status(422).send({ error: 'Please, complete the request with valid information' })

      const sampleFile: any = req.files.sampleFile;
      
      const imageUrl = await uploadAndGetUrlImage(sampleFile)

      await pool.query(
          'INSERT INTO courses (title, is_free, resource_link, description, image, language_id, type_id, tech_id, author_id, with_certification, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
          [title, is_free, resource_link, description, imageUrl, language_id, type_id, tech_id, author_id, with_certification, user_id]
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
          with_certification,
          language_id, 
          type_id, 
          tech_id,
          author_id
        }: Course = req.body;

        const sampleFile: any = req.files?.sampleFile;
        const imageUrl = req.files ? await uploadAndGetUrlImage(sampleFile) : null;
      
        const [ result ] = await pool.query<ResultSetHeader>('UPDATE courses SET title = IFNULL(?, title), is_free = IFNULL(?, is_free), resource_link = IFNULL(?, resource_link), description = IFNULL(?, description), image = IFNULL(?, image), with_certification = IFNULL(?, with_certification), language_id = IFNULL(?, language_id), type_id = IFNULL(?, type_id), tech_id = IFNULL(?, tech_id), author_id = IFNULL(?, author_id)  WHERE course_id = ?', [ title, is_free, resource_link, description, imageUrl, with_certification, language_id, type_id, tech_id, author_id, id ])

        if (result.affectedRows <= 0) return res.status(404).json({ 'message': 'Course not found' })
        return res.send('Course successfully updated')
    } catch(error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const deleteCourse = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM courses WHERE course_id = ?', [ id ]);
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
    getCourseById,
    getCoursesByUser
}