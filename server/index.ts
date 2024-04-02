import express from 'express';
import cors from 'cors'
import authorRoutes from './src/routes/authors.routes'
import courseLanguages from './src/routes/course_languages.routes'
import courseTypes from './src/routes/course_types.routes'
import technologyRoutes from './src/routes/technologies.routes'
import courseRoutes from './src/routes/courses.routes'
import ratingRoutes from './src/routes/rating.routes'
import commentsRoutes from './src/routes/comments.routes'
import creadoPorRoutes from './src/routes/creadoPor.routes'
import usersRoutes from './src/routes/users.routes'
import { PORT, URL_FOR_CORS } from './src/config'
import fileUpload from 'express-fileupload'


const app = express()
app.use(express.urlencoded({extended: false}));
app.use(express.json()) //Transformamos la req.body en json
app.use(fileUpload())

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