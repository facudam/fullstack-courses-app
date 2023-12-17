import { Request, Response } from "express";
import { pool } from "../../data-base/connection_db";
import { serverErrorMessage } from "../error/serverErrorMessage";
import { ResultSetHeader} from "mysql2";
import bcryptjs from "bcryptjs"
import { Session } from 'express-session';

interface CustomSession extends Session {
    username: string;
}

interface UserReq extends ResultSetHeader {
    user_id: number
    user_name: string,
    user_email: string,
    user_password: string
}

// type MyRequestHandler = (req: Request & { session: CustomSession }, res: Response) => Promise<Response<any, Record<string, any>>>;

const getUsers = async(_req: Request, res: Response) => {
    try {
        const [ result ] = await pool.query('SELECT * FROM user')
        res.json(result)
    } catch (error: unknown) {
        res.status(500).send(serverErrorMessage + error)
    }
}

const getUserById = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        const [ result ] = await pool.query<ResultSetHeader[]>('SELECT * FROM user WHERE user_id = ?', [ id ])
        if (result.length <= 0) return res.status(404).json({message: 'User not found'})
        return res.json(result[0])
    } catch (error:unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const createUser = async(req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        let encryptedPass = await bcryptjs.hash(password, 8)

        await pool.query('INSERT INTO user (user_name, user_email, user_password) VALUES(?,?,?)', [ name, email, encryptedPass ])
        res.json({ name, email, encryptedPass })

    } catch (error: unknown) {
        res.status(500).send(serverErrorMessage + error)
    }
}

const loginUser: any  = async(req: Request  & { session: CustomSession }, res: Response) => {
    try {
        const { email, password } = req.body;
        
        // 1. Obtener el usuario por correo electrónico
        const [ result ] = await pool.query<UserReq[]>('SELECT user_id, user_email, user_password, user_name FROM user WHERE user_email = ?', [email]);

        // 2. Verificamos si el usuario existe
        if (result.length === 0) return res.status(404).send({ message: 'Invalid email or password', login: false });
        
        // 3. Verificamos la contraseña utilizando bcryptjs
        const user= result[0];
        const passwordMatch = await bcryptjs.compare(password, user.user_password);

        if (!passwordMatch) return res.status(401).json({ message: 'Invalid email or password', login: false });
        // if (!passwordMatch) return res.status(401).json({ login: false})
        req.session.username = user.user_name

        // const { user_id, user_name, user_email } = user
        return res.json({ login: true, user });

    } catch (error: unknown) {
        return res.status(500).send( serverErrorMessage + error)
    }
}


const logoutUser = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) return console.log('Error al destruir la sesión: ', err)
        res.redirect('/')
    })
    
}

const userIsLogged: any = (req: Request  & { session: CustomSession }, res: Response) => {
    try {
        if(req.session.username) {
            return res.json({ valid: true, username: req.session.username })
        } else {
            return res.json({ valid: false })
        }
    } catch (error: unknown) {
        return res.status(500).send( serverErrorMessage + error)
    }
}

const updateUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user_name, user_email } = req.body;

        const [ result ] = await pool.query<ResultSetHeader>('UPDATE user SET user_name = IFNULL (?, user_name), user_email = IFNULL (?, user_email) WHERE user_id = ?', [ user_name, user_email, id ]);

        if (result.affectedRows <= 0) return res.status(404).json({message: 'User not found'})
        return res.send('User successfully updated')
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const deleteUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM user WHERE user_id = ?', [ id ]);

        if (result.affectedRows <= 0) return res.status(404).json({message: 'User not found'})
        return res.sendStatus(204)
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

export {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser,
    loginUser,
    logoutUser,
    userIsLogged
}