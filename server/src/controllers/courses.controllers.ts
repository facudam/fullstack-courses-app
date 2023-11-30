import { Request, Response } from "express"
import multer from 'multer';
import path from 'path';
import { pool } from "../../data-base/connection_db"
import { ResultSetHeader } from "mysql2";
import { Course } from "../types";
import { serverErrorMessage } from "../error/serverErrorMessage";

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads');  // La carpeta donde se guardarán las imágenes
  },
  filename: function (_req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const getCourses = async(_req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query('SELECT * FROM course');
        return res.json(result)
    }
    catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const getCourseById = async(req: Request, res: Response) => {
    try {
        const [ result ]  = await pool.query('SELECT * FROM course WHERE course_id = ?', [req.params.id])

        if (Array.isArray(result) &&  result.length <= 0) return res.status(404).json({'message': 'Course not found'})
    
        return res.json(result)
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
        tech_id
      }: Course = req.body;
  
      // Obtenemos la ruta de la imagen cargada:
      const image = req.file ? req.file.path : null;

      // Este sería la url de la imagen para la api si estuviera alojada en mi sitio web personal:
      // const image = req.file ? `https://facundocaceres.dev/${ req.file.filename }` : null;
  
      // Insertamos el curso en la base de datos:
      pool.query(
        'INSERT INTO course (title, is_free, resource_link, description, image, language_id, type_id, tech_id) VALUES (?,?,?,?,?,?,?,?)',
        [title, is_free, resource_link, description, image, language_id, type_id, tech_id]
      );
  
      res.json({
        title,
        is_free,
        resource_link,
        description,
        image,
        language_id,
        type_id,
        tech_id
      });
    } catch (error: unknown) {
      res.status(500).send(serverErrorMessage + error);
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
          tech_id 
        }: Course = req.body;

        const image = req.file ? req.file.path : null;

        const [ result ] = await pool.query<ResultSetHeader>('UPDATE course SET title = IFNULL(?, title), is_free = IFNULL(?, is_free), resource_link = IFNULL(?, resource_link), description = IFNULL(?, description), image = IFNULL(?, image), language_id = IFNULL(?, language_id), type_id = IFNULL(?, type_id), tech_id = IFNULL(?, tech_id)  WHERE course_id = ?', [title, is_free, resource_link, description, image, language_id, type_id, tech_id, id])

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
    getCourseById,
    upload
}