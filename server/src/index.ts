import express from 'express';
import authorRoutes from './routes/authors.routes'


const app = express()
app.use(express.json()) //Transformamos la req.body en json

const PORT = 3000;

app.use(authorRoutes);

app.listen(PORT, () => {
    console.log('Server is listening on port', PORT)
})