import { config } from 'dotenv'

config()

const PORT = process.env.PORT,
    DB_NAME = process.env.DB_NAME,
    DB_PORT = process.env.DB_PORT,
    DB_USER = process.env.DB_USER,
    DB_PASS = process.env.DB_PASS,
    DB_HOST = process.env.DB_HOST,
    IMGUR_CLIENTID = process.env.IMGUR_CLIENTID;

export {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_PORT,
    DB_USER,
    IMGUR_CLIENTID
}