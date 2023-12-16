import express from 'express';
import cors from 'cors'
import session from 'express-session'
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
import { PORT } from './config';


const app = express()
app.use(express.json()) //Transformamos la req.body en json

const secret = crypto.randomBytes(64).toString('hex');
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
}))

app.use(cors({
    origin: 'http://localhost:5173',
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