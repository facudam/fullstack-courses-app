import express from 'express';
import { pool } from '../data-base/connection_db';

const app = express()
app.use(express.json()) //Transformamos la req.body en json

const PORT = 3000;

app.get('/authors', async(_req, res) => {
    const [result] = await pool.query('SELECT * FROM author');
    res.json(result)
})

app.listen(PORT, () => {
    console.log('Server is listening on port', PORT)
})