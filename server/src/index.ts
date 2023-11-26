import express from 'express';
import authorRoutes from './routes/authors.routes'
import courseLanguages from './routes/course_languages.routes'


const app = express()
app.use(express.json()) //Transformamos la req.body en json

const PORT = 3000;

app.use(authorRoutes);
app.use(courseLanguages)

app.listen(PORT, () => {
    console.log('Server is listening on port', PORT)
})