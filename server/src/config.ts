import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 4000 ,
    DB_NAME = process.env.DB_NAME || 'courses_data-base',
    DB_PORT = process.env.DB_PORT || 3306,
    DB_USER = process.env.DB_USER || 'root',
    DB_PASS = process.env.DB_PASS || 'root',
    DB_HOST = process.env.DB_HOST || 'localhost';

export {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_PORT,
    DB_USER
}