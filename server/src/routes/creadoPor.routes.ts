import Router from "express";
import { createCreadoPorData, deleteCreadoPorData, getCreadoPorData, getCreadoPorDataById, updateCreadoPorData } from "../controllers/creadoPor.controllers";


const route = Router()

route.get('/api/creado-por', getCreadoPorData);
route.get('/api/creado-por/:id', getCreadoPorDataById);
route.post('/api/creado-por', createCreadoPorData);
route.patch('/api/creado-por/:id', updateCreadoPorData);
route.delete('/api/creado-por/:id', deleteCreadoPorData);

export default route;