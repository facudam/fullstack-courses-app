"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const creadoPor_controllers_1 = require("../controllers/creadoPor.controllers");
const route = (0, express_1.default)();
route.get('/api/creado-por', creadoPor_controllers_1.getCreadoPorData);
route.get('/api/creado-por/:id', creadoPor_controllers_1.getCreadoPorDataById);
route.post('/api/creado-por', creadoPor_controllers_1.createCreadoPorData);
route.patch('/api/creado-por/:id', creadoPor_controllers_1.updateCreadoPorData);
route.delete('/api/creado-por/:id', creadoPor_controllers_1.deleteCreadoPorData);
exports.default = route;
