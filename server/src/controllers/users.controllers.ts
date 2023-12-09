import { Request, Response } from "express";
import { pool } from "../../data-base/connection_db";
import { serverErrorMessage } from "../error/serverErrorMessage";
import { ResultSetHeader } from "mysql2";


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

        await pool.query('INSERT INTO user (user_name, user_email, user_password) VALUES(?,?,?)', [ name, email, password ])
        res.json({ name, email, password })

    } catch (error: unknown) {
        res.status(500).send(serverErrorMessage + error)
    }
}

const loginUser = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const [ result ] = await pool.query<ResultSetHeader[]>('SELECT * FROM user WHERE user_email = ? AND user_password = ?', [ email, password ])

        if (result.length <= 0) return res.status(404).send({message: 'invalid email or password'})
        return res.send( result[0])

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
    loginUser
}