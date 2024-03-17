import express from 'express';
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import crypto from 'crypto'
import authorRoutes from './routes/authors.routes'
import courseLanguages from './routes/course_languages.routes'
import courseTypes from './routes/course_types.routes'
import technologyRoutes from './routes/technologies.routes'
import courseRoutes from './routes/courses.routes'
import ratingRoutes from './routes/rating.routes'
import commentsRoutes from './routes/comments.routes'
import creadoPorRoutes from './routes/creadoPor.routes'
import usersRoutes from './routes/users.routes'
import { PORT, URL_FOR_CORS } from './config'
import fileUpload from 'express-fileupload'


const app = express()
app.use(express.json()) //Transformamos la req.body en json

app.use(cookieParser())
app.use(bodyParser.json())
app.use(fileUpload())
const secret = crypto.randomBytes(64).toString('hex');
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(cors({
    origin: URL_FOR_CORS,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
}))

app.get('/', (_req, res) => { res.send('inicio')})
app.use(authorRoutes);
app.use(courseLanguages);
app.use(courseTypes);
app.use(technologyRoutes)
app.use(courseRoutes)
app.use(ratingRoutes)
app.use(commentsRoutes)
app.use(creadoPorRoutes)
app.use(usersRoutes)

app.listen(PORT, () => {
    console.log('Server is listening on port', PORT)
})