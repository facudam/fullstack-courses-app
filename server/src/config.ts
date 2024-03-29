import { config } from 'dotenv'

config()

const PORT = process.env.PORT,
    DB_NAME = process.env.DB_NAME,
    DB_PORT = process.env.DB_PORT,
    DB_USER = process.env.DB_USER,
    DB_PASS = process.env.DB_PASS,
    DB_HOST = process.env.DB_HOST,
    URL_FOR_CORS = process.env.URL_FOR_CORS,
    SECRET = process.env.SECRET_KEY,
    CLOUD_NAME = process.env.CLOUD_NAME,
    API_KEY = process.env.API_KEY,
    API_SECRET = process.env.API_SECRET;


export {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_PORT,
    DB_USER,
    URL_FOR_CORS,
    SECRET,
    CLOUD_NAME,
    API_KEY,
    API_SECRET
}