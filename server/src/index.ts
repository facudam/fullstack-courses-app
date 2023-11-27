import express from 'express';
import authorRoutes from './routes/authors.routes'
import courseLanguages from './routes/course_languages.routes'
import courseTypes from './routes/course_types.routes'
import technologyRoutes from './routes/technologies.routes'
import courseRoutes from './routes/courses.routes'


const app = express()
app.use(express.json()) //Transformamos la req.body en json

const PORT = 3000;

app.get('/', (_req, res) => { res.send('inicio')})
app.use(authorRoutes);
app.use(courseLanguages);
app.use(courseTypes);
app.use(technologyRoutes)
app.use(courseRoutes)

app.listen(PORT, () => {
    console.log('Server is listening on port', PORT)
})