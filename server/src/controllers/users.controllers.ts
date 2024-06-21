import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { pool } from "../../data-base/connection_db";
import { serverErrorMessage } from "../error/serverErrorMessage";
import { ResultSetHeader} from "mysql2";
import bcryptjs from "bcryptjs"
import { SECRET } from "../config";
import { generateID } from "./helpers/generateID";
import { sendEmail } from "./helpers/sendEmail";


interface UserReq extends ResultSetHeader {
    user_id: number
    user_name: string,
    user_email: string,
    user_password: string,
    is_confirmed?: number
}

const getUsers = async(_req: Request, res: Response) => {
    try {
        const [ result ] = await pool.query('SELECT * FROM users')
        res.json(result)
    } catch (error: unknown) {
        res.status(500).send(serverErrorMessage + error)
    }
}

const getUserById = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        const [ result ] = await pool.query<ResultSetHeader[]>('SELECT * FROM users WHERE user_id = ?', [ id ])
        if (result.length <= 0) return res.status(404).json({ message: 'User not found' })
        return res.json(result[0])
    } catch (error:unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const createUser = async(req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        if (name.length <= 0 || email.length <= 0 || password.length <= 0) return res.status(400).send({ error: "Incorrect request, please complete the information required for this request."})

        // Verificamos que el email no exista en la base de datos:
        const [ result ] = await pool.query<UserReq[]>('SELECT * FROM users WHERE user_email = ?', [email]);
        // Si ya existe retornamos un codigo 409 de conflicto:
        if (result.length > 0) return res.status(409).json({ message: 'User already exists' })

        let encryptedPass = await bcryptjs.hash(password, 8)

        const token: string = generateID()

        const datos = { email, name, token }

        sendEmail(datos)

        await pool.query('INSERT INTO users (user_name, user_email, user_password, token) VALUES(?,?,?,?)', [ name, email, encryptedPass, token ])
        return res.json({ message: 'User was successfully created' })

    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}


const loginUser: any  = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        // 1. Obtenemos el usuario por correo electrónico:
        const [ result ] = await pool.query<UserReq[]>('SELECT * FROM users WHERE user_email = ?', [email]);

        // 2. Verificamos si el usuario existe:
        if (result.length === 0) return res.status(404).send({ message: 'Invalid email or password', login: false });
        
        // 3. Verificamos la contraseña utilizando bcryptjs:
        const user = result[0];

        const passwordMatch = await bcryptjs.compare(password, user.user_password);

        if (!passwordMatch) return res.status(401).json({ message: 'Invalid email or password' });

        // 4. Verificamos si la cuenta del usuario está confirmada:

        // if (user.is_confirmed === 0) return res.status(403).json({ is_confirmed: false })

        const userSessionData = { valid: true, username: user.user_name, userId: user.user_id  }

        const secretKey: string | undefined = SECRET;

        if (!secretKey) throw new Error("SECRET_KEY is not defined");
          
        const token = jwt.sign(userSessionData, secretKey, { expiresIn: '1d' })

        return res
            .cookie('access_token', token, {
                httpOnly: true, // La cookie sólo se podrá acceder desde el servidor
                secure: false, // Con certificado SSL
                sameSite: 'strict', // Sólo desde el mismo sitio
                maxAge: 86400000 // 1 día
            })
            .json({ login: true, user: userSessionData, token: token });

    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.params;

    try {
        const [result] = await pool.query<UserReq[]>(`SELECT * FROM users WHERE token = ?`, [token]);
        
        if (result.length === 0) return res.status(404).send({ message: 'No user found' });

        const user = result[0];

        await pool.query('UPDATE users SET is_confirmed = 1 WHERE user_id = ?', [user.user_id]);
        await pool.query('UPDATE users SET token = NULL WHERE user_id = ?', [user.user_id]);

        return res.redirect('https://courseslibra.vercel.app/iniciar-sesion');

    } catch (error) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const verification = (req: Request, res: Response) => {
    const token = req.cookies.access_token;
    if(!token) {
        res.status(401).send({ valid: false, message: "Invalid or non-existent token" })
    }
    if (token !== undefined && typeof token === 'string') {
        const secretKey: string | undefined = SECRET;
        if (!secretKey) throw new Error("SECRET_KEY is not defined");
          
        jwt.verify(token, secretKey, (err, data) => {
            if (err) {
                res.status(403).send({ valid: false, Message: "invalid or non-existent token"})
            } else {
                console.log(data)
                res.json(data)
            }
        })
    }
}

const logout = (_req: Request, res: Response) => {
    res
        .clearCookie('access_token')
        .json({ message: 'Logout successfull'})
}

const updateUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user_name, user_email } = req.body;

        const [ result ] = await pool.query<ResultSetHeader>('UPDATE users SET user_name = IFNULL (?, user_name), user_email = IFNULL (?, user_email) WHERE user_id = ?', [ user_name, user_email, id ]);

        if (result.affectedRows <= 0) return res.status(404).json({message: 'User not found'})
        return res.send('User successfully updated')
    } catch (error: unknown) {
        return res.status(500).send(serverErrorMessage + error)
    }
}

const deleteUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query<ResultSetHeader>('DELETE FROM users WHERE user_id = ?', [ id ]);

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
    verification,
    confirmAccount,
    logout
}